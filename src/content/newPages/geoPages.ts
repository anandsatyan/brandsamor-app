import {
  buildCommercialPage,
  defaultKeyFacts,
  faq,
  sectionBullets,
} from './buildCommercialPage';
import type { TopicPageConfig } from '../../components/topic/types';

const packamorAddress = 'Packamor LLC (parent entity of Brandsamor), 1111B S Governors Ave, Dover, DE 19904, USA';
const gccWhatsAppNumber = '+971521543617';

export const geoPageConfigs: Record<string, TopicPageConfig> = {
  '/private-label-perfume-manufacturer-uae': buildCommercialPage({
    path: '/private-label-perfume-manufacturer-uae',
    badge: 'UAE PRIVATE LABEL PERFUME',
    heroDescription:
      'Private label perfume for UAE founders, retailers and fragrance houses — sample-first development, MOQ from 100 units, indicative pricing from $10 per unit, and WhatsApp-first coordination for Dubai, Sharjah, Abu Dhabi and re-export through Jebel Ali.',
    eyebrowPrefix: 'UAE LAUNCH',
    showWhatsApp: true,
    whatsappPrefill:
      'Hi Brandsamor, I want to discuss UAE private label perfume. Please share sampling, MOQ, pricing and Dubai Municipality documentation guidance.',
    areaServed: 'AE',
    keyFacts: {
      title: 'UAE private label perfume facts',
      description:
        'USD starting prices help with early comparison. Landed AED planning becomes meaningful once bottle, fragrance, freight and Dubai Municipality registration costs are known.',
      facts: defaultKeyFacts({ market: 'United Arab Emirates' }),
    },
    answerBlocks: [
      {
        id: 'uae-regulator-first',
        question: 'What does a UAE perfume launch actually involve?',
        answer:
          'Perfume sold in the UAE usually enters through a licensed importer with a trade licence, with attention to Dubai Municipality product registration, Arabic label content and applicable ESMA conformity. Brandsamor handles the product side — sampling, filling, packaging and supporting documents — while the UAE entity handles registration and market placement.',
        detail:
          'Free-zone re-export and mainland retail can follow different paperwork paths. Confirm the exact route with a local advisor before final artwork is printed.',
      },
      {
        id: 'uae-whatsapp-reality',
        question: 'How do UAE and GCC projects usually get coordinated?',
        answer:
          `Most UAE and GCC enquiries move on WhatsApp at ${gccWhatsAppNumber}, not long email chains. Share the target customer, whether the first batch is for local retail or re-export via Jebel Ali, plus preferred format and price. Sample choices, packaging decisions and production updates then flow through the same thread.`,
        detail:
          `Contracting entity for orders is ${packamorAddress}. WhatsApp is UAE and KSA only; other markets are handled by email or contact form.`,
      },
      {
        id: 'uae-oud-attar-formats',
        question: 'Does the range cover oud, attar and Arabic fragrance formats?',
        answer:
          'Yes. Oud-inspired eau de parfum, attar-style perfume oils, mukhallats and rose–oud accords are common UAE briefs. Formulas are accessed through partner networks rather than a Brandsamor-owned factory, so the specific concentrate depends on the brief, target retail price and whether the product is a spray, an oil or a concentrate.',
      },
    ],
    sections: [
      {
        id: 'uae-market-formats',
        title: 'Oud, attar and Arabic fragrance formats',
        description:
          'UAE buyers read fragrance closely — oud grades, attar oils, mukhallats and the difference between a Dubai-market spray and a Gulf-facing concentrate. A brief that ignores that literacy tends to stall at sampling. The sample kit is curated around the UAE customer rather than a generic Western fragrance wheel.',
        bullets: sectionBullets(
          'Oud, oud–rose, amber, musk and mukhallat directions on the sample brief',
          'Attar-style oils and rollerballs alongside spray eau de parfum',
          'Gifting formats for weddings, Ramadan, Eid and corporate seasons',
          'One hero scent first — flankers only after real sell-through data',
        ),
      },
      {
        id: 'uae-whatsapp-first',
        title: 'WhatsApp-first project coordination',
        description:
          `UAE and GCC founders tend to move fast and prefer WhatsApp over discovery calls. Coordination at ${gccWhatsAppNumber} covers brief intake, sample dispatch (2–3 days when a matching scent is in stock), packaging questions, artwork status and production milestones — kept in one thread so decisions stay traceable.`,
        bullets: sectionBullets(
          'Brief, customer profile and target retail on the first message',
          'Sample tracking numbers and delivery updates in-thread',
          'Packaging and artwork revisions without long discovery calls',
          'Formal quote and PO once the spec is locked',
        ),
      },
      {
        id: 'uae-dubai-municipality',
        title: 'Dubai Municipality, ESMA and importer basics',
        description:
          'Cosmetics registration in the UAE runs through emirate-level authorities and, where relevant, ESMA conformity. Product information, bilingual labelling, an importer trade licence and applicable claim substantiation matter before finished goods reach shelf. IFRA, COA and manufacturing context are prepared on the product side; the UAE entity or clearing agent handles submission.',
        bullets: sectionBullets(
          'Dubai Municipality product registration for mainland retail',
          'Arabic and English label content, allergen list and net content',
          'Importer trade licence and origin documentation for customs',
          'Claim wording reviewed before printed cartons are approved',
        ),
      },
      {
        id: 'uae-reexport-hub',
        title: 'Dubai as a re-export hub for the GCC and beyond',
        description:
          'Jebel Ali, DMCC and other UAE free zones make Dubai a natural staging point for KSA, Kuwait, Oman, Bahrain, Africa and CIS distribution. A batch approved for UAE mainland is not automatically compliant elsewhere — SFDA, GSO and destination-specific labelling still apply. Brief the re-export markets up front so labels accommodate them from the first print run.',
        bullets: sectionBullets(
          'Separate UAE mainland shelf plans from GCC re-export plans',
          'Label space for SFDA, Kuwait PAI or GSO copy where needed',
          'Master cartons and pallet plans built around the freight route',
          'Reorder cadence anchored to the fastest-selling destination',
        ),
      },
      {
        id: 'uae-aed-costing',
        title: 'AED planning from a USD starting point',
        description:
          'Indicative pricing is quoted in USD from $10 per unit before spec-specific variables. A useful UAE landed model in AED includes fragrance concentration, bottle and cap, decoration, carton, freight, customs, Dubai Municipality fees, distributor margin and retail margin. Premium oud concentrates, heavy glass and rigid boxes move the number quickly.',
        bullets: sectionBullets(
          'USD $10 is a starting point, not a landed AED shelf price',
          'Add freight, customs, registration and margin before setting RRP',
          'Test a 100-unit run before overcommitting to premium components',
          'Model reorder economics separately once packaging tooling exists',
        ),
      },
      {
        id: 'uae-sampling-production',
        title: 'Sampling, approvals and 100-unit production',
        description:
          'Samples typically dispatch in 2–3 days when a matching scent is in the kit. Production runs 3–6 weeks after fragrance, packaging, artwork and commercial terms are locked. Certificates such as IFRA, COA, GMP and ISO 22716 context are available where the project requires them; final compliance sits with the UAE brand or importer of record.',
        bullets: sectionBullets(
          'Curated sample kit built around the brief, not a generic catalogue',
          'Production sample sign-off before the batch is released',
          'IFRA, COA and manufacturing context on request',
          'Per-batch documentation kept for faster reorders',
        ),
      },
    ],
    faqTitle: 'UAE private label perfume FAQ',
    faqDescription:
      'UAE-specific questions on Dubai Municipality registration, oud sourcing, AED planning and WhatsApp coordination.',
    faqItems: [
      faq(
        'What is the MOQ for a UAE private label perfume run?',
        'Production starts at 100 units per SKU. It suits boutiques, e-commerce brands and re-export traders who want to prove a scent before committing to larger stock or a wider GCC rollout.',
      ),
      faq(
        'Is WhatsApp answered by a human?',
        `WhatsApp at ${gccWhatsAppNumber} is used by the project team for UAE and KSA enquiries. Expect a human reply during GST working hours, with sample and quote questions handled in-thread rather than pushed to a form.`,
      ),
      faq(
        'Who registers the product with Dubai Municipality?',
        'The UAE entity or appointed importer handles product registration. IFRA, COA and manufacturing context are supplied on the product side. Registration, Arabic labelling sign-off and ongoing market placement remain the brand owner’s responsibility.',
      ),
      faq(
        'Can prices be quoted directly in AED?',
        'Indicative starting prices are USD $10 per unit. Once bottle, fragrance, decoration, carton and freight are defined, the number can be converted to AED and folded into a landed cost model with customs and margin included.',
      ),
      faq(
        'Is a product ready for UAE also ready for KSA and Oman?',
        'No. Each GCC market has its own rules — SFDA in Saudi, PAI in Kuwait and different label content elsewhere. Brief re-export markets up front so labels, cartons and documentation accommodate them from the first print run.',
      ),
      faq(
        'Are oud, attar and mukhallat formats supported?',
        'Yes, through partner networks rather than a Brandsamor factory. Oud eau de parfum, attar oils, mukhallats and rose–oud accords are on the sample brief when the customer profile and target retail price support them.',
      ),
    ],
    ctaTitle: 'Start your UAE fragrance project on WhatsApp',
    ctaDescription:
      `Message Brandsamor at ${gccWhatsAppNumber} with your UAE brief — target customer, oud or attar direction, launch channel and expected retail price. Samples, packaging and a 100-unit run can be scoped from that thread.`,
    relatedLinks: [
      { to: '/private-label-perfume-manufacturer-usa', label: 'Private label perfume manufacturer USA' },
      { to: '/quality-compliance', label: 'Quality and compliance support' },
      { to: '/private-label-attar-manufacturer', label: 'Private label attar manufacturer' },
      { to: '/private-label-oud-perfume-manufacturer', label: 'Private label oud perfume manufacturer' },
      { to: '/fragrance-sampling', label: 'Private label perfume sampling' },
      { to: '/custom-perfume-manufacturer', label: 'Custom perfume manufacturer' },
    ],
  }),

  '/private-label-perfume-manufacturer-saudi-arabia': buildCommercialPage({
    path: '/private-label-perfume-manufacturer-saudi-arabia',
    badge: 'SAUDI ARABIA PRIVATE LABEL PERFUME',
    heroDescription:
      'Private label perfume for Saudi Arabia — SFDA-aware planning, halal ingredient documentation, oud and bakhoor formats, MOQ from 100 units, indicative pricing from $10 per unit and WhatsApp project coordination for Riyadh, Jeddah, Dammam and beyond.',
    eyebrowPrefix: 'KSA LAUNCH',
    showWhatsApp: true,
    whatsappPrefill:
      'Hi Brandsamor, I want to discuss private label perfume for Saudi Arabia. Please share sampling, MOQ, pricing, halal support and SFDA documentation guidance.',
    areaServed: 'SA',
    keyFacts: {
      title: 'Saudi Arabia private label perfume facts',
      description:
        'SFDA registration and Arabic labelling are handled by the Saudi entity or authorised importer. Product-side facts below apply before those steps begin.',
      facts: defaultKeyFacts({ market: 'Saudi Arabia' }),
    },
    answerBlocks: [
      {
        id: 'ksa-sfda-first',
        question: 'What does a Saudi perfume launch actually require?',
        answer:
          'Perfume placed on the Saudi market generally needs SFDA registration, an Arabic-compliant label and an authorised importer holding a valid commercial registration. Halal-aware documentation matters for many briefs. Brandsamor handles the product side — samples, filling, packaging, IFRA and COA — while the Saudi entity or partner completes the SFDA file and market placement.',
        detail:
          'Brandsamor does not operate a factory in Saudi Arabia and does not claim to. Products are coordinated through partner networks with the paperwork the SFDA file typically needs.',
      },
      {
        id: 'ksa-halal-oud',
        question: 'How do halal positioning and Arabic fragrance formats fit together?',
        answer:
          'Halal positioning matters early because it affects the formula, the label and the certifier conversation. Some briefs want alcohol-free attars and mukhallats; others want standard eau de parfum with a halal ingredient audit. Oud, bakhoor accords, oriental amber and rose ranges are common starting points, and the choice cascades through the SFDA file.',
      },
      {
        id: 'ksa-importer-pack',
        question: 'What do Saudi importers usually ask for before they engage?',
        answer:
          'Saudi importers usually want a full pack before they engage: product description in Arabic and English, INCI ingredient list, batch information, IFRA and COA on file. That pack is prepared alongside samples so the importer conversation starts with paperwork ready, rather than being rebuilt during customs clearance or SFDA review at the last minute.',
        detail:
          `For Saudi and UAE enquiries, the project team uses WhatsApp at ${gccWhatsAppNumber}. Orders are contracted through ${packamorAddress}.`,
      },
    ],
    sections: [
      {
        id: 'ksa-scent-literacy',
        title: 'Oud, bakhoor and mukhallat literacy',
        description:
          'Saudi buyers often know more about fragrance than the founder does — oud grades, mukhallat construction, bakhoor rituals and the difference between an oil and a spray. A first collection that respects that literacy tends to convert better than one that borrows a Western fragrance wheel. Samples are curated with that Gulf reference frame in mind.',
        bullets: sectionBullets(
          'Oud, mukhallat, oriental amber, rose and musk directions',
          'Perfume oils and attars alongside eau de parfum sprays',
          'Formats built for gifting, Ramadan and Eid seasons',
          'Names and packaging cues that read to a Saudi customer',
        ),
      },
      {
        id: 'ksa-halal-support',
        title: 'Halal support and formula choices',
        description:
          'Halal is not one decision — it is a chain from raw material to filler to certifier. Alcohol-free attars, alcohol-based eau de parfum with audited inputs, and halal-certified variants each carry different formula and label consequences. The direction should be settled before packaging is priced, because it changes what the label needs to say.',
        bullets: sectionBullets(
          'Alcohol-free attar and mukhallat options for stricter briefs',
          'Halal ingredient audit path for alcohol-based eau de parfum',
          'Certifier options discussed in the context of the destination market',
          'Claim wording checked against the actual audit, not marketing language',
        ),
      },
      {
        id: 'ksa-sfda-arabic-labels',
        title: 'SFDA registration and Arabic labelling',
        description:
          'The Saudi Food and Drug Authority requires product registration for cosmetics before sale, with a compliant Arabic label carrying INCI, net content, batch, manufacturer and importer details. The registration file itself is completed by the Saudi entity or importer. IFRA, COA and manufacturing context are supplied on the product side to feed that file.',
        bullets: sectionBullets(
          'Arabic label with INCI, allergens, net content and batch code',
          'Importer name and CR reflected on-pack where required',
          'IFRA and COA prepared per batch for the SFDA submission',
          'Claim wording — including halal — signed off before printing',
        ),
      },
      {
        id: 'ksa-importer-cr',
        title: 'Working with a Saudi importer or partner',
        description:
          'The Saudi importer is not a passive middleman — they carry the commercial registration, they front the SFDA file, and their name goes on the product. Their questions in the first meeting are usually about paperwork, not scent. A brief that arrives with samples, IFRA, COA and a clean pack shot tends to move much faster than one that arrives with a marketing deck.',
        bullets: sectionBullets(
          'Importer commercial registration and category clearance confirmed early',
          'SFDA file responsibilities agreed in writing',
          'Landed cost, distributor margin and retail margin modelled together',
          'Reorder cadence tied to actual sell-through, not launch enthusiasm',
        ),
      },
      {
        id: 'ksa-retail-formats',
        title: 'Retail formats for Saudi channels',
        description:
          'Saudi retail spans department store beauty halls, standalone perfume houses, online marketplaces such as Nice One and Noon, souq-adjacent gifting shops, salon retail and event gifting. Each channel expects a different pack, price and story. The first batch should target one channel properly rather than trying to please them all.',
        bullets: sectionBullets(
          'Department store beauty hall — hero SKU with tester and carton',
          'Perfume house or souq — oud, mukhallat and gift boxes',
          'Online marketplaces — clean photography and Arabic listing copy',
          'Event and corporate gifting — sets, sleeves and message cards',
        ),
      },
      {
        id: 'ksa-sampling-production',
        title: 'Sampling, production and WhatsApp coordination',
        description:
          `Samples typically dispatch in 2–3 days when a matching scent is in stock. Production runs 3–6 weeks after fragrance, packaging, artwork and commercial terms are locked. WhatsApp at ${gccWhatsAppNumber} is the working channel for Saudi projects during that cycle, with formal quotes and POs anchored through ${packamorAddress}.`,
        bullets: sectionBullets(
          'Curated sample kit shaped by the Saudi brief',
          'Production sample sign-off before the batch is released',
          'Documentation package handed off to the importer for SFDA',
          'WhatsApp for coordination, email for formal contracting',
        ),
      },
    ],
    faqTitle: 'Saudi Arabia private label perfume FAQ',
    faqDescription:
      'Saudi-specific questions on SFDA registration, halal support, oud sourcing, Arabic labelling and importer coordination.',
    faqItems: [
      faq(
        'Does Brandsamor own a factory in Saudi Arabia?',
        'No. Brandsamor coordinates private label perfume through partner networks and does not operate a Saudi filling plant. The brand or its importer registers with SFDA and takes responsibility for the product in the Saudi market.',
      ),
      faq(
        'Who submits the SFDA registration?',
        'The Saudi entity or authorised importer submits and holds the SFDA registration. IFRA, COA, batch information and manufacturing context are supplied on the product side to feed that file, but the submission itself is not done by Brandsamor.',
      ),
      faq(
        'What kind of halal documentation can be supported?',
        'Ingredient-level halal audits, alcohol-free attar and mukhallat options, and supplier declarations for alcohol-based eau de parfum can be requested through the partner network. The certificate itself is issued by an accredited halal body against the specific formula, not by Brandsamor.',
      ),
      faq(
        'Who signs off the Arabic label?',
        'The brand owner, and typically the Saudi importer, signs off Arabic label copy against SFDA rules. Label proofs are prepared with product-side inputs (INCI, allergens, net content, batch code) so the Arabic reviewer works from accurate source data.',
      ),
      faq(
        'Can real oud and bakhoor accords be sourced?',
        'Yes, through partner networks. Oud eau de parfum, oud oils, mukhallats and bakhoor-adjacent accords are on the sample brief when the customer profile and price point support them. Grade and origin claims are only used when they are actually true.',
      ),
      faq(
        'Can Saudi projects be run in Arabic?',
        `Written project coordination on WhatsApp at ${gccWhatsAppNumber} can be handled in Arabic and English. Formal contracts, Arabic label sign-off and SFDA correspondence should still be reviewed by qualified local advisors on the Saudi side.`,
      ),
    ],
    ctaTitle: 'Plan a Saudi fragrance launch',
    ctaDescription:
      `Send the Saudi brief on WhatsApp at ${gccWhatsAppNumber} — scent direction, oud or bakhoor references, halal position, target channel and target retail. Samples and a documentation pack for the SFDA route can be scoped from there.`,
    relatedLinks: [
      { to: '/private-label-perfume-manufacturer-usa', label: 'Private label perfume manufacturer USA' },
      { to: '/quality-compliance', label: 'Quality and compliance support' },
      { to: '/halal-perfume-manufacturer', label: 'Halal perfume manufacturer support' },
      { to: '/private-label-oud-perfume-manufacturer', label: 'Private label oud perfume manufacturer' },
      { to: '/private-label-attar-manufacturer', label: 'Private label attar manufacturer' },
      { to: '/fragrance-sampling', label: 'Private label perfume sampling' },
      { to: '/custom-perfume-manufacturer', label: 'Custom perfume manufacturer' },
    ],
  }),

  '/private-label-perfume-manufacturer-uk': buildCommercialPage({
    path: '/private-label-perfume-manufacturer-uk',
    badge: 'UK PRIVATE LABEL PERFUME',
    heroDescription:
      'Private label perfume for UK brands — UK Responsible Person aware, SCPN notification aware, curated sampling, packaging coordination, MOQ from 100 units and indicative pricing from $10 per unit before UK freight, duty and VAT are added.',
    eyebrowPrefix: 'UK LAUNCH',
    areaServed: 'GB',
    keyFacts: {
      title: 'UK private label perfume facts',
      description:
        'USD figures below are indicative for early comparison. GBP landed planning follows once packaging, freight, duty, VAT and Responsible Person costs are known.',
      facts: defaultKeyFacts({ market: 'United Kingdom' }),
    },
    answerBlocks: [
      {
        id: 'uk-rp-scpn-first',
        question: 'What does the UK actually require before a perfume goes on sale?',
        answer:
          'Perfume placed on the UK market needs a UK-based Responsible Person, a Product Information File, compliant labels and notification through SCPN (Submit Cosmetic Product Notification) before sale. Brandsamor supplies the formula, samples, IFRA, COA and manufacturing context that feed the PIF; the brand appoints the RP and files the SCPN notification.',
        detail:
          'The RP does not have to be the brand or the manufacturer — it is a defined role with defined obligations under the UK Cosmetic Regulation and needs a UK address on-pack.',
      },
      {
        id: 'uk-vs-eu',
        question: 'Is a UK notification enough to sell into the EU?',
        answer:
          'No. A UK notification does not cover EU sales — CPNP is a separate system with its own Responsible Person, PIF and label rules. If a range is planned for both Great Britain and the EU, brief that at the start so labels, packaging real estate and notification workflows are planned once rather than reprinted after the first shipment.',
      },
      {
        id: 'uk-northern-ireland',
        question: 'Where does Northern Ireland sit after Brexit?',
        answer:
          'Northern Ireland follows EU cosmetic rules under the Windsor Framework, so a product sold in Belfast is treated differently from one sold in Manchester. If distribution includes NI, the range needs an EU-based Responsible Person alongside the UK one. It is worth flagging at brief stage rather than at label proof stage.',
      },
    ],
    sections: [
      {
        id: 'uk-rp-scpn-pif',
        title: 'UK RP, PIF and SCPN in practice',
        description:
          'The UK Cosmetic Regulation keeps the substance of EU 1223/2009 but runs on separate paperwork. A UK RP address goes on-pack; a PIF is kept accessible in the UK; SCPN is filed on the government portal before the product is placed on the market. Product-side inputs — formula summary, IFRA, COA, safety-relevant data — are prepared to feed those documents.',
        bullets: sectionBullets(
          'UK RP appointed before market placement, not after first sale',
          'PIF assembled and kept up to date, including CPSR where applicable',
          'SCPN notification filed for each variant before dispatch',
          'Product-side IFRA and COA supplied per batch on request',
        ),
      },
      {
        id: 'uk-post-brexit-eu',
        title: 'Great Britain and the EU are two systems',
        description:
          'Post-Brexit, an SCPN-filed product cannot be shipped straight into Dublin, Paris or Berlin on the same paperwork. CPNP has its own portal, its own RP requirement, its own translation expectations and its own label constraints. Multi-market briefs benefit from planning UK and EU tracks in parallel, not sequentially, so cartons carry every mandatory field the first time.',
        bullets: sectionBullets(
          'Separate UK RP and EU RP relationships',
          'SCPN and CPNP filings treated as two distinct workstreams',
          'Label real estate reserved for both address blocks where needed',
          'Translation and INCI review scoped once for both markets',
        ),
      },
      {
        id: 'uk-northern-ireland-detail',
        title: 'Northern Ireland under the Windsor Framework',
        description:
          'A Belfast retailer, an NI-based warehouse or a fulfilment path routed through NI can pull the product into EU rules even if the brand thinks of itself as UK only. That means an EU RP, CPNP notification and EU-compliant labelling for that stock. Brief NI up front so cartons for the province are printed correctly rather than restickered after the fact.',
        bullets: sectionBullets(
          'NI destinations flagged in the launch brief',
          'Separate stock or dual-market labelling depending on volume',
          'EU RP contact confirmed before NI shipments dispatch',
          'Customer service and returns paths mapped for NI addresses',
        ),
      },
      {
        id: 'uk-gbp-costing',
        title: 'GBP costing from a USD $10 starting point',
        description:
          'USD $10 per unit is the indicative starting figure before spec. A UK landed model in GBP folds in fragrance, bottle, cap, decoration, carton, sea or air freight, UK duty, import VAT, RP retainer, PIF and safety assessment costs, warehousing and channel margin. A 100-unit first run is more about learning the model than filling shelves nationally.',
        bullets: sectionBullets(
          'Fragrance concentration and bottle weight drive most of the unit cost',
          'Freight mode and Incoterm change landed cost more than most brands expect',
          'RP retainer and CPSR are fixed costs — plan them per range, not per unit',
          'Channel margin for Shopify, wholesale and marketplace all differ',
        ),
      },
      {
        id: 'uk-channels',
        title: 'UK channel realities — DTC, boutique, marketplace, wholesale',
        description:
          'Shopify DTC forgives packaging quirks that Selfridges, Liberty or Boots would reject. Amazon and TikTok Shop apply their own hazmat and listing rules on top of the Cosmetic Regulation. Creator drops need shippable outer boxes and press-friendly minis. Each channel should be named in the brief so bottle, carton and copy are picked once for the intended shelf.',
        bullets: sectionBullets(
          'Shopify DTC — photography-first packaging and simple ship carton',
          'Boutique / department store — full carton, tester and stock unit',
          'Amazon / TikTok Shop — hazmat pathway and listing hero image plan',
          'Creator drops — press minis, gift outer and campaign carton design',
        ),
      },
      {
        id: 'uk-sampling-production',
        title: 'Sampling, production and UK inbound logistics',
        description:
          'Samples typically dispatch in 2–3 days when a matching scent is in stock. Production runs 3–6 weeks after fragrance, packaging, artwork and commercial terms are locked. Add inbound freight, UK customs clearance, duty, import VAT and RP-ready documentation to the schedule before promising a shelf date to press or a wholesale account.',
        bullets: sectionBullets(
          'Curated sample kit shaped by the UK customer brief',
          'Production sample sign-off before the batch is released',
          'Documentation pack handed to the UK RP for SCPN and PIF',
          'Shipping timeline treated separately from production timeline',
        ),
      },
    ],
    faqTitle: 'UK private label perfume FAQ',
    faqDescription:
      'UK-specific questions on SCPN, UK Responsible Person, post-Brexit routes to the EU, Northern Ireland and GBP planning.',
    faqItems: [
      faq(
        'What is SCPN and how is it different from CPNP?',
        'SCPN is the UK’s Submit Cosmetic Product Notification portal, run by the Office for Product Safety and Standards. CPNP is the EU’s equivalent. Since Brexit they are separate systems: a product must be notified on each portal it plans to be sold under.',
      ),
      faq(
        'Does Brandsamor act as the UK Responsible Person?',
        'No. The UK RP is an appointed role held by the brand itself, its UK subsidiary, or a third-party RP service. Brandsamor supplies formula, IFRA, COA and manufacturing context so the RP can compile the PIF and file SCPN.',
      ),
      faq(
        'If the brand is UK based, does Northern Ireland still need an EU RP?',
        'Yes, if the product will be sold or fulfilled in Northern Ireland. Under the Windsor Framework, NI stays in EU cosmetic rules, so an EU RP and CPNP notification apply to that stock even when the wider brand is UK based.',
      ),
      faq(
        'Can the first batch be quoted in GBP?',
        'The indicative starting point is USD $10 per unit before spec. Once bottle, fragrance, decoration, carton, freight Incoterm, duty, import VAT and RP costs are known, that number can be modelled in GBP as a proper landed cost.',
      ),
      faq(
        'What product-side documents feed the UK PIF?',
        'IFRA certificate for the fragrance, COA per batch, allergen breakdown, INCI list, manufacturing context (GMP / ISO 22716 references), stability information where available and packaging compatibility notes. The UK RP assembles the CPSR from those inputs and their own safety assessor.',
      ),
      faq(
        'From brief to a UK shelf, how long is realistic?',
        'Sampling in the first 2–3 weeks; artwork and PIF prep in parallel; production 3–6 weeks; inbound freight, clearance and RP sign-off after that. Ten to fourteen weeks is a realistic target if the brand keeps decisions moving; longer if press dates slip approvals.',
      ),
    ],
    ctaTitle: 'Scope a UK private label perfume launch',
    ctaDescription:
      'Share the UK brief — target customer, retail price, channel mix (DTC, boutique, marketplace, wholesale) and whether NI or EU distribution is in scope. Sampling, packaging and a 100-unit run can be quoted against that spec.',
    relatedLinks: [
      { to: '/private-label-perfume-manufacturer-usa', label: 'Private label perfume manufacturer USA' },
      { to: '/quality-compliance', label: 'Quality and compliance support' },
      { to: '/eau-de-parfum-manufacturer', label: 'Eau de parfum manufacturer' },
      { to: '/vegan-clean-perfume-manufacturer', label: 'Vegan and clean perfume manufacturer' },
      { to: '/fragrance-sampling', label: 'Private label perfume sampling' },
      { to: '/custom-perfume-manufacturer', label: 'Custom perfume manufacturer' },
    ],
  }),

  '/private-label-perfume-manufacturer-germany': buildCommercialPage({
    path: '/private-label-perfume-manufacturer-germany',
    badge: 'GERMANY PRIVATE LABEL PERFUME',
    heroDescription:
      'Private label perfume for Germany — CPNP-aware planning, PIF-ready documentation, disciplined clean and vegan claim substantiation, MOQ from 100 units and indicative pricing from $10 per unit before EU freight, duty and RP fees.',
    eyebrowPrefix: 'GERMANY LAUNCH',
    areaServed: 'DE',
    keyFacts: {
      title: 'Germany private label perfume facts',
      description:
        'Germany is an EU market, so CPNP, EU Responsible Person and PIF work sit alongside standard production planning. USD figures are indicative before EU landed costs are added.',
      facts: defaultKeyFacts({ market: 'Germany' }),
    },
    answerBlocks: [
      {
        id: 'germany-cpnp-first',
        question: 'What does Germany actually require before perfume goes on sale?',
        answer:
          'Germany is an EU market, so perfume sold there needs an EU-established Responsible Person, a Product Information File, CPNP notification and a label meeting Regulation (EC) 1223/2009 — INCI, allergen list, nominal content, PAO or best-before, batch code and RP address. Brandsamor supplies formula-side inputs; the RP finalises the PIF.',
        detail:
          'The BAuA and BVL sit behind Germany-specific enforcement, and dm, Rossmann and Douglas each have their own retailer-level dossier expectations on top of the regulation.',
      },
      {
        id: 'germany-clean-vegan',
        question: 'How should clean and vegan claims be handled for German shelves?',
        answer:
          '"Clean" has no legal definition in the EU, so the term needs an internal criteria list and supporting evidence before it goes on a German label. "Vegan" requires ingredient-by-ingredient substantiation from formula and packaging suppliers. Brandsamor can request supplier declarations, but the RP and brand owner carry final responsibility under the Cosmetics Claims Regulation.',
      },
      {
        id: 'germany-language-retail',
        question: 'Does the pack really need to be in German?',
        answer:
          'German retailers such as dm, Rossmann and Douglas expect German-language pack copy and a working RP address on-pack. DTC via Shopify or Amazon.de tolerates more, but returns and Verbraucherschutz complaints still land in German. Plan translation, INCI review and pack proofing before artwork sign-off, not after cartons are printed and delivered.',
      },
    ],
    sections: [
      {
        id: 'germany-eu-rp-pif',
        title: 'EU RP, PIF and CPNP under 1223/2009',
        description:
          'The EU Cosmetic Regulation places direct obligations on the Responsible Person: a complete PIF held at an EU address, a Cosmetic Product Safety Report signed by a qualified safety assessor, CPNP notification per formula, and Serious Undesirable Effects reporting. Product-side inputs — formula summary, IFRA, COA, allergen data — are prepared so the RP’s assessor has usable source data.',
        bullets: sectionBullets(
          'EU RP relationship confirmed before market placement',
          'CPSR prepared by a qualified safety assessor against the actual formula',
          'CPNP notification filed per variant and per manufacturer',
          'IFRA, COA and batch information supplied on the product side',
        ),
      },
      {
        id: 'germany-claims-discipline',
        title: 'Clean, vegan and natural — claim discipline',
        description:
          'German buyers, journalists and enforcement bodies read fragrance claims carefully. The Cosmetics Claims Regulation (655/2013) asks for evidential support, honesty, fairness and informed decision-making — not marketing feeling. "Vegan" needs a supplier-by-supplier check. "Natural" ties to specific ISO references. "Free-from" is limited. Decide the claim discipline before the label goes to print.',
        bullets: sectionBullets(
          'Internal criteria written down before "clean" appears on a pack',
          'Vegan status audited across fragrance, packaging and print inks',
          'ISO 16128 references used correctly when "natural" is claimed',
          'Free-from claims kept inside the regulator’s allowed exceptions',
        ),
      },
      {
        id: 'germany-label-language',
        title: 'German-language label content and INCI review',
        description:
          'Regulated fields — nominal content, PAO/BBE, batch, RP name and address, function of the product, precautions — need to appear in German for the German market. INCI stays Latin, but warnings and function statements do not. Douglas and dm have additional expectations on font size, contrast and information hierarchy that should be tested before artwork is signed.',
        bullets: sectionBullets(
          'Function statement and precautions translated for German shelves',
          'INCI list checked against the exact fragrance and packaging',
          'RP name and EU address printed and legible on the outer',
          'Retailer-specific label QA (dm, Rossmann, Douglas) run before print',
        ),
      },
      {
        id: 'germany-vs-uk',
        title: 'Germany vs UK — two notification systems side by side',
        description:
          'A Germany launch is an EU launch: CPNP, EU RP, EU labelling. A UK launch is SCPN, UK RP and UK-specific labelling. Brands that treat the two as one route usually end up restickering. Plan them as parallel workstreams from the start, share what can be shared (formula, IFRA, COA) and keep separate what cannot (RP address, notification, some claim wording).',
        bullets: sectionBullets(
          'Two RP relationships planned, not one repurposed',
          'CPNP and SCPN filings scheduled per variant per market',
          'Label real estate reserved for both address blocks where relevant',
          'Reorder cadence anchored to the slower of the two files',
        ),
      },
      {
        id: 'germany-channels',
        title: 'Channel realities — dm, Rossmann, Douglas, DTC, Amazon.de',
        description:
          'dm and Rossmann run tight private-label and listing processes with specific dossier and pack standards. Douglas expects premium finish and a coherent range. DTC on Shopify tolerates smaller runs but still needs the same regulatory backbone. Amazon.de layers marketplace rules and hazmat handling on top. Pick the target shelf before the bottle is chosen.',
        bullets: sectionBullets(
          'dm / Rossmann — dossier, listing timelines and price ladder discipline',
          'Douglas — premium finish, coherent range and sampling programme',
          'DTC Shopify / niche boutiques — full regulatory backbone, smaller run',
          'Amazon.de — hazmat pathway, listing hero image and review strategy',
        ),
      },
      {
        id: 'germany-sampling-production',
        title: 'Sampling, production and EU inbound',
        description:
          'Samples typically dispatch in 2–3 days when a matching scent is in stock. Production runs 3–6 weeks after fragrance, packaging, artwork and commercial terms are locked. Add inbound freight, EU customs clearance, duty, VAT, RP sign-off and any retailer-side dossier reviews to the schedule before committing a launch date to press or a buyer.',
        bullets: sectionBullets(
          'Curated sample kit shaped by the German customer brief',
          'Production sample sign-off before the batch is released',
          'Documentation pack handed to the EU RP for CPNP and PIF',
          'EU inbound and customs treated as a separate line on the timeline',
        ),
      },
    ],
    faqTitle: 'Germany private label perfume FAQ',
    faqDescription:
      'Germany-specific questions on CPNP, EU Responsible Person, clean and vegan claim substantiation, German-language labelling and retailer expectations.',
    faqItems: [
      faq(
        'Does Brandsamor act as the EU Responsible Person?',
        'No. The EU RP is an EU-established person or company appointed by the brand — often a specialised RP service, an EU subsidiary or an EU distributor. Brandsamor supplies formula, IFRA, COA and manufacturing context that the RP and its safety assessor use to compile the PIF.',
      ),
      faq(
        'How far ahead of launch should CPNP be filed?',
        'CPNP notification must be in place before the product is placed on the EU market. In practice, brands aim to have the RP, CPSR and CPNP filing complete a few weeks before the intended shelf date so retailer listings and customs paperwork do not stall.',
      ),
      faq(
        'What is needed to call a fragrance vegan on a German pack?',
        'Written supplier declarations for every ingredient in the fragrance, the base, packaging print inks and any secondary components — plus internal criteria for what the brand accepts as vegan. The RP reviews the file, and the claim goes on-pack only when the substantiation is holdable in an inspection.',
      ),
      faq(
        'Do all pack fields have to be in German?',
        'Regulated fields such as function, precautions, PAO/BBE and RP address must be in German for the German market. INCI stays Latin. Marketing copy is a commercial choice, but retailers such as dm, Rossmann and Douglas generally expect German throughout the visible pack.',
      ),
      faq(
        'What product-side documents feed the EU PIF?',
        'IFRA certificate for the fragrance, COA per batch, INCI and allergen list, manufacturing context (GMP / ISO 22716 references), stability data where available and packaging compatibility notes. The RP’s safety assessor uses those inputs to produce the CPSR that sits inside the PIF.',
      ),
      faq(
        'If a range is already SCPN-notified for the UK, is Germany simpler?',
        'Some inputs can be reused — formula summary, IFRA, COA, manufacturing context — but the RP relationship, CPNP filing, label content and claim substantiation all have to be redone under EU rules. Plan Germany as its own project rather than a copy of the UK file.',
      ),
    ],
    ctaTitle: 'Scope a Germany private label perfume launch',
    ctaDescription:
      'Share the German brief — target customer, retail price, channel plan (dm, Rossmann, Douglas, DTC, Amazon.de), clean or vegan position and whether UK, France or wider EU are also in scope. Sampling and a 100-unit run can be quoted against that spec.',
    relatedLinks: [
      { to: '/private-label-perfume-manufacturer-usa', label: 'Private label perfume manufacturer USA' },
      { to: '/quality-compliance', label: 'Quality and compliance support' },
      { to: '/vegan-clean-perfume-manufacturer', label: 'Vegan and clean perfume manufacturer' },
      { to: '/eau-de-parfum-manufacturer', label: 'Eau de parfum manufacturer' },
      { to: '/fragrance-sampling', label: 'Private label perfume sampling' },
      { to: '/custom-perfume-manufacturer', label: 'Custom perfume manufacturer' },
    ],
  }),
};
