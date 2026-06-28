import type { ComponentType, ReactNode } from 'react';
import type { FaqItem } from '../../seo/siteConfig';
import type { NavKey } from '../../routes/siteRoutes';

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

export type TopicPageConfig = {
  navKey?: NavKey;
  seo: {
    title: string;
    description: string;
    url: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    Illustration: IllustrationComponent;
  };
  sections: ContentSectionData[];
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
};
