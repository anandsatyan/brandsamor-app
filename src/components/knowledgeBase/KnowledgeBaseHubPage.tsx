import { Link } from 'react-router-dom';
import { ENRICHED_KB_ARTICLES, getArticlesByCategory } from '../../content/knowledgeBase/articleRegistry';
import { KB_CATEGORIES } from '../../content/knowledgeBase/types';
import { kbArticlePath } from '../../content/knowledgeBase/types';
import { buildKnowledgeBaseHubStructuredData } from '../../seo/buildKnowledgeBaseStructuredData';
import { PAGE_METADATA } from '../../seo/pageMetadata';
import { trackKnowledgeBaseArticleClick } from '../../analytics/siteAnalytics';
import { homeBreadcrumbs } from '../Breadcrumbs';
import { PageBreadcrumbBar } from '../PageBreadcrumbBar';
import { SeoHead } from '../SeoHead';
import { SiteFooter } from '../SiteFooter';
import { SiteHeader } from '../SiteHeader';

const ArticleCard = ({
  slug,
  title,
  targetKeyword,
  excerpt,
  readTimeMinutes,
  source,
}: {
  slug: string;
  title: string;
  targetKeyword: string;
  excerpt: string;
  readTimeMinutes: number;
  source: string;
}) => (
  <Link
    to={kbArticlePath(slug)}
    onClick={() => trackKnowledgeBaseArticleClick(slug, title, source)}
    className="group surface-soft p-6 sm:p-8 hover:bg-secondary/55 flex flex-col h-full"
  >
    <p className="type-caption uppercase tracking-wider text-accent font-medium mb-3">
      {targetKeyword}
    </p>
    <h3 className="type-h3 leading-snug mb-3 group-hover:text-accent">
      {title}
    </h3>
    <p className="type-body-sm mb-6 flex-1">{excerpt}</p>
    <span className="type-body-sm font-medium text-heading">Read guide · {readTimeMinutes} min</span>
  </Link>
);

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
          <h1 className="type-h1 mb-5">{meta.h1}</h1>
          <p className="type-body-lg max-w-2xl mx-auto">
            Practical guides organized by topic — from starting a perfume line and sampling to packaging,
            manufacturing, compliance, and pricing.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 pb-16 sm:pb-24 space-y-14 sm:space-y-16">
        {KB_CATEGORIES.map((category) => {
          const articles = getArticlesByCategory(category.id);
          if (articles.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="scroll-mt-28">
              <div className="mb-6 sm:mb-8">
                <h2 className="type-h2-sm mb-2">{category.title}</h2>
                <p className="type-body">{category.description}</p>
              </div>
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    slug={article.slug}
                    title={article.title}
                    targetKeyword={article.targetKeyword}
                    excerpt={article.excerpt}
                    readTimeMinutes={article.readTimeMinutes}
                    source="kb_hub_category"
                  />
                ))}
              </div>
            </section>
          );
        })}

        <section className="border-t border-border pt-10">
          <h2 className="type-h2-sm mb-4">All guides</h2>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {ENRICHED_KB_ARTICLES.map((article) => (
              <ArticleCard
                key={`all-${article.slug}`}
                slug={article.slug}
                title={article.title}
                targetKeyword={article.targetKeyword}
                excerpt={article.excerpt}
                readTimeMinutes={article.readTimeMinutes}
                source="kb_hub_all"
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};
