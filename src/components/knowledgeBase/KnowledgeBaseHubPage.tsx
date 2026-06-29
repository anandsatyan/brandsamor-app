import { Link } from 'react-router-dom';
import { KNOWLEDGE_BASE_ARTICLES } from '../../content/knowledgeBase/articles';
import { kbArticlePath } from '../../content/knowledgeBase/types';
import { buildKnowledgeBaseHubStructuredData } from '../../seo/buildKnowledgeBaseStructuredData';
import { PAGE_METADATA } from '../../seo/pageMetadata';
import { homeBreadcrumbs } from '../Breadcrumbs';
import { PageBreadcrumbBar } from '../PageBreadcrumbBar';
import { SeoHead } from '../SeoHead';
import { SiteFooter } from '../SiteFooter';
import { SiteHeader } from '../SiteHeader';

export const KnowledgeBaseHubPage = () => {
  const meta = PAGE_METADATA['/knowledge-base'];

  return (
    <div className="min-h-screen bg-surface font-sans overflow-x-hidden">
      <SeoHead
        title={meta.title}
        description={meta.description}
        url={meta.canonical}
        structuredData={buildKnowledgeBaseHubStructuredData(meta)}
      />
      <SiteHeader />

      <PageBreadcrumbBar items={homeBreadcrumbs(meta.pageName)} width="medium" />

      <div className="border-b border-border bg-secondary/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight text-heading mb-5">{meta.h1}</h1>
          <p className="text-base sm:text-lg text-body max-w-2xl mx-auto leading-relaxed">
            Practical guides for founders and brand teams launching private label perfume—from first samples and
            packaging to MOQ, timelines, compliance, and U.S. imports.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 pb-16 sm:pb-24">
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {KNOWLEDGE_BASE_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={kbArticlePath(article.slug)}
              className="group rounded-2xl border border-border bg-secondary p-6 sm:p-8 hover:border-accent/40 flex flex-col h-full"
            >
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-accent font-medium mb-3">
                {article.targetKeyword}
              </p>
              <h2 className="text-lg sm:text-xl font-medium text-heading leading-snug mb-3 group-hover:text-accent">
                {article.title}
              </h2>
              <p className="text-sm sm:text-base text-body leading-relaxed mb-6 flex-1">{article.excerpt}</p>
              <span className="text-sm font-medium text-heading">
                Read guide · {article.readTimeMinutes} min
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};
