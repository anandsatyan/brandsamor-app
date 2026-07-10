import { getMongoDb } from '../db/mongo.mjs';
import { randomUUID } from 'node:crypto';
import {
  allocateSampleOrderNumber,
  buildOrderRecord,
  buildTransactionId,
} from './orderNumbers.mjs';

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

export async function upsertSamplingSession({ sessionId, step, lead, answers, currentStep }) {
  await ensureSamplingIndexes();
  const db = await getMongoDb();
  const now = new Date();
  const normalizedLead = normalizeLead(lead);
  const stepEntry = { step, completedAt: now };

  if (!sessionId) {
    const newSessionId = randomUUID();
    await db.collection('samplingSessions').insertOne({
      sessionId: newSessionId,
      lead: normalizedLead,
      answers: answers ?? {},
      currentStep: currentStep ?? 1,
      lastCompletedStep: step,
      stepHistory: [stepEntry],
      status: 'in_progress',
      recommendations: [],
      selectionSummary: null,
      createdAt: now,
      updatedAt: now,
    });
    return newSessionId;
  }

  const result = await db.collection('samplingSessions').updateOne(
    { sessionId },
    {
      $set: {
        lead: normalizedLead,
        answers: answers ?? {},
        currentStep: currentStep ?? 1,
        lastCompletedStep: step,
        status: 'in_progress',
        updatedAt: now,
      },
      $push: { stepHistory: stepEntry },
    },
  );

  if (result.matchedCount === 0) {
    await db.collection('samplingSessions').insertOne({
      sessionId,
      lead: normalizedLead,
      answers: answers ?? {},
      currentStep: currentStep ?? 1,
      lastCompletedStep: step,
      stepHistory: [stepEntry],
      status: 'in_progress',
      recommendations: [],
      selectionSummary: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  return sessionId;
}

export async function finalizeCuration({ sessionId, lead, answers, recommendations, selectionSummary }) {
  await ensureSamplingIndexes();
  const db = await getMongoDb();
  const now = new Date();

  if (!sessionId) {
    return upsertSamplingSession({
      sessionId: null,
      step: 'curation',
      lead,
      answers,
      currentStep: 8,
    }).then(async (newSessionId) => {
      await db.collection('samplingSessions').updateOne(
        { sessionId: newSessionId },
        {
          $set: {
            recommendations,
            selectionSummary: selectionSummary ?? null,
            status: 'curated',
            updatedAt: now,
          },
          $push: { stepHistory: { step: 'curation', completedAt: now } },
        },
      );
      return newSessionId;
    });
  }

  await db.collection('samplingSessions').updateOne(
    { sessionId },
    {
      $set: {
        lead: normalizeLead(lead),
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

  return sessionId;
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
  const existing = await db.collection('samplingSessions').findOne({ sessionId });

  if (
    existing?.status === 'paid' &&
    existing?.payment?.paymentIntentId &&
    existing.payment.paymentIntentId === payment.paymentIntentId
  ) {
    return {
      ok: true,
      alreadyPaid: true,
      payment: existing.payment,
      order: existing.order ?? null,
    };
  }

  const orderNumber = existing?.order?.sampleOrderNumber
    ? existing.order.sampleOrderNumber
    : await allocateSampleOrderNumber();

  const transactionId =
    existing?.order?.transactionId ||
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

  await db.collection('samplingSessions').updateOne(
    { sessionId },
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

  return { ok: true, alreadyPaid: false, payment: paymentRecord, order };
}
