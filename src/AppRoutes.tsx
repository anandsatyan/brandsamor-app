import { Route, Routes } from 'react-router-dom';
import { AboutPage } from './components/AboutPage';
import { BrandsamorLandingPage } from './components/BrandsamorLandingPage';
import { ContactPage } from './components/ContactPage';
import { FragranceProductsPage } from './components/FragranceProductsPage';
import { FragranceSamplingPage } from './components/FragranceSamplingPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { NotFoundPage } from './components/NotFoundPage';
import { PackagingBrandingPage } from './components/PackagingBrandingPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { QualityCompliancePage } from './components/QualityCompliancePage';
import { RefundPolicyPage } from './components/RefundPolicyPage';
import { ScrollToTop } from './components/ScrollToTop';
import { StartPerfumeLinePage } from './components/StartPerfumeLinePage';
import { TermsPage } from './components/TermsPage';
import { WhoWeWorkWithPage } from './components/WhoWeWorkWithPage';
import { WhyBrandsamorPage } from './components/WhyBrandsamorPage';

export const AppRoutes = () => (
  <>
    <ScrollToTop />
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
  </>
);
