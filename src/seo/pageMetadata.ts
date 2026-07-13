import { KNOWLEDGE_BASE_ARTICLES } from '../content/knowledgeBase/articles';
import { kbArticlePath } from '../content/knowledgeBase/types';
import { NEW_PAGE_METADATA } from '../content/newPages/metadata';

export const CANONICAL_ORIGIN = 'https://www.brandsamor.com';

export const OG_IMAGE = `${CANONICAL_ORIGIN}/perfume-bottle-silhouette-bg-3.png`;

export const OG_SITE_NAME = 'Brandsamor';

export const DEFAULT_ROBOTS = 'index, follow';

export type PageMetadata = {
  path: string;
  pageName: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  robots: string;
  includeServiceSchema: boolean;
  includeHomeGraph: boolean;
  includeOrganizationGraph?: boolean;
};

const canonical = (path: string) =>
  path === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;

/**
 * Primary keyword map (one distinct target per landing page):
 * / → private label perfume manufacturer
 * /start-a-perfume-line → how to start a perfume line
 * /get-started → start a perfume business
 * /how-it-works → private label perfume
 * /how-your-batch-is-made → how perfume is made
 * /packaging-branding → perfume packaging
 * /why-brandsamor → perfume manufacturer
 * /fragrance-products → private label fragrance
 * /fragrance-sampling → private label perfume samples
 * /custom-perfume-manufacturer → custom perfume manufacturer
 * /private-label-perfume-manufacturer-usa → perfume manufacturer usa
 * /who-we-work-with → create your own perfume brand
 * /quality-compliance → IFRA certificate
 * /about → private label fragrance company
 * /contact → fragrance manufacturer
 * (see src/content/newPages/metadata.ts for Phase 4 keyword targets)
 */
const BASE_PAGE_METADATA: Record<string, PageMetadata> = {
  '/': {
    path: '/',
    pageName: 'Home',
    title: 'Private Label Perfume Manufacturer | Brandsamor',
    description:
      'Brandsamor is a private label perfume manufacturer that handles fragrance sampling, bottles, packaging, filling, finishing and quality checks for your brand.',
    canonical: canonical('/'),
    h1: 'Private Label Perfume Manufacturer for Your Brand',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: true,
  },
  '/how-it-works': {
    path: '/how-it-works',
    pageName: 'How It Works',
    title: 'Private Label Perfume: How It Works | Brandsamor',
    description:
      'See how private label perfume moves from a brand brief and fragrance samples to packaging approval, filling, quality checks and ready-to-sell delivery.',
    canonical: canonical('/how-it-works'),
    h1: 'How Private Label Perfume Comes Together',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/fragrance-products': {
    path: '/fragrance-products',
    pageName: 'Fragrance Products',
    title: 'Private Label Fragrance Products | Brandsamor',
    description:
      'Browse private label fragrance formats — eau de parfum, perfume oils, body mists, room sprays, travel sizes and gift sets — matched to your audience and channel.',
    canonical: canonical('/fragrance-products'),
    h1: 'Private Label Fragrance Formats You Can Sell',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/fragrance-sampling': {
    path: '/fragrance-sampling',
    pageName: 'Fragrance Sampling',
    title: 'Private Label Perfume Samples | Brandsamor',
    description:
      'Request private label perfume samples matched to your brand. Answer a short brief, receive five curated fragrances, and evaluate them before production.',
    canonical: canonical('/fragrance-sampling'),
    h1: 'Private Label Perfume Samples, Curated for Your Brand',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/packaging-branding': {
    path: '/packaging-branding',
    pageName: 'Packaging & Branding',
    title: 'Perfume Packaging and Branding | Brandsamor',
    description:
      'Design perfume packaging that feels like your brand — bottles, caps, sprays, labels, printing and boxes for a finished private label product.',
    canonical: canonical('/packaging-branding'),
    h1: 'Perfume Packaging That Feels Like Your Brand',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/start-a-perfume-line': {
    path: '/start-a-perfume-line',
    pageName: 'Start a Perfume Line',
    title: 'How to Start a Perfume Line | Brandsamor',
    description:
      'Learn how to start a perfume line step by step: define your customer, choose a format, sample fragrances, select packaging and plan your first launch.',
    canonical: canonical('/start-a-perfume-line'),
    h1: 'How to Start a Perfume Line Without a Factory',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/who-we-work-with': {
    path: '/who-we-work-with',
    pageName: 'Who We Work With',
    title: 'Create Your Own Perfume Brand | Brandsamor',
    description:
      'Create your own perfume brand for a boutique, salon, beauty line, hotel, creator audience or gifting business — without building a factory.',
    canonical: canonical('/who-we-work-with'),
    h1: 'Create Your Own Perfume Brand With Private Label',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/why-brandsamor': {
    path: '/why-brandsamor',
    pageName: 'Why Brandsamor',
    title: 'Perfume Manufacturer for Private Label Brands | Brandsamor',
    description:
      'Choose a perfume manufacturer that starts with curated samples, then coordinates packaging, filling and quality checks for your private label launch.',
    canonical: canonical('/why-brandsamor'),
    h1: 'Why Brands Choose Brandsamor as Their Perfume Manufacturer',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/quality-compliance': {
    path: '/quality-compliance',
    pageName: 'Quality & Compliance',
    title: 'IFRA Certificate and Perfume Compliance | Brandsamor',
    description:
      'Get IFRA certificate support, Certificates of Analysis, allergen information, batch records and quality checks for your private label perfume line.',
    canonical: canonical('/quality-compliance'),
    h1: 'IFRA Certificate and Compliance Support for Perfume',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/how-your-batch-is-made': {
    path: '/how-your-batch-is-made',
    pageName: 'How Your Batch Is Made',
    title: 'How Perfume Is Made | Brandsamor',
    description:
      'See how perfume is made after approval — fragrance prep, filling, crimping, labelling, inspection and packing for a repeatable private label batch.',
    canonical: canonical('/how-your-batch-is-made'),
    h1: 'How Perfume Is Made, From Spec to Finished Batch',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/private-label-perfume-manufacturer-usa': {
    path: '/private-label-perfume-manufacturer-usa',
    pageName: 'Private Label Perfume Manufacturer USA',
    title: 'Perfume Manufacturer USA | Brandsamor',
    description:
      'Work with a perfume manufacturer USA brands trust for sampling, packaging, production coordination and MoCRA-aware documentation support.',
    canonical: canonical('/private-label-perfume-manufacturer-usa'),
    h1: 'Perfume Manufacturer USA for Private Label Brands',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/custom-perfume-manufacturer': {
    path: '/custom-perfume-manufacturer',
    pageName: 'Custom Perfume Manufacturer',
    title: 'Custom Perfume Manufacturer | Brandsamor',
    description:
      'Partner with a custom perfume manufacturer for fragrance direction, packaging, production coordination, filling and quality checks under your brand.',
    canonical: canonical('/custom-perfume-manufacturer'),
    h1: 'Custom Perfume Manufacturer for Brand Launches',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/about': {
    path: '/about',
    pageName: 'About',
    title: 'About Brandsamor | Private Label Fragrance Company',
    description:
      'Brandsamor is a private label fragrance company of Packamor LLC — the parent entity of Brandsamor — helping brands launch ready-to-sell perfume with packaging and production support.',
    canonical: canonical('/about'),
    h1: 'About Brandsamor, a Private Label Fragrance Company',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
    includeOrganizationGraph: true,
  },
  '/contact': {
    path: '/contact',
    pageName: 'Contact',
    title: 'Contact a Fragrance Manufacturer | Brandsamor',
    description:
      'Contact Brandsamor, a fragrance manufacturer partner for sampling, packaging, production coordination and private label perfume projects.',
    canonical: canonical('/contact'),
    h1: 'Contact a Fragrance Manufacturer',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/get-started': {
    path: '/get-started',
    pageName: 'Get Started',
    title: 'Start a Perfume Business | Brandsamor',
    description:
      'Start a perfume business with a clear first step: tell us about your brand, customers and launch goals so we can guide sampling and your first batch.',
    canonical: canonical('/get-started'),
    h1: 'Start a Perfume Business With a Clear First Step',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/login': {
    path: '/login',
    pageName: 'Login',
    title: 'Login | Brandsamor',
    description:
      'Sign in to your Brandsamor account to manage private label fragrance projects, samples, and production updates.',
    canonical: canonical('/login'),
    h1: 'Sign in to Brandsamor',
    robots: 'noindex, follow',
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    pageName: 'Privacy Policy',
    title: 'Privacy Policy | Brandsamor',
    description:
      'How Brandsamor and Packamor LLC collect, use, and protect personal information for the website, customer accounts, and private-label fragrance services.',
    canonical: canonical('/privacy-policy'),
    h1: 'Privacy Policy',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/terms': {
    path: '/terms',
    pageName: 'Terms of Service',
    title: 'Terms of Service | Brandsamor',
    description:
      'Terms governing use of brandsamor.com and private-label fragrance services from Packamor LLC, including custom production and approvals.',
    canonical: canonical('/terms'),
    h1: 'Terms of Service',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/refund-and-cancellation-policy': {
    path: '/refund-and-cancellation-policy',
    pageName: 'Refund & Cancellation Policy',
    title: 'Refund and Cancellation Policy | Brandsamor',
    description:
      'How Brandsamor handles sampling fees, production deposits, cancellations after approval, damaged goods, and custom fragrance orders.',
    canonical: canonical('/refund-and-cancellation-policy'),
    h1: 'Refund and Cancellation Policy',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
};

const KNOWLEDGE_BASE_HUB: PageMetadata = {
  path: '/knowledge-base',
  pageName: 'Knowledge Base',
  title: 'Private Label Perfume Knowledge Base | Brandsamor',
  description:
    'Guides on starting a perfume line, choosing a manufacturer, pricing and profitability, fragrance sampling, packaging, discovery sets, custom development, compliance (IFRA, COA, FDA MoCRA), and U.S. imports.',
  canonical: canonical('/knowledge-base'),
  h1: 'Private Label Perfume Knowledge Base',
  robots: DEFAULT_ROBOTS,
  includeServiceSchema: false,
  includeHomeGraph: false,
};

const KNOWLEDGE_BASE_ARTICLE_METADATA: Record<string, PageMetadata> = Object.fromEntries(
  KNOWLEDGE_BASE_ARTICLES.map((article) => {
    const path = kbArticlePath(article.slug);
    const meta: PageMetadata = {
      path,
      pageName: article.pageName,
      title: `${article.title} | Brandsamor`,
      description: article.description,
      canonical: canonical(path),
      h1: article.h1,
      robots: DEFAULT_ROBOTS,
      includeServiceSchema: false,
      includeHomeGraph: false,
    };
    return [path, meta];
  }),
);

export const PAGE_METADATA: Record<string, PageMetadata> = {
  ...BASE_PAGE_METADATA,
  ...NEW_PAGE_METADATA,
  '/knowledge-base': KNOWLEDGE_BASE_HUB,
  ...KNOWLEDGE_BASE_ARTICLE_METADATA,
};

export const buildKbArticleMetadata = (slug: string): PageMetadata | null =>
  PAGE_METADATA[kbArticlePath(slug)] ?? null;

export const NOT_FOUND_METADATA: PageMetadata = {
  path: '/404',
  pageName: 'Not Found',
  title: 'Page Not Found | Brandsamor',
  description: 'The page you requested could not be found on Brandsamor.',
  canonical: `${CANONICAL_ORIGIN}/404`,
  h1: 'Page Not Found',
  robots: 'noindex, follow',
  includeServiceSchema: false,
  includeHomeGraph: false,
};

export const PUBLIC_ROUTES = Object.keys(PAGE_METADATA);

/** Adding a route to PAGE_METADATA auto-regenerates sitemap, robots.txt, llm.txt, and related crawl files at build time. */

export const getPageMetadata = (pathname: string): PageMetadata =>
  PAGE_METADATA[pathname] ?? NOT_FOUND_METADATA;

export const getSeoFromPath = (pathname: string) => {
  const meta = getPageMetadata(pathname);
  return {
    title: meta.title,
    description: meta.description,
    url: meta.canonical,
    h1: meta.h1,
    robots: meta.robots,
  };
};
