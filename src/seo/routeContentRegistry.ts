import type { TopicPageConfig } from '../components/topic/types';
import { customPerfumeManufacturerConfig } from '../content/customPerfumeManufacturer';
import { fragranceProductsConfig } from '../content/fragranceProducts';
import { fragranceSamplingConfig } from '../content/fragranceSampling';
import { howItWorksConfig } from '../content/howItWorks';
import { packagingBrandingConfig } from '../content/packagingBranding';
import { privateLabelPerfumeManufacturerUsaConfig } from '../content/privateLabelPerfumeManufacturerUsa';
import { qualityComplianceConfig } from '../content/qualityCompliance';
import { startPerfumeLineConfig } from '../content/startPerfumeLine';
import { whoWeWorkWithConfig } from '../content/whoWeWorkWith';
import { whyBrandsamorConfig } from '../content/whyBrandsamor';
import { NEW_PAGE_CONFIGS } from '../content/newPages/registry';
import { COMMERCIAL_COPY } from './businessFacts';
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
  '/private-label-perfume-manufacturer-usa': privateLabelPerfumeManufacturerUsaConfig,
  '/custom-perfume-manufacturer': customPerfumeManufacturerConfig,
  ...NEW_PAGE_CONFIGS,
};

export const HOMEPAGE_STATIC_SECTIONS = [
  {
    title: 'How It Works',
    description:
      'Share your brand and customer brief, receive five curated fragrance samples, choose bottle and branding, then receive ready-to-sell perfumes.',
  },
  {
    title: 'Fragrance Products',
    description:
      'Choose from eau de parfum, perfume oils, body mists, room sprays, travel formats and gift sets based on your audience, price point and sales channel.',
  },
  {
    title: 'Fragrance Sampling',
    description: COMMERCIAL_COPY.sampleOrderPath,
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
