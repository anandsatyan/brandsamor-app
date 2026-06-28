import { SITE_URL } from '../../seo/siteConfig';
import type { TopicPageConfig } from './types';

export const buildTopicStructuredData = (config: TopicPageConfig) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${config.seo.url}#webpage`,
      url: config.seo.url,
      name: config.seo.title,
      description: config.seo.description,
      isPartOf: { '@id': `${SITE_URL}#website` },
    },
    ...(config.faq
      ? [
          {
            '@type': 'FAQPage',
            mainEntity: config.faq.items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
        ]
      : []),
    ...(config.structuredDataExtra ?? []),
  ],
});
