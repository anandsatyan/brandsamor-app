import Stripe from 'stripe';
import { sendJson } from '../leadHandler.mjs';
import { markPaid, recordPaymentIntent } from '../sampling/repo.mjs';

const readRawBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
      if (chunks.reduce((sum, item) => sum + item.length, 0) > 1_000_000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    req.on('error', reject);
  });

export async function handleStripeWebhook(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    sendJson(res, 501, { error: 'Stripe webhook is not configured' });
    return;
  }

  const signature = req.headers['stripe-signature'];
  if (!signature) {
    sendJson(res, 400, { error: 'Missing stripe-signature header' });
    return;
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    const stripe = new Stripe(secretKey);
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook payload';
    console.error('[stripe-webhook] Signature verification failed:', message);
    sendJson(res, 400, { error: 'Webhook signature verification failed' });
    return;
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;
      const sessionId = intent.metadata?.samplingSessionId;

      if (sessionId) {
        await markPaid(sessionId, {
          paymentIntentId: intent.id,
          amount: intent.amount,
          currency: intent.currency,
          paidAt: new Date(intent.created * 1000),
          source: 'stripe_webhook',
          eventId: event.id,
        });
        console.log(`[stripe-webhook] Marked session ${sessionId} as paid (${intent.id})`);
      } else {
        console.warn('[stripe-webhook] payment_intent.succeeded without samplingSessionId metadata', intent.id);
      }
    }

    if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object;
      const sessionId = intent.metadata?.samplingSessionId;
      if (sessionId) {
        await recordPaymentIntent(sessionId, {
          paymentIntentId: intent.id,
          status: 'payment_failed',
          lastPaymentError: intent.last_payment_error?.message ?? null,
        });
      }
    }

    sendJson(res, 200, { received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook handler error';
    console.error('[stripe-webhook] Handler error:', message);
    sendJson(res, 500, { error: message });
  }
}
