import { ComparisonTable } from './ComparisonTable';
import { TopicPageLayout } from './topic/TopicPageLayout';
import { oneScentVsCollectionComparison, privateLabelComparison } from '../content/comparisonTables';
import { startPerfumeLineConfig } from '../content/startPerfumeLine';

export const StartPerfumeLinePage = () => (
  <TopicPageLayout config={startPerfumeLineConfig}>
    <ComparisonTable {...privateLabelComparison} />
    <ComparisonTable {...oneScentVsCollectionComparison} />
  </TopicPageLayout>
);
