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
};

const canonical = (path: string) =>
  path === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;

export const PAGE_METADATA: Record<string, PageMetadata> = {
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
};

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
