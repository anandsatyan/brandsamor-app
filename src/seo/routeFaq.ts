import { FAQ_ITEMS, PROCESS_FAQ_ITEMS, type FaqItem } from './siteConfig';
import {
  FRAGRANCE_PRODUCTS_FAQ_ITEMS,
  FRAGRANCE_SAMPLING_FAQ_ITEMS,
  PACKAGING_BRANDING_FAQ_ITEMS,
  QUALITY_COMPLIANCE_FAQ_ITEMS,
  START_PERFUME_LINE_FAQ_ITEMS,
  WHO_WE_WORK_WITH_FAQ_ITEMS,
  WHY_BRANDSAMOR_FAQ_ITEMS,
} from './pageSeo';

export const FAQ_BY_ROUTE: Record<string, FaqItem[]> = {
  '/': FAQ_ITEMS,
  '/how-it-works': PROCESS_FAQ_ITEMS,
  '/fragrance-products': FRAGRANCE_PRODUCTS_FAQ_ITEMS,
  '/fragrance-sampling': FRAGRANCE_SAMPLING_FAQ_ITEMS,
  '/packaging-branding': PACKAGING_BRANDING_FAQ_ITEMS,
  '/start-a-perfume-line': START_PERFUME_LINE_FAQ_ITEMS,
  '/who-we-work-with': WHO_WE_WORK_WITH_FAQ_ITEMS,
  '/why-brandsamor': WHY_BRANDSAMOR_FAQ_ITEMS,
  '/quality-compliance': QUALITY_COMPLIANCE_FAQ_ITEMS,
};
