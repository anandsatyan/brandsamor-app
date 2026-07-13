import { FAQ_ITEMS, ORGANIZATION } from './siteConfig';
import {
  CANONICAL_ORIGIN,
  OG_IMAGE,
  OG_SITE_NAME,
  type PageMetadata,
} from './pageMetadata';

const organizationId = `${CANONICAL_ORIGIN}/#organization`;
const websiteId = `${CANONICAL_ORIGIN}/#website`;

const breadcrumbList = (meta: PageMetadata) => ({
  '@type': 'BreadcrumbList',
  '@id': `${meta.canonical}#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${CANONICAL_ORIGIN}/`,
    },
    ...(meta.path !== '/'
      ? [
          {
            '@type': 'ListItem',
            position: 2,
            name: meta.pageName,
            item: meta.canonical,
          },
        ]
      : []),
  ],
});

const parentOrganizationId = `${CANONICAL_ORIGIN}/#parent-organization`;

const organizationNode = (description: string) => ({
  '@type': 'Organization',
  '@id': organizationId,
  name: ORGANIZATION.name,
  legalName: ORGANIZATION.legalName,
  url: CANONICAL_ORIGIN,
  logo: OG_IMAGE,
  description,
  telephone: ORGANIZATION.phone,
  email: ORGANIZATION.email,
  address: {
    '@type': 'PostalAddress',
    ...ORGANIZATION.address,
  },
  parentOrganization: {
    '@type': 'Organization',
    '@id': parentOrganizationId,
    name: ORGANIZATION.legalName,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.sameAs[0] ?? CANONICAL_ORIGIN,
    address: {
      '@type': 'PostalAddress',
      ...ORGANIZATION.address,
    },
  },
  ...(ORGANIZATION.sameAs.length > 0 ? { sameAs: ORGANIZATION.sameAs } : {}),
});

const websiteNode = (description: string) => ({
  '@type': 'WebSite',
  '@id': websiteId,
  url: CANONICAL_ORIGIN,
  name: OG_SITE_NAME,
  description,
  publisher: { '@id': organizationId },
  inLanguage: 'en-US',
});

const serviceNode = (
  meta: PageMetadata,
  areaServed: string | string[] = 'Worldwide',
) => ({
  '@type': 'Service',
  '@id': `${meta.canonical}#service`,
  name: meta.pageName,
  serviceType: 'Private label fragrance manufacturing',
  provider: { '@id': organizationId },
  areaServed,
  description: meta.description,
  url: meta.canonical,
});

const homeWebPageNode = (meta: PageMetadata) => ({
  '@type': 'WebPage',
  '@id': `${meta.canonical}#webpage`,
  url: meta.canonical,
  name: meta.title,
  description: meta.description,
  isPartOf: { '@id': websiteId },
  inLanguage: 'en-US',
});

const internalWebPageNode = (meta: PageMetadata) => ({
  '@type': 'WebPage',
  '@id': `${meta.canonical}#webpage`,
  url: meta.canonical,
  name: meta.title,
  description: meta.description,
  isPartOf: { '@id': websiteId },
  about: { '@id': organizationId },
  inLanguage: 'en-US',
});

export const buildHomeStructuredData = (meta: PageMetadata) => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationNode(meta.description),
    websiteNode(meta.description),
    homeWebPageNode(meta),
    {
      '@type': 'FAQPage',
      '@id': `${meta.canonical}#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
});

export const buildInternalStructuredData = (
  meta: PageMetadata,
  faqItems?: { question: string; answer: string }[],
  areaServed?: string | string[],
) => {
  const graph: object[] = [];

  if (meta.includeOrganizationGraph) {
    graph.push(organizationNode(meta.description), websiteNode(meta.description));
  }

  graph.push(internalWebPageNode(meta), breadcrumbList(meta));

  if (meta.includeServiceSchema) {
    graph.push(serviceNode(meta, areaServed));
  }

  if (faqItems && faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${meta.canonical}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};

export const buildStructuredDataForPath = (
  meta: PageMetadata,
  faqItems?: { question: string; answer: string }[],
  areaServed?: string | string[],
) =>
  meta.includeHomeGraph
    ? buildHomeStructuredData(meta)
    : buildInternalStructuredData(meta, faqItems, areaServed);
