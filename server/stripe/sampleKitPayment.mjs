import Stripe from 'stripe';
import { markPaid, recordPaymentIntent, attachCheckoutDetails } from '../sampling/repo.mjs';

function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error('Stripe is not configured');
  return new Stripe(secret);
}

function buildPaymentRecord(intent, source, extras = {}) {
  const charge =
    intent.latest_charge && typeof intent.latest_charge === 'object'
      ? intent.latest_charge
      : null;

  return {
    paymentIntentId: intent.id,
    status: intent.status,
    amount: intent.amount,
    amountReceived: intent.amount_received ?? intent.amount,
    currency: intent.currency,
    livemode: Boolean(intent.livemode),
    paymentMethodTypes: intent.payment_method_types ?? [],
    paymentMethodId:
      typeof intent.payment_method === 'string'
        ? intent.payment_method
        : intent.payment_method?.id ?? null,
    receiptEmail: intent.receipt_email ?? null,
    chargeId: typeof intent.latest_charge === 'string' ? intent.latest_charge : charge?.id ?? null,
    receiptUrl: charge?.receipt_url ?? null,
    paidAt: new Date((intent.created || Math.floor(Date.now() / 1000)) * 1000),
    source,
    ...extras,
  };
}

/**
 * Create a PaymentIntent for the curated sample kit and persist intent metadata.
 * If reusePaymentIntentId is provided, only refresh checkout attachment metadata.
 */
export async function createSampleKitPaymentIntent(sessionId, { reusePaymentIntentId } = {}) {
  const amount = Number(process.env.STRIPE_SAMPLE_KIT_AMOUNT_CENTS || 10000);
  const currency = process.env.STRIPE_CURRENCY || 'usd';
  const stripe = getStripe();

  if (reusePaymentIntentId) {
    const existing = await stripe.paymentIntents.retrieve(reusePaymentIntentId);
    if (existing.metadata?.samplingSessionId !== sessionId) {
      const err = new Error('Payment intent does not match this sampling session');
      err.statusCode = 403;
      throw err;
    }
    return {
      clientSecret: existing.client_secret,
      paymentIntentId: existing.id,
      amount: existing.amount,
      currency: existing.currency,
      reused: true,
    };
  }

  const intent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
    metadata: { samplingSessionId: sessionId, product: 'curated-sample-kit' },
  });

  await recordPaymentIntent(sessionId, {
    paymentIntentId: intent.id,
    status: intent.status,
    amount: intent.amount,
    currency: intent.currency,
    livemode: Boolean(intent.livemode),
    createdAt: new Date(),
  });

  return {
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
    amount: intent.amount,
    currency: intent.currency,
    reused: false,
  };
}

/**
 * After client-side confirmation, verify the PaymentIntent with Stripe and mark the session paid.
 */
export async function confirmSampleKitPayment({ sessionId, paymentIntentId, checkout }) {
  if (!sessionId || !paymentIntentId) {
    const err = new Error('Missing sessionId or paymentIntentId');
    err.statusCode = 400;
    throw err;
  }

  if (checkout) {
    await attachCheckoutDetails(sessionId, checkout);
  }

  const stripe = getStripe();
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ['latest_charge'],
  });

  if (intent.metadata?.samplingSessionId !== sessionId) {
    const err = new Error('Payment does not match this sampling session');
    err.statusCode = 403;
    throw err;
  }

  await recordPaymentIntent(sessionId, {
    paymentIntentId: intent.id,
    status: intent.status,
    amount: intent.amount,
    currency: intent.currency,
    livemode: Boolean(intent.livemode),
    updatedAt: new Date(),
    lastPaymentError: intent.last_payment_error?.message ?? null,
  });

  if (intent.status !== 'succeeded') {
    return {
      ok: false,
      status: intent.status,
      error: `Payment is ${intent.status}. Complete payment before confirming.`,
    };
  }

  const payment = buildPaymentRecord(intent, 'client_confirm');
  const result = await markPaid(sessionId, payment);

  return {
    ok: true,
    alreadyPaid: Boolean(result.alreadyPaid),
    status: intent.status,
    payment: result.payment,
    order: result.order,
  };
}
