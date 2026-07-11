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
  /** Confirmed production MOQ for private label fragrance. */
  minimumOrderQuantity: 100,
  minimumOrderQuantityLabel: '100 units',
  /** Confirmed starting unit price band (indicative; final quote depends on format and packaging). */
  pricesStartAtUsd: 10,
  pricesStartAtLabel: 'from $10 per unit',
  productionTimeline: '3-6 weeks',
  sampleDispatch: '2-3 days',
  serviceArea: 'Worldwide',
  teamRegions: 'the US, India, China and the UAE',
  certifications: [
    'IFRA',
    'GMP',
    'ISO 22716',
    'MoCRA documentation',
    'Certificate of Analysis (COA)',
    'Halal certification support',
  ] as const,
} as const;

export const COMMERCIAL_COPY = {
  startingPathLabel: 'Start with samples',
  startingPathValue: 'Curated brief',
  startingPathDetail:
    'Complete a short sampling brief about your business and customers. We curate five fragrances matched to your brand, pack them as samples, and help you plan your first production batch — without a large upfront production commitment.',
  scentLibrarySummary:
    'Brandsamor curated sampling starts with a short brief about your business, your customers, and your brand positioning. From your answers, we select five launch-ready fragrances for you to evaluate — no browsing a long scent list or picking samples yourself.',
  sampleOrderPath:
    'Complete the sampling brief about your business and customers. We curate five fragrances, prepare your sample kit, and ship it to you before production begins.',
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
    'Production starts at 100 units. Exact first-batch sizing still depends on product format, packaging, and how you plan to launch.',
  suitabilityNote:
    'Brandsamor is built for brands exploring fragrance — sample scents first, then scale your line when you are ready.',
  minimumOrderValue:
    'There is no minimum to start with samples. Production starts at 100 units, with indicative pricing from $10 per unit depending on format, bottle, decoration and packaging.',
  minimumOrderQuantity:
    'Production minimum order quantity (MOQ) starts at 100 units. Sampling has no production MOQ.',
  pricingBand:
    'Indicative private label pricing starts from $10 per unit. Final unit cost depends on format, bottle size, decoration, packaging tier and order quantity.',
  brandIntro:
    'Brandsamor is the private-label fragrance service operated by Packamor LLC, helping businesses launch ready-to-sell fragrance products under their own brand.',
  legalEntity:
    'Brandsamor is a service brand operated by Packamor LLC, a company registered in Delaware, United States. Packamor LLC is the legal entity responsible for Brandsamor customer agreements, billing and business operations.',
  certificationsSummary:
    'Brandsamor supports IFRA certificates, GMP and ISO 22716 production standards, Certificates of Analysis, MoCRA documentation for US sellers, and halal certification support where the project requires it.',
  trustHeading: 'Trusted by Fragrance Brands',
  trustCopy:
    'Brandsamor has served more than 4,000 brands, earned a 4.8/5 customer rating, and shipped fragrance products to more than 25 countries worldwide.',
  reviewsLinkLabel: 'See verified customer reviews',
} as const;
