import { CANONICAL_ORIGIN, OG_SITE_NAME, type PageMetadata } from './pageMetadata';
import { ORGANIZATION } from './siteConfig';
import type { KbArticle } from '../content/knowledgeBase/types';

const organizationId = `${CANONICAL_ORIGIN}/#organization`;
const websiteId = `${CANONICAL_ORIGIN}/#website`;

const knowledgeBaseBreadcrumb = (meta: PageMetadata, articleName?: string) => ({
  '@type': 'BreadcrumbList',
  '@id': `${meta.canonical}#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${CANONICAL_ORIGIN}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Knowledge Base',
      item: `${CANONICAL_ORIGIN}/knowledge-base`,
    },
    ...(articleName
      ? [
          {
            '@type': 'ListItem',
            position: 3,
            name: articleName,
            item: meta.canonical,
          },
        ]
      : []),
  ],
});

const webPageNode = (meta: PageMetadata) => ({
  '@type': 'WebPage',
  '@id': `${meta.canonical}#webpage`,
  url: meta.canonical,
  name: meta.title,
  description: meta.description,
  isPartOf: { '@id': websiteId },
  about: { '@id': organizationId },
  inLanguage: 'en-US',
});

const articleNode = (meta: PageMetadata, article: KbArticle) => ({
  '@type': 'Article',
  '@id': `${meta.canonical}#article`,
  headline: article.h1,
  name: article.title,
  description: article.description,
  keywords: article.targetKeyword,
  inLanguage: 'en-US',
  isPartOf: { '@id': `${meta.canonical}#webpage` },
  author: {
    '@type': 'Organization',
    name: ORGANIZATION.name,
    url: CANONICAL_ORIGIN,
  },
  publisher: {
    '@type': 'Organization',
    name: OG_SITE_NAME,
    url: CANONICAL_ORIGIN,
  },
  mainEntityOfPage: { '@id': `${meta.canonical}#webpage` },
});

const faqNode = (meta: PageMetadata, faq: KbArticle['faq']) => ({
  '@type': 'FAQPage',
  '@id': `${meta.canonical}#faq`,
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

export const buildKnowledgeBaseHubStructuredData = (meta: PageMetadata) => ({
  '@context': 'https://schema.org',
  '@graph': [webPageNode(meta), knowledgeBaseBreadcrumb(meta)],
});

export const buildKnowledgeBaseArticleStructuredData = (
  meta: PageMetadata,
  article: KbArticle,
) => ({
  '@context': 'https://schema.org',
  '@graph': [
    webPageNode(meta),
    knowledgeBaseBreadcrumb(meta, article.pageName),
    articleNode(meta, article),
    faqNode(meta, article.faq),
  ],
});
