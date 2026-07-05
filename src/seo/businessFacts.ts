/** Single source of truth for confirmed Brandsamor / Packamor business facts. */
export const PACKAMOR_URL = 'https://www.packamor.com/';
export const PACKAMOR_ABOUT_URL = 'https://www.packamor.com/pages/about-us';

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
  minimumOrderValue:
    'Production orders start from a minimum project value of USD $2,000.',
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
    'Exact minimum quantities vary by format and packaging, while projects begin from a $2,000 minimum production order value.',
  suitabilityNote:
    'Brandsamor is best suited to businesses planning a production project of approximately $2,000 or more.',
  packamorDistinction:
    'Brandsamor is the private-label fragrance service operated by Packamor LLC, the team behind Packamor’s perfume-packaging business.',
  legalEntity:
    'Brandsamor is a service brand operated by Packamor LLC, a company registered in Delaware, United States. Packamor LLC is the legal entity responsible for Brandsamor customer agreements, billing and business operations.',
  reviewsIntro:
    'Brandsamor is built by the team behind Packamor. The reviews below reflect customers’ experience with the Packamor Group’s fragrance-packaging products and service.',
  trustHeading: 'Built on Packamor’s Fragrance Packaging Experience',
  trustCopy:
    'Brandsamor is operated by Packamor LLC, the team behind Packamor. Packamor has served more than 4,000 brands, earned a 4.8/5 customer rating and shipped fragrance packaging to more than 25 countries.',
} as const;
