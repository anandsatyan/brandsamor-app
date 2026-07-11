/**
 * Hub-and-spoke route manifest for internal linking, breadcrumbs helpers,
 * sitemap priorities, and llms.txt grouping.
 */
export type PageCluster =
  | 'home'
  | 'service'
  | 'products'
  | 'audience'
  | 'geo'
  | 'compliance'
  | 'guides'
  | 'knowledge'
  | 'utility';

export type PageIntent = 'transactional' | 'commercial' | 'informational' | 'navigational';

export type SiteMapEntry = {
  slug: string;
  title: string;
  cluster: PageCluster;
  parent: string | null;
  intent: PageIntent;
  relatedSlugs: string[];
};

export const SITE_MAP: SiteMapEntry[] = [
  { slug: '/', title: 'Home', cluster: 'home', parent: null, intent: 'transactional', relatedSlugs: ['/how-it-works', '/fragrance-sampling', '/custom-perfume-manufacturer'] },
  { slug: '/custom-perfume-manufacturer', title: 'Custom Perfume Manufacturer', cluster: 'service', parent: '/', intent: 'transactional', relatedSlugs: ['/white-label-perfume-supplier', '/low-moq-perfume-manufacturer', '/fragrance-sampling'] },
  { slug: '/white-label-perfume-supplier', title: 'White Label Perfume Supplier', cluster: 'service', parent: '/', intent: 'transactional', relatedSlugs: ['/private-label-vs-white-label-perfume', '/low-moq-perfume-manufacturer', '/fragrance-sampling'] },
  { slug: '/low-moq-perfume-manufacturer', title: 'Low MOQ Perfume Manufacturer', cluster: 'service', parent: '/', intent: 'transactional', relatedSlugs: ['/perfume-moq-guide', '/private-label-perfume-pricing', '/fragrance-sampling'] },
  { slug: '/contract-perfume-manufacturing', title: 'Contract Perfume Manufacturing', cluster: 'service', parent: '/', intent: 'transactional', relatedSlugs: ['/custom-perfume-manufacturer', '/perfume-filling-services', '/how-your-batch-is-made'] },
  { slug: '/fragrance-products', title: 'Fragrance Products', cluster: 'products', parent: '/', intent: 'commercial', relatedSlugs: ['/eau-de-parfum-manufacturer', '/private-label-perfume-oil-manufacturer', '/private-label-body-mist-manufacturer'] },
  { slug: '/who-we-work-with', title: 'Who We Work With', cluster: 'audience', parent: '/', intent: 'commercial', relatedSlugs: ['/perfume-line-for-influencers-creators', '/private-label-perfume-for-boutiques', '/hotel-signature-scent-manufacturer'] },
  { slug: '/private-label-perfume-manufacturer-usa', title: 'USA', cluster: 'geo', parent: '/', intent: 'transactional', relatedSlugs: ['/private-label-perfume-manufacturer-uae', '/quality-compliance', '/fragrance-sampling'] },
  { slug: '/private-label-perfume-manufacturer-uae', title: 'UAE', cluster: 'geo', parent: '/', intent: 'transactional', relatedSlugs: ['/private-label-oud-perfume-manufacturer', '/private-label-attar-manufacturer', '/halal-perfume-manufacturer'] },
  { slug: '/private-label-perfume-manufacturer-saudi-arabia', title: 'Saudi Arabia', cluster: 'geo', parent: '/', intent: 'transactional', relatedSlugs: ['/halal-perfume-manufacturer', '/private-label-oud-perfume-manufacturer', '/arabic-perfume-manufacturer'] },
  { slug: '/private-label-perfume-manufacturer-uk', title: 'UK', cluster: 'geo', parent: '/', intent: 'transactional', relatedSlugs: ['/quality-compliance', '/vegan-clean-perfume-manufacturer', '/fragrance-sampling'] },
  { slug: '/private-label-perfume-manufacturer-germany', title: 'Germany', cluster: 'geo', parent: '/', intent: 'transactional', relatedSlugs: ['/vegan-clean-perfume-manufacturer', '/quality-compliance', '/niche-perfume-manufacturer'] },
  { slug: '/quality-compliance', title: 'Quality & Compliance', cluster: 'compliance', parent: '/', intent: 'commercial', relatedSlugs: ['/knowledge-base', '/private-label-perfume-manufacturer-usa', '/halal-perfume-manufacturer'] },
  { slug: '/start-a-perfume-line', title: 'Start a Perfume Line', cluster: 'guides', parent: '/', intent: 'informational', relatedSlugs: ['/perfume-moq-guide', '/private-label-perfume-pricing', '/fragrance-sampling'] },
  { slug: '/knowledge-base', title: 'Knowledge Base', cluster: 'knowledge', parent: '/', intent: 'informational', relatedSlugs: ['/start-a-perfume-line', '/quality-compliance', '/how-it-works'] },
];

export const getSiteMapEntry = (slug: string) => SITE_MAP.find((entry) => entry.slug === slug);

export const getRelatedFromSiteMap = (slug: string) => getSiteMapEntry(slug)?.relatedSlugs ?? [];
