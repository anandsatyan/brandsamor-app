import type { TopicPageConfig } from '../components/topic/types';
import {
  BrandBriefIllustration,
  FragranceFamilyIllustration,
  PackagingIllustration,
  ProcessTimelineIllustration,
  ScentSamplesIllustration,
} from '../components/Illustrations';
import { CUSTOM_PERFUME_MANUFACTURER_FAQ_ITEMS } from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/custom-perfume-manufacturer');

export const customPerfumeManufacturerConfig: TopicPageConfig = {
  seo: pageMeta.seo,
  hero: {
    badge: 'CUSTOM FRAGRANCE',
    title: pageMeta.h1,
    description:
      'Custom perfume manufacturing can mean different things — from selecting a library scent with your packaging to developing a more bespoke fragrance direction. Brandsamor helps brands understand which path fits their timeline, budget and differentiation goals, then coordinates production through qualified partners.',
    Illustration: FragranceFamilyIllustration,
  },
  sections: withSteps(
    [
      {
        id: 'three-models',
        title: 'Private label, white label and custom fragrance',
        description:
          'Most brands launching with Brandsamor begin with private label: choosing a scent from a curated library, then customizing bottle, cap, label and box. White label usually means less scent and packaging choice. Custom fragrance development is a longer path with more creative input and testing. Compare models in our [private label vs white label guide](/knowledge-base/private-label-vs-white-label-vs-custom-perfume).',
        bullets: sectionBullets(
          'Private label — library scent plus branded packaging',
          'White label — faster path with fewer choices',
          'Custom development — more formula work and longer timelines',
          'Choose based on differentiation needs, not buzzwords',
        ),
        Illustration: ProcessTimelineIllustration,
      },
      {
        id: 'custom-direction',
        title: 'Custom fragrance direction',
        description:
          'When brands ask for a custom perfume manufacturer, they often want a signature scent that feels distinct. That may start with brief writing, reference scents and iterative sampling. Full bespoke perfumery depends on project scope, documentation requirements and production partner capability — it is not the default path for every launch.',
        bullets: sectionBullets(
          'Define mood, audience and reference scents in a brief',
          'Evaluate samples on blotter and skin over time',
          'Plan extra rounds if you need a more unique direction',
          'Confirm feasibility before packaging and MOQ decisions',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'packaging-custom',
        title: 'Packaging for a custom-positioned product',
        description:
          'Even when the scent comes from a library, packaging choices make the product feel custom. Bottle shape, cap finish, label design, screen printing and gift boxes shape perceived value. Explore [custom perfume packaging](/packaging-branding) options in detail.',
        bullets: sectionBullets(
          'Match bottle and box quality to your retail price',
          'Use decoration to differentiate within a library scent',
          'Approve a production sample before bulk decoration',
          'Plan packaging upgrades on repeat orders',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'production-coordination',
        title: 'Production coordination',
        description:
          'Brandsamor coordinates filling, closure application, branding, inspection and packing through qualified specialist partners — without implying that every step happens in one owned facility. Review the [perfume manufacturing process](/how-your-batch-is-made) and [how it works](/how-it-works) for the full sequence.',
        bullets: sectionBullets(
          'Approved specification before bulk production',
          'Production-sample sign-off before batch release',
          'Quality checks at defined production stages',
          'Documentation support where applicable to the project',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'when-custom-fits',
        title: 'When custom development may fit',
        description:
          'Custom fragrance work may suit established brands investing in a signature scent identity, luxury positioning or a clearly differentiated story. New brands often validate demand with a focused private label launch first. Read more in our [custom fragrance development guide](/knowledge-base/custom-fragrance-development).',
        bullets: sectionBullets(
          'Strong brand story that depends on a unique scent',
          'Budget and timeline for additional development rounds',
          'Willingness to test stability and compliance implications',
          'Clear plan for how the scent supports margin and repeat sales',
        ),
        Illustration: FragranceFamilyIllustration,
      },
    ],
    'CUSTOM PATH',
  ),
  faq: {
    id: 'custom-perfume-faq',
    eyebrow: 'FAQ',
    title: 'Custom perfume manufacturing questions',
    description:
      'Common questions about custom, private label and white label fragrance paths with Brandsamor.',
    items: CUSTOM_PERFUME_MANUFACTURER_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'START WITH CLARITY',
    title: 'Choose the right manufacturing path',
    description:
      'The practical first step is sampling. Compare scent directions, discuss packaging goals and confirm which launch model fits before committing to production.',
    Illustration: ScentSamplesIllustration,
  },
  relatedLinks: {
    links: [
      { to: '/fragrance-sampling', label: 'Order private label perfume samples' },
      { to: '/start-a-perfume-line', label: 'Learn how to start a perfume line' },
      { to: '/private-label-perfume-manufacturer-usa', label: 'Private label perfume manufacturer USA' },
      { to: '/knowledge-base/private-label-vs-white-label-vs-custom-perfume', label: 'Private label vs white label perfume' },
    ],
  },
};
