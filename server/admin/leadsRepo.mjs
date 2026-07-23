import { randomUUID } from 'node:crypto';
import { getMongoDb } from '../db/mongo.mjs';
import { enrichDocumentsRecommendations } from '../fragrance/resolveRecommendationLabels.mjs';
import { consolidateOpenEmailDuplicates } from '../sampling/repo.mjs';
import { heatSortRank, scoreSamplingLead } from './leadScore.mjs';

function serializeComments(comments) {
  if (!Array.isArray(comments)) return [];
  return comments
    .map((entry) => ({
      id: entry?.id ?? null,
      body: String(entry?.body ?? '').trim(),
      author: entry?.author ?? 'Admin',
      createdAt: entry?.createdAt ?? null,
    }))
    .filter((entry) => entry.body)
    .sort((a, b) => {
      const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bt - at;
    });
}

function serializeLead(doc) {
  if (!doc) return null;

  const answers = doc.answers ?? {};
  const recommendations = Array.isArray(doc.recommendations) ? doc.recommendations : [];

  return {
    sessionId: doc.sessionId,
    status: doc.status ?? 'in_progress',
    currentStep: typeof doc.currentStep === 'number' ? doc.currentStep : null,
    lastCompletedStep: doc.lastCompletedStep ?? null,
    stepHistory: Array.isArray(doc.stepHistory)
      ? doc.stepHistory.map((entry) => ({
          step: entry?.step ?? null,
          completedAt: entry?.completedAt ?? null,
          sampleOrderNumber: entry?.sampleOrderNumber ?? null,
        }))
      : [],
    comments: serializeComments(doc.opsComments),
    lead: doc.lead
      ? {
          fullName: doc.lead.fullName ?? '',
          email: doc.lead.email ?? '',
          phone: doc.lead.phone ?? '',
          brandName: doc.lead.brandName ?? null,
          country: doc.lead.country ?? '',
          consent: Boolean(doc.lead.consent),
        }
      : null,
    answers: {
      brandStage: answers.brandStage ?? null,
      businessType: answers.businessType ?? null,
      businessTypeOther: answers.businessTypeOther ?? null,
      scentExpression: answers.scentExpression ?? null,
      brandPersonalities: Array.isArray(answers.brandPersonalities) ? answers.brandPersonalities : [],
      scentFamilies: Array.isArray(answers.scentFamilies) ? answers.scentFamilies : [],
      intensity: answers.intensity ?? null,
      useCase: answers.useCase ?? null,
      commercialTier: answers.commercialTier ?? null,
      exclusions: Array.isArray(answers.exclusions) ? answers.exclusions : [],
      likedFragrances: answers.likedFragrances ?? null,
      additionalNotes: answers.additionalNotes ?? null,
      packagingDirection: answers.packagingDirection ?? null,
      bottleSize: answers.bottleSize ?? null,
    },
    recommendations: recommendations.map((rec) => ({
      fragranceSlug: rec.fragranceSlug ?? rec.fragranceId ?? null,
      fragranceNumber: rec.fragranceNumber ?? rec.number ?? null,
      fragranceName: rec.fragranceName ?? rec.customerFacingName ?? null,
      inspiredBy: rec.inspiredBy
        ? {
            brand: rec.inspiredBy.brand ?? null,
            fragrance: rec.inspiredBy.fragrance ?? null,
          }
        : null,
      role: rec.role ?? null,
      reason: rec.reason ?? null,
      stretch: Boolean(rec.stretch),
      exclusionConflicts: Array.isArray(rec.exclusionConflicts) ? rec.exclusionConflicts : [],
      preferenceScore: rec.preferenceScore ?? null,
      finalScore: rec.finalScore ?? null,
    })),
    selectionSummary: doc.selectionSummary ?? null,
    checkout: doc.checkout
      ? {
          email: doc.checkout.email ?? null,
          phone: doc.checkout.phone ?? null,
          firstName: doc.checkout.firstName ?? null,
          lastName: doc.checkout.lastName ?? null,
          company: doc.checkout.company ?? null,
          billingSameAsShipping: Boolean(doc.checkout.billingSameAsShipping),
          shipping: doc.checkout.shipping ?? null,
          billing: doc.checkout.billing ?? null,
        }
      : null,
    order: doc.order
      ? {
          sampleOrderNumber: doc.order.sampleOrderNumber ?? null,
          sampleOrderLabel: doc.order.sampleOrderLabel ?? null,
          transactionId: doc.order.transactionId ?? null,
          amount: doc.order.amount ?? null,
          currency: doc.order.currency ?? null,
          paidAt: doc.order.paidAt ?? null,
        }
      : null,
    payment: doc.payment
      ? {
          paymentIntentId: doc.payment.paymentIntentId ?? null,
          status: doc.payment.status ?? null,
          amount: doc.payment.amount ?? null,
          currency: doc.payment.currency ?? null,
          paidAt: doc.payment.paidAt ?? null,
          receiptUrl: doc.payment.receiptUrl ?? null,
        }
      : null,
    paymentIntent: doc.paymentIntent
      ? {
          paymentIntentId: doc.paymentIntent.paymentIntentId ?? null,
          status: doc.paymentIntent.status ?? null,
          amount: doc.paymentIntent.amount ?? null,
          currency: doc.paymentIntent.currency ?? null,
          lastPaymentError: doc.paymentIntent.lastPaymentError ?? null,
          updatedAt: doc.paymentIntent.updatedAt ?? null,
        }
      : null,
    createdAt: doc.createdAt ?? null,
    updatedAt: doc.updatedAt ?? null,
    leadScore: scoreSamplingLead(doc),
  };
}

function leadEmailKey(docOrLead) {
  const raw =
    docOrLead?.lead?.email ??
    docOrLead?.email ??
    docOrLead?.checkout?.email ??
    '';
  return String(raw).trim().toLowerCase();
}

/** Safety net: one open lead row per email (newest already sorted first). */
function dedupeOpenLeadsByEmail(leads) {
  const seen = new Set();
  const out = [];
  for (const lead of leads) {
    const email = leadEmailKey(lead);
    if (email) {
      if (seen.has(email)) continue;
      seen.add(email);
    }
    out.push(lead);
  }
  return out;
}

async function attachPriorOrders(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return leads;

  const emails = [
    ...new Set(leads.map((lead) => leadEmailKey(lead)).filter(Boolean)),
  ];
  if (emails.length === 0) {
    return leads.map((lead) => ({ ...lead, priorOrders: [], priorOrderCount: 0 }));
  }

  const db = await getMongoDb();
  const orderDocs = await db
    .collection('samplingSessions')
    .find(
      {
        status: { $in: ['paid', 'canceled'] },
        'lead.email': { $in: emails },
        'order.sampleOrderNumber': { $exists: true, $ne: null },
      },
      {
        projection: {
          sessionId: 1,
          status: 1,
          'lead.email': 1,
          'order.sampleOrderNumber': 1,
          'order.sampleOrderLabel': 1,
          'order.amount': 1,
          'order.currency': 1,
          'order.paidAt': 1,
          'order.canceledAt': 1,
          'payment.paidAt': 1,
        },
      },
    )
    .sort({ 'order.sampleOrderNumber': -1 })
    .toArray();

  const byEmail = new Map();
  for (const doc of orderDocs) {
    const email = leadEmailKey(doc);
    if (!email) continue;
    const entry = {
      sessionId: doc.sessionId,
      status: doc.status,
      sampleOrderNumber: doc.order?.sampleOrderNumber ?? null,
      sampleOrderLabel: doc.order?.sampleOrderLabel ?? null,
      amount: doc.order?.amount ?? null,
      currency: doc.order?.currency ?? null,
      paidAt: doc.order?.paidAt ?? doc.payment?.paidAt ?? null,
      canceledAt: doc.order?.canceledAt ?? null,
    };
    if (!byEmail.has(email)) byEmail.set(email, []);
    byEmail.get(email).push(entry);
  }

  return leads.map((lead) => {
    const email = leadEmailKey(lead);
    const priorOrders = (byEmail.get(email) || []).filter(
      (order) => order.sessionId !== lead.sessionId,
    );
    return {
      ...lead,
      priorOrders,
      priorOrderCount: priorOrders.length,
    };
  });
}

export async function listLeads({ limit = 200, status, q, sort = 'newest', heat } = {}) {
  const db = await getMongoDb();
  await consolidateOpenEmailDuplicates(db);

  const requestedStatus = String(status ?? 'all');
  // Completed orders live under Orders. Returning buyers can still open a new lead journey.
  if (requestedStatus === 'paid' || requestedStatus === 'canceled') {
    return [];
  }

  const filter = {
    status: { $nin: ['paid', 'canceled'] },
  };

  if (requestedStatus && requestedStatus !== 'all') {
    filter.status = String(requestedStatus);
  }

  const query = String(q ?? '').trim();
  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    filter.$or = [
      { 'lead.fullName': regex },
      { 'lead.email': regex },
      { 'lead.phone': regex },
      { 'lead.brandName': regex },
      { sessionId: regex },
      { 'order.sampleOrderLabel': regex },
    ];
  }

  const mode = String(sort ?? 'newest').toLowerCase();
  const fetchLimit = Math.min(Math.max(Number(limit) || 200, 1), 500);

  // Over-fetch so email dedupe still fills the requested page size.
  const docs = await db
    .collection('samplingSessions')
    .find(filter)
    .sort({ createdAt: -1, updatedAt: -1 })
    .limit(Math.min(fetchLimit * 3, 1500))
    .toArray();

  let leads = await enrichDocumentsRecommendations(docs.map(serializeLead));
  leads = dedupeOpenLeadsByEmail(leads);

  const heatFilter = String(heat ?? 'all').toLowerCase();
  if (heatFilter === 'hot' || heatFilter === 'warm' || heatFilter === 'cold') {
    leads = leads.filter((lead) => lead.leadScore?.tier === heatFilter);
  }

  if (mode === 'heat' || mode === 'score') {
    leads = [...leads].sort((a, b) => {
      const scoreDelta = (b.leadScore?.score ?? 0) - (a.leadScore?.score ?? 0);
      if (scoreDelta !== 0) return scoreDelta;
      const tierDelta = heatSortRank(a.leadScore?.tier) - heatSortRank(b.leadScore?.tier);
      if (tierDelta !== 0) return tierDelta;
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  } else {
    // newest / recent — chronological by createdAt, newest first
    leads = [...leads].sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (aTime !== bTime) return bTime - aTime;
      const aUpdated = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bUpdated = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bUpdated - aUpdated;
    });
  }

  leads = leads.slice(0, fetchLimit);
  return attachPriorOrders(leads);
}

export async function getLeadBySessionId(sessionId) {
  if (!sessionId) return null;
  const db = await getMongoDb();
  const doc = await db.collection('samplingSessions').findOne({ sessionId: String(sessionId) });
  const serialized = serializeLead(doc);
  if (!serialized) return null;
  const [enriched] = await enrichDocumentsRecommendations([serialized]);
  const [withPrior] = await attachPriorOrders([enriched]);
  return withPrior;
}

export async function addLeadComment(sessionId, { body, author } = {}) {
  const text = String(body ?? '').trim();
  if (!sessionId || !text) return null;

  const db = await getMongoDb();
  const comment = {
    id: randomUUID(),
    body: text.slice(0, 5000),
    author: String(author ?? 'Admin').trim() || 'Admin',
    createdAt: new Date(),
  };

  const result = await db.collection('samplingSessions').findOneAndUpdate(
    { sessionId: String(sessionId) },
    {
      $push: { opsComments: comment },
      $set: { updatedAt: new Date() },
    },
    { returnDocument: 'after' },
  );

  const doc = result?.value ?? result;
  if (!doc) {
    // Older mongodb driver shapes / missing doc
    const existing = await db.collection('samplingSessions').findOne({ sessionId: String(sessionId) });
    if (!existing) return null;
  }

  const latest = await db.collection('samplingSessions').findOne({ sessionId: String(sessionId) });
  const serialized = serializeLead(latest);
  if (!serialized) return null;
  const [enriched] = await enrichDocumentsRecommendations([serialized]);
  const [withPrior] = await attachPriorOrders([enriched]);
  return withPrior;
}

export async function getAdminDashboardStats() {
  const db = await getMongoDb();
  await consolidateOpenEmailDuplicates(db);
  const collection = db.collection('samplingSessions');

  const [leadsCount, ordersCount, statusCounts, scoreDocs] = await Promise.all([
    collection.countDocuments({ status: { $nin: ['paid', 'canceled'] } }),
    collection.countDocuments({
      $or: [
        { status: { $in: ['paid', 'canceled'] } },
        { 'order.sampleOrderNumber': { $exists: true, $ne: null } },
      ],
    }),
    collection
      .aggregate([
        { $match: { status: { $nin: ['paid', 'canceled'] } } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ])
      .toArray(),
    collection
      .find(
        { status: { $nin: ['paid', 'canceled'] } },
        {
          projection: {
            lead: 1,
            answers: 1,
            checkout: 1,
            status: 1,
            createdAt: 1,
          },
        },
      )
      .limit(2000)
      .toArray(),
  ]);

  const byStatus = {
    in_progress: 0,
    curated: 0,
    checkout_started: 0,
  };
  for (const row of statusCounts) {
    if (row?._id) {
      byStatus[row._id] = row.count;
    }
  }

  const byHeat = { hot: 0, warm: 0, cold: 0 };
  for (const doc of scoreDocs) {
    const tier = scoreSamplingLead(doc).tier;
    if (tier === 'hot' || tier === 'warm' || tier === 'cold') {
      byHeat[tier] += 1;
    }
  }

  return {
    leadsCount,
    ordersCount,
    byStatus,
    byHeat,
  };
}
