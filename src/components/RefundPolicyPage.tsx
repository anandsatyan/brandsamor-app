import { InfoPageLayout, InfoSections } from '../components/info/InfoPageLayout';
import { refundPolicySections } from '../content/policies';
import { PAGE_METADATA } from '../seo/pageMetadata';

export const RefundPolicyPage = () => (
  <InfoPageLayout meta={PAGE_METADATA['/refund-and-cancellation-policy']} badge="LEGAL">
    <InfoSections sections={refundPolicySections} />
  </InfoPageLayout>
);
