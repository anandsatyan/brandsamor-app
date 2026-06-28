import { PAGE_METADATA } from './pageMetadata';
import { buildStructuredDataForPath } from './buildPageStructuredData';

export const structuredDataGraph = buildStructuredDataForPath(PAGE_METADATA['/']);
