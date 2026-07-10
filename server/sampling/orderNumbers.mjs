import { getMongoDb } from '../db/mongo.mjs';

const COUNTER_ID = 'sampleKitOrderNumber';
const COUNTER_START = 10100; // first $inc yields 10101

export async function allocateSampleOrderNumber() {
  const db = await getMongoDb();
  await db.collection('counters').updateOne(
    { _id: COUNTER_ID },
    { $setOnInsert: { seq: COUNTER_START } },
    { upsert: true },
  );

  const result = await db.collection('counters').findOneAndUpdate(
    { _id: COUNTER_ID },
    { $inc: { seq: 1 } },
    { returnDocument: 'after' },
  );

  const seq =
    typeof result?.seq === 'number'
      ? result.seq
      : typeof result?.value?.seq === 'number'
        ? result.value.seq
        : null;
  if (!seq) throw new Error('Could not allocate sample order number');
  return seq;
}

export function buildTransactionId(paymentIntentId, orderNumber) {
  const short = String(paymentIntentId || '')
    .replace(/^pi_/, '')
    .slice(0, 10)
    .toUpperCase();
  return `TXN-${orderNumber}-${short || 'PENDING'}`;
}

export function buildOrderRecord({ orderNumber, transactionId, paymentIntentId }) {
  return {
    sampleOrderNumber: orderNumber,
    sampleOrderLabel: `SO-${orderNumber}`,
    transactionId,
    paymentIntentId: paymentIntentId ?? null,
  };
}
