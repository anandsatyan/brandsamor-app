import {
  BrandBriefIllustration,
  ComplianceDocIllustration,
  DeliveryIllustration,
  FragranceFamilyIllustration,
  PackagingIllustration,
  ProcessTimelineIllustration,
  QualityCheckIllustration,
  ScentSamplesIllustration,
} from '../../components/Illustrations';
import { buildCommercialPage, faq, sectionBullets, defaultKeyFacts, COMMERCIAL_COPY } from './buildCommercialPage';
import type { TopicPageConfig } from '../../components/topic/types';

const packamorAddress = 'Packamor LLC, 1111B S Governors Ave, Dover, DE 19904, USA';
const gccWhatsAppNumber = '+971521543617';

export const geoPageConfigs: Record<string, TopicPageConfig> = {
  '/private-label-perfume-manufacturer-uae': buildCommercialPage({
    path: '/private-label-perfume-manufacturer-uae',
    badge: 'UAE PRIVATE LABEL PERFUME',
    heroDescription:
      'Brandsamor helps UAE founders, retailers and fragrance houses launch private label perfume with sample-first development, MOQ from 100 units, indicative pricing from $10 per unit, and WhatsApp-first project coordination for Dubai, Sharjah and wider UAE demand.',
    eyebrowPrefix: 'UAE LAUNCH',
    heroIllustration: ProcessTimelineIllustration,
    ctaIllustration: ScentSamplesIllustration,
    showWhatsApp: true,
    whatsappPrefill:
      'Hi Brandsamor, I want to discuss UAE private label perfume manufacturing for my brand. Please share sampling, MOQ, pricing and compliance documentation details.',
    areaServed: 'AE',
    keyFacts: {
      title: 'UAE private label perfume facts',
      description:
        'Production starts at 100 units, with indicative private label pricing from $10 per unit. UAE landed planning can also be viewed in AED once fragrance, packaging, freight and destination requirements are known.',
      facts: defaultKeyFacts({ market: 'United Arab Emirates' }),
    },
    answerBlocks: [
      {
        id: 'uae-answer-manufacturer',
        question: 'Can Brandsamor help UAE brands launch private label perfume?',
        answer:
          'Yes. Brandsamor supports UAE perfume launches with fragrance sampling, bottle and packaging coordination, production management and documentation support. Production MOQ starts at 100 units, indicative pricing starts from $10 per unit, samples usually dispatch in 2-3 days, and production typically takes 3-6 weeks after approvals.',
        detail:
          'The service is a fit for Dubai boutiques, Sharjah traders, e-commerce sellers and re-export focused fragrance businesses that want a practical first batch without building their own filling operation.',
      },
      {
        id: 'uae-answer-compliance',
        question: 'What UAE compliance support is available?',
        answer:
          'Brandsamor can provide support documentation such as IFRA certificates, GMP and ISO 22716 context, Certificates of Analysis, MoCRA documentation for US-facing projects and halal certification support where relevant. The UAE brand owner remains responsible for confirming product registration, labeling and import requirements before sale.',
        detail:
          'UAE fragrance projects may involve Dubai Municipality, ESMA-related conformity awareness and emirate-specific trading requirements. Confirm final obligations with local advisors, your importer and the relevant authority for your sales channel.',
      },
      {
        id: 'uae-answer-whatsapp',
        question: 'How do UAE projects usually start?',
        answer:
          'Most UAE projects start on WhatsApp with a short brand brief, target customer, desired format and launch market. Brandsamor then curates samples, discusses oud, attar, eau de parfum or body mist options, and helps plan packaging, indicative AED budgets and production timing.',
        detail:
          `For UAE and GCC enquiries, message Brandsamor on WhatsApp at ${gccWhatsAppNumber}. Customer agreements and business operations are handled by ${packamorAddress}.`,
      },
    ],
    sections: [
      {
        id: 'uae-market-fit',
        title: 'Built for Dubai, Sharjah and UAE fragrance buyers',
        description:
          'The UAE market rewards fragrance with presence: oud-led signatures, attar oils, Arabic perfume profiles, gifting formats and boutique-ready packaging. Brandsamor helps you translate that market expectation into a launchable private label line by starting with samples, then moving into packaging and coordinated production once the direction is proven.',
        bullets: sectionBullets(
          'Sample oud, amber, musk, floral, fresh and attar-style directions before production',
          'Plan a first collection for malls, boutiques, salons, e-commerce or gifting',
          'Match bottle, cap, label and box decisions to UAE retail expectations',
          'Use a 100-unit MOQ to test demand before scaling wider distribution',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'uae-whatsapp-first',
        title: 'WhatsApp-first coordination for fast-moving GCC teams',
        description:
          `UAE founders often move quickly and prefer direct coordination. Brandsamor can discuss your private label perfume project on WhatsApp at ${gccWhatsAppNumber}, then organize the brief, sample choices, packaging inputs, artwork status and production milestones in a clear sequence. Samples normally dispatch in 2-3 days when available.`,
        bullets: sectionBullets(
          'Share your brand direction, target price and product format in one thread',
          'Coordinate sample feedback, packaging choices and artwork questions',
          'Use WhatsApp for UAE and GCC project communication without long discovery calls',
          'Move to production after scent, packaging and commercial details are approved',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'uae-pricing-and-moq',
        title: 'MOQ, AED planning and unit economics',
        description:
          'Brandsamor production starts at 100 units, with indicative private label pricing from $10 per unit before project-specific variables. For UAE planning, that USD starting point can be translated into indicative AED budgets once bottle size, fragrance type, decoration, carton, freight and duties are understood. Final quotes depend on the actual bill of materials and batch plan.',
        bullets: sectionBullets(
          'Production MOQ starts at 100 units for focused UAE launches',
          'Indicative pricing starts from $10 per unit, not including every possible option',
          'AED planning should include freight, import costs and retail margin',
          'Premium oud, heavy glass, rigid boxes and special decoration can raise unit cost',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'uae-regulatory-registration',
        title: 'UAE registration and documentation awareness',
        description:
          'Fragrance sold in the UAE may require attention to product registration, label information, importer responsibilities and applicable conformity pathways. Brandsamor provides documentation support such as IFRA, COA, GMP, ISO 22716 production context, MoCRA documents where needed for US sales, and halal certification support. The brand owner remains responsible for confirming UAE requirements with local advisors.',
        bullets: sectionBullets(
          'Discuss Dubai Municipality and ESMA-related awareness early in the project',
          'Confirm importer, distributor and emirate-specific requirements before launch',
          'Request IFRA, COA, GMP, ISO 22716 and halal support where relevant',
          'Avoid final label printing until registration and claims have been reviewed',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'uae-reexport-hub',
        title: 'Planning for UAE re-export and GCC expansion',
        description:
          'Dubai and Sharjah are natural hubs for fragrance re-export, but a product prepared for one destination is not automatically cleared for every GCC or international market. Brandsamor helps structure the product information, batch records and documentation package so your team can review destination-specific requirements before expanding from the UAE.',
        bullets: sectionBullets(
          'Clarify whether the first batch is for UAE retail, re-export or both',
          'Separate UAE label needs from Saudi, Oman, Kuwait or wider export requirements',
          'Plan cartons and master packing for freight, storage and resale channels',
          'Build a reorder path once the first market validates demand',
        ),
        Illustration: DeliveryIllustration,
      },
      {
        id: 'uae-production-path',
        title: 'From sample kit to finished UAE launch batch',
        description:
          `The practical path starts with a brief, followed by curated samples, packaging selection, artwork review, production sample approval and a 3-6 week production window after approvals. ${COMMERCIAL_COPY.certificationsSummary} Brandsamor supports the process, while your UAE business remains responsible for final compliance, claims and selling decisions.`,
        bullets: sectionBullets(
          'Complete a brand and customer brief before scent selection',
          'Review samples and choose the strongest fragrance direction',
          'Approve packaging, artwork and production details before the batch starts',
          'Prepare market registration and import steps alongside production timing',
        ),
        Illustration: ProcessTimelineIllustration,
      },
    ],
    faqTitle: 'UAE private label perfume FAQ',
    faqDescription:
      'Answers for UAE brands planning private label perfume, oud, attar or fragrance gift products with Brandsamor.',
    faqItems: [
      faq(
        'What is the MOQ for UAE private label perfume?',
        'Brandsamor production starts at 100 units. This makes it practical for UAE boutiques, online sellers and new fragrance brands to test a first batch before committing to larger wholesale or re-export quantities.',
      ),
      faq(
        'Can I discuss my UAE project on WhatsApp?',
        `Yes. UAE and GCC enquiries can be coordinated by WhatsApp at ${gccWhatsAppNumber}. Share your brand, target customer, desired scent direction, launch date and packaging expectations so the team can guide the next step.`,
      ),
      faq(
        'Do you support oud and attar products for the UAE?',
        'Yes. Brandsamor can support oud-inspired fragrance, attar-style perfume oils and Arabic perfume profiles, subject to formula, packaging and compliance requirements for the intended market.',
      ),
      faq(
        'Are prices shown in AED?',
        'The confirmed indicative starting point is USD $10 per unit. UAE teams can plan in AED after the project scope is clearer, including bottle, packaging, decoration, freight, duties and channel margin.',
      ),
      faq(
        'Does Brandsamor handle UAE product registration?',
        'Brandsamor provides documentation support, but the brand owner remains responsible for confirming UAE registration, labeling, importer and selling requirements with local advisors and authorities.',
      ),
      faq(
        'How long does UAE private label perfume production take?',
        'Available samples usually dispatch in 2-3 days. Production typically takes 3-6 weeks after fragrance, packaging, artwork and commercial details are approved, with shipping time depending on destination and service.',
      ),
    ],
    ctaTitle: 'Start your UAE fragrance project',
    ctaDescription:
      `Message Brandsamor on WhatsApp at ${gccWhatsAppNumber} with your UAE private label perfume brief. Share your target customer, oud or attar preferences, launch channel and packaging expectations so samples and first-batch planning can begin.`,
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
      'Brandsamor supports Saudi Arabia perfume founders with private label fragrance sampling, oud and bakhoor-aware product planning, halal certification support, documentation, MOQ from 100 units and WhatsApp project coordination for KSA launches.',
    eyebrowPrefix: 'KSA LAUNCH',
    heroIllustration: FragranceFamilyIllustration,
    ctaIllustration: BrandBriefIllustration,
    showWhatsApp: true,
    whatsappPrefill:
      'Hi Brandsamor, I want to discuss private label perfume manufacturing for Saudi Arabia. Please share sampling, MOQ, pricing, halal support and SFDA documentation guidance.',
    areaServed: 'SA',
    keyFacts: {
      title: 'Saudi Arabia private label perfume facts',
      description:
        'Production starts at 100 units, indicative pricing starts from $10 per unit, samples usually dispatch in 2-3 days, and production typically takes 3-6 weeks after fragrance, packaging and artwork approvals.',
      facts: defaultKeyFacts({ market: 'Saudi Arabia' }),
    },
    answerBlocks: [
      {
        id: 'ksa-answer-manufacturer',
        question: 'Can Brandsamor help Saudi brands launch private label perfume?',
        answer:
          'Yes. Brandsamor helps Saudi Arabia brands plan private label perfume with curated sampling, packaging coordination, production support and documentation. MOQ starts at 100 units, indicative pricing starts from $10 per unit, and the process can fit oud, oriental, eau de parfum and perfume oil launches.',
        detail:
          'Brandsamor does not claim to operate a Saudi factory. It coordinates private label fragrance projects through its service model and partner network while helping your team prepare for KSA market requirements.',
      },
      {
        id: 'ksa-answer-compliance',
        question: 'What should Saudi perfume brands know about SFDA requirements?',
        answer:
          'Perfume sold in Saudi Arabia may require SFDA registration, compliant labeling, importer coordination and documentation review before sale. Brandsamor can support documentation such as IFRA, COA, GMP, ISO 22716 context, MoCRA documents where relevant and halal certification support, but the brand owner remains responsible for compliance.',
        detail:
          'Confirm the exact SFDA pathway, label language, claims and importer responsibilities with qualified local advisors before approving final artwork or importing finished goods.',
      },
      {
        id: 'ksa-answer-whatsapp',
        question: 'How are Saudi private label projects coordinated?',
        answer:
          'Saudi projects can be coordinated through WhatsApp with a concise brief covering audience, product type, scent direction, price point and launch channel. Project coordination is available via WhatsApp, including discussion of samples, packaging options, halal support and documents needed for Saudi review.',
        detail:
          `For UAE and KSA enquiries, contact Brandsamor on WhatsApp at ${gccWhatsAppNumber}. The operating legal entity is ${packamorAddress}.`,
      },
    ],
    sections: [
      {
        id: 'ksa-brand-building',
        title: 'Private label fragrance for Saudi brand building',
        description:
          'Saudi Arabia has strong fragrance culture and a fast-growing consumer brand landscape. Vision 2030 has encouraged local entrepreneurship, retail development and premium lifestyle categories, but building a perfume brand still requires disciplined product decisions. Brandsamor helps founders start with samples, clarify positioning and prepare a first batch without claiming local factory ownership.',
        bullets: sectionBullets(
          'Plan a fragrance line for Saudi boutiques, e-commerce, gifting or salons',
          'Use private label to test brand demand before scaling into larger orders',
          'Choose scent directions that fit your customer, not only a generic trend',
          'Coordinate product development without building your own production facility',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'ksa-oud-bakhoor-demand',
        title: 'Oud, bakhoor and oriental scent expectations',
        description:
          'Saudi buyers often understand fragrance deeply, from oud profiles and musks to sweet ambers, florals, oils and home scent rituals. A private label project should respect that sophistication. Brandsamor can help you evaluate oud-inspired perfume, attar-style oils, eau de parfum formats and related fragrance families for a collection that feels deliberate.',
        bullets: sectionBullets(
          'Explore oud, amber, musk, rose, vanilla, incense and fresh contrasts',
          'Consider perfume oils or attar-style formats beside spray perfume',
          'Plan packaging that feels giftable and credible for Saudi buyers',
          'Avoid overextending the first collection before sample feedback is clear',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'ksa-halal-support',
        title: 'Halal certification support and ingredient questions',
        description:
          'Many Saudi fragrance projects ask about halal positioning, alcohol-aware formats or documentation that supports distributor review. Brandsamor can discuss halal certification support, IFRA documentation, COA availability and production-standard context. Final claim wording and certification use should be checked against your formula, certifier, label and sales channel.',
        bullets: sectionBullets(
          'Discuss halal support early if it affects formula, label or marketing claims',
          'Confirm whether your product is a spray perfume, oil, mist or home scent',
          'Request available IFRA, COA, GMP and ISO 22716 support documentation',
          'Make sure halal claims are reviewed before cartons and labels are printed',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'ksa-sfda-registration',
        title: 'SFDA-aware planning for Saudi Arabia',
        description:
          'Saudi market entry should be planned with SFDA registration awareness from the start. Brandsamor provides documentation support and organized product information, but your Saudi business, importer or Responsible Party remains accountable for registrations, Arabic labeling, claim review and lawful sale. This regulatory work is a moat because it prevents attractive packaging from outrunning the paperwork.',
        bullets: sectionBullets(
          'Confirm SFDA requirements for the exact fragrance product type',
          'Review Arabic label needs, importer details and claim language',
          'Keep formula, IFRA, COA and batch information organized for submission',
          'Use local advisors before committing to final artwork or retail launch dates',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'ksa-pricing-timeline',
        title: 'MOQ, pricing and Saudi launch timing',
        description:
          'Production MOQ starts at 100 units, and indicative pricing starts from $10 per unit depending on bottle, fragrance, box, decoration and quantity. Available samples usually dispatch in 2-3 days, while production normally takes 3-6 weeks after scent, packaging, artwork and commercial approvals. Shipping, customs and Saudi registration timing should be planned separately.',
        bullets: sectionBullets(
          'Start with samples before committing to the first 100-unit production batch',
          'Plan retail price around unit cost, freight, duties, platform fees and margin',
          'Allow time for artwork review, documentation and registration questions',
          'Use reorders to expand once customer feedback and sell-through are known',
        ),
        Illustration: ProcessTimelineIllustration,
      },
      {
        id: 'ksa-project-coordination',
        title: 'WhatsApp project coordination for KSA teams',
        description:
          `Brandsamor can coordinate Saudi projects by WhatsApp at ${gccWhatsAppNumber}. Share your target customer, sales channel, preferred scent family, halal questions and launch schedule. Arabic-language project coordination can be handled through WhatsApp workflow and shared project materials, while final legal, regulatory and claim language should be reviewed by your own qualified advisors.`,
        bullets: sectionBullets(
          'Use WhatsApp to align on brief, samples, packaging and next decisions',
          'Share distributor or importer questions as early as possible',
          'Keep approvals documented before production is released',
          'Coordinate sampling, production and documentation without inflated launch claims',
        ),
        Illustration: ScentSamplesIllustration,
      },
    ],
    faqTitle: 'Saudi Arabia private label perfume FAQ',
    faqDescription:
      'Common questions for Saudi Arabia perfume founders evaluating Brandsamor for private label fragrance.',
    faqItems: [
      faq(
        'Does Brandsamor manufacture perfume in Saudi Arabia?',
        'Brandsamor supports Saudi Arabia private label perfume projects but does not claim to operate a Saudi factory. It coordinates sampling, packaging, production and documentation through its service model and partner network.',
      ),
      faq(
        'What is the MOQ for Saudi private label perfume?',
        'Production MOQ starts at 100 units. This allows Saudi founders to test a focused perfume line before ordering larger retail, wholesale or gifting quantities.',
      ),
      faq(
        'Can Brandsamor support halal perfume requirements?',
        'Yes. Brandsamor can discuss halal certification support where the project requires it, alongside IFRA, COA, GMP and ISO 22716 documentation context. Final halal claims should be approved against the formula, certifier and market rules.',
      ),
      faq(
        'Does Brandsamor handle SFDA registration?',
        'Brandsamor provides organized documentation support, but the brand owner, importer or local Responsible Party remains responsible for confirming and completing SFDA registration, Arabic labeling and lawful sale requirements.',
      ),
      faq(
        'Can I coordinate a Saudi project in Arabic?',
        'Project coordination is available via WhatsApp, and shared materials can be coordinated for Saudi teams. Brandsamor does not make broader fluency claims; final Arabic legal and regulatory wording should be reviewed locally.',
      ),
      faq(
        'How quickly can I get samples for Saudi Arabia?',
        'Available fragrance samples usually dispatch in 2-3 days. Delivery timing depends on destination and courier service, while production normally takes 3-6 weeks after all approvals.',
      ),
    ],
    ctaTitle: 'Plan your Saudi fragrance launch',
    ctaDescription:
      `Send your Saudi private label perfume brief on WhatsApp at ${gccWhatsAppNumber}. Include your scent direction, oud or bakhoor inspiration, halal questions, packaging style and launch channel so Brandsamor can guide sampling and production planning.`,
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
      'Brandsamor helps UK fragrance founders launch private label perfume with curated sampling, packaging coordination, MOQ from 100 units, indicative pricing from $10 per unit and practical planning for UK Cosmetic Regulation, SCPN notification and Responsible Person requirements.',
    eyebrowPrefix: 'UK LAUNCH',
    heroIllustration: PackagingIllustration,
    ctaIllustration: ScentSamplesIllustration,
    areaServed: 'GB',
    keyFacts: {
      title: 'UK private label perfume facts',
      description:
        'Production starts at 100 units. UK brands can use USD starting prices for early comparison, then plan in GBP after packaging, freight, duties, VAT and Responsible Person costs are understood.',
      facts: defaultKeyFacts({ market: 'United Kingdom' }),
    },
    answerBlocks: [
      {
        id: 'uk-answer-manufacturer',
        question: 'Can Brandsamor help UK brands launch private label perfume?',
        answer:
          'Yes. Brandsamor supports UK private label perfume launches with sample curation, packaging coordination, production support and documentation. Production MOQ starts at 100 units, indicative pricing starts from $10 per unit, samples usually dispatch in 2-3 days, and production typically takes 3-6 weeks after approvals.',
        detail:
          'UK brands should also budget for freight, duties, VAT, Responsible Person support and any compliance review needed before the product is placed on the UK market.',
      },
      {
        id: 'uk-answer-regulation',
        question: 'What UK regulatory steps should perfume brands plan for?',
        answer:
          'UK perfume brands should plan around UK Cosmetic Regulation, a UK Responsible Person, compliant labeling, safety documentation and SCPN notification before sale. Brandsamor can provide supporting documentation such as IFRA, COA, GMP and ISO 22716 context, but the brand owner remains responsible for compliance.',
        detail:
          'Post-Brexit UK notification uses the SCPN route, while EU market entry uses CPNP. A product sold in both markets may need separate Responsible Person and notification planning.',
      },
      {
        id: 'uk-answer-shipping',
        question: 'How should UK teams plan shipping and lead times?',
        answer:
          'UK teams should separate production timing from shipping and market-entry timing. Samples may dispatch in 2-3 days, production usually takes 3-6 weeks after approvals, and final delivery depends on freight method, customs clearance, duties and the readiness of UK compliance documentation.',
        detail:
          'Brandsamor can help organize product and batch information, while your UK importer, Responsible Person or advisor confirms the final steps needed before sale.',
      },
    ],
    sections: [
      {
        id: 'uk-market-positioning',
        title: 'Private label perfume for UK founders and retailers',
        description:
          'The UK fragrance market is crowded but open to sharp positioning: niche stories, creator-led launches, beauty brand extensions, boutique gifting and accessible everyday scents. Brandsamor helps UK teams begin with a focused fragrance brief and sample kit so the first batch is based on customer strategy rather than guesswork.',
        bullets: sectionBullets(
          'Define whether the line is niche, beauty-led, gifting, fashion or creator-driven',
          'Start with sample feedback before committing to packaging and bulk production',
          'Use a 100-unit MOQ to validate an idea without overstocking',
          'Plan fragrance, bottle and box choices around retail price and margin',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'uk-gbp-planning',
        title: 'GBP-aware costing from a USD starting point',
        description:
          'Brandsamor confirms indicative pricing from $10 per unit, but UK brands should model the full landed picture in GBP. That means bottle and fragrance cost, carton and decoration, freight, duties, VAT, compliance review, Responsible Person fees where applicable and your target retail margin. A small first batch can protect cash while the concept is tested.',
        bullets: sectionBullets(
          'Use USD $10 per unit as an indicative starting point, not a finished landed cost',
          'Convert to GBP after packaging, shipping and compliance assumptions are known',
          'Allow margin for retail, wholesale, creator commissions or platform fees',
          'Avoid premium packaging choices that break the intended UK price point',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'uk-scpn-responsible-person',
        title: 'UK Cosmetic Regulation, SCPN and Responsible Person planning',
        description:
          'Perfume placed on the UK market generally needs a UK Responsible Person, compliant product information, label review and notification through the Submit Cosmetic Product Notification portal. Brandsamor can provide support documents such as IFRA, COA, GMP, ISO 22716 context, MoCRA documents for US-facing projects and halal support where relevant, but your brand remains responsible for lawful sale.',
        bullets: sectionBullets(
          'Confirm your UK Responsible Person before placing product on the market',
          'Prepare for SCPN notification rather than assuming EU CPNP is enough',
          'Review allergens, ingredients, warnings, nominal content and responsible party details',
          'Keep safety and product information organized before final artwork approval',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'uk-post-brexit-eu-distinction',
        title: 'Post-Brexit UK and EU routes are not the same',
        description:
          'A perfume launch for the UK is not automatically ready for Ireland, Germany, France or wider EU sale. Post-Brexit requirements mean UK SCPN and EU CPNP are separate notification systems, and Responsible Person arrangements can differ. If you plan to sell in both the UK and EU, build that into the project brief before labels and cartons are finalized.',
        bullets: sectionBullets(
          'Separate Great Britain planning from EU market planning',
          'Check whether Northern Ireland or EU distribution changes your requirements',
          'Avoid labels that only work for one market if multi-market selling is planned',
          'Ask advisors to review claims before stock is shipped or listed online',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'uk-sampling-packaging',
        title: 'Sampling and packaging for UK channels',
        description:
          'UK brands often sell through Shopify, marketplaces, concept stores, salons, gifting campaigns and social-led drops. Each channel changes packaging priorities. Brandsamor can help you move from curated samples into bottle, cap, spray, label and carton decisions that feel credible while staying realistic for first-batch economics.',
        bullets: sectionBullets(
          'Sample scent directions before locking a fragrance story',
          'Choose packaging that photographs well for online retail',
          'Plan labels and cartons with regulatory copy space in mind',
          'Use production-sample approval before releasing the full batch',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'uk-logistics-production',
        title: 'Production, UK shipping and reorder planning',
        description:
          `Available samples normally dispatch in 2-3 days, and production usually takes 3-6 weeks after approvals. ${COMMERCIAL_COPY.worldwideService} For UK projects, add time for freight booking, customs clearance, duties, VAT handling and Responsible Person readiness. A clean reorder file helps future batches move faster once the product proves itself.`,
        bullets: sectionBullets(
          'Keep freight, customs and compliance timing separate from production timing',
          'Confirm who acts as importer and who holds required product information',
          'Track batch, artwork and packaging approvals for reorders',
          'Review customer feedback before expanding the range',
        ),
        Illustration: DeliveryIllustration,
      },
    ],
    faqTitle: 'UK private label perfume FAQ',
    faqDescription:
      'Answers for UK brands planning private label perfume with documentation-aware production support.',
    faqItems: [
      faq(
        'What is the MOQ for UK private label perfume?',
        'Production starts at 100 units. This helps UK founders test a fragrance concept, creator drop, boutique product or brand extension before committing to larger stock levels.',
      ),
      faq(
        'Does Brandsamor provide a UK Responsible Person?',
        'Brandsamor provides documentation support but does not replace your need to confirm a UK Responsible Person where required. Your UK brand, importer or appointed advisor remains responsible for compliance arrangements.',
      ),
      faq(
        'Is SCPN the same as EU CPNP?',
        'No. UK cosmetic notification is handled through SCPN, while the EU uses CPNP. Brands selling in both markets should plan separate notification and Responsible Person requirements before final labels are printed.',
      ),
      faq(
        'Can I plan pricing in GBP?',
        'Yes. The confirmed indicative starting point is USD $10 per unit, and UK teams can translate planning into GBP once packaging, freight, duty, VAT and compliance costs are known.',
      ),
      faq(
        'What documents can Brandsamor support?',
        'Brandsamor can support IFRA, GMP and ISO 22716 production context, Certificates of Analysis, MoCRA documentation for US-facing projects and halal certification support where relevant.',
      ),
      faq(
        'How long does UK production and delivery take?',
        'Samples usually dispatch in 2-3 days. Production typically takes 3-6 weeks after approvals, with UK delivery timing depending on freight method, customs clearance and compliance readiness.',
      ),
    ],
    ctaTitle: 'Plan your UK private label perfume launch',
    ctaDescription:
      'Share your UK brand brief, target customer, price point and launch channel. Brandsamor will guide sample selection, packaging planning, production steps and documentation support so your team can prepare for SCPN and Responsible Person review.',
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
      'Brandsamor supports Germany-focused private label perfume launches with curated fragrance samples, packaging coordination, MOQ from 100 units, indicative pricing from $10 per unit and EU-aware documentation planning for CPNP, Responsible Person review and clean or vegan positioning.',
    eyebrowPrefix: 'GERMANY LAUNCH',
    heroIllustration: ComplianceDocIllustration,
    ctaIllustration: ScentSamplesIllustration,
    areaServed: 'DE',
    keyFacts: {
      title: 'Germany private label perfume facts',
      description:
        'Germany launches should account for production cost, EU market compliance, labeling, freight, duties and the documentation needed by your Responsible Person before product is placed on the market.',
      facts: defaultKeyFacts({ market: 'Germany' }),
    },
    answerBlocks: [
      {
        id: 'germany-answer-manufacturer',
        question: 'Can Brandsamor help German brands launch private label perfume?',
        answer:
          'Yes. Brandsamor helps Germany-focused fragrance brands with curated samples, packaging coordination, production support and documentation. MOQ starts at 100 units, indicative pricing starts from $10 per unit, samples usually dispatch in 2-3 days, and production typically takes 3-6 weeks after approvals.',
        detail:
          'The model suits founders, beauty brands, boutiques and online retailers that want to validate a fragrance line before committing to large inventory or complex custom development.',
      },
      {
        id: 'germany-answer-eu-compliance',
        question: 'What EU compliance planning is needed for Germany?',
        answer:
          'Perfume sold in Germany must be planned under EU cosmetics rules, including Responsible Person arrangements, Product Information File readiness, compliant labeling and CPNP notification before market placement. Brandsamor provides supporting documentation, while the brand owner remains responsible for final compliance decisions.',
        detail:
          'Support can include IFRA certificates, COA, GMP and ISO 22716 production-standard context, MoCRA documentation for US-facing projects and halal certification support when relevant.',
      },
      {
        id: 'germany-answer-clean-vegan',
        question: 'Can Brandsamor support clean or vegan perfume positioning?',
        answer:
          'Brandsamor can help Germany-focused brands plan clean or vegan fragrance positioning by discussing formula direction, ingredient documentation, packaging choices and claim boundaries. Any clean, vegan, natural or sustainability claim should be supported by supplier information and reviewed before labels, listings or advertising go live.',
        detail:
          'Germany buyers often read claims carefully, so claim discipline is as important as scent quality and packaging design.',
      },
    ],
    sections: [
      {
        id: 'germany-market-fit',
        title: 'Private label perfume for Germany-focused brands',
        description:
          'German consumers often reward clarity: product quality, credible claims, restrained packaging and transparent information. Brandsamor helps founders and retailers start with fragrance samples, define the customer and choose packaging that matches the intended price point. A first batch can be built for learning before a wider EU rollout.',
        bullets: sectionBullets(
          'Use curated samples to test scent direction before production',
          'Plan products for boutiques, DTC, beauty retail, gifting or concept stores',
          'Keep packaging aligned with the price point and claim strategy',
          'Use a 100-unit MOQ to validate demand before scaling the range',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'germany-clean-vegan-demand',
        title: 'Clean, vegan and claim-conscious positioning',
        description:
          'Clean and vegan demand can be strong in Germany, but those terms need careful handling. Brandsamor can help you discuss vegan direction, allergen information, formula documentation and packaging choices. The final claim language should be checked against the actual formula, substantiation file, local expectations and EU cosmetics rules before production release.',
        bullets: sectionBullets(
          'Decide early whether clean, vegan or minimal-ingredient positioning matters',
          'Request documentation that supports claims rather than relying on marketing language',
          'Avoid vague sustainability promises that packaging or sourcing cannot support',
          'Keep German and EU claim review in mind before approving artwork',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'germany-eu-cpnp',
        title: 'EU CPNP, Responsible Person and PIF readiness',
        description:
          'A Germany launch is an EU cosmetics launch. Before placing perfume on the market, brands should plan for a Responsible Person, Product Information File, Cosmetic Product Safety Report where applicable, CPNP notification, compliant labeling and claim substantiation. Brandsamor can provide support documentation, but the brand owner remains responsible for final EU compliance.',
        bullets: sectionBullets(
          'Confirm your EU Responsible Person before market placement',
          'Prepare product data for CPNP notification and PIF assembly',
          'Review INCI, allergens, warnings, nominal content and responsible party details',
          'Keep IFRA, COA, GMP and ISO 22716 documentation organized for review',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'germany-documentation',
        title: 'Documentation as a commercial moat',
        description:
          `Documentation protects the brand, the retailer and the launch schedule. ${COMMERCIAL_COPY.certificationsSummary} For Germany, those materials should be reviewed by your Responsible Person or compliance advisor before sale. Brandsamor supports the document package, while your team owns registration, claims, language and lawful market placement.`,
        bullets: sectionBullets(
          'Ask for IFRA and COA support tied to the selected fragrance and batch',
          'Use GMP and ISO 22716 context when retailers ask about production standards',
          'Keep MoCRA documentation available if the same brand also sells into the US',
          'Treat halal support as project-specific and claim-dependent',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'germany-pricing-packaging',
        title: 'Costing a Germany launch realistically',
        description:
          'Indicative private label pricing starts from $10 per unit, and production starts at 100 units. Germany-focused planning should still include packaging upgrades, freight, duties, VAT, compliance review, Responsible Person fees, translation needs and retailer margin. A disciplined first batch makes it easier to learn without locking cash into an oversized assortment.',
        bullets: sectionBullets(
          'Model landed cost before setting retail or wholesale price',
          'Choose bottles and cartons that support the brand without excess complexity',
          'Leave label space for required EU information and language decisions',
          'Use reorder economics after the first batch proves demand',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'germany-production-shipping',
        title: 'Sampling, production and Germany delivery planning',
        description:
          'Available samples usually dispatch in 2-3 days. After fragrance, packaging, artwork and commercial details are approved, production typically takes 3-6 weeks. Delivery to Germany depends on freight mode, customs, documentation readiness and the import setup. Keep compliance and logistics work moving in parallel so finished goods do not wait unnecessarily.',
        bullets: sectionBullets(
          'Start compliance review while samples and packaging are being evaluated',
          'Confirm importer, Responsible Person and freight responsibilities early',
          'Approve a production sample before the full batch is released',
          'Document batch and artwork decisions for faster reorders',
        ),
        Illustration: DeliveryIllustration,
      },
    ],
    faqTitle: 'Germany private label perfume FAQ',
    faqDescription:
      'Answers for Germany-focused brands planning private label perfume with Brandsamor.',
    faqItems: [
      faq(
        'What is the MOQ for Germany private label perfume?',
        'Production starts at 100 units. This allows Germany-focused brands to validate scent direction, packaging and demand before scaling into larger EU inventory.',
      ),
      faq(
        'Does Brandsamor complete EU CPNP notification?',
        'Brandsamor provides supporting documentation, but your brand, importer or appointed Responsible Person remains responsible for CPNP notification, Product Information File readiness and lawful EU market placement.',
      ),
      faq(
        'Can Brandsamor support vegan or clean fragrance claims?',
        'Brandsamor can help discuss vegan or clean positioning and related documentation needs. Final claims must be supported by the formula, supplier information, packaging facts and review by your qualified advisor.',
      ),
      faq(
        'What documents are available for Germany launches?',
        'Support can include IFRA certificates, Certificates of Analysis, GMP and ISO 22716 production context, MoCRA documentation for US-facing projects and halal certification support where relevant.',
      ),
      faq(
        'How long does production take for Germany orders?',
        'Samples usually dispatch in 2-3 days. Production typically takes 3-6 weeks after all fragrance, packaging, artwork and commercial details are approved, with delivery timing depending on freight and customs.',
      ),
      faq(
        'Is Germany planning different from UK planning?',
        'Yes. Germany is an EU market and typically uses EU Responsible Person and CPNP planning. The UK uses separate post-Brexit SCPN requirements, so brands selling in both markets should plan both routes.',
      ),
    ],
    ctaTitle: 'Plan your Germany private label perfume launch',
    ctaDescription:
      'Share your Germany launch goals, customer profile, clean or vegan positioning, preferred product format and expected sales channel. Brandsamor will guide sample selection, packaging planning, documentation support and production timing.',
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
