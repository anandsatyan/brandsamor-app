import { Route, Routes } from 'react-router-dom';
import { AboutPage } from './components/AboutPage';
import { BrandsamorLandingPage } from './components/BrandsamorLandingPage';
import { ContactPage } from './components/ContactPage';
import { LeadFormPage } from './components/LeadFormPage';
import { FragranceProductsPage } from './components/FragranceProductsPage';
import { FragranceSamplingPage } from './components/FragranceSamplingPage';
import { HowYourBatchIsMadePage } from './components/HowYourBatchIsMadePage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { KnowledgeBaseArticlePage } from './components/knowledgeBase/KnowledgeBaseArticlePage';
import { KnowledgeBaseHubPage } from './components/knowledgeBase/KnowledgeBaseHubPage';
import { LoginPage } from './components/LoginPage';
import { NotFoundPage } from './components/NotFoundPage';
import { PackagingBrandingPage } from './components/PackagingBrandingPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { QualityCompliancePage } from './components/QualityCompliancePage';
import { RefundPolicyPage } from './components/RefundPolicyPage';
import { StartPerfumeLinePage } from './components/StartPerfumeLinePage';
import { TermsPage } from './components/TermsPage';
import { WhoWeWorkWithPage } from './components/WhoWeWorkWithPage';
import { WhyBrandsamorPage } from './components/WhyBrandsamorPage';
import { ScrollToTop } from './components/ScrollToTop';

/** Eager route tree used by SSR prerender only. */
export const AppRoutesServer = () => (
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
      <Route path="/how-your-batch-is-made" element={<HowYourBatchIsMadePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/get-started" element={<LeadFormPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/knowledge-base" element={<KnowledgeBaseHubPage />} />
      <Route path="/knowledge-base/:slug" element={<KnowledgeBaseArticlePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/refund-and-cancellation-policy" element={<RefundPolicyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);
