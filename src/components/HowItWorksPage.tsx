import { TopicPageLayout } from './topic/TopicPageLayout';
import { SplitPanelSection } from './topic/SplitPanelSection';
import { howItWorksConfig, howItWorksSplitPanel, howItWorksTimelineSummary } from '../content/howItWorks';

const TimelineSummary = () => (
  <section id="timeline-summary" className="py-10 sm:py-14 border-t border-border scroll-mt-28">
    <p className="text-accent text-sm uppercase tracking-widest font-semibold mb-4">TIMELINE</p>
    <h2 className="text-2xl sm:text-3xl text-heading mb-6">{howItWorksTimelineSummary.title}</h2>
    <ol className="grid sm:grid-cols-2 gap-4 sm:gap-5 list-none m-0 p-0">
      {howItWorksTimelineSummary.items.map((item, index) => (
        <li
          key={item.phase}
          className="rounded-xl border border-border bg-secondary/50 p-5 sm:p-6 flex gap-4"
        >
          <span className="font-display text-2xl text-accent shrink-0" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="font-semibold text-heading mb-1">{item.phase}</h3>
            <p className="text-sm text-body leading-relaxed">{item.detail}</p>
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
