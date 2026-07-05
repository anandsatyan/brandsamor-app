export type KbCategoryId =
  | 'starting-a-perfume-line'
  | 'fragrance-sampling'
  | 'product-formats'
  | 'packaging-and-branding'
  | 'manufacturing'
  | 'quality-and-compliance'
  | 'business-and-pricing';

export type KbCategory = {
  id: KbCategoryId;
  title: string;
  description: string;
};

export const KB_CATEGORIES: KbCategory[] = [
  {
    id: 'starting-a-perfume-line',
    title: 'Starting a Perfume Line',
    description: 'Roadmaps, launch models, and first-batch planning.',
  },
  {
    id: 'fragrance-sampling',
    title: 'Fragrance Sampling',
    description: 'Choosing scents, evaluating samples, and narrowing your shortlist.',
  },
  {
    id: 'product-formats',
    title: 'Product Formats',
    description: 'Eau de parfum, oils, mists, and format comparisons.',
  },
  {
    id: 'packaging-and-branding',
    title: 'Packaging and Branding',
    description: 'Bottles, labels, boxes, and retail-ready presentation.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'MOQ, production timelines, and what happens during filling.',
  },
  {
    id: 'quality-and-compliance',
    title: 'Quality and Compliance',
    description: 'IFRA, COA, manufacturer documents, and U.S. imports.',
  },
  {
    id: 'business-and-pricing',
    title: 'Business and Pricing',
    description: 'Startup costs, minimum orders, and commercial planning.',
  },
];

export type KbArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type KbFaqItem = {
  question: string;
  answer: string;
};

export type KbArticleMeta = {
  author: string;
  authorRole: string;
  publishedDate: string;
  updatedDate: string;
  reviewer: string;
  sources?: string[];
};

export type KbArticleBase = {
  slug: string;
  title: string;
  pageName: string;
  h1: string;
  targetKeyword: string;
  description: string;
  excerpt: string;
  readTimeMinutes: number;
  sections: KbArticleSection[];
  faq: KbFaqItem[];
  relatedSlugs: string[];
};

export type KbArticle = KbArticleBase & {
  category: KbCategoryId;
  meta: KbArticleMeta;
  relatedCommercialPages?: string[];
};

export const kbArticlePath = (slug: string) => `/knowledge-base/${slug}`;

export const getCategoryById = (id: KbCategoryId) => KB_CATEGORIES.find((category) => category.id === id)!;
