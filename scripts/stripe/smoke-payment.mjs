/**
 * Smoke-test Stripe sample-kit payment APIs without charging a card.
 * Creates a temporary sampling session + PaymentIntent, asserts confirm rejects
 * unpaid intents, then cancels the intent.
 */
import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import Stripe from 'stripe';
import { upsertSamplingSession, attachCheckoutDetails } from '../../server/sampling/repo.mjs';
import {
  confirmSampleKitPayment,
  createSampleKitPaymentIntent,
} from '../../server/stripe/sampleKitPayment.mjs';

const lead = {
  fullName: 'Payment Test',
  email: `payment-test-${Date.now()}@example.com`,
  phone: '+15555550100',
  brandName: 'Test Brand',
  country: 'US',
  consent: true,
};

const checkout = {
  email: lead.email,
  phone: lead.phone,
  firstName: 'Payment',
  lastName: 'Test',
  company: 'Test Brand',
  shipping: {
    line1: '1 Test Street',
    line2: '',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
  },
  billing: {
    line1: '1 Test Street',
    line2: '',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
  },
  billingSameAsShipping: true,
};

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is required');
  }
  if (!process.env.VITE_STRIPE_PUBLISHABLE_KEY && !process.env.STRIPE_PUBLISHABLE_KEY) {
    throw new Error('VITE_STRIPE_PUBLISHABLE_KEY or STRIPE_PUBLISHABLE_KEY is required');
  }

  const sessionId = await upsertSamplingSession({
    sessionId: randomUUID(),
    step: 'contact',
    lead,
    answers: {},
    currentStep: 1,
  });

  await attachCheckoutDetails(sessionId, checkout);
  const created = await createSampleKitPaymentIntent(sessionId);

  if (!created.clientSecret?.includes('_secret_') || !created.paymentIntentId?.startsWith('pi_')) {
    throw new Error('Unexpected create-payment-intent response shape');
  }

  const unpaid = await confirmSampleKitPayment({
    sessionId,
    paymentIntentId: created.paymentIntentId,
  });

  if (unpaid.ok) {
    throw new Error('confirm should not succeed for an unpaid PaymentIntent');
  }
  if (unpaid.status !== 'requires_payment_method' && unpaid.status !== 'requires_confirmation') {
    throw new Error(`Unexpected unpaid status: ${unpaid.status}`);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  await stripe.paymentIntents.cancel(created.paymentIntentId);

  console.log(
    JSON.stringify(
      {
        ok: true,
        sessionId,
        paymentIntentId: created.paymentIntentId,
        unpaidStatus: unpaid.status,
        cancelled: true,
        publishableKeyConfigured: Boolean(
          process.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY,
        ),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
