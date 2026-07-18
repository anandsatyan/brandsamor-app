import { Link } from 'react-router-dom';
import type { TopicPageConfig } from '../components/topic/types';
import {
  CREATE_A_SCENT_CTA_LABEL,
  CREATE_A_SCENT_STUDIO_PATH,
  CURATED_SAMPLING_PATH,
  LEAD_FORM_PATH,
} from '../routes/leadForm';
import { CREATE_A_SCENT_FAQ_ITEMS } from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/create-a-scent');

const StudioCtaActions = ({
  variant = 'primary',
}: {
  variant?: 'primary' | 'hero' | 'dark';
}) => {
  const primaryClass =
    variant === 'hero' ? 'btn-hero-cta' : variant === 'dark' ? 'btn-hero-cta' : 'btn-primary';
  const secondaryClass =
    variant === 'hero' || variant === 'dark'
      ? 'inline-flex items-center px-5 py-3 font-semibold uppercase tracking-wider text-white/90 underline-offset-4 hover:underline'
      : 'inline-flex items-center px-5 py-3 font-semibold uppercase tracking-wider text-heading underline-offset-4 hover:underline';

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      <Link
        to={CREATE_A_SCENT_STUDIO_PATH}
        className={`inline-flex items-center px-5 py-3 font-semibold uppercase tracking-wider transition-opacity hover:opacity-90 ${primaryClass}`}
      >
        {CREATE_A_SCENT_CTA_LABEL}
      </Link>
      <Link to={LEAD_FORM_PATH} className={secondaryClass}>
        Talk to Brandsamor
      </Link>
    </div>
  );
};

export const createAScentConfig: TopicPageConfig = {
  seo: pageMeta.seo,
  hero: {
    badge: 'FOR BRANDS',
    title: pageMeta.h1,
    description:
      'Build a custom brand fragrance through a guided conversation — not a consumer quiz. Start from a reference perfume your team already likes, or describe a new direction from scratch. Refine notes, mood, and performance until the brief is ready for sampling review.',
    actions: <StudioCtaActions variant="hero" />,
  },
  keyFacts: {
    title: 'Built for brand fragrance decisions',
    description:
      'Create a Scent helps product, brand, and founding teams align on olfactory direction before physical compounding.',
    facts: [
      {
        label: 'Who it is for',
        value: 'Brands launching or refining a private label fragrance',
      },
      {
        label: 'Starting point',
        value: 'Known reference fragrance or a blank-slate brand brief',
      },
      {
        label: 'Output',
        value: 'Versioned scent direction + sampling development brief',
      },
      {
        label: 'Next step',
        value: 'Physical sampling review by the Brandsamor team',
      },
    ],
  },
  answerBlocks: [
    {
      question: 'What is conversational fragrance development for brands?',
      answer:
        'It is a brand-facing way to define a custom scent direction in plain language. Your team describes customers, occasions, references, and constraints; Brandsamor turns that into a structured pyramid and performance brief ready for sampling review — without forcing a long questionnaire.',
    },
    {
      question: 'Is this the same as picking from a fragrance library?',
      answer:
        'No. Curated sampling matches your brand to five library fragrances for wear testing. Create a Scent is for teams that need a more bespoke direction — iterating on references, exclusions, and brand mood until the brief is clear enough to sample.',
    },
  ],
  trustBar: {
    title: 'Clear boundaries for brand teams',
    description:
      'The studio is designed for commercial fragrance development, with honest limits on what AI can and cannot decide.',
    badges: [
      { label: 'Brand briefs, not personal perfume quizzes' },
      { label: 'Reference fragrances as starting points only' },
      { label: 'Human review before physical compounding' },
      { label: 'No promised copy of proprietary formulas' },
    ],
  },
  sections: withSteps(
    [
      {
        id: 'built-for-brand-teams',
        title: 'Designed for brand and product teams',
        description:
          'Create a Scent assumes you are making a commercial fragrance decision: positioning, customer fit, retail or hospitality use, and launch constraints. The conversation captures brand language your team already uses — not a list of personal favorites alone.',
        bullets: sectionBullets(
          'Frame the brief around your customer and channel, not only personal taste',
          'Capture exclusions that matter commercially (allergens, “too soapy,” dessert sweetness, and more)',
          'Keep stakeholders aligned with a living scent card they can review',
          'Submit one clear direction for Brandsamor sampling review',
        ),
      },
      {
        id: 'two-starting-paths',
        title: 'Start from a reference — or from scratch',
        description:
          'Many brands begin with a perfume their customers already recognize, then change what does not fit. Others describe a place, mood, or brand personality with no single reference. Both paths are supported in the same conversation.',
        bullets: sectionBullets(
          'Name a reference fragrance and say what to keep or change',
          'Or describe mood, climate, customer, and avoided effects from a blank slate',
          'Ambiguous matches are confirmed before the brief locks a wrong reference',
          'Unknown references stay unverified rather than inventing a fake note pyramid',
        ),
      },
      {
        id: 'refine-by-talking',
        title: 'Refine the direction by talking',
        description:
          'Add, remove, soften, strengthen, or lock parts of the scent without restarting a form. The studio preserves settled decisions when you only asked to change one element — the same way a fragrance consultant would.',
        bullets: sectionBullets(
          'Change one quality at a time: less soapy, more woody, warmer dry-down',
          'Lock notes or effects your brand must keep',
          'Clarify ambiguous words like “fresh,” “luxury,” or “strong” only when needed',
          'See the compact scent card update instead of re-reading a full pyramid in chat',
        ),
      },
      {
        id: 'what-your-brand-approves',
        title: 'What your brand approves',
        description:
          'You approve a sampling direction: concept, family, descriptors, pyramid, performance intent, and restrictions. That brief becomes the handoff for physical development — not an automatic claim of a finished, compliant, production perfume.',
        bullets: sectionBullets(
          'Working name and one-sentence brand concept',
          'Top, heart, and base direction for evaluation',
          'Performance intent (projection, wear, concentration direction)',
          'Requested and avoided notes for the development team',
        ),
      },
      {
        id: 'sampling-handoff',
        title: 'From conversation to sampling review',
        description:
          'When the direction is clear, prepare it for sampling. Brandsamor receives a structured requirements-style brief with your contact details and scent direction so the team can review formulation next steps.',
        bullets: sectionBullets(
          'Submit brand contact and project context in the same flow',
          'Receive confirmation that the brief reached the development team',
          'Expect human review before any experimental formula is weighed',
          'Continue into bottle and packaging once the scent path is confirmed',
        ),
      },
      {
        id: 'when-to-use-curated-sampling',
        title: 'When curated sampling is the faster path',
        description:
          `If your brand mainly needs to compare proven library directions on skin, start with [fragrance sampling](${CURATED_SAMPLING_PATH}). Create a Scent is the better fit when you need iterative custom direction beyond a library pick.`,
        bullets: sectionBullets(
          'Use curated sampling for five matched library fragrances and a sample kit',
          'Use Create a Scent for conversational custom direction and a development brief',
          'Both paths can lead into packaging, production samples, and a branded launch',
          'Ask Brandsamor if you are unsure which path fits your timeline',
        ),
      },
    ],
    'CREATE',
  ),
  faq: {
    id: 'create-a-scent-faq',
    eyebrow: 'FAQ',
    title: 'Custom fragrance development questions',
    description:
      'Answers for brand teams evaluating conversational fragrance development versus library sampling.',
    items: CREATE_A_SCENT_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'START YOUR BRIEF',
    title: 'Open the Scent Studio',
    description:
      'Begin a brand fragrance conversation, refine the direction with your team, and send a sampling brief when you are ready for Brandsamor review.',
    actions: <StudioCtaActions variant="dark" />,
    footerText: 'Built for commercial fragrance projects — not personal perfume recommendations.',
  },
  relatedLinks: {
    title: 'Related brand resources',
    links: [
      { to: '/fragrance-sampling', label: 'Curated private label perfume samples' },
      { to: '/custom-perfume-manufacturer', label: 'Custom perfume manufacturing overview' },
      { to: '/knowledge-base/how-to-write-fragrance-brief', label: 'How to write a fragrance brief' },
      { to: '/start-a-perfume-line', label: 'How to start a perfume line' },
      { to: '/how-it-works', label: 'Full private label launch process' },
    ],
  },
};
