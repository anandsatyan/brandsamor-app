import { getMongoDb } from '../db/mongo.mjs';
import { enrichDocumentsRecommendations } from '../fragrance/resolveRecommendationLabels.mjs';

function serializeOrder(doc) {
  if (!doc) return null;
  const recommendations = Array.isArray(doc.recommendations) ? doc.recommendations : [];
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
    recommendations: recommendations.map((rec) => ({
      fragranceSlug: rec.fragranceSlug ?? rec.fragranceId ?? null,
      fragranceNumber: rec.fragranceNumber ?? rec.number ?? null,
      fragranceName: rec.fragranceName ?? rec.customerFacingName ?? null,
      fragranceId: rec.fragranceId ?? null,
      inspiredBy: rec.inspiredBy
        ? {
            brand: rec.inspiredBy.brand ?? null,
            fragrance: rec.inspiredBy.fragrance ?? null,
          }
        : null,
      role: rec.role ?? null,
      reason: rec.reason ?? null,
    })),
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

  return enrichDocumentsRecommendations(docs.map(serializeOrder));
}

export async function getPaidOrderByNumber(sampleOrderNumber) {
  const db = await getMongoDb();
  const number = Number(sampleOrderNumber);
  if (!Number.isFinite(number)) return null;

  const doc = await db.collection('samplingSessions').findOne({
    status: 'paid',
    'order.sampleOrderNumber': number,
  });

  const serialized = serializeOrder(doc);
  if (!serialized) return null;
  const [enriched] = await enrichDocumentsRecommendations([serialized]);
  return enriched;
}

export async function getPaidOrderBySessionId(sessionId) {
  const db = await getMongoDb();
  const doc = await db.collection('samplingSessions').findOne({
    sessionId,
    status: 'paid',
  });
  const serialized = serializeOrder(doc);
  if (!serialized) return null;
  const [enriched] = await enrichDocumentsRecommendations([serialized]);
  return enriched;
}
