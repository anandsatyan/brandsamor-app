import { ComparisonTable } from './ComparisonTable';
import { TopicPageLayout } from './topic/TopicPageLayout';
import { privateLabelComparison } from '../content/comparisonTables';
import { customPerfumeManufacturerConfig } from '../content/customPerfumeManufacturer';

export const CustomPerfumeManufacturerPage = () => (
  <TopicPageLayout config={customPerfumeManufacturerConfig}>
    <ComparisonTable {...privateLabelComparison} />
  </TopicPageLayout>
);
