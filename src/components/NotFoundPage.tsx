import { Link } from 'react-router-dom';
import { buildStructuredDataForPath } from '../seo/buildPageStructuredData';
import { NOT_FOUND_METADATA } from '../seo/pageMetadata';
import { homeBreadcrumbs } from './Breadcrumbs';
import { PageBreadcrumbBar } from './PageBreadcrumbBar';
import { SeoHead } from './SeoHead';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export const NotFoundPage = () => (
  <div className="min-h-screen bg-surface font-sans">
    <SeoHead
      title={NOT_FOUND_METADATA.title}
      description={NOT_FOUND_METADATA.description}
      url={NOT_FOUND_METADATA.canonical}
      robots={NOT_FOUND_METADATA.robots}
      structuredData={buildStructuredDataForPath(NOT_FOUND_METADATA)}
    />
    <SiteHeader />
    <PageBreadcrumbBar items={homeBreadcrumbs(NOT_FOUND_METADATA.pageName)} width="narrow" />
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24 text-center">
      <h1 className="type-h1 mb-6">
        {NOT_FOUND_METADATA.h1}
      </h1>
      <p className="type-body-lg mb-10">
        The page you requested is not available. Browse our private label perfume resources or return
        to the homepage.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </main>
    <SiteFooter />
  </div>
);
