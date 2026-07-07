import { Link } from 'react-router-dom';
import { homeBreadcrumbs } from './Breadcrumbs';
import { PageBreadcrumbBar } from './PageBreadcrumbBar';
import { SectionLinkButton } from './SectionLinkButton';
import { SeoHead } from './SeoHead';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { AdaptiveProcessStage } from './batch/AdaptiveProcessStage';
import { ApprovalCheckpoints } from './batch/ApprovalCheckpoints';
import { BatchProcessFaq } from './batch/BatchProcessFaq';
import { BatchProcessOverview } from './batch/BatchProcessOverview';
import { BatchProcessProgress } from './batch/BatchProcessProgress';
import { BatchDocumentation, ProductionModelSection } from './batch/BatchSupportingSections';
import { ProcessImageGallery } from './batch/ProcessImageGallery';
import { QualityControlMatrix } from './batch/QualityControlMatrix';
import { batchProcessStages, BATCH_PROCESS_FAQ } from '../content/batchProcess';
import { buildStructuredDataForPath } from '../seo/buildPageStructuredData';
import { PAGE_METADATA } from '../seo/pageMetadata';

const meta = PAGE_METADATA['/how-your-batch-is-made'];

const HERO_FLOW_MARKERS = ['Spec', 'Components', 'Fragrance', 'Fill', 'Brand', 'Inspect', 'Pack'] as const;

export const HowYourBatchIsMadePage = () => (
  <div className="min-h-screen bg-surface font-sans overflow-x-hidden">
    <SeoHead
      title={meta.title}
      description={meta.description}
      url={meta.canonical}
      robots={meta.robots}
      structuredData={buildStructuredDataForPath(meta, BATCH_PROCESS_FAQ)}
    />
    <SiteHeader />

    <PageBreadcrumbBar items={homeBreadcrumbs(meta.pageName)} />

    <section className="border-b border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-phi-5 sm:py-phi-6">
        <div className="max-w-4xl">
          <p className="type-eyebrow mb-phi-3">FROM APPROVAL TO FINISHED BATCH</p>
          <h1 className="type-h1 mb-phi-3">{meta.h1}</h1>
          <p className="type-body-lg mb-phi-3 max-w-3xl">
            Once your fragrance, bottle, branding and packaging are approved, your project moves into
            production. Brandsamor coordinates each stage — from preparation and filling to
            finishing, inspection and packing — so the final batch reflects the approved product.
          </p>
          <p className="type-body mb-phi-4 max-w-3xl">
            Each project follows an approved specification covering the fragrance, components,
            artwork, finishing and packing requirements.
          </p>

          <div className="flex flex-wrap gap-phi-2 mb-phi-4" aria-hidden="true">
            {HERO_FLOW_MARKERS.map((marker, index) => (
              <span key={marker} className="inline-flex items-center gap-2">
                <span className="type-num-inline text-accent">{`0${index + 1}`}</span>
                <span className="type-caption uppercase tracking-wider text-heading">{marker}</span>
                {index < HERO_FLOW_MARKERS.length - 1 && (
                  <span className="text-border hidden sm:inline">—</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-phi-2">
            <a href="#production-stages" className="btn-primary">
              See the Production Stages
            </a>
            <SectionLinkButton to="/quality-compliance" variant="secondary">
              Understand Quality &amp; Compliance
            </SectionLinkButton>
          </div>
        </div>
      </div>
    </section>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-phi-5 sm:pb-phi-6">
      <BatchProcessOverview />

      <section id="production-stages" className="border-t border-border">
        <div className="xl:grid xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-phi-4">
          <BatchProcessProgress />
          <div>
            {batchProcessStages.map((stage, index) => (
              <AdaptiveProcessStage key={stage.id} stage={stage} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <ApprovalCheckpoints />
      <QualityControlMatrix />
      <BatchDocumentation />
      <ProductionModelSection />
      <ProcessImageGallery />
      <BatchProcessFaq />

      <section className="mt-phi-5 sm:mt-phi-6 border-t border-border pt-phi-5 sm:pt-phi-6">
        <p className="type-body-sm mb-phi-3">
          Related:{' '}
          <Link to="/how-it-works" className="text-accent hover:opacity-80">
            How it works
          </Link>
          {' · '}
          <Link to="/fragrance-sampling" className="text-accent hover:opacity-80">
            Fragrance sampling
          </Link>
          {' · '}
          <Link to="/packaging-branding" className="text-accent hover:opacity-80">
            Packaging &amp; branding
          </Link>
          {' · '}
          <Link to="/why-brandsamor" className="text-accent hover:opacity-80">
            Why Brandsamor
          </Link>
          {' · '}
          <Link to="/contact" className="text-accent hover:opacity-80">
            Contact
          </Link>
        </p>
      </section>
    </main>

    <section className="surface-dark bg-heading py-phi-5 sm:py-phi-6 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <p className="type-eyebrow mb-phi-3 text-white/80">READY TO MOVE FROM SAMPLE TO PRODUCTION?</p>
        <h2 className="type-h1 mb-phi-3 text-white">Build a Fragrance Product That Can Be Repeated</h2>
        <p className="type-body-lg text-white/85 mb-phi-4 max-w-2xl">
          Start with fragrance and packaging decisions, approve the finished product specification
          and move into a coordinated production process.
        </p>
        <div className="flex flex-wrap gap-phi-2">
          <SectionLinkButton to="/fragrance-sampling" variant="hero">
            Explore Fragrance Sampling
          </SectionLinkButton>
          <Link to="/how-it-works" className="btn-secondary border-white/30 text-white hover:bg-white/10">
            See How It Works
          </Link>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);
