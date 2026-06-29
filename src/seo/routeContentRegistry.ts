import type { TopicPageConfig } from '../components/topic/types';
import { fragranceProductsConfig } from '../content/fragranceProducts';
import { fragranceSamplingConfig } from '../content/fragranceSampling';
import { howItWorksConfig } from '../content/howItWorks';
import { packagingBrandingConfig } from '../content/packagingBranding';
import { qualityComplianceConfig } from '../content/qualityCompliance';
import { startPerfumeLineConfig } from '../content/startPerfumeLine';
import { whoWeWorkWithConfig } from '../content/whoWeWorkWith';
import { whyBrandsamorConfig } from '../content/whyBrandsamor';
import { PAGE_METADATA } from './pageMetadata';

export const TOPIC_ROUTE_CONFIGS: Record<string, TopicPageConfig> = {
  '/how-it-works': howItWorksConfig,
  '/fragrance-products': fragranceProductsConfig,
  '/fragrance-sampling': fragranceSamplingConfig,
  '/packaging-branding': packagingBrandingConfig,
  '/start-a-perfume-line': startPerfumeLineConfig,
  '/who-we-work-with': whoWeWorkWithConfig,
  '/why-brandsamor': whyBrandsamorConfig,
  '/quality-compliance': qualityComplianceConfig,
};

export const HOMEPAGE_STATIC_SECTIONS = [
  {
    title: 'How It Works',
    description:
      'Sample from the scent library, pick your starting scents, choose bottle and branding, then receive ready-to-sell perfumes.',
  },
  {
    title: 'Fragrance Products',
    description:
      'Launch private label eau de parfum, body mists, room sprays, travel sizes, and gift sets under your brand.',
  },
  {
    title: 'Fragrance Sampling',
    description:
      'Compare fragrance samples from the Brandsamor scent library before committing to your first production batch.',
  },
  {
    title: 'Packaging and Branding',
    description:
      'Customize bottles, caps, sprays, labels, printing, and boxes so your perfume feels aligned with your brand.',
  },
  {
    title: 'Who We Work With',
    description:
      'Private label perfume for beauty brands, creators, boutiques, hotels, salons, and gifting companies.',
  },
  {
    title: 'Quality and Compliance',
    description:
      'Quality checks and documentation support including IFRA certificates, COA, allergen information, and batch records where applicable.',
  },
];

export const getStaticContentRoute = (route: string) => PAGE_METADATA[route] ?? null;
