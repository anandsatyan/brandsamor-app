import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildStructuredDataForPath } from '../src/seo/buildPageStructuredData';
import { writeCrawlFiles } from '../src/seo/generateCrawlFiles';
import {
  NOT_FOUND_METADATA,
  PAGE_METADATA,
  PUBLIC_ROUTES,
} from '../src/seo/pageMetadata';
import { renderStaticCrawlerContent } from '../src/seo/renderStaticCrawlerContent';
import { renderHeadTags } from '../src/seo/renderHeadTags';
import { FAQ_BY_ROUTE } from '../src/seo/routeFaq';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

const SEO_START = '<!-- brandsamor-seo:start -->';
const SEO_END = '<!-- brandsamor-seo:end -->';

const replaceSeoBlock = (html: string, seoBlock: string) => {
  const pattern = new RegExp(`${SEO_START}[\\s\\S]*?${SEO_END}`, 'm');
  if (!pattern.test(html)) {
    throw new Error('Missing brandsamor SEO markers in index.html');
  }
  return html.replace(pattern, `${SEO_START}\n    ${seoBlock}\n    ${SEO_END}`);
};

const STATIC_START = '<!-- brandsamor-static:start -->';
const STATIC_END = '<!-- brandsamor-static:end -->';

const injectStaticContent = (html: string, staticHtml: string) => {
  const pattern = new RegExp(`${STATIC_START}[\\s\\S]*?${STATIC_END}`, 'm');
  if (!pattern.test(html)) {
    throw new Error('Missing brandsamor static content markers in index.html');
  }
  return html.replace(
    pattern,
    `${STATIC_START}\n    ${staticHtml}\n    ${STATIC_END}`,
  );
};

const injectRootHtml = (html: string, appHtml: string) => {
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Missing <div id="root"></div> in HTML template');
  }
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
};

const writeRouteHtml = (routePath: string, html: string) => {
  if (routePath === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  const routeDir = path.join(distDir, routePath.slice(1));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
};

const buildServeConfig = () => ({
  rewrites: PUBLIC_ROUTES.filter((route) => route !== '/').map((route) => ({
    source: route,
    destination: `${route}/index.html`,
  })),
});

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  throw new Error('dist/index.html not found. Run vite build first.');
}

const template = fs.readFileSync(templatePath, 'utf8');
const { renderRoute } = await import(path.join(rootDir, 'dist-ssr/entry-server.js'));

for (const routePath of PUBLIC_ROUTES) {
  const meta = PAGE_METADATA[routePath];
  const faqItems = FAQ_BY_ROUTE[routePath];
  const structuredData = JSON.stringify(
    buildStructuredDataForPath(meta, faqItems),
  ).replace(/</g, '\\u003c');
  const seoBlock = renderHeadTags(meta, structuredData);
  const appHtml = renderRoute(routePath);
  const staticHtml = renderStaticCrawlerContent(routePath, meta);
  const html = injectRootHtml(
    injectStaticContent(replaceSeoBlock(template, seoBlock), staticHtml),
    appHtml,
  );
  writeRouteHtml(routePath, html);
}

const notFoundStructuredData = JSON.stringify(
  buildStructuredDataForPath(NOT_FOUND_METADATA),
).replace(/</g, '\\u003c');
const notFoundHtml = injectRootHtml(
  injectStaticContent(
    replaceSeoBlock(template, renderHeadTags(NOT_FOUND_METADATA, notFoundStructuredData)),
    renderStaticCrawlerContent('/404', NOT_FOUND_METADATA),
  ),
  renderRoute('/this-page-does-not-exist'),
);
fs.mkdirSync(path.join(distDir, '404'), { recursive: true });
fs.writeFileSync(path.join(distDir, '404', 'index.html'), notFoundHtml, 'utf8');

writeCrawlFiles(distDir);
fs.writeFileSync(
  path.join(distDir, 'serve.json'),
  `${JSON.stringify(buildServeConfig(), null, 2)}\n`,
  'utf8',
);

console.log(`Prerendered ${PUBLIC_ROUTES.length} routes with full HTML content.`);
