import 'dotenv/config';
import { readJsonBody, sendJson } from '../server/leadHandler.mjs';
import { listPublicFragrances, getPublicFragranceBySlug } from '../server/fragrance/repo.mjs';
import { toPublicFragrance } from '../server/fragrance/publicSerializer.mjs';
import { recommendFive } from '../server/sampling/recommendationEngine.mjs';
import {
  upsertSamplingSession,
  finalizeCuration,
  attachCheckoutDetails,
  getPriorPaidFragranceSlugsByEmail,
} from '../server/sampling/repo.mjs';
import { handleStripeWebhook } from '../server/stripe/webhookHandler.mjs';
import {
  confirmSampleKitPayment,
  createSampleKitPaymentIntent,
} from '../server/stripe/sampleKitPayment.mjs';
import {
  handleAdminLeadAddComment,
  handleAdminLeadDetail,
  handleAdminLeadsList,
  handleAdminLogin,
  handleAdminLogout,
  handleAdminOrderDetail,
  handleAdminOrdersList,
  handleAdminSession,
  handleAdminStats,
} from '../server/admin/handlers.mjs';

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

          if (step === 'contact' || step === 'save_exit') {
            const email = String(lead.email ?? '').trim();
            const phone = String(lead.phone ?? '').trim();
            if (!email || !phone) {
              sendJson(res, 400, {
                error:
                  step === 'save_exit'
                    ? 'Save requires contact details. Exit without saving until the contact step is completed.'
                    : 'Contact step requires email and phone',
              });
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

          const excludeSlugs = await getPriorPaidFragranceSlugsByEmail(lead.email, {
            excludeSessionId: sessionId,
          });
          const result = await recommendFive(answers, { excludeSlugs });
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
          if (!process.env.STRIPE_SECRET_KEY) {
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
          const result = await createSampleKitPaymentIntent(sessionId, {
            reusePaymentIntentId: payload?.reusePaymentIntentId
              ? String(payload.reusePaymentIntentId)
              : undefined,
          });
          sendJson(res, 200, result);
          return;
        }

        if (pathname === '/api/checkout/confirm-payment' && req.method === 'POST') {
          if (!process.env.STRIPE_SECRET_KEY) {
            sendJson(res, 501, { error: 'Stripe is not configured' });
            return;
          }

          const payload = await readJsonBody(req);
          const sessionId = String(payload?.sessionId ?? '');
          const paymentIntentId = String(payload?.paymentIntentId ?? '');
          const result = await confirmSampleKitPayment({
            sessionId,
            paymentIntentId,
            checkout: payload?.checkout ?? null,
          });

          if (!result.ok) {
            sendJson(res, 409, { error: result.error, status: result.status });
            return;
          }

          sendJson(res, 200, result);
          return;
        }

        if (pathname === '/api/admin/login' && req.method === 'POST') {
          await handleAdminLogin(req, res);
          return;
        }

        if (pathname === '/api/admin/logout' && req.method === 'POST') {
          await handleAdminLogout(req, res);
          return;
        }

        if (pathname === '/api/admin/session' && req.method === 'GET') {
          await handleAdminSession(req, res);
          return;
        }

        if (pathname === '/api/admin/stats' && req.method === 'GET') {
          await handleAdminStats(req, res);
          return;
        }

        if (pathname === '/api/admin/leads' && req.method === 'GET') {
          await handleAdminLeadsList(req, res);
          return;
        }

        if (pathname.startsWith('/api/admin/leads/') && pathname.endsWith('/comments') && req.method === 'POST') {
          const sessionId = decodeURIComponent(
            pathname.replace(/^\/api\/admin\/leads\//, '').replace(/\/comments$/, ''),
          );
          await handleAdminLeadAddComment(req, res, sessionId);
          return;
        }

        if (pathname.startsWith('/api/admin/leads/') && req.method === 'GET') {
          const sessionId = decodeURIComponent(pathname.replace('/api/admin/leads/', ''));
          await handleAdminLeadDetail(req, res, sessionId);
          return;
        }

        if (pathname === '/api/admin/orders' && req.method === 'GET') {
          await handleAdminOrdersList(req, res);
          return;
        }

        if (pathname.startsWith('/api/admin/orders/') && req.method === 'GET') {
          const sampleOrderNumber = decodeURIComponent(
            pathname.replace('/api/admin/orders/', ''),
          );
          await handleAdminOrderDetail(req, res, sampleOrderNumber);
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
