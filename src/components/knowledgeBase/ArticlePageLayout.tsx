import { Link } from 'react-router-dom';
import { ENRICHED_KB_ARTICLES } from '../../content/knowledgeBase/articleRegistry';
import { getCategoryById, kbArticlePath } from '../../content/knowledgeBase/types';
import { trackKnowledgeBaseArticleClick } from '../../analytics/siteAnalytics';
import { PageBreadcrumbBar } from '../PageBreadcrumbBar';
import { SeoHead } from '../SeoHead';
import { SiteFooter } from '../SiteFooter';
import { SiteHeader } from '../SiteHeader';
import type { PageMetadata } from '../../seo/pageMetadata';
import type { KbArticle, KbFaqItem } from '../../content/knowledgeBase/types';

export const ArticleSections = ({ sections }: { sections: KbArticle['sections'] }) => (
  <div className="space-y-12 sm:space-y-14">
    {sections.map((section) => (
      <section key={section.id} id={section.id} className="scroll-mt-28">
        <h2 className="text-2xl sm:text-3xl mb-4 text-heading">{section.title}</h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-body leading-relaxed mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="mt-4 space-y-2 list-disc pl-5 text-body">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="leading-relaxed">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </div>
);

export const ArticleFaq = ({ items }: { items: KbFaqItem[] }) => (
  <section id="faq" className="scroll-mt-28 border-t border-border pt-10 sm:pt-12">
    <h2 className="text-2xl sm:text-3xl mb-6 text-heading">Frequently asked questions</h2>
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-border bg-secondary overflow-hidden"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
            <span className="font-medium text-heading pr-2">{item.question}</span>
            <span className="text-accent text-lg leading-none shrink-0" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-body leading-relaxed">{item.answer}</div>
        </details>
      ))}
    </div>
  </section>
);

export const RelatedKbArticles = ({ slugs, currentSlug }: { slugs: string[]; currentSlug?: string }) => {
  const articles = slugs
    .map((slug) => ENRICHED_KB_ARTICLES.find((article) => article.slug === slug))
    .filter((article): article is KbArticle => article != null && article.slug !== currentSlug)
    .slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section className="border-t border-border pt-10 sm:pt-12">
      <h2 className="text-xl sm:text-2xl mb-6 text-heading">Related guides</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={kbArticlePath(article.slug)}
            onClick={() => trackKnowledgeBaseArticleClick(article.slug, article.title, 'kb_article_related')}
            className="rounded-xl border border-border bg-secondary p-5 sm:p-6 hover:border-accent/40"
          >
            <p className="text-xs uppercase tracking-wider text-accent mb-2">{article.targetKeyword}</p>
            <h3 className="font-medium text-heading leading-snug mb-2">{article.title}</h3>
            <p className="text-sm text-body line-clamp-3">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

const RelatedCommercialPages = ({ paths }: { paths?: string[] }) => {
  if (!paths || paths.length === 0) return null;

  const labels: Record<string, string> = {
    '/start-a-perfume-line': 'Start a perfume line',
    '/how-it-works': 'How it works',
    '/fragrance-sampling': 'Fragrance sampling',
    '/fragrance-products': 'Fragrance products',
    '/packaging-branding': 'Packaging and branding',
    '/quality-compliance': 'Quality and compliance',
    '/who-we-work-with': 'Who we work with',
    '/contact': 'Contact',
  };

  return (
    <section className="border-t border-border pt-10 sm:pt-12">
      <h2 className="text-xl sm:text-2xl mb-6 text-heading">Related commercial pages</h2>
      <ul className="space-y-3">
        {paths.map((path) => (
          <li key={path}>
            <Link
              to={path}
              className="text-accent font-medium underline decoration-accent underline-offset-4 hover:opacity-80"
            >
              {labels[path] ?? path}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const ArticlePageLayout = ({
  meta,
  article,
  structuredData,
}: {
  meta: PageMetadata;
  article: KbArticle;
  structuredData: object;
}) => {
  const category = getCategoryById(article.category);

  return (
    <div className="min-h-screen bg-surface font-sans overflow-x-hidden">
      <SeoHead
        title={meta.title}
        description={meta.description}
        url={meta.canonical}
        structuredData={structuredData}
      />
      <SiteHeader />

      <PageBreadcrumbBar
        items={[
          { label: 'Home', to: '/' },
          { label: 'Knowledge Base', to: '/knowledge-base' },
          { label: article.pageName },
        ]}
        width="medium"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 pb-16 sm:pb-24">
        <header className="mb-10 sm:mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
            <Link to={`/knowledge-base#${category.id}`} className="hover:opacity-80">
              {category.title}
            </Link>
            {' · '}
            {article.targetKeyword}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight text-heading mb-5">{article.h1}</h1>
          <p className="text-lg text-body leading-relaxed mb-4">{article.excerpt}</p>
          <div className="text-sm text-body/80 space-y-1">
            <p>
              {article.readTimeMinutes} min read · By {article.meta.author}, {article.meta.authorRole}
            </p>
            <p>
              Published {article.meta.publishedDate} · Updated {article.meta.updatedDate}
            </p>
            <p>Reviewed by {article.meta.reviewer}</p>
            {article.meta.sources && article.meta.sources.length > 0 && (
              <p>
                Sources:{' '}
                {article.meta.sources.map((source, index) => (
                  <span key={source}>
                    {index > 0 ? ', ' : ''}
                    <a href={source} className="underline hover:text-accent" rel="noopener noreferrer">
                      {new URL(source).hostname}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
        </header>

        <ArticleSections sections={article.sections} />
        <div className="mt-12 sm:mt-14">
          <ArticleFaq items={article.faq} />
        </div>
        <div className="mt-12 sm:mt-14">
          <RelatedCommercialPages paths={article.relatedCommercialPages} />
        </div>
        <div className="mt-12 sm:mt-14">
          <RelatedKbArticles slugs={article.relatedSlugs} currentSlug={article.slug} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};
