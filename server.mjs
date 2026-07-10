import 'dotenv/config';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleLeadRequest, readJsonBody, sendJson } from './server/leadHandler.mjs';
import { listPublicFragrances, getPublicFragranceBySlug } from './server/fragrance/repo.mjs';
import { toPublicFragrance } from './server/fragrance/publicSerializer.mjs';
import { recommendFive } from './server/sampling/recommendationEngine.mjs';
import { upsertSamplingSession, finalizeCuration, attachCheckoutDetails, recordPaymentIntent } from './server/sampling/repo.mjs';
import { handleStripeWebhook } from './server/stripe/webhookHandler.mjs';
import Stripe from 'stripe';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');
const port = Number(process.env.PORT || 8080);

const PUBLIC_ROUTES = new Set([
  '/',
  '/how-it-works',
  '/fragrance-products',
  '/fragrance-sampling',
  '/packaging-branding',
  '/start-a-perfume-line',
  '/who-we-work-with',
  '/why-brandsamor',
  '/quality-compliance',
  '/how-your-batch-is-made',
  '/private-label-perfume-manufacturer-usa',
  '/custom-perfume-manufacturer',
  '/about',
  '/contact',
  '/get-started',
  '/curated-sampling',
  '/login',
  '/privacy-policy',
  '/terms',
  '/refund-and-cancellation-policy',
  '/knowledge-base',
  '/knowledge-base/how-to-start-a-perfume-line',
  '/knowledge-base/private-label-vs-white-label-vs-custom-perfume',
  '/knowledge-base/perfume-brand-startup-cost',
  '/knowledge-base/private-label-perfume-moq',
  '/knowledge-base/private-label-perfume-manufacturing-timeline',
  '/knowledge-base/choose-fragrances-for-target-customer',
  '/knowledge-base/choose-perfume-bottle-and-packaging',
  '/knowledge-base/edp-vs-edt-vs-perfume-oil',
  '/knowledge-base/perfume-manufacturer-documents',
  '/knowledge-base/import-private-label-perfume-usa',
  '/knowledge-base/how-ifra-certificates-work',
  '/knowledge-base/perfume-certificate-of-analysis',
  '/knowledge-base/choose-private-label-perfume-manufacturer',
  '/knowledge-base/is-private-label-perfume-profitable',
  '/knowledge-base/how-to-price-private-label-perfume',
  '/knowledge-base/launch-one-scent-or-several',
  '/knowledge-base/how-to-evaluate-perfume-samples',
  '/knowledge-base/boutique-perfume-line-launch',
  '/knowledge-base/private-label-perfume-fashion-brands',
  '/knowledge-base/questions-perfume-manufacturer-before-ordering',
  '/knowledge-base/how-many-fragrance-samples-to-test',
  '/knowledge-base/test-demand-before-perfume-inventory',
  '/knowledge-base/calculate-retail-price-perfume',
  '/knowledge-base/fda-mocra-requirements-perfume-brands',
  '/knowledge-base/beauty-brand-add-fragrance-category',
  '/knowledge-base/launch-perfume-discovery-set',
  '/knowledge-base/custom-fragrance-development',
  '/knowledge-base/how-to-write-fragrance-brief',
  '/knowledge-base/perfume-stability-testing',
  '/knowledge-base/balanced-first-fragrance-collection',
  '/knowledge-base/perfume-manufacturing-india-usa-europe',
  '/knowledge-base/sell-private-label-perfume-boutique',
]);

/** Client-rendered routes without prerendered HTML — serve root SPA shell. */
const SPA_ONLY_ROUTES = new Set(['/curated-sampling']);

const STATIC_FILES = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/llm.txt',
  '/ai.txt',
  '/humans.txt',
  '/og-image.jpg',
  '/og-image.png',
  '/perfume-bottle-silhouette-bg-3.png',
  '/brandsamor-favicon-dark.png',
  '/brandsamor-logo.png',
  '/brandsamor-neue-logo.png',
  '/favicon.svg',
  '/vite.svg',
]);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
};

const normalizePath = (urlPath) => {
  if (urlPath.length > 1 && urlPath.endsWith('/')) {
    return urlPath.slice(0, -1);
  }
  return urlPath;
};

const decodePath = (urlPath) => {
  try {
    return decodeURIComponent(urlPath);
  } catch {
    return urlPath;
  }
};

const LEGACY_ROUTE_PREFIXES = [
  '/products/',
  '/collections/',
  '/account/',
  '/cart',
  '/checkout',
  '/blogs/news',
];

const isLegacyRoute = (routePath) =>
  LEGACY_ROUTE_PREFIXES.some((prefix) =>
    prefix.endsWith('/') ? routePath.startsWith(prefix) : routePath === prefix || routePath.startsWith(`${prefix}/`),
  );

const resolveFile = (urlPath) => {
  const normalized = normalizePath(decodePath(urlPath));

  if (isLegacyRoute(normalized)) {
    const notFoundPath = path.join(distDir, '404', 'index.html');
    if (fs.existsSync(notFoundPath)) {
      return { filePath: notFoundPath, status: 404 };
    }
    return null;
  }

  if (STATIC_FILES.has(normalized)) {
    const staticPath = path.join(distDir, normalized.slice(1));
    if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
      return { filePath: staticPath, status: 200 };
    }
  }

  if (normalized.startsWith('/assets/')) {
    const assetPath = path.join(distDir, normalized.slice(1));
    if (fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
      return { filePath: assetPath, status: 200 };
    }
    return null;
  }

  if (!normalized.includes('..')) {
    const rootAssetPath = path.join(distDir, normalized.slice(1));
    if (normalized !== '/' && fs.existsSync(rootAssetPath) && fs.statSync(rootAssetPath).isFile()) {
      return { filePath: rootAssetPath, status: 200 };
    }
  }

  if (PUBLIC_ROUTES.has(normalized)) {
    const htmlPath =
      normalized === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, normalized.slice(1), 'index.html');
    if (fs.existsSync(htmlPath)) {
      return { filePath: htmlPath, status: 200 };
    }
    if (SPA_ONLY_ROUTES.has(normalized)) {
      const spaIndex = path.join(distDir, 'index.html');
      if (fs.existsSync(spaIndex)) {
        return { filePath: spaIndex, status: 200 };
      }
    }
  }

  const notFoundPath = path.join(distDir, '404', 'index.html');
  if (fs.existsSync(notFoundPath)) {
    return { filePath: notFoundPath, status: 404 };
  }

  return null;
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/lead') {
    await handleLeadRequest(req, res);
    return;
  }

  if (url.pathname === '/api/sampling/session' && req.method === 'POST') {
    try {
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Server error';
      sendJson(res, 500, { error: message });
      return;
    }
  }

  if (url.pathname === '/api/sampling/curate' && req.method === 'POST') {
    try {
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Server error';
      sendJson(res, 500, { error: message });
      return;
    }
  }

  if (url.pathname === '/api/stripe/webhook' && req.method === 'POST') {
    await handleStripeWebhook(req, res);
    return;
  }

  if (url.pathname === '/api/stripe/config' && req.method === 'GET') {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!publishableKey || !secret) {
      sendJson(res, 501, { error: 'Stripe is not configured' });
      return;
    }
    sendJson(res, 200, {
      publishableKey,
      amount: Number(process.env.STRIPE_SAMPLE_KIT_AMOUNT_CENTS || 10000),
      currency: process.env.STRIPE_CURRENCY || 'usd',
    });
    return;
  }

  if (url.pathname === '/api/checkout/create-payment-intent' && req.method === 'POST') {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      sendJson(res, 501, { error: 'Stripe is not configured' });
      return;
    }

    try {
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Server error';
      sendJson(res, 500, { error: message });
      return;
    }
  }

  if (url.pathname === '/api/fragrances/public' && req.method === 'GET') {
    const rows = await listPublicFragrances();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ fragrances: rows.map(toPublicFragrance) }));
    return;
  }

  if (url.pathname.startsWith('/api/fragrances/public/') && req.method === 'GET') {
    const slug = decodeURIComponent(url.pathname.replace('/api/fragrances/public/', ''));
    const row = await getPublicFragranceBySlug(slug);
    if (!row) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ fragrance: toPublicFragrance(row) }));
    return;
  }

  const resolved = resolveFile(url.pathname);

  if (!resolved) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(resolved.filePath).toLowerCase();
  const type = contentTypes[ext] || 'application/octet-stream';
  const body = fs.readFileSync(resolved.filePath);

  res.writeHead(resolved.status, { 'Content-Type': type });
  res.end(body);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Brandsamor server listening on http://0.0.0.0:${port}`);
});
