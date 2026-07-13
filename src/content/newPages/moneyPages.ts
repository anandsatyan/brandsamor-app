import {
  buildCommercialPage,
  faq,
  sectionBullets,
  defaultKeyFacts,
  BUSINESS_FACTS,
} from './buildCommercialPage';
import type { TopicPageConfig } from '../../components/topic/types';

const PACKAMOR_OPERATOR =
  'Packamor LLC is the parent entity of Brandsamor, based at 1111B S Governors Ave, Dover, DE 19904.';

const QUALITY_DOCUMENTATION_SENTENCE =
  '[Quality and compliance](/quality-compliance) covers available IFRA, COA, GMP, ISO 22716, MoCRA and halal certification support.';

const certificationSummary = BUSINESS_FACTS.certifications.join(', ');

const moneyPageRelatedLinks = [
  { to: '/fragrance-sampling', label: 'Fragrance sampling' },
  { to: '/packaging-branding', label: 'Packaging and branding' },
  { to: '/quality-compliance', label: 'Quality and compliance' },
  { to: '/start-a-perfume-line', label: 'Start a perfume line' },
];

const whiteLabelComparison = {
  id: 'white-label-vs-private-label-vs-custom-oem',
  title: 'White label vs private label vs custom OEM perfume',
  description:
    'The fastest route is usually white label or a guided private label path. Custom OEM can give more control, but every new decision can add cost, approvals and lead time.',
  columns: [
    { key: 'whiteLabel', label: 'White label' },
    { key: 'privateLabel', label: 'Private label' },
    { key: 'customOem', label: 'Custom OEM' },
  ],
  rows: [
    {
      label: 'Scent',
      values: {
        whiteLabel: 'Select from an existing scent library or a narrow set of ready options.',
        privateLabel: 'Sample scents matched to your buyer, channel and brand brief.',
        customOem: 'Develop a new scent direction from a deeper creative and technical brief.',
      },
    },
    {
      label: 'Formula ownership',
      values: {
        whiteLabel: 'Supplier formula; your brand sells the finished product.',
        privateLabel: 'Supplier-supported formula with brand-specific positioning and packaging.',
        customOem: 'Formula ownership terms need to be agreed before development starts.',
      },
    },
    {
      label: 'Packaging',
      values: {
        whiteLabel: 'Stock bottle, cap, spray and label choices keep the scope tight.',
        privateLabel: 'Branded bottle, label, carton and decoration choices within practical limits.',
        customOem: 'Custom molds, special decoration or structural packaging may be possible.',
      },
    },
    {
      label: 'Typical MOQ',
      values: {
        whiteLabel: '100 units through the Brandsamor low-MOQ path.',
        privateLabel: '100 units through Brandsamor, depending on format and packaging.',
        customOem: 'Often higher because development, materials and tooling need more commitment.',
      },
    },
    {
      label: 'Lead time',
      values: {
        whiteLabel: 'Samples dispatch in 2-3 days; production is typically 3-6 weeks after approvals.',
        privateLabel: 'Typically 3-6 weeks after fragrance, artwork, packaging and production approvals.',
        customOem: 'Longer when new formula work, stability review or special packaging is required.',
      },
    },
    {
      label: 'Cost per unit',
      values: {
        whiteLabel: 'Entry projects can start from $10 per unit.',
        privateLabel: 'Indicative pricing starts from $10 per unit; format and packaging shape the quote.',
        customOem: 'Usually higher because more development, testing and custom components are involved.',
      },
    },
    {
      label: 'Best for',
      values: {
        whiteLabel: 'Fast tests, boutique add-ons, creator drops and simple branded goods.',
        privateLabel: 'Brands that want a more deliberate scent and packaging story.',
        customOem: 'Teams that can fund longer development and need a highly specific product.',
      },
    },
  ],
  caption: 'Comparison of white label, private label and custom OEM perfume launch models.',
};

const pricingComparison = {
  id: 'private-label-perfume-pricing-drivers',
  title: 'What changes private label perfume pricing?',
  description:
    'A useful quote is built from format, bottle, closure, decoration, packaging, quantity and destination. The table shows the decisions that usually move cost, without pretending every SKU lands at the entry price.',
  columns: [
    { key: 'lowerCost', label: 'Lower-cost direction' },
    { key: 'higherCost', label: 'Higher-cost direction' },
    { key: 'planningNote', label: 'Planning note' },
  ],
  rows: [
    {
      label: 'Format',
      values: {
        lowerCost: 'A straightforward fragrance format in a practical fill size.',
        higherCost: 'Oil, EDP, mist, travel, room or gift formats with more handling or parts.',
        planningNote: 'Choose the format around channel, margin and customer use, not only unit price.',
      },
    },
    {
      label: 'Bottle and closure',
      values: {
        lowerCost: 'Stock bottle, stock cap and standard spray pump.',
        higherCost: 'Heavier glass, specialty cap, unusual actuator or less common bottle shape.',
        planningNote: 'Bottle decisions affect unit cost, freight weight, shelf presence and reorder speed.',
      },
    },
    {
      label: 'Decoration',
      values: {
        lowerCost: 'Label-first branding with disciplined artwork.',
        higherCost: 'Screen printing, coating, metallic effects or multi-step decoration.',
        planningNote: 'Decoration should support the retail price, not just photograph well.',
      },
    },
    {
      label: 'Secondary packaging',
      values: {
        lowerCost: 'Simple carton or no outer box where the channel allows it.',
        higherCost: 'Rigid box, inserts, gift-ready presentation or multi-piece sets.',
        planningNote: 'Packaging can raise perceived value, but it is also a common margin leak.',
      },
    },
    {
      label: 'Quantity',
      values: {
        lowerCost: 'Start with the batch size your channel can realistically sell.',
        higherCost: 'Larger runs can improve component efficiency but tie up more cash.',
        planningNote: 'Use first-batch data before chasing volume savings.',
      },
    },
    {
      label: 'Documentation',
      values: {
        lowerCost: 'Standard project documentation matched to product and market.',
        higherCost: 'Additional certificates or market-specific documentation support where required.',
        planningNote: `Available support includes ${certificationSummary}; exact needs depend on product, claims and destination.`,
      },
    },
  ],
  caption: 'Private label perfume pricing drivers by format, packaging, decoration, quantity and documentation.',
};

const manufacturerComparison = {
  id: 'manufacturer-model-comparison',
  title: 'Private label perfume manufacturer types compared',
  description:
    'There is no single best manufacturer for every fragrance business. The right choice depends on launch size, internal experience, compliance needs, budget and how much supplier management you want to own.',
  columns: [
    { key: 'fit', label: 'Best fit' },
    { key: 'tradeoff', label: 'Main trade-off' },
    { key: 'chooseWhen', label: 'Choose when' },
  ],
  rows: [
    {
      label: 'Brandsamor',
      values: {
        fit: 'Low-MOQ private label launches, sample-led validation and founders who need packaging support.',
        tradeoff: 'Not the best fit for every custom R&D brief or enterprise procurement process.',
        chooseWhen: 'You want a guided first production path without ordering thousands of units.',
      },
    },
    {
      label: 'US contract houses',
      values: {
        fit: 'Established US brands that need domestic communication, formal controls and repeatable scale.',
        tradeoff: 'Many have higher MOQs, slower onboarding or less flexibility for small first launches.',
        chooseWhen: 'You already have demand, budget and a clear operations process.',
      },
    },
    {
      label: 'China OEM marketplaces',
      values: {
        fit: 'Cost-led sourcing teams that can vet suppliers, manage samples and inspect production details.',
        tradeoff: 'Quality, communication, documentation and packaging consistency vary widely by supplier.',
        chooseWhen: 'You have sourcing experience and are comfortable carrying more buyer-side risk.',
      },
    },
    {
      label: 'EU niche labs',
      values: {
        fit: 'Premium fragrance brands that prioritize perfumer-led development and European market context.',
        tradeoff: 'Custom development can be expensive, slower and harder to justify for small tests.',
        chooseWhen: 'Your budget supports deeper creative work and longer development timelines.',
      },
    },
    {
      label: 'Regional GCC fillers',
      values: {
        fit: 'Oud, attar and Gulf-focused fragrance businesses with local packaging and distribution needs.',
        tradeoff: 'Capabilities, documentation support and export readiness vary by filler.',
        chooseWhen: 'Your market is strongly regional and you can verify local compliance requirements.',
      },
    },
  ],
  caption: 'Comparison of Brandsamor, US contract houses, China OEM marketplaces, EU niche labs and regional GCC fillers.',
};

export const moneyPageConfigs: Record<string, TopicPageConfig> = {
  '/white-label-perfume-supplier': buildCommercialPage({
    path: '/white-label-perfume-supplier',
    badge: 'White label perfume supplier',
    heroDescription:
      'Choose white label when the commercial job is simple: put a credible branded fragrance in market quickly, test demand, and avoid a long custom formula project before you know what sells.',
    eyebrowPrefix: 'WHITE LABEL',
    keyFacts: {
      title: 'White label launch facts',
      description:
        'This route suits founders who care more about speed, cost control and a clean first batch than owning every formula detail.',
      facts: defaultKeyFacts({ format: 'White label fragrance' }),
    },
    answerBlocks: [
      {
        id: 'what-is-a-white-label-perfume-supplier',
        question: 'What is a white label perfume supplier?',
        answer:
          'A white label perfume supplier lets you sell an existing or near-ready fragrance under your own brand. You still approve scent, packaging and artwork, but you are not starting with a blank perfumer brief.',
        detail:
          'For a new brand, the benefit is fewer open decisions. You can test the product with real customers before spending heavily on custom development.',
      },
      {
        id: 'is-white-label-right-for-a-first-launch',
        question: 'Is white label right for a first perfume launch?',
        answer:
          'It can be, if speed and simplicity matter more than deep customization. A first order should prove scent preference, packaging response and price tolerance before the brand builds a larger fragrance program.',
        detail:
          'White label is not automatically worse than private label. It is just a narrower tool, and sometimes that is exactly what an early launch needs.',
      },
    ],
    sections: [
      {
        id: 'why-speed-matters',
        title: 'Why does white label perfume move faster?',
        description:
          'Speed comes from closing down choices early. You review [fragrance sampling](/fragrance-sampling), choose a practical bottle system, approve artwork and move into production once the commercial details are clear.',
        bullets: sectionBullets(
          'Use a narrower scent set instead of browsing hundreds of options.',
          'Choose stock components when reorder speed matters.',
          'Keep the first SKU simple enough to learn from customer response.',
        ),
      },
      {
        id: 'cost-control',
        title: 'How do you keep a white label launch cost practical?',
        description:
          'Cost control usually comes from restraint: fewer custom parts, fewer decoration steps and packaging that fits the retail price. The first batch should be good enough to sell confidently, not burdened with every premium option at once.',
        bullets: sectionBullets(
          'Spend on the scent and presentation choices customers will notice.',
          'Use label-first branding before moving into expensive decoration.',
          'Plan the margin before choosing a bottle that looks good only in mockups.',
        ),
      },
      {
        id: 'white-label-vs-private-label',
        title: 'Should you choose white label or private label perfume?',
        description:
          'Choose white label when you mainly need a branded product fast. Choose private label when the scent, packaging story and range architecture need more thought. The [private label vs white label perfume](/private-label-vs-white-label-perfume) decision is about risk, not status.',
        bullets: sectionBullets(
          'White label fits creator drops, boutique add-ons, gifting and simple product tests.',
          'Private label fits brands building fragrance as a repeatable category.',
          'Custom OEM fits teams that can fund longer development and deeper testing.',
        ),
      },
      {
        id: 'documentation-and-approvals',
        title: 'What documentation can support a white label perfume order?',
        description: `${QUALITY_DOCUMENTATION_SENTENCE} For white label orders, confirm what your retailer, marketplace or destination market expects before final artwork is approved.`,
        bullets: sectionBullets(
          'Ask for the documents tied to the actual product and market.',
          'Keep claim language specific instead of using broad approval wording.',
          'Make documentation part of the brief, not a last-minute request.',
        ),
      },
      {
        id: 'first-batch-plan',
        title: 'What should your first white label batch include?',
        description:
          'A useful first batch has one clear job. Decide the scent, fill size, selling price, packaging tier, channel plan, reorder trigger and delivery needs before production starts. If you are selling online, photography and shipping weight matter. If you are selling in a boutique, shelf clarity may matter more.',
        bullets: sectionBullets(
          'Pick one hero scent before adding flankers or sets.',
          'Match packaging to the channel where the first units will sell.',
          'Keep reorder notes from the start so the second run is easier.',
        ),
      },
    ],
    comparison: whiteLabelComparison,
    faqTitle: 'White label perfume supplier FAQ',
    faqDescription:
      'Practical answers for founders comparing white label, private label and custom perfume production.',
    faqItems: [
      faq(
        'What is the MOQ for white label perfume with Brandsamor?',
        'Brandsamor production starts at 100 units. Sampling happens before production, so you can evaluate fragrance direction before approving a batch.',
      ),
      faq(
        'How much does white label perfume cost?',
        'Indicative entry projects start from $10 per unit. Final pricing depends on format, bottle, closure, decoration, packaging, quantity, destination and documentation needs.',
      ),
      faq(
        'How fast can a white label perfume launch?',
        'Available samples normally dispatch in 2-3 days. Production typically takes 3-6 weeks after fragrance, packaging, artwork and production details are approved.',
      ),
      faq(
        'Do I own the fragrance formula in a white label project?',
        'Usually no. White label projects typically use supplier-supported formulas. If formula ownership is a core requirement, discuss custom OEM terms before development begins.',
      ),
      faq(
        'Who operates Brandsamor?',
        PACKAMOR_OPERATOR,
      ),
    ],
    ctaTitle: 'Start with a focused white label perfume brief',
    ctaDescription:
      'Share your customer, sales channel, target price and packaging expectations. We will help decide whether a white label path or a deeper private label path makes better commercial sense.',
    relatedLinks: [
      { to: '/low-moq-perfume-manufacturer', label: 'Low MOQ perfume manufacturer' },
      { to: '/private-label-perfume-pricing', label: 'Private label perfume pricing' },
      { to: '/private-label-vs-white-label-perfume', label: 'Private label vs white label perfume' },
      ...moneyPageRelatedLinks,
    ],
  }),

  '/low-moq-perfume-manufacturer': buildCommercialPage({
    path: '/low-moq-perfume-manufacturer',
    badge: 'Low MOQ perfume manufacturing',
    heroDescription:
      'A low MOQ matters when the real question is not "can we make perfume?" but "can we sell this scent, package and price without tying up too much cash?"',
    eyebrowPrefix: 'LOW MOQ',
    keyFacts: {
      title: 'Low MOQ facts',
      description:
        'Use the low-MOQ path to validate a fragrance line with real finished goods before ordering at scale.',
      facts: defaultKeyFacts({ format: 'Perfume, oils, mists and related formats' }),
    },
    answerBlocks: [
      {
        id: 'what-is-low-moq-perfume-manufacturing',
        question: 'What does low MOQ mean for perfume manufacturing?',
        answer:
          'Low MOQ perfume manufacturing means the first production batch can be smaller than a traditional factory commitment. Brandsamor starts production at 100 units for eligible private label fragrance projects.',
        detail:
          'MOQ affects cash flow, storage, launch risk and learning speed. It is an operating decision, not just a factory line item.',
      },
      {
        id: 'can-i-really-start-at-100-units',
        question: 'Can I really start at 100 units?',
        answer:
          'Yes. The starting production MOQ is 100 units, with the final scope still shaped by format, bottle, decoration, packaging and destination requirements.',
        detail:
          'That number works best with discipline: one strong scent, practical packaging and a clear plan for where the first batch will sell.',
      },
    ],
    sections: [
      {
        id: 'why-100-units-matters',
        title: 'Why is a smaller first batch useful for new perfume brands?',
        description:
          'A smaller batch gives you real market evidence without pretending a forecast is demand. You can see whether customers like the scent, whether the bottle supports the price and whether your channel can move inventory. For broader planning context, see the [perfume MOQ guide](/perfume-moq-guide).',
        bullets: sectionBullets(
          'Protect cash while you learn what customers actually buy.',
          'Adjust scent, packaging or channel before a bigger reorder.',
          'Use finished goods to test photography, reviews, events and retail conversations.',
        ),
      },
      {
        id: 'sample-before-moq',
        title: 'Do samples count toward the MOQ?',
        description:
          'Samples are the decision step before production. Start with a brief, review selected scents, give feedback and approve the production scope only after the product direction is clear.',
        bullets: sectionBullets(
          'Compare scent direction, drydown and audience fit before buying finished units.',
          'Use feedback to narrow the first SKU instead of widening the range too early.',
          'Approve fragrance and packaging before the production clock starts.',
        ),
      },
      {
        id: 'what-affects-low-moq',
        title: 'What can make a low-MOQ project more complex?',
        description:
          'Low MOQ works best when the product is commercially clear. Unusual bottles, special coating, multi-part cartons, gift sets or market-specific documents can add cost and approval steps. That does not make the project wrong; it just needs to be planned before the quote is treated as final.',
        bullets: sectionBullets(
          'Special bottles, coatings or caps can affect component availability.',
          'Outer boxes and inserts add more artwork and approval points.',
          'Destination requirements should be discussed before labels are finalized.',
        ),
      },
      {
        id: 'low-moq-unit-cost',
        title: 'Does a lower MOQ mean the lowest unit cost?',
        description:
          'No. A lower MOQ protects cash and reduces inventory exposure, while larger runs can improve some component economics. The right first order is the one your channel can sell responsibly, with enough margin left for freight, fulfillment and marketing.',
        bullets: sectionBullets(
          'Compare total cash outlay, not only unit price.',
          'Treat the first batch as demand validation.',
          'Reorder after customer response is clearer.',
        ),
      },
      {
        id: 'low-moq-compliance',
        title: 'What documents are available for low-MOQ perfume?',
        description: `${QUALITY_DOCUMENTATION_SENTENCE} For low-MOQ runs, the document request should match the product and market instead of asking for every certificate by default.`,
        bullets: sectionBullets(
          'Discuss documentation needs before production so the quote reflects them.',
          'Keep claims grounded in available support and applicable market rules.',
          'Use quality checks to confirm fill, packaging, labeling and batch details.',
        ),
      },
      {
        id: 'scaling-low-moq',
        title: 'How do you scale after the first batch?',
        description:
          'Scale from evidence: sell-through, customer comments, return reasons and channel feedback. If the first batch moves quickly, the next step may be a reorder, a larger run, a second scent or a packaging upgrade. If demand is mixed, you still learned without carrying a warehouse problem.',
        bullets: sectionBullets(
          'Track which scent notes, packaging details and price points customers mention.',
          'Keep approved artwork and component choices organized.',
          'Scale the winning SKU before expanding into a full collection.',
        ),
      },
    ],
    faqTitle: 'Low MOQ perfume manufacturer FAQ',
    faqDescription: 'Answers about starting production at 100 units and planning the first batch.',
    faqItems: [
      faq(
        'What is the Brandsamor perfume MOQ?',
        'Brandsamor production MOQ starts at 100 units for eligible private label fragrance production.',
      ),
      faq(
        'Can I order samples before the production batch?',
        'Yes. Available samples normally dispatch in 2-3 days, and sampling happens before production approval.',
      ),
      faq(
        'Does 100 units apply to every possible custom request?',
        'Production starts at 100 units, but specific formats, packaging components, decoration choices or destination requirements can affect the final project scope and quote.',
      ),
      faq(
        'What is the production timeline after approval?',
        'Typical production takes 3-6 weeks after fragrance, packaging, artwork and production details have been approved.',
      ),
      faq(
        'What documents can Brandsamor support?',
        `Available support includes ${certificationSummary}. Exact documentation depends on the product, claims, destination and project requirements.`,
      ),
    ],
    ctaTitle: 'Plan a low-MOQ perfume launch',
    ctaDescription:
      'Send your format, audience, price point and channel. We will help shape a first batch that uses the MOQ responsibly.',
    relatedLinks: [
      { to: '/perfume-moq-guide', label: 'Perfume MOQ guide' },
      { to: '/private-label-perfume-pricing', label: 'Private label perfume pricing' },
      { to: '/white-label-perfume-supplier', label: 'White label perfume supplier' },
      ...moneyPageRelatedLinks,
    ],
  }),

  '/contract-perfume-manufacturing': buildCommercialPage({
    path: '/contract-perfume-manufacturing',
    badge: 'Contract perfume manufacturing',
    heroDescription:
      'Contract perfume manufacturing is for brands that need repeatable production planning: clear specifications, filling, packaging, quality checks and documentation coordination across launches and reorders.',
    eyebrowPrefix: 'CONTRACT',
    keyFacts: {
      title: 'Contract manufacturing facts',
      description:
        'Use this route when the work is no longer just picking a scent; it is turning approved specs into dependable finished goods.',
      facts: defaultKeyFacts({ format: 'Contract perfume production' }),
    },
    answerBlocks: [
      {
        id: 'what-is-contract-perfume-manufacturing',
        question: 'What is contract perfume manufacturing?',
        answer:
          'Contract perfume manufacturing is production support for a brand that needs fragrance made, filled, finished and prepared under agreed specifications. It can include selected formulas, existing formulas, packaging coordination, quality checks and production documentation.',
        detail:
          'Compared with a simple launch package, contract manufacturing puts more weight on repeatability, batch records and commercial planning.',
      },
      {
        id: 'who-is-contract-manufacturing-for',
        question: 'Who should use contract perfume manufacturing?',
        answer:
          'It is best for brands with a defined audience, sales channel and reorder plan. The conversation shifts from "what should we make?" to "how do we make this consistently?"',
        detail:
          'New brands can still start with Brandsamor, but this route fits teams already thinking beyond the first test batch.',
      },
    ],
    sections: [
      {
        id: 'scaling-from-first-launch',
        title: 'How does contract manufacturing help a brand scale?',
        description:
          'Scaling fragrance is less about making more bottles and more about repeating the same promise. Scent profile, fill volume, bottle, carton, label placement, batch records and delivery plans need to be specific enough that a reorder does not become a new project every time.',
        bullets: sectionBullets(
          'Translate creative direction into production-ready specifications.',
          'Coordinate bottle, closure, decoration and carton decisions before production.',
          'Plan reorders around sales velocity and component lead times.',
        ),
      },
      {
        id: 'brand-supplied-formula',
        title: 'Can Brandsamor work with an existing formula?',
        description:
          'Some contract projects begin with an existing fragrance formula, concentrate or brand-owned direction. The first step is clarity: what is being supplied, what documentation exists, which format is planned and which packaging must be compatible with the fragrance. Brands with complete formulas may also need [perfume filling services](/perfume-filling-services).',
        bullets: sectionBullets(
          'Share formula status, fragrance concentrate details and documentation early.',
          'Confirm bottle and closure compatibility before production assumptions are made.',
          'Separate formula ownership questions from filling, packaging and logistics needs.',
        ),
      },
      {
        id: 'production-controls',
        title: 'What should be controlled before contract production starts?',
        description:
          'Production should not start until the approved fragrance, fill size, bottle, cap, pump, label, carton, artwork files, pack-out, documentation needs and shipment plan are agreed. Incomplete details are what usually push timelines, not the filling step itself.',
        bullets: sectionBullets(
          'Confirm approved samples and final artwork before production release.',
          'Use a clear component list so reorders can reference the same decisions.',
          'Keep quality expectations specific: fill level, spray test, label alignment and carton finish.',
        ),
      },
      {
        id: 'documentation-for-contract-orders',
        title: 'What documentation is available for contract perfume manufacturing?',
        description: `${QUALITY_DOCUMENTATION_SENTENCE} For contract orders, documentation should be tied to the approved formula, claims and destination market before a repeat program is built around it.`,
        bullets: sectionBullets(
          'Identify the sales market before labels and claims are finalized.',
          'Request IFRA, COA, MoCRA or halal support where relevant to the product.',
          'Avoid broad claims that are not supported by the project documentation.',
        ),
      },
      {
        id: 'commercial-planning',
        title: 'How should established brands plan quantity and cost?',
        description:
          'For an established brand, order quantity should follow sell-through, margin, cash flow, storage and campaign timing. Bigger runs can make sense when demand is known. Smaller runs can still be useful when testing a new SKU or packaging tier.',
        bullets: sectionBullets(
          'Use sales data to decide whether the next run should be the same size or larger.',
          'Build launch calendars around post-approval production timing.',
          'Evaluate packaging upgrades against expected retail price and reorder volume.',
        ),
      },
      {
        id: 'handoff-and-delivery',
        title: 'What happens after contract production is complete?',
        description:
          'Finished perfume still needs inspection, packing and delivery coordination. Ecommerce fulfillment, retail distribution, event inventory and warehouse transfer all have different carton labeling and timing needs. Plan the handoff before the finished units are ready.',
        bullets: sectionBullets(
          'Confirm pack-out requirements before units leave production.',
          'Plan delivery timing around launch dates, retail windows or campaign drops.',
          'Keep reorder notes so successful production details are easy to repeat.',
        ),
      },
    ],
    faqTitle: 'Contract perfume manufacturing FAQ',
    faqDescription:
      'Key planning questions for established brands moving into structured fragrance production.',
    faqItems: [
      faq(
        'Is contract perfume manufacturing only for large brands?',
        'No. Brandsamor production starts at 100 units, but contract manufacturing is most useful when the brand has clear specifications, a sales channel and a reorder plan.',
      ),
      faq(
        'Can Brandsamor fill a formula I already have?',
        'Potentially, depending on formula status, supplied materials, documentation, compatibility and project requirements. Brands with complete formulas should also review the perfume filling services page.',
      ),
      faq(
        'How long does production take?',
        'Typical production is 3-6 weeks after fragrance, packaging, artwork and production details are approved.',
      ),
      faq(
        'What quality checks are part of the process?',
        'Quality checks can include fill level, spray function, packaging appearance, label alignment and batch record review appropriate to the project.',
      ),
      faq(
        'What is the legal business behind Brandsamor?',
        PACKAMOR_OPERATOR,
      ),
    ],
    ctaTitle: 'Build a repeatable perfume production plan',
    ctaDescription:
      'Send your SKU goals, formula status, packaging direction and target order quantity. We will help define the next production-ready step.',
    relatedLinks: [
      { to: '/perfume-filling-services', label: 'Perfume filling services' },
      { to: '/custom-perfume-manufacturer', label: 'Custom perfume manufacturer' },
      { to: '/private-label-perfume-pricing', label: 'Private label perfume pricing' },
      ...moneyPageRelatedLinks,
    ],
  }),

  '/private-label-perfume-oil-manufacturer': buildCommercialPage({
    path: '/private-label-perfume-oil-manufacturer',
    badge: 'Private label perfume oils',
    heroDescription:
      'Perfume oil is a format decision, not just a cheaper spray alternative. It changes application, bottle choice, customer ritual, claims and the way the product is sold.',
    eyebrowPrefix: 'PERFUME OIL',
    keyFacts: {
      title: 'Perfume oil launch facts',
      description:
        'Oil and attar-style products need careful format, bottle and claim decisions, especially for GCC and Muslim-majority markets.',
      facts: defaultKeyFacts({ format: 'Perfume oil and attar-style formats', market: 'GCC and global' }),
    },
    answerBlocks: [
      {
        id: 'what-is-private-label-perfume-oil',
        question: 'What is private label perfume oil manufacturing?',
        answer:
          'Private label perfume oil manufacturing lets a brand sell oil-based fragrance, attar-style products or roll-on formats under its own name. The work can include scent sampling, bottle and applicator choice, branding, filling, quality checks and documentation support.',
        detail:
          'The oil format changes how customers apply fragrance, how packaging feels in hand and how claims should be handled for the destination market.',
      },
      {
        id: 'why-are-perfume-oils-relevant-to-gcc',
        question: 'Why are perfume oils relevant for GCC fragrance brands?',
        answer:
          'Perfume oils and attar-style formats are commercially familiar in many GCC markets because customers already understand concentrated, close-wearing and layering-friendly fragrance rituals.',
        detail:
          'That does not mean every oil should make halal claims or copy traditional Arabic perfume cues. The product still needs its own customer and market logic.',
      },
    ],
    sections: [
      {
        id: 'oil-format-strategy',
        title: 'When should a brand choose perfume oil instead of spray perfume?',
        description:
          'Choose oil when your customer expects close-to-skin wear, layering, compact packaging or an attar-inspired ritual. Choose spray when projection, misting and classic perfume presentation matter more. Compare broader options on the [fragrance products](/fragrance-products) page before locking the format.',
        bullets: sectionBullets(
          'Use oils for intimate wear, layering and compact packaging.',
          'Use sprays when projection and classic presentation matter more.',
          'Let customer ritual and channel expectations drive the format decision.',
        ),
      },
      {
        id: 'gcc-scent-direction',
        title: 'Which scent directions fit GCC and attar-style positioning?',
        description:
          'GCC-relevant oil lines often lean into oud, amber, musk, rose, saffron, vanilla, spice, incense and resinous warmth. A modern oil line can still be fresh, clean or understated. Start with [fragrance sampling](/fragrance-sampling) so the scent direction reflects your buyer, not a generic idea of Arabic perfume.',
        bullets: sectionBullets(
          'Use oud and amber thoughtfully, not as automatic decoration.',
          'Consider layering sets when your audience understands fragrance wardrobes.',
          'Balance regional familiarity with your brand voice and price point.',
        ),
      },
      {
        id: 'oil-packaging',
        title: 'What packaging decisions matter for perfume oil?',
        description:
          'Perfume oil packaging has to match viscosity, application style and brand perception. Roll-ons, dabbers and small glass bottles all communicate something different. Ecommerce needs secure shipping; boutiques need shelf clarity; gifting products need presentation that justifies the price.',
        bullets: sectionBullets(
          'Match applicator style to customer habit and product viscosity.',
          'Keep label information legible on smaller oil bottles.',
          'Use outer packaging when giftability or premium positioning justifies the cost.',
        ),
      },
      {
        id: 'halal-and-documentation',
        title: 'How should halal and documentation be handled?',
        description: `${QUALITY_DOCUMENTATION_SENTENCE} For perfume oils, halal-facing claims depend on formula, carrier, documentation pathway and market rules; do not assume every oil is halal certified.`,
        bullets: sectionBullets(
          'Discuss halal certification support before making label or product page claims.',
          'Confirm which documents your destination market or retailer expects.',
          'Avoid broad compliance language that the specific project cannot support.',
        ),
      },
      {
        id: 'oil-moq-pricing',
        title: 'What changes perfume oil cost?',
        description:
          'Oil projects have their own cost drivers: bottle size, applicator, carrier, fragrance load, decoration and packaging. A first oil batch should be scoped around the channel and reorder plan, not only the lowest possible component cost.',
        bullets: sectionBullets(
          'Model price around fill size, bottle feel and application ritual.',
          'Do not launch too many oils before one hero scent proves demand.',
          'Plan reorders around scent winners rather than a broad opening range.',
        ),
      },
      {
        id: 'oil-production',
        title: 'What happens after a perfume oil is approved?',
        description:
          'After fragrance, packaging, artwork and production details are approved, the work shifts from selection to repeatability: filling, closure, label placement, pack-out, quality review and delivery coordination. For cross-border selling, documentation and shipping expectations should be clarified before release.',
        bullets: sectionBullets(
          'Approve the oil sample and packaging system before production starts.',
          'Confirm label copy, carton artwork and certificate needs early.',
          'Keep production notes for reorders if the first batch sells well.',
        ),
      },
    ],
    faqTitle: 'Private label perfume oil FAQ',
    faqDescription:
      'Answers for brands considering perfume oil, attar-style products and GCC-relevant fragrance lines.',
    faqItems: [
      faq(
        'What is the MOQ for private label perfume oils?',
        'Brandsamor production starts at 100 units. Exact project scope depends on bottle, applicator, decoration, packaging and destination requirements.',
      ),
      faq(
        'Can Brandsamor support attar-style products?',
        'Yes, Brandsamor can support attar-style and perfume oil formats, including scent directions relevant to GCC and oil-first fragrance customers.',
      ),
      faq(
        'Are perfume oils automatically halal certified?',
        'No. Halal certification support is available where required, but claims depend on the formula, documentation, certification pathway and destination requirements.',
      ),
      faq(
        'How quickly are perfume oil samples dispatched?',
        'Available samples normally dispatch in 2-3 days. Delivery timing depends on destination and shipping service.',
      ),
      faq(
        'Can I sell perfume oil outside the GCC?',
        'Yes, perfume oils can be planned for global customers, subject to destination, product, logistics and compliance requirements.',
      ),
    ],
    ctaTitle: 'Create a private label perfume oil line',
    ctaDescription:
      'Tell us your customer, scent direction, market and preferred oil format. We will help shape a practical path for the first production batch.',
    areaServed: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Worldwide'],
    relatedLinks: [
      { to: '/private-label-attar-manufacturer', label: 'Private label attar manufacturer' },
      { to: '/arabic-perfume-manufacturer', label: 'Arabic perfume manufacturer' },
      { to: '/halal-perfume-manufacturer', label: 'Halal perfume manufacturer' },
      ...moneyPageRelatedLinks,
    ],
  }),

  '/perfume-filling-services': buildCommercialPage({
    path: '/perfume-filling-services',
    badge: 'Perfume filling services',
    heroDescription:
      'Perfume filling services fit brands that already have a formula, fragrance concentrate or approved scent direction and need finished, packaged units produced with the right checks.',
    eyebrowPrefix: 'FILLING',
    keyFacts: {
      title: 'Filling service facts',
      description:
        'Filling projects work best when formula ownership, supplied materials, packaging compatibility and documentation status are clear from the start.',
      facts: defaultKeyFacts({ format: 'Perfume filling and finishing' }),
    },
    answerBlocks: [
      {
        id: 'what-are-perfume-filling-services',
        question: 'What are perfume filling services?',
        answer:
          'Perfume filling services put an existing formula, approved concentrate or selected scent into bottles, closures and packaging. The work can include fill planning, component coordination, label or carton finishing, quality checks and production documentation.',
        detail:
          'This route is different from full scent discovery. It assumes the fragrance direction is already known or close to approval.',
      },
      {
        id: 'who-needs-filling-services',
        question: 'Who needs perfume filling instead of private label development?',
        answer:
          'Filling is the better fit when your brand already has a production-ready formula or supplier-approved scent and mainly needs finished goods. Private label development is better when scent direction, product format and packaging strategy are still open.',
        detail:
          'If you are unsure, the first question is whether your formula and documentation package are complete enough to quote against.',
      },
    ],
    sections: [
      {
        id: 'formula-readiness',
        title: 'What should you prepare before requesting perfume filling?',
        description:
          'A filling project starts with evidence, not just a nice-smelling sample. Clarify who owns the formula, whether the concentrate is available, what documents already exist, what fill size is planned and whether bottles, pumps and caps have been selected. If those details are missing, a broader [contract perfume manufacturing](/contract-perfume-manufacturing) route may fit better.',
        bullets: sectionBullets(
          'Clarify formula ownership and what materials will be supplied.',
          'Share available IFRA, COA, allergen or formula-related documents early.',
          'Confirm whether the project needs filling only or full packaging coordination.',
        ),
      },
      {
        id: 'component-compatibility',
        title: 'Why do bottle and pump choices matter for filling?',
        description:
          'Filling only works when fragrance, bottle, pump, cap, label and carton behave together. A good-looking bottle can still create issues if the pump does not fit, the label surface is difficult, the cap is late or the carton fails in transit. Component compatibility is commercial quality, not a small production detail.',
        bullets: sectionBullets(
          'Check bottle neck, pump fit and closure compatibility before production.',
          'Confirm label material and decoration method for the bottle surface.',
          'Make sure cartons or shipping packs protect the finished product.',
        ),
      },
      {
        id: 'filling-quality-checks',
        title: 'What quality checks matter in perfume filling?',
        description:
          'Customers notice filling quality immediately. Fill level, leakage risk, spray function, cap fit, label alignment, carton condition and batch information all affect trust. The goal is not to make filling sound complicated; it is to make finished units consistent enough for ecommerce, retail, gifting or reorder use.',
        bullets: sectionBullets(
          'Review fill level, spray test and closure fit as practical quality points.',
          'Check label alignment and packaging appearance before delivery.',
          'Keep batch and documentation records organized for future reorders.',
        ),
      },
      {
        id: 'filling-documentation',
        title: 'What documents can support a filling project?',
        description: `${QUALITY_DOCUMENTATION_SENTENCE} For filling projects, existing formula and concentrate records determine what can be confirmed, quoted or claimed for the finished product.`,
        bullets: sectionBullets(
          'Provide formula and concentrate documentation before quoting.',
          'Identify destination markets and sales channels before label claims are finalized.',
          'Use honest compliance language rather than unsupported approval claims.',
        ),
      },
      {
        id: 'filling-moq-timeline',
        title: 'What affects filling MOQ, cost and timeline?',
        description:
          'Filling-only projects may look simple, but they still depend on component readiness, documentation review, production scheduling and what the brand supplies. Final quotes are shaped by format, packaging, quantity, handling and documentation needs.',
        bullets: sectionBullets(
          'Confirm components before assuming the production schedule.',
          'Do not start the timeline clock until approvals and materials are ready.',
          'Expect final pricing to reflect handling, format and packaging requirements.',
        ),
      },
      {
        id: 'after-filling',
        title: 'What happens after bottles are filled?',
        description:
          'After filling, the project moves into finishing and delivery coordination: caps, labels, cartons, quality review, packing and shipment planning. If your brand is preparing for a launch date, event or retail delivery, the handoff matters as much as the filling itself.',
        bullets: sectionBullets(
          'Confirm carton count, packing method and delivery address before release.',
          'Align production completion with campaign dates or retail windows.',
          'Save the approved specifications so the next filling run is easier.',
        ),
      },
    ],
    faqTitle: 'Perfume filling services FAQ',
    faqDescription:
      'Answers for brands that already have a fragrance formula or approved scent direction.',
    faqItems: [
      faq(
        'Can Brandsamor fill my existing perfume formula?',
        'Potentially, depending on formula ownership, supplied materials, documentation, compatibility and project requirements. Share those details before quoting.',
      ),
      faq(
        'What is the MOQ for perfume filling services?',
        'Brandsamor production starts at 100 units. Final project scope depends on format, components, packaging and documentation status.',
      ),
      faq(
        'Do I need to provide bottles for filling?',
        'Not always. Some projects use brand-supplied components, while others need Brandsamor to coordinate bottles, closures, labels and packaging.',
      ),
      faq(
        'How long does perfume filling take?',
        'Typical production takes 3-6 weeks after fragrance, packaging, artwork and production details are approved and ready.',
      ),
      faq(
        'What if my formula documentation is incomplete?',
        'Incomplete documentation can limit what can be confirmed, claimed or produced. Brandsamor will need to understand the gaps before recommending a path.',
      ),
    ],
    ctaTitle: 'Scope your perfume filling project',
    ctaDescription:
      'Send your formula status, component list, target quantity and destination. We will help clarify whether you need filling only or broader manufacturing support.',
    relatedLinks: [
      { to: '/contract-perfume-manufacturing', label: 'Contract perfume manufacturing' },
      { to: '/private-label-perfume-pricing', label: 'Private label perfume pricing' },
      { to: '/quality-compliance', label: 'Quality and compliance' },
      ...moneyPageRelatedLinks,
    ],
  }),

  '/private-label-perfume-pricing': buildCommercialPage({
    path: '/private-label-perfume-pricing',
    badge: 'Private label perfume pricing',
    heroDescription:
      'Private label perfume pricing should be read from the finished unit backward: format, bottle, closure, decoration, packaging, order size, destination and documentation all affect the quote.',
    eyebrowPrefix: 'PRICING',
    keyFacts: {
      title: 'Pricing facts',
      description:
        'Use the starting price as a planning anchor, then build the quote around the product you can sell profitably.',
      facts: defaultKeyFacts({ format: 'Private label fragrance pricing' }),
    },
    answerBlocks: [
      {
        id: 'how-much-private-label-perfume-costs',
        question: 'How much does private label perfume cost?',
        answer:
          'Brandsamor private label perfume pricing starts from $10 per unit for entry projects. Final cost depends on format, bottle size, closure, decoration, outer packaging, quantity, destination and documentation needs.',
        detail:
          'The starting price is useful for planning, but it is not a universal price for every bottle, format or packaging ambition.',
      },
      {
        id: 'why-pricing-varies',
        question: 'Why does private label perfume pricing vary so much?',
        answer:
          'A finished perfume unit is a system: fragrance, base, bottle, pump, cap, label, carton, decoration, packing and documents. Change one part and you can change cost, lead time, freight weight and retail positioning.',
        detail:
          'The expensive-looking option is not always the most profitable. The right packaging choice is the one your customer values enough to pay for.',
      },
    ],
    sections: [
      {
        id: 'starting-price',
        title: 'What does "from $10 per unit" mean?',
        description:
          'The $10 starting point is an indicative entry price, not a flat promise for every SKU. It is most relevant when the project uses practical components, a straightforward format and packaging choices without unusual decoration or handling. Use it for early margin planning, then quote against the approved scope.',
        bullets: sectionBullets(
          'Use the starting point to test whether the business model works.',
          'Expect bottle, cap, carton or decoration upgrades to change the quote.',
          'Confirm final pricing only after the production scope is defined.',
        ),
      },
      {
        id: 'format-cost',
        title: 'How does product format affect perfume pricing?',
        description:
          'Eau de parfum, perfume oil, body mist, travel spray, room spray and gift sets each carry different cost logic. A small oil bottle may use a different applicator and fill process than a spray perfume. A gift set adds components and assembly decisions. Review [fragrance products](/fragrance-products) before choosing format.',
        bullets: sectionBullets(
          'Choose EDP when classic perfume presentation and perceived value matter.',
          'Choose oils for close-wearing formats, layering or attar-style positioning.',
          'Choose mists or travel sizes when accessibility and repeat use matter more.',
        ),
      },
      {
        id: 'packaging-cost',
        title: 'How much do bottle and packaging choices matter?',
        description:
          'Packaging can make or break first-batch economics. Heavy glass, specialty caps, coatings, screen printing, rigid boxes and inserts can raise perceived value, but they also raise cost and sometimes lead time. Label-first packaging can still feel premium when artwork, proportion and carton choices are disciplined.',
        bullets: sectionBullets(
          'Start with packaging that supports your retail price and channel.',
          'Add decoration only when it helps customers understand value.',
          'Consider freight weight and damage risk, not only shelf appearance.',
        ),
      },
      {
        id: 'moq-and-cash-flow',
        title: 'How does MOQ affect total launch budget?',
        description:
          'MOQ shapes total spend, not just unit cost. A larger run may reduce some per-unit costs, but it also puts more cash into inventory before demand is proven. The practical question is how many units your channel can sell and what margin remains after packaging, freight, marketing and fulfillment.',
        bullets: sectionBullets(
          'Validate scent, packaging and price before scaling.',
          'Compare unit savings against cash tied up in inventory.',
          'Plan reorder timing before the first batch sells out.',
        ),
      },
      {
        id: 'documentation-cost',
        title: 'Can documentation affect pricing?',
        description: `${QUALITY_DOCUMENTATION_SENTENCE} For pricing, identify destination market, sales channel and claims early so the right support is quoted instead of added late.`,
        bullets: sectionBullets(
          'Ask retailers or marketplaces what documentation they expect.',
          'Discuss halal certification support before making halal-facing claims.',
          'Use specific documentation language instead of broad approval language.',
        ),
      },
      {
        id: 'pricing-model',
        title: 'How should you model retail price and margin?',
        description:
          'Price the line from the customer backward and the cost forward. Start with the retail price your audience can accept, then test whether the bottle, packaging, fill size and documentation choices leave enough margin after production, freight, transaction fees and marketing.',
        bullets: sectionBullets(
          'Set a target retail price before choosing premium packaging upgrades.',
          'Include fulfillment, shipping, ads, returns and platform fees in margin planning.',
          'Protect cash for reorder if the first batch sells faster than expected.',
        ),
      },
    ],
    comparison: pricingComparison,
    faqTitle: 'Private label perfume pricing FAQ',
    faqDescription:
      'Straight answers about starting prices, MOQ, quotes and the factors that change unit cost.',
    faqItems: [
      faq(
        'What is the starting price for Brandsamor private label perfume?',
        'Indicative private label perfume pricing starts from $10 per unit. Final pricing depends on the approved product scope.',
      ),
      faq(
        'What is the minimum order quantity?',
        'Brandsamor production starts at 100 units. Sampling is available before production and does not require a production order.',
      ),
      faq(
        'Why might my quote be higher than $10 per unit?',
        'Your quote may be higher if the project uses premium bottles, special caps, complex decoration, cartons, gift packaging, additional handling or specific documentation support.',
      ),
      faq(
        'Are samples included in production pricing?',
        'Samples are a separate pre-production step. Available samples normally dispatch in 2-3 days so you can evaluate scent before approving production.',
      ),
      faq(
        'Does Brandsamor publish pricing to be transparent?',
        'Yes. The from-$10 starting point and 100-unit MOQ give founders a planning baseline, while final quotes still reflect the real project details.',
      ),
    ],
    ctaTitle: 'Get a practical private label perfume quote',
    ctaDescription:
      'Share your format, target retail price, packaging direction and quantity. We will help translate the idea into a quoteable launch scope.',
    relatedLinks: [
      { to: '/low-moq-perfume-manufacturer', label: 'Low MOQ perfume manufacturer' },
      { to: '/perfume-moq-guide', label: 'Perfume MOQ guide' },
      { to: '/white-label-perfume-supplier', label: 'White label perfume supplier' },
      ...moneyPageRelatedLinks,
    ],
  }),

  '/perfume-moq-guide': buildCommercialPage({
    path: '/perfume-moq-guide',
    badge: 'Perfume MOQ guide',
    heroDescription:
      'MOQ is a cash-flow and learning decision. The right first perfume run gives you enough finished product to sell, photograph and review without forcing the brand into oversized inventory.',
    eyebrowPrefix: 'MOQ GUIDE',
    keyFacts: {
      title: 'MOQ facts',
      description:
        'MOQ shapes cash flow, inventory risk, packaging choices and reorder planning. Treat it as a business decision, not only a supplier requirement.',
      facts: defaultKeyFacts({ format: 'MOQ planning' }),
    },
    answerBlocks: [
      {
        id: 'what-is-perfume-moq',
        question: 'What is perfume MOQ?',
        answer:
          'Perfume MOQ means minimum order quantity: the smallest production batch a supplier will make for a finished product. Brandsamor production starts at 100 units, giving brands a manageable first-run option before scaling.',
        detail:
          'MOQ exists because production requires setup, components, filling, packaging and quality checks. The goal is to learn without creating unnecessary inventory risk.',
      },
      {
        id: 'why-does-moq-vary',
        question: 'Why do perfume MOQs vary by supplier?',
        answer:
          'MOQs vary because suppliers use different fragrance libraries, factories, component sources, decoration methods and business models. Stock bottles and label branding can support lower quantities; custom molds and new formulas usually need larger commitments.',
        detail:
          'When comparing suppliers, ask what the MOQ includes. A low number is only useful if it covers the format, packaging and documents you actually need.',
      },
    ],
    sections: [
      {
        id: 'brandsamor-100-unit-moq',
        title: 'What is the Brandsamor MOQ?',
        description:
          'Brandsamor production MOQ starts at 100 units. Samples can be ordered before production, but once the approved project moves into production, that is the starting quantity. It is designed for launch tests, creator drops, boutique retail, ecommerce validation and gifting programs.',
        bullets: sectionBullets(
          'Use sampling before committing to finished units.',
          'Move into production after fragrance, packaging, artwork and details are approved.',
          'Keep the first run focused enough to learn from real demand.',
        ),
      },
      {
        id: 'moq-and-packaging',
        title: 'How do packaging choices affect MOQ?',
        description:
          'Packaging has its own minimums and lead times. A stock bottle and label can be practical at lower quantities. A custom cap, special coating, screen print, rigid box or unusual insert may require higher component commitments. If low MOQ is the goal, keep the first packaging system elegant, repeatable and easy to reorder.',
        bullets: sectionBullets(
          'Stock components usually support lower-MOQ planning.',
          'Custom decoration can increase cost, setup requirements or component minimums.',
          'Packaging ambition should match the first batch sales plan.',
        ),
      },
      {
        id: 'moq-and-unit-cost',
        title: 'Does a higher MOQ always save money?',
        description:
          'Higher quantities can reduce some per-unit costs, but they also increase total spend, storage needs and inventory risk. A lower unit cost is not useful if the scent, price or channel is wrong. Use first-batch feedback before deciding whether a larger run is justified.',
        bullets: sectionBullets(
          'Compare total cash outlay, not only unit cost.',
          'Use customer response to decide whether larger runs are justified.',
          'Avoid overbuying packaging before product-market fit is clearer.',
        ),
      },
      {
        id: 'moq-by-format',
        title: 'Do perfume oils, mists and sprays have different MOQ considerations?',
        description:
          'The Brandsamor starting point is the same, but each format has different practical considerations. EDP may depend on bottle, pump and carton choices. Oils may depend on applicator and carrier decisions. Body mists may use different spray systems. Gift sets add components that change quoting.',
        bullets: sectionBullets(
          'Choose format based on customer use case and channel expectations.',
          'Check whether each format needs different packaging or documentation.',
          'Avoid launching too many formats before one hero SKU proves demand.',
        ),
      },
      {
        id: 'moq-documents',
        title: 'Do low-MOQ batches still need documentation?',
        description: `${QUALITY_DOCUMENTATION_SENTENCE} For MOQ planning, a smaller batch should still carry the documents required by the sales channel, destination and claim language.`,
        bullets: sectionBullets(
          'Match documentation to product, destination and claims.',
          'Keep certificate requests specific rather than asking for everything by default.',
          'Do not use unsupported approval claims in product listings or packaging.',
        ),
      },
      {
        id: 'moq-reorder-strategy',
        title: 'How should you plan the reorder after a first batch?',
        description:
          'Decide the reorder trigger before the first batch sells out. Track sell-through by channel, customer comments, scent preference, return reasons and packaging feedback. If the batch performs well, you may reorder the same SKU, increase quantity or add a second scent. If it underperforms, the smaller run gives you room to adjust.',
        bullets: sectionBullets(
          'Set a reorder trigger based on inventory level and production timeline.',
          'Keep approved artwork and component details organized.',
          'Scale the strongest SKU before expanding into a broad collection.',
        ),
      },
    ],
    comparison: {
      id: 'moq-planning-table',
      title: 'How to think about 100, 500 and 1,000 unit perfume runs',
      description:
        'The right MOQ is not always the largest batch you can afford. Match quantity to risk, cash and market confidence.',
      columns: [
        { key: 'bestFor', label: 'Best for' },
        { key: 'benefit', label: 'Main benefit' },
        { key: 'risk', label: 'Main risk' },
      ],
      rows: [
        {
          label: '100 units',
          values: {
            bestFor: 'First launch, creator drop, boutique test, ecommerce validation or gifting pilot.',
            benefit: 'Lower inventory risk and faster learning from real customers.',
            risk: 'Unit cost may not be as efficient as larger runs.',
          },
        },
        {
          label: '500 units',
          values: {
            bestFor: 'Brands with early demand, wholesale interest or a planned campaign.',
            benefit: 'More inventory for launch momentum and potential component efficiency.',
            risk: 'Requires more cash and stronger confidence in the SKU.',
          },
        },
        {
          label: '1,000+ units',
          values: {
            bestFor: 'Established sellers with proven velocity and storage or fulfillment plans.',
            benefit: 'Can support broader distribution and more efficient planning.',
            risk: 'High exposure if scent, price or channel assumptions are wrong.',
          },
        },
      ],
      caption: 'Perfume MOQ planning comparison for 100, 500 and 1,000 unit order sizes.',
    },
    faqTitle: 'Perfume MOQ guide FAQ',
    faqDescription:
      'Answers to common questions about minimum order quantity, samples, pricing and first-batch planning.',
    faqItems: [
      faq(
        'What does MOQ stand for?',
        'MOQ stands for minimum order quantity. It is the smallest production batch a supplier will make for a finished product.',
      ),
      faq(
        'What is Brandsamor\'s perfume MOQ?',
        'Brandsamor production starts at 100 units. This is the confirmed starting MOQ for eligible private label fragrance production.',
      ),
      faq(
        'Can I sample before meeting the MOQ?',
        'Yes. Available samples normally dispatch in 2-3 days, and sampling happens before production commitment.',
      ),
      faq(
        'Why do some manufacturers require much higher MOQs?',
        'Higher MOQs can come from custom formula work, component minimums, decoration setup, factory scheduling, tooling or a supplier model built for larger brands.',
      ),
      faq(
        'Should I order more than 100 units to reduce unit cost?',
        'Only if your demand, channel and cash flow justify it. A lower unit cost is not useful if the extra inventory does not sell.',
      ),
    ],
    ctaTitle: 'Use MOQ as a launch planning tool',
    ctaDescription:
      'Tell us your channel, target retail price and expected first-batch quantity. We will help decide whether the starting MOQ is the right commercial step.',
    relatedLinks: [
      { to: '/low-moq-perfume-manufacturer', label: 'Low MOQ perfume manufacturer' },
      { to: '/private-label-perfume-pricing', label: 'Private label perfume pricing' },
      { to: '/white-label-perfume-supplier', label: 'White label perfume supplier' },
      ...moneyPageRelatedLinks,
    ],
  }),

  '/best-private-label-perfume-manufacturers': buildCommercialPage({
    path: '/best-private-label-perfume-manufacturers',
    badge: 'Manufacturer comparison guide',
    heroDescription:
      'The best private label perfume manufacturer depends on stage, budget, order size, compliance needs and how much project management your team can handle.',
    eyebrowPrefix: 'MANUFACTURERS',
    keyFacts: {
      title: 'Brandsamor fit',
      description:
        'Brandsamor is strongest for low-MOQ private label launches that need sampling, packaging support and a practical first production path.',
      facts: defaultKeyFacts({ format: 'Low-MOQ private label fragrance' }),
    },
    answerBlocks: [
      {
        id: 'best-private-label-perfume-manufacturer',
        question: 'Who is the best private label perfume manufacturer?',
        answer:
          'The best manufacturer depends on your situation. Brandsamor is a strong fit for low-MOQ launches with sampling and packaging support. Larger contract houses, EU labs, GCC fillers or China OEM suppliers may be better for other briefs.',
        detail:
          'Start the shortlist with order size, market, formula needs, documentation expectations, budget and the amount of supplier management you can handle internally.',
      },
      {
        id: 'when-to-choose-brandsamor',
        question: 'When should a brand choose Brandsamor?',
        answer:
          'Choose Brandsamor when you want to sample first, keep the first production run manageable, and coordinate scent, packaging, filling, quality checks and documentation-aware planning through one guided path.',
        detail:
          'Brandsamor is not positioned as the answer for every enterprise brief. It is built for brands that need a practical commercial route into fragrance.',
      },
    ],
    sections: [
      {
        id: 'how-to-shortlist-manufacturers',
        title: 'How should you shortlist private label perfume manufacturers?',
        description:
          'Start with fit, not logos. A manufacturer that works beautifully for a global beauty company may be wrong for a founder testing a first batch. A marketplace supplier with a low headline price may be wrong if you need documentation support and packaging guidance. Shortlist by MOQ, sample process, communication, packaging capability, documentation, lead time, cost transparency and reorder planning.',
        bullets: sectionBullets(
          'Confirm MOQ, sample timing and production lead time in writing.',
          'Ask what documentation is available for your product and destination.',
          'Compare total launch support, not only unit price.',
        ),
      },
      {
        id: 'brandsamor-best-fit',
        title: 'Where is Brandsamor the best fit?',
        description:
          'Brandsamor fits brands that want a guided private label path with a low-MOQ production route. It is especially relevant when you need [fragrance sampling](/fragrance-sampling), practical [packaging and branding](/packaging-branding), and a first batch that does not require enterprise inventory risk. Packamor LLC — the parent entity of Brandsamor — operates from Delaware and supports global customers subject to product, destination, logistics and compliance requirements.',
        bullets: sectionBullets(
          'Good fit for first launches, creator lines, boutiques, beauty brands and gifting concepts.',
          'Good fit when scent choice and packaging need to be planned together.',
          'Good fit when a smaller first batch is commercially safer than a large opening order.',
        ),
      },
      {
        id: 'us-contract-houses',
        title: 'When are US contract houses a better choice?',
        description:
          'US contract houses can be better for established US brands with higher volumes, internal operations teams, domestic vendor requirements or complex retail onboarding. They may offer strong controls and formal account management, but often expect clearer specifications, larger budgets and higher MOQs.',
        bullets: sectionBullets(
          'Consider US contract houses for larger repeat programs and domestic procurement needs.',
          'Expect onboarding and minimums to vary significantly by supplier.',
          'Ask whether they support small first launches before investing time in a quote.',
        ),
      },
      {
        id: 'china-oem-marketplaces',
        title: 'When do China OEM marketplaces make sense?',
        description:
          'China OEM marketplaces can make sense for experienced sourcing teams that know how to vet suppliers, compare samples, inspect quality, handle freight and manage communication across time zones. They can be cost-competitive, but marketplace listings vary widely and the buyer carries more verification work.',
        bullets: sectionBullets(
          'Use marketplaces only if you can manage supplier due diligence.',
          'Confirm sample quality, production quality and packaging consistency separately.',
          'Avoid choosing on headline unit price without freight, duties and risk planning.',
        ),
      },
      {
        id: 'eu-and-gcc-options',
        title: 'When are EU niche labs or regional GCC fillers better?',
        description:
          'EU niche labs can be better for brands prioritizing perfumer-led creative development, European positioning or a longer custom fragrance process. Regional GCC fillers can fit brands focused on oud, attar, local distribution and Gulf customer expectations. Both models can be excellent in the right context, but capabilities, MOQs, documents and export readiness vary.',
        bullets: sectionBullets(
          'Consider EU labs for premium creative development and niche fragrance positioning.',
          'Consider GCC fillers for regional oil, attar or oud-centered commercial needs.',
          'Verify documentation, export support and reorder process before committing.',
        ),
      },
      {
        id: 'documentation-for-manufacturer-choice',
        title: 'How should documentation affect manufacturer choice?',
        description: `${QUALITY_DOCUMENTATION_SENTENCE} For manufacturer selection, ask whether the supplier can provide documents tied to your exact product, not just a generic capability list.`,
        bullets: sectionBullets(
          'Match document support to destination, product type and claims.',
          'Ask how batch records and certificates are handled on reorders.',
          'Avoid suppliers that answer compliance questions only with broad badges.',
        ),
      },
      {
        id: 'when-not-to-choose-brandsamor',
        title: 'When should you not choose Brandsamor?',
        description:
          'Do not choose Brandsamor if you need a fully bespoke perfumer-led R&D process with no starting library, proprietary formula ownership as the central asset, custom glass tooling for a very large launch or a procurement process built only for enterprise-scale manufacturers. In those cases, a specialized lab or large contract house may serve you better.',
        bullets: sectionBullets(
          'Not ideal when formula ownership is the central commercial asset.',
          'Not ideal when custom molds and large-scale tooling are already approved.',
          'Not ideal when procurement requires a very specific enterprise manufacturing profile.',
        ),
      },
    ],
    comparison: manufacturerComparison,
    faqTitle: 'Best private label perfume manufacturers FAQ',
    faqDescription:
      'A practical comparison FAQ for founders and brand teams choosing a fragrance production partner.',
    faqItems: [
      faq(
        'Is Brandsamor the best private label perfume manufacturer?',
        'Brandsamor is best for low-MOQ, sample-led private label launches. It may not be best for every custom R&D, enterprise or very large-volume project.',
      ),
      faq(
        'What manufacturer type is best for a first perfume launch?',
        'A low-MOQ private label partner is often best for a first launch because it reduces inventory risk while you test scent, packaging and demand.',
      ),
      faq(
        'What manufacturer type is best for a fully custom formula?',
        'A specialized custom fragrance lab or contract house may be better when proprietary formula development and ownership are the main goals.',
      ),
      faq(
        'How should I compare manufacturer quotes?',
        'Compare MOQ, unit price, included packaging, sample process, documentation, lead time, freight, reorder terms and the amount of project management you must handle.',
      ),
      faq(
        'What are Brandsamor\'s confirmed launch facts?',
        'Production starts at 100 units, indicative pricing starts from $10 per unit, samples dispatch in 2-3 days and production is typically 3-6 weeks after approvals.',
      ),
    ],
    ctaTitle: 'Choose the manufacturer model that fits your launch',
    ctaDescription:
      'Tell us your order size, market, formula needs and packaging goals. If Brandsamor is not the right fit, the comparison will still help you choose a better route.',
    relatedLinks: [
      { to: '/low-moq-perfume-manufacturer', label: 'Low MOQ perfume manufacturer' },
      { to: '/contract-perfume-manufacturing', label: 'Contract perfume manufacturing' },
      { to: '/us-vs-china-vs-europe-perfume-manufacturing', label: 'US vs China vs Europe perfume manufacturing' },
      { to: '/brandsamor-vs-alibaba-perfume-suppliers', label: 'Brandsamor vs Alibaba perfume suppliers' },
      ...moneyPageRelatedLinks,
    ],
  }),
};
