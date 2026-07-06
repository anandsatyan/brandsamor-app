import { KNOWLEDGE_BASE_ARTICLES } from '../content/knowledgeBase/articles';
import { kbArticlePath } from '../content/knowledgeBase/types';

export const CANONICAL_ORIGIN = 'https://www.brandsamor.com';

export const OG_IMAGE = `${CANONICAL_ORIGIN}/og-image.jpg`;

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

const BASE_PAGE_METADATA: Record<string, PageMetadata> = {
  '/': {
    path: '/',
    pageName: 'Home',
    title: 'Start Your Own Perfume Line | Brandsamor',
    description:
      'Launch ready-to-sell perfumes under your own brand with Brandsamor handling scents, bottles, packaging, filling and quality checks.',
    canonical: canonical('/'),
    h1: 'The Easy Way to Start Your Own Perfume Line',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: true,
  },
  '/how-it-works': {
    path: '/how-it-works',
    pageName: 'How It Works',
    title: 'How Private Label Perfume Manufacturing Works | Brandsamor',
    description:
      'See how Brandsamor takes your perfume line from fragrance sampling and packaging selection to filling, quality checks and delivery.',
    canonical: canonical('/how-it-works'),
    h1: 'How Your Perfume Line Comes Together',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/fragrance-products': {
    path: '/fragrance-products',
    pageName: 'Fragrance Products',
    title: 'Private Label Fragrance Products | Brandsamor',
    description:
      'Explore private label eau de parfum, perfume oils, body mists, room sprays, travel perfumes and gift sets for your brand.',
    canonical: canonical('/fragrance-products'),
    h1: 'Fragrance Products You Can Launch Under Your Brand',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/fragrance-sampling': {
    path: '/fragrance-sampling',
    pageName: 'Fragrance Sampling',
    title: 'Private Label Perfume Sampling | Brandsamor',
    description:
      'Explore fragrance samples, compare scents and choose the right starting fragrances for your private label perfume line.',
    canonical: canonical('/fragrance-sampling'),
    h1: 'Find the Right Scents for Your Perfume Line',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/packaging-branding': {
    path: '/packaging-branding',
    pageName: 'Packaging & Branding',
    title: 'Custom Perfume Packaging and Branding | Brandsamor',
    description:
      'Choose perfume bottles, caps, sprays, labels, printing and boxes that turn your fragrance into a finished branded product.',
    canonical: canonical('/packaging-branding'),
    h1: 'Create Packaging That Feels Like Your Brand',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/start-a-perfume-line': {
    path: '/start-a-perfume-line',
    pageName: 'Start a Perfume Line',
    title: 'How to Start Your Own Perfume Line | Brandsamor',
    description:
      'Learn how to plan, sample, package and launch perfumes under your own brand without setting up or managing your own factory.',
    canonical: canonical('/start-a-perfume-line'),
    h1: 'Start Your Own Perfume Line Without Managing a Factory',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/who-we-work-with': {
    path: '/who-we-work-with',
    pageName: 'Who We Work With',
    title: 'Private Label Perfume for Businesses | Brandsamor',
    description:
      'Explore private label perfume options for creators, boutiques, salons, beauty brands, hotels, gifting companies and fragrance businesses.',
    canonical: canonical('/who-we-work-with'),
    h1: 'Perfume Products for Different Businesses',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/why-brandsamor': {
    path: '/why-brandsamor',
    pageName: 'Why Brandsamor',
    title: 'Why Choose Brandsamor for Private Label Perfume?',
    description:
      'See how Brandsamor simplifies fragrance sampling, packaging, filling and quality control for new and growing perfume brands.',
    canonical: canonical('/why-brandsamor'),
    h1: 'Why Brands Choose Brandsamor',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/quality-compliance': {
    path: '/quality-compliance',
    pageName: 'Quality & Compliance',
    title: 'Perfume Quality and Compliance Support | Brandsamor',
    description:
      'Understand the quality checks, IFRA documents, Certificates of Analysis, allergen information and compliance support available for your fragrance line.',
    canonical: canonical('/quality-compliance'),
    h1: 'Quality and Compliance Support for Your Fragrance Line',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: true,
    includeHomeGraph: false,
  },
  '/about': {
    path: '/about',
    pageName: 'About',
    title: 'About Brandsamor | Private Label Fragrance Manufacturer',
    description:
      'Learn what Brandsamor is, its packaging background, private-label model, team regions, and relationship to Packamor LLC.',
    canonical: canonical('/about'),
    h1: 'About Brandsamor',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
    includeOrganizationGraph: true,
  },
  '/contact': {
    path: '/contact',
    pageName: 'Contact',
    title: 'Contact Brandsamor | Private Label Perfume',
    description:
      'Contact Brandsamor for private-label fragrance questions. Email, phone, and U.S. address for Packamor LLC.',
    canonical: canonical('/contact'),
    h1: 'Contact Brandsamor',
    robots: DEFAULT_ROBOTS,
    includeServiceSchema: false,
    includeHomeGraph: false,
  },
  '/get-started': {
    path: '/get-started',
    pageName: 'Get Started',
    title: 'Start Your Private Label Perfume Project | Brandsamor',
    description:
      'Tell Brandsamor about your brand, scent direction, packaging needs, and launch timeline so we can guide your private label fragrance project.',
    canonical: canonical('/get-started'),
    h1: 'Tell Us About Your Perfume Project',
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
