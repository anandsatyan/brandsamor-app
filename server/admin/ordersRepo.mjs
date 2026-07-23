import { getMongoDb } from '../db/mongo.mjs';
import { enrichDocumentsRecommendations } from '../fragrance/resolveRecommendationLabels.mjs';

const ORDER_STATUSES = ['paid', 'canceled'];

function serializeOrder(doc) {
  if (!doc) return null;
  const recommendations = Array.isArray(doc.recommendations) ? doc.recommendations : [];
  return {
    sessionId: doc.sessionId,
    status: doc.status,
    order: doc.order
      ? {
          sampleOrderNumber: doc.order.sampleOrderNumber ?? null,
          sampleOrderLabel: doc.order.sampleOrderLabel ?? null,
          transactionId: doc.order.transactionId ?? null,
          amount: doc.order.amount ?? null,
          currency: doc.order.currency ?? null,
          paidAt: doc.order.paidAt ?? null,
          product: doc.order.product ?? null,
          canceledAt: doc.order.canceledAt ?? null,
          cancelReason: doc.order.cancelReason ?? null,
          refund: doc.order.refund
            ? {
                amount: doc.order.refund.amount ?? null,
                currency: doc.order.refund.currency ?? null,
                refundedAt: doc.order.refund.refundedAt ?? null,
                note: doc.order.refund.note ?? null,
                recordedBy: doc.order.refund.recordedBy ?? null,
              }
            : null,
        }
      : null,
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
      stretch: Boolean(rec.stretch),
      exclusionConflicts: Array.isArray(rec.exclusionConflicts) ? rec.exclusionConflicts : [],
    })),
    selectionSummary: doc.selectionSummary ?? null,
    answers: doc.answers ?? null,
    createdAt: doc.createdAt ?? null,
    updatedAt: doc.updatedAt ?? null,
    paidAt: doc.payment?.paidAt ?? doc.order?.paidAt ?? null,
  };
}

async function enrichOne(doc) {
  const serialized = serializeOrder(doc);
  if (!serialized) return null;
  const [enriched] = await enrichDocumentsRecommendations([serialized]);
  return enriched;
}

export async function listPaidOrders({ limit = 100 } = {}) {
  const db = await getMongoDb();
  const docs = await db
    .collection('samplingSessions')
    .find({
      'order.sampleOrderNumber': { $exists: true, $ne: null },
      status: { $in: ORDER_STATUSES },
    })
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
    'order.sampleOrderNumber': number,
    status: { $in: ORDER_STATUSES },
  });

  return enrichOne(doc);
}

export async function getPaidOrderBySessionId(sessionId) {
  const db = await getMongoDb();
  const doc = await db.collection('samplingSessions').findOne({
    sessionId,
    status: { $in: ORDER_STATUSES },
  });
  return enrichOne(doc);
}

/**
 * Mark a paid sample-kit order as canceled after an offline/manual refund.
 * Preserves lead, answers, recommendations, and payment history.
 */
export async function cancelPaidOrder(sampleOrderNumber, { reason, note, recordedBy } = {}) {
  const db = await getMongoDb();
  const number = Number(sampleOrderNumber);
  if (!Number.isFinite(number)) {
    const err = new Error('Invalid order number');
    err.statusCode = 400;
    throw err;
  }

  const existing = await db.collection('samplingSessions').findOne({
    'order.sampleOrderNumber': number,
  });

  if (!existing) {
    const err = new Error('Order not found');
    err.statusCode = 404;
    throw err;
  }

  if (existing.status === 'canceled') {
    return enrichOne(existing);
  }

  if (existing.status !== 'paid') {
    const err = new Error('Only paid orders can be canceled');
    err.statusCode = 409;
    throw err;
  }

  const now = new Date();
  const amount =
    typeof existing.order?.amount === 'number'
      ? existing.order.amount
      : typeof existing.payment?.amount === 'number'
        ? existing.payment.amount
        : 10000;
  const currency = existing.order?.currency || existing.payment?.currency || 'usd';
  const cancelReason =
    String(reason ?? '').trim() || 'Unable to service — refunded to customer';
  const refundNote = String(note ?? '').trim() || 'Refund recorded in admin after Stripe refund';

  await db.collection('samplingSessions').updateOne(
    { sessionId: existing.sessionId, status: 'paid' },
    {
      $set: {
        status: 'canceled',
        updatedAt: now,
        'order.canceledAt': now,
        'order.cancelReason': cancelReason.slice(0, 1000),
        'order.refund': {
          amount,
          currency,
          refundedAt: now,
          note: refundNote.slice(0, 2000),
          recordedBy: String(recordedBy ?? 'Admin').trim() || 'Admin',
        },
        'payment.refundStatus': 'refunded',
        'payment.refundedAt': now,
        'payment.refundAmount': amount,
        'payment.refundCurrency': currency,
      },
      $push: {
        stepHistory: {
          step: 'canceled',
          completedAt: now,
          sampleOrderNumber: number,
          refundAmount: amount,
        },
      },
    },
  );

  const latest = await db.collection('samplingSessions').findOne({ sessionId: existing.sessionId });
  return enrichOne(latest);
}
