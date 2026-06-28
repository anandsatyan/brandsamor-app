import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { buildStructuredDataForPath } from '../src/seo/buildPageStructuredData';
import {
  CANONICAL_ORIGIN,
  NOT_FOUND_METADATA,
  PAGE_METADATA,
  PUBLIC_ROUTES,
} from '../src/seo/pageMetadata';
import { renderHeadTags } from '../src/seo/renderHeadTags';
import { FAQ_BY_ROUTE } from '../src/seo/routeFaq';

const SEO_START = '<!-- brandsamor-seo:start -->';
const SEO_END = '<!-- brandsamor-seo:end -->';

const replaceSeoBlock = (html: string, seoBlock: string) => {
  const pattern = new RegExp(
    `${SEO_START}[\\s\\S]*?${SEO_END}`,
    'm',
  );

  if (!pattern.test(html)) {
    throw new Error('Missing brandsamor SEO markers in index.html');
  }

  return html.replace(pattern, `${SEO_START}\n    ${seoBlock}\n    ${SEO_END}`);
};

const writeRouteHtml = (distDir: string, routePath: string, html: string) => {
  if (routePath === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  const routeDir = path.join(distDir, routePath.slice(1));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
};

const buildSitemap = () => {
  const urls = PUBLIC_ROUTES.map(
    (route) => `  <url>\n    <loc>${PAGE_METADATA[route].canonical}</loc>\n  </url>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const buildServeConfig = () => ({
  rewrites: PUBLIC_ROUTES.filter((route) => route !== '/').map((route) => ({
    source: route,
    destination: `${route}/index.html`,
  })),
});

export const prerenderMetaPlugin = (): Plugin => ({
  name: 'brandsamor-prerender-meta',
  apply: 'build',
  closeBundle() {
    const distDir = path.resolve('dist');
    const templatePath = path.join(distDir, 'index.html');

    if (!fs.existsSync(templatePath)) {
      return;
    }

    const template = fs.readFileSync(templatePath, 'utf8');

    for (const routePath of PUBLIC_ROUTES) {
      const meta = PAGE_METADATA[routePath];
      const faqItems = FAQ_BY_ROUTE[routePath];
      const structuredData = JSON.stringify(
        buildStructuredDataForPath(meta, faqItems),
      ).replace(/</g, '\\u003c');
      const seoBlock = renderHeadTags(meta, structuredData);
      const html = replaceSeoBlock(template, seoBlock);
      writeRouteHtml(distDir, routePath, html);
    }

    const notFoundStructuredData = JSON.stringify(
      buildStructuredDataForPath(NOT_FOUND_METADATA),
    ).replace(/</g, '\\u003c');
    const notFoundHtml = replaceSeoBlock(
      template,
      renderHeadTags(NOT_FOUND_METADATA, notFoundStructuredData),
    );
    fs.mkdirSync(path.join(distDir, '404'), { recursive: true });
    fs.writeFileSync(path.join(distDir, '404', 'index.html'), notFoundHtml, 'utf8');

    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8');
    fs.writeFileSync(
      path.join(distDir, 'serve.json'),
      `${JSON.stringify(buildServeConfig(), null, 2)}\n`,
      'utf8',
    );

    fs.writeFileSync(
      path.join(distDir, 'robots.txt'),
      `User-agent: *\nAllow: /\n\nSitemap: ${CANONICAL_ORIGIN}/sitemap.xml\n`,
      'utf8',
    );
  },
});
