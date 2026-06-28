import { SplitPanelSection } from './topic/SplitPanelSection';
import { TopicPageLayout } from './topic/TopicPageLayout';
import { packagingBrandingConfig } from '../content/packagingBranding';

export const PackagingBrandingPage = () => (
  <TopicPageLayout config={packagingBrandingConfig}>
    <SplitPanelSection
      eyebrow="PACKAGING OPTIONS"
      title="Stock packaging vs custom packaging"
      leftTitle="Stock packaging"
      leftItems={[
        'Faster turnaround for first launches',
        'Lower setup cost for boxes and labels',
        'Proven formats already used in production',
        'Good fit when speed matters more than full custom design',
      ]}
      rightTitle="Custom packaging"
      rightItems={[
        'Unique box shapes, finishes, and print details',
        'Full alignment with your brand identity',
        'Premium presentation for retail and gifting',
        'More control over how the product feels in hand',
      ]}
      rightDark={false}
    />
  </TopicPageLayout>
);
