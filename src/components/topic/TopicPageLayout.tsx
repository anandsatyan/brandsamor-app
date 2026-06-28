import { SeoHead } from '../SeoHead';
import { SiteFooter } from '../SiteFooter';
import { SiteHeader } from '../SiteHeader';
import { ContentSections } from './ContentSection';
import { PageCtaSection } from './PageCtaSection';
import { PageFaqSection } from './PageFaqSection';
import { PageHero } from './PageHero';
import { buildTopicStructuredData } from './buildStructuredData';
import type { TopicPageConfig } from './types';

export const TopicPageLayout = ({ config, children }: { config: TopicPageConfig; children?: React.ReactNode }) => (
  <div className="min-h-screen bg-[#f9f7f2] font-sans text-[#2D302B] overflow-x-hidden">
    <SeoHead
      title={config.seo.title}
      description={config.seo.description}
      url={config.seo.url}
      structuredData={buildTopicStructuredData(config)}
    />
    <SiteHeader activeNavKey={config.navKey} />

    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
      <PageHero {...config.hero} />
      <ContentSections sections={config.sections} />
      {children}
      {config.beforeFaq}
      {config.faq && (
        <PageFaqSection
          id={config.faq.id}
          eyebrow={config.faq.eyebrow}
          title={config.faq.title}
          description={config.faq.description}
          items={config.faq.items}
        />
      )}
    </main>

    <PageCtaSection {...config.cta} />
    <SiteFooter />
  </div>
);
