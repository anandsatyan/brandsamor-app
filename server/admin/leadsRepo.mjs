import { getMongoDb } from '../db/mongo.mjs';

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
      exclusions: Array.isArray(answers.exclusions) ? answers.exclusions : [],
      likedFragrances: answers.likedFragrances ?? null,
      additionalNotes: answers.additionalNotes ?? null,
      packagingDirection: answers.packagingDirection ?? null,
      bottleSize: answers.bottleSize ?? null,
    },
    recommendations: recommendations.map((rec) => ({
      fragranceSlug: rec.fragranceSlug ?? rec.fragranceId ?? null,
      role: rec.role ?? null,
      reason: rec.reason ?? null,
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
  };
}

export async function listLeads({ limit = 200, status, q } = {}) {
  const db = await getMongoDb();
  const filter = {};

  if (status && status !== 'all') {
    filter.status = String(status);
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

  const docs = await db
    .collection('samplingSessions')
    .find(filter)
    .sort({ updatedAt: -1, createdAt: -1 })
    .limit(Math.min(Math.max(Number(limit) || 200, 1), 500))
    .toArray();

  return docs.map(serializeLead);
}

export async function getLeadBySessionId(sessionId) {
  if (!sessionId) return null;
  const db = await getMongoDb();
  const doc = await db.collection('samplingSessions').findOne({ sessionId: String(sessionId) });
  return serializeLead(doc);
}

export async function getAdminDashboardStats() {
  const db = await getMongoDb();
  const collection = db.collection('samplingSessions');

  const [leadsCount, ordersCount, statusCounts] = await Promise.all([
    collection.countDocuments({}),
    collection.countDocuments({ status: 'paid' }),
    collection
      .aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
      .toArray(),
  ]);

  const byStatus = {
    in_progress: 0,
    curated: 0,
    checkout_started: 0,
    paid: 0,
  };
  for (const row of statusCounts) {
    if (row?._id && Object.prototype.hasOwnProperty.call(byStatus, row._id)) {
      byStatus[row._id] = row.count;
    } else if (row?._id) {
      byStatus[row._id] = row.count;
    }
  }

  return {
    leadsCount,
    ordersCount,
    byStatus,
  };
}
