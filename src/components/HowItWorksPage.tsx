import { TopicPageLayout } from './topic/TopicPageLayout';
import { SplitPanelSection } from './topic/SplitPanelSection';
import { howItWorksConfig, howItWorksSplitPanel, howItWorksTimelineSummary } from '../content/howItWorks';

const TimelineSummary = () => (
  <section id="timeline-summary" className="py-10 sm:py-14 border-t border-border scroll-mt-28">
    <p className="type-eyebrow mb-4">TIMELINE</p>
    <h2 className="type-h2-sm mb-6">{howItWorksTimelineSummary.title}</h2>
    <ol className="grid sm:grid-cols-2 gap-4 sm:gap-5 list-none m-0 p-0">
      {howItWorksTimelineSummary.items.map((item, index) => (
        <li
          key={item.phase}
          className="surface-soft p-5 sm:p-6 flex gap-4"
        >
          <span className="type-display text-accent shrink-0" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
              <h3 className="type-h4 mb-1">{item.phase}</h3>
            <p className="type-body-sm">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export const HowItWorksPage = () => (
  <TopicPageLayout config={howItWorksConfig}>
    <TimelineSummary />
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
