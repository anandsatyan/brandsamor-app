import type { ComponentType, ReactNode } from 'react';
import type { FaqItem } from '../../seo/siteConfig';
import type { NavKey } from '../../routes/siteRoutes';
import type { AnswerBlockProps } from '../aeo/AnswerBlock';
import type { SpecFact } from '../aeo/SpecTable';
import type { TrustBadge } from '../aeo/TrustBar';
import type { ComparisonColumn, ComparisonRow } from '../ComparisonTable';

export type IllustrationComponent = ComponentType;

export type ContentSectionData = {
  id: string;
  eyebrow?: string;
  step?: string;
  title: string;
  description: string;
  bullets?: string[];
  Illustration?: IllustrationComponent;
};

export type CardItem = {
  title: string;
  description: string;
  num?: string;
};

export type TopicComparisonData = {
  id?: string;
  title: string;
  description?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  caption?: string;
};

export type TopicPageConfig = {
  navKey?: NavKey;
  seo: {
    path: string;
    title: string;
    description: string;
    url: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    Illustration?: IllustrationComponent;
  };
  keyFacts?: {
    title?: string;
    description?: string;
    facts: SpecFact[];
  };
  answerBlocks?: AnswerBlockProps[];
  trustBar?: {
    title?: string;
    description?: string;
    badges?: TrustBadge[];
  };
  sections: ContentSectionData[];
  comparison?: TopicComparisonData;
  faq?: {
    id?: string;
    eyebrow: string;
    title: string;
    description: string;
    items: FaqItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    Illustration?: IllustrationComponent;
    footerText?: ReactNode;
  };
  structuredDataExtra?: object[];
  beforeFaq?: ReactNode;
  relatedLinks?: {
    title?: string;
    links: { to: string; label: string; external?: boolean }[];
  };
  showWhatsApp?: boolean;
  whatsappPrefill?: string;
  areaServed?: string | string[];
  /** Mid-page curated sampling CTA for commercial pages. */
  showSamplingCta?: boolean;
};
