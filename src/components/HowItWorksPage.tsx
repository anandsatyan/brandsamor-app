import { SplitPanelSection } from './topic/SplitPanelSection';
import { TopicPageLayout } from './topic/TopicPageLayout';
import { howItWorksConfig, howItWorksSplitPanel } from '../content/howItWorks';

export const HowItWorksPage = () => (
  <TopicPageLayout config={howItWorksConfig}>
    <SplitPanelSection
      eyebrow="YOUR ROLE VS OURS"
      title="Clear responsibilities at every stage"
      leftTitle={howItWorksSplitPanel.leftTitle}
      leftItems={howItWorksSplitPanel.leftItems}
      rightTitle={howItWorksSplitPanel.rightTitle}
      rightItems={howItWorksSplitPanel.rightItems}
    />
  </TopicPageLayout>
);
