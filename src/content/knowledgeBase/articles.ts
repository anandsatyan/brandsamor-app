import type { KbArticleBase } from './types';
import { KNOWLEDGE_BASE_ARTICLES_BATCH2 } from './articlesBatch2';

export const KNOWLEDGE_BASE_ARTICLES: KbArticleBase[] = [
  {
    slug: 'how-to-start-a-perfume-line',
    title: 'How to Start a Perfume Line: Complete Step-by-Step Guide',
    pageName: 'Start a Perfume Line Guide',
    h1: 'How to Start a Perfume Line',
    targetKeyword: 'how to start a perfume line',
    description:
      'Learn how to start a perfume line step by step: brand positioning, fragrance sampling, bottle and packaging choices, MOQ planning, compliance documents, and launch timeline.',
    excerpt:
      'A practical roadmap from brand idea to ready-to-sell perfume—covering scent selection, packaging, manufacturing, and compliance without running your own factory.',
    readTimeMinutes: 12,
    relatedSlugs: [
      'perfume-brand-startup-cost',
      'private-label-perfume-moq',
      'choose-fragrances-for-target-customer',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What it means to start a perfume line today',
        paragraphs: [
          'Learning how to start a perfume line no longer requires building a fragrance factory. Most new brands use private label manufacturing: you choose scents, packaging, and branding while a partner handles compounding, filling, quality checks, and batch documentation.',
          'The brands that launch successfully treat perfume as a product system—not only a scent. Your customer buys the full experience: fragrance performance, bottle weight, label finish, unboxing, price point, and how the product fits your existing brand story.',
        ],
      },
      {
        id: 'step-1-positioning',
        title: 'Step 1: Define your customer and price point',
        paragraphs: [
          'Before sampling fragrances, write a one-page brief: who you sell to, where they discover you, and what price feels credible. A creator-led brand launching at $48 needs different juice concentration, bottle style, and packaging than a hotel gifting program or a boutique shelf at $120.',
          'Your brief should answer: gender positioning (if any), occasion (daily, evening, gifting), geographic market, and whether you sell DTC, wholesale, or both. This brief becomes the filter for every scent and packaging decision later.',
        ],
        bullets: [
          'Target customer age range and lifestyle',
          'Retail price band and margin goal',
          'Primary sales channel: DTC, boutique, corporate gifting',
          'Launch geography and any regulatory constraints',
        ],
      },
      {
        id: 'step-2-sampling',
        title: 'Step 2: Sample fragrances and narrow your shortlist',
        paragraphs: [
          'Order fragrance samples from a private label library or work with a partner to evaluate accords. Compare scents on blotters first, then on skin across several days. Pay attention to dry-down—not just the opening.',
          'Shortlist two to four directions maximum. Too many options slow packaging decisions and delay launch. Document why each scent fits your customer so your team stays aligned during production.',
        ],
      },
      {
        id: 'step-3-packaging',
        title: 'Step 3: Choose bottle, format, and packaging',
        paragraphs: [
          'Select bottle shape, spray quality, label material, and outer packaging that match your price point. A heavy glass bottle with a magnetic closure signals luxury; a clean 50 ml cylinder may fit a modern DTC brand better.',
          'Confirm fill volume, box dimensions for shipping, and whether you need inserts, sleeves, or gift-ready packaging. Approve a pre-production sample before bulk production.',
        ],
      },
      {
        id: 'step-4-compliance',
        title: 'Step 4: Plan compliance and documentation',
        paragraphs: [
          'Ask your manufacturer what documents they provide: IFRA certificate, Certificate of Analysis (COA), allergen declaration, and SDS where applicable. If you sell in the U.S. or EU, ingredient transparency and safety documentation support retailer and marketplace requirements.',
          'Keep batch-level records from your first production run. Documentation is easier to collect during manufacturing than to reconstruct after launch.',
        ],
      },
      {
        id: 'step-5-launch',
        title: 'Step 5: Produce, quality-check, and launch',
        paragraphs: [
          'After approvals, your partner produces and fills your batch. Inspect samples from the production run for color, fill level, spray function, label alignment, and scent consistency with your approved sample.',
          'Launch with clear product pages: fragrance family, notes, size, wear occasion, and care instructions. Strong photography and consistent brand language help customers understand a new scent online.',
        ],
      },
    ],
    faq: [
      {
        question: 'How long does it take to start a perfume line?',
        answer:
          'Many private label launches take 8–16 weeks from final scent and packaging approval to ready-to-sell inventory, depending on MOQ, component lead times, and whether custom packaging is involved.',
      },
      {
        question: 'Do I need my own fragrance formula to start?',
        answer:
          'No. Most new brands begin with library scents or lightly customized accords through a private label partner, then consider custom perfumery once sales validate demand.',
      },
      {
        question: 'What is the first decision I should make?',
        answer:
          'Define your target customer and retail price point. That single decision filters fragrance concentration, bottle quality, packaging cost, and minimum order quantity.',
      },
    ],
  },
  {
    slug: 'private-label-vs-white-label-vs-custom-perfume',
    title: 'Private Label vs White Label Perfume',
    pageName: 'Private Label vs White Label Perfume',
    h1: 'Private Label vs White Label Perfume',
    targetKeyword: 'private label vs white label perfume',
    description:
      'Compare private label, white label and custom perfume models — including scent choice, packaging, cost, lead time and brand control.',
    excerpt:
      'Understand the three main ways to launch a fragrance brand—and which path matches your timeline, budget, and differentiation goals.',
    readTimeMinutes: 9,
    relatedSlugs: ['how-to-start-a-perfume-line', 'perfume-brand-startup-cost', 'private-label-perfume-moq'],
    sections: [
      {
        id: 'definitions',
        title: 'Definitions: three ways to launch a scent',
        paragraphs: [
          'The phrase private label vs white label perfume is often used interchangeably, but they describe different levels of customization. Custom perfumery is a third path with its own timeline and cost profile.',
          'All three models can produce a sellable product under your brand name. The difference is how unique the scent and packaging are, how fast you can launch, and what minimum quantities you must commit to.',
        ],
      },
      {
        id: 'white-label',
        title: 'White label perfume',
        paragraphs: [
          'White label usually means selecting a ready-made fragrance from a manufacturer library with minimal changes. Your brand appears on the label; the scent may be sold to other brands in similar packaging.',
          'White label is fastest and often lowest MOQ. It works for testing a category, corporate gifting, or a first launch when speed matters more than exclusivity.',
        ],
        bullets: [
          'Fastest path to market',
          'Lower upfront cost and MOQ',
          'Limited scent exclusivity',
          'Best for pilots and proof of concept',
        ],
      },
      {
        id: 'private-label',
        title: 'Private label perfume',
        paragraphs: [
          'Private label typically adds brand-owned packaging, label design, and sometimes fragrance adjustments within a partner library. You may choose bottle, cap, box, and printing while the base accord comes from an existing palette.',
          'This is the most common model for beauty brands, boutiques, and creators who need a branded product without funding a fully bespoke formula from day one.',
        ],
        bullets: [
          'Branded bottles, labels, and boxes',
          'Moderate MOQ and lead time',
          'More differentiation than white label',
          'Balanced speed and brand ownership',
        ],
      },
      {
        id: 'custom',
        title: 'Custom perfume manufacturing',
        paragraphs: [
          'Custom perfumery means working with a perfumer to develop a unique formula—often with multiple revision rounds, stability testing, and higher minimums. Exclusivity can sometimes be negotiated by market or channel.',
          'Custom development makes sense when scent is your core differentiator and you have budget, time, and distribution to support a longer launch cycle.',
        ],
      },
      {
        id: 'comparison',
        title: 'Which model should you choose?',
        paragraphs: [
          'Choose white label when you need speed and low risk. Choose private label when you want a credible branded product with controlled packaging costs. Choose custom when the fragrance itself must be proprietary and you can fund development.',
          'Many successful brands start private label, validate demand, then invest in custom scents for hero SKUs.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is private label the same as white label?',
        answer:
          'Not exactly. White label usually implies an off-the-shelf scent with minimal branding changes. Private label typically includes your packaging, labeling, and often more configuration—even if the base fragrance comes from a shared library.',
      },
      {
        question: 'Can I switch from private label to custom later?',
        answer:
          'Yes. Many brands launch with library scents to validate price and audience, then fund custom formulas for bestsellers once they have sales data.',
      },
      {
        question: 'Which option has the lowest MOQ?',
        answer:
          'White label and light private label configurations usually have the lowest MOQs. Custom perfumery often requires higher minimums because of development and raw-material purchasing.',
      },
    ],
  },
  {
    slug: 'perfume-brand-startup-cost',
    title: 'How Much Does It Cost to Start a Perfume Business?',
    pageName: 'Perfume Business Startup Cost',
    h1: 'How Much Does It Cost to Start a Perfume Business?',
    targetKeyword: 'how much does it cost to start a perfume business',
    description:
      'Understand the main costs of starting a perfume business, including sampling, packaging, production, freight and launch expenses.',
    excerpt:
      'A transparent look at what you will actually spend—from fragrance samples to your first filled batch and launch assets.',
    readTimeMinutes: 10,
    relatedSlugs: ['private-label-perfume-moq', 'how-to-start-a-perfume-line', 'choose-perfume-bottle-and-packaging'],
    sections: [
      {
        id: 'summary',
        title: 'Realistic budget ranges',
        paragraphs: [
          'When founders ask how much does it cost to start a perfume business, the honest answer depends on format, packaging, MOQ, and whether you self-fund photography and marketing. As example planning ranges only — not quotes — many private label launches fall between roughly $8,000 and $40,000 for a first SKU before marketing spend.',
          'A lean DTC launch with a standard bottle, label, and modest MOQ can sit at the lower end. A luxury box, custom glass, and larger first batch pushes costs up quickly—often before advertising.',
        ],
      },
      {
        id: 'sampling',
        title: 'Fragrance sampling and development',
        paragraphs: [
          'Sample kits and evaluation time are your first hard cost. Budget for multiple rounds if you test on skin, in packaging, and with focus customers. Custom perfumery adds development fees on top of samples.',
        ],
        bullets: [
          'Library sample sets: often a few hundred dollars',
          'Additional evaluation samples: variable',
          'Custom formula development: commonly thousands and up',
        ],
      },
      {
        id: 'packaging',
        title: 'Bottle, closure, label, and box',
        paragraphs: [
          'Packaging is usually the largest visual cost driver. Glass weight, pump quality, hot stamping, inserts, and rigid boxes each add line items. Ask for itemized quotes: bottle, cap, pump, label, box, filling, and QC.',
          'Tooling for custom molds or plates may be amortized across your first order—confirm whether those costs repeat on reorder.',
        ],
      },
      {
        id: 'production',
        title: 'First production batch',
        paragraphs: [
          'Unit cost drops as volume rises, but your first invoice is driven by MOQ. Include filling, assembly, shrink wrap, master cartons, and any batch documentation fees in your forecast.',
        ],
      },
      {
        id: 'launch',
        title: 'Launch costs beyond the bottle',
        paragraphs: [
          'Photography, website updates, marketplace fees, initial ads, and retail tester programs add up. Founders who budget only for juice and glass often underestimate go-to-market spend.',
          'Plan a contingency of 10–15% for remakes, damaged goods, or a packaging revision after pre-production approval.',
        ],
      },
    ],
    faq: [
      {
        question: 'Can I start a perfume brand for under $5,000?',
        answer:
          'Sometimes, with a very lean white-label setup, small MOQ, simple packaging, and minimal marketing assets—but margins and perceived quality will be constrained. Most credible launches budget higher.',
      },
      {
        question: 'What increases cost the most?',
        answer:
          'Custom glass, rigid boxes, low MOQ with premium components, and custom perfumery development are the most common cost drivers.',
      },
      {
        question: 'Should I include marketing in startup cost?',
        answer:
          'Yes. Treat product cost and launch marketing as one plan. A filled warehouse without traffic rarely recovers investment.',
      },
    ],
  },
  {
    slug: 'private-label-perfume-moq',
    title: 'What Is the Minimum Order Quantity for Private Label Perfume?',
    pageName: 'Private Label Perfume MOQ',
    h1: 'Private Label Perfume MOQ',
    targetKeyword: 'private label perfume MOQ',
    description:
      'Learn how private label perfume MOQ works for bottles, labels, juice, and packaging—and how to plan your first order without overbuying inventory.',
    excerpt:
      'MOQ rules for fragrance, bottles, and boxes—and how to right-size your first private label order.',
    readTimeMinutes: 8,
    relatedSlugs: ['perfume-brand-startup-cost', 'private-label-perfume-manufacturing-timeline', 'how-to-start-a-perfume-line'],
    sections: [
      {
        id: 'what-is-moq',
        title: 'What MOQ means in private label perfume',
        paragraphs: [
          'Private label perfume MOQ is the minimum number of units—or minimum production volume—a manufacturer requires per SKU or per component order. MOQ is not one number: fragrance compound, bottle, pump, label print run, and carton each can have separate minimums.',
          'Your effective MOQ is often set by the most restrictive component—frequently the bottle or outer box print run—not by how many bottles you wish to sell in month one.',
        ],
      },
      {
        id: 'typical-ranges',
        title: 'Typical MOQ ranges (indicative)',
        paragraphs: [
          'MOQs vary widely by supplier and configuration. Library scents in standard bottles may start in the low hundreds per SKU. Custom packaging or exclusive oils can push minimums into thousands.',
          'Always request an MOQ breakdown by line item instead of accepting a single headline number.',
        ],
        bullets: [
          'Standard library scent + stock bottle: often lower hundreds',
          'Custom label print runs: may require 500–1,000+ labels',
          'Custom box or rigid packaging: frequently higher than bottle MOQ',
          'Custom perfumery: development MOQ plus production MOQ',
        ],
      },
      {
        id: 'planning',
        title: 'How to plan your first MOQ',
        paragraphs: [
          'Estimate 90-day sell-through if you sell DTC, or retailer commitments if you wholesale. Your first batch should cover launch marketing plus reorder lead time—not a year of fantasy demand.',
          'If MOQ exceeds comfortable inventory, simplify packaging or choose a stock bottle family designed for lower minimums.',
        ],
      },
      {
        id: 'negotiation',
        title: 'What you can and cannot negotiate',
        paragraphs: [
          'You may negotiate combined runs across SKUs, phased deliveries, or shared components between two scents. Exclusivity and custom molds rarely come with very low MOQ.',
          'Transparent manufacturers explain which MOQs are factory-imposed versus policy— that clarity helps you design a launch that fits cash flow.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is MOQ per fragrance or per order?',
        answer:
          'Usually per SKU and sometimes per component. A two-SKU launch may have separate MOQs for each scent and shared MOQs for packaging if components match.',
      },
      {
        question: 'Why is box MOQ higher than bottle MOQ?',
        answer:
          'Printers and rigid-box suppliers run setup costs per design. Short label or carton runs are expensive per unit, so suppliers set higher minimums.',
      },
      {
        question: 'Can I reduce MOQ for a test launch?',
        answer:
          'Often yes by using stock bottles, a simplified label, no outer box for DTC-only, or a white-label library scent with existing components.',
      },
    ],
  },
  {
    slug: 'private-label-perfume-manufacturing-timeline',
    title: 'How Long Does Private Label Perfume Manufacturing Take?',
    pageName: 'Manufacturing Timeline',
    h1: 'Private Label Perfume Manufacturing Timeline',
    targetKeyword: 'private label perfume manufacturing timeline',
    description:
      'Typical private label perfume manufacturing timeline from sampling to delivery: approvals, packaging lead times, filling, QC, and factors that delay launches.',
    excerpt:
      'Week-by-week expectations for sampling, packaging production, filling, and freight—so you can plan a realistic launch date.',
    readTimeMinutes: 8,
    relatedSlugs: ['private-label-perfume-moq', 'how-to-start-a-perfume-line', 'perfume-manufacturer-documents'],
    sections: [
      {
        id: 'overview',
        title: 'Overview: where time goes',
        paragraphs: [
          'A private label perfume manufacturing timeline usually spans sampling, packaging procurement, pre-production approval, bulk production, quality control, and shipping. Simple launches may ship in roughly 8–12 weeks after final approvals; custom packaging or components can extend to 16–20+ weeks.',
          'Delays rarely come from filling alone—they come from late packaging decisions, artwork revisions, and component shortages.',
        ],
      },
      {
        id: 'phase-sampling',
        title: 'Phase 1: Sampling (1–3 weeks)',
        paragraphs: [
          'Evaluate blotters and skin wears, narrow finalists, and confirm concentration (EDP, EDT, etc.). If you test multiple seasons, build calendar buffer.',
        ],
      },
      {
        id: 'phase-packaging',
        title: 'Phase 2: Packaging specification (2–6 weeks)',
        paragraphs: [
          'Finalize bottle, pump, label artwork, and box design. Print proofs and pre-production samples (PPS) must be approved before bulk. Custom molds or hot-stamp plates add time.',
        ],
        bullets: [
          'Artwork and dieline approval',
          'Pre-production sample (PPS) of filled unit',
          'Component lead times from glass and print vendors',
        ],
      },
      {
        id: 'phase-production',
        title: 'Phase 3: Bulk production (2–5 weeks)',
        paragraphs: [
          'After PPS sign-off, juice compounding, filling, crimping, labeling, boxing, and QC run in sequence. Batch documentation is generated during this window.',
        ],
      },
      {
        id: 'phase-shipping',
        title: 'Phase 4: Shipping and receiving (1–4 weeks)',
        paragraphs: [
          'Domestic freight is faster than ocean import for components or finished goods. If you import finished perfume into the U.S., customs clearance adds variable days.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is the fastest realistic launch timeline?',
        answer:
          'With stock components, library scent, and fast approvals, some projects ship in about two months. That assumes no major artwork revisions or component backorders.',
      },
      {
        question: 'What causes the longest delays?',
        answer:
          'Custom box print runs, pump or glass shortages, and repeated packaging artwork changes are the most common timeline killers.',
      },
      {
        question: 'Should I plan a launch date before PPS approval?',
        answer:
          'Set a target internally, but announce publicly only after pre-production sample approval and a confirmed production slot.',
      },
    ],
  },
  {
    slug: 'choose-fragrances-for-target-customer',
    title: 'How to Choose Fragrances for Your Target Customer',
    pageName: 'Choose Fragrances',
    h1: 'How to Choose Fragrances for Your Target Customer',
    targetKeyword: 'how to choose fragrances for your brand',
    description:
      'A framework to choose fragrances for your brand: customer lifestyle, climate, price positioning, concentration, and testing methods before you commit to production.',
    excerpt:
      'Match scent style, strength, and story to the customer you already serve—before you order a full batch.',
    readTimeMinutes: 9,
    relatedSlugs: ['edp-vs-edt-vs-perfume-oil', 'how-to-start-a-perfume-line', 'private-label-vs-white-label-vs-custom-perfume'],
    sections: [
      {
        id: 'framework',
        title: 'Start with customer context, not trend lists',
        paragraphs: [
          'Founders researching how to choose fragrances for your brand often begin with trending notes. Start instead with who already trusts you and what they wear today. Your first scent should feel like a natural extension of your brand—not a random luxury add-on.',
          'Write three columns: customer age and lifestyle, purchase occasion, and competitive scents they already buy. Your shortlist should sit credibly next to those references.',
        ],
      },
      {
        id: 'families',
        title: 'Translate customer taste into fragrance families',
        paragraphs: [
          'Use broad families as language with your manufacturing partner: fresh citrus, floral, woody amber, gourmand, aromatic fougère, or skin musks. Ask for examples in each family at the concentration you plan to sell.',
        ],
        bullets: [
          'Office-friendly: lighter woods, musks, soft florals',
          'Evening or gifting: richer amber, vanilla, or spice',
          'Wellness or spa: herbal, citrus, clean musk',
          'Youth DTC: fruit florals or solar notes (validate longevity)',
        ],
      },
      {
        id: 'testing',
        title: 'Test like your customer shops',
        paragraphs: [
          'Wear finalists for 48–72 hours across different days. If you sell online, send blind samples to ten trusted customers and ask which they would buy—not which smells nicest on first spray.',
          'Photograph how the bottle looks in their space. Scent plus visual fit drives repeat purchase for indie brands.',
        ],
      },
      {
        id: 'concentration',
        title: 'Pick concentration for habit and climate',
        paragraphs: [
          'Hot, humid markets often favor lighter formats or EDP with fresh structures. Cold climates support richer woods and ambers. Match strength to how often your customer wants to reapply—and to your price story.',
        ],
      },
    ],
    faq: [
      {
        question: 'How many samples should I test?',
        answer:
          'Start with 8–15 library options, narrow to 3–4 finalists, then wear each for several days before choosing.',
      },
      {
        question: 'Should I copy a famous perfume?',
        answer:
          'Use competitors as reference points for conversations with your partner, but launch a scent that is legally compliant and distinct—not a dupe positioned as your brand hero.',
      },
      {
        question: 'Can one scent fit all customers?',
        answer:
          'Rarely. One versatile scent can work for launch, but plan a second SKU once you see who actually buys.',
      },
    ],
  },
  {
    slug: 'choose-perfume-bottle-and-packaging',
    title: 'How to Choose a Perfume Bottle and Packaging',
    pageName: 'Bottle and Packaging Guide',
    h1: 'How to Choose a Perfume Bottle and Packaging',
    targetKeyword: 'how to choose perfume bottle and packaging',
    description:
      'Guide to choosing perfume bottles, pumps, labels, and boxes: materials, MOQ, brand positioning, shipping durability, and pre-production approval.',
    excerpt:
      'Bottle shape, pump quality, label finishes, and boxes—how each choice affects cost, MOQ, and perceived value.',
    readTimeMinutes: 10,
    relatedSlugs: ['perfume-brand-startup-cost', 'private-label-perfume-moq', 'how-to-start-a-perfume-line'],
    sections: [
      {
        id: 'bottle',
        title: 'Bottle shape and glass weight',
        paragraphs: [
          'When you choose perfume bottle and packaging, glass weight is the first subconscious quality signal. Heavier bottles feel premium but increase freight. Match weight to price: sub-$40 DTC can use elegant lighter glass; luxury gifting benefits from substantial feel.',
          'Confirm fill volume (50 ml vs 100 ml) early—it affects label size, carton dieline, and unit economics.',
        ],
      },
      {
        id: 'closure',
        title: 'Pump, sprayer, and crimp quality',
        paragraphs: [
          'Test spray mist fineness, clog resistance, and actuator feel. Cheap pumps undermine otherwise beautiful bottles. Ask for pump manufacturer specs and whether your partner pressure-tests crimps.',
        ],
        bullets: [
          'Mist vs stream pattern',
          'Actuator color and cap fit',
          'Crimp height and leak testing',
          'Replacement pump policy for complaints',
        ],
      },
      {
        id: 'label',
        title: 'Label material and decoration',
        paragraphs: [
          'Paper, textured stock, clear film, hot foil, emboss, and screen print each change MOQ and lead time. Ensure regulatory text fits: ingredient list, volume, responsible party, warnings where required.',
        ],
      },
      {
        id: 'outer-pack',
        title: 'Outer box and unboxing',
        paragraphs: [
          'Folded carton vs rigid box is a major cost fork. DTC brands often launch with a well-printed carton; wholesale and gift channels may require rigid presentation.',
          'Design for shipping: snug fit reduces damage and return rates.',
        ],
      },
      {
        id: 'approval',
        title: 'Pre-production sample (PPS)',
        paragraphs: [
          'Never skip PPS approval. It is your last chance to catch color shifts, label alignment, and scent interaction with the bottle before thousands of units are filled.',
        ],
      },
    ],
    faq: [
      {
        question: 'Stock bottle or custom mold?',
        answer:
          'Stock bottles lower MOQ and speed. Custom molds differentiate but add tooling cost and time—best after you validate sales.',
      },
      {
        question: 'What must appear on the label in the U.S.?',
        answer:
          'Typically product identity, net quantity, responsible party name and address, and ingredient listing per applicable FDA cosmetic labeling rules. Your manufacturer should guide exact copy.',
      },
      {
        question: 'Does packaging affect MOQ more than fragrance?',
        answer:
          'Often yes. Custom boxes and print runs frequently set the practical minimum—not the juice itself.',
      },
    ],
  },
  {
    slug: 'edp-vs-edt-vs-perfume-oil',
    title: 'EDP vs EDT vs Perfume Oil for a New Brand',
    pageName: 'EDP vs EDT vs Oil',
    h1: 'EDP vs EDT vs Perfume Oil',
    targetKeyword: 'EDP vs EDT vs perfume oil',
    description:
      'Compare EDP vs EDT vs perfume oil for a new brand: concentration, longevity, price perception, margins, regulations, and which format fits DTC vs retail.',
    excerpt:
      'Concentration and format choices affect cost, wear time, customer expectations, and how you price your launch.',
    readTimeMinutes: 8,
    relatedSlugs: ['choose-fragrances-for-target-customer', 'perfume-brand-startup-cost', 'how-to-start-a-perfume-line'],
    sections: [
      {
        id: 'concentration',
        title: 'What concentration actually means',
        paragraphs: [
          'In EDP vs EDT vs perfume oil comparisons, concentration describes how much fragrance compound sits in the carrier (alcohol base or oil). Higher concentration usually means stronger longevity and higher raw material cost per milliliter.',
          'Customer language is imprecise: many say “perfume” for any spray. Your product page should state format clearly to reduce returns.',
        ],
      },
      {
        id: 'edp',
        title: 'Eau de parfum (EDP)',
        paragraphs: [
          'EDP is the default launch format for many indie brands: strong enough for day-long wear in moderate climates, credible at mid-premium price points, and familiar to department-store shoppers moving online.',
        ],
        bullets: [
          'Strong longevity vs EDT',
          'Higher juice cost per bottle',
          'Works for flagship SKUs',
        ],
      },
      {
        id: 'edt',
        title: 'Eau de toilette (EDT)',
        paragraphs: [
          'EDT can work for large-format value positioning, summer collections, or brands emphasizing light, frequent application. Margin per ml may differ from EDP even at the same retail price.',
        ],
      },
      {
        id: 'oil',
        title: 'Perfume oil and roll-on formats',
        paragraphs: [
          'Oils suit clean-beauty positioning, travel-friendly formats, and some religious or alcohol-free customer preferences. Check skin feel, staining, and packaging (roller vs stick). Regulatory labeling still applies.',
        ],
      },
      {
        id: 'choice',
        title: 'Which should a new brand launch first?',
        paragraphs: [
          'Most DTC founders launch one EDP flagship in 50 ml unless their audience explicitly wants oil or body mist. Expand formats after the hero scent proves repeat purchase.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is EDP always better than EDT?',
        answer:
          'Not always. EDP lasts longer but costs more to fill. EDT can be strategic for climate, price, or brand story.',
      },
      {
        question: 'Do oils last longer than EDP?',
        answer:
          'Often on skin, but depends on formula. Oils can feel more intimate with smaller projection—set expectations in marketing copy.',
      },
      {
        question: 'Can I offer the same scent in multiple formats?',
        answer:
          'Yes, but each format is effectively a new SKU with its own MOQ and packaging plan.',
      },
    ],
  },
  {
    slug: 'perfume-manufacturer-documents',
    title: 'What Documents Should a Perfume Manufacturer Provide?',
    pageName: 'Manufacturer Documents',
    h1: 'Perfume Manufacturer Compliance Documents',
    targetKeyword: 'perfume manufacturer compliance documents',
    description:
      'List of perfume manufacturer compliance documents: IFRA certificate, COA, SDS, allergen declarations, batch records, and what to request before production.',
    excerpt:
      'The paperwork your manufacturer should supply—and why retailers, marketplaces, and importers ask for it.',
    readTimeMinutes: 9,
    relatedSlugs: ['how-ifra-certificates-work', 'perfume-certificate-of-analysis', 'import-private-label-perfume-usa'],
    sections: [
      {
        id: 'why',
        title: 'Why documentation matters for your brand',
        paragraphs: [
          'Perfume manufacturer compliance documents protect your brand when you sell online, wholesale to boutiques, or import inventory. They show that each batch meets safety and labeling expectations—not just marketing claims.',
          'Request a document checklist before you pay a production deposit. Gaps discovered at customs or retailer onboarding are expensive.',
        ],
      },
      {
        id: 'core',
        title: 'Core documents to request',
        paragraphs: [
          'For each production batch, align with your partner on which files you receive and in what format (PDF, lot-linked portal, etc.).',
        ],
        bullets: [
          'IFRA certificate or IFRA conformity statement',
          'Certificate of Analysis (COA) per batch',
          'Allergen declaration (EU Annex III context where applicable)',
          'Safety Data Sheet (SDS) for handling and storage',
          'Ingredient list / formula disclosure for labeling',
          'Batch or lot code traceability record',
        ],
      },
      {
        id: 'retail',
        title: 'What retailers and marketplaces ask for',
        paragraphs: [
          'Marketplaces may request SDS, ingredient transparency, and responsible party information. Boutiques may ask for brand story plus proof of compliance for liability.',
        ],
      },
      {
        id: 'timing',
        title: 'When to collect documents',
        paragraphs: [
          'Generate compliance files during or immediately after production—not months later. Store them by batch lot matching what is printed on your bottle.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is IFRA enough for all markets?',
        answer:
          'IFRA is industry-standard for fragrance safety limits, but labeling and cosmetic rules vary by country. Confirm market-specific requirements.',
      },
      {
        question: 'Who is the responsible party on U.S. labels?',
        answer:
          'Typically the brand owner or designated U.S. responsible person whose name and address appear on the label.',
      },
      {
        question: 'Should I get documents before or after payment?',
        answer:
          'Agree on deliverables in your contract before deposit. Receive batch documents with each shipment.',
      },
    ],
  },
  {
    slug: 'import-private-label-perfume-usa',
    title: 'How to Import Private Label Perfumes Into the United States',
    pageName: 'Import Perfume USA',
    h1: 'Import Private Label Perfume Into the United States',
    targetKeyword: 'import private label perfume USA',
    description:
      'How to import private label perfume into the USA: FDA cosmetic labeling, customs, freight, responsible party, documentation, and working with overseas manufacturers.',
    excerpt:
      'Freight, customs, labeling, and paperwork essentials for bringing finished perfume into the U.S. market.',
    readTimeMinutes: 11,
    relatedSlugs: ['perfume-manufacturer-documents', 'how-ifra-certificates-work', 'private-label-perfume-manufacturing-timeline'],
    sections: [
      {
        id: 'overview',
        title: 'Importing finished perfume vs components',
        paragraphs: [
          'To import private label perfume USA buyers must plan for customs entry, product labeling under FDA cosmetic rules, freight mode, and insurance. Importing finished goods differs from importing empty bottles—each has its own HTS classification and handling requirements.',
          'Work with a customs broker for your first shipment. Broker fees are small compared to detention or relabeling costs.',
        ],
      },
      {
        id: 'labeling',
        title: 'U.S. labeling and responsible party',
        paragraphs: [
          'Perfume sold as a cosmetic in the U.S. generally requires an ingredient declaration and responsible party contact on label. Your overseas manufacturer must fill and label to your approved U.S.-compliant artwork—or you relabel domestically (adds cost).',
        ],
        bullets: [
          'Product name and net quantity',
          'Ingredient listing in required order',
          'Responsible party name and U.S. address',
          'Country of origin if required for customs',
        ],
      },
      {
        id: 'freight',
        title: 'Air vs ocean for finished fragrance',
        paragraphs: [
          'Alcohol-containing perfume is hazardous for air freight in many cases; confirm with your logistics partner. Ocean LCL or FCL is common for larger launches; factor port-to-warehouse time.',
        ],
      },
      {
        id: 'documents',
        title: 'Documents for customs clearance',
        paragraphs: [
          'Commercial invoice, packing list, COA, SDS, and ingredient details support clearance. IFRA documentation may be requested by partners even if not always a customs form.',
        ],
      },
      {
        id: 'partner',
        title: 'Choosing an import-friendly manufacturer',
        paragraphs: [
          'Ask if your partner routinely exports to the U.S., understands FDA cosmetic labeling, and can put lot codes on primary packaging for traceability.',
        ],
      },
    ],
    faq: [
      {
        question: 'Do I need FDA registration before import?',
        answer:
          'Cosmetic facility registration and listing rules apply to responsible parties. Confirm current FDA requirements with your compliance advisor before first import.',
      },
      {
        question: 'Can I import perfume in my luggage?',
        answer:
          'Small personal amounts differ from commercial import. Commercial inventory requires proper entry, labeling, and duties.',
      },
      {
        question: 'Who pays duties?',
        answer:
          'Typically the importer of record. Classify HTS codes correctly in your landed cost model.',
      },
    ],
  },
  {
    slug: 'how-ifra-certificates-work',
    title: 'How IFRA Certificates Work',
    pageName: 'IFRA Certificates',
    h1: 'How IFRA Certificates Work',
    targetKeyword: 'IFRA certificate perfume',
    description:
      'How IFRA certificates work for perfume: IFRA standards, categories, allergen limits, who issues certificates, and what brands should store per batch.',
    excerpt:
      'What an IFRA certificate proves, who issues it, and how it fits into your compliance folder.',
    readTimeMinutes: 8,
    relatedSlugs: ['perfume-manufacturer-documents', 'perfume-certificate-of-analysis', 'import-private-label-perfume-usa'],
    sections: [
      {
        id: 'what-is-ifra',
        title: 'What IFRA is',
        paragraphs: [
          'The International Fragrance Association (IFRA) publishes standards limiting certain fragrance materials based on product type and exposure. An IFRA certificate perfume brands receive is typically a statement that a formula complies with the current IFRA standard for a stated category—often Category 4 for fine fragrance spray.',
          'IFRA is industry self-regulation widely accepted by suppliers and retailers. It is not a government approval, but it is a baseline safety documentation brands should keep.',
        ],
      },
      {
        id: 'categories',
        title: 'IFRA product categories',
        paragraphs: [
          'Categories describe use type: fine fragrance, body lotion, candle, etc. A fine fragrance EDP uses different limits than a shampoo. Ensure your certificate matches how you actually sell the product.',
        ],
      },
      {
        id: 'who-issues',
        title: 'Who issues the certificate',
        paragraphs: [
          'The fragrance house or compounder issuing your juice calculates compliance and signs the IFRA statement. Your filling partner may forward it. Brand owners should archive PDFs per formula version.',
        ],
      },
      {
        id: 'versions',
        title: 'Formula changes and version control',
        paragraphs: [
          'If your supplier reformulates due to material substitution, request an updated IFRA document. Tie each certificate to a formula code and batch period.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is an IFRA certificate required to sell perfume in the U.S.?',
        answer:
          'Not always legally mandated for every sale, but major retailers and informed buyers expect it. It supports due diligence on restricted materials.',
      },
      {
        question: 'Does IFRA replace a COA?',
        answer:
          'No. IFRA addresses fragrance material limits; a COA summarizes batch-specific test results from production.',
      },
      {
        question: 'What IFRA category is fine fragrance spray?',
        answer:
          'Often Category 4, but confirm with your supplier for your exact product type.',
      },
    ],
  },
  {
    slug: 'perfume-certificate-of-analysis',
    title: 'What a Perfume Certificate of Analysis Contains',
    pageName: 'Certificate of Analysis',
    h1: 'Perfume Certificate of Analysis (COA)',
    targetKeyword: 'perfume certificate of analysis',
    description:
      'What a perfume certificate of analysis contains: batch identity, test results, specifications, sign-off, and how COAs differ from IFRA certificates.',
    excerpt:
      'Batch-level testing records—what a COA includes and how it differs from IFRA paperwork.',
    readTimeMinutes: 7,
    relatedSlugs: ['how-ifra-certificates-work', 'perfume-manufacturer-documents', 'import-private-label-perfume-usa'],
    sections: [
      {
        id: 'definition',
        title: 'What a COA is',
        paragraphs: [
          'A perfume certificate of analysis is a batch-specific document listing test results against agreed specifications. Unlike an IFRA statement tied to formula design, a COA confirms that the material or finished batch produced on a given lot meets defined criteria before release.',
        ],
      },
      {
        id: 'fields',
        title: 'Typical fields on a perfume COA',
        paragraphs: [
          'COA layouts vary by lab and manufacturer, but most include the following elements.',
        ],
        bullets: [
          'Product name and internal formula or SKU code',
          'Batch or lot number matching bottle coding',
          'Manufacturing or sample date',
          'Test parameters (appearance, density, refractive index, etc.)',
          'Specification limits and actual results',
          'Pass/fail disposition and authorized signatory',
        ],
      },
      {
        id: 'vs-ifra',
        title: 'COA vs IFRA certificate',
        paragraphs: [
          'IFRA demonstrates formula compliance with fragrance material limits. A COA documents batch release testing. Retailers and importers may ask for both.',
        ],
      },
      {
        id: 'storage',
        title: 'How brands should archive COAs',
        paragraphs: [
          'Store PDFs in a lot-numbered folder aligned with inventory. When customers report an issue, retrieve the matching COA and batch code immediately.',
        ],
      },
    ],
    faq: [
      {
        question: 'Do I need a new COA for every batch?',
        answer:
          'Best practice is yes—each production lot should have traceable release documentation.',
      },
      {
        question: 'Can I create my own COA?',
        answer:
          'COAs should come from the manufacturer or qualified lab. Brands archive supplier COAs rather than writing them.',
      },
      {
        question: 'What if my supplier will not provide a COA?',
        answer:
          'Treat that as a red flag for wholesale and import plans. Request COAs before scaling production.',
      },
    ],
  },
  ...KNOWLEDGE_BASE_ARTICLES_BATCH2,
];

export const getKbArticle = (slug: string) =>
  KNOWLEDGE_BASE_ARTICLES.find((article) => article.slug === slug);
