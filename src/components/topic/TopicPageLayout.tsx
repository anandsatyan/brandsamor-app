import { AnswerBlock } from '../aeo/AnswerBlock';
import { QuoteCtaGroup } from '../aeo/QuoteCtaGroup';
import { SamplingCtaBlock } from '../aeo/SamplingCtaBlock';
import { SpecTable } from '../aeo/SpecTable';
import { StickyCtaBar } from '../aeo/StickyCtaBar';
import { TrustBar } from '../aeo/TrustBar';
import { WhatsAppCta } from '../aeo/WhatsAppCta';
import { ComparisonTable } from '../ComparisonTable';
import { getPageMetadata } from '../../seo/pageMetadata';
import { homeBreadcrumbs } from '../Breadcrumbs';
import { PageBreadcrumbBar } from '../PageBreadcrumbBar';
import { SeoHead } from '../SeoHead';
import { SiteFooter } from '../SiteFooter';
import { SiteHeader } from '../SiteHeader';
import { ContentSections } from './ContentSection';
import { PageCtaSection } from './PageCtaSection';
import { PageFaqSection } from './PageFaqSection';
import { PageHero } from './PageHero';
import { RelatedLinksSection } from './RelatedLinksSection';
import { buildTopicStructuredData } from './buildStructuredData';
import type { TopicPageConfig } from './types';

export const TopicPageLayout = ({ config, children }: { config: TopicPageConfig; children?: React.ReactNode }) => {
  const pageMeta = getPageMetadata(config.seo.path);
  const midpoint = Math.max(1, Math.ceil(config.sections.length / 2));
  const sectionsBeforeCta = config.showSamplingCta ? config.sections.slice(0, midpoint) : config.sections;
  const sectionsAfterCta = config.showSamplingCta ? config.sections.slice(midpoint) : [];

  return (
  <div className={`min-h-screen bg-surface font-sans overflow-x-hidden ${config.showWhatsApp ? 'pb-20 md:pb-0' : ''}`}>
    <SeoHead
      title={config.seo.title}
      description={config.seo.description}
      url={config.seo.url}
      structuredData={buildTopicStructuredData(config)}
    />
    <SiteHeader activeNavKey={config.navKey} />

    <PageBreadcrumbBar items={homeBreadcrumbs(pageMeta.pageName)} />

    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
      <PageHero
        {...config.hero}
        trackingLocation={`topic_hero${config.seo.path}`}
        dualCta={config.hero.dualCta ?? true}
        actions={config.hero.actions}
      />
      {config.keyFacts && (
        <SpecTable
          title={config.keyFacts.title}
          description={config.keyFacts.description}
          facts={config.keyFacts.facts}
        />
      )}
      {config.answerBlocks?.map((block) => (
        <AnswerBlock key={block.question} {...block} />
      ))}
      {config.trustBar && <TrustBar {...config.trustBar} />}
      <ContentSections sections={sectionsBeforeCta} />
      {config.showSamplingCta && (
        <SamplingCtaBlock trackingLocation={`topic_sampling${config.seo.path}`} />
      )}
      {sectionsAfterCta.length > 0 && <ContentSections sections={sectionsAfterCta} />}
      {config.comparison && <ComparisonTable {...config.comparison} />}
      {children}
      {config.beforeFaq}
      {config.relatedLinks && (
        <RelatedLinksSection title={config.relatedLinks.title} links={config.relatedLinks.links} />
      )}
      {config.faq && (
        <PageFaqSection
          id={config.faq.id}
          eyebrow={config.faq.eyebrow}
          title={config.faq.title}
          description={config.faq.description}
          items={config.faq.items}
        />
      )}
      {config.showWhatsApp && (
        <section className="py-10 sm:py-14 border-t border-border">
          <h2 className="type-h2-sm mb-3">Prefer WhatsApp?</h2>
          <p className="type-body mb-4 max-w-2xl">
            For UAE and Saudi Arabia projects, WhatsApp is often the fastest way to share your brief and get a clear next step.
          </p>
          <WhatsAppCta variant="button" prefill={config.whatsappPrefill} />
        </section>
      )}
    </main>

    <PageCtaSection
      {...config.cta}
      dualCta={config.cta.dualCta ?? true}
      actions={config.cta.actions}
    />
    <SiteFooter />
    {config.showWhatsApp && (
      <>
        <WhatsAppCta variant="floating" prefill={config.whatsappPrefill} className="hidden md:inline-flex mb-0" />
        <StickyCtaBar showWhatsApp whatsappPrefill={config.whatsappPrefill} />
      </>
    )}
  </div>
  );
};

/** Lightweight dual-CTA strip used above related links on denser pages. */
export const InlineQuoteStrip = ({ trackingLocation }: { trackingLocation: string }) => (
  <div className="py-8 border-t border-border">
    <QuoteCtaGroup trackingLocation={trackingLocation} />
  </div>
);
