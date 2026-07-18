import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrandsamorLandingPage } from './components/BrandsamorLandingPage';
import { ScrollToTop } from './components/ScrollToTop';
import { NEW_PAGE_PATHS } from './content/newPages/metadata';

const lazyNamed = (
  factory: () => Promise<Record<string, ComponentType>>,
  exportName: string,
) => lazy(() => factory().then((module) => ({ default: module[exportName] })));

const HowItWorksPage = lazyNamed(() => import('./components/HowItWorksPage'), 'HowItWorksPage');
const FragranceProductsPage = lazyNamed(() => import('./components/FragranceProductsPage'), 'FragranceProductsPage');
const FragranceSamplingPage = lazyNamed(() => import('./components/FragranceSamplingPage'), 'FragranceSamplingPage');
const PackagingBrandingPage = lazyNamed(() => import('./components/PackagingBrandingPage'), 'PackagingBrandingPage');
const StartPerfumeLinePage = lazyNamed(() => import('./components/StartPerfumeLinePage'), 'StartPerfumeLinePage');
const WhoWeWorkWithPage = lazyNamed(() => import('./components/WhoWeWorkWithPage'), 'WhoWeWorkWithPage');
const WhyBrandsamorPage = lazyNamed(() => import('./components/WhyBrandsamorPage'), 'WhyBrandsamorPage');
const QualityCompliancePage = lazyNamed(() => import('./components/QualityCompliancePage'), 'QualityCompliancePage');
const CustomPerfumeManufacturerPage = lazyNamed(
  () => import('./components/CustomPerfumeManufacturerPage'),
  'CustomPerfumeManufacturerPage',
);
const PrivateLabelPerfumeManufacturerUsaPage = lazyNamed(
  () => import('./components/PrivateLabelPerfumeManufacturerUsaPage'),
  'PrivateLabelPerfumeManufacturerUsaPage',
);
const HowYourBatchIsMadePage = lazyNamed(
  () => import('./components/HowYourBatchIsMadePage'),
  'HowYourBatchIsMadePage',
);
const AboutPage = lazyNamed(() => import('./components/AboutPage'), 'AboutPage');
const LoginPage = lazyNamed(() => import('./components/LoginPage'), 'LoginPage');
const KnowledgeBaseHubPage = lazyNamed(
  () => import('./components/knowledgeBase/KnowledgeBaseHubPage'),
  'KnowledgeBaseHubPage',
);
const KnowledgeBaseArticlePage = lazyNamed(
  () => import('./components/knowledgeBase/KnowledgeBaseArticlePage'),
  'KnowledgeBaseArticlePage',
);
const ContactPage = lazyNamed(() => import('./components/ContactPage'), 'ContactPage');
const LeadFormPage = lazyNamed(() => import('./components/LeadFormPage'), 'LeadFormPage');
const PrivacyPolicyPage = lazyNamed(() => import('./components/PrivacyPolicyPage'), 'PrivacyPolicyPage');
const TermsPage = lazyNamed(() => import('./components/TermsPage'), 'TermsPage');
const RefundPolicyPage = lazyNamed(() => import('./components/RefundPolicyPage'), 'RefundPolicyPage');
const NotFoundPage = lazyNamed(() => import('./components/NotFoundPage'), 'NotFoundPage');
const CuratedSamplingPage = lazyNamed(
  () => import('./components/CuratedSamplingPage'),
  'CuratedSamplingPage',
);
const CreateAScentPage = lazyNamed(
  () => import('./components/CreateAScentPage'),
  'CreateAScentPage',
);
const CreateAScentStudioPage = lazyNamed(
  () => import('./components/CreateAScentStudioPage'),
  'CreateAScentStudioPage',
);
const ThankYouPreviewPage = lazyNamed(
  () => import('./components/ThankYouPreviewPage'),
  'ThankYouPreviewPage',
);
const AdminOrdersPage = lazyNamed(() => import('./components/AdminOrdersPage'), 'AdminOrdersPage');
const AdminLeadsPage = lazyNamed(() => import('./components/AdminLeadsPage'), 'AdminLeadsPage');
const ScheduleCallPage = lazyNamed(() => import('./components/ScheduleCallPage'), 'ScheduleCallPage');

const commercialPageElements = Object.fromEntries(
  NEW_PAGE_PATHS.map((path) => [
    path,
    lazy(() =>
      import('./components/CommercialTopicPage').then((module) => ({
        default: module.createCommercialPage(path),
      })),
    ),
  ]),
) as Record<string, LazyExoticComponent<ComponentType>>;

export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<BrandsamorLandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/fragrance-products" element={<FragranceProductsPage />} />
        <Route path="/fragrance-sampling" element={<FragranceSamplingPage />} />
        <Route path="/packaging-branding" element={<PackagingBrandingPage />} />
        <Route path="/start-a-perfume-line" element={<StartPerfumeLinePage />} />
        <Route path="/who-we-work-with" element={<WhoWeWorkWithPage />} />
        <Route path="/why-brandsamor" element={<WhyBrandsamorPage />} />
        <Route path="/quality-compliance" element={<QualityCompliancePage />} />
        <Route path="/how-your-batch-is-made" element={<HowYourBatchIsMadePage />} />
        <Route path="/private-label-perfume-manufacturer-usa" element={<PrivateLabelPerfumeManufacturerUsaPage />} />
        <Route path="/custom-perfume-manufacturer" element={<CustomPerfumeManufacturerPage />} />
        {NEW_PAGE_PATHS.map((path) => {
          const Page = commercialPageElements[path];
          return <Route key={path} path={path} element={<Page />} />;
        })}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/schedule-a-call" element={<ScheduleCallPage />} />
        <Route path="/get-started" element={<LeadFormPage />} />
        <Route path="/curated-sampling" element={<CuratedSamplingPage />} />
        <Route path="/curated-sampling/thank-you-preview" element={<ThankYouPreviewPage />} />
        <Route path="/create-a-scent" element={<CreateAScentPage />} />
        <Route path="/create-a-scent/studio" element={<CreateAScentStudioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLeadsPage />} />
        <Route path="/admin/leads" element={<AdminLeadsPage />} />
        <Route path="/admin/leads/:sessionId" element={<AdminLeadsPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/orders/:orderNumber" element={<AdminOrdersPage />} />
        <Route path="/knowledge-base" element={<KnowledgeBaseHubPage />} />
        <Route path="/knowledge-base/:slug" element={<KnowledgeBaseArticlePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund-and-cancellation-policy" element={<RefundPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </>
);
