import { ComparisonTable } from './ComparisonTable';
import { TopicPageLayout } from './topic/TopicPageLayout';
import { fragranceFormatsComparison } from '../content/comparisonTables';
import { fragranceProductsConfig } from '../content/fragranceProducts';

export const FragranceProductsPage = () => (
  <TopicPageLayout config={fragranceProductsConfig}>
    <ComparisonTable {...fragranceFormatsComparison} />
  </TopicPageLayout>
);
