import { InfoPageLayout, InfoSections } from '../components/info/InfoPageLayout';
import { privacyPolicySections } from '../content/policies';
import { PAGE_METADATA } from '../seo/pageMetadata';

export const PrivacyPolicyPage = () => (
  <InfoPageLayout meta={PAGE_METADATA['/privacy-policy']} badge="LEGAL">
    <InfoSections sections={privacyPolicySections} />
  </InfoPageLayout>
);
