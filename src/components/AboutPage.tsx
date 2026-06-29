import { InfoPageLayout, InfoSections } from '../components/info/InfoPageLayout';
import { aboutSections } from '../content/about';
import { PAGE_METADATA } from '../seo/pageMetadata';

export const AboutPage = () => {
  const meta = PAGE_METADATA['/about'];

  return (
    <InfoPageLayout meta={meta} badge="ABOUT">
      <InfoSections sections={aboutSections} />
    </InfoPageLayout>
  );
};
