import { useEffect } from 'react';
import Cal, { getCalApi } from '@calid/react-embed';
import { SeoHead } from './SeoHead';
import { SiteHeader } from './SiteHeader';
import { buildStructuredDataForPath } from '../seo/buildPageStructuredData';
import { PAGE_METADATA } from '../seo/pageMetadata';

export const ScheduleCallPage = () => {
  const meta = PAGE_METADATA['/schedule-a-call'];

  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({
        namespace: 'default',
        embedLibUrl: 'https://cal.id/embed-link/embed.js',
      });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#f95706' },
          dark: { 'cal-brand': '#fafafa' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-surface font-sans text-heading">
      <SeoHead
        title={meta.title}
        description={meta.description}
        url={meta.canonical}
        robots={meta.robots}
        structuredData={buildStructuredDataForPath(meta)}
      />
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <div className="border-b border-border/50 px-4 py-6 text-center sm:px-8 sm:py-8">
          <p className="type-eyebrow">Partnership call</p>
          <h1 className="mt-2 type-h3">{meta.h1}</h1>
          <p className="mx-auto mt-2 max-w-xl type-body-sm text-body">{meta.description}</p>
        </div>

        <div className="mx-auto w-full max-w-5xl flex-1 px-2 pb-10 pt-4 sm:px-4 sm:pb-16 sm:pt-6">
          <div className="min-h-[720px] w-full overflow-hidden rounded-[2px] border border-border/60 bg-white">
            <Cal
              namespace="default"
              calLink="brandsamor/partnership-call"
              style={{ width: '100%', height: '100%', minHeight: 720, overflow: 'scroll' }}
              config={{ layout: 'month_view' }}
              calOrigin="https://cal.id"
              embedJsUrl="https://cal.id/embed-link/embed.js"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
