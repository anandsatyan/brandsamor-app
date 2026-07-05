/** Single source of truth for confirmed Brandsamor / Packamor business facts. */
export const PACKAMOR_URL = 'https://www.packamor.com/';
export const PACKAMOR_ABOUT_URL = 'https://www.packamor.com/pages/about-us';
export const CUSTOMER_REVIEWS_URL = 'https://www.packamor.com/';

export const BUSINESS_FACTS = {
  brandsServed: '4,000+',
  customerRating: '4.8/5',
  yearsOperating: '2+',
  countriesShipped: '25+',
  minimumProductionOrderValueUsd: 2000,
  minimumProductionOrderValueLabel: 'USD $2,000',
  productionTimeline: '3-6 weeks',
  sampleDispatch: '2-3 business days',
  serviceArea: 'Worldwide',
  teamRegions: 'the US, India, China and the UAE',
} as const;

export const COMMERCIAL_COPY = {
  startingPathLabel: 'Start with samples',
  startingPathValue: 'Explore first',
  startingPathDetail:
    'Tell us about your brand to get started. Our team will guide you through the scent library, help you order samples, and plan your first production batch — without a large upfront production commitment.',
  scentLibrarySummary:
    'The Brandsamor scent library is a curated collection of ready-to-launch fragrances for private-label brands. After you start your project, our team helps you compare scent directions and order the samples you want to evaluate.',
  sampleOrderPath:
    'Start your project and our team will help you select and order fragrance samples that fit your brand before production begins.',
  productionTimeline:
    'Typical production takes approximately 3-6 weeks after fragrance, packaging, artwork and production details have been approved.',
  sampleDispatch:
    'Available fragrance samples are normally dispatched within 2-3 business days.',
  sampleDeliveryNote:
    'Delivery timing depends on destination and shipping service selected.',
  worldwideService:
    'Brandsamor works with customers worldwide, subject to destination, product, logistics and compliance requirements.',
  unitQuantityNote:
    'Unit quantity depends on product format, bottle, decoration, box, fragrance, destination and project requirements.',
  formatMinimumNote:
    'First-batch quantities depend on product format, packaging, and how you plan to launch — we help you size a practical starting order.',
  suitabilityNote:
    'Brandsamor is built for brands exploring fragrance — sample scents first, then scale your line when you are ready.',
  minimumOrderValue:
    'There is no minimum to start with samples. For production, order size depends on your product format, packaging, and launch plan — we help you plan a focused first batch that fits your goals.',
  brandIntro:
    'Brandsamor is the private-label fragrance service operated by Packamor LLC, helping businesses launch ready-to-sell fragrance products under their own brand.',
  legalEntity:
    'Brandsamor is a service brand operated by Packamor LLC, a company registered in Delaware, United States. Packamor LLC is the legal entity responsible for Brandsamor customer agreements, billing and business operations.',
  trustHeading: 'Trusted by Fragrance Brands',
  trustCopy:
    'Brandsamor has served more than 4,000 brands, earned a 4.8/5 customer rating, and shipped fragrance products to more than 25 countries worldwide.',
  reviewsLinkLabel: 'See verified customer reviews',
} as const;
