import type { TopicPageConfig } from '../components/topic/types';
import {
  ApproveProductionSampleImage,
  ChooseYourStartingScentsImage,
  DeliveryOfFinishedPerfumesImage,
  DesignLabelsAndPackagingImage,
  ExploreFragranceSamplesImage,
  ExploreFragranceSamplesWhiteImage,
  ProductionAndFillingImage,
  QualityChecksImage,
  RepeatOrdersImage,
  SelectBottlesCapsAndSpraysImage,
  TellUsAboutYourBrandImage,
} from '../components/Illustrations';
import { COMMERCIAL_COPY } from '../seo/businessFacts';
import { PROCESS_FAQ_ITEMS, SITE_NAME } from '../seo/siteConfig';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/how-it-works');

export const howItWorksConfig: TopicPageConfig = {
  navKey: 'how-it-works',
  seo: pageMeta.seo,
  hero: {
    badge: 'HOW IT WORKS',
    title: pageMeta.h1,
    description: `${SITE_NAME} makes private label perfume practical — from [fragrance sampling](/fragrance-sampling) and [product formats](/fragrance-products) to [packaging](/packaging-branding), production approval, and delivery. Review [how perfume is made](/how-your-batch-is-made) before bulk release.`,
    Illustration: TellUsAboutYourBrandImage,
  },
  sections: withSteps(
    [
      {
        id: 'tell-us-about-your-brand',
        title: 'Tell us about your brand',
        description:
          'Share who your perfume is for, how you plan to sell or gift it, and what kind of launch you have in mind. A short brand brief helps Brandsamor recommend the right scent direction, product format, and packaging starting point.',
        bullets: sectionBullets(
          'Your audience, brand style, and price point',
          'Retail, e-commerce, gifting, events, or wholesale plans',
          'Rough quantity range for your first batch',
          'Any logo, colors, or packaging ideas you already have',
        ),
        Illustration: TellUsAboutYourBrandImage,
      },
      {
        id: 'explore-fragrance-samples',
        title: 'Receive curated fragrance samples',
        description:
          'Complete a short sampling brief about your business and customers. Brandsamor curates five fragrances matched to your brand, packs them as a sample kit, and ships them for evaluation. See the [fragrance sampling](/fragrance-sampling) page for dispatch and evaluation details.',
        bullets: sectionBullets(
          'Answer questions about your business, customers, and launch goals',
          'Receive five fragrances curated for your brand and audience',
          'Share samples with your team or test customers',
          'Narrow to your launch scent before bulk production',
        ),
        Illustration: ExploreFragranceSamplesImage,
      },
      {
        id: 'choose-starting-scents',
        title: 'Choose your starting scents',
        description:
          'Pick one hero scent or a small launch set to start with. Most brands begin focused so they can test demand before expanding the line.',
        bullets: sectionBullets(
          'Launch with one scent or a small curated set',
          'Match fragrance direction to your customer and channel',
          'Keep the first batch manageable and market-ready',
          'Plan future scents once you see what sells',
        ),
        Illustration: ChooseYourStartingScentsImage,
      },
      {
        id: 'select-bottles-caps-sprays',
        title: 'Select bottles, caps and sprays',
        description:
          'Choose the bottle shape, size, cap finish, and spray hardware that fit your brand look and price point. Explore [packaging and branding](/packaging-branding) options in detail.',
        bullets: sectionBullets(
          'Bottle shapes, capacities, and glass finishes',
          'Cap styles including metal, wood, and ABS options',
          'Spray and pump combinations for different formats',
          'Travel sprays, rollers, and full-size bottles',
        ),
        Illustration: SelectBottlesCapsAndSpraysImage,
      },
      {
        id: 'design-labels-packaging',
        title: 'Design labels and packaging',
        description:
          'Apply your brand to the finished product with custom labels, printing, color direction, boxes, and gift packaging.',
        bullets: sectionBullets(
          'Logo placement, label design, and screen printing',
          'Box design, inserts, and gift-ready packaging',
          'Color, typography, and finishing details',
          'Retail-ready presentation for your sales channel',
        ),
        Illustration: DesignLabelsAndPackagingImage,
      },
      {
        id: 'approve-production-sample',
        title: 'Approve your production sample',
        description:
          'Before the full batch runs, review a production sample that reflects your chosen scent, bottle, cap, label, and packaging.',
        bullets: sectionBullets(
          'Review scent, fill level, and hardware on a real unit',
          'Confirm label alignment, print quality, and box finish',
          'Request adjustments before bulk production begins',
          'Move forward only when the sample feels right',
        ),
        Illustration: ApproveProductionSampleImage,
      },
      {
        id: 'production-and-filling',
        title: 'Production and filling',
        description:
          'Brandsamor handles filling, crimping, labeling, and finishing for your approved setup while you stay focused on your brand.',
        bullets: sectionBullets(
          'Fragrance filling and crimping to your approved spec',
          'Label application and packaging assembly',
          'Batch planning based on your order quantity',
          'Production managed without you running a factory',
        ),
        Illustration: ProductionAndFillingImage,
      },
      {
        id: 'quality-checks',
        title: 'Quality checks',
        description:
          'Each batch goes through checks for fill level, spray performance, label alignment, packaging integrity, and batch documentation. Read more on [quality and compliance](/quality-compliance).',
        bullets: sectionBullets(
          'Fill level, leak, and spray performance checks',
          'Label, cap, and packaging inspection',
          'Batch records and documentation where applicable',
          'Support for compliance needs based on product and market',
        ),
        Illustration: QualityChecksImage,
      },
      {
        id: 'delivery-finished-perfumes',
        title: 'Delivery of finished perfumes',
        description:
          `Your finished perfumes are packed and shipped ready to sell, gift, or place on shelf. ${COMMERCIAL_COPY.productionTimeline}`,
        bullets: sectionBullets(
          'Finished products packed for your sales channel',
          'Worldwide shipping options based on your order',
          'Ready-to-sell inventory under your brand name',
          'Clear handoff so you can launch immediately',
        ),
        Illustration: DeliveryOfFinishedPerfumesImage,
      },
      {
        id: 'repeat-orders',
        title: 'Repeat orders',
        description:
          'Once your first launch is live, reorder the scents and formats that work, add seasonal drops, or expand into new product types.',
        bullets: sectionBullets(
          'Reorder proven scents with faster turnaround',
          'Add new fragrances using the same sample-first flow',
          'Refine packaging as you learn from customers',
          'Grow from a focused launch into a full fragrance line',
        ),
        Illustration: RepeatOrdersImage,
      },
    ],
    'STEP',
  ),
  faq: {
    id: 'process-faq',
    eyebrow: 'PROCESS FAQ',
    title: 'Questions about the launch process',
    description:
      'Answers to common questions brands ask while moving from samples to their first finished perfume batch.',
    items: PROCESS_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'START WITH SAMPLES',
    title: 'Ready to receive curated samples for your brand?',
    description:
      'The best first step is the sampling brief. Tell us about your business and customers, receive five matched fragrances, and choose your launch scent before committing to production.',
    Illustration: ExploreFragranceSamplesWhiteImage,
    footerText: 'Have questions about the process? Visit the FAQ on the homepage.',
  },
  relatedLinks: {
    links: [
      { to: '/fragrance-sampling', label: 'Explore our fragrance sampling process' },
      { to: '/fragrance-products', label: 'Compare fragrance product formats' },
      { to: '/packaging-branding', label: 'Review your packaging and branding options' },
      { to: '/how-your-batch-is-made', label: 'See how perfume is made' },
      { to: '/quality-compliance', label: 'Understand our quality and compliance support' },
    ],
  },
};

export const howItWorksSplitPanel = {
  leftTitle: 'What you share',
  leftItems: [
    'Your business type, brand stage, and positioning',
    'Who your customers are and how they shop',
    'Brand personality and scent direction preferences',
    'Bottle, cap, and packaging direction',
    'Rough quantity and launch timeline',
    'Final approval before production runs',
  ],
  rightTitle: 'What Brandsamor handles',
  rightItems: [
    'Curating five fragrances from your sampling brief',
    'Sample kit preparation and fulfillment',
    'Bottle, cap, and packaging sourcing',
    'Filling, labeling, and finishing',
    'Production sample preparation',
    'Quality checks and delivery of finished perfumes',
  ],
};

export const howItWorksTimelineSummary = {
  title: 'Timeline summary',
  items: [
    {
      phase: 'Sample dispatch',
      detail: COMMERCIAL_COPY.sampleDispatch,
    },
    {
      phase: 'Evaluation',
      detail: 'Wear your five curated samples on skin, share with your team, and choose your launch scent or small set.',
    },
    {
      phase: 'Production',
      detail: COMMERCIAL_COPY.productionTimeline,
    },
    {
      phase: 'Delivery',
      detail: 'Finished perfumes packed and shipped worldwide, subject to destination, product and logistics requirements.',
    },
  ],
};
