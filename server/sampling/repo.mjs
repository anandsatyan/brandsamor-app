import { getMongoDb } from '../db/mongo.mjs';
import { randomUUID } from 'node:crypto';
import {
  allocateSampleOrderNumber,
  buildOrderRecord,
  buildTransactionId,
} from './orderNumbers.mjs';
import { notifySampleOrderPaid } from './orderNotificationEmail.mjs';
import { sendCustomerOrderConfirmation } from './customerOrderConfirmationEmail.mjs';
import { maybeSendExploratoryCallInviteOnce } from './exploratoryCallInviteEmail.mjs';
import { scheduleResumeBriefEmail } from './resumeBriefEmail.mjs';

let indexesEnsured = false;

export async function ensureSamplingIndexes() {
  if (indexesEnsured) return;
  const db = await getMongoDb();
  await db.collection('samplingSessions').createIndexes([
    { key: { sessionId: 1 }, unique: true, name: 'uniq_sessionId' },
    { key: { 'lead.email': 1 }, name: 'idx_lead_email' },
    { key: { 'lead.phone': 1 }, name: 'idx_lead_phone' },
    { key: { status: 1, updatedAt: -1 }, name: 'idx_status_updatedAt' },
    { key: { createdAt: -1 }, name: 'idx_createdAt' },
    { key: { 'order.sampleOrderNumber': 1 }, unique: true, sparse: true, name: 'uniq_sampleOrderNumber' },
    { key: { 'order.transactionId': 1 }, unique: true, sparse: true, name: 'uniq_transactionId' },
  ]);
  indexesEnsured = true;
}

const normalizeLead = (lead) => ({
  fullName: String(lead?.fullName ?? '').trim(),
  email: String(lead?.email ?? '').trim().toLowerCase(),
  phone: String(lead?.phone ?? '').trim(),
  brandName: String(lead?.brandName ?? '').trim() || null,
  country: String(lead?.country ?? '').trim() || 'US',
  consent: Boolean(lead?.consent),
});

/** Sessions that must never be edited as open leads or deleted by dedupe. */
function isFrozenOrderSession(doc) {
  if (!doc) return false;
  if (doc.status === 'paid' || doc.status === 'canceled') return true;
  if (doc.order?.sampleOrderNumber != null) return true;
  if (doc.payment?.paidAt) return true;
  if (doc.payment?.status === 'succeeded') return true;
  return false;
}

const OPEN_SESSION_FILTER = {
  status: { $nin: ['paid', 'canceled'] },
  'order.sampleOrderNumber': { $exists: false },
  'payment.paidAt': { $exists: false },
};

/** Open (non-order) sessions are reusable lead records; paid/canceled sessions stay as history. */
async function findOpenSessionByEmail(db, email) {
  const normalized = String(email ?? '').trim().toLowerCase();
  if (!normalized) return null;
  const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return db.collection('samplingSessions').findOne(
    { 'lead.email': new RegExp(`^${escaped}$`, 'i'), ...OPEN_SESSION_FILTER },
    { sort: { updatedAt: -1, createdAt: -1 } },
  );
}

/**
 * Keep a single open session per email. Deletes older open duplicates.
 * Paid / order-bearing sessions are never removed.
 */
async function removeOpenDuplicateSessions(db, email, keepSessionId) {
  const normalized = String(email ?? '').trim().toLowerCase();
  if (!normalized || !keepSessionId) return;
  const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  await db.collection('samplingSessions').deleteMany({
    'lead.email': new RegExp(`^${escaped}$`, 'i'),
    sessionId: { $ne: keepSessionId },
    ...OPEN_SESSION_FILTER,
  });
}

/**
 * One-time-per-process cleanup of existing open duplicates.
 * Also repairs sessions that still have order/payment data but lost status "paid"
 * (never overwrites canceled orders).
 */
let openDuplicatesConsolidated = false;
export async function consolidateOpenEmailDuplicates(db = null) {
  if (openDuplicatesConsolidated) return;
  const mongo = db || (await getMongoDb());
  openDuplicatesConsolidated = true;

  try {
    const repair = await mongo.collection('samplingSessions').updateMany(
      {
        status: { $nin: ['paid', 'canceled'] },
        $or: [
          { 'order.sampleOrderNumber': { $exists: true, $ne: null } },
          { 'payment.paidAt': { $exists: true } },
          { 'payment.status': 'succeeded' },
        ],
      },
      {
        $set: { status: 'paid', lastCompletedStep: 'paid' },
      },
    );
    if (repair.modifiedCount > 0) {
      console.log(
        `[sampling] Restored paid status on ${repair.modifiedCount} order session(s)`,
      );
    }

    const groups = await mongo
      .collection('samplingSessions')
      .aggregate([
        {
          $match: {
            ...OPEN_SESSION_FILTER,
            'lead.email': { $type: 'string', $ne: '' },
          },
        },
        {
          $addFields: {
            emailKey: {
              $toLower: {
                $trim: { input: { $ifNull: ['$lead.email', ''] } },
              },
            },
          },
        },
        { $match: { emailKey: { $ne: '' } } },
        { $sort: { updatedAt: -1, createdAt: -1 } },
        {
          $group: {
            _id: '$emailKey',
            count: { $sum: 1 },
            keepSessionId: { $first: '$sessionId' },
          },
        },
        { $match: { count: { $gt: 1 } } },
      ])
      .toArray();

    for (const group of groups) {
      await removeOpenDuplicateSessions(mongo, group._id, group.keepSessionId);
    }

    if (groups.length > 0) {
      console.log(
        `[sampling] Consolidated open lead duplicates for ${groups.length} email(s)`,
      );
    }
  } catch (error) {
    openDuplicatesConsolidated = false;
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[sampling] Failed to consolidate open lead duplicates:', message);
  }
}

/**
 * Resolve which session to update for a lead email.
 * Prefer the latest open session for that email so restarts don't create duplicates.
 */
async function resolveSessionIdForLead(db, { sessionId, email }) {
  const openByEmail = await findOpenSessionByEmail(db, email);
  if (openByEmail?.sessionId && !isFrozenOrderSession(openByEmail)) {
    return openByEmail.sessionId;
  }

  if (sessionId) {
    const byId = await db.collection('samplingSessions').findOne({ sessionId: String(sessionId) });
    if (byId?.sessionId) {
      // Paid / order sessions are frozen — start a new open lead instead.
      if (isFrozenOrderSession(byId)) return null;
      return byId.sessionId;
    }
  }

  return null;
}

async function finishLeadUpsert({ sessionId, lead }) {
  // Fire-and-forget: one exploratory-call invite per email for life of that address.
  void maybeSendExploratoryCallInviteOnce({ sessionId, lead });
  return sessionId;
}

export async function upsertSamplingSession({
  sessionId,
  step,
  lead,
  answers,
  currentStep,
  userId = null,
}) {
  await ensureSamplingIndexes();
  const db = await getMongoDb();
  await consolidateOpenEmailDuplicates(db);

  const now = new Date();
  const normalizedLead = normalizeLead(lead);
  const isSaveExit = step === 'save_exit';
  const stepEntry = isSaveExit
    ? {
        step,
        completedAt: now,
        atStep: typeof currentStep === 'number' ? currentStep : null,
      }
    : { step, completedAt: now };
  const targetSessionId = await resolveSessionIdForLead(db, {
    sessionId,
    email: normalizedLead.email,
  });
  const userPatch = userId ? { userId: String(userId) } : {};

  const openLeadSet = isSaveExit
    ? {
        lead: normalizedLead,
        answers: answers ?? {},
        currentStep: currentStep ?? 1,
        updatedAt: now,
        ...userPatch,
      }
    : {
        lead: normalizedLead,
        answers: answers ?? {},
        currentStep: currentStep ?? 1,
        lastCompletedStep: step,
        status: 'in_progress',
        updatedAt: now,
        ...userPatch,
      };

  async function afterUpsert(resolvedSessionId) {
    if (isSaveExit) {
      // Future save+exits only — never backfills older leads.
      void scheduleResumeBriefEmail({
        sessionId: resolvedSessionId,
        lead: normalizedLead,
        atStep: currentStep,
      });
    }
    return finishLeadUpsert({ sessionId: resolvedSessionId, lead: normalizedLead });
  }

  if (targetSessionId) {
    // Never downgrade a paid/order session (guards races with markPaid / webhooks).
    const updateResult = await db.collection('samplingSessions').updateOne(
      { sessionId: targetSessionId, ...OPEN_SESSION_FILTER },
      {
        $set: openLeadSet,
        $push: { stepHistory: stepEntry },
      },
    );

    if (updateResult.matchedCount === 0) {
      // Target became a frozen order session — open a fresh lead instead.
      const newSessionId = randomUUID();
      await db.collection('samplingSessions').insertOne({
        sessionId: newSessionId,
        lead: normalizedLead,
        answers: answers ?? {},
        currentStep: currentStep ?? 1,
        lastCompletedStep: isSaveExit ? null : step,
        stepHistory: [stepEntry],
        status: 'in_progress',
        recommendations: [],
        selectionSummary: null,
        createdAt: now,
        updatedAt: now,
        ...userPatch,
      });
      await removeOpenDuplicateSessions(db, normalizedLead.email, newSessionId);
      return afterUpsert(newSessionId);
    }

    await removeOpenDuplicateSessions(db, normalizedLead.email, targetSessionId);
    return afterUpsert(targetSessionId);
  }

  // Always mint a fresh id when opening a new lead (never reuse a paid sessionId).
  const newSessionId = randomUUID();
  await db.collection('samplingSessions').insertOne({
    sessionId: newSessionId,
    lead: normalizedLead,
    answers: answers ?? {},
    currentStep: currentStep ?? 1,
    lastCompletedStep: isSaveExit ? null : step,
    stepHistory: [stepEntry],
    status: 'in_progress',
    recommendations: [],
    selectionSummary: null,
    createdAt: now,
    updatedAt: now,
    ...userPatch,
  });
  await removeOpenDuplicateSessions(db, normalizedLead.email, newSessionId);
  return afterUpsert(newSessionId);
}

export async function finalizeCuration({ sessionId, lead, answers, recommendations, selectionSummary }) {
  await ensureSamplingIndexes();
  const db = await getMongoDb();
  await consolidateOpenEmailDuplicates(db);

  const now = new Date();
  const normalizedLead = normalizeLead(lead);

  let targetSessionId = await resolveSessionIdForLead(db, {
    sessionId,
    email: normalizedLead.email,
  });

  if (!targetSessionId) {
    targetSessionId = await upsertSamplingSession({
      sessionId: null,
      step: 'contact',
      lead: normalizedLead,
      answers,
      currentStep: 8,
    });
  }

  const curationResult = await db.collection('samplingSessions').updateOne(
    { sessionId: targetSessionId, ...OPEN_SESSION_FILTER },
    {
      $set: {
        lead: normalizedLead,
        answers: answers ?? {},
        recommendations,
        selectionSummary: selectionSummary ?? null,
        status: 'curated',
        lastCompletedStep: 'curation',
        currentStep: 8,
        updatedAt: now,
      },
      $push: { stepHistory: { step: 'curation', completedAt: now } },
    },
  );

  if (curationResult.matchedCount === 0) {
    const newSessionId = await upsertSamplingSession({
      sessionId: null,
      step: 'contact',
      lead: normalizedLead,
      answers,
      currentStep: 8,
    });
    await db.collection('samplingSessions').updateOne(
      { sessionId: newSessionId, ...OPEN_SESSION_FILTER },
      {
        $set: {
          recommendations,
          selectionSummary: selectionSummary ?? null,
          status: 'curated',
          lastCompletedStep: 'curation',
          currentStep: 8,
          updatedAt: now,
        },
        $push: { stepHistory: { step: 'curation', completedAt: now } },
      },
    );
    await removeOpenDuplicateSessions(db, normalizedLead.email, newSessionId);
    return newSessionId;
  }

  await removeOpenDuplicateSessions(db, normalizedLead.email, targetSessionId);
  return targetSessionId;
}

export async function attachCheckoutDetails(sessionId, checkout) {
  const db = await getMongoDb();
  const now = new Date();
  await db.collection('samplingSessions').updateOne(
    { sessionId },
    {
      $set: {
        checkout,
        status: 'checkout_started',
        updatedAt: now,
      },
    },
  );
}

export async function recordPaymentIntent(sessionId, paymentIntent) {
  const db = await getMongoDb();
  const now = new Date();
  await db.collection('samplingSessions').updateOne(
    { sessionId },
    {
      $set: {
        paymentIntent,
        updatedAt: now,
      },
    },
  );
}

export async function markPaid(sessionId, payment) {
  const db = await getMongoDb();
  const now = new Date();
  await ensureSamplingIndexes();

  const existing = await db.collection('samplingSessions').findOne({ sessionId });
  if (!existing) {
    const err = new Error('Sampling session not found');
    err.statusCode = 404;
    throw err;
  }

  // Idempotent fast path: already finalized (client confirm + webhook often race).
  if (existing.status === 'paid' && existing.order?.sampleOrderNumber != null) {
    return {
      ok: true,
      alreadyPaid: true,
      payment: existing.payment,
      order: existing.order,
    };
  }

  const orderNumber = existing.order?.sampleOrderNumber
    ? existing.order.sampleOrderNumber
    : await allocateSampleOrderNumber();

  const transactionId =
    existing.order?.transactionId ||
    buildTransactionId(payment.paymentIntentId, orderNumber);

  const order = {
    ...buildOrderRecord({
      orderNumber,
      transactionId,
      paymentIntentId: payment.paymentIntentId,
    }),
    paidAt: payment.paidAt ?? now,
    amount: payment.amount,
    currency: payment.currency,
    product: 'curated-sample-kit',
  };

  const paymentRecord = {
    ...payment,
    transactionId,
    sampleOrderNumber: orderNumber,
    recordedAt: now,
  };

  // Atomic claim: only one concurrent caller (client confirm vs Stripe webhook)
  // may transition the session to paid and send notifications.
  const claim = await db.collection('samplingSessions').updateOne(
    { sessionId, status: { $ne: 'paid' } },
    {
      $set: {
        order,
        payment: paymentRecord,
        paymentIntent: {
          paymentIntentId: payment.paymentIntentId,
          status: payment.status ?? 'succeeded',
          amount: payment.amount,
          currency: payment.currency,
          updatedAt: now,
        },
        status: 'paid',
        updatedAt: now,
      },
      $push: {
        stepHistory: { step: 'paid', completedAt: now, sampleOrderNumber: orderNumber },
      },
    },
  );

  if (claim.matchedCount === 0) {
    const current = await db.collection('samplingSessions').findOne({ sessionId });
    return {
      ok: true,
      alreadyPaid: true,
      payment: current?.payment ?? existing.payment,
      order: current?.order ?? existing.order ?? null,
    };
  }

  const paidSession = {
    ...existing,
    sessionId,
    order,
    payment: paymentRecord,
    status: 'paid',
  };

  // Fire-and-forget: do not block payment confirmation on email delivery.
  // Tests can set SAMPLING_MARK_PAID_SILENT=1 to assert claim behavior without SMTP.
  if (process.env.SAMPLING_MARK_PAID_SILENT !== '1') {
    void notifySampleOrderPaid({
      session: paidSession,
      order,
      payment: paymentRecord,
    });
    void sendCustomerOrderConfirmation({
      session: paidSession,
      order,
      payment: paymentRecord,
    });
  }

  return { ok: true, alreadyPaid: false, payment: paymentRecord, order };
}

/**
 * Collect fragrance slugs from all prior paid sample kits for this email,
 * so a returning customer is not recommended the same set again.
 */
export async function getPriorPaidFragranceSlugsByEmail(email, { excludeSessionId } = {}) {
  const normalized = String(email ?? '').trim().toLowerCase();
  if (!normalized) return [];

  await ensureSamplingIndexes();
  const db = await getMongoDb();
  const filter = {
    status: 'paid',
    'lead.email': normalized,
  };
  if (excludeSessionId) {
    filter.sessionId = { $ne: String(excludeSessionId) };
  }

  const sessions = await db
    .collection('samplingSessions')
    .find(filter, { projection: { recommendations: 1 } })
    .toArray();

  const slugs = new Set();
  for (const doc of sessions) {
    for (const rec of doc.recommendations ?? []) {
      const slug = rec.fragranceSlug ?? rec.fragranceId;
      if (slug) slugs.add(String(slug));
    }
  }
  return [...slugs];
}
