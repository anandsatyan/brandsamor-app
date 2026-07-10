import { getMongoDb } from '../db/mongo.mjs';

function serializeOrder(doc) {
  if (!doc) return null;
  return {
    sessionId: doc.sessionId,
    status: doc.status,
    order: doc.order ?? null,
    payment: doc.payment ?? null,
    paymentIntent: doc.paymentIntent ?? null,
    checkout: doc.checkout ?? null,
    lead: doc.lead
      ? {
          fullName: doc.lead.fullName,
          email: doc.lead.email,
          phone: doc.lead.phone,
          brandName: doc.lead.brandName,
          country: doc.lead.country,
        }
      : null,
    recommendations: doc.recommendations ?? [],
    selectionSummary: doc.selectionSummary ?? null,
    answers: doc.answers ?? null,
    createdAt: doc.createdAt ?? null,
    updatedAt: doc.updatedAt ?? null,
    paidAt: doc.payment?.paidAt ?? doc.order?.paidAt ?? null,
  };
}

export async function listPaidOrders({ limit = 100 } = {}) {
  const db = await getMongoDb();
  const docs = await db
    .collection('samplingSessions')
    .find({ status: 'paid' })
    .sort({ 'order.sampleOrderNumber': -1, 'payment.paidAt': -1, updatedAt: -1 })
    .limit(Math.min(Math.max(limit, 1), 500))
    .toArray();

  return docs.map(serializeOrder);
}

export async function getPaidOrderByNumber(sampleOrderNumber) {
  const db = await getMongoDb();
  const number = Number(sampleOrderNumber);
  if (!Number.isFinite(number)) return null;

  const doc = await db.collection('samplingSessions').findOne({
    status: 'paid',
    'order.sampleOrderNumber': number,
  });

  return serializeOrder(doc);
}

export async function getPaidOrderBySessionId(sessionId) {
  const db = await getMongoDb();
  const doc = await db.collection('samplingSessions').findOne({
    sessionId,
    status: 'paid',
  });
  return serializeOrder(doc);
}
