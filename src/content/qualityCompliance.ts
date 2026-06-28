import type { TopicPageConfig } from '../components/topic/types';
import {
  BrandBriefIllustration,
  ComplianceDocIllustration,
  LabelIllustration,
  PackagingIllustration,
  ProductionIllustration,
  QualityCheckIllustration,
} from '../components/Illustrations';
import { QUALITY_COMPLIANCE_FAQ_ITEMS } from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/quality-compliance');

export const qualityComplianceConfig: TopicPageConfig = {
  seo: pageMeta.seo,
  hero: {
    badge: 'QUALITY & COMPLIANCE',
    title: pageMeta.h1,
    description:
      'Compliance needs vary by product type, market, and sales channel. Brandsamor supports quality processes and documentation — including GMP-aligned production, Certificates of Analysis, IFRA certificates, allergen information, and FDA MoCRA guidance where applicable.',
    Illustration: ComplianceDocIllustration,
  },
  sections: withSteps(
    [
      {
        id: 'production-quality-controls',
        title: 'Production quality controls',
        description:
          'Quality is checked during filling, packing, and finishing — not just at the end of the line. Documented processes help ensure each batch meets the standards your brand and customers expect.',
        bullets: sectionBullets(
          'Checks during filling, packing, and finishing',
          'Production sample review before bulk run',
          'Documented steps aligned with cosmetic production standards',
          'Consistency across first batch and repeat orders',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'raw-material-docs',
        title: 'Raw material documentation',
        description:
          'Fragrance formulas and raw materials come with documentation that supports formulation review, supplier traceability, and your internal quality records — especially important for retailers and distributors.',
        bullets: sectionBullets(
          'Documentation for fragrance and component sourcing',
          'Supports internal review and retailer requirements',
          'Traceability from raw material to finished batch',
          'Organized records from your first launch forward',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'certificate-of-analysis',
        title: 'Certificate of Analysis',
        description:
          'A Certificate of Analysis can be provided for your selected fragrance batch. It supports transparency with retailers, distributors, or internal quality review and becomes part of your product documentation.',
        bullets: sectionBullets(
          'Batch-specific analysis for your records',
          'Supports retailer and distributor due diligence',
          'Part of your ongoing product documentation',
          'Available for selected fragrance batches',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'ifra-documentation',
        title: 'IFRA documentation',
        description:
          'An IFRA certificate supports safe fragrance use according to applicable fragrance-use standards. It can help with formulation review, label planning, and market-specific documentation needs.',
        bullets: sectionBullets(
          'Supports safe fragrance use standards',
          'Useful for formulation and label review',
          'Helps with market-specific documentation requirements',
          'Can be provided for applicable fragrance batches',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'allergen-info',
        title: 'Allergen information',
        description:
          'Allergen information supports label planning and ingredient review — especially for markets that require disclosure of specific fragrance allergens on product labels or safety documentation.',
        bullets: sectionBullets(
          'Supports label ingredient and allergen planning',
          'Helps review formula against market requirements',
          'Useful for EU and other disclosure-focused markets',
          'Provided to support your labeling decisions',
        ),
        Illustration: LabelIllustration,
      },
      {
        id: 'packaging-compatibility',
        title: 'Packaging compatibility',
        description:
          'Fragrance must work with your chosen bottle, cap, spray, and label materials. Compatibility review helps avoid issues like leakage, discoloration, or label adhesion problems after filling.',
        bullets: sectionBullets(
          'Bottle and cap fit tested for your format',
          'Spray hardware matched to fragrance and bottle',
          'Label materials considered for alcohol-based products',
          'Reduces risk of post-fill packaging failures',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'batch-coding',
        title: 'Batch coding and traceability',
        description:
          'Batch codes on finished product support traceability from production run to customer. Organized batch records help you manage recalls, quality inquiries, and repeat order consistency.',
        bullets: sectionBullets(
          'Batch identification on finished units',
          'Records linking product to production run',
          'Supports quality inquiries and traceability',
          'Organized documentation from launch forward',
        ),
        Illustration: ProductionIllustration,
      },
      {
        id: 'gmp-aligned',
        title: 'GMP-aligned production',
        description:
          'Good Manufacturing Practice standards guide how cosmetic products are filled and finished. Brandsamor works through facilities following GMP standards for cosmetic products so your perfume is produced with documented quality processes.',
        bullets: sectionBullets(
          'Production aligned with cosmetic GMP standards',
          'Documented filling and finishing procedures',
          'Facilities equipped for cosmetic product manufacturing',
          'Quality processes you can reference with partners',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'fda-mocra',
        title: 'FDA MoCRA guidance',
        description:
          'For fragrance products sold as cosmetics in the U.S., FDA MoCRA facility registration and cosmetic product listing may apply. Brandsamor plans to support this process where applicable to your product and sales channel.',
        bullets: sectionBullets(
          'Guidance on MoCRA requirements where applicable',
          'Support for facility registration and product listing',
          'Depends on product type, claims, and U.S. sales',
          'Not described as FDA approval of perfume products',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'export-docs',
        title: 'Export and market documentation',
        description:
          'Selling in multiple markets may require additional documentation beyond your home country. Brandsamor can help you understand what records may apply and what your team remains responsible for.',
        bullets: sectionBullets(
          'Documentation needs vary by destination market',
          'IFRA, allergen, and batch records support export review',
          'Early planning avoids delays at launch',
          'Clarity on what Brandsamor provides vs. your obligations',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'customer-responsibilities',
        title: 'Your responsibilities as the brand',
        description:
          'As the brand owner, you remain responsible for how the product is labeled, marketed, and sold. Brandsamor provides production support and documentation — but final compliance decisions for your market and claims rest with you.',
        bullets: sectionBullets(
          'You own product claims and marketing language',
          'Label content and regulatory text are your responsibility',
          'Confirm requirements for each market you sell into',
          'Use provided documentation to support your compliance review',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'compliance-disclaimer',
        title: 'Compliance disclaimer',
        description:
          'Brandsamor does not describe perfume products as FDA approved. Compliance requirements depend on product type, market, claims, formula, and selling channel. Documentation support varies — discuss your specific needs before launch.',
        bullets: sectionBullets(
          'Compliance needs vary by product and market',
          'Documentation support is provided where applicable',
          'Not a substitute for your legal or regulatory review',
          'Discuss requirements early in your launch planning',
        ),
        Illustration: ComplianceDocIllustration,
      },
    ],
    'COMPLIANCE',
  ),
  faq: {
    id: 'quality-compliance-faq',
    eyebrow: 'FAQ',
    title: 'Quality and compliance questions',
    description:
      'Answers about GMP production, Certificates of Analysis, IFRA certificates, allergen information, FDA MoCRA, and documentation for private label fragrance.',
    items: QUALITY_COMPLIANCE_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'COMPLIANCE SUPPORT',
    title: 'Discuss Compliance Requirements',
    description:
      'Tell us about your product, target markets, and sales channels. We will help you understand what quality and compliance documentation may apply to your private label fragrance launch.',
    Illustration: ComplianceDocIllustration,
  },
};
