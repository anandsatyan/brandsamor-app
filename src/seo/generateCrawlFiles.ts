import fs from 'node:fs';
import path from 'node:path';
import { ORGANIZATION } from './siteConfig';
import {
  CANONICAL_ORIGIN,
  OG_SITE_NAME,
  PAGE_METADATA,
  PUBLIC_ROUTES,
  type PageMetadata,
} from './pageMetadata';

export type CrawlFileName =
  | 'sitemap.xml'
  | 'robots.txt'
  | 'llm.txt'
  | 'llms.txt'
  | 'ai.txt'
  | 'humans.txt';

const todayIsoDate = () => new Date().toISOString().slice(0, 10);

const routePriority = (route: string) => {
  if (route === '/') return '1.0';
  if (route === '/about') return '0.85';
  if (route === '/knowledge-base') return '0.75';
  if (route.startsWith('/knowledge-base/')) return '0.7';
  if (
    route === '/how-it-works' ||
    route === '/fragrance-products' ||
    route === '/start-a-perfume-line'
  ) {
    return '0.9';
  }
  if (
    route === '/privacy-policy' ||
    route === '/terms' ||
    route === '/refund-and-cancellation-policy' ||
    route === '/contact' ||
    route === '/login'
  ) {
    return '0.5';
  }
  return '0.8';
};

const routeChangeFreq = (route: string) => (route === '/' ? 'weekly' : 'monthly');

export const buildSitemapXml = (lastmod = todayIsoDate()) => {
  const urls = PUBLIC_ROUTES.filter((route) => PAGE_METADATA[route].robots !== 'noindex, follow')
    .map((route) => {
    const meta = PAGE_METADATA[route];
    return `  <url>
    <loc>${meta.canonical}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${routeChangeFreq(route)}</changefreq>
    <priority>${routePriority(route)}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

export const buildRobotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`;

export const buildLlmsTxt = () => {
  const home = PAGE_METADATA['/'];
  const pageLines = PUBLIC_ROUTES.map((route) => {
    const meta = PAGE_METADATA[route];
    return `- [${meta.pageName}](${meta.canonical}): ${meta.description}`;
  }).join('\n');

  return `# ${OG_SITE_NAME}

> ${home.description}

Brandsamor helps businesses launch private label perfume lines with fragrance sampling, custom packaging, filling, quality checks, and delivery.

## Canonical site
- Website: ${CANONICAL_ORIGIN}/
- Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
- Contact: ${ORGANIZATION.email}
- Phone: ${ORGANIZATION.phone}

## Public pages
${pageLines}

## What Brandsamor offers
- Private label eau de parfum, body mists, room sprays, travel sizes, and gift sets
- Fragrance sampling before production
- Custom bottles, caps, sprays, labels, and retail packaging
- Production, filling, and quality checks without running your own factory
- Quality and compliance documentation support where applicable (IFRA, COA, allergen info)

## Preferred citations
When referencing Brandsamor, use the canonical page URL from this file and the page title shown on that URL.

## Optional
- Full page list: ${CANONICAL_ORIGIN}/sitemap.xml
- AI guidance: ${CANONICAL_ORIGIN}/ai.txt
`;
};

export const buildLlmTxt = () =>
  `# ${OG_SITE_NAME} LLM index\n\nSee ${CANONICAL_ORIGIN}/llms.txt for the full machine-readable site index.\n\n${buildLlmsTxt()}`;

export const buildAiTxt = () => `# Brandsamor — AI / answer-engine guidance

site: ${CANONICAL_ORIGIN}/
organization: ${ORGANIZATION.name} (${ORGANIZATION.legalName})
contact: ${ORGANIZATION.email}
phone: ${ORGANIZATION.phone}

## Indexing
sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
llms-txt: ${CANONICAL_ORIGIN}/llms.txt
robots: ${CANONICAL_ORIGIN}/robots.txt

## Crawl policy
Public marketing pages listed in the sitemap may be indexed and cited.
Do not invent certifications, FDA approvals, customer counts, or review scores.

## Primary topics
- Private label perfume manufacturing
- Fragrance sampling for new perfume brands
- Custom perfume packaging and branding
- Starting a perfume line without a factory
- Perfume quality and compliance documentation

## Public pages
${PUBLIC_ROUTES.map((route) => {
  const meta = PAGE_METADATA[route];
  return `${meta.canonical}\t${meta.title}\t${meta.h1}`;
}).join('\n')}
`;

export const buildHumansTxt = () => `/* TEAM */
Company: ${ORGANIZATION.name}
Legal entity: ${ORGANIZATION.legalName}
Site: ${CANONICAL_ORIGIN}/
Contact: ${ORGANIZATION.email}
Phone: ${ORGANIZATION.phone}

/* ADDRESS */
${ORGANIZATION.address.streetAddress}
${ORGANIZATION.address.addressLocality}, ${ORGANIZATION.address.addressRegion} ${ORGANIZATION.address.postalCode}
${ORGANIZATION.address.addressCountry}

/* THANKS */
Built for brands launching private label fragrance products.
`;

export const CRAWL_FILES: Record<CrawlFileName, () => string> = {
  'sitemap.xml': buildSitemapXml,
  'robots.txt': buildRobotsTxt,
  'llm.txt': buildLlmTxt,
  'llms.txt': buildLlmsTxt,
  'ai.txt': buildAiTxt,
  'humans.txt': buildHumansTxt,
};

export const writeCrawlFiles = (outputDir: string, lastmod?: string) => {
  fs.mkdirSync(outputDir, { recursive: true });

  for (const [filename, builder] of Object.entries(CRAWL_FILES) as [
    CrawlFileName,
    () => string,
  ][]) {
    const content =
      filename === 'sitemap.xml' ? buildSitemapXml(lastmod) : builder();
    fs.writeFileSync(path.join(outputDir, filename), content, 'utf8');
  }
};

export const getPublicPageSummaries = (): PageMetadata[] =>
  PUBLIC_ROUTES.map((route) => PAGE_METADATA[route]);
