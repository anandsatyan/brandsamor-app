import { InfoPageLayout, InfoSections } from '../components/info/InfoPageLayout';
import { termsSections } from '../content/policies';
import { PAGE_METADATA } from '../seo/pageMetadata';

export const TermsPage = () => (
  <InfoPageLayout meta={PAGE_METADATA['/terms']} badge="LEGAL">
    <InfoSections sections={termsSections} />
  </InfoPageLayout>
);
