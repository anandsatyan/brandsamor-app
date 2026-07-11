export const LEAD_FORM_PATH = '/get-started';

/** Primary commercial CTA — curated sampling is the first step. */
export const CURATED_SAMPLING_PATH = '/curated-sampling';
export const PRIMARY_CTA_LABEL = 'Start with sampling';

export const BUSINESS_TYPES = [
  'Beauty or skincare brand',
  'Creator or influencer',
  'Boutique or retailer',
  'Hotel, spa, or hospitality',
  'Salon or wellness studio',
  'Candle or home fragrance brand',
  'Corporate gifting company',
  'Fragrance entrepreneur (new brand)',
  'Other',
] as const;

export const PRODUCT_INTERESTS = [
  'Eau de parfum',
  'Perfume oil',
  'Body mist',
  'Room spray',
  'Travel perfume',
  'Gift sets',
  'Not sure yet',
] as const;

export const LAUNCH_TIMELINES = [
  'As soon as possible',
  'Within 1–2 months',
  'Within 3–6 months',
  'Just exploring options',
] as const;

export const ORDER_QUANTITIES = [
  'Under 500 units',
  '500–2,000 units',
  '2,000–5,000 units',
  '5,000+ units',
  'Not sure yet',
] as const;

export type LeadFormPayload = {
  fullName: string;
  email: string;
  phone?: string;
  brandName: string;
  website?: string;
  country: string;
  businessType: string;
  productInterests: string[];
  launchTimeline: string;
  orderQuantity: string;
};
