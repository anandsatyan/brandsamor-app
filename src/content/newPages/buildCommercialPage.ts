import type { TopicPageConfig } from '../../components/topic/types';
import { BUSINESS_FACTS, COMMERCIAL_COPY } from '../../seo/businessFacts';
import { createTopicPageMeta } from '../../seo/topicPageMeta';
import type { FaqItem } from '../../seo/siteConfig';
import { CURATED_SAMPLING_PATH } from '../../routes/leadForm';
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

const SAMPLING_MARKDOWN = `[Start with sampling](${CURATED_SAMPLING_PATH})`;
const SAMPLING_RELATED = {
  to: CURATED_SAMPLING_PATH,
  label: 'Start with curated fragrance sampling',
};

/** Append a curated-sampling CTA when Brandsamor is discussed and no sampling link exists yet. */
export const withSamplingCta = (text: string): string => {
  if (!text) return text;
  if (text.includes(CURATED_SAMPLING_PATH) || text.includes('/curated-sampling')) return text;
  if (!/Brandsamor/i.test(text)) return text;
  const trimmed = text.trim();
  const joiner = /[.!?]$/.test(trimmed) ? ' ' : '. ';
  return `${trimmed}${joiner}${SAMPLING_MARKDOWN} to compare scents before production.`;
};

type SectionInput = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  /** Ignored on commercial pages — illustrations are stripped. */
  Illustration?: unknown;
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
  /** @deprecated Commercial pages ship without illustrations. */
  heroIllustration?: unknown;
  /** @deprecated Commercial pages ship without illustrations. */
  ctaIllustration?: unknown;
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
}: BuildArgs): TopicPageConfig => {
  const pageMeta = createTopicPageMeta(path);

  const cleanedSections = sections.map(({ Illustration: _ignored, ...section }) => ({
    ...section,
    description: withSamplingCta(section.description),
  }));

  const cleanedAnswerBlocks = answerBlocks?.map((block) => ({
    ...block,
    answer: withSamplingCta(block.answer),
    detail: block.detail ? withSamplingCta(block.detail) : block.detail,
  }));

  const links = [
    SAMPLING_RELATED,
    ...relatedLinks.filter((link) => link.to !== CURATED_SAMPLING_PATH),
  ];

  return {
    seo: pageMeta.seo,
    hero: {
      badge,
      title: pageMeta.h1,
      description: withSamplingCta(heroDescription),
    },
    keyFacts: keyFacts ?? {
      title: 'Key facts',
      description: COMMERCIAL_COPY.minimumOrderValue,
      facts: defaultKeyFacts(),
    },
    answerBlocks: cleanedAnswerBlocks,
    trustBar,
    sections: withSteps(cleanedSections, eyebrowPrefix),
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
      description: withSamplingCta(ctaDescription),
    },
    relatedLinks: { title: 'Related pages', links },
    showWhatsApp,
    whatsappPrefill,
    areaServed,
    showSamplingCta: true,
  };
};

export const faq = (question: string, answer: string): FaqItem => ({ question, answer });

export { sectionBullets, COMMERCIAL_COPY, BUSINESS_FACTS };
