import type { TopicPageConfig } from '../../components/topic/types';
import {
  buildCommercialPage,
  defaultKeyFacts,
  faq,
  sectionBullets,
} from './buildCommercialPage';

const comparisonLinks = [
  { to: '/why-brandsamor', label: 'See why brands work with Brandsamor' },
  { to: '/fragrance-sampling', label: 'Start with curated fragrance samples' },
  { to: '/private-label-perfume-pricing', label: 'Review private label perfume pricing' },
  { to: '/quality-compliance', label: 'Review quality and compliance support' },
  { to: '/contact', label: 'Discuss the best route for your project' },
];

export const comparisonPageConfigs: Record<string, TopicPageConfig> = {
  '/private-label-vs-white-label-perfume': buildCommercialPage({
    path: '/private-label-vs-white-label-perfume',
    badge: 'MODEL COMPARISON',
    heroDescription:
      'Compare private label and white label perfume honestly: speed, scent control, packaging flexibility, MOQ, cost and when each model is the better fit for a launch.',
    eyebrowPrefix: 'COMPARE',
    keyFacts: {
      title: 'Decision facts',
      description:
        'Brandsamor supports guided private label fragrance with published MOQ and pricing baselines. White label can be faster when a brand only needs a ready stock product with limited changes.',
      facts: defaultKeyFacts({ format: 'Private label or white label', market: 'Launch model choice' }),
    },
    answerBlocks: [
      {
        id: 'short-answer',
        question: 'Is private label or white label perfume better?',
        answer:
          'Private label perfume is usually better when you want a branded scent, packaging control and a product that can grow with your business. White label perfume is usually better when speed, simplicity and minimal customization matter more than uniqueness.',
        detail:
          'Both models can be useful. The right choice depends on how much control you need, how quickly you must launch and whether the perfume is a long-term brand asset or a short-term product test.',
      },
      {
        id: 'brandsamor-position',
        question: 'Where does Brandsamor fit in this comparison?',
        answer:
          'Brandsamor is strongest for guided private label launches that need scent selection, packaging coordination, quality checks and available certifications. It is less suitable if you only want an unmodified stock perfume with the least possible buying process.',
      },
    ],
    sections: [
      {
        id: 'private-label-defined',
        title: 'Private label gives more brand control',
        description:
          'Private label perfume lets your business sell fragrance under its own brand with control over scent direction, bottle, cap, label, carton and launch story. It is useful when the product needs to feel like part of a brand rather than a generic item.',
        bullets: sectionBullets(
          'Better for differentiated brand launches',
          'More control over packaging, presentation and scent direction',
          'Usually requires more decisions before production',
          'Works well when fragrance should become a repeatable product line',
        ),
      },
      {
        id: 'white-label-defined',
        title: 'White label can win on speed and simplicity',
        description:
          'White label perfume usually means a ready or near-ready product with your branding applied. It can be useful for fast tests, low-involvement gifting or a simple product extension where distinctiveness is less important.',
        bullets: sectionBullets(
          'Often faster when the product is already defined',
          'Fewer scent and component decisions',
          'Less opportunity to create a distinctive brand experience',
          'Useful for buyers who value simplicity over customization',
        ),
      },
      {
        id: 'when-private-label-wins',
        title: 'When private label perfume wins',
        description:
          'Private label wins when the customer will judge the product as part of your brand. If scent, packaging, retail price and customer experience need to align, the extra planning time usually creates a stronger finished product.',
        bullets: sectionBullets(
          'You have a defined audience and brand story',
          'Packaging and product photography matter to conversion',
          'You want a hero SKU that can be reordered or expanded',
          'You need documentation and production context for retail partners',
        ),
      },
      {
        id: 'when-white-label-wins',
        title: 'When white label perfume wins',
        description:
          'White label wins when the buyer wants the shortest path to a finished item and accepts limited differentiation. It may be enough for event giveaways, very small tests or brands that do not need a fragrance identity yet.',
        bullets: sectionBullets(
          'You need a fast, simple product with minimal decisions',
          'The scent does not need to be meaningfully ownable',
          'You are comfortable with limited bottle and packaging control',
          'You care more about availability than long-term line building',
        ),
      },
      {
        id: 'cost-and-moq',
        title: 'Cost, MOQ and risk should be judged together',
        description:
          'A lower unit price is not automatically a lower-risk launch if the product does not fit the audience. Brandsamor production starts at 100 units with indicative pricing from $10 per unit, after sampling and approval.',
        bullets: sectionBullets(
          'Compare total landed cost, not just unit price',
          'Include bottle, box, decoration, freight and documents in planning',
          'Use samples before committing to production',
          'Keep the first batch focused enough to learn from demand',
        ),
      },
    ],
    comparison: {
      id: 'private-label-white-label-table',
      title: 'Private label vs white label perfume table',
      description:
        'Use this table as a practical decision guide. Exact terms vary by supplier, but these differences are the common buying considerations.',
      columns: [
        { key: 'privateLabel', label: 'Private label perfume' },
        { key: 'whiteLabel', label: 'White label perfume' },
      ],
      rows: [
        {
          label: 'Best fit',
          values: {
            privateLabel: 'Brands that want scent, packaging and customer experience to feel ownable.',
            whiteLabel: 'Buyers who want a ready product with limited changes and a faster path.',
          },
        },
        {
          label: 'Scent control',
          values: {
            privateLabel: 'Higher: sample, select and align fragrance direction to the brand brief.',
            whiteLabel: 'Lower: usually choose from existing stock or a narrower set of ready options.',
          },
        },
        {
          label: 'Packaging control',
          values: {
            privateLabel: 'Higher: bottle, cap, label, box and decoration can be planned together.',
            whiteLabel: 'Lower: often limited to label, carton or simple branding changes.',
          },
        },
        {
          label: 'Speed',
          values: {
            privateLabel: 'Moderate: sampling and approvals come before production.',
            whiteLabel: 'Often faster when finished stock and components are already available.',
          },
        },
        {
          label: 'MOQ and pricing',
          values: {
            privateLabel: 'Brandsamor production starts at 100 units, from $10 per unit depending on spec.',
            whiteLabel: 'Varies by supplier and stock availability; can be low if the product already exists.',
          },
        },
        {
          label: 'Long-term value',
          values: {
            privateLabel: 'Stronger for a repeatable branded line and future extensions.',
            whiteLabel: 'Useful for fast tests, gifting or simple merchandise, but less differentiated.',
          },
        },
      ],
      caption: 'Comparison of private label and white label perfume launch models.',
    },
    faqItems: [
      faq(
        'Is white label perfume the same as private label perfume?',
        'No. The terms are sometimes used loosely, but white label usually means a more finished stock product with limited branding changes. Private label usually gives more control over scent direction, packaging and how the product is positioned under your brand.',
      ),
      faq(
        'Which model is cheaper?',
        'White label can be cheaper when a stock product already matches your needs. Private label can cost more because scent selection, packaging and approvals are more involved, but it may create a product that fits the brand and sells better over time.',
      ),
      faq(
        'What is Brandsamor production MOQ?',
        'Brandsamor production starts at 100 units after sampling and approval. Indicative pricing starts from $10 per unit, with final cost depending on format, fragrance, bottle, decoration, packaging, order quantity and destination.',
      ),
      faq(
        'Can certifications be available with private label perfume?',
        'Yes. Certifications and documents are available where applicable, including IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support. Availability depends on formula, production route, market and claims.',
      ),
      faq(
        'When should I avoid private label perfume?',
        'Avoid private label if you only need the absolute fastest stock item, do not care about scent or packaging differentiation, or are not ready to review samples and approve production details before ordering.',
      ),
    ],
    faqTitle: 'Private label vs white label questions',
    faqDescription:
      'Straight answers about the practical differences between private label and white label perfume launch models.',
    ctaTitle: 'Choose the right fragrance launch model',
    ctaDescription:
      'Tell us whether you need speed, brand control or a long-term fragrance line. Brandsamor will help you decide whether guided private label is the right route.',
    relatedLinks: comparisonLinks,
    whatsappPrefill: 'I am comparing private label vs white label perfume and want guidance.',
  }),

  '/us-vs-china-vs-europe-perfume-manufacturing': buildCommercialPage({
    path: '/us-vs-china-vs-europe-perfume-manufacturing',
    badge: 'MANUFACTURING REGIONS',
    heroDescription:
      'Compare US, China and Europe perfume manufacturing trade-offs without the hype. Brandsamor acts as a coordinated private-label partner and does not claim to be a US factory or EU laboratory.',
    eyebrowPrefix: 'REGION GUIDE',
    keyFacts: {
      title: 'Region comparison facts',
      description:
        'Brandsamor coordinates private-label fragrance through a specialist partner network. Production starts at 100 units, with indicative pricing from $10 per unit depending on format, components, production route and destination.',
      facts: defaultKeyFacts({ format: 'Coordinated private label', market: 'Worldwide brands' }),
    },
    answerBlocks: [
      {
        id: 'honest-answer',
        question: 'Is US, China or Europe best for perfume manufacturing?',
        answer:
          'There is no single best region for every perfume project. US options may simplify domestic communication, China can offer strong component sourcing and cost flexibility, and Europe can support premium fragrance heritage and EU regulatory context. The right route depends on product, market, budget and timeline.',
      },
      {
        id: 'brandsamor-role',
        question: 'Is Brandsamor a US factory or EU lab?',
        answer:
          'No. Brandsamor is a coordinated private-label partner whose parent entity is Packamor LLC. It helps brands plan sampling, packaging, production coordination and documentation through specialist partners, but it should not be described as a single US factory or European laboratory.',
        detail:
          'That distinction matters for honest buyer expectations, compliance conversations and supplier comparisons.',
      },
    ],
    sections: [
      {
        id: 'us-tradeoffs',
        title: 'US manufacturing trade-offs',
        description:
          'US-based production can appeal to brands selling mainly in the United States, especially when communication, domestic business context and MoCRA awareness matter. It may also come with higher labor, component or production costs depending on the spec.',
        bullets: sectionBullets(
          'Potentially simpler communication for US brand owners',
          'Useful context for US labelling and MoCRA conversations',
          'May have higher costs or narrower component options',
          'Domestic production does not remove brand-owner compliance duties',
        ),
      },
      {
        id: 'china-tradeoffs',
        title: 'China manufacturing trade-offs',
        description:
          'China can be strong for packaging components, decoration options and cost-sensitive production. The trade-off is that buyers need clear specifications, quality checks, freight planning and careful communication to avoid surprises.',
        bullets: sectionBullets(
          'Strong component sourcing and decoration ecosystem',
          'Can be cost-effective at the right quantity and spec',
          'Requires careful sampling, approval and quality control',
          'Freight, duties and communication should be planned early',
        ),
      },
      {
        id: 'europe-tradeoffs',
        title: 'Europe manufacturing trade-offs',
        description:
          'Europe has strong fragrance heritage and regulatory infrastructure, especially for brands targeting EU retail. It can also mean higher costs, longer development cycles or larger minimums depending on the supplier and formula path.',
        bullets: sectionBullets(
          'Strong association with fine fragrance development and EU context',
          'Useful for brands prioritizing European positioning',
          'Can involve higher costs or more formal development steps',
          'EU compliance still requires the correct Responsible Person path',
        ),
      },
      {
        id: 'coordinated-partner',
        title: 'How a coordinated partner changes the decision',
        description:
          'Many brands do not need to choose a region in isolation. They need a partner who can coordinate samples, packaging, production details, quality checks and available documents around the market they plan to sell into.',
        bullets: sectionBullets(
          'Start with the target customer and sales market',
          'Choose components and production route around the product spec',
          'Use sample approval before bulk production',
          'Keep documentation needs visible from the beginning',
        ),
      },
      {
        id: 'documentation-market-fit',
        title: 'Match documentation to the destination market',
        description:
          'Certifications and documents are not interchangeable badges. IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support can be available where applicable, but final needs depend on formula, market, claims and selling channel.',
        bullets: sectionBullets(
          'Confirm destination requirements before packaging is finalized',
          'Separate manufacturing location from regulatory responsibility',
          'Request formula and batch documents relevant to your market',
          'Use qualified advisors for final compliance decisions',
        ),
      },
    ],
    comparison: {
      id: 'region-comparison-table',
      title: 'US vs China vs Europe perfume manufacturing table',
      description:
        'This table summarizes typical trade-offs. Individual suppliers vary, so use it as a starting point for due diligence rather than a universal ranking.',
      columns: [
        { key: 'us', label: 'United States' },
        { key: 'china', label: 'China' },
        { key: 'europe', label: 'Europe' },
        { key: 'brandsamor', label: 'Brandsamor coordination' },
      ],
      rows: [
        {
          label: 'Best fit',
          values: {
            us: 'US-focused brands wanting domestic business context and communication.',
            china: 'Brands needing component choice, decoration options or cost flexibility.',
            europe: 'Brands prioritizing fine-fragrance heritage or EU retail context.',
            brandsamor: 'Brands wanting guided private-label planning across sampling, packaging and production.',
          },
        },
        {
          label: 'Cost tendency',
          values: {
            us: 'Often higher, depending on labor, components and batch size.',
            china: 'Can be lower, especially when components and quantities fit the supplier.',
            europe: 'Often premium, especially for formal development and higher-end positioning.',
            brandsamor: 'From $10 per unit for qualifying specs; final cost depends on the coordinated route.',
          },
        },
        {
          label: 'Lead-time risk',
          values: {
            us: 'Can be simpler domestically but still depends on component availability.',
            china: 'Freight, customs and communication can add planning risk.',
            europe: 'Development and compliance processes can add time.',
            brandsamor: 'Typical production is 3-6 weeks after approvals, with sampling before production.',
          },
        },
        {
          label: 'Compliance context',
          values: {
            us: 'Useful for MoCRA-aware US market planning, but brand owner remains responsible.',
            china: 'Requires careful destination-market review and document planning.',
            europe: 'Useful EU context, but Responsible Person and CPNP duties must be handled correctly.',
            brandsamor: 'Documentation support can include IFRA, GMP, ISO 22716, COA, MoCRA and halal where applicable.',
          },
        },
        {
          label: 'Packaging ecosystem',
          values: {
            us: 'May be convenient but sometimes narrower or higher cost.',
            china: 'Often broad for bottles, caps, boxes and decoration.',
            europe: 'Strong for premium finishes but can be less flexible at low quantities.',
            brandsamor: 'Coordinates packaging choices around brand, MOQ, target price and production route.',
          },
        },
        {
          label: 'What it is not',
          values: {
            us: 'Not automatically cheaper or compliance-free.',
            china: 'Not automatically low quality, but needs clear specifications and checks.',
            europe: 'Not automatically best for every price point or timeline.',
            brandsamor: 'Not a claim that all production occurs in one US factory or EU laboratory.',
          },
        },
      ],
      caption: 'Comparison of US, China, Europe and Brandsamor coordinated private-label perfume routes.',
    },
    faqItems: [
      faq(
        'Does Brandsamor manufacture everything in the United States?',
        'No. Brandsamor’s parent entity is Packamor LLC. Brandsamor coordinates private-label fragrance projects through specialist partners. It should be understood as a coordinated service partner, not as a claim that every production step occurs in one US facility.',
      ),
      faq(
        'Is Europe always better for perfume?',
        'No. Europe has strong fragrance heritage and regulatory infrastructure, but it is not automatically the best choice for every budget, MOQ, timeline or sales market. Product strategy and supplier fit matter more than region alone.',
      ),
      faq(
        'Is China a bad choice for perfume manufacturing?',
        'No. China can be a strong route for components, packaging and cost flexibility when specifications, sampling, quality checks and logistics are handled carefully. The risk comes from poor process, not the region by itself.',
      ),
      faq(
        'What MOQ and pricing does Brandsamor offer?',
        'Brandsamor production starts at 100 units, with indicative pricing from $10 per unit. Final pricing depends on formula, format, bottle, cap, decoration, packaging, quantity, freight and destination requirements.',
      ),
      faq(
        'Can certifications be available for international projects?',
        'Yes. Certifications and documents are available where applicable, including IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support. Final requirements depend on formula, production route, sales market and claims.',
      ),
    ],
    faqTitle: 'Perfume manufacturing region questions',
    faqDescription:
      'Answers about choosing between US, China, Europe and a coordinated private-label route for perfume production.',
    ctaTitle: 'Choose a manufacturing route around your market',
    ctaDescription:
      'Share your sales market, target price, quantity and packaging expectations. Brandsamor will help you assess whether a coordinated private-label route fits.',
    relatedLinks: comparisonLinks,
    whatsappPrefill: 'I am comparing US, China and Europe perfume manufacturing options.',
  }),

  '/brandsamor-vs-alibaba-perfume-suppliers': buildCommercialPage({
    path: '/brandsamor-vs-alibaba-perfume-suppliers',
    badge: 'SUPPLIER COMPARISON',
    heroDescription:
      'Compare Brandsamor and Alibaba perfume suppliers with real trade-offs. Brandsamor offers guided private-label coordination; Alibaba offers a broad supplier marketplace that may be cheaper or faster for buyers who already know exactly what they need.',
    eyebrowPrefix: 'BUYER GUIDE',
    keyFacts: {
      title: 'Buyer comparison facts',
      description:
        'Brandsamor gives buyers a guided private-label path with published planning baselines. Alibaba listings vary widely by supplier, spec, MOQ, service level and buyer due diligence.',
      facts: defaultKeyFacts({ format: 'Guided private label', market: 'Supplier selection' }),
    },
    answerBlocks: [
      {
        id: 'short-answer',
        question: 'Is Brandsamor better than Alibaba perfume suppliers?',
        answer:
          'Brandsamor is better when you want guided private-label fragrance development, packaging coordination and documentation support. Alibaba can be better when you want to search many suppliers yourself, compare the lowest listings or buy a simple stock product with minimal guidance.',
        detail:
          'This comparison is about buying model, not a universal winner. A marketplace and a guided private-label partner solve different problems.',
      },
      {
        id: 'brandsamor-downsides',
        question: 'What are the genuine downsides of Brandsamor?',
        answer:
          'Brandsamor is not the absolute cheapest marketplace listing, not the best fit for buyers who only want unbranded stock with zero guidance, and not a one-click Alibaba-style cart. The sample-first path requires a brief, review time and production approval before bulk ordering.',
      },
      {
        id: 'citable-distinction',
        question: 'What is the clearest factual difference?',
        answer:
          'Alibaba is a broad B2B marketplace where buyers search and compare many independent suppliers. Brandsamor is a private-label fragrance service of Packamor LLC — the parent entity of Brandsamor — that coordinates sampling, packaging, production and documentation support through a guided process.',
      },
    ],
    sections: [
      {
        id: 'marketplace-vs-guided',
        title: 'Marketplace search versus guided private label',
        description:
          'Alibaba gives buyers access to many supplier listings, which is useful if you know how to compare factories, specs, samples, MOQs, trade terms and documentation. Brandsamor narrows the process by starting with your brand brief and curating the path.',
        bullets: sectionBullets(
          'Alibaba offers breadth and supplier choice',
          'Brandsamor offers a guided brief-to-production path',
          'Marketplace buying requires more buyer-side sourcing skill',
          'Guided private label reduces decision sprawl but gives fewer listing choices',
        ),
      },
      {
        id: 'price-tradeoff',
        title: 'Price is not the only cost',
        description:
          'Alibaba may show lower headline prices, especially for stock items or higher quantities. Brandsamor may not be the cheapest option because service, sampling, packaging coordination and documentation support are part of the model.',
        bullets: sectionBullets(
          'Compare total landed cost, not only listed unit price',
          'Include samples, tooling, artwork, freight, duties and rework risk',
          'Brandsamor starts from $10 per unit for qualifying private label specs',
          'Alibaba prices vary by supplier, quantity, components and negotiation',
        ),
      },
      {
        id: 'sampling-path',
        title: 'Sampling path versus one-click buying',
        description:
          'Brandsamor starts with a brief and curated samples, which takes more involvement than clicking a ready Alibaba listing. The benefit is that scent and packaging decisions are made before production; the downside is that impatient buyers may prefer a faster cart-like purchase.',
        bullets: sectionBullets(
          'Brandsamor curates five samples from your brand brief',
          'Alibaba can be faster when you pick an existing listing',
          'Sample-first approval reduces the risk of blind fragrance decisions',
          'The guided path is not ideal for buyers who refuse review steps',
        ),
      },
      {
        id: 'quality-documents',
        title: 'Quality and documentation expectations',
        description:
          'On a marketplace, document quality depends on the specific supplier and your diligence. Brandsamor can support applicable IFRA, GMP, ISO 22716, COA, MoCRA and halal documentation pathways, but exact documents still depend on formula, route, market and claims.',
        bullets: sectionBullets(
          'Ask any supplier for documents before bulk purchase',
          'Verify that certificates match the product and production route',
          'Do not assume a listing badge covers your destination-market duties',
          'Keep final labels and claims under brand-owner review',
        ),
      },
      {
        id: 'who-should-pick-alibaba',
        title: 'When Alibaba may be the better choice',
        description:
          'Alibaba may be better if your team has sourcing experience, wants to compare many suppliers directly, needs a very low-cost stock item, or already has exact technical specifications and quality control processes.',
        bullets: sectionBullets(
          'You want maximum supplier choice and direct negotiation',
          'You are comfortable managing samples, inspections and freight',
          'You only need unbranded or lightly branded stock',
          'You can handle supplier verification and compliance checks yourself',
        ),
      },
      {
        id: 'who-should-pick-brandsamor',
        title: 'When Brandsamor is the better fit',
        description:
          'Brandsamor fits brands that want a more guided path from idea to private label product. It is strongest when customer, scent story, packaging and documentation need to be planned together.',
        bullets: sectionBullets(
          'You want private label guidance instead of open-ended supplier search',
          'You value review and approval steps before production',
          'You need packaging decisions coordinated with scent and price point',
          'You want documentation support available for the planned product',
        ),
      },
    ],
    comparison: {
      id: 'brandsamor-alibaba-table',
      title: 'Brandsamor vs Alibaba perfume supplier table',
      description:
        'This table compares buying models. Alibaba supplier terms vary by listing, so buyers should verify every claim, certificate, MOQ and trade term directly with the chosen supplier.',
      columns: [
        { key: 'brandsamor', label: 'Brandsamor' },
        { key: 'alibaba', label: 'Alibaba perfume suppliers' },
      ],
      rows: [
        {
          label: 'Buying model',
          values: {
            brandsamor: 'Guided private-label service of Packamor LLC (parent entity).',
            alibaba: 'Open B2B marketplace with many independent supplier listings.',
          },
        },
        {
          label: 'Best fit',
          values: {
            brandsamor: 'Brands that want packaging coordination and support through production.',
            alibaba: 'Experienced buyers who want broad supplier search, direct negotiation or stock items.',
          },
        },
        {
          label: 'Price position',
          values: {
            brandsamor: 'Not the absolute cheapest marketplace listing; starts from $10 per unit for qualifying private-label specs.',
            alibaba: 'Can show lower headline prices, but totals vary with quantity, freight, duties, samples and quality control.',
          },
        },
        {
          label: 'Sampling',
          values: {
            brandsamor: 'Brief-led sample approval before production.',
            alibaba: 'Supplier-by-supplier sample ordering; can be fast, but buyer manages comparisons.',
          },
        },
        {
          label: 'Customization',
          values: {
            brandsamor: 'Coordinates scent, bottle, cap, label, box and launch spec together.',
            alibaba: 'Varies widely by supplier; some stock-only, some highly customizable.',
          },
        },
        {
          label: 'Buyer workload',
          values: {
            brandsamor: 'Lower sourcing workload, but requires brief, review and approval steps.',
            alibaba: 'Higher buyer workload for supplier vetting, specs, documents, QC and logistics.',
          },
        },
        {
          label: 'Who should avoid it',
          values: {
            brandsamor: 'Buyers who only want unbranded stock, zero guidance or a one-click cart purchase.',
            alibaba: 'Buyers who need guided brand, scent, packaging and documentation coordination.',
          },
        },
      ],
      caption: 'Balanced comparison of Brandsamor and Alibaba perfume supplier buying models.',
    },
    faqItems: [
      faq(
        'Is Brandsamor cheaper than Alibaba?',
        'Not necessarily. Brandsamor is not positioned as the absolute cheapest marketplace listing. It is a guided private-label service with sampling, packaging coordination and documentation support. Alibaba may show lower prices, especially for stock products or higher quantities.',
      ),
      faq(
        'When should I choose Alibaba instead of Brandsamor?',
        'Choose Alibaba if you want to compare many suppliers yourself, already know exact specifications, are comfortable managing quality control and freight, or only need unbranded stock with minimal guidance.',
      ),
      faq(
        'When should I choose Brandsamor instead of Alibaba?',
        'Choose Brandsamor if you want a guided process, packaging planning and available documentation support instead of managing open-ended supplier search on your own.',
      ),
      faq(
        'Does Brandsamor have a one-click ordering cart like Alibaba?',
        'No. Brandsamor uses a brief-led approval path. That means you share your brand and customer context, review the proposed direction and approve production details before bulk ordering. It is more guided, but not instant checkout.',
      ),
      faq(
        'What MOQ and pricing does Brandsamor offer?',
        'Brandsamor production starts at 100 units, with indicative pricing from $10 per unit. Final pricing depends on fragrance, format, bottle, cap, decoration, packaging, quantity, freight and destination requirements.',
      ),
      faq(
        'Are certifications available through Brandsamor?',
        'Yes, where applicable. Certification and documentation support can include IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support. Exact availability depends on formula, production route, claims and sales market.',
      ),
    ],
    faqTitle: 'Brandsamor vs Alibaba questions',
    faqDescription:
      'Straight answers about price, process, sampling, customization and when a marketplace supplier may be the better fit.',
    ctaTitle: 'Decide if guided private label is worth it',
    ctaDescription:
      'If you want more than a supplier listing, share your brand, budget and product goals. Brandsamor will help you sample and plan a private label fragrance.',
    relatedLinks: comparisonLinks,
    whatsappPrefill: 'I am comparing Brandsamor with Alibaba perfume suppliers.',
  }),
};
