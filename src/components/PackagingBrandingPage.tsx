import { ComparisonTable } from './ComparisonTable';
import { TopicPageLayout } from './topic/TopicPageLayout';
import { stockVsCustomPackagingComparison } from '../content/comparisonTables';
import { packagingBrandingConfig } from '../content/packagingBranding';

export const PackagingBrandingPage = () => (
  <TopicPageLayout config={packagingBrandingConfig}>
    <ComparisonTable {...stockVsCustomPackagingComparison} />
  </TopicPageLayout>
);
