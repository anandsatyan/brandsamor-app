import 'dotenv/config';
import { readJsonBody, sendJson } from '../server/leadHandler.mjs';
import { listPublicFragrances, getPublicFragranceBySlug } from '../server/fragrance/repo.mjs';
import { toPublicFragrance } from '../server/fragrance/publicSerializer.mjs';
import { recommendFive } from '../server/sampling/recommendationEngine.mjs';
import {
  upsertSamplingSession,
  finalizeCuration,
  attachCheckoutDetails,
  recordPaymentIntent,
} from '../server/sampling/repo.mjs';
import { handleStripeWebhook } from '../server/stripe/webhookHandler.mjs';
import Stripe from 'stripe';

/**
 * Exposes sampling / fragrance / checkout APIs during `npm run dev`
 * (same routes as production `server.mjs`).
 */
export const samplingApiPlugin = () => ({
  name: 'sampling-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url || '/', 'http://localhost');
      const pathname = url.pathname;

      try {
        if (pathname === '/api/sampling/session' && req.method === 'POST') {
          const payload = await readJsonBody(req);
          const lead = payload?.lead ?? null;
          const answers = payload?.answers ?? null;
          const step = String(payload?.step ?? '');
          const sessionId = payload?.sessionId ? String(payload.sessionId) : undefined;
          const currentStep = Number(payload?.currentStep ?? 1);

          if (!lead || !step) {
            sendJson(res, 400, { error: 'Missing lead or step' });
            return;
          }

          if (step === 'contact') {
            const email = String(lead.email ?? '').trim();
            const phone = String(lead.phone ?? '').trim();
            if (!email || !phone) {
              sendJson(res, 400, { error: 'Contact step requires email and phone' });
              return;
            }
          }

          const savedSessionId = await upsertSamplingSession({
            sessionId,
            step,
            lead,
            answers: answers ?? {},
            currentStep,
          });

          sendJson(res, 200, { sessionId: savedSessionId, ok: true });
          return;
        }

        if (pathname === '/api/sampling/curate' && req.method === 'POST') {
          const payload = await readJsonBody(req);
          const lead = payload?.lead ?? null;
          const answers = payload?.answers ?? null;
          const sessionId = payload?.sessionId ? String(payload.sessionId) : undefined;

          if (!lead || !answers) {
            sendJson(res, 400, { error: 'Missing lead or answers' });
            return;
          }

          const result = await recommendFive(answers);
          const savedSessionId = await finalizeCuration({
            sessionId,
            lead,
            answers,
            recommendations: result.recommendations,
            selectionSummary: result.selectionSummary,
          });

          sendJson(res, 200, { sessionId: savedSessionId, ...result });
          return;
        }

        if (pathname === '/api/checkout/create-payment-intent' && req.method === 'POST') {
          const secret = process.env.STRIPE_SECRET_KEY;
          if (!secret) {
            sendJson(res, 501, { error: 'Stripe is not configured' });
            return;
          }

          const payload = await readJsonBody(req);
          const sessionId = String(payload?.sessionId ?? '');
          const checkout = payload?.checkout ?? null;

          if (!sessionId || !checkout) {
            sendJson(res, 400, { error: 'Missing sessionId or checkout details' });
            return;
          }

          await attachCheckoutDetails(sessionId, checkout);

          const amount = Number(process.env.STRIPE_SAMPLE_KIT_AMOUNT_CENTS || 10000);
          const currency = process.env.STRIPE_CURRENCY || 'usd';
          const stripe = new Stripe(secret);

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
            createdAt: new Date(),
          });

          sendJson(res, 200, { clientSecret: intent.client_secret, paymentIntentId: intent.id });
          return;
        }

        if (pathname === '/api/stripe/webhook' && req.method === 'POST') {
          await handleStripeWebhook(req, res);
          return;
        }

        if (pathname === '/api/fragrances/public' && req.method === 'GET') {
          const rows = await listPublicFragrances();
          sendJson(res, 200, { fragrances: rows.map(toPublicFragrance) });
          return;
        }

        if (pathname.startsWith('/api/fragrances/public/') && req.method === 'GET') {
          const slug = decodeURIComponent(pathname.replace('/api/fragrances/public/', ''));
          const row = await getPublicFragranceBySlug(slug);
          if (!row) {
            sendJson(res, 404, { error: 'Not found' });
            return;
          }
          sendJson(res, 200, { fragrance: toPublicFragrance(row) });
          return;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Server error';
        console.error('[sampling-api]', pathname, message);
        sendJson(res, 500, { error: message });
        return;
      }

      next();
    });
  },
});
