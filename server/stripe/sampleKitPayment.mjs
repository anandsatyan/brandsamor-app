import Stripe from 'stripe';
import { markPaid, recordPaymentIntent, attachCheckoutDetails } from '../sampling/repo.mjs';
import {
  assertOrderCountryAllowed,
  getSampleKitPrice,
} from '../../shared/sampleKitPricing.mjs';
import { getMongoDb } from '../db/mongo.mjs';

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

function resolveKitPriceFromCheckout(checkout) {
  const country =
    checkout?.shipping?.country ||
    checkout?.billing?.country ||
    checkout?.country ||
    '';
  return getSampleKitPrice(country);
}

async function assertCheckoutCountriesAllowed(sessionId, checkout) {
  const db = await getMongoDb();
  const session = await db.collection('samplingSessions').findOne(
    { sessionId: String(sessionId) },
    { projection: { 'lead.country': 1 } },
  );

  assertOrderCountryAllowed(
    checkout?.shipping?.country,
    checkout?.billing?.country,
    checkout?.country,
    session?.lead?.country,
  );
}

/**
 * Create a PaymentIntent for the curated sample kit and persist intent metadata.
 * Amount/currency follow the customer's country (fallback USD $100).
 * If reusePaymentIntentId is provided, refresh only when currency+amount still match.
 */
export async function createSampleKitPaymentIntent(
  sessionId,
  { reusePaymentIntentId, checkout = null } = {},
) {
  await assertCheckoutCountriesAllowed(sessionId, checkout);
  const { amount, currency } = resolveKitPriceFromCheckout(checkout);
  const stripe = getStripe();

  if (reusePaymentIntentId) {
    const existing = await stripe.paymentIntents.retrieve(reusePaymentIntentId);
    if (existing.metadata?.samplingSessionId !== sessionId) {
      const err = new Error('Payment intent does not match this sampling session');
      err.statusCode = 403;
      throw err;
    }

    const samePrice =
      String(existing.currency || '').toLowerCase() === currency &&
      Number(existing.amount) === amount;

    if (samePrice && ['requires_payment_method', 'requires_confirmation', 'requires_action'].includes(existing.status)) {
      return {
        clientSecret: existing.client_secret,
        paymentIntentId: existing.id,
        amount: existing.amount,
        currency: existing.currency,
        reused: true,
      };
    }

    // Country/currency changed (or intent no longer reusable) — create a fresh intent.
    if (['requires_payment_method', 'requires_confirmation', 'requires_action'].includes(existing.status)) {
      try {
        await stripe.paymentIntents.cancel(reusePaymentIntentId);
      } catch {
        // Best-effort cancel; continue creating a new intent.
      }
    }
  }

  const intent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
    metadata: {
      samplingSessionId: sessionId,
      product: 'curated-sample-kit',
      pricingCountry: String(
        checkout?.shipping?.country || checkout?.billing?.country || '',
      )
        .trim()
        .toUpperCase(),
    },
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

  await assertCheckoutCountriesAllowed(sessionId, checkout);

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
