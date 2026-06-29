import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
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
]);

const STATIC_FILES = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/llm.txt',
  '/ai.txt',
  '/humans.txt',
  '/og-image.jpg',
  '/og-image.png',
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

const resolveFile = (urlPath) => {
  const normalized = normalizePath(urlPath);

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

  if (PUBLIC_ROUTES.has(normalized)) {
    const htmlPath =
      normalized === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, normalized.slice(1), 'index.html');
    if (fs.existsSync(htmlPath)) {
      return { filePath: htmlPath, status: 200 };
    }
  }

  const notFoundPath = path.join(distDir, '404', 'index.html');
  if (fs.existsSync(notFoundPath)) {
    return { filePath: notFoundPath, status: 404 };
  }

  return null;
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
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
