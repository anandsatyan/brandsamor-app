import {
  BodyMistIllustration,
  BrandBriefIllustration,
  ComplianceDocIllustration,
  DeliveryIllustration,
  FragranceFamilyIllustration,
  LaunchPlanningIllustration,
  PackagingIllustration,
  ProcessTimelineIllustration,
  ProductionIllustration,
  QualityCheckIllustration,
  ScentSamplesIllustration,
} from '../../components/Illustrations';
import {
  buildCommercialPage,
  faq,
  sectionBullets,
  defaultKeyFacts,
  BUSINESS_FACTS,
} from './buildCommercialPage';
import type { TopicPageConfig } from '../../components/topic/types';

const PACKAMOR_OPERATOR =
  'Brandsamor is operated by Packamor LLC at 1111B S Governors Ave, Dover, DE 19904.';

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
    'The fastest and lowest-cost route is usually a white label or guided private label path. Custom OEM gives more control, but every extra decision can add cost, approvals and lead time.',
  columns: [
    { key: 'whiteLabel', label: 'White label' },
    { key: 'privateLabel', label: 'Private label' },
    { key: 'customOem', label: 'Custom OEM' },
  ],
  rows: [
    {
      label: 'Scent',
      values: {
        whiteLabel: 'Launch-ready scents selected from an existing library.',
        privateLabel: 'Curated scent sampling matched to your brand and customer brief.',
        customOem: 'A new scent direction developed around a detailed creative brief.',
      },
    },
    {
      label: 'Formula ownership',
      values: {
        whiteLabel: 'Supplier formula; your brand sells the finished product.',
        privateLabel: 'Supplier-supported formula with brand-specific positioning and packaging.',
        customOem: 'Project-specific formula ownership terms must be agreed before development.',
      },
    },
    {
      label: 'Packaging',
      values: {
        whiteLabel: 'Fast stock bottle, cap, spray and label choices.',
        privateLabel: 'Branded bottle, label, carton and decoration choices within practical limits.',
        customOem: 'Higher-touch bottle molds, special decoration or structural packaging may be possible.',
      },
    },
    {
      label: 'Typical MOQ',
      values: {
        whiteLabel: '100 units through the Brandsamor low-MOQ path.',
        privateLabel: '100 units through Brandsamor, depending on format and packaging.',
        customOem: 'Often higher because development, materials and tooling require more commitment.',
      },
    },
    {
      label: 'Lead time',
      values: {
        whiteLabel: 'Samples dispatch in 2-3 business days; production is typically 3-6 weeks after approvals.',
        privateLabel: 'Typically 3-6 weeks after fragrance, artwork, packaging and production approvals.',
        customOem: 'Longer when new formula work, stability review or special packaging is required.',
      },
    },
    {
      label: 'Cost per unit',
      values: {
        whiteLabel: 'Indicative entry projects start from $10 per unit.',
        privateLabel: 'Indicative pricing starts from $10 per unit, with packaging and format affecting cost.',
        customOem: 'Usually higher because more development, testing and custom components are involved.',
      },
    },
    {
      label: 'Best for',
      values: {
        whiteLabel: 'Testing a perfume idea quickly with the lowest practical launch cost.',
        privateLabel: 'Building a branded product range without starting from a blank formula.',
        customOem: 'Established brands that need a highly specific scent or packaging system.',
      },
    },
  ],
  caption: 'Comparison of white label, private label and custom OEM perfume launch models.',
};

const pricingComparison = {
  id: 'private-label-perfume-pricing-drivers',
  title: 'What changes private label perfume pricing?',
  description:
    'Entry projects can start from $10 per unit, but the final quote is built from format, bottle, decoration, packaging and quantity choices. The table below shows how those decisions usually move cost.',
  columns: [
    { key: 'lowerCost', label: 'Lower-cost direction' },
    { key: 'higherCost', label: 'Higher-cost direction' },
    { key: 'planningNote', label: 'Planning note' },
  ],
  rows: [
    {
      label: 'Format',
      values: {
        lowerCost: 'Simple fragrance format in a practical fill size.',
        higherCost: 'Oil, EDP, mist or gift formats with more components or handling.',
        planningNote: 'Choose the format around channel and margin, not only the lowest unit price.',
      },
    },
    {
      label: 'Bottle and closure',
      values: {
        lowerCost: 'Stock bottle, stock cap and standard spray pump.',
        higherCost: 'Premium bottle shape, heavier glass, specialty cap or unique actuator.',
        planningNote: 'Bottle choices influence unit cost, freight weight, shelf presence and reorder speed.',
      },
    },
    {
      label: 'Decoration',
      values: {
        lowerCost: 'Label-first branding with clean artwork.',
        higherCost: 'Screen printing, coating, metallic effects or more complex decoration.',
        planningNote: 'Decorations should support your retail price and not only look impressive in mockups.',
      },
    },
    {
      label: 'Secondary packaging',
      values: {
        lowerCost: 'Simple carton or no outer box where the channel allows it.',
        higherCost: 'Rigid box, inserts, gift-ready presentation or multi-piece sets.',
        planningNote: 'Packaging adds cost but may raise perceived value for gifting and boutique retail.',
      },
    },
    {
      label: 'Quantity',
      values: {
        lowerCost: 'MOQ from 100 units for validation and first launch.',
        higherCost: 'Larger runs can improve component efficiency but require more cash and storage.',
        planningNote: 'Start with the batch size you can sell, then use reorder data to scale responsibly.',
      },
    },
    {
      label: 'Documentation',
      values: {
        lowerCost: 'Standard project documentation aligned to the product and market.',
        higherCost: 'Additional certificates or market-specific documentation support where required.',
        planningNote: `Available support includes ${certificationSummary}; requirements depend on product and destination.`,
      },
    },
  ],
  caption: 'Private label perfume pricing drivers by format, packaging, decoration, quantity and documentation.',
};

const manufacturerComparison = {
  id: 'manufacturer-model-comparison',
  title: 'Private label perfume manufacturer types compared',
  description:
    'There is no single best manufacturer for every fragrance business. The strongest choice depends on launch size, internal experience, compliance needs, cost tolerance and how much project management you want to own.',
  columns: [
    { key: 'fit', label: 'Best fit' },
    { key: 'tradeoff', label: 'Main trade-off' },
    { key: 'chooseWhen', label: 'Choose when' },
  ],
  rows: [
    {
      label: 'Brandsamor',
      values: {
        fit: 'Low-MOQ private label launches, sample-first validation and founders who need guided packaging support.',
        tradeoff: 'Not the best fit for every highly custom R&D brief or very large enterprise procurement process.',
        chooseWhen: 'You want to start from 100 units, sample first and keep the launch path practical.',
      },
    },
    {
      label: 'US contract houses',
      values: {
        fit: 'Established US brands that need domestic communication, formal production controls and repeatable scale.',
        tradeoff: 'Many have higher MOQs, slower onboarding or less flexibility for small first launches.',
        chooseWhen: 'You already have demand, budget and a clear operations process.',
      },
    },
    {
      label: 'China OEM marketplaces',
      values: {
        fit: 'Cost-led sourcing teams that can vet suppliers, manage samples and handle production details directly.',
        tradeoff: 'Quality, communication, documentation and packaging consistency can vary widely by supplier.',
        chooseWhen: 'You have sourcing experience and are comfortable managing more risk yourself.',
      },
    },
    {
      label: 'EU niche labs',
      values: {
        fit: 'Premium fragrance brands that prioritize perfumer-led development and European market context.',
        tradeoff: 'Custom development can be expensive, slower and less accessible for small commercial tests.',
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
      'Launch branded perfume faster with a white label-style path: curated scent sampling, practical stock packaging choices and production from 100 units. Brandsamor keeps the early decision set focused so founders can test demand without a custom OEM budget.',
    eyebrowPrefix: 'WHITE LABEL',
    heroIllustration: ProcessTimelineIllustration,
    keyFacts: {
      title: 'White label launch facts',
      description:
        'Use this route when speed, low upfront cost and a simple first batch matter more than owning every formula and packaging detail.',
      facts: defaultKeyFacts({ format: 'White label fragrance' }),
    },
    answerBlocks: [
      {
        id: 'what-is-a-white-label-perfume-supplier',
        question: 'What is a white label perfume supplier?',
        answer:
          'A white label perfume supplier helps you sell a ready-to-produce fragrance under your own branding. Instead of developing a scent from zero, you choose from launch-ready options, confirm packaging, approve artwork and move into production after approvals, keeping the project closer to a commercial test than custom R&D.',
        detail:
          'For a new brand, the value is speed and cost control. You still need to evaluate samples, choose a product format and prepare branding, but the project avoids the long discovery cycle of custom formulation.',
      },
      {
        id: 'is-white-label-cheaper-than-private-label',
        question: 'Is white label perfume cheaper than private label?',
        answer:
          'White label is often the lowest-cost perfume launch path because it uses existing fragrance directions and practical packaging components. Brandsamor pricing starts from $10 per unit for entry projects, with MOQ from 100 units and final cost shaped by format and packaging.',
        detail:
          'Private label can overlap with white label when the project uses curated scents and branded packaging. The difference is how much creative control you want before the first sale.',
      },
    ],
    sections: [
      {
        id: 'why-speed-matters',
        title: 'Why does white label perfume move faster?',
        description:
          'White label speed comes from narrowing the number of open decisions. You begin with [fragrance sampling](/fragrance-sampling), review curated scent options, choose a practical bottle and confirm artwork. Production still requires approvals, quality checks and documentation, but the project does not wait for a long custom formula brief. Available samples are normally dispatched in 2-3 business days, and production is typically 3-6 weeks after fragrance, packaging, artwork and production details are approved.',
        bullets: sectionBullets(
          'Curated scent options reduce the time spent searching through a large fragrance library.',
          'Stock packaging choices help keep sourcing, decoration and costing more predictable.',
          'A focused first batch lets you validate demand before committing to a wider collection.',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'lowest-cost-path',
        title: 'How does Brandsamor keep the first launch cost practical?',
        description:
          'The lowest-cost perfume launch is usually the one with fewer custom parts, fewer tooling decisions and a product format your channel can sell profitably. Brandsamor starts production from 100 units and publishes indicative entry pricing from $10 per unit. That does not mean every project costs the same; bottle size, cap, spray, decoration, carton and destination can change the quote. The purpose of the white label route is to keep those variables manageable.',
        bullets: sectionBullets(
          'Start with a realistic 100-unit MOQ instead of tying cash into untested inventory.',
          'Use practical bottle and label choices before exploring more expensive decoration.',
          'Plan retail price early so packaging ambition stays aligned with margin.',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'white-label-vs-private-label',
        title: 'Should you choose white label or private label perfume?',
        description:
          'Choose white label when you mainly need a branded product quickly. Choose private label when you want more say over scent positioning, packaging story and product range architecture, while still avoiding a blank-page custom formulation project. The [private label vs white label perfume](/private-label-vs-white-label-perfume) decision is less about prestige and more about risk: how much time, cash and uncertainty should your first launch carry?',
        bullets: sectionBullets(
          'White label fits launch tests, creator drops, boutique add-ons and gifting concepts.',
          'Private label fits brands that want a more deliberate scent and packaging story.',
          'Custom OEM fits established teams that can fund longer development and deeper testing.',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'documentation-and-approvals',
        title: 'What documentation can support a white label perfume order?',
        description:
          'White label does not mean vague documentation. Depending on the project and destination, Brandsamor can support IFRA certificates, GMP and ISO 22716 production standards, MoCRA documentation, Certificate of Analysis and halal certification support. This is documentation support, not a promise that every product automatically qualifies for every market. Claims, labels and market requirements still need to be reviewed honestly for the product you plan to sell.',
        bullets: sectionBullets(
          'Confirm fragrance, packaging and artwork before production is released.',
          'Request the documents your sales channel or destination market expects.',
          'Avoid unsupported claims and keep compliance language specific to the product.',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'first-batch-plan',
        title: 'What should your first white label batch include?',
        description:
          'A smart first batch is not only a bottle with a label. It includes the scent, fill size, selling price, packaging tier, channel plan, reorder expectation and documentation needs. If you are selling online, product photography and shipping weight matter. If you are selling in a boutique, shelf presence and carton finish may matter more. Brandsamor helps you turn those decisions into a production-ready scope before the 3-6 week production window begins.',
        bullets: sectionBullets(
          'Pick one hero scent before adding flankers or gift sets.',
          'Match packaging to the channel where the first 100 units will sell.',
          'Keep a reorder path open if early demand is stronger than expected.',
        ),
        Illustration: PackagingIllustration,
      },
    ],
    comparison: whiteLabelComparison,
    faqTitle: 'White label perfume supplier FAQ',
    faqDescription:
      'Practical answers for founders comparing white label, private label and custom perfume production.',
    faqItems: [
      faq(
        'What is the MOQ for white label perfume with Brandsamor?',
        'Brandsamor production starts at 100 units. Sampling has no production MOQ, so you can review scents before committing to a production batch.',
      ),
      faq(
        'How much does white label perfume cost?',
        'Indicative entry pricing starts from $10 per unit. Final pricing depends on format, bottle, closure, decoration, packaging, quantity, destination and documentation needs.',
      ),
      faq(
        'How fast can a white label perfume launch?',
        'Available samples are normally dispatched in 2-3 business days. Production typically takes 3-6 weeks after fragrance, packaging, artwork and production details are approved.',
      ),
      faq(
        'Do I own the fragrance formula in a white label project?',
        'Usually no. White label projects typically use supplier-supported formulas. If formula ownership is important, discuss custom OEM terms before development begins.',
      ),
      faq(
        'Who operates Brandsamor?',
        PACKAMOR_OPERATOR,
      ),
    ],
    ctaTitle: 'Start with a focused white label perfume brief',
    ctaDescription:
      'Tell us your brand, audience, target price and launch channel. We will help you evaluate whether a fast white label route or a deeper private label route is the better first step.',
    ctaIllustration: DeliveryIllustration,
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
      'Brandsamor is a low MOQ perfume manufacturer for brands that want to start at 100 units, sample before production and keep the first launch commercially realistic. Build a branded fragrance without ordering thousands of bottles before demand is proven.',
    eyebrowPrefix: 'LOW MOQ',
    heroIllustration: LaunchPlanningIllustration,
    keyFacts: {
      title: 'Low MOQ facts',
      description:
        'The core production MOQ is clear: Brandsamor production starts at 100 units, with samples available before that commitment.',
      facts: defaultKeyFacts({ format: 'Perfume, oils, mists and related formats' }),
    },
    answerBlocks: [
      {
        id: 'what-is-low-moq-perfume-manufacturing',
        question: 'What does low MOQ mean for perfume manufacturing?',
        answer:
          'Low MOQ perfume manufacturing means you can produce a smaller first batch instead of committing to thousands of units. With Brandsamor, production starts at 100 units, giving founders room to test scent, packaging, pricing and channel demand before scaling with less inventory exposure.',
        detail:
          'MOQ is not only a factory number. It affects cash flow, storage, launch risk and how quickly you can learn from customers.',
      },
      {
        id: 'can-i-really-start-at-100-units',
        question: 'Can I really start at 100 units?',
        answer:
          'Yes. Brandsamor production MOQ starts at 100 units for eligible private label fragrance projects. The exact first-batch scope still depends on product format, bottle, decoration, packaging and destination, but the starting production quantity is 100 units for planning your launch budget.',
        detail:
          'That number is most useful when paired with disciplined choices: one strong scent, practical packaging and a clear plan for where the first units will sell.',
      },
    ],
    sections: [
      {
        id: 'why-100-units-matters',
        title: 'Why is a 100-unit MOQ useful for new perfume brands?',
        description:
          'A 100-unit MOQ lets you validate the parts of a fragrance launch that spreadsheets cannot prove: whether customers like the scent, whether the bottle supports the retail price, whether the label feels credible and whether the channel can move inventory. It is especially useful for creators, boutiques, salons, spas and ecommerce sellers that need real product in hand before investing in a larger run. See the broader [perfume MOQ guide](/perfume-moq-guide) for planning context.',
        bullets: sectionBullets(
          'Lower inventory exposure while you learn what customers actually buy.',
          'More flexibility to adjust scent, packaging or channel before a reorder.',
          'A practical entry point for brands without enterprise production budgets.',
        ),
        Illustration: BodyMistIllustration,
      },
      {
        id: 'sample-before-moq',
        title: 'Do samples count toward the MOQ?',
        description:
          'Samples are the step before production MOQ. Brandsamor sampling begins with a brief about your business, customer and fragrance direction. We curate five fragrance samples for evaluation and available samples are normally dispatched within 2-3 business days. Only after you approve fragrance, packaging, artwork and production details does the production batch begin. This separation helps you avoid ordering 100 units of a scent you have not evaluated.',
        bullets: sectionBullets(
          'Use samples to compare scent direction, drydown and audience fit.',
          'Share feedback before the production scope is locked.',
          'Approve fragrance and packaging before the 3-6 week production timeline begins.',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'what-affects-low-moq',
        title: 'What can make a low-MOQ project more complex?',
        description:
          'The MOQ may start at 100 units, but the project can become more complex when the bottle is unusual, decoration requires special handling, packaging has multiple parts or the product needs destination-specific documentation. A low-MOQ launch works best when the commercial goal is clear. If the first batch is meant to test demand, keep the packaging elegant and repeatable instead of spending the entire budget on difficult custom components.',
        bullets: sectionBullets(
          'Special bottles, coatings or caps can change component availability and cost.',
          'Outer boxes, inserts and gift sets add more approval points.',
          'Market-specific documentation should be discussed before artwork is finalized.',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'low-moq-unit-cost',
        title: 'Does a lower MOQ mean the lowest unit cost?',
        description:
          'A lower MOQ usually protects cash flow, but it does not always create the lowest possible unit cost. Larger runs can improve component efficiency, while smaller runs help you avoid unsold inventory. Brandsamor publishes indicative pricing from $10 per unit so founders have a starting point, then quotes based on the actual format, bottle, decoration, packaging and quantity. The right first order is the one your channel can sell responsibly.',
        bullets: sectionBullets(
          'Use 100 units to test demand before chasing theoretical volume savings.',
          'Model landed cost, retail price and expected sell-through together.',
          'Reorder once customer response is clearer, not because inventory was cheap.',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'low-moq-compliance',
        title: 'What documents are available for low-MOQ perfume?',
        description:
          'Low MOQ should not mean casual production records. Depending on the product and destination, Brandsamor can support IFRA, GMP, ISO 22716, MoCRA documentation, Certificate of Analysis and halal certification support. Documentation should match the actual formula, claims and destination. Brandsamor avoids unsupported approval language; the project should use accurate documentation and honest label language.',
        bullets: sectionBullets(
          'Discuss documentation needs before production so the quote reflects them.',
          'Keep claims grounded in available support and applicable market rules.',
          'Use quality checks to confirm fill, packaging, labeling and batch details.',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'scaling-low-moq',
        title: 'How do you scale after the first 100 units?',
        description:
          'Scaling should be based on sell-through, customer comments, return reasons and channel feedback. If the first 100 units sell quickly, the next decision might be a reorder of the same scent, a larger batch, a second fragrance or a packaging upgrade. If demand is mixed, you still have a manageable amount of learning inventory. That is the main value of low MOQ manufacturing: it turns the first order into a controlled market test.',
        bullets: sectionBullets(
          'Track which scent notes, packaging details and price points customers mention.',
          'Keep reorder artwork and component choices organized from the first batch.',
          'Scale the winners before expanding into a full fragrance collection.',
        ),
        Illustration: ProductionIllustration,
      },
    ],
    faqTitle: 'Low MOQ perfume manufacturer FAQ',
    faqDescription: 'Answers about starting production at 100 units and planning the first batch.',
    faqItems: [
      faq(
        'What is the Brandsamor perfume MOQ?',
        'Brandsamor production MOQ starts at 100 units. This is the confirmed starting point for eligible private label fragrance production.',
      ),
      faq(
        'Can I order samples before the 100-unit production batch?',
        'Yes. Available samples are normally dispatched within 2-3 business days, and sampling happens before production approval.',
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
    ctaTitle: 'Plan a 100-unit perfume launch',
    ctaDescription:
      'Share your product format, audience, price point and channel. We will help you shape a first batch that uses the 100-unit MOQ responsibly.',
    ctaIllustration: QualityCheckIllustration,
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
      'Contract perfume manufacturing for established brands ready to move from one-off launches into repeatable production planning. Brandsamor supports fragrance, filling, packaging, quality checks and documentation coordination for scalable private label fragrance programs.',
    eyebrowPrefix: 'CONTRACT',
    heroIllustration: ProductionIllustration,
    keyFacts: {
      title: 'Contract manufacturing facts',
      description:
        'Use contract manufacturing when you need a production partner, clearer specifications and a repeatable process for launches and reorders.',
      facts: defaultKeyFacts({ format: 'Contract perfume production' }),
    },
    answerBlocks: [
      {
        id: 'what-is-contract-perfume-manufacturing',
        question: 'What is contract perfume manufacturing?',
        answer:
          'Contract perfume manufacturing is production support for a brand that needs fragrance made, filled, finished and prepared under agreed specifications. It can involve selected formulas, existing formulas, packaging coordination, documentation support and quality checks across first runs and repeat orders.',
        detail:
          'Compared with a simple launch package, contract manufacturing puts more emphasis on specifications, repeatability, batch records and commercial planning.',
      },
      {
        id: 'who-is-contract-manufacturing-for',
        question: 'Who should use contract perfume manufacturing?',
        answer:
          'Contract perfume manufacturing is best for established brands with a defined audience, sales channel and reorder plan. If you already know what sells, the conversation shifts from experimentation to consistency, packaging control, lead-time planning and documentation for each production run.',
        detail:
          'New brands can still start with Brandsamor, but the contract manufacturing page is written for teams that are already thinking beyond the first test batch.',
      },
    ],
    sections: [
      {
        id: 'scaling-from-first-launch',
        title: 'How does contract manufacturing help a brand scale?',
        description:
          'Scaling fragrance is less about making a larger batch and more about making the same promise reliably. The scent profile, fill volume, packaging, carton, label placement, batch documentation and delivery plan all need to be repeatable. Brandsamor helps established brands convert a product idea or proven first launch into a production scope that can be quoted, approved and repeated. If you are still choosing the first scent, start with [fragrance sampling](/fragrance-sampling) before locking production.',
        bullets: sectionBullets(
          'Translate creative direction into production-ready specifications.',
          'Coordinate bottle, closure, decoration and carton decisions before production.',
          'Plan reorders around real sales velocity and component lead times.',
        ),
        Illustration: ProcessTimelineIllustration,
      },
      {
        id: 'brand-supplied-formula',
        title: 'Can Brandsamor work with an existing formula?',
        description:
          'Some contract projects begin with an existing fragrance formula or brand-owned direction. In those cases, the work starts with clarity: what is being supplied, what documentation exists, which format is planned and what packaging must be compatible with the fragrance. Brands that already have a formula may also need [perfume filling services](/perfume-filling-services) rather than a full private label scent selection process. The right route depends on how complete your formula, concentrate and documentation package already is.',
        bullets: sectionBullets(
          'Share formula status, fragrance concentrate details and documentation early.',
          'Confirm bottle and closure compatibility before production assumptions are made.',
          'Separate formula ownership questions from filling, packaging and logistics needs.',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'production-controls',
        title: 'What should be controlled before contract production starts?',
        description:
          'Contract production should not begin until the practical details are agreed. That includes the approved fragrance, fill size, bottle, cap, pump, label, carton, artwork files, pack-out, documentation needs and shipment plan. Typical production is 3-6 weeks after approvals, so incomplete decisions can delay the clock. A brand scaling into multiple SKUs should also decide whether every scent shares the same bottle system or whether each product needs distinct packaging.',
        bullets: sectionBullets(
          'Confirm approved samples and final artwork before production release.',
          'Use a clear component list so each reorder can reference the same decisions.',
          'Keep quality expectations specific: fill level, spray test, label alignment and carton finish.',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'documentation-for-contract-orders',
        title: 'What documentation is available for contract perfume manufacturing?',
        description:
          'Documentation depends on the product, market and claims, but Brandsamor can support IFRA certificates, GMP and ISO 22716 production standards, Certificate of Analysis, MoCRA documentation and halal certification support. These documents help brands sell through ecommerce, retail, gifting or international channels more responsibly. They are not a substitute for brand-side legal review of claims, label copy or destination-specific obligations.',
        bullets: sectionBullets(
          'Identify the sales market before labels and claims are finalized.',
          'Request IFRA, COA, MoCRA or halal support where relevant to the product.',
          'Avoid broad claims that are not supported by the project documentation.',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'commercial-planning',
        title: 'How should established brands plan quantity and cost?',
        description:
          'For established brands, the best order quantity depends on sell-through, margin, cash flow, storage and campaign timing. Brandsamor production starts at 100 units, and entry pricing starts from $10 per unit, but a scaling brand may order more when demand is known. Larger runs can help component planning, while smaller runs can protect cash during SKU testing. The quote should be read beside your retail price, launch calendar and reorder threshold.',
        bullets: sectionBullets(
          'Use sales data to decide whether the next run should be the same size or larger.',
          'Build launch calendars around the 3-6 week post-approval production timeline.',
          'Protect margin by evaluating packaging upgrades against expected retail price.',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'handoff-and-delivery',
        title: 'What happens after contract production is complete?',
        description:
          'Finished perfume still needs inspection, packing and delivery coordination. For a scaling brand, the delivery plan may involve ecommerce fulfillment, retail distribution, event inventory or a warehouse transfer. Each route has different carton labeling and timing needs. Brandsamor helps align production completion with the way finished units will be used, so the product is not only manufactured but commercially ready for its next step.',
        bullets: sectionBullets(
          'Confirm pack-out requirements before units leave production.',
          'Plan delivery timing around launch dates, retail windows or campaign drops.',
          'Keep reorder notes so successful production details are easy to repeat.',
        ),
        Illustration: DeliveryIllustration,
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
    ctaIllustration: PackagingIllustration,
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
      'Private label perfume oil and attar-style manufacturing for brands building oil-first fragrance lines, including GCC-relevant scent directions, sampling, bottles, branding, filling and documentation support from a 100-unit production MOQ.',
    eyebrowPrefix: 'PERFUME OIL',
    heroIllustration: FragranceFamilyIllustration,
    keyFacts: {
      title: 'Perfume oil launch facts',
      description:
        'Perfume oils need careful format, bottle and claim decisions, especially for brands selling into GCC and Muslim-majority markets.',
      facts: defaultKeyFacts({ format: 'Perfume oil and attar-style formats', market: 'GCC and global' }),
    },
    answerBlocks: [
      {
        id: 'what-is-private-label-perfume-oil',
        question: 'What is private label perfume oil manufacturing?',
        answer:
          'Private label perfume oil manufacturing helps a brand sell oil-based fragrance, attar-style products or roll-on formats under its own name. The process includes scent sampling, format selection, bottle and applicator choices, branding, filling, quality checks and documentation support before commercial launch.',
        detail:
          'The oil format changes how customers apply fragrance, how packaging feels in hand and how claims should be discussed for the destination market.',
      },
      {
        id: 'why-are-perfume-oils-relevant-to-gcc',
        question: 'Why are perfume oils relevant for GCC fragrance brands?',
        answer:
          'Perfume oils and attar-style formats are commercially relevant in GCC markets because many customers already understand concentrated, intimate and layering-friendly fragrance rituals. Brandsamor can support oud, amber, musk and oriental directions without inventing market claims or promising universal halal status.',
        detail:
          'Halal certification support is available where the project requires it, but the correct pathway depends on formula, carrier, documentation and destination rules.',
      },
    ],
    sections: [
      {
        id: 'oil-format-strategy',
        title: 'When should a brand choose perfume oil instead of spray perfume?',
        description:
          'Perfume oil works when your customer expects close-wearing fragrance, layering rituals, travel-friendly packaging or an attar-inspired product experience. It is not simply a cheaper version of eau de parfum. Oil changes the application method, texture, bottle choice and retail story. If your brand already sells skincare, wellness, modest fashion, oud or gifting products, a private label oil can feel more natural than a spray-first launch. Compare formats on the [fragrance products](/fragrance-products) page before choosing.',
        bullets: sectionBullets(
          'Choose oils for close-to-skin wear, layering and compact packaging.',
          'Choose sprays when projection, misting and classic perfume presentation matter more.',
          'Let customer ritual and channel expectations guide the format decision.',
        ),
        Illustration: BodyMistIllustration,
      },
      {
        id: 'gcc-scent-direction',
        title: 'Which scent directions fit GCC and attar-style positioning?',
        description:
          'GCC-relevant perfume oil lines often lean into oud, amber, musk, rose, saffron, vanilla, spice, incense and resinous warmth. That does not mean every product must be heavy or traditional. A modern oil line might combine fresh citrus with musk, soft florals with amber or clean woods with subtle sweetness. Brandsamor starts with a brief and curated [fragrance sampling](/fragrance-sampling), so the scent direction can reflect your customer rather than a generic idea of Arabic perfume.',
        bullets: sectionBullets(
          'Use oud and amber thoughtfully, not as automatic decoration.',
          'Consider layering sets when your audience understands fragrance wardrobes.',
          'Balance regional familiarity with your brand voice and price point.',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'oil-packaging',
        title: 'What packaging decisions matter for perfume oil?',
        description:
          'Perfume oil packaging must match viscosity, application style and brand perception. Roll-ons, dabbers and small glass bottles each communicate something different. A simple label may work for a value-driven oil, while a carton or gift-ready box may be important for premium attar positioning. The best packaging choice depends on channel: ecommerce needs secure shipping, boutiques need shelf clarity and gifting products need presentation. Review [packaging and branding](/packaging-branding) before choosing decoration.',
        bullets: sectionBullets(
          'Match applicator style to customer habit and product viscosity.',
          'Keep label information legible on smaller oil bottles.',
          'Use outer packaging when giftability or premium positioning justifies the cost.',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'halal-and-documentation',
        title: 'How should halal and documentation be handled?',
        description:
          'Perfume oil brands should be careful with claims. Brandsamor can support IFRA, GMP, ISO 22716, MoCRA documentation, COA and halal certification support where the project requires it. That is different from saying every oil is automatically halal certified. The formula, carrier, ingredient documentation, production pathway and market requirements all matter. Honest framing protects the brand and helps customers understand what is actually supported.',
        bullets: sectionBullets(
          'Discuss halal certification support before making label or product page claims.',
          'Confirm which documents your destination market or retailer expects.',
          'Avoid broad compliance language that the specific project cannot support.',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'oil-moq-pricing',
        title: 'What MOQ and pricing apply to perfume oils?',
        description:
          'Brandsamor production starts at 100 units, and indicative pricing starts from $10 per unit depending on format, bottle, decoration, packaging and quantity. Perfume oils may have different cost drivers than sprays because the bottle, applicator, fill size, carrier and fragrance load can differ. A first oil batch should be scoped around the sales channel and reorder plan, not only the lowest possible component cost.',
        bullets: sectionBullets(
          'Use 100 units to test the oil concept before expanding the range.',
          'Model price around fill size, bottle feel and expected application ritual.',
          'Plan reorders around scent winners rather than launching too many oils at once.',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'oil-production',
        title: 'What happens after a perfume oil is approved?',
        description:
          'After fragrance, packaging, artwork and production details are approved, typical production takes 3-6 weeks. During that stage, the focus shifts from creative selection to repeatability: filling, bottle closure, label placement, pack-out, quality review and delivery coordination. For oils sold across borders, documentation and shipping expectations should be clarified before production release so the finished units are aligned with the intended market.',
        bullets: sectionBullets(
          'Approve the oil sample and packaging system before production starts.',
          'Confirm label copy, carton artwork and any certificate requirements early.',
          'Keep production notes for reorders if the first batch sells well.',
        ),
        Illustration: ProductionIllustration,
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
        'Available samples are normally dispatched within 2-3 business days. Delivery timing depends on destination and shipping service.',
      ),
      faq(
        'Can I sell perfume oil outside the GCC?',
        'Yes, perfume oils can be planned for global customers, subject to destination, product, logistics and compliance requirements.',
      ),
    ],
    ctaTitle: 'Create a private label perfume oil line',
    ctaDescription:
      'Tell us your customer, scent direction, market and preferred oil format. We will help shape a sample-first path for your first 100-unit production batch.',
    ctaIllustration: DeliveryIllustration,
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
      'Perfume filling services for brands that already have a formula, fragrance concentrate or approved scent direction and need help turning it into finished, packaged units with quality checks and documentation-aware production planning.',
    eyebrowPrefix: 'FILLING',
    heroIllustration: ProductionIllustration,
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
          'Perfume filling services help a brand put an existing fragrance formula, approved concentrate or selected scent into bottles, closures and packaging. The work can include fill planning, component coordination, label or carton finishing, quality checks and production documentation for sale or distribution.',
        detail:
          'This route is different from full scent discovery. It assumes the fragrance direction is already known or close to approval.',
      },
      {
        id: 'who-needs-filling-services',
        question: 'Who needs perfume filling instead of private label development?',
        answer:
          'Perfume filling is the better fit when your brand already has a formula, supplier-approved scent or concentrate and mainly needs finished goods. Private label development is better when you still need help choosing fragrance direction, product format and packaging strategy.',
        detail:
          'If you are not sure which route fits, the first question is whether your formula and documentation package are truly production-ready.',
      },
    ],
    sections: [
      {
        id: 'formula-readiness',
        title: 'What should you prepare before requesting perfume filling?',
        description:
          'A filling project starts with evidence, not just a scent idea. You should know who owns the formula, whether the concentrate is available, what documentation already exists, what fill size is planned and whether the bottle, pump and closure have been selected. If those details are missing, Brandsamor may recommend a broader [contract perfume manufacturing](/contract-perfume-manufacturing) or private label path first. Clear inputs reduce quoting delays and help avoid compatibility surprises later.',
        bullets: sectionBullets(
          'Clarify formula ownership and what materials will be supplied.',
          'Share available IFRA, COA, allergen or formula-related documents early.',
          'Confirm whether the project needs filling only or full packaging coordination.',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'component-compatibility',
        title: 'Why do bottle and pump choices matter for filling?',
        description:
          'Perfume filling is only successful when the fragrance, bottle, pump, cap, label and carton work together. A beautiful bottle can create problems if the spray pump does not fit, the label surface is difficult, the cap is delayed or the carton does not protect the product in transit. Brands that already own packaging should verify component specifications before assuming the filling step will be simple. Packaging compatibility is part of commercial quality, not a minor detail.',
        bullets: sectionBullets(
          'Check bottle neck, pump fit and closure compatibility before production.',
          'Confirm label material and decoration method for the bottle surface.',
          'Make sure cartons or shipping packs protect the finished product.',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'filling-quality-checks',
        title: 'What quality checks matter in perfume filling?',
        description:
          'Filling quality is visible to customers. Fill level, leakage risk, spray function, cap fit, label alignment, carton condition and batch information all influence trust. Brandsamor can coordinate checks appropriate to the project and product format. The goal is not to make filling sound complicated; it is to make sure the finished units look and perform consistently enough for ecommerce, retail, gifting or reorder use.',
        bullets: sectionBullets(
          'Review fill level, spray test and closure fit as practical quality points.',
          'Check label alignment and packaging appearance before delivery.',
          'Keep batch and documentation records organized for future reorders.',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'filling-documentation',
        title: 'What documents can support a filling project?',
        description:
          'Documentation depends on whether the formula, concentrate and finished product information are available. Brandsamor can support IFRA, GMP, ISO 22716, MoCRA documentation, COA and halal certification support where the project requires it. If you bring your own formula, the existing documentation package matters. Missing formula information can limit what can be confirmed, quoted or claimed for the finished product.',
        bullets: sectionBullets(
          'Provide existing formula and concentrate documentation before quoting.',
          'Identify destination markets and sales channels before label claims are finalized.',
          'Use honest compliance language rather than unsupported approval claims.',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'filling-moq-timeline',
        title: 'What MOQ and timeline apply to perfume filling?',
        description:
          'Brandsamor production starts at 100 units, and typical production takes 3-6 weeks after fragrance, packaging, artwork and production details are approved. Filling-only projects may feel simpler, but they still require component readiness, documentation review and production scheduling. Indicative pricing starts from $10 per unit for entry private label projects, with final filling quotes depending on format, packaging, quantity and what the brand supplies.',
        bullets: sectionBullets(
          'Plan around a 100-unit starting MOQ for production.',
          'Do not start the timeline clock until approvals and components are ready.',
          'Expect final pricing to reflect handling, format, packaging and documentation needs.',
        ),
        Illustration: ProcessTimelineIllustration,
      },
      {
        id: 'after-filling',
        title: 'What happens after bottles are filled?',
        description:
          'After filling, the project moves into finishing and delivery coordination. That can include cap application, label or carton completion, quality review, packing and shipment planning. If your brand is preparing for a launch date, event or retail delivery, the handoff matters as much as the filling itself. Finished perfume should arrive in a condition that supports selling, photographing, gifting or forwarding to a fulfillment partner.',
        bullets: sectionBullets(
          'Confirm carton count, packing method and delivery address before release.',
          'Align production completion with campaign dates or retail windows.',
          'Save the approved specifications so the next filling run is easier.',
        ),
        Illustration: DeliveryIllustration,
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
    ctaIllustration: ComplianceDocIllustration,
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
      'Private label perfume pricing starts from $10 per unit at Brandsamor, with production MOQ from 100 units. The final quote depends on fragrance format, bottle, closure, decoration, packaging, order quantity, destination and documentation needs.',
    eyebrowPrefix: 'PRICING',
    heroIllustration: LaunchPlanningIllustration,
    keyFacts: {
      title: 'Pricing facts',
      description:
        'Pricing should be planned around your retail price, margin and first-batch risk, not only the lowest possible unit cost.',
      facts: defaultKeyFacts({ format: 'Private label fragrance pricing' }),
    },
    answerBlocks: [
      {
        id: 'how-much-private-label-perfume-costs',
        question: 'How much does private label perfume cost?',
        answer:
          'Brandsamor private label perfume pricing starts from $10 per unit for entry projects. Final cost depends on format, bottle size, closure, decoration, outer packaging, quantity, destination and documentation needs, so a quote is built around your actual launch scope and goals.',
        detail:
          'The starting price is useful for planning, but it should not be treated as a universal price for every bottle, format or packaging ambition.',
      },
      {
        id: 'why-pricing-varies',
        question: 'Why does private label perfume pricing vary so much?',
        answer:
          'Perfume pricing varies because the finished unit is a system: fragrance, alcohol or oil base, bottle, pump, cap, label, carton, decoration, packing and documentation. Changing one part can affect cost, lead time, freight weight and retail positioning at the same time.',
        detail:
          'The most expensive-looking option is not always the most profitable. The right packaging choice is the one your customer values enough to pay for.',
      },
    ],
    sections: [
      {
        id: 'starting-price',
        title: 'What does "from $10 per unit" include?',
        description:
          'The $10 starting point is an indicative entry price for private label fragrance projects, not a flat promise for every SKU. It is most relevant when the project uses practical components, a straightforward format and packaging choices that do not add unusual decoration or handling. It gives founders a real planning anchor before discussing details. Your final quote still depends on the approved scent, bottle, cap, pump, label, carton, quantity, destination and documentation requirements.',
        bullets: sectionBullets(
          'Use the $10 starting point for early margin planning.',
          'Expect upgrades in bottle, cap, carton or decoration to change the quote.',
          'Confirm final pricing only after the production scope is defined.',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'format-cost',
        title: 'How does product format affect perfume pricing?',
        description:
          'Eau de parfum, perfume oil, body mist, travel spray, room spray and gift sets each carry different cost logic. A small oil bottle may use a different applicator and fill process than a spray perfume. A mist may need a different bottle and pump. A gift set adds multiple components and assembly decisions. Review [fragrance products](/fragrance-products) before choosing format, because the format influences not only cost but also how customers use and value the product.',
        bullets: sectionBullets(
          'Choose EDP when classic perfume presentation and perceived value matter.',
          'Choose oils for close-wearing formats, layering or attar-style positioning.',
          'Choose mists or travel sizes when accessibility and repeat use matter more.',
        ),
        Illustration: BodyMistIllustration,
      },
      {
        id: 'packaging-cost',
        title: 'How much do bottle and packaging choices matter?',
        description:
          'Packaging can make or break the economics of a first launch. Heavy glass, specialty caps, coatings, screen printing, rigid boxes and inserts can improve perceived value, but they also increase cost and sometimes lead time. Label-first packaging can still look premium when the artwork, bottle proportion and carton choices are disciplined. Brandsamor helps brands compare [packaging and branding](/packaging-branding) options against retail price so the product looks credible without damaging margin.',
        bullets: sectionBullets(
          'Start with packaging that supports your retail price and channel.',
          'Add decoration only when it helps customers understand value.',
          'Consider freight weight and damage risk, not only shelf appearance.',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'moq-and-cash-flow',
        title: 'How does MOQ affect total launch budget?',
        description:
          'Brandsamor production starts at 100 units. That MOQ helps control total launch budget because you are not forced into thousands of bottles before seeing demand. Unit cost may improve at higher quantities, but a low unit price does not help if inventory sits unsold. The first pricing question should be: how many units can your channel realistically sell, and what margin do you need after packaging, shipping, marketing and fulfillment?',
        bullets: sectionBullets(
          'Use 100 units to validate scent, packaging and price before scaling.',
          'Compare unit savings against cash tied up in inventory.',
          'Plan reorder timing before the first batch sells out.',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'documentation-cost',
        title: 'Can documentation affect pricing?',
        description:
          'Documentation can affect project planning because different markets and claims require different support. Brandsamor can support IFRA, GMP, ISO 22716, MoCRA documentation, Certificate of Analysis and halal certification support where relevant. This does not mean every project needs every document. The right approach is to identify the destination market, sales channel and claims early, then quote the project with the appropriate support rather than adding it late.',
        bullets: sectionBullets(
          'Ask retailers or marketplaces what documentation they expect.',
          'Discuss halal certification support before making halal-facing claims.',
          'Use specific documentation language instead of broad approval language.',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'pricing-model',
        title: 'How should you model retail price and margin?',
        description:
          'A perfume line should be priced from the customer backward and the cost forward. Start with the retail price your audience can accept, then test whether the bottle, packaging, fill size and documentation choices leave enough margin after production, freight, transaction fees and marketing. A product can be beautiful and still be commercially weak if the packaging consumes too much margin. The best first quote supports a repeatable business, not only a launch photo.',
        bullets: sectionBullets(
          'Set a target retail price before choosing premium packaging upgrades.',
          'Include fulfillment, shipping, ads, returns and platform fees in margin planning.',
          'Protect cash for reorder if the first batch sells faster than expected.',
        ),
        Illustration: ProcessTimelineIllustration,
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
        'Brandsamor production starts at 100 units. Sampling is available before production and does not require a 100-unit production order.',
      ),
      faq(
        'Why might my quote be higher than $10 per unit?',
        'Your quote may be higher if the project uses premium bottles, special caps, complex decoration, cartons, gift packaging, additional handling or specific documentation support.',
      ),
      faq(
        'Are samples included in production pricing?',
        'Samples are a separate pre-production step. Available samples are normally dispatched in 2-3 business days so you can evaluate scent before approving production.',
      ),
      faq(
        'Does Brandsamor publish pricing to be transparent?',
        'Yes. The from-$10 starting point and 100-unit MOQ give founders a planning baseline, while final quotes still reflect the real project details.',
      ),
    ],
    ctaTitle: 'Get a practical private label perfume quote',
    ctaDescription:
      'Share your format, target retail price, packaging direction and quantity. We will help translate the idea into a quoteable launch scope.',
    ctaIllustration: DeliveryIllustration,
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
      'A practical guide to perfume MOQ for founders and brand teams. Brandsamor production starts at 100 units, giving you a clear first-batch option before scaling into larger fragrance runs.',
    eyebrowPrefix: 'MOQ GUIDE',
    heroIllustration: LaunchPlanningIllustration,
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
          'Perfume MOQ means minimum order quantity: the smallest production batch a supplier will make. Brandsamor production starts at 100 units, so a brand can move from samples to a manageable first run instead of committing to thousands of bottles up front.',
        detail:
          'MOQ exists because production requires setup, components, filling, packaging and quality checks. The goal is to choose a minimum that supports learning without creating unnecessary inventory risk.',
      },
      {
        id: 'why-does-moq-vary',
        question: 'Why do perfume MOQs vary by supplier?',
        answer:
          'Perfume MOQs vary because suppliers use different fragrance libraries, factories, component sources, decoration methods and business models. A stock bottle with label branding can support lower quantities, while custom molds, special decoration and new formulas usually require higher commitments from buyers.',
        detail:
          'When comparing suppliers, ask what the MOQ includes. A low number is only useful if it includes the product format, packaging and documentation you actually need.',
      },
    ],
    sections: [
      {
        id: 'brandsamor-100-unit-moq',
        title: 'What is the Brandsamor MOQ?',
        description:
          'Brandsamor production MOQ starts at 100 units. That number should be read clearly: samples can be ordered before production, but once you approve the project and move into production, the starting quantity is 100 units. This is designed for brands that want real finished goods for launch testing, creator drops, boutique retail, ecommerce validation or gifting programs without taking on a warehouse full of unproven inventory.',
        bullets: sectionBullets(
          'Sampling comes first, with available samples normally dispatched in 2-3 business days.',
          'Production starts at 100 units after approvals are complete.',
          'Typical production is 3-6 weeks after fragrance, packaging, artwork and details are approved.',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'moq-and-packaging',
        title: 'How do packaging choices affect MOQ?',
        description:
          'Packaging can affect MOQ because every component has its own sourcing and production logic. A stock bottle and label can be practical at lower quantities. A custom cap, special coating, screen print, rigid box or unusual insert may require higher component commitments or longer lead times. If your goal is to use Brandsamor as a [low MOQ perfume manufacturer](/low-moq-perfume-manufacturer), keep the first packaging system elegant, repeatable and aligned with a 100-unit validation batch.',
        bullets: sectionBullets(
          'Stock components usually support lower-MOQ launch planning.',
          'Custom decoration can increase cost, setup requirements or component minimums.',
          'Packaging ambition should match the first batch sales plan.',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'moq-and-unit-cost',
        title: 'Does a higher MOQ always save money?',
        description:
          'Higher quantities can reduce some per-unit costs, but they also increase total spend, storage needs and inventory risk. A 1,000-unit order with a lower unit cost can still be a worse business decision than a 100-unit order if the scent or channel is unproven. Brandsamor publishes indicative pricing from $10 per unit so brands can model the first batch and then decide whether a reorder or larger run makes sense after customer response.',
        bullets: sectionBullets(
          'Compare total cash outlay, not only unit cost.',
          'Use first-batch feedback to decide whether larger runs are justified.',
          'Avoid overbuying packaging before the product-market fit is clearer.',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'moq-by-format',
        title: 'Do perfume oils, mists and sprays have different MOQ considerations?',
        description:
          'The confirmed Brandsamor production starting point is 100 units, but each format has different practical considerations. Eau de parfum may depend on bottle, pump and carton choices. Perfume oils may depend on applicator and carrier decisions. Body mists may use different bottle and spray systems. Room sprays or gift sets can add components that change quoting. MOQ planning should always happen alongside the [fragrance products](/fragrance-products) and packaging decision, not after.',
        bullets: sectionBullets(
          'Choose format based on customer use case and channel expectations.',
          'Check whether each format needs different packaging or documentation.',
          'Avoid launching too many formats before one hero SKU proves demand.',
        ),
        Illustration: BodyMistIllustration,
      },
      {
        id: 'moq-documents',
        title: 'Do low-MOQ batches still need documentation?',
        description:
          'Yes. A smaller batch can still need documentation if the sales channel, destination or product claims require it. Brandsamor can support IFRA, GMP, ISO 22716, MoCRA documentation, COA and halal certification support where relevant. Low MOQ is about batch size, not about skipping responsible production planning. The right documents should be discussed before label copy and claims are finalized.',
        bullets: sectionBullets(
          'Match documentation to product, destination and claim language.',
          'Keep certificate requests specific rather than asking for every document by default.',
          'Do not use unsupported approval claims in product listings or packaging.',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'moq-reorder-strategy',
        title: 'How should you plan the reorder after a 100-unit launch?',
        description:
          'Your reorder strategy should be decided before the first batch sells out. Track sell-through by channel, customer comments, scent preferences, return reasons and packaging feedback. If the 100-unit batch performs well, you may reorder the same SKU, increase quantity or add a second scent. If it underperforms, the smaller MOQ gives you room to adjust without being trapped by excess inventory. MOQ is a learning tool when used intentionally.',
        bullets: sectionBullets(
          'Set a reorder trigger based on inventory level and production timeline.',
          'Keep approved artwork and component details organized.',
          'Scale the strongest SKU before expanding into a broad collection.',
        ),
        Illustration: ProcessTimelineIllustration,
      },
    ],
    comparison: {
      id: 'moq-planning-table',
      title: 'How to think about 100, 500 and 1,000 unit perfume runs',
      description:
        'The right MOQ is not always the largest batch you can afford. Use this guide to match quantity to risk and market confidence.',
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
        'Yes. Available samples are normally dispatched in 2-3 business days, and sampling happens before production commitment.',
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
      'Tell us your channel, target retail price and expected first-batch quantity. We will help you decide whether 100 units is the right starting point.',
    ctaIllustration: DeliveryIllustration,
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
      'An honest guide to choosing the best private label perfume manufacturer for your situation. Compare Brandsamor, US contract houses, China OEM marketplaces, EU niche labs and regional GCC fillers without assuming one model is best for everyone.',
    eyebrowPrefix: 'MANUFACTURERS',
    heroIllustration: BrandBriefIllustration,
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
          'The best private label perfume manufacturer depends on your stage. Brandsamor is a strong fit for low-MOQ launches from 100 units with sampling and packaging support. Larger contract houses, EU labs, GCC fillers or China OEM suppliers may fit other needs better.',
        detail:
          'A useful shortlist starts with your order size, market, formula needs, documentation expectations, budget and how much supplier management you can handle internally.',
      },
      {
        id: 'when-to-choose-brandsamor',
        question: 'When should a brand choose Brandsamor?',
        answer:
          'Choose Brandsamor when you want to sample first, start production from 100 units, keep pricing practical from an indicative $10 per unit, and receive help coordinating scent, packaging, filling, quality checks and documentation-aware launch planning for a focused first batch.',
        detail:
          'Brandsamor is not positioned as the answer for every enterprise brief. It is built for brands that need a guided, commercial path into fragrance.',
      },
    ],
    sections: [
      {
        id: 'how-to-shortlist-manufacturers',
        title: 'How should you shortlist private label perfume manufacturers?',
        description:
          'Start with fit, not logos. A manufacturer that works beautifully for a global beauty company may be wrong for a founder testing 100 units. A marketplace supplier with a low headline price may be wrong if you need documentation support and packaging guidance. Shortlist suppliers by MOQ, sample process, communication, packaging capability, documentation support, production timeline, cost transparency and reorder planning. Then ask whether each model matches your actual launch risk.',
        bullets: sectionBullets(
          'Confirm MOQ, sample timing and production lead time in writing.',
          'Ask what documentation is available for your product and destination.',
          'Compare total launch support, not only unit price.',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'brandsamor-best-fit',
        title: 'Where is Brandsamor the best fit?',
        description:
          'Brandsamor is best for brands that want a guided private label path with low-MOQ production from 100 units. It is especially relevant when you need curated [fragrance sampling](/fragrance-sampling), help choosing practical [packaging and branding](/packaging-branding), and a first batch that does not require enterprise inventory risk. The service is operated by Packamor LLC in Delaware and supports global customers subject to product, destination, logistics and compliance requirements.',
        bullets: sectionBullets(
          'Good fit for first launches, creator lines, boutiques, beauty brands and gifting concepts.',
          'Good fit when you want to compare scents before approving production.',
          'Good fit when a 100-unit MOQ is commercially safer than a large opening order.',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'us-contract-houses',
        title: 'When are US contract houses a better choice?',
        description:
          'US contract houses can be a better choice for established US brands with higher volumes, internal operations teams, domestic vendor requirements or complex retail onboarding processes. They may offer strong production controls and formal account management, but they often expect clearer specifications, larger budgets and higher MOQs. If your brand already has purchase orders, forecasts and a mature supply chain process, a US contract house may be worth evaluating alongside Brandsamor.',
        bullets: sectionBullets(
          'Consider US contract houses for larger repeat programs and domestic procurement needs.',
          'Expect onboarding and minimums to vary significantly by supplier.',
          'Ask whether they support small first launches before spending time on a quote.',
        ),
        Illustration: ProductionIllustration,
      },
      {
        id: 'china-oem-marketplaces',
        title: 'When do China OEM marketplaces make sense?',
        description:
          'China OEM marketplaces can make sense for experienced sourcing teams that know how to vet suppliers, compare samples, inspect quality, handle freight and manage communication across time zones. They can be cost-competitive, especially for component-heavy products, but marketplace listings vary widely. The burden of supplier verification sits heavily on the buyer. If you choose this route, ask detailed questions about formula status, documentation, packaging specifications, defect handling and reorder consistency.',
        bullets: sectionBullets(
          'Use marketplaces only if you can manage supplier due diligence.',
          'Confirm sample quality, production quality and packaging consistency separately.',
          'Avoid choosing on headline unit price without freight, duties and risk planning.',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'eu-and-gcc-options',
        title: 'When are EU niche labs or regional GCC fillers better?',
        description:
          'EU niche labs can be a better choice for brands prioritizing perfumer-led creative development, European positioning or a longer custom fragrance process. Regional GCC fillers can be useful for brands focused on oud, attar, local distribution and Gulf customer expectations. Both models can be excellent in the right context, but capabilities, MOQs, documentation and export readiness vary. The best choice depends on market focus and how much custom development your budget can support.',
        bullets: sectionBullets(
          'Consider EU labs for premium creative development and niche fragrance positioning.',
          'Consider GCC fillers for regional oil, attar or oud-centered commercial needs.',
          'Verify documentation, export support and reorder process before committing.',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'when-not-to-choose-brandsamor',
        title: 'When should you not choose Brandsamor?',
        description:
          'Do not choose Brandsamor if you need a fully bespoke perfumer-led R&D process with no starting library, proprietary formula ownership as the main requirement, custom glass tooling for a very large launch, or a procurement process built only for enterprise-scale manufacturers. Also do not choose a low-MOQ path if your team already has proven demand and needs thousands of units on a strict institutional supply contract. In those cases, a specialized lab or large contract house may serve you better.',
        bullets: sectionBullets(
          'Not ideal when formula ownership is the central commercial asset.',
          'Not ideal when custom molds and large-scale tooling are already approved.',
          'Not ideal when procurement requires a very specific enterprise manufacturing profile.',
        ),
        Illustration: ComplianceDocIllustration,
      },
    ],
    comparison: manufacturerComparison,
    faqTitle: 'Best private label perfume manufacturers FAQ',
    faqDescription:
      'A practical comparison FAQ for founders and brand teams choosing a fragrance production partner.',
    faqItems: [
      faq(
        'Is Brandsamor the best private label perfume manufacturer?',
        'Brandsamor is best for low-MOQ, sample-first private label launches. It may not be best for every custom R&D, enterprise or very large-volume project.',
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
        'Production starts at 100 units, indicative pricing starts from $10 per unit, samples dispatch in 2-3 business days and production is typically 3-6 weeks after approvals.',
      ),
    ],
    ctaTitle: 'Choose the manufacturer model that fits your launch',
    ctaDescription:
      'Tell us your order size, market, formula needs and packaging goals. If Brandsamor is not the right fit, the comparison will still help you choose a better route.',
    ctaIllustration: QualityCheckIllustration,
    relatedLinks: [
      { to: '/low-moq-perfume-manufacturer', label: 'Low MOQ perfume manufacturer' },
      { to: '/contract-perfume-manufacturing', label: 'Contract perfume manufacturing' },
      { to: '/us-vs-china-vs-europe-perfume-manufacturing', label: 'US vs China vs Europe perfume manufacturing' },
      { to: '/brandsamor-vs-alibaba-perfume-suppliers', label: 'Brandsamor vs Alibaba perfume suppliers' },
      ...moneyPageRelatedLinks,
    ],
  }),
};
