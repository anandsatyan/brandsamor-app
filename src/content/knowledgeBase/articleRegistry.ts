import { KNOWLEDGE_BASE_ARTICLES } from './articles';
import type { KbArticle, KbArticleMeta, KbCategoryId } from './types';

const defaultArticleMeta: KbArticleMeta = {
  author: 'Brandsamor Editorial Team',
  authorRole: 'Private label fragrance specialists',
  publishedDate: '2026-01-15',
  updatedDate: '2026-07-06',
  reviewer: 'Brandsamor team',
};

const articleEnhancements: Record<
  string,
  {
    category: KbCategoryId;
    relatedCommercialPages: string[];
    sources?: string[];
  }
> = {
  'how-to-start-a-perfume-line': {
    category: 'starting-a-perfume-line',
    relatedCommercialPages: ['/start-a-perfume-line', '/how-it-works', '/fragrance-sampling'],
  },
  'private-label-vs-white-label-vs-custom-perfume': {
    category: 'starting-a-perfume-line',
    relatedCommercialPages: ['/start-a-perfume-line', '/fragrance-products'],
  },
  'perfume-brand-startup-cost': {
    category: 'business-and-pricing',
    relatedCommercialPages: ['/start-a-perfume-line', '/fragrance-sampling'],
  },
  'private-label-perfume-moq': {
    category: 'business-and-pricing',
    relatedCommercialPages: ['/start-a-perfume-line', '/fragrance-products'],
  },
  'private-label-perfume-manufacturing-timeline': {
    category: 'manufacturing',
    relatedCommercialPages: ['/how-it-works', '/fragrance-sampling'],
  },
  'choose-fragrances-for-target-customer': {
    category: 'fragrance-sampling',
    relatedCommercialPages: ['/fragrance-sampling', '/who-we-work-with'],
  },
  'choose-perfume-bottle-and-packaging': {
    category: 'packaging-and-branding',
    relatedCommercialPages: ['/packaging-branding', '/fragrance-products'],
  },
  'edp-vs-edt-vs-perfume-oil': {
    category: 'product-formats',
    relatedCommercialPages: ['/fragrance-products', '/start-a-perfume-line'],
  },
  'perfume-manufacturer-documents': {
    category: 'quality-and-compliance',
    relatedCommercialPages: ['/quality-compliance', '/how-it-works'],
    sources: ['https://www.fda.gov/cosmetics', 'https://ifrafragrance.org/safe-use/library'],
  },
  'import-private-label-perfume-usa': {
    category: 'quality-and-compliance',
    relatedCommercialPages: ['/quality-compliance', '/contact'],
    sources: ['https://www.fda.gov/cosmetics', 'https://www.cbp.gov/'],
  },
  'how-ifra-certificates-work': {
    category: 'quality-and-compliance',
    relatedCommercialPages: ['/quality-compliance'],
    sources: ['https://ifrafragrance.org/safe-use/library'],
  },
  'perfume-certificate-of-analysis': {
    category: 'quality-and-compliance',
    relatedCommercialPages: ['/quality-compliance'],
  },
  'choose-private-label-perfume-manufacturer': {
    category: 'manufacturing',
    relatedCommercialPages: ['/how-it-works', '/why-brandsamor', '/curated-sampling'],
  },
  'is-private-label-perfume-profitable': {
    category: 'business-and-pricing',
    relatedCommercialPages: ['/start-a-perfume-line', '/fragrance-products'],
  },
  'how-to-price-private-label-perfume': {
    category: 'business-and-pricing',
    relatedCommercialPages: ['/start-a-perfume-line', '/fragrance-products'],
  },
  'launch-one-scent-or-several': {
    category: 'starting-a-perfume-line',
    relatedCommercialPages: ['/start-a-perfume-line', '/fragrance-sampling'],
  },
  'how-to-evaluate-perfume-samples': {
    category: 'fragrance-sampling',
    relatedCommercialPages: ['/fragrance-sampling', '/curated-sampling'],
  },
  'boutique-perfume-line-launch': {
    category: 'starting-a-perfume-line',
    relatedCommercialPages: ['/who-we-work-with', '/start-a-perfume-line'],
  },
  'private-label-perfume-fashion-brands': {
    category: 'starting-a-perfume-line',
    relatedCommercialPages: ['/who-we-work-with', '/packaging-branding'],
  },
  'questions-perfume-manufacturer-before-ordering': {
    category: 'manufacturing',
    relatedCommercialPages: ['/how-it-works', '/quality-compliance'],
  },
  'how-many-fragrance-samples-to-test': {
    category: 'fragrance-sampling',
    relatedCommercialPages: ['/fragrance-sampling', '/curated-sampling'],
  },
  'test-demand-before-perfume-inventory': {
    category: 'business-and-pricing',
    relatedCommercialPages: ['/start-a-perfume-line', '/curated-sampling'],
  },
  'calculate-retail-price-perfume': {
    category: 'business-and-pricing',
    relatedCommercialPages: ['/start-a-perfume-line', '/fragrance-products'],
  },
  'fda-mocra-requirements-perfume-brands': {
    category: 'quality-and-compliance',
    relatedCommercialPages: ['/quality-compliance', '/contact'],
    sources: ['https://www.fda.gov/cosmetics/cosmetics-laws-regulations/modernization-cosmetics-regulation-act-mocra'],
  },
  'beauty-brand-add-fragrance-category': {
    category: 'starting-a-perfume-line',
    relatedCommercialPages: ['/who-we-work-with', '/fragrance-products'],
  },
  'launch-perfume-discovery-set': {
    category: 'packaging-and-branding',
    relatedCommercialPages: ['/fragrance-products', '/packaging-branding'],
  },
  'custom-fragrance-development': {
    category: 'manufacturing',
    relatedCommercialPages: ['/fragrance-sampling', '/how-it-works'],
  },
  'how-to-write-fragrance-brief': {
    category: 'fragrance-sampling',
    relatedCommercialPages: ['/fragrance-sampling', '/curated-sampling'],
  },
  'perfume-stability-testing': {
    category: 'quality-and-compliance',
    relatedCommercialPages: ['/quality-compliance', '/how-it-works'],
  },
  'balanced-first-fragrance-collection': {
    category: 'starting-a-perfume-line',
    relatedCommercialPages: ['/fragrance-products', '/start-a-perfume-line'],
  },
  'perfume-manufacturing-india-usa-europe': {
    category: 'manufacturing',
    relatedCommercialPages: ['/how-it-works', '/why-brandsamor'],
  },
  'sell-private-label-perfume-boutique': {
    category: 'business-and-pricing',
    relatedCommercialPages: ['/who-we-work-with', '/start-a-perfume-line'],
  },
};

export const ENRICHED_KB_ARTICLES: KbArticle[] = KNOWLEDGE_BASE_ARTICLES.map((article) => {
  const enhancement = articleEnhancements[article.slug];

  return {
    ...article,
    category: enhancement.category,
    meta: {
      ...defaultArticleMeta,
      sources: enhancement.sources,
    },
    relatedCommercialPages: enhancement.relatedCommercialPages,
  };
});

export const getEnrichedKbArticle = (slug: string) =>
  ENRICHED_KB_ARTICLES.find((article) => article.slug === slug);

export const getArticlesByCategory = (categoryId: KbCategoryId) =>
  ENRICHED_KB_ARTICLES.filter((article) => article.category === categoryId);
