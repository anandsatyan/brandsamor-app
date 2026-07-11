import type { TopicPageConfig } from '../components/topic/types';
import {
  ChooseProductFormatImage,
  CommonMistakesToAvoidImage,
  CreateRepeatSalesImage,
  GiftableProductImage,
  HighMarginProductImage,
  KnowYourTargetCustomerImage,
  OneScentOrCollectionImage,
  PlanRetailPriceImage,
  SelectBottleAndPackagingImage,
  StartSmallValidateDemandImage,
  StartSmallValidateDemandCtaImage,
  StrongerBrandExperienceImage,
  WhyLaunchPerfumeImage,
} from '../components/Illustrations';
import { COMMERCIAL_COPY } from '../seo/businessFacts';
import { START_PERFUME_LINE_FAQ_ITEMS } from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/start-a-perfume-line');

export const startPerfumeLineConfig: TopicPageConfig = {
  navKey: 'start-a-perfume-line',
  seo: pageMeta.seo,
  hero: {
    badge: 'START A PERFUME LINE',
    title: pageMeta.h1,
    description:
      'If you are learning how to start a perfume line, begin with your target customer, product format, fragrance samples, packaging and a focused first batch. Brandsamor helps you move from [fragrance sampling](/fragrance-sampling) to ready-to-sell product without managing a factory. ' +
      COMMERCIAL_COPY.unitQuantityNote,
    Illustration: WhyLaunchPerfumeImage,
  },
  sections: withSteps(
    [
      {
        id: 'why-launch-perfume',
        title: 'Why launch perfume under your brand?',
        description:
          'For many businesses, fragrance is not the main product — it is a premium brand extension. A branded perfume gives customers something personal to wear, gift, and remember you by, without requiring you to build manufacturing from scratch.',
        bullets: sectionBullets(
          'Extend your brand into a premium product category',
          'Reach customers beyond your core product line',
          'Create a tangible product tied to your brand identity',
          'Launch without factory equipment or in-house production',
        ),
        Illustration: WhyLaunchPerfumeImage,
      },
      {
        id: 'high-margin-product',
        title: 'Add a high-margin product',
        description:
          'Perfume can deliver strong margins relative to many retail categories. With production handled by Brandsamor, you focus on brand, pricing, and sales while avoiding heavy inventory infrastructure or manufacturing overhead.',
        bullets: sectionBullets(
          'Premium price points customers expect from fragrance',
          'No factory setup or production staff required',
          'Margin shaped by format, packaging, and retail price',
          'Sell through your existing retail or e-commerce channels',
        ),
        Illustration: HighMarginProductImage,
      },
      {
        id: 'giftable-product',
        title: 'Create a product customers can gift',
        description:
          'Perfume is one of the most giftable product categories. A well-packaged branded fragrance is easy to display, easy to wrap, and gives customers a personal way to share your brand with others.',
        bullets: sectionBullets(
          'Natural fit for holidays, events, and special occasions',
          'Retail-ready packaging makes gifting effortless',
          'Gift sets can bundle formats for higher order value',
          'Customers associate your brand with memorable moments',
        ),
        Illustration: GiftableProductImage,
      },
      {
        id: 'brand-experience',
        title: 'Build a stronger brand experience',
        description:
          'Scent is deeply tied to memory. A branded fragrance lets customers carry your brand with them — creating a sensory connection that goes beyond logos, packaging, or a single purchase.',
        bullets: sectionBullets(
          'Scent makes your brand more memorable over time',
          'Customers wear your brand as part of daily life',
          'Fragrance reinforces your brand story and aesthetic',
          'Extends the experience of your spa, hotel, or studio',
        ),
        Illustration: StrongerBrandExperienceImage,
      },
      {
        id: 'repeat-sales',
        title: 'Create repeat sales',
        description:
          'A fragrance people love brings customers back — for refills, gifts, seasonal launches, and new scent drops. Repeat purchases are where a perfume line compounds value beyond the first launch.',
        bullets: sectionBullets(
          'Customers reorder when they finish a bottle',
          'Seasonal or limited editions drive return visits',
          'Gift buyers often become repeat purchasers',
          'Expand the line once your hero scent proves demand',
        ),
        Illustration: CreateRepeatSalesImage,
      },
      {
        id: 'target-customer',
        title: 'Know your target customer',
        description:
          'Before you choose a scent or format, clarify who you are selling to. Your customer shapes fragrance style, price point, packaging feel, and where the product will be worn or gifted.',
        bullets: sectionBullets(
          'Define age, lifestyle, and gender positioning',
          'Consider whether the product is for daily wear or gifting',
          'Match scent intensity to your planned retail price',
          'Align packaging with how your customer shops',
        ),
        Illustration: KnowYourTargetCustomerImage,
      },
      {
        id: 'one-scent-or-collection',
        title: 'One scent or a small collection?',
        description:
          'Most brands launch with one hero scent or a focused set of two to three fragrances. Starting narrow reduces risk, simplifies packaging decisions, and makes it easier to learn what customers respond to.',
        bullets: sectionBullets(
          'A single hero scent is the simplest first launch',
          'Small collections work when you have distinct customer segments',
          'Evaluate curated samples before committing to multiple scents',
          'Add new fragrances once your first batch sells',
        ),
        Illustration: OneScentOrCollectionImage,
      },
      {
        id: 'choose-format',
        title: 'Choose your product format',
        description:
          'Eau de parfum is the most common starting point, but travel sizes, body mists, and gift sets each serve different audiences and price points. Pick the format that fits your channel and customer.',
        bullets: sectionBullets(
          'Eau de parfum for a premium hero product',
          'Travel sizes for trial, gifting, and lower entry price',
          'Body mists for lighter, everyday fragrance',
          'Gift sets to increase perceived value and AOV',
        ),
        Illustration: ChooseProductFormatImage,
      },
      {
        id: 'select-packaging',
        title: 'Select bottle and packaging',
        description:
          'Bottle shape, cap finish, label design, and box packaging all shape how premium your perfume feels. Brandsamor helps you customize these details so the finished product reflects your brand — not a generic template.',
        bullets: sectionBullets(
          'Choose bottle shape, size, and glass finish',
          'Select cap and spray hardware for the right hand feel',
          'Add labels, printing, and color direction',
          'Use boxes and gift packaging for retail-ready presentation',
        ),
        Illustration: SelectBottleAndPackagingImage,
      },
      {
        id: 'plan-retail-price',
        title: 'Plan your retail price',
        description:
          'Your retail price should reflect your audience, packaging quality, and sales channel. Work backward from what your customer will pay to understand margin, format, and packaging choices that make sense.',
        bullets: sectionBullets(
          'Research what similar brands charge in your category',
          'Factor in bottle, cap, label, and box costs together',
          'Higher packaging quality supports higher price points',
          'Start with one price tier before expanding the range',
        ),
        Illustration: PlanRetailPriceImage,
      },
      {
        id: 'start-small-validate',
        title: 'Start small and validate demand',
        description:
          'Brandsamor is built for focused first batches. Launch with a manageable quantity, learn what customers like, and refine scent, packaging, or pricing before scaling. ' +
          COMMERCIAL_COPY.startingPathDetail,
        bullets: sectionBullets(
          'Sample scents before locking in production',
          'Approve a production sample before the full batch',
          'Launch with a quantity you can sell through confidently',
          'Use early sales data to plan repeat orders',
        ),
        Illustration: StartSmallValidateDemandImage,
      },
      {
        id: 'common-mistakes',
        title: 'Common mistakes to avoid',
        description:
          'New fragrance launches go wrong when brands skip sampling, over-customize before validating demand, or choose packaging that does not match their price point. A sample-first, start-small approach reduces these risks.',
        bullets: sectionBullets(
          'Skipping scent samples before bulk production',
          'Launching too many scents or formats at once',
          'Choosing packaging that overshoots your price tier',
          'Not defining your customer before scent selection',
        ),
        Illustration: CommonMistakesToAvoidImage,
      },
    ],
    'PERFUME LINE',
  ),
  faq: {
    id: 'start-perfume-line-faq',
    eyebrow: 'FAQ',
    title: 'Starting a perfume line questions',
    description:
      'Common questions about why brands add private label perfume and how to plan your first launch with Brandsamor.',
    items: START_PERFUME_LINE_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'NEXT STEP',
    title: 'Start Planning',
    description:
      'Ready to explore a branded fragrance for your business? Complete the sampling brief about your business and customers, evaluate your curated sample kit, and map out bottle and packaging choices for a focused first launch.',
    Illustration: StartSmallValidateDemandCtaImage,
  },
  relatedLinks: {
    links: [
      { to: '/how-it-works', label: 'See the full private-label launch process' },
      { to: '/fragrance-products', label: 'Compare the fragrance formats you can launch' },
      { to: '/fragrance-sampling', label: 'Learn why brands sample before production' },
      { to: '/knowledge-base/perfume-brand-startup-cost', label: 'Understand perfume business startup costs' },
      { to: '/knowledge-base/private-label-vs-white-label-vs-custom-perfume', label: 'Compare private label vs white label perfume' },
      { to: '/private-label-perfume-manufacturer-usa', label: 'Private label perfume manufacturer USA' },
    ],
  },
};
