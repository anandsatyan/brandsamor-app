import type { ReactNode } from 'react';
import { BodyCopy } from '../BodyCopy';
import { homeBreadcrumbs } from '../Breadcrumbs';
import { HeroPanel } from '../HeroPanel';
import { PageBreadcrumbBar } from '../PageBreadcrumbBar';
import { SeoHead } from '../SeoHead';
import { SiteFooter } from '../SiteFooter';
import { SiteHeader } from '../SiteHeader';
import { buildStructuredDataForPath } from '../../seo/buildPageStructuredData';
import type { PageMetadata } from '../../seo/pageMetadata';

export type InfoSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const InfoPageLayout = ({
  meta,
  badge,
  children,
}: {
  meta: PageMetadata;
  badge?: string;
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-surface font-sans overflow-x-hidden">
    <SeoHead
      title={meta.title}
      description={meta.description}
      url={meta.canonical}
      structuredData={buildStructuredDataForPath(meta)}
    />
    <SiteHeader />

    <PageBreadcrumbBar items={homeBreadcrumbs(meta.pageName)} width="narrow" />

    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
      <HeroPanel className="py-10 sm:py-14 mb-10 sm:mb-12 rounded-none sm:rounded-2xl text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          {badge && (
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-full border border-white/30 mb-6">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-white">{meta.h1}</h1>
          <p className="text-base sm:text-lg mb-0 leading-relaxed max-w-2xl">{meta.description}</p>
        </div>
      </HeroPanel>
      {children}
    </main>

    <SiteFooter />
  </div>
);

export const InfoSections = ({ sections }: { sections: InfoSection[] }) => (
  <div className="space-y-10 sm:space-y-12">
    {sections.map((section) => (
      <section key={section.id} id={section.id} className="border-t border-border pt-8 sm:pt-10">
        <h2 className="text-2xl sm:text-3xl mb-4">{section.title}</h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-body leading-relaxed mb-4 last:mb-0">
            <BodyCopy>{paragraph}</BodyCopy>
          </p>
        ))}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="mt-4 space-y-2 list-disc pl-5 text-body">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </div>
);
