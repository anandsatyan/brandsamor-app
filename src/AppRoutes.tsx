import { lazy, Suspense, type ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrandsamorLandingPage } from './components/BrandsamorLandingPage';
import { ScrollToTop } from './components/ScrollToTop';

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
const AboutPage = lazyNamed(() => import('./components/AboutPage'), 'AboutPage');
const ContactPage = lazyNamed(() => import('./components/ContactPage'), 'ContactPage');
const PrivacyPolicyPage = lazyNamed(() => import('./components/PrivacyPolicyPage'), 'PrivacyPolicyPage');
const TermsPage = lazyNamed(() => import('./components/TermsPage'), 'TermsPage');
const RefundPolicyPage = lazyNamed(() => import('./components/RefundPolicyPage'), 'RefundPolicyPage');
const NotFoundPage = lazyNamed(() => import('./components/NotFoundPage'), 'NotFoundPage');

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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund-and-cancellation-policy" element={<RefundPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </>
);
