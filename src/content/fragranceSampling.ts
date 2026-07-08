import type { TopicPageConfig } from '../components/topic/types';
import {
  ApprovalIllustration,
  BrandBriefIllustration,
  FlatLayIllustration,
  FragranceFamilyIllustration,
  ProcessTimelineIllustration,
  ScentSamplesIllustration,
} from '../components/Illustrations';
import { COMMERCIAL_COPY } from '../seo/businessFacts';
import { FRAGRANCE_SAMPLING_FAQ_ITEMS } from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/fragrance-sampling');

export const fragranceSamplingConfig: TopicPageConfig = {
  navKey: 'fragrance-sampling',
  seo: pageMeta.seo,
  hero: {
    badge: 'FRAGRANCE SAMPLING',
    title: pageMeta.h1,
    description:
      'Private label perfume samples help you compare fragrances and choose the right scents for your brand before production begins. ' +
      COMMERCIAL_COPY.sampleOrderPath +
      ' ' +
      COMMERCIAL_COPY.sampleDispatch +
      ' ' +
      COMMERCIAL_COPY.sampleDeliveryNote,
    Illustration: ScentSamplesIllustration,
  },
  sections: withSteps(
    [
      {
        id: 'how-curated-sampling-works',
        title: 'How curated sampling works',
        description: `${COMMERCIAL_COPY.scentLibrarySummary} ${COMMERCIAL_COPY.sampleDispatch}`,
        bullets: sectionBullets(
          'Answer a short brief about your business and customers',
          'We curate five fragrances matched to your brand and audience',
          'Receive a sample kit packed and shipped to your location',
          'Evaluate on skin before committing to bulk production',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'what-we-ask-about-your-business',
        title: 'What we ask about your business',
        description:
          'The sampling brief covers your brand, your customers, and how you plan to sell fragrance. These questions help us understand who your product is for — not just what scents you personally like.',
        bullets: sectionBullets(
          'Your business type, brand stage, and positioning',
          'Who your customers are — demographics, lifestyle, and preferences',
          'How customers will discover, wear, or gift your fragrance',
          'Your price point, channel, and launch goals',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'how-we-curate-five-fragrances',
        title: 'How we curate your five fragrances',
        description:
          'From your brief, we match scent families, intensity, and character to your brand and customer profile. You receive five focused directions — enough variety to compare meaningfully without overwhelming your decision.',
        bullets: sectionBullets(
          'Scent families and moods aligned with your customer',
          'Intensity and wearability matched to your price point',
          'Directions that fit your brand personality and use case',
          'Exclusions respected so we avoid the wrong directions',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'sampling-package-includes',
        title: 'What the sampling package includes',
        description:
          'Each curated sample kit is prepared so you can compare fragrances meaningfully — with enough product to test on skin, share with your team, and evaluate over a few days rather than a single sniff.',
        bullets: sectionBullets(
          'Five sample vials sized for real wear testing',
          'Clear labeling so you can track each fragrance',
          'Packaged for safe delivery to your location',
          'Enough volume to share with stakeholders or test customers',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'evaluate-samples',
        title: 'How to evaluate the samples',
        description:
          'Give each sample time on skin — top notes fade quickly, while the heart and base reveal how the fragrance wears through the day. Share options with your team or a small test group for broader feedback.',
        bullets: sectionBullets(
          'Wear samples on skin, not just paper blotters',
          'Test over several hours to understand longevity',
          'Gather feedback from team members or trusted customers',
          'Note which scents feel most aligned with your brand story',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'choosing-launch-fragrance',
        title: 'Choosing your launch fragrance',
        description:
          'Most brands narrow the five curated samples to one hero scent or a small launch set of two or three. Your brief gave us the starting direction — your wear testing confirms which fragrance your customers will respond to.',
        bullets: sectionBullets(
          'Compare all five directions before narrowing',
          'Pick one hero scent or a focused launch set',
          'Consider customer feedback alongside your own preference',
          'Confirm your choice before bottle and packaging decisions',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'extra-samples',
        title: 'Adding extra fragrance samples',
        description:
          'If your first curated set raises new questions — a lighter alternative, a bolder option, or a different family — you can request additional samples before moving to bottle and packaging decisions.',
        bullets: sectionBullets(
          'Order additional samples beyond your initial curated set',
          'Explore adjacent directions once you know what you like',
          'Test seasonal or limited-edition concepts before launch',
          'Keep sampling costs low compared to a wrong bulk order',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'bottle-box-samples',
        title: 'Bottle and box samples',
        description:
          'After you narrow your scent, you can review how it looks in bottle and packaging context. Bottle and box samples help you see the full product vision before approving production.',
        bullets: sectionBullets(
          'See your chosen scent in a real bottle format',
          'Preview label placement and packaging proportions',
          'Confirm the product feels right in hand and on shelf',
          'Align scent choice with your bottle and box direction',
        ),
        Illustration: FlatLayIllustration,
      },
      {
        id: 'approving-fragrances',
        title: 'Approving your selected fragrances',
        description:
          'Once you have a clear favorite — or a small launch set of two or three scents — sign off on your selection so Brandsamor can move into bottle, cap, label, and packaging customization.',
        bullets: sectionBullets(
          'Confirm your hero scent or small launch collection',
          'Document your selection for production reference',
          'Move into bottle and packaging choices with confidence',
          'Request adjustments if a sample needs fine-tuning before bulk',
        ),
        Illustration: ApprovalIllustration,
      },
      {
        id: 'after-approval',
        title: 'What happens after approval',
        description:
          'After you approve your fragrance selection, the launch path continues through bottle and packaging customization, production sample review, filling, quality checks, and delivery of your ready-to-sell batch. See [how it works](/how-it-works), explore [fragrance products](/fragrance-products), or [start planning your line](/start-a-perfume-line).',
        bullets: sectionBullets(
          'Customize bottle, cap, label, and packaging',
          'Review and approve a production sample',
          'Move into filling, finishing, and quality checks',
          'Receive finished perfumes ready to sell under your brand',
        ),
        Illustration: ProcessTimelineIllustration,
      },
    ],
    'SAMPLING',
  ),
  faq: {
    id: 'fragrance-sampling-faq',
    eyebrow: 'FAQ',
    title: 'Fragrance sampling questions',
    description:
      'Answers to common questions about the curated sampling brief, receiving your sample kit, and choosing your launch fragrance.',
    items: FRAGRANCE_SAMPLING_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'GET STARTED',
    title: 'Build Your Sample Kit',
    description: COMMERCIAL_COPY.sampleOrderPath,
    Illustration: ScentSamplesIllustration,
  },
  relatedLinks: {
    links: [
      { to: '/how-it-works', label: 'See the full private-label launch process' },
      { to: '/fragrance-products', label: 'Compare fragrance product formats' },
      { to: '/start-a-perfume-line', label: 'Start planning your perfume line' },
    ],
  },
};
