import type { ReactNode } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
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
  <div className="min-h-screen bg-[#f9f7f2] font-sans text-[#2D302B] overflow-x-hidden">
    <SeoHead
      title={meta.title}
      description={meta.description}
      url={meta.canonical}
      structuredData={buildStructuredDataForPath(meta)}
    />
    <SiteHeader />

    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-16 pb-16 sm:pb-24">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: meta.pageName },
        ]}
      />
      {badge && (
        <span className="inline-block px-3 py-1 bg-[#E7DED2] text-[#2D302B] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
          {badge}
        </span>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">{meta.h1}</h1>
      <p className="text-base sm:text-lg text-[#2D302B] mb-10 leading-relaxed">{meta.description}</p>
      {children}
    </main>

    <SiteFooter />
  </div>
);

export const InfoSections = ({ sections }: { sections: InfoSection[] }) => (
  <div className="space-y-10 sm:space-y-12">
    {sections.map((section) => (
      <section key={section.id} id={section.id} className="border-t border-[#f1ece0] pt-8 sm:pt-10">
        <h2 className="text-2xl sm:text-3xl mb-4">{section.title}</h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[#77736E] leading-relaxed mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="mt-4 space-y-2 list-disc pl-5 text-[#77736E]">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </div>
);
