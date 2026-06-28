import { Link } from 'react-router-dom';
import { buildStructuredDataForPath } from '../seo/buildPageStructuredData';
import { NOT_FOUND_METADATA } from '../seo/pageMetadata';
import { SeoHead } from './SeoHead';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export const NotFoundPage = () => (
  <div className="min-h-screen bg-[#f9f7f2] font-sans text-[#2D302B]">
    <SeoHead
      title={NOT_FOUND_METADATA.title}
      description={NOT_FOUND_METADATA.description}
      url={NOT_FOUND_METADATA.canonical}
      robots={NOT_FOUND_METADATA.robots}
      structuredData={buildStructuredDataForPath(NOT_FOUND_METADATA)}
    />
    <SiteHeader />
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 py-24 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
        {NOT_FOUND_METADATA.h1}
      </h1>
      <p className="text-lg text-[#5a5f57] mb-10">
        The page you requested is not available. Browse our private label perfume resources or return
        to the homepage.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-[#2D302B] px-6 py-3 text-white font-medium hover:bg-[#1f221f] transition-colors"
      >
        Back to Home
      </Link>
    </main>
    <SiteFooter />
  </div>
);
