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
    route === '/how-your-batch-is-made' ||
    route === '/private-label-perfume-manufacturer-usa' ||
    route === '/custom-perfume-manufacturer' ||
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

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

Disallow: /cart
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /api/
Disallow: /thank-you
Disallow: /curated-sampling/thank-you-preview
Disallow: /admin/
Disallow: /login

Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`;

export const buildLlmsTxt = () => {
  const byPrefix = (test: (route: string) => boolean) =>
    PUBLIC_ROUTES.filter(test)
      .map((route) => {
        const meta = PAGE_METADATA[route];
        return `- [${meta.pageName}](${meta.canonical}): ${meta.description}`;
      })
      .join('\n');

  const coreServices = byPrefix(
    (route) =>
      route === '/' ||
      [
        '/custom-perfume-manufacturer',
        '/white-label-perfume-supplier',
        '/low-moq-perfume-manufacturer',
        '/contract-perfume-manufacturing',
        '/how-it-works',
        '/fragrance-sampling',
        '/create-a-scent',
        '/packaging-branding',
        '/quality-compliance',
        '/perfume-filling-services',
        '/private-label-perfume-oil-manufacturer',
        '/private-label-perfume-pricing',
        '/perfume-moq-guide',
      ].includes(route),
  );

  const markets = byPrefix((route) => route.includes('private-label-perfume-manufacturer-'));
  const guides = byPrefix(
    (route) =>
      route === '/start-a-perfume-line' ||
      route === '/knowledge-base' ||
      route === '/best-private-label-perfume-manufacturers' ||
      route.startsWith('/private-label-vs-') ||
      route.startsWith('/us-vs-') ||
      route.startsWith('/brandsamor-vs-'),
  );
  const products = byPrefix(
    (route) =>
      route === '/fragrance-products' ||
      route.includes('attar') ||
      route.includes('oud') ||
      route.includes('body-mist') ||
      route.includes('room-spray') ||
      route.includes('car-freshener') ||
      route.includes('eau-de-parfum') ||
      route.includes('cologne') ||
      route.includes('niche-perfume') ||
      route.includes('halal-perfume') ||
      route.includes('vegan-clean') ||
      route.includes('arabic-perfume'),
  );

  return `# ${OG_SITE_NAME}

> Brandsamor is a private label and white label perfume manufacturer for your brand. We handle fragrance development, sampling, filling, packaging and compliance for founders launching or scaling a fragrance line. Packamor LLC is the parent entity of Brandsamor, with teams in the United States, United Arab Emirates and India.

Key facts:
- Parent entity: Packamor LLC (Delaware, USA) — legal contracting party for Brandsamor
- Service: private label, white label, custom (OEM/ODM) fragrance manufacturing
- Formats: eau de parfum, perfume oil/attar, body mist, room spray, car freshener
- Sampling: samples dispatched in 2–3 business days
- Production lead time: approximately 3–6 weeks
- Production MOQ: from 100 units
- Indicative pricing: from $10 per unit
- Markets served: 25+ countries, with dedicated support for the USA, UAE, Saudi Arabia, UK and Germany
- Compliance support: IFRA, COA, GMP, ISO 22716, MoCRA (US), halal certification support

## Core services
${coreServices}

## Markets
${markets}

## Product formats
${products}

## Guides
${guides}

## Contact
- [Contact Brandsamor](${CANONICAL_ORIGIN}/contact)
- Email: ${ORGANIZATION.email}
- Phone: ${ORGANIZATION.phone}
- Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`;
};

export const buildLlmTxt = () =>
  `# ${OG_SITE_NAME} LLM index\n\nSee ${CANONICAL_ORIGIN}/llms.txt for the full machine-readable site index.\n\n${buildLlmsTxt()}`;

export const buildAiTxt = () => `# Brandsamor — AI / answer-engine guidance

site: ${CANONICAL_ORIGIN}/
organization: ${ORGANIZATION.name}
parent_entity: ${ORGANIZATION.legalName}
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
Parent entity: ${ORGANIZATION.legalName}
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
