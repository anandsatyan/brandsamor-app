import type { KbArticleBase } from './types';

/** Second batch of knowledge base articles (July 2026). */
export const KNOWLEDGE_BASE_ARTICLES_BATCH2: KbArticleBase[] = [
  {
    slug: 'choose-private-label-perfume-manufacturer',
    title: 'How to Find a Perfume Manufacturer',
    pageName: 'Find a Perfume Manufacturer',
    h1: 'How to Find a Perfume Manufacturer',
    targetKeyword: 'how to find a perfume manufacturer',
    description:
      'Learn how to compare perfume manufacturers based on sampling, packaging, documentation, quality checks, lead time and communication.',
    excerpt:
      'A practical vetting checklist for comparing private label partners—before you commit to bottles, MOQ, and your first production deposit.',
    readTimeMinutes: 11,
    relatedSlugs: [
      'questions-perfume-manufacturer-before-ordering',
      'perfume-manufacturing-india-usa-europe',
      'private-label-perfume-moq',
    ],
    sections: [
      {
        id: 'start-with-requirements',
        title: 'Start with your launch requirements, not a supplier list',
        paragraphs: [
          'Learning how to find a perfume manufacturer works best when you know what you are launching: one EDP in 50 ml, a boutique capsule, or a discovery set. Your format, target price, sales channel, and geography filter which partners can actually deliver—not just which ones rank well in search.',
          'Write a one-page brief covering retail price band, estimated first-batch quantity, markets you will sell in, and whether you need custom packaging or library scents. Use that brief to request comparable quotes instead of comparing unrelated headline MOQs.',
        ],
      },
      {
        id: 'evaluate-capabilities',
        title: 'What to evaluate in each manufacturer',
        paragraphs: [
          'Strong partners separate clearly what they compound in-house versus what they source (glass, pumps, print). Ask who holds the IFRA documentation, who fills and crimps, and who stores batch records. Ambiguity here causes delays at customs and retailer onboarding.',
        ],
        bullets: [
          'Fragrance library depth and whether exclusivity is available',
          'Filling, crimping, labeling, and boxing under one roof or via subcontractors',
          'Pre-production sample (PPS) process before bulk run',
          'Batch documentation: IFRA, COA, allergen declarations, SDS',
          'MOQ breakdown by component—not a single bundled number',
          'Communication cadence and a named project contact',
        ],
      },
      {
        id: 'sampling-process',
        title: 'Judge them on the sampling experience',
        paragraphs: [
          'Before production, you will live inside their sampling workflow for weeks. Note how fast samples ship, whether blotters are labeled clearly, and if they help narrow options instead of sending an overwhelming list.',
          'A manufacturer who asks about your customer, climate, and price point during sampling is usually easier to work with at PPS and bulk stages than one who only sends a catalog link.',
        ],
      },
      {
        id: 'references-and-proof',
        title: 'References, samples of finished work, and documentation samples',
        paragraphs: [
          'Request photos or physical examples of filled units at your intended price tier—not only empty bottles. Ask for redacted IFRA and COA examples to confirm format and batch traceability.',
          'If you plan wholesale or import, ask whether they routinely support U.S. or EU labeling requirements for your channel. A partner experienced in your market saves relabeling costs later.',
        ],
      },
      {
        id: 'red-flags',
        title: 'Red flags worth walking away from',
        paragraphs: [
          'Vague MOQ until after deposit, refusal to provide batch documentation, pressure to skip PPS, or inability to explain who the responsible party is on your label are serious warning signs.',
          'Extremely low per-unit quotes with no component breakdown often hide requotes after artwork approval. Compare total landed cost—including freight, duties, and rework risk—not juice price alone.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should I choose a manufacturer in my own country?',
        answer:
          'Not always. Domestic partners can simplify communication and freight, but overseas manufacturers with strong export experience often offer better component selection. Choose based on documentation, packaging fit, and total landed cost for your channel.',
      },
      {
        question: 'How many manufacturers should I shortlist?',
        answer:
          'Compare three to five on sampling speed, quote clarity, and documentation. Narrow to one or two for PPS once scent and packaging direction are clear.',
      },
      {
        question: 'Is the cheapest quote usually best for a first launch?',
        answer:
          'Rarely. Underpriced quotes often exclude box print, pump testing, or compliance files. Optimize for predictable delivery and complete paperwork, not the lowest juice line item.',
      },
    ],
  },
  {
    slug: 'is-private-label-perfume-profitable',
    title: 'Is Private Label Perfume Profitable?',
    pageName: 'Private Label Profitability',
    h1: 'Is Private Label Perfume Profitable?',
    targetKeyword: 'is private label perfume profitable',
    description:
      'Is private label perfume profitable? Margin structure, DTC vs wholesale economics, realistic unit costs, and when a fragrance line earns versus drains cash.',
    excerpt:
      'Honest economics for private label perfume—what margins look like by channel and what separates profitable launches from expensive experiments.',
    readTimeMinutes: 10,
    relatedSlugs: [
      'how-to-price-private-label-perfume',
      'calculate-retail-price-perfume',
      'perfume-brand-startup-cost',
    ],
    sections: [
      {
        id: 'short-answer',
        title: 'The short answer: it can be, but not by accident',
        paragraphs: [
          'Private label perfume is profitable when retail price, channel mix, and reorder velocity align with your landed unit cost. It is unprofitable when founders treat fragrance like a low-effort brand extension—high MOQ inventory with no distribution plan.',
          'Perfume has favorable perceived value: customers accept premium pricing for small volumes. That helps margins if you control packaging cost and sell primarily direct-to-consumer. Wholesale and retail consignment compress margins quickly.',
        ],
      },
      {
        id: 'margin-structure',
        title: 'Where margin comes from',
        paragraphs: [
          'Landed unit cost typically includes fragrance compound, bottle, pump, label, box, filling, QC, and inbound freight. For many private label EDP launches, total product cost often falls roughly between 18% and 35% of retail price at modest MOQ—before marketing, returns, and payroll.',
          'Marketing is the swing factor. A $68 bottle with healthy product margin can still lose money if customer acquisition cost exceeds contribution margin for twelve months.',
        ],
        bullets: [
          'DTC: higher gross margin, you pay for ads and fulfillment',
          'Wholesale: lower gross margin, retailer drives traffic',
          'Gifting and corporate: lump orders, price sensitivity on volume',
          'Boutique consignment: margin ok, cash flow slow until sell-through',
        ],
      },
      {
        id: 'when-it-works',
        title: 'When private label perfume tends to work',
        paragraphs: [
          'Existing audiences convert best: skincare brands with email lists, boutiques with walk-in traffic, hotels with guest touchpoints, creators with engaged communities. Fragrance rewards brands that already have trust.',
          'Profitable lines usually start with one hero SKU, prove repeat purchase or reorder from retailers, then expand. Discovery sets and travel sizes often support conversion without launching four full bottles on day one.',
        ],
      },
      {
        id: 'when-it-fails',
        title: 'When it fails',
        paragraphs: [
          'Over-ordering MOQ to get a lower unit price—then sitting on eighteen months of inventory—is the most common failure mode. Launching multiple scents before validating one erodes cash and focus.',
          'Underpricing to “gain market share” without a path to volume destroys margin in a category where packaging and juice costs have floors.',
        ],
      },
      {
        id: 'modeling',
        title: 'Model profitability before you order',
        paragraphs: [
          'Build a simple spreadsheet: units sold per month by channel, return rate, CAC, landed cost, and reorder lead time. If wholesale is 40% of revenue, assume retailer margin and payment terms in the model.',
          'Target contribution margin per bottle after variable costs—not only gross margin on paper. That number must cover fixed overhead and marketing with room left over.',
        ],
      },
    ],
    faq: [
      {
        question: 'What gross margin should I target?',
        answer:
          'Many DTC fragrance brands aim for 65–75% gross margin before marketing. Wholesale-heavy models may plan for 50–60% or less depending on retailer terms.',
      },
      {
        question: 'Is perfume more profitable than skincare?',
        answer:
          'Not inherently. Perfume can carry higher price per ml, but MOQ and packaging tooling can be steeper. Profitability depends on audience fit and inventory discipline.',
      },
      {
        question: 'How long until a private label line breaks even?',
        answer:
          'Varies widely. Brands with existing traffic may break even in a few months on one SKU. Cold-start brands should plan six to eighteen months unless pre-orders fund the first batch.',
      },
    ],
  },
  {
    slug: 'how-to-price-private-label-perfume',
    title: 'How to Price a Private Label Perfume',
    pageName: 'Price Private Label Perfume',
    h1: 'How to Price a Private Label Perfume',
    targetKeyword: 'how to price private label perfume',
    description:
      'How to price private label perfume for DTC and retail: cost-plus vs value-based pricing, keystone rules, wholesale tiers, and common pricing mistakes.',
    excerpt:
      'Set a retail price that covers landed cost, channel margin, and positioning—without racing to the bottom.',
    readTimeMinutes: 9,
    relatedSlugs: [
      'calculate-retail-price-perfume',
      'is-private-label-perfume-profitable',
      'perfume-brand-startup-cost',
    ],
    sections: [
      {
        id: 'two-methods',
        title: 'Cost-plus and value-based pricing both matter',
        paragraphs: [
          'Cost-plus pricing starts with landed unit cost and applies a multiplier to hit margin targets. Value-based pricing asks what your customer will pay given your brand story, bottle quality, and competitive set.',
          'Use cost-plus to set a floor—you cannot price below sustainable margin. Use value-based pricing to set the ceiling—what feels credible next to scents your customer already buys.',
        ],
      },
      {
        id: 'competitive-set',
        title: 'Anchor to a competitive set, not random luxury numbers',
        paragraphs: [
          'List five to eight products your customer already purchases at your retail point: indie DTC, niche boutique, or department store entrants. Note size, concentration, and packaging tier.',
          'Your price should be explainable in one sentence: “We sit between Brand A and Brand B because of concentration and glass weight.” If you cannot explain it, customers will not understand it either.',
        ],
      },
      {
        id: 'channel-tiers',
        title: 'Plan DTC, wholesale, and promo tiers together',
        paragraphs: [
          'Wholesale accounts typically expect keystone (50% off MSRP) or close to it. If MSRP is $72, wholesale near $36 leaves you room only if landed cost is controlled.',
          'Map planned promotions upfront—launch bundles, discovery sets, email discounts. Chronic deep discounting trains customers to wait for sales and erodes full-price credibility.',
        ],
        bullets: [
          'MSRP: public full price on your site and shelf tag',
          'Wholesale: retailer margin built in from day one',
          'Promo floor: lowest price you can run without losing money',
          'MAP policy: if you protect retailer partners, document it',
        ],
      },
      {
        id: 'format-and-size',
        title: 'Let format and ml size carry part of the story',
        paragraphs: [
          'A 30 ml travel size and a 50 ml flagship can price differently per ml without confusing customers—if names and positioning differ. Discovery sets price on perceived experimentation value, not juice cost alone.',
        ],
      },
      {
        id: 'mistakes',
        title: 'Pricing mistakes to avoid',
        paragraphs: [
          'Pricing low to “test the market” often signals low quality in fragrance. Pricing high without packaging or story to support it increases returns and bad reviews.',
          'Forgetting freight, duties, and payment processing in margin math creates surprise losses on international DTC orders.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is keystone pricing?',
        answer:
          'Keystone means wholesale is roughly half of MSRP, giving retailers a 50% margin when they sell at full price.',
      },
      {
        question: 'Should my first SKU be mid-range or premium?',
        answer:
          'Most successful private label launches price in the middle of their competitive set—credible quality without requiring a long education story on day one.',
      },
      {
        question: 'When should I raise price?',
        answer:
          'After packaging upgrade, concentration change, or proven sell-through—not randomly. Communicate changes clearly to wholesale accounts with lead time.',
      },
    ],
  },
  {
    slug: 'launch-one-scent-or-several',
    title: 'Should a New Perfume Brand Launch One Scent or Several?',
    pageName: 'One Scent or Several',
    h1: 'Should a New Perfume Brand Launch One Scent or Several?',
    targetKeyword: 'launch one perfume scent or several',
    description:
      'Should a new perfume brand launch one scent or several? MOQ, cash flow, merchandising, and when a small collection beats a single hero SKU.',
    excerpt:
      'One hero scent vs a mini collection—how to decide based on MOQ, audience, and how you plan to sell.',
    readTimeMinutes: 8,
    relatedSlugs: [
      'balanced-first-fragrance-collection',
      'launch-perfume-discovery-set',
      'private-label-perfume-moq',
    ],
    sections: [
      {
        id: 'default',
        title: 'Default recommendation: one hero scent first',
        paragraphs: [
          'Most new private label brands should launch one hero scent first. One SKU concentrates sampling, packaging approval, marketing budget, and inventory risk. Customers forgive a focused launch; they rarely forgive a confusing shelf of half-developed scents.',
          'A single flagship also simplifies storytelling: one name, one campaign, one reorder conversation with boutiques.',
        ],
      },
      {
        id: 'when-multiple',
        title: 'When launching two or three scents makes sense',
        paragraphs: [
          'Multi-SKU day-one launches fit established brands with existing traffic—hotels launching guest amenities plus retail, fashion houses with seasonal collections, or boutiques merchandising a house line.',
          'If you launch several scents, share bottles and boxes where possible to avoid multiplying MOQ across unrelated components.',
        ],
        bullets: [
          'You already have a captive audience (hotel, salon chain, museum shop)',
          'Wholesale buyer requires a minimum assortment',
          'Scents share packaging platform to control MOQ',
          'You are launching a discovery set, not four full-size heroes',
        ],
      },
      {
        id: 'discovery-middle',
        title: 'Discovery sets as a middle path',
        paragraphs: [
          'A discovery set—several vials or minis of different scents—lets customers explore without you filling four 100 ml bottles on day one. Conversion data from sets informs which full size to produce next.',
        ],
      },
      {
        id: 'cash-flow',
        title: 'Cash flow and MOQ reality',
        paragraphs: [
          'Each additional full-size SKU multiplies fragrance MOQ, label print runs, and marketing assets. Two scents rarely cost twice one scent—shared components help, but inventory risk still doubles.',
          'Plan second scent production only after first scent hits a clear trigger: e.g., 70% sell-through of batch one or repeatable wholesale reorders.',
        ],
      },
    ],
    faq: [
      {
        question: 'Can I launch one scent and add another in three months?',
        answer:
          'Yes, if production lead times and cash allow. Many brands add a second SKU once the hero scent has reviews and repeat buyers.',
      },
      {
        question: 'Do boutiques require multiple scents?',
        answer:
          'Some do; many will trial one SKU with testers and expand after sell-through. Ask buyers before assuming you need a full collection.',
      },
      {
        question: 'Is a duo (two scents) a good compromise?',
        answer:
          'A day/night or masculine/feminine duo can work for specific retailers if packaging is shared and MOQ stays manageable.',
      },
    ],
  },
  {
    slug: 'how-to-evaluate-perfume-samples',
    title: 'How to Evaluate Perfume Samples',
    pageName: 'Evaluate Perfume Samples',
    h1: 'How to Evaluate Perfume Samples',
    targetKeyword: 'how to evaluate perfume samples',
    description:
      'How to evaluate perfume samples properly: blotter vs skin testing, dry-down timing, climate, panel feedback, and documentation before production approval.',
    excerpt:
      'A structured process for comparing fragrance samples—so you choose based on wear, not first spray alone.',
    readTimeMinutes: 10,
    relatedSlugs: [
      'how-many-fragrance-samples-to-test',
      'how-to-write-fragrance-brief',
      'choose-fragrances-for-target-customer',
    ],
    sections: [
      {
        id: 'blotter-first',
        title: 'Start on blotter, decide on skin',
        paragraphs: [
          'Blotter strips filter obvious mismatches fast: too sweet, too loud, wrong family. They do not show how a scent interacts with skin chemistry or how it evolves over hours.',
          'Promote only finalists to skin testing. Wear each on one wrist, one scent per day, same application count—usually two to four sprays depending on concentration.',
        ],
      },
      {
        id: 'dry-down',
        title: 'Evaluate the dry-down, not the opening',
        paragraphs: [
          'Top notes fade within minutes. Customers live in the heart and base for most of the wear day. Note scent at 15 minutes, 2 hours, 6 hours, and next morning if longevity matters to your positioning.',
          'Document in a simple log: date, scent code, weather, and three words per checkpoint. Memory lies; notes do not.',
        ],
      },
      {
        id: 'context',
        title: 'Test in realistic context',
        paragraphs: [
          'Wear finalists during activities your customer actually does: commute, gym, dinner, office. A scent that shines on Saturday evening may be wrong for daily boutique clientele.',
          'If you sell in hot climates, test in heat and humidity. Fresh structures can collapse; heavy ambers can become overwhelming.',
        ],
      },
      {
        id: 'panel',
        title: 'Run a small blind panel',
        paragraphs: [
          'Ten to fifteen people in your target segment beats fifty random opinions. Blind test numbered samples; ask which they would buy at your planned price—not which smells “best.”',
          'Include at least two people with sensitive skin or fragrance allergies in your process if your brand claims clean or hypo-conscious positioning—watch for irritation, not only preference.',
        ],
      },
      {
        id: 'in-packaging',
        title: 'Evaluate in bottle before bulk',
        paragraphs: [
          'Spray from a pilot fill or PPS when possible. Alcohol, bottle headspace, and pump atomization slightly change perception versus a sample vial.',
        ],
      },
    ],
    faq: [
      {
        question: 'How long should I wear each finalist?',
        answer:
          'At least three full days per finalist on skin, plus one blotter round to reconfirm. Longevity claims need overnight checks.',
      },
      {
        question: 'Should I compare samples side by side on both wrists?',
        answer:
          'Only for early elimination. Final choice should come from single-scent full-day wears to avoid olfactory fatigue.',
      },
      {
        question: 'What if my team disagrees?',
        answer:
          'Weight opinions by target customer fit, not personal taste. Tie-break with blind panel “would buy” votes at your price point.',
      },
    ],
  },
  {
    slug: 'boutique-perfume-line-launch',
    title: 'How Boutiques Can Launch Their Own Perfume Line',
    pageName: 'Boutique Perfume Launch',
    h1: 'How Boutiques Can Launch Their Own Perfume Line',
    targetKeyword: 'boutique launch own perfume line',
    description:
      'How boutiques can launch their own perfume line: capsule sizing, house-brand positioning, tester programs, margins, and reorder planning without overstocking.',
    excerpt:
      'A boutique-first path to a house fragrance—small batches, local story, and retail economics that fit independent stores.',
    readTimeMinutes: 10,
    relatedSlugs: [
      'sell-private-label-perfume-boutique',
      'launch-one-scent-or-several',
      'test-demand-before-perfume-inventory',
    ],
    sections: [
      {
        id: 'why-boutiques',
        title: 'Why boutiques launch house fragrance',
        paragraphs: [
          'A house perfume extends the boutique’s aesthetic into a product customers use daily—keeping the store present in their routine long after a visit. It also captures margin on a category that otherwise goes to third-party brands.',
          'Private label makes this practical: you do not need a perfumer on payroll. You need a scent that matches your edit, packaging that looks like your shop, and quantities that respect cash flow.',
        ],
      },
      {
        id: 'positioning',
        title: 'Position as a house capsule, not a generic dupe',
        paragraphs: [
          'Name the scent after your neighborhood, founder story, or seasonal mood tied to your inventory. Customers buy boutique perfume for provenance and curation—not because it is the cheapest option on the shelf.',
          'Keep visual language aligned with your hang tags, bags, and Instagram. Consistency signals that the fragrance belongs in your world.',
        ],
      },
      {
        id: 'assortment',
        title: 'Start small: one scent or a tight duo',
        paragraphs: [
          'One 50 ml hero scent plus a travel size or roller is enough for year one. Testers at the counter drive discovery; full bottles stay scarce enough to feel special.',
          'If your customer base spans distinct tastes, consider a discovery set before committing to two full-size SKUs with separate MOQs.',
        ],
      },
      {
        id: 'economics',
        title: 'Economics that work for independent retail',
        paragraphs: [
          'Model sell-through on foot traffic, not national projections. If you sell twenty units a month at full price with healthy margin, size MOQ to cover six months plus lead time—not two years.',
          'Track tester conversion: how many full bottles sell per month per tester unit. Weak conversion means scent or price mismatch, not “more marketing.”',
        ],
      },
      {
        id: 'operations',
        title: 'Operations: testers, storage, and staff training',
        paragraphs: [
          'Train staff with three talking points: fragrance family, who it is for, and one wearing tip. Boutiques win on conversation, not note pyramids on shelf talkers.',
          'Store fragrance away from direct sun and heat vents. Replace testers on a schedule—oxidized testers misrepresent the product and kill sales.',
        ],
      },
    ],
    faq: [
      {
        question: 'What price point fits boutique house lines?',
        answer:
          'Often mid-premium relative to your apparel or home goods—high enough to signal quality, aligned with what your shopper already spends on indie fragrance.',
      },
      {
        question: 'Should the boutique name be on the bottle?',
        answer:
          'Usually yes for house lines. It reinforces brand equity every time the customer picks up the bottle at home.',
      },
      {
        question: 'Can I sell wholesale to other boutiques later?',
        answer:
          'Some boutiques expand regionally after local proof. Negotiate exclusivity radius with your manufacturer if that matters to your strategy.',
      },
    ],
  },
  {
    slug: 'private-label-perfume-fashion-brands',
    title: 'Private Label Perfume for Fashion Brands',
    pageName: 'Fashion Brand Perfume',
    h1: 'Private Label Perfume for Fashion Brands',
    targetKeyword: 'private label perfume fashion brands',
    description:
      'Private label perfume for fashion brands: brand extension strategy, seasonal alignment, packaging coherence, gifting, and launch timing with collections.',
    excerpt:
      'How fashion labels add fragrance without losing visual identity—seasonal caps, gifting, and launch timing that fits the collection calendar.',
    readTimeMinutes: 9,
    relatedSlugs: [
      'beauty-brand-add-fragrance-category',
      'how-to-write-fragrance-brief',
      'choose-perfume-bottle-and-packaging',
    ],
    sections: [
      {
        id: 'extension-logic',
        title: 'Fragrance as brand extension, not an afterthought',
        paragraphs: [
          'Fashion customers already buy into your taste. Fragrance should feel like another chapter of the same book—same restraint, same color story, same attitude—not a licensed product bolted on for margin.',
          'Private label lets you move at collection speed: sample during look development, align bottle color with seasonal palette, launch fragrance at lookbook drop or flagship event.',
        ],
      },
      {
        id: 'scent-direction',
        title: 'Translate runway mood into scent brief',
        paragraphs: [
          'Work with reference images, fabrics, and music—not only note lists. “Soft tailoring, coastal light, unisex” gives a perfumer more useful direction than “woody floral.”',
          'Fashion brands often succeed with approachable signatures first; avant-garde scents can follow once core customers trust the category.',
        ],
      },
      {
        id: 'packaging',
        title: 'Packaging must match garment quality cues',
        paragraphs: [
          'If your dresses use substantial hardware and thick fabrics, a feather-light bottle undercuts the story. Cap weight, label typography, and box texture should echo your hang-tag standard.',
          'Consider limited seasonal sleeves or outer wraps for fashion week gifting without reprinting entire carton runs each season.',
        ],
      },
      {
        id: 'channels',
        title: 'DTC, flagship, and wholesale selectively',
        paragraphs: [
          'Many fashion brands launch fragrance DTC and in flagship stores first to control education and photography. Selective boutique wholesale works when partners match your price tier.',
          'Department store distribution usually demands higher marketing spend and compliance overhead—plan that only after DTC proves velocity.',
        ],
      },
      {
        id: 'gifting',
        title: 'Gifting and VIP programs',
        paragraphs: [
          'Travel sizes and discovery sets support VIP seeding, show invitations, and post-purchase gifts. Track which scents drive full-size conversion from gift recipients.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should fashion brands launch unisex scents?',
        answer:
          'Often yes—especially for contemporary labels. Position with story and styling rather than traditional gender marketing unless your brand is explicitly gendered.',
      },
      {
        question: 'How do I time fragrance with seasonal drops?',
        answer:
          'Begin sampling one season ahead of launch. Fragrance production lead times often exceed garment production—build fragrance into the calendar early.',
      },
      {
        question: 'Can I match scent to a collection name?',
        answer:
          'Yes, but trademark clearance on scent names matters as much as apparel. Check availability before printing labels.',
      },
    ],
  },
  {
    slug: 'questions-perfume-manufacturer-before-ordering',
    title: 'Questions to Ask a Perfume Manufacturer Before Ordering',
    pageName: 'Manufacturer Questions',
    h1: 'Questions to Ask a Perfume Manufacturer Before Ordering',
    targetKeyword: 'questions to ask perfume manufacturer',
    description:
      'Essential questions to ask a perfume manufacturer before ordering: MOQ, lead times, documentation, exclusivity, rework policy, payment terms, and labeling support.',
    excerpt:
      'A pre-order question checklist—covering MOQ, paperwork, timelines, and what happens when something goes wrong.',
    readTimeMinutes: 11,
    relatedSlugs: [
      'choose-private-label-perfume-manufacturer',
      'perfume-manufacturer-documents',
      'private-label-perfume-moq',
    ],
    sections: [
      {
        id: 'scope',
        title: 'Scope and capabilities',
        paragraphs: [
          'Clarify what the manufacturer actually does versus what they broker. Misaligned assumptions about filling, labeling, or documentation cause most production disputes.',
        ],
        bullets: [
          'Do you compound fragrance, fill, crimp, label, and box in-house?',
          'Which product types do you support (EDP, EDT, mist, oil, room spray)?',
          'Can you share examples similar to our price tier and format?',
          'Who is our single point of contact during production?',
        ],
      },
      {
        id: 'moq-and-cost',
        title: 'MOQ, pricing, and payment',
        paragraphs: [
          'Request itemized quotes: juice, bottle, pump, label, box, filling, QC, documentation, and freight. Ask what triggers a requote.',
        ],
        bullets: [
          'What is MOQ per SKU and per component (bottle, label, box)?',
          'Can MOQ be split across scents with shared packaging?',
          'What is the deposit schedule and balance due before shipment?',
          'What happens to unused components if we cancel after artwork approval?',
        ],
      },
      {
        id: 'timeline',
        title: 'Timeline and approvals',
        paragraphs: [
          'Get week ranges for sampling, PPS, bulk production, and shipping. Ask what they need from you to hold a production slot.',
        ],
        bullets: [
          'What is typical lead time after PPS approval?',
          'How many artwork revision rounds are included?',
          'Do you provide a written timeline with approval gates?',
          'What commonly causes delays with projects like ours?',
        ],
      },
      {
        id: 'compliance',
        title: 'Compliance and documentation',
        paragraphs: [
          'Align on documents per batch before deposit. Gaps discovered at import or retailer onboarding are expensive to fix.',
        ],
        bullets: [
          'Will we receive IFRA, COA, allergen declaration, and SDS per batch?',
          'Who is listed as responsible party on U.S. labels?',
          'Do you support FDA cosmetic labeling and lot coding?',
          'Can you provide redacted examples of prior batch files?',
        ],
      },
      {
        id: 'quality',
        title: 'Quality, rework, and defects',
        paragraphs: [
          'Understand acceptance criteria and remedy if fill levels, crimps, or scent variation fail inspection.',
        ],
        bullets: [
          'What QC checks run on each batch?',
          'What defect rate is acceptable and what triggers remake?',
          'How are customer complaints and batch traceability handled?',
          'Is exclusivity available for our market or channel?',
        ],
      },
    ],
    faq: [
      {
        question: 'When should I ask these questions?',
        answer:
          'During shortlist comparison—before paying a production deposit. Confirm answers in writing in your purchase order or agreement.',
      },
      {
        question: 'Should I use a lawyer for the contract?',
        answer:
          'For first production runs above your risk tolerance, a short legal review of payment, IP, exclusivity, and defect remedies is worthwhile.',
      },
      {
        question: 'What if they will not answer documentation questions?',
        answer:
          'Treat that as a disqualifier if you sell wholesale, online marketplaces, or import finished goods.',
      },
    ],
  },
  {
    slug: 'how-many-fragrance-samples-to-test',
    title: 'How Many Fragrance Samples Should You Test Before Launching?',
    pageName: 'How Many Samples to Test',
    h1: 'How Many Fragrance Samples Should You Test Before Launching?',
    targetKeyword: 'how many fragrance samples to test before launch',
    description:
      'How many fragrance samples to test before launching a perfume line: exploration vs finalist rounds, panel size, and when more samples hurt decisions.',
    excerpt:
      'Sample counts by stage—from first library pass to final skin wears—so you decide faster without skipping due diligence.',
    readTimeMinutes: 8,
    relatedSlugs: [
      'how-to-evaluate-perfume-samples',
      'choose-fragrances-for-target-customer',
      'how-to-write-fragrance-brief',
    ],
    sections: [
      {
        id: 'by-stage',
        title: 'Sample counts by stage',
        paragraphs: [
          'Think in three rounds: exploration, shortlist, and finalist validation. Each round has a different job; combining them into one giant mailer slows decisions.',
        ],
        bullets: [
          'Round 1 — Exploration: 8–15 library scents on blotter',
          'Round 2 — Shortlist: 3–5 scents on skin, multi-day wears',
          'Round 3 — Finalists: 2–3 scents with panel feedback and in-packaging test',
        ],
      },
      {
        id: 'diminishing-returns',
        title: 'When more samples hurt',
        paragraphs: [
          'Beyond roughly fifteen exploration samples, teams suffer choice fatigue and delay packaging work. More options rarely improve fit if your brief is vague—fix the brief first.',
          'If none of fifteen match, the issue is usually positioning (price, customer, climate) not library size. Refine direction with your partner instead of requesting thirty more vials.',
        ],
      },
      {
        id: 'custom-development',
        title: 'Custom development sample counts',
        paragraphs: [
          'Custom perfumery adds revision rounds—often three to six modifications after an initial mod set. Budget time and fees separately from library sampling.',
        ],
      },
      {
        id: 'panel-size',
        title: 'How many people should weigh in',
        paragraphs: [
          'Core team of two to four decides process; blind panel of ten to fifteen target customers breaks ties. Everyone in the company sniffing once is not a substitute for structured panel feedback.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is ten samples enough for a first launch?',
        answer:
          'Often yes if they are curated to your brief. Ten random bestsellers from a catalog is not the same as ten on-brief options.',
      },
      {
        question: 'Should I test samples seasonally?',
        answer:
          'If you launch year-round in variable climates, wear finalists across at least two weather conditions when possible.',
      },
      {
        question: 'Can I skip blotter and go straight to skin?',
        answer:
          'You can, but blotter eliminates obvious mismatches faster and preserves skin testing for serious finalists.',
      },
    ],
  },
  {
    slug: 'test-demand-before-perfume-inventory',
    title: 'How to Test Demand Before Ordering Perfume Inventory',
    pageName: 'Test Demand Before Inventory',
    h1: 'How to Test Demand Before Ordering Perfume Inventory',
    targetKeyword: 'test demand before ordering perfume inventory',
    description:
      'How to test demand before ordering perfume inventory: waitlists, pre-orders, sample kits, pop-ups, boutique pilots, and metrics that justify MOQ.',
    excerpt:
      'Validate interest before your first bulk batch—practical demand tests that do not require guessing MOQ.',
    readTimeMinutes: 10,
    relatedSlugs: [
      'launch-one-scent-or-several',
      'boutique-perfume-line-launch',
      'private-label-perfume-moq',
    ],
    sections: [
      {
        id: 'why-test',
        title: 'Why demand testing beats optimism',
        paragraphs: [
          'MOQ commits cash for months. Demand testing collects evidence—emails, deposits, sell-through, repeat interest—so your first batch size matches reality.',
          'Testing does not require a finished bottle. It requires a clear offer: scent direction, price band, size, and story.',
        ],
      },
      {
        id: 'low-cost-tests',
        title: 'Low-cost tests before production',
        paragraphs: [
          'These methods rank by increasing effort and signal strength.',
        ],
        bullets: [
          'Landing page waitlist with scent mood board and target price',
          'Paid sample vials or discovery cards shipped to subscribers',
          'Pop-up or event wear tests with QR feedback form',
          'Boutique consignment pilot on ten to twenty units',
          'Limited pre-order with transparent ship date after PPS',
        ],
      },
      {
        id: 'metrics',
        title: 'Metrics that justify inventory',
        paragraphs: [
          'Define success before you test. Examples: 200 waitlist signups at stated price, 30% of sample recipients say “would buy,” or boutique sells 60% of consignment units in sixty days.',
          'Vanity metrics—social likes without price context—do not justify MOQ.',
        ],
      },
      {
        id: 'pre-orders',
        title: 'Pre-orders: opportunity and risk',
        paragraphs: [
          'Pre-orders fund production but create delivery obligation. Only open pre-orders after scent finalist and realistic timeline from your manufacturer. Communicate delays early if PPS slips.',
          'Refund policy and chargeback risk matter for long lead times. Many brands pre-sell only after PPS approval when ship date is firm.',
        ],
      },
      {
        id: 'existing-audience',
        title: 'Leverage audiences you already own',
        paragraphs: [
          'Email lists, store foot traffic, and hotel guest databases convert better than cold ads. Fragrance demand testing works best when trust exists—exactly where private label shines.',
        ],
      },
    ],
    faq: [
      {
        question: 'Can I test demand without revealing the final scent?',
        answer:
          'Yes—test mood, price, and format with directional samples or concept pages. Final scent approval still happens before bulk.',
      },
      {
        question: 'How long should demand testing run?',
        answer:
          'Four to eight weeks is common for waitlists and sample programs—long enough to see repeat interest, short enough to keep momentum.',
      },
      {
        question: 'What if demand is weak?',
        answer:
          'Revise scent, price, or channel before ordering MOQ. Weak demand at sample stage is cheaper than weak demand with a warehouse full of bottles.',
      },
    ],
  },
  {
    slug: 'calculate-retail-price-perfume',
    title: 'How to Calculate the Retail Price of a Perfume',
    pageName: 'Calculate Retail Price',
    h1: 'How to Calculate the Retail Price of a Perfume',
    targetKeyword: 'how to calculate retail price of perfume',
    description:
      'How to calculate retail price for perfume: landed cost, margin targets, keystone wholesale math, payment fees, and a worked example for private label EDP.',
    excerpt:
      'Step-by-step retail price math from landed unit cost through DTC and wholesale margin targets.',
    readTimeMinutes: 9,
    relatedSlugs: [
      'how-to-price-private-label-perfume',
      'is-private-label-perfume-profitable',
      'perfume-brand-startup-cost',
    ],
    sections: [
      {
        id: 'landed-cost',
        title: 'Step 1: Calculate landed unit cost',
        paragraphs: [
          'Add every cost to put one sellable unit in your hand: fragrance compound, bottle, pump, label, box, filling, QC, inbound freight to your warehouse, and allocated tooling (plates, molds) across your first run.',
          'Divide one-time costs by first-batch quantity so you do not underestimate per-unit economics.',
        ],
        bullets: [
          'Juice + alcohol carrier per ml filled',
          'Primary packaging and closure',
          'Secondary packaging and inserts',
          'Filling, assembly, documentation fees',
          'Inbound freight and duties per unit',
        ],
      },
      {
        id: 'margin-target',
        title: 'Step 2: Apply your channel margin target',
        paragraphs: [
          'For DTC, many brands target product cost at 25–35% of MSRP before marketing. Formula: MSRP ≈ Landed Cost ÷ Target Cost Percentage.',
          'Example: $18 landed cost at 30% cost-of-goods target suggests MSRP around $60 before rounding for positioning.',
        ],
      },
      {
        id: 'variable-costs',
        title: 'Step 3: Subtract variable selling costs',
        paragraphs: [
          'Payment processing, shipping subsidies, marketplace fees, and return allowances eat margin. If you absorb free shipping, include average outbound postage in contribution margin math—not only product cost.',
        ],
      },
      {
        id: 'wholesale',
        title: 'Step 4: Check wholesale viability',
        paragraphs: [
          'If wholesale price is 50% of MSRP, your landed cost must still leave profit after retailer margin. If $60 MSRP implies $30 wholesale, $18 landed leaves $12 before ops and marketing—tight for many indie models.',
          'Either raise MSRP, lower landed cost, or limit wholesale until volume improves.',
        ],
      },
      {
        id: 'rounding',
        title: 'Step 5: Round for positioning',
        paragraphs: [
          'Mathematical price and credible price differ. $58 vs $62 signals different competitive sets. Adjust within your margin floor based on competitive research—not only spreadsheets.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should I include marketing in retail price calculation?',
        answer:
          'Marketing is usually modeled separately as CAC payback. Product pricing should cover landed cost and channel fees first.',
      },
      {
        question: 'What cost percentage is too high?',
        answer:
          'If landed cost exceeds 40% of MSRP before marketing, growth becomes difficult unless LTV is exceptionally strong.',
      },
      {
        question: 'Do discovery sets use the same formula?',
        answer:
          'Yes, but perceived value often supports higher margin than juice cost alone suggests—price the experience of trying multiple scents.',
      },
    ],
  },
  {
    slug: 'fda-mocra-requirements-perfume-brands',
    title: 'FDA MoCRA Requirements for Perfume Brands',
    pageName: 'FDA MoCRA Perfume',
    h1: 'FDA MoCRA Requirements for Perfume Brands',
    targetKeyword: 'FDA MoCRA requirements perfume brands',
    description:
      'FDA MoCRA requirements for perfume brands sold in the U.S.: facility registration, product listing, adverse event reporting, safety substantiation, labeling, and responsible person duties.',
    excerpt:
      'What U.S. perfume brands need to know about MoCRA—registration, listing, adverse events, and safety records.',
    readTimeMinutes: 11,
    relatedSlugs: [
      'perfume-manufacturer-documents',
      'import-private-label-perfume-usa',
      'how-ifra-certificates-work',
    ],
    sections: [
      {
        id: 'what-is-mocra',
        title: 'What MoCRA changed for cosmetics in the U.S.',
        paragraphs: [
          'The Modernization of Cosmetics Regulation Act (MoCRA), enacted in late 2022, expanded FDA authority over cosmetics—including perfume sold as cosmetic products. MoCRA is not a fragrance-specific law, but perfume brands are subject to its facility, listing, safety, and adverse event rules.',
          'MoCRA does not replace IFRA industry standards or EU cosmetic rules if you export. Think of it as the U.S. baseline for responsible persons marketing cosmetic products domestically.',
        ],
      },
      {
        id: 'registration-listing',
        title: 'Facility registration and product listing',
        paragraphs: [
          'Responsible persons must register facilities that manufacture or process cosmetic products for U.S. distribution and list products with FDA. Many private label brands are the responsible person even when an overseas partner fills the product.',
          'Confirm whether your manufacturer’s U.S. entity handles any registration on your behalf—most brands still need clarity on who lists the product under their brand name.',
        ],
      },
      {
        id: 'adverse-events',
        title: 'Serious adverse event reporting',
        paragraphs: [
          'MoCRA requires serious adverse event reports to FDA within 15 business days, with follow-up records. Train customer service to escalate rash, hospitalization, or similar reports—not only “smells weak” complaints.',
          'Maintain complaint logs tied to batch or lot codes printed on packaging.',
        ],
      },
      {
        id: 'safety-substantiation',
        title: 'Safety substantiation and records',
        paragraphs: [
          'Brands must maintain evidence that products are safe under labeled conditions of use. For fragrance, that typically includes IFRA conformity, supplier safety assessments, stability data, and batch COAs archived by lot.',
          'MoCRA grants FDA access to safety and manufacturing records during inspections—disorganized files become compliance risk.',
        ],
      },
      {
        id: 'labeling',
        title: 'Labeling and responsible person contact',
        paragraphs: [
          'U.S. cosmetic labeling still requires product identity, net quantity, ingredient declaration, and responsible person name and address. MoCRA reinforced record-keeping around labeling accuracy.',
          'Fragrance allergens are not labeled in the EU Annex III style in the U.S. at the time of writing, but ingredient transparency rules differ by market—do not assume one label works globally without review.',
        ],
      },
      {
        id: 'practical-steps',
        title: 'Practical steps for private label founders',
        paragraphs: [
          'Before scaling U.S. sales: confirm responsible person role, register and list products per current FDA timelines, collect batch documentation from your manufacturer, and document safety rationale for your formula and format.',
          'Work with a U.S. regulatory advisor for your specific entity structure—especially if you import finished goods or sell through large retailers with vendor compliance portals.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is perfume a cosmetic under FDA rules?',
        answer:
          'Generally yes when sold for scent on the body. Different rules may apply to air care or non-cosmetic claims—product classification depends on intended use and claims.',
      },
      {
        question: 'Does IFRA compliance satisfy MoCRA?',
        answer:
          'IFRA supports safety substantiation but does not replace MoCRA registration, listing, labeling, or adverse event obligations.',
      },
      {
        question: 'Do small brands get exemptions?',
        answer:
          'MoCRA includes limited small-business exemptions for certain requirements, but adverse event reporting and safety substantiation still apply broadly. Confirm eligibility with a qualified advisor.',
      },
    ],
  },
  {
    slug: 'beauty-brand-add-fragrance-category',
    title: 'How Beauty Brands Can Add a Fragrance Category',
    pageName: 'Beauty Brand Fragrance',
    h1: 'How Beauty Brands Can Add a Fragrance Category',
    targetKeyword: 'beauty brand add fragrance category',
    description:
      'How beauty brands can add fragrance: customer overlap, SKU strategy, bundling with skincare, regulatory continuity, and private label launch sequencing.',
    excerpt:
      'Adding perfume to skincare or makeup—where it fits in the assortment, how to bundle, and how to launch without distracting from hero products.',
    readTimeMinutes: 9,
    relatedSlugs: [
      'private-label-perfume-fashion-brands',
      'launch-one-scent-or-several',
      'how-to-start-a-perfume-line',
    ],
    sections: [
      {
        id: 'why-add',
        title: 'Why beauty brands add fragrance',
        paragraphs: [
          'Fragrance increases basket size, improves gifting revenue, and extends brand memory beyond the bathroom shelf. Customers who trust your cleanser are predisposed to try your scent if it feels coherent.',
          'Private label avoids the R&D timeline of bespoke perfumery while letting you control bottle and story—important when your visual brand is already established.',
        ],
      },
      {
        id: 'customer-fit',
        title: 'Confirm customer overlap before formulas',
        paragraphs: [
          'Survey email subscribers: do they already wear fragrance daily? What price band? A clean-skincare audience may prefer lighter EDP or mist formats over heavy orientals.',
          'Match scent family to brand values—clinical minimal brands rarely succeed with sugary gourmands without cognitive dissonance.',
        ],
      },
      {
        id: 'sku-strategy',
        title: 'SKU strategy: hero scent vs line extension',
        paragraphs: [
          'Most beauty brands add one signature scent first, then consider body mist or travel size—not four perfumes at launch. Fragrance should amplify your hero franchise, not fragment merchandising focus.',
        ],
      },
      {
        id: 'bundling',
        title: 'Bundling and cross-merchandising',
        paragraphs: [
          'Routine bundles (cleanser + fragrance mini) lift trial. GWP fragrance samples in skincare orders seed data on which scent to scale.',
          'Train support and social teams on how fragrance fits your routine story—application tips reduce returns on first-time buyers.',
        ],
      },
      {
        id: 'compliance',
        title: 'Compliance continuity',
        paragraphs: [
          'If you already sell cosmetics in the U.S., MoCRA processes likely exist—extend them to fragrance SKUs. Ingredient lists, responsible person, and adverse event workflows should match your current ops.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should fragrance match skincare scent?',
        answer:
          'Optional. Some brands align subtle scent profiles; others launch distinct fine fragrance. Test customer expectation in surveys.',
      },
      {
        question: 'Body mist or EDP first?',
        answer:
          'EDP supports premium positioning; mist supports daily layering and lower price entry. Choose based on your price ladder.',
      },
      {
        question: 'When is fragrance a distraction?',
        answer:
          'If core SKUs have quality or stock issues, fix those first. Fragrance launches need marketing bandwidth like any hero product.',
      },
    ],
  },
  {
    slug: 'launch-perfume-discovery-set',
    title: 'How to Launch a Perfume Discovery Set',
    pageName: 'Perfume Discovery Set',
    h1: 'How to Launch a Perfume Discovery Set',
    targetKeyword: 'launch perfume discovery set',
    description:
      'How to launch a perfume discovery set: vial formats, scent count, pricing, packaging, conversion to full size, and MOQ planning for sampler SKUs.',
    excerpt:
      'Discovery sets that convert—format choices, how many vials to include, pricing logic, and when a set beats launching multiple full bottles.',
    readTimeMinutes: 10,
    relatedSlugs: [
      'launch-one-scent-or-several',
      'balanced-first-fragrance-collection',
      'how-to-evaluate-perfume-samples',
    ],
    sections: [
      {
        id: 'purpose',
        title: 'What a discovery set should accomplish',
        paragraphs: [
          'A discovery set sells experimentation. It lowers commitment for new customers, helps boutiques stock breadth without four full-size MOQs, and gives you data on which scent to produce next at full size.',
          'It is not a discount bundle disguised as luxury—price and presentation should still feel on-brand.',
        ],
      },
      {
        id: 'format',
        title: 'Choose vial format and fill volume',
        paragraphs: [
          'Common formats: 1–2 ml spray vials, 2 ml dabbers, or 5 ml mini sprays. Sprays better mimic full-bottle experience; dabbers cost less but behave differently on skin.',
          'Include enough wears per vial for a fair test—usually two to three days per scent minimum at 1–2 ml for EDP.',
        ],
      },
      {
        id: 'scent-count',
        title: 'How many scents to include',
        paragraphs: [
          'Three to five scents is the practical range. Fewer than three feels thin; more than six overwhelms and raises cost. Curate a narrative arc—e.g., fresh → floral → woody—not random catalog picks.',
        ],
      },
      {
        id: 'packaging',
        title: 'Packaging and labeling',
        paragraphs: [
          'Number vials clearly and match numbers to a printed card with name, family, and wearing tip. Regulated markets still require responsible party and ingredient information—often on an outer sleeve or insert.',
          'Discovery packaging is a photo asset; budget for flat-lay and unboxing shots equal to full bottles.',
        ],
      },
      {
        id: 'pricing-conversion',
        title: 'Pricing and full-size conversion',
        paragraphs: [
          'Price discovery sets at a premium per ml versus full size—customers pay for variety. Offer a credit toward full-size purchase within sixty days to improve conversion tracking.',
          'Track which vial empties first in customer feedback surveys—that is your lead full-size candidate.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should discovery sets launch before full sizes?',
        answer:
          'Often yes for cold audiences. Established brands sometimes launch sets alongside heroes to widen the funnel.',
      },
      {
        question: 'Do discovery sets have separate MOQ?',
        answer:
          'Yes—filling many small vials has its own minimums. Ask your manufacturer about sampler assembly early.',
      },
      {
        question: 'Can boutiques sell only the discovery set?',
        answer:
          'Yes, as a low-risk trial SKU with testers for individual scents if you later add full sizes.',
      },
    ],
  },
  {
    slug: 'custom-fragrance-development',
    title: 'How Custom Fragrance Development Works',
    pageName: 'Custom Fragrance Development',
    h1: 'How Custom Fragrance Development Works',
    targetKeyword: 'how custom fragrance development works',
    description:
      'How custom fragrance development works: brief, perfumer rounds, modifications, exclusivity, stability testing, timeline, and cost vs private label library scents.',
    excerpt:
      'From brief to bulk production—what happens in custom perfumery, how long it takes, and when it is worth the investment.',
    readTimeMinutes: 11,
    relatedSlugs: [
      'how-to-write-fragrance-brief',
      'perfume-stability-testing',
      'private-label-vs-white-label-vs-custom-perfume',
    ],
    sections: [
      {
        id: 'overview',
        title: 'Custom development vs library scents',
        paragraphs: [
          'Custom fragrance development means a perfumer creates or materially modifies a formula for your brand—not selecting an existing library code with your label. You gain differentiation and potential exclusivity; you pay in time, fees, and usually higher MOQ.',
          'Many brands validate with library scents first, then fund custom work on proven winners.',
        ],
      },
      {
        id: 'process',
        title: 'Typical development process',
        paragraphs: [
          'The workflow usually follows a fixed sequence with approval gates.',
        ],
        bullets: [
          'Brief and budget alignment',
          'Initial mod submissions (often 3–6 directions)',
          'Feedback rounds and refinements',
          'Pilot formula lock and IFRA review',
          'Stability testing in target bottle',
          'Scale-up and first production batch',
        ],
      },
      {
        id: 'timeline',
        title: 'Timeline expectations',
        paragraphs: [
          'Custom projects commonly run twelve to twenty-plus weeks from brief to production-ready formula—before packaging lead times. Rush requests compromise iteration quality.',
        ],
      },
      {
        id: 'exclusivity',
        title: 'Exclusivity and ownership',
        paragraphs: [
          'Contracts should state whether you have market exclusivity, channel exclusivity, or none. Formula ownership varies—some houses retain IP; others license exclusively. Read this before marketing “our proprietary scent.”',
        ],
      },
      {
        id: 'cost',
        title: 'Fees and MOQ',
        paragraphs: [
          'Development fees, revision fees, and higher compound MOQ are normal. Request all-in estimates including stability and regulatory paperwork before signing.',
        ],
      },
    ],
    faq: [
      {
        question: 'How many revision rounds are typical?',
        answer:
          'Two to four rounds after initial mods are common. Define included rounds in your agreement to avoid surprise fees.',
      },
      {
        question: 'Can I custom-develop one note tweak of a library scent?',
        answer:
          'Some partners offer light customization—adjusting intensity or swapping one material. That is faster than full bespoke work but may not grant exclusivity.',
      },
      {
        question: 'Is stability testing mandatory?',
        answer:
          'Best practice is yes before bulk, especially for new formulas or unusual packaging. Skipping stability risks scent drift and customer complaints.',
      },
    ],
  },
  {
    slug: 'how-to-write-fragrance-brief',
    title: 'How to Write a Fragrance Brief',
    pageName: 'Write a Fragrance Brief',
    h1: 'How to Write a Fragrance Brief',
    targetKeyword: 'how to write a fragrance brief',
    description:
      'How to write a fragrance brief for private label or custom development: audience, mood, references, restrictions, format, budget, and a template your manufacturer can use.',
    excerpt:
      'A fragrance brief template that turns brand vision into actionable direction for sampling and custom development.',
    readTimeMinutes: 9,
    relatedSlugs: [
      'custom-fragrance-development',
      'choose-fragrances-for-target-customer',
      'how-to-evaluate-perfume-samples',
    ],
    sections: [
      {
        id: 'why-brief',
        title: 'Why a brief beats a mood board alone',
        paragraphs: [
          'Manufacturers and perfumers need constraints: price, format, customer, markets, and taboos. A brief reduces revision cycles and stops you from receiving off-target samples that smell fine but fit nobody you sell to.',
          'One to two pages is enough. Update it as you learn from sampling—treat it as a living document until PPS approval.',
        ],
      },
      {
        id: 'template',
        title: 'What to include: brief template',
        paragraphs: [
          'Use these sections in order. Delete what does not apply.',
        ],
        bullets: [
          'Brand summary and existing product range',
          'Target customer and primary sales channel',
          'Retail price target and launch geography',
          'Format and fill size (e.g., 50 ml EDP)',
          'Mood in plain language (3–5 adjectives)',
          'Reference scents—not “make me Baccarat Rouge,” but “soft amber skin scent, moderate projection”',
          'Notes or families to explore and to avoid',
          'Performance goals: longevity, projection, season',
          'Packaging direction if it affects juice color or alcohol load',
          'Timeline, budget range, and exclusivity needs',
        ],
      },
      {
        id: 'references',
        title: 'How to write useful references',
        paragraphs: [
          'Reference competitors your customer already buys—not only luxury icons. Include why each reference matters: “Customer X buys this for office-friendly musk” beats “something like Chanel.”',
          'List anti-references too: “No heavy vanilla,” “No loud fruity opening,” “No animalic notes.”',
        ],
      },
      {
        id: 'restrictions',
        title: 'Regulatory and brand restrictions',
        paragraphs: [
          'Note clean positioning, allergen sensitivities in your audience, or retailer rules (e.g., no phthalates if your retailer requires it). IFRA still governs many material limits—your partner will flag conflicts.',
        ],
      },
      {
        id: 'handoff',
        title: 'Handoff and iteration',
        paragraphs: [
          'Send the brief before sample requests. After round one, annotate feedback on the brief itself so round two addresses specific gaps—not vague “more modern.”',
        ],
      },
    ],
    faq: [
      {
        question: 'Should I include note pyramids in the brief?',
        answer:
          'Optional. Adjectives and references often work better for non-perfumers. Let your partner translate into formulas.',
      },
      {
        question: 'Can one brief cover multiple scents?',
        answer:
          'Yes for a collection, but give each scent a distinct role—signature, fresh daily, evening—and separate references.',
      },
      {
        question: 'Who should approve the final brief?',
        answer:
          'Founder plus whoever owns merchandising or retail relationships. Alignment now prevents expensive changes at PPS.',
      },
    ],
  },
  {
    slug: 'perfume-stability-testing',
    title: 'How Perfume Stability Testing Works',
    pageName: 'Perfume Stability Testing',
    h1: 'How Perfume Stability Testing Works',
    targetKeyword: 'perfume stability testing',
    description:
      'How perfume stability testing works: accelerated vs real-time studies, what is measured, packaging compatibility, typical duration, and when brands need it before bulk.',
    excerpt:
      'Why stability testing matters, what labs measure, and how long to allow before your first production run.',
    readTimeMinutes: 10,
    relatedSlugs: [
      'custom-fragrance-development',
      'perfume-certificate-of-analysis',
      'perfume-manufacturer-documents',
    ],
    sections: [
      {
        id: 'purpose',
        title: 'What stability testing proves',
        paragraphs: [
          'Stability testing shows how a fragrance behaves over time in its final packaging—scent character, color, clarity, and packaging compatibility. It answers whether batch one will still smell like your approved sample six to twelve months later on shelf.',
          'Library scents in standard bottles may have existing data; new custom formulas, new bottles, or high alcohol tweaks usually need fresh studies.',
        ],
      },
      {
        id: 'what-is-tested',
        title: 'What is measured',
        paragraphs: [
          'Typical evaluations include organoleptic assessment (does it still smell on-brief), color change, clarity or haze, sediment, pH where relevant, and container integrity—crimp, label adhesion, pump function.',
        ],
        bullets: [
          'Odor profile vs baseline at intervals',
          'Color and appearance',
          'Specific gravity or refractive index (manufacturer COA parameters)',
          'Package interaction: leaching, corrosion, cap liner issues',
        ],
      },
      {
        id: 'accelerated-vs-realtime',
        title: 'Accelerated vs real-time stability',
        paragraphs: [
          'Accelerated studies store samples at elevated temperature (e.g., 37–40°C) to simulate months of aging in weeks. Real-time studies run at room temperature for twelve months or more.',
          'Many launches proceed after accelerated data plus three-month real-time checkpoints, with ongoing real-time continuing in parallel—your manufacturer should explain their release criteria.',
        ],
      },
      {
        id: 'duration',
        title: 'How long testing takes',
        paragraphs: [
          'Accelerated protocols often run four to twelve weeks. Real-time shelf claims may need six to twelve months of data for conservative retailers.',
          'Build stability time into your launch calendar before announcing ship dates—especially for custom development.',
        ],
      },
      {
        id: 'when-required',
        title: 'When private label brands need it',
        paragraphs: [
          'Required for custom formulas, new packaging combinations, and many wholesale vendor compliance packets. Skipping testing on a tweaked library scent in a proven bottle is a calculated risk some small DTC brands take—but it is not best practice at scale.',
        ],
      },
    ],
    faq: [
      {
        question: 'Who pays for stability testing?',
        answer:
          'Usually the brand or development fee includes it for custom work. Confirm in your quote for library scents in non-standard bottles.',
      },
      {
        question: 'Does IFRA replace stability testing?',
        answer:
          'No. IFRA addresses material limits; stability testing addresses physical and sensory change over time in your actual package.',
      },
      {
        question: 'What if a sample fails stability?',
        answer:
          'Reformulate, adjust packaging, or change storage guidance. Do not ship bulk until the failure mode is understood.',
      },
    ],
  },
  {
    slug: 'balanced-first-fragrance-collection',
    title: 'How to Build a Balanced First Fragrance Collection',
    pageName: 'Balanced First Collection',
    h1: 'How to Build a Balanced First Fragrance Collection',
    targetKeyword: 'balanced first fragrance collection',
    description:
      'How to build a balanced first fragrance collection: signature scent roles, variety without confusion, shared packaging, and sequencing launches after your hero SKU.',
    excerpt:
      'Structure a small first collection—signature, daily, and occasion scents—without tripling MOQ or muddying your brand story.',
    readTimeMinutes: 9,
    relatedSlugs: [
      'launch-one-scent-or-several',
      'launch-perfume-discovery-set',
      'how-to-write-fragrance-brief',
    ],
    sections: [
      {
        id: 'start-with-roles',
        title: 'Assign roles, not random variety',
        paragraphs: [
          'A balanced collection answers different wearing needs—not three versions of the same vanilla. Common roles: signature daily scent, brighter daytime option, deeper evening or seasonal scent.',
          'Each role should have a one-sentence reason to exist for your customer.',
        ],
      },
      {
        id: 'three-sku-model',
        title: 'A practical three-SKU starter collection',
        paragraphs: [
          'After a hero scent proves demand, many brands add: (1) versatile signature, (2) fresh or office-friendly variant, (3) richer evening or limited seasonal. Share bottle and box platform to control MOQ.',
        ],
        bullets: [
          'Signature: highest marketing spend, broadest appeal',
          'Variant: captures customers who want lighter or darker than hero',
          'Seasonal or limited: creates urgency without permanent SKU sprawl',
        ],
      },
      {
        id: 'cohesion',
        title: 'Cohesion vs contrast',
        paragraphs: [
          'Collections should feel related—shared musk base, consistent citrus top, or unified packaging—not like three unrelated licenses. Too much contrast fragments brand memory.',
        ],
      },
      {
        id: 'sequencing',
        title: 'Sequence launches with data',
        paragraphs: [
          'Add SKU two when hero hit seventy percent first-batch sell-through or repeatable monthly velocity. Use discovery set feedback to pick the second scent direction.',
        ],
      },
      {
        id: 'merchandising',
        title: 'Merchandising and naming',
        paragraphs: [
          'Names should scan as a family on shelf—consistent typography, numbering, or shared word. Train retail staff on which scent fits which customer question.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is two scents enough for a collection?',
        answer:
          'Yes for many boutiques—a hero plus contrasting alternate is a valid “collection” if merchandised as a pair.',
      },
      {
        question: 'Should seasonal scents be in the first collection?',
        answer:
          'Usually no. Launch evergreen scents first; add seasonal after reorder rhythm exists.',
      },
      {
        question: 'How do discovery sets relate to collections?',
        answer:
          'Sets preview future collection roles without filling every full size on day one.',
      },
    ],
  },
  {
    slug: 'perfume-manufacturing-india-usa-europe',
    title: 'India vs USA vs Europe for Perfume Manufacturing',
    pageName: 'India vs USA vs Europe',
    h1: 'India vs USA vs Europe for Perfume Manufacturing',
    targetKeyword: 'perfume manufacturing India USA Europe',
    description:
      'Compare perfume manufacturing in India, USA, and Europe: cost, MOQ, lead times, regulatory expertise, component access, and which region fits your launch market.',
    excerpt:
      'Regional tradeoffs for private label production—when to manufacture close to your customers vs overseas.',
    readTimeMinutes: 11,
    relatedSlugs: [
      'choose-private-label-perfume-manufacturer',
      'import-private-label-perfume-usa',
      'private-label-perfume-manufacturing-timeline',
    ],
    sections: [
      {
        id: 'overview',
        title: 'No single best region—only best fit',
        paragraphs: [
          'India, the United States, and Europe each host capable fragrance fillers and packagers. Choice depends on where you sell, what documentation you need, component preferences, cash flow, and freight—not generic “quality” stereotypes.',
        ],
      },
      {
        id: 'usa',
        title: 'United States manufacturing',
        paragraphs: [
          'U.S. partners simplify domestic freight, time zones, and MoCRA familiarity for American responsible persons. Component costs can be higher; MOQs vary from boutique fillers to large contract manufacturers.',
          'Strong choice when your market is primarily U.S. wholesale and you want domestic lot coding and faster troubleshooting.',
        ],
        bullets: [
          'Pros: domestic shipping, U.S. regulatory fluency, easier visits',
          'Cons: higher unit cost on some components, fewer ultra-low MOQ options at premium tiers',
        ],
      },
      {
        id: 'europe',
        title: 'Europe manufacturing',
        paragraphs: [
          'France, Spain, and neighboring markets offer deep perfumery heritage, EU regulatory experience, and access to European glass and pump suppliers. Strong for brands prioritizing EU retail and cosmetic regulation (CPNP, allergen labeling).',
          'Freight and duties affect U.S.-only brands—evaluate landed cost, not ex-works price alone.',
        ],
        bullets: [
          'Pros: EU compliance strength, prestige association, component ecosystem',
          'Cons: cost, complexity for U.S.-only DTC if manufacturing is EU-only',
        ],
      },
      {
        id: 'india',
        title: 'India manufacturing',
        paragraphs: [
          'India has grown as a fragrance and packaging hub with competitive labor and increasing export experience. Many projects combine Indian filling with global component sourcing.',
          'Due diligence matters: confirm batch documentation, pump QC, and export labeling track record for your destination market.',
        ],
        bullets: [
          'Pros: competitive cost, scalable production, improving export infrastructure',
          'Cons: longer freight to U.S./EU, time-zone coordination, variable QC—vet partners carefully',
        ],
      },
      {
        id: 'decision',
        title: 'How to decide',
        paragraphs: [
          'Match region to primary sales market and documentation needs. Importing finished perfume to the U.S. requires compliant labeling and reliable lot traceability regardless of origin.',
          'Request identical brief quotes from two regions if unsure—compare landed cost, lead time, and sample experience, not brochure claims.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is European perfume always higher quality?',
        answer:
          'Not automatically. Quality depends on the specific manufacturer, formula, and QC—not geography alone.',
      },
      {
        question: 'Can I fill in one country and sell globally?',
        answer:
          'Yes, if labeling and documentation meet each market. Many brands manufacture in one hub and adapt labels by region.',
      },
      {
        question: 'Does Brandsamor work across regions?',
        answer:
          'Brandsamor supports brands worldwide with team coverage in multiple regions—start with sampling to discuss fit for your market and format.',
      },
    ],
  },
  {
    slug: 'sell-private-label-perfume-boutique',
    title: 'How to Sell Private Label Perfume in a Boutique',
    pageName: 'Sell Perfume in a Boutique',
    h1: 'How to Sell Private Label Perfume in a Boutique',
    targetKeyword: 'sell private label perfume boutique',
    description:
      'How to sell private label perfume in a boutique: wholesale terms, testers, merchandising, training, reorder cadence, and margin expectations for indie retail.',
    excerpt:
      'Wholesale and consignment basics for getting private label perfume onto boutique shelves—and keeping it there.',
    readTimeMinutes: 10,
    relatedSlugs: [
      'boutique-perfume-line-launch',
      'how-to-price-private-label-perfume',
      'calculate-retail-price-perfume',
    ],
    sections: [
      {
        id: 'buyer-expectations',
        title: 'What boutique buyers expect',
        paragraphs: [
          'Buyers want a clear story, credible price, tester policy, and low-risk first order. They are not looking for another generic niche bottle—they want something their customer cannot find at Sephora.',
          'Bring photography, margin math, and training one-pager—not only samples.',
        ],
      },
      {
        id: 'wholesale-terms',
        title: 'Wholesale terms and margin',
        paragraphs: [
          'Keystone (50% of MSRP) is a common starting point. Payment may be net thirty after first order; some boutiques request consignment on unproven lines.',
          'Define minimum opening order, reorder minimums, and who pays shipping. Spell out MAP if you sell DTC at the same MSRP.',
        ],
      },
      {
        id: 'testers',
        title: 'Testers and demos',
        paragraphs: [
          'Plan one tester per door at wholesale cost or free-goods ratio (e.g., one tester free per six units). Replace testers on a schedule—oxidized juice hurts the whole line.',
          'Offer a small counter display or riser if budget allows; boutiques merchandise fragrance in cramped space.',
        ],
      },
      {
        id: 'training',
        title: 'Staff training wins conversion',
        paragraphs: [
          'Fifteen-minute Zoom training beats a note pyramid card. Teach three customer questions: office or evening, light or bold, gift or self-purchase—and which SKU to recommend.',
        ],
      },
      {
        id: 'reorders',
        title: 'Reorders and sell-through reviews',
        paragraphs: [
          'Review sell-through at sixty and ninety days. If velocity is strong, propose expanded placement or a discovery set. If weak, diagnose price, scent, or placement before pushing more inventory.',
        ],
      },
    ],
    faq: [
      {
        question: 'Consignment or wholesale first?',
        answer:
          'Wholesale aligns incentives if the buyer believes in the line. Consignment can open doors but slows your cash flow—cap units on consignment.',
      },
      {
        question: 'How many doors should I target initially?',
        answer:
          'Five to fifteen aligned boutiques beat fifty random doors. Match aesthetic and price tier tightly.',
      },
      {
        question: 'Should I offer exclusivity by city?',
        answer:
          'Micro-exclusivity can motivate buyers if you enforce it. Define radius and channels clearly in writing.',
      },
    ],
  },
];
