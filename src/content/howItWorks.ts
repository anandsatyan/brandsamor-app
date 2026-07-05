import type { TopicPageConfig } from '../components/topic/types';
import {
  ApprovalIllustration,
  BrandBriefIllustration,
  DeliveryIllustration,
  FlatLayIllustration,
  MarbleBottleIllustration,
  PackagingIllustration,
  ProcessTimelineIllustration,
  ProductionIllustration,
  QualityCheckIllustration,
  RepeatOrderIllustration,
  ScentSamplesIllustration,
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
    description: `${SITE_NAME} guides you through every step of launching a private label fragrance line — from [fragrance sampling](/fragrance-sampling) and [product formats](/fragrance-products) to [packaging](/packaging-branding), production approval, and delivery.`,
    Illustration: ProcessTimelineIllustration,
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
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'explore-fragrance-samples',
        title: 'Explore fragrance samples',
        description:
          'Browse the Brandsamor scent library and order samples that fit your brand personality. Compare how each fragrance feels before committing to production. See the [fragrance sampling](/fragrance-sampling) page for dispatch and evaluation details.',
        bullets: sectionBullets(
          'Access a curated library of ready-to-launch scents',
          'Order samples to compare notes and wearability',
          'Share options with your team or customers',
          'Narrow down directions before bulk production',
        ),
        Illustration: ScentSamplesIllustration,
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
        Illustration: MarbleBottleIllustration,
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
        Illustration: FlatLayIllustration,
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
        Illustration: PackagingIllustration,
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
        Illustration: ApprovalIllustration,
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
        Illustration: ProductionIllustration,
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
        Illustration: QualityCheckIllustration,
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
        Illustration: DeliveryIllustration,
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
        Illustration: RepeatOrderIllustration,
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
    title: 'Ready to explore scents for your brand?',
    description:
      'The best first step is sampling. Compare fragrance directions, share options with your team, and choose the scent that fits your launch before committing to production.',
    Illustration: ScentSamplesIllustration,
    footerText: 'Have questions about the process? Visit the FAQ on the homepage.',
  },
  relatedLinks: {
    links: [
      { to: '/fragrance-sampling', label: 'Explore our fragrance sampling process' },
      { to: '/fragrance-products', label: 'Compare fragrance product formats' },
      { to: '/packaging-branding', label: 'Review your packaging and branding options' },
      { to: '/quality-compliance', label: 'Understand our quality and compliance support' },
    ],
  },
};

export const howItWorksSplitPanel = {
  leftTitle: 'What you choose',
  leftItems: [
    'Scent direction from the Brandsamor library',
    'Starting fragrance or small launch set',
    'Bottle, cap, and spray combination',
    'Label design, colors, and packaging direction',
    'Rough quantity and launch timeline',
    'Final approval before production runs',
  ],
  rightTitle: 'What Brandsamor handles',
  rightItems: [
    'Scent library access and sample fulfillment',
    'Bottle, cap, and packaging sourcing',
    'Filling, labeling, and finishing',
    'Production sample preparation',
    'Quality checks and batch documentation',
    'Packing and delivery of finished perfumes',
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
      detail: 'Compare samples on skin, share with your team, and choose your launch scent or small set.',
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
