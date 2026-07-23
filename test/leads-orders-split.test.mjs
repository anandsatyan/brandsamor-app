import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import 'dotenv/config';

/**
 * Leads = open journeys (one per email).
 * Orders = paid/canceled kits (one row per order number).
 * Returning buyers may appear in both.
 */
test('leads/orders split: open leads exclude orders; returners keep priorOrders', async (t) => {
  const uri = process.env.DB_QUERY_STRING;
  if (!uri) {
    t.skip('DB_QUERY_STRING not set');
    return;
  }

  const { getMongoDb } = await import('../server/db/mongo.mjs');
  const { listLeads } = await import('../server/admin/leadsRepo.mjs');
  const { listPaidOrders } = await import('../server/admin/ordersRepo.mjs');
  const { upsertSamplingSession } = await import('../server/sampling/repo.mjs');

  const db = await getMongoDb();
  const suffix = randomUUID().slice(0, 8);
  const email = `returner-${suffix}@example.com`;
  const paidSessionId = `test-paid-${suffix}`;
  const openSessionIds = [];

  await db.collection('samplingSessions').insertOne({
    sessionId: paidSessionId,
    status: 'paid',
    lead: {
      fullName: 'Returner Test',
      email,
      phone: '+10000000000',
      country: 'US',
      consent: true,
    },
    answers: {},
    recommendations: [],
    stepHistory: [{ step: 'paid', completedAt: new Date() }],
    order: {
      sampleOrderNumber: 900000 + Math.floor(Math.random() * 9000),
      sampleOrderLabel: `SO-TEST-${suffix}`,
      amount: 10000,
      currency: 'usd',
      paidAt: new Date(),
      transactionId: `txn_test_${suffix}`,
    },
    payment: {
      paymentIntentId: `pi_test_${suffix}`,
      status: 'succeeded',
      amount: 10000,
      currency: 'usd',
      paidAt: new Date(),
    },
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  });

  t.after(async () => {
    await db.collection('samplingSessions').deleteMany({
      $or: [
        { sessionId: paidSessionId },
        { sessionId: { $in: openSessionIds } },
        { 'lead.email': email },
      ],
    });
  });

  // Returning buyer opens a fresh journey — should not reuse the paid session.
  const openSessionId = await upsertSamplingSession({
    sessionId: null,
    step: 'contact',
    lead: {
      fullName: 'Returner Test',
      email,
      phone: '+10000000000',
      country: 'US',
      consent: true,
    },
    answers: {},
    currentStep: 1,
  });
  openSessionIds.push(openSessionId);

  // Second upsert with same email must stay on one open lead (no open duplicates).
  const sameOpenId = await upsertSamplingSession({
    sessionId: randomUUID(),
    step: 'brand',
    lead: {
      fullName: 'Returner Test',
      email,
      phone: '+10000000000',
      country: 'US',
      consent: true,
    },
    answers: { brandStage: 'exploring' },
    currentStep: 2,
  });
  openSessionIds.push(sameOpenId);
  assert.equal(sameOpenId, openSessionId, 'open sessions must reuse one lead per email');

  const openCount = await db.collection('samplingSessions').countDocuments({
    'lead.email': email,
    status: { $nin: ['paid', 'canceled'] },
  });
  assert.equal(openCount, 1, 'exactly one open lead per email');

  const leads = await listLeads({ limit: 500, q: email });
  assert.equal(leads.length, 1, 'paid session must not appear in leads list');
  assert.equal(leads[0].sessionId, openSessionId);
  assert.notEqual(leads[0].status, 'paid');
  assert.ok((leads[0].priorOrderCount ?? 0) >= 1, 'returner should expose priorOrders');
  assert.equal(leads[0].priorOrders[0].sessionId, paidSessionId);

  const orders = await listPaidOrders({ limit: 500 });
  const theirs = orders.filter((o) => o.sessionId === paidSessionId);
  assert.equal(theirs.length, 1, 'paid kit remains a single Orders row');
  assert.equal(theirs[0].status, 'paid');
});
