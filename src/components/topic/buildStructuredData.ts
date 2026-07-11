import { getPageMetadata } from '../../seo/pageMetadata';
import { buildStructuredDataForPath } from '../../seo/buildPageStructuredData';
import type { TopicPageConfig } from './types';

export const buildTopicStructuredData = (config: TopicPageConfig) => {
  const path = config.seo.path ?? new URL(config.seo.url).pathname;
  const meta = getPageMetadata(path);

  return buildStructuredDataForPath(meta, config.faq?.items, config.areaServed);
};
