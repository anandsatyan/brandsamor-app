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

export type KbArticle = {
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

export const kbArticlePath = (slug: string) => `/knowledge-base/${slug}`;
