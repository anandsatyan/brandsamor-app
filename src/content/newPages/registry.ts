import type { TopicPageConfig } from '../../components/topic/types';
import type { FaqItem } from '../../seo/siteConfig';
import { audiencePageConfigs } from './audiencePages';
import { comparisonPageConfigs } from './comparisonPages';
import { geoPageConfigs } from './geoPages';
import { moneyPageConfigs } from './moneyPages';
import { productPageConfigs } from './productPages';

export const NEW_PAGE_CONFIGS: Record<string, TopicPageConfig> = {
  ...moneyPageConfigs,
  ...geoPageConfigs,
  ...productPageConfigs,
  ...audiencePageConfigs,
  ...comparisonPageConfigs,
};

export const NEW_PAGE_FAQS: Record<string, FaqItem[]> = Object.fromEntries(
  Object.entries(NEW_PAGE_CONFIGS).map(([path, config]) => [path, config.faq?.items ?? []]),
);
