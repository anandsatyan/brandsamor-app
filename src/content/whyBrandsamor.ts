import type { TopicPageConfig } from '../components/topic/types';
import {
  ApprovalIllustration,
  DeliveryIllustration,
  FlatLayIllustration,
  HeroBottleIllustration,
  PackagingIllustration,
  ProcessTimelineIllustration,
  ProductionIllustration,
  QualityCheckIllustration,
  RepeatOrderIllustration,
  RigidBoxIllustration,
  ScentSamplesIllustration,
} from '../components/Illustrations';
import { WHY_BRANDSAMOR_FAQ_ITEMS } from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/why-brandsamor');

export const whyBrandsamorConfig: TopicPageConfig = {
  seo: pageMeta.seo,
  hero: {
    badge: 'WHY BRANDSAMOR',
    title: pageMeta.h1,
    description:
      'As a private label perfume company, Brandsamor combines fragrance sampling, packaging experience and production coordination so you do not need a factory, production staff or months of setup. Sample first via [fragrance sampling](/fragrance-sampling), customize your bottle and branding, then receive a ready-to-sell batch.',
    Illustration: ProcessTimelineIllustration,
  },
  sections: withSteps(
    [
      {
        id: 'no-factory-setup',
        title: 'No factory setup needed',
        description:
          'Starting your own perfume production means equipment, staff, suppliers, and months of setup. Brandsamor handles sourcing, filling, packaging, and quality checks so you focus on your brand and customers.',
        bullets: sectionBullets(
          'Skip factory equipment and production hiring',
          'Avoid months of manufacturing setup time',
          'Launch with an established production workflow',
          'Focus on brand, sales, and customer experience',
        ),
        Illustration: ProductionIllustration,
      },
      {
        id: 'samples-before-commit',
        title: 'Samples before you commit',
        description:
          'Order fragrance samples first, compare scent options on skin, and choose what feels right before starting your first production batch. A sample-first workflow reduces risk on your launch scent.',
        bullets: sectionBullets(
          'Start your project to explore the Brandsamor scent library with our team',
          'Compare fragrances with your team or test audience',
          'Choose confidently before bulk production',
          'Add extra samples if you need more directions',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'manageable-quantities',
        title: 'Manageable first-batch quantities',
        description:
          'Brandsamor is built to help you start with a focused first batch — learn what customers like, refine packaging or pricing, and grow the fragrance line step by step rather than requiring a factory-scale launch.',
        bullets: sectionBullets(
          'Start with a quantity that matches your launch plan',
          'Validate demand before scaling production',
          'Add scents, sizes, or formats as sales grow',
          'Lower upfront risk compared to large MOQ suppliers',
        ),
        Illustration: ApprovalIllustration,
      },
      {
        id: 'bottle-branding-options',
        title: 'More bottle and branding options',
        description:
          'Choose from bottle shapes, cap finishes, spray hardware, labels, screen printing, color direction, and boxes — so your perfume reflects your brand instead of looking like a standard off-the-shelf private label product.',
        bullets: sectionBullets(
          'Multiple bottle shapes, sizes, and glass finishes',
          'Cap and spray combinations for premium hand feel',
          'Custom labels, printing, and color direction',
          'Retail boxes, inserts, and gift packaging',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'finished-ready-to-sell',
        title: 'Finished and ready to sell',
        description:
          'Most brands move from scent selection to a packed, finished first batch in weeks — not months. Your perfume arrives filled, labeled, boxed, and ready to sell in-store, online, or as a branded gift.',
        bullets: sectionBullets(
          'Timelines built for weeks, not traditional factory cycles',
          'Filled, labeled, and packed under your brand name',
          'Ready for retail shelf, e-commerce, or gifting',
          'Production sample approval before the full batch runs',
        ),
        Illustration: DeliveryIllustration,
      },
      {
        id: 'quality-checks-handled',
        title: 'Quality checks handled for you',
        description:
          'Brandsamor checks product details during filling, packing, and finishing. You approve a production sample before the full batch ships — without managing quality control on the production floor yourself.',
        bullets: sectionBullets(
          'Quality review during filling and finishing',
          'Production sample sign-off before bulk run',
          'Consistent processes across repeat orders',
          'Less operational burden on your team',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'packaging-experience',
        title: 'Packaging built on fragrance experience',
        description:
          'Brandsamor already works with fragrance brands that source bottles, caps, sprays, and packaging. Private label builds on that experience so you get more ways to shape the look and feel of your finished product.',
        bullets: sectionBullets(
          'Proven bottle, cap, and spray sourcing network',
          'Understanding of how packaging affects perceived value',
          'Support for boxes, inserts, and gift presentation',
          'Guidance on combinations that match your price point',
        ),
        Illustration: RigidBoxIllustration,
      },
      {
        id: 'supplier-network',
        title: 'Established supplier network',
        description:
          'Behind every batch is a network of fragrance, bottle, cap, and packaging suppliers Brandsamor already works with. You get access to that supply chain without negotiating each component yourself.',
        bullets: sectionBullets(
          'Curated fragrance library ready for private label',
          'Bottle, cap, and spray options in one workflow',
          'Packaging suppliers aligned with fragrance production',
          'Fewer vendor relationships for you to manage',
        ),
        Illustration: FlatLayIllustration,
      },
      {
        id: 'repeat-orders-support',
        title: 'Repeat orders and line growth',
        description:
          'Once your first batch sells, Brandsamor supports repeat production with the same scent, packaging, and quality processes — plus room to refine labels, add formats, or introduce new fragrances.',
        bullets: sectionBullets(
          'Reorder your hero scent with consistent quality',
          'Refine packaging based on customer feedback',
          'Add travel sizes, gift sets, or new scents over time',
          'Grow the line without restarting from scratch',
        ),
        Illustration: RepeatOrderIllustration,
      },
      {
        id: 'customer-proof',
        title: 'Trusted by fragrance brands',
        description:
          'Brandsamor focuses on heavy glass bottles, premium atomizers, and packaging that feels ready for retail — the quality bar your customers notice when they hold the finished product.',
        bullets: sectionBullets(
          'Heavy, high-quality glass bottles',
          'Atomizers and hardware that feel premium in hand',
          'Boxes and finishing that match the bottle quality',
          'Finished products customers are proud to gift',
        ),
        Illustration: HeroBottleIllustration,
      },
    ],
    'WHY BRANDSAMOR',
  ),
  faq: {
    id: 'why-brandsamor-faq',
    eyebrow: 'FAQ',
    title: 'Why Brandsamor questions',
    description:
      'Common questions about how Brandsamor compares to factory setup, sampling, timelines, and quality for private label perfume.',
    items: WHY_BRANDSAMOR_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'GET STARTED',
    title: 'Start Your Project',
    description:
      'Ready to launch a branded fragrance without factory setup? Start your project to request scent samples, explore bottle and packaging options, and plan your first ready-to-sell batch with Brandsamor.',
    Illustration: ProcessTimelineIllustration,
  },
  relatedLinks: {
    links: [
      { to: '/about', label: 'About Brandsamor and Packamor LLC' },
      { to: 'https://www.packamor.com/pages/about-us', label: 'Packamor About page', external: true },
      { to: '/quality-compliance', label: 'Quality and compliance support' },
      { to: '/contact', label: 'Contact Brandsamor' },
    ],
  },
};
