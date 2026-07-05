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
        id: 'how-scent-library-works',
        title: 'How the scent library works',
        description: `${COMMERCIAL_COPY.scentLibrarySummary} ${COMMERCIAL_COPY.sampleDispatch}`,
        bullets: sectionBullets(
          'Access a curated library of launch-ready fragrances',
          'Work with our team to compare scent directions for your brand',
          'Order individual samples without committing to bulk production',
          'Move from exploration to selection at your own pace',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'fragrance-families',
        title: 'Fragrance families available',
        description:
          'Scents are grouped into familiar families — floral, woody, fresh, oriental, and more — so you can narrow the library to directions that fit your customer and brand positioning.',
        bullets: sectionBullets(
          'Explore floral, woody, fresh, and oriental directions',
          'Filter by mood, season, and customer preference',
          'Compare families side by side with physical samples',
          'Find a starting point even if you are new to fragrance',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'choosing-scents-for-customer',
        title: 'Choosing scents for your customer',
        description:
          'The right scent depends on who you sell to and how they will use it. Consider your audience, price point, brand style, and whether the fragrance is for daily wear, gifting, or a specific occasion.',
        bullets: sectionBullets(
          'Match scent character to your target customer',
          'Consider gender positioning, age, and lifestyle cues',
          'Think about where the product will be worn or gifted',
          'Align fragrance intensity with your planned price point',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'sampling-package-includes',
        title: 'What the sampling package includes',
        description:
          'Each sampling order is prepared so you can compare fragrances meaningfully — with enough product to test on skin, share with your team, and evaluate over a few days rather than a single sniff.',
        bullets: sectionBullets(
          'Sample vials sized for real wear testing',
          'Clear labeling so you can track each fragrance',
          'Packaged for safe delivery to your location',
          'Enough volume to share with stakeholders or test customers',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'choosing-up-to-five',
        title: 'Choosing up to five fragrances',
        description:
          'Most brands start by selecting up to five scent directions to compare. This keeps the decision focused while giving you enough variety to find a clear winner for your launch.',
        bullets: sectionBullets(
          'Start with a focused set of up to five samples',
          'Pick scents across one family or a small range of styles',
          'Avoid ordering too many directions at once',
          'Narrow quickly to two or three finalists for deeper testing',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'extra-samples',
        title: 'Adding extra fragrance samples',
        description:
          'If your first round of samples raises new questions — a lighter alternative, a bolder option, or a different family — you can add extra samples before moving to bottle and packaging decisions.',
        bullets: sectionBullets(
          'Order additional samples beyond your initial set',
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
      'Answers to common questions about ordering samples, using the scent library, and choosing your launch fragrance.',
    items: FRAGRANCE_SAMPLING_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'GET STARTED',
    title: 'Build Your Sample Kit',
    description:
      COMMERCIAL_COPY.sampleOrderPath,
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
