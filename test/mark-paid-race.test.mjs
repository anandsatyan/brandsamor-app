import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import 'dotenv/config';

/**
 * Regression: client confirm-payment and Stripe webhook used to race inside
 * markPaid, allocating two order numbers and sending two email pairs.
 */
test('concurrent markPaid claims only one order and one notification path', async (t) => {
  const uri = process.env.DB_QUERY_STRING;
  if (!uri) {
    t.skip('DB_QUERY_STRING not set');
    return;
  }

  process.env.SAMPLING_MARK_PAID_SILENT = '1';

  // Dynamic import after dotenv so mongo.mjs sees the URI.
  const { markPaid } = await import('../server/sampling/repo.mjs');
  const { getMongoDb } = await import('../server/db/mongo.mjs');

  const db = await getMongoDb();
  const sessionId = `test-markpaid-${randomUUID()}`;
  const paymentIntentId = `pi_test_${randomUUID().replace(/-/g, '').slice(0, 24)}`;

  await db.collection('samplingSessions').insertOne({
    sessionId,
    status: 'checkout_started',
    lead: {
      fullName: 'Mark Paid Race Test',
      email: `markpaid-race-${sessionId.slice(-8)}@example.com`,
      phone: '+10000000000',
      country: 'US',
      consent: true,
    },
    answers: {},
    recommendations: [],
    stepHistory: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  t.after(async () => {
    await db.collection('samplingSessions').deleteOne({ sessionId });
  });

  const paymentBase = {
    paymentIntentId,
    status: 'succeeded',
    amount: 10000,
    amountReceived: 10000,
    currency: 'usd',
    livemode: false,
    paidAt: new Date(),
  };

  const [a, b] = await Promise.all([
    markPaid(sessionId, { ...paymentBase, source: 'client_confirm' }),
    markPaid(sessionId, { ...paymentBase, source: 'stripe_webhook' }),
  ]);

  const winners = [a, b].filter((r) => r.alreadyPaid === false);
  const losers = [a, b].filter((r) => r.alreadyPaid === true);

  assert.equal(winners.length, 1, 'exactly one caller should finalize payment');
  assert.equal(losers.length, 1, 'the other caller should see alreadyPaid');
  assert.equal(a.order?.sampleOrderNumber, b.order?.sampleOrderNumber);

  const doc = await db.collection('samplingSessions').findOne({ sessionId });
  const paidSteps = (doc.stepHistory || []).filter((h) => h.step === 'paid');
  assert.equal(paidSteps.length, 1, 'stepHistory must contain a single paid entry');
  assert.equal(doc.status, 'paid');
  assert.equal(doc.order?.sampleOrderNumber, winners[0].order.sampleOrderNumber);
});
