import type { TopicPageConfig } from '../../components/topic/types';
import { BUSINESS_FACTS, COMMERCIAL_COPY } from '../../seo/businessFacts';
import { createTopicPageMeta } from '../../seo/topicPageMeta';
import type { FaqItem } from '../../seo/siteConfig';
import type { IllustrationComponent } from '../../components/topic/types';
import { sectionBullets, withSteps } from '../sectionHelpers';

export const defaultKeyFacts = (overrides: { format?: string; market?: string } = {}) => [
  { label: 'Production MOQ', value: BUSINESS_FACTS.minimumOrderQuantityLabel },
  { label: 'Indicative pricing', value: BUSINESS_FACTS.pricesStartAtLabel },
  { label: 'Sample dispatch', value: BUSINESS_FACTS.sampleDispatch },
  { label: 'Production lead time', value: BUSINESS_FACTS.productionTimeline },
  ...(overrides.format ? [{ label: 'Primary format', value: overrides.format }] : []),
  ...(overrides.market ? [{ label: 'Market focus', value: overrides.market }] : []),
  { label: 'Documentation', value: 'IFRA, COA, GMP, ISO 22716, MoCRA support' },
];

type SectionInput = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  Illustration?: IllustrationComponent;
};

type BuildArgs = {
  path: Parameters<typeof createTopicPageMeta>[0];
  badge: string;
  heroDescription: string;
  eyebrowPrefix: string;
  answerBlocks: TopicPageConfig['answerBlocks'];
  sections: SectionInput[];
  faqItems: FaqItem[];
  faqTitle: string;
  faqDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  relatedLinks: { to: string; label: string }[];
  keyFacts?: TopicPageConfig['keyFacts'];
  comparison?: TopicPageConfig['comparison'];
  trustBar?: TopicPageConfig['trustBar'];
  showWhatsApp?: boolean;
  whatsappPrefill?: string;
  areaServed?: string | string[];
  heroIllustration?: IllustrationComponent;
  ctaIllustration?: IllustrationComponent;
};

export const buildCommercialPage = ({
  path,
  badge,
  heroDescription,
  eyebrowPrefix,
  answerBlocks,
  sections,
  faqItems,
  faqTitle,
  faqDescription,
  ctaTitle,
  ctaDescription,
  relatedLinks,
  keyFacts,
  comparison,
  trustBar,
  showWhatsApp,
  whatsappPrefill,
  areaServed,
  heroIllustration,
  ctaIllustration,
}: BuildArgs): TopicPageConfig => {
  const pageMeta = createTopicPageMeta(path);

  return {
    seo: pageMeta.seo,
    hero: {
      badge,
      title: pageMeta.h1,
      description: heroDescription,
      Illustration: heroIllustration,
    },
    keyFacts: keyFacts ?? {
      title: 'Key facts',
      description: COMMERCIAL_COPY.minimumOrderValue,
      facts: defaultKeyFacts(),
    },
    answerBlocks,
    trustBar,
    sections: withSteps(sections, eyebrowPrefix),
    comparison,
    faq: {
      id: `${path.replace(/\//g, '').replace(/^-/, '') || 'page'}-faq`,
      eyebrow: 'FAQ',
      title: faqTitle,
      description: faqDescription,
      items: faqItems,
    },
    cta: {
      eyebrow: 'NEXT STEP',
      title: ctaTitle,
      description: ctaDescription,
      Illustration: ctaIllustration,
    },
    relatedLinks: { title: 'Related pages', links: relatedLinks },
    showWhatsApp,
    whatsappPrefill,
    areaServed,
  };
};

export const faq = (question: string, answer: string): FaqItem => ({ question, answer });

export { sectionBullets, COMMERCIAL_COPY, BUSINESS_FACTS };
