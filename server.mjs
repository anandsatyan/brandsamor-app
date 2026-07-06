import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleLeadRequest } from './server/leadHandler.mjs';

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
  '/brandsamor-favicon-dark.png',
  '/brandsamor-logo.png',
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
  const normalized = normalizePath(urlPath);

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
