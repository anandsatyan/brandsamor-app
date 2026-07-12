import type { TopicPageConfig } from '../../components/topic/types';
import {
  buildCommercialPage,
  defaultKeyFacts,
  faq,
  sectionBullets,
} from './buildCommercialPage';

const audienceLinks = [
  { to: '/who-we-work-with', label: 'See all audiences Brandsamor works with' },
  { to: '/fragrance-sampling', label: 'Start with curated fragrance samples' },
  { to: '/packaging-branding', label: 'Explore perfume packaging and branding' },
  { to: '/quality-compliance', label: 'Review quality and documentation support' },
  { to: '/contact', label: 'Contact Brandsamor about your launch' },
];

export const audiencePageConfigs: Record<string, TopicPageConfig> = {
  '/perfume-manufacturer-for-amazon-sellers': buildCommercialPage({
    path: '/perfume-manufacturer-for-amazon-sellers',
    badge: 'AMAZON SELLERS',
    heroDescription:
      'Private label perfume built around Amazon channel realities: hazmat-aware documentation, listing-ready packaging, production from 100 units and clear responsibility lines between what the manufacturer provides and what the seller owns.',
    eyebrowPrefix: 'AMAZON LAUNCH',
    keyFacts: {
      title: 'Amazon seller launch facts',
      description:
        'Production starts at 100 units with indicative pricing from $10 per unit. Packaging, documentation and fulfilment planning should be confirmed before listing inventory on any marketplace.',
      facts: defaultKeyFacts({ format: 'EDP, oils, travel sizes', market: 'Amazon and DTC' }),
    },
    answerBlocks: [
      {
        id: 'amazon-hazmat-reality',
        question: 'How does Amazon\'s dangerous-goods programme affect perfume sellers?',
        answer:
          'Alcohol-based perfume typically falls within Amazon\'s hazmat classification. This affects FBA facility routing, carrier requirements and listing eligibility. Sellers must confirm ASIN classification with Amazon before sending inventory — the product-side IFRA certificate, SDS and COA support that review, but submission and account compliance are the seller\'s responsibility.',
        detail:
          'FBM (Fulfilled by Merchant) is an alternative for ASINs that face FBA hazmat restrictions. Both routes require the same product documents; the logistics overhead differs by route and territory.',
      },
      {
        id: 'amazon-listing-responsibility',
        question: 'What does the manufacturer provide and what does the seller own?',
        answer:
          'The product side covers fragrance sampling, filling, packaging, quality checks and available documentation including IFRA, COA, GMP and MoCRA support. The seller owns the Amazon account, listing copy, product images, advertising, fulfilment method, marketplace compliance and final claims review. Those responsibilities do not transfer with the purchase order.',
        detail:
          'Amazon sellers are one of several audiences on the [who we work with](/who-we-work-with) page — private label fragrance gives sellers a distinct SKU rather than a resell position on someone else\'s listing.',
      },
      {
        id: 'amazon-first-batch',
        question: 'How should a first Amazon perfume batch be planned?',
        answer:
          'One customer, one scent direction and packaging that reads clearly in a small thumbnail. A focused first batch tests whether the listing concept holds before additional SKUs or a wider range are added to the account.',
      },
    ],
    sections: [
      {
        id: 'listing-ready-positioning',
        title: 'Position the fragrance for search and conversion',
        description:
          'Amazon customers compare quickly. A first perfume needs a clear promise — scent family, format, size, gifting angle and brand story — that supports a specific listing rather than a generic private label bottle with no search anchor.',
        bullets: sectionBullets(
          'Define customer, scent family and use occasion before sampling',
          'Choose a bottle size that fits the target price and shipping plan',
          'Use packaging that photographs clearly for marketplace thumbnails',
          'Keep claims realistic and supportable for the formula and channel',
        ),
      },
      {
        id: 'sample-before-inventory',
        title: 'Smell the product before buying marketplace inventory',
        description:
          'Fragrance is hard to judge from supplier photos. A curated sample path provides five direction options to evaluate on skin before any bulk production or Amazon stock commitment is made.',
        bullets: sectionBullets(
          'Curated five-scent sample path before production',
          'Evaluate scent on blotter and skin before selecting the hero SKU',
          'Use sample feedback to sharpen product page language',
          'Move to production only after scent and packaging decisions are clear',
        ),
      },
      {
        id: 'packaging-for-online-retail',
        title: 'Packaging built for transit and thumbnails',
        description:
          'Amazon packaging must look premium and survive pick, pack and delivery. Bottle, cap, label, carton and insert choices should support photos, unboxing and safe transit — not just look good in a catalogue.',
        bullets: sectionBullets(
          'Select bottles and cartons that balance shelf appeal with transit durability',
          'Plan label hierarchy for small mobile-viewport images',
          'Include insert or box choices that reduce damage risk in fulfilment',
          'Confirm barcode, net quantity and responsible-party field space early',
        ),
      },
      {
        id: 'documentation-and-compliance',
        title: 'Documentation for marketplace and internal records',
        description:
          'Amazon sellers may need documents for hazmat review, internal records or retail partners depending on product type and claims. Available certifications include IFRA, GMP, ISO 22716, COA and MoCRA support. The seller remains responsible for listing accuracy and marketplace rule compliance.',
        bullets: sectionBullets(
          'Request fragrance and batch documents during specification',
          'Avoid unsupported therapeutic or medical claims in listings',
          'Review destination and marketplace rules before purchasing inventory',
          'Keep label text aligned with the actual formula and product format',
        ),
      },
      {
        id: 'reorder-path',
        title: 'Plan reorders before the listing runs dry',
        description:
          'A launch batch is only useful if the next order can follow. Production details, packaging decisions and quality checks should be documented from the first batch so reorders move faster — with clearer demand signals and no guesswork on spec.',
        bullets: sectionBullets(
          'Track sell-through before adding more scent variants',
          'Keep approved packaging and artwork files organised',
          'Use reviews and return reasons to improve future batches',
          'Plan production lead time before inventory reaches zero',
        ),
      },
    ],
    faqItems: [
      faq(
        'Does FBA require a larger MOQ than 100 units?',
        'Production MOQ is 100 units. FBA minimum shipment requirements are set by Amazon separately and vary by category, fulfilment centre and territory. Confirm FBA acceptance criteria before committing to a large initial inventory run.',
      ),
      faq(
        'Who submits documents to Amazon\'s hazmat review portal?',
        'The seller. IFRA certificate, SDS, COA and responsible-party details are prepared on the product side and available on request — but submission through Amazon\'s dangerous-goods review process, and account-level compliance, are the seller\'s responsibility.',
      ),
      faq(
        'Can a perfume ASIN avoid the hazmat programme?',
        'Some alcohol-free formats — perfume oils, solid fragrances — may fall outside standard hazmat classification, but sellers should confirm this directly with Amazon for each ASIN rather than assuming. Classification depends on flashpoint, concentration and packaging, not just format name.',
      ),
      faq(
        'What listing copy and images are needed for a perfume launch?',
        'Listing copy, main image, lifestyle images and A+ content are the seller\'s responsibility. Product-side outputs — the sample, production photos, COA and label artwork — can inform those assets, but the listing itself is built and managed by the Amazon seller account holder.',
      ),
      faq(
        'How should sellers plan reorder timing on Amazon?',
        'Production lead time is 3–6 weeks after approvals. FBA stock can run down faster than expected once a listing gains ranking. Plan reorders before stock reaches a critical level — out-of-stock events on Amazon damage BSR faster than most sellers anticipate.',
      ),
      faq(
        'Is one SKU better than a range for a first Amazon launch?',
        'Usually yes. One well-photographed SKU with a clear search position builds review velocity faster than a scattered range competing with itself. A single focused listing also makes it easier to read what is working before adding variants.',
      ),
    ],
    faqTitle: 'Amazon perfume manufacturing questions',
    faqDescription:
      'Answers for Amazon sellers planning a private label fragrance SKU with hazmat documentation, low MOQ production and clear responsibility lines.',
    ctaTitle: 'Plan your Amazon-ready perfume SKU',
    ctaDescription:
      'Share your customer profile, target price, fulfilment model and launch goal. Curated samples come first, then packaging and production against a confirmed spec.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I sell on Amazon and want to plan a private label perfume SKU.',
  }),

  '/perfume-line-for-influencers-creators': buildCommercialPage({
    path: '/perfume-line-for-influencers-creators',
    badge: 'CREATORS',
    heroDescription:
      'Creators and influencers can turn audience loyalty into a wearable, giftable product — private label perfume with curated samples, branded packaging and realistic production timelines that fit a content calendar rather than fight it.',
    eyebrowPrefix: 'CREATOR LINE',
    keyFacts: {
      title: 'Creator launch facts',
      description:
        'A creator fragrance should feel personal, but production still needs practical specs, documentation and repeatable quality. Production MOQ is 100 units, with indicative pricing from $10 per unit.',
      facts: defaultKeyFacts({ format: 'EDP, oils, mists, gift sets', market: 'Creator commerce' }),
    },
    answerBlocks: [
      {
        id: 'creator-fit',
        question: 'Can influencers launch a perfume line without a factory?',
        answer:
          'Yes. Influencers and creators can launch private label perfume without owning a factory by working through a coordinated production route. The process starts with a brand brief, continues through five curated samples, then moves into packaging, production and quality checks for a first batch. The creator signs off every decision; the product carries their brand, their name and their responsibility.',
        detail:
          'Creators are one audience in the broader [who we work with](/who-we-work-with) group, alongside boutiques, hotels, salons, beauty brands and gifting teams.',
      },
      {
        id: 'creator-channel-reality',
        question: 'What channel realities should creators plan around?',
        answer:
          'Social commerce, preorder drops and creator shops move fast, but production does not. Sampling takes 1–2 weeks; artwork, packaging approval and production add 3–6 more weeks; freight varies by destination. A campaign date set before those steps are mapped almost always slips — and a sold-out presale with no product is a credibility problem.',
        detail:
          'Presales carry legal disclosure obligations in some markets. A first batch of finished stock avoids those obligations and demonstrates a real product before the audience is asked to pay.',
      },
      {
        id: 'audience-match',
        question: 'How do creator fragrances avoid feeling generic?',
        answer:
          'A creator fragrance feels specific when scent family, name, packaging and launch story connect to the audience. Samples are curated from a brief that references the creator\'s content style, customer profile and price point — not from a generic fragrance wheel.',
      },
    ],
    sections: [
      {
        id: 'translate-personal-brand',
        title: 'Connect your visual world to a scent direction',
        description:
          'An audience already knows a creator\'s tone, visuals and point of view. The fragrance should extend that world through scent notes, bottle mood, box design and product naming that feel credible — not like a licensed side project with a stock bottle and a sticker.',
        bullets: sectionBullets(
          'Define the audience mood before choosing fragrance families',
          'Connect scent direction to your content, values and visual style',
          'Choose packaging that reads as merchandise, not a giveaway',
          'Keep the first line focused so launch messaging stays clear',
        ),
      },
      {
        id: 'sample-with-small-circle',
        title: 'Test the story privately before going public',
        description:
          'Curated samples let a creator compare scent directions with a small trusted circle before any public announcement. This avoids overpromising a fragrance the audience has never smelled and gives real language for launch content rather than supplier copy.',
        bullets: sectionBullets(
          'Receive five curated fragrances from the creator brief',
          'Evaluate wear, drydown and feedback before committing to production',
          'Build launch content around the selected scent story',
          'Approve the hero scent before packaging is locked',
        ),
      },
      {
        id: 'packaging-for-fans',
        title: 'Packaging fans want to keep and share',
        description:
          'Creator products often succeed when they feel collectible and giftable. Bottle, cap, label, carton and optional gift packaging should reflect the audience and retail price — not look like a white-label stock item with a logo applied.',
        bullets: sectionBullets(
          'Match bottle and box choices to the creator visual identity',
          'Plan unboxing moments that work for launch content',
          'Use travel sizes or gift sets where they fit the audience',
          'Keep decoration choices practical for a first production run',
        ),
      },
      {
        id: 'launch-calendar',
        title: 'Build around the production calendar, not against it',
        description:
          'Creator launches need content timing, fulfilment planning and production sign-off locked before a campaign date is announced. Typical production is 3–6 weeks after approvals; freight adds time on top. A realistic schedule protects the launch from delivery delays becoming public.',
        bullets: sectionBullets(
          'Work backward from campaign date, not only production date',
          'Leave time for sample review and artwork revision rounds',
          'Confirm fulfilment and customer service responsibilities early',
          'Use a first batch to learn before expanding into variants',
        ),
      },
      {
        id: 'responsible-claims',
        title: 'Keep claims and documents launch-safe',
        description:
          'Fragrance can be emotionally compelling without making unsupported claims. The creator — as brand owner — carries final responsibility for marketing language, label accuracy and destination-market compliance. Available certifications and documents support that; they do not replace it.',
        bullets: sectionBullets(
          'Use scent and mood language without medical or therapeutic claims',
          'Request IFRA, COA, GMP, ISO 22716 or halal support where needed',
          'Review ingredient and label wording for your sales market',
          'Keep all approvals documented before production is released',
        ),
      },
    ],
    faqItems: [
      faq(
        'How large does an audience need to be before a creator fragrance makes sense?',
        'There is no fixed threshold. A tight, engaged community of 10,000 can support a first batch better than a loosely-engaged audience of 500,000 if conversion rates and average order values are realistic. The brief, price point and sell-through expectation matter more than follower count.',
      ),
      faq(
        'Should the fragrance be a presale or produced in advance of launch?',
        'Producing in advance is lower-risk. Presales carry legal disclosure requirements in some markets and can damage credibility if production delays occur. A completed first batch demonstrates a real product before the audience is asked to commit money.',
      ),
      faq(
        'Who is responsible for the label and marketing claims?',
        'The creator, as brand owner, signs off all label copy and marketing claims. No agency, production coordinator or manufacturer takes that responsibility away from the person whose name is on the product.',
      ),
      faq(
        'Can travel sizes or sample vials be produced for events and gifting?',
        'Yes, where the format is part of the agreed spec from the start. Travel sizes, vials and gift sets can be planned alongside the hero SKU when quantities and packaging are scoped upfront rather than added after artwork is approved.',
      ),
      faq(
        'How should production timing align with a content calendar?',
        'Work backward: brief, sampling (1–2 weeks), scent approval, artwork, production (3–6 weeks), freight and fulfilment setup. A campaign date announced before those steps are scheduled creates public pressure that production cannot absorb.',
      ),
      faq(
        'Can the fragrance carry the creator\'s name and brand exclusively?',
        'Yes. Private label means the brand, name and story belong to the creator. No manufacturer or coordinator name appears on the finished product.',
      ),
    ],
    faqTitle: 'Creator perfume line questions',
    faqDescription:
      'Answers for creators planning a branded fragrance with sample-first development, production timelines that fit a content calendar and clear brand-owner responsibilities.',
    ctaTitle: 'Build your signature fragrance brief',
    ctaDescription:
      'Share your audience, visual world and launch goal. Curated samples come first, then packaging and a production run against the approved direction.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I am a creator and want to launch a private label perfume line.',
  }),

  '/private-label-perfume-for-boutiques': buildCommercialPage({
    path: '/private-label-perfume-for-boutiques',
    badge: 'BOUTIQUES',
    heroDescription:
      'A boutique-exclusive perfume that fits the shop floor, sells as a gift and keeps customers coming back — curated sampling, packaging coordination, production from 100 units and documentation for retail-ready private label fragrance.',
    eyebrowPrefix: 'BOUTIQUE RETAIL',
    keyFacts: {
      title: 'Boutique launch facts',
      description:
        'Boutiques can start with one hero scent and a first production batch. Indicative pricing starts from $10 per unit, with final cost shaped by bottle, box, decoration and quantity.',
      facts: defaultKeyFacts({ format: 'EDP, oils, travel, gift sets', market: 'Boutique retail' }),
    },
    answerBlocks: [
      {
        id: 'boutique-channel-reality',
        question: 'What does a boutique\'s retail channel actually require from a fragrance?',
        answer:
          'Boutique retail rewards products that are giftable, display-ready and repeatable. A fragrance must photograph well for social posts, sit logically in the existing assortment, survive being tucked into a gift bag and be explainable by staff in two sentences. Those requirements shape every decision from bottle choice to label language.',
        detail:
          'Boutiques are a core audience on [who we work with](/who-we-work-with) because private label fragrance suits stores with a clear customer and a curated point of view.',
      },
      {
        id: 'boutique-moq',
        question: 'Can a small boutique afford a first perfume run?',
        answer:
          'A boutique can start production after sampling and approval with a first batch sized to test sell-through rather than fill shelves for a year. A small initial run confirms customer response, gifting demand and reorder cadence before a larger commitment is made.',
      },
    ],
    sections: [
      {
        id: 'retail-assortment-fit',
        title: 'Fit the fragrance into the existing assortment',
        description:
          'A boutique perfume should feel like it belongs beside the other products. The brief defines customer, scent family, bottle style and price point before samples are curated, so the final product supports the merchandising story rather than sitting awkwardly apart from everything else.',
        bullets: sectionBullets(
          'Match scent direction to the store aesthetic and core shopper',
          'Choose a retail price that sits naturally in the existing category mix',
          'Start with one scent rather than a scattered collection',
          'Plan display, gifting and online merchandising at the same time',
        ),
      },
      {
        id: 'giftable-packaging',
        title: 'Packaging that works on-shelf and in a gift bag',
        description:
          'Boutique fragrance needs to attract browsers, photograph well on Instagram and feel ready to give. Bottle, label, cap and carton decisions should support the store environment and gifting occasions as much as the scent itself.',
        bullets: sectionBullets(
          'Use cartons or sleeves for clean shelf presentation',
          'Keep label hierarchy legible in small retail displays',
          'Plan gift sets when customers frequently buy for occasions',
          'Align colour and finish with the boutique visual identity',
        ),
      },
      {
        id: 'sampling-for-merchants',
        title: 'Evaluate scents from a merchant\'s perspective',
        description:
          'Staff who know the customers are the right people to approve a fragrance. The five-scent curated sample path lets the team identify the most commercially viable direction and build the sales-floor language at the same time — before any packaging or production spend.',
        bullets: sectionBullets(
          'Test samples with staff who know customer taste',
          'Compare opening, drydown and giftability together',
          'Choose a scent that is distinctive but easy to describe',
          'Use sample notes to prepare front-of-house talking points',
        ),
      },
      {
        id: 'quality-for-repeat-sales',
        title: 'Consistent specs support repeat sales',
        description:
          'Retail success depends on a product customers come back to. Production details, quality checks and documentation are kept from the first batch so reorders maintain the same scent, fill level and packaging finish.',
        bullets: sectionBullets(
          'Approve a production sample before bulk filling begins',
          'Document bottle, cap, fragrance and packaging choices per batch',
          'Quality checks cover fill, spray, label and carton condition',
          'Plan reorder timing around gift seasons and sell-through data',
        ),
      },
      {
        id: 'expand-carefully',
        title: 'Expand after the first scent proves demand',
        description:
          'The strongest boutique fragrance lines often begin with a single hero product. Once customers are buying and returning for it, travel sizes, oils, seasonal scents or gift sets can follow with real data from the same store.',
        bullets: sectionBullets(
          'Track sell-through and unsolicited customer comments after launch',
          'Use gift-season peaks to test sets or limited outer packaging',
          'Add variants only when the hero scent shows clear repeat demand',
          'Keep the brand story consistent across future batches and formats',
        ),
      },
    ],
    faqItems: [
      faq(
        'What retail price range works for a boutique-exclusive perfume?',
        'Prices that hold margin sit at 3–5× the landed unit cost, covering boutique margin, staff incentive and the premium customers expect from an exclusive product. The landed cost includes production, freight, packaging and any compliance work — not just the base unit price.',
      ),
      faq(
        'Is one scent better than a small collection for a first boutique launch?',
        'One hero scent is almost always more practical. Multiple scents divide attention on the sales floor, demand more stock commitment and make the brand story harder for staff to communicate. A collection adds coherence once the hero has proven demand.',
      ),
      faq(
        'Can the perfume carry the boutique\'s name and branding exclusively?',
        'Yes. Private label means the brand, name and packaging story belong to the boutique. No manufacturer branding appears on the finished product.',
      ),
      faq(
        'Who handles label compliance and INCI disclosure?',
        'The boutique, as brand owner, is responsible for label accuracy, INCI disclosure and destination-market requirements. IFRA, COA and manufacturing context are available to support that compliance work.',
      ),
      faq(
        'How much staff preparation is needed before launch?',
        'Enough to describe the scent family, the occasion and the brand story in two or three confident sentences. A brief staff tasting session using the curated samples — before the product goes on shelf — is more effective than a written training document.',
      ),
      faq(
        'Can the first batch include both full-size and travel-size formats?',
        'Yes, provided both are in the spec from the start. Splitting a first batch across two formats reduces the quantity of each, which can affect per-unit cost and packaging tooling. Confirm formats and quantities together rather than adding a travel size after carton artwork is finalised.',
      ),
    ],
    faqTitle: 'Boutique private label perfume questions',
    faqDescription:
      'Answers for boutique owners evaluating private label perfume as a retail, gifting or online product that fits their existing customer and assortment.',
    ctaTitle: 'Plan a boutique-exclusive fragrance',
    ctaDescription:
      'Share your store concept, customer profile and target retail price. Curated samples come first, then packaging and a first batch sized to test demand.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I own a boutique and want to create a private label perfume.',
  }),

  '/hotel-signature-scent-manufacturer': buildCommercialPage({
    path: '/hotel-signature-scent-manufacturer',
    badge: 'HOSPITALITY',
    heroDescription:
      'A hotel signature scent guests can remember, buy and take home — production from 100 units, curated samples matched to the property brief, and formats built for gift shops, spa retail, VIP programmes and room amenities.',
    eyebrowPrefix: 'HOTEL SCENT',
    keyFacts: {
      title: 'Hospitality launch facts',
      description:
        'Hotel fragrance projects start with samples and move into production from 100 units. Unit pricing starts from $10 depending on format, bottle, packaging and quantity.',
      facts: defaultKeyFacts({ format: 'EDP, room spray, travel', market: 'Hotels and resorts' }),
    },
    answerBlocks: [
      {
        id: 'hotel-channel-reality',
        question: 'What makes hospitality fragrance different from standard retail?',
        answer:
          'Hotel fragrance sits across multiple channels inside one property — gift shop, spa retail, VIP gifting, room amenities — and each has different pricing, packaging, regulatory treatment and reorder logic. A retail eau de parfum and a room amenity may share a scent direction but are distinct products in terms of formula classification, label requirements and production route.',
        detail:
          'Hotels and hospitality teams are on [who we work with](/who-we-work-with) because scent extends the memory of a stay into a product guests can take home.',
      },
      {
        id: 'hotel-use-cases',
        question: 'Where can hotels use private label fragrance?',
        answer:
          'Gift shops, spa retail, minibar programmes, VIP welcome gifts, event gifting and branded room sprays are all established hospitality use cases. The format, price point and label should match the specific use rather than assuming one product covers all channels.',
      },
    ],
    sections: [
      {
        id: 'property-story',
        title: 'Translate the property into a scent brief',
        description:
          'A hotel fragrance should express place, service style and guest memory. A brief built on location, room palette, material references and service tone produces curated samples that connect to the property — not a generic "fresh and clean" that could belong to any hotel brand.',
        bullets: sectionBullets(
          'Translate location, materials and guest experience into scent direction',
          'Choose fragrance families that fit the guest profile and price tier',
          'Avoid overpowering notes in spaces guests share for extended periods',
          'Keep the retail product aligned with the on-property atmosphere',
        ),
      },
      {
        id: 'product-formats',
        title: 'Match formats to retail, rooms and gifting goals',
        description:
          'Eau de parfum, room spray, travel sizes and gift sets serve different guest moments. The format should be chosen by where guests encounter the product and whether the goal is revenue, brand recognition or guest appreciation — not by what is cheapest or most convenient to produce.',
        bullets: sectionBullets(
          'Eau de parfum for gift shop and spa retail',
          'Room spray for atmosphere, turndown and take-home memory',
          'Travel sizes for amenities, signature events and VIP stays',
          'Gift sets for premium rooms, weddings and corporate programmes',
        ),
      },
      {
        id: 'hospitality-packaging',
        title: 'Packaging that reads as part of the property',
        description:
          'Hotel fragrance packaging should feel like an extension of the property rather than a generic product with a sticker. Bottle, label, box and insert options can reflect the visual identity without requiring bespoke glass tooling on a first run.',
        bullets: sectionBullets(
          'Use brand colours, typography and property cues with restraint',
          'Plan gift-ready cartons for front-desk and spa retail formats',
          'Consider compact formats for luggage-friendly and travel retail use',
          'Label content should meet destination-market cosmetic requirements',
        ),
      },
      {
        id: 'operations-and-reorders',
        title: 'Plan for operations and predictable reorders',
        description:
          'Hospitality teams need reliable lead times, reorder planning and one clear internal owner for approvals. Typical production is 3–6 weeks after sign-off; seasonal peaks and events should be built into inventory planning rather than treated as emergencies.',
        bullets: sectionBullets(
          'Assign a single decision owner for scent and packaging approvals',
          'Plan quantities across gift shop, amenities and gifting separately',
          'Track consumption by channel before scaling quantities',
          'Keep reorder specs documented so future batches match the original',
        ),
      },
      {
        id: 'documents-and-claims',
        title: 'Keep hospitality claims and labels grounded',
        description:
          'Whether a fragrance is sold in a hotel boutique or gifted to a VIP guest, label claims must match the actual product. Available certifications include IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support — chosen for the destination market, not for marketing optics.',
        bullets: sectionBullets(
          'Review market rules separately for retail and amenity use',
          'Use accurate product identity and net quantity on every label',
          'Request relevant certificates during the specification stage',
          'Avoid wellness or therapeutic claims unless properly substantiated',
        ),
      },
    ],
    faqItems: [
      faq(
        'Should a hotel\'s retail fragrance be the same as its in-room amenity?',
        'Not necessarily. Retail-grade eau de parfum and an amenity body wash can share a scent direction without being identical products. Retail products need commercial packaging, full cosmetic labelling and a retail price point; amenities follow different sourcing, dosage and regulatory classification logic.',
      ),
      faq(
        'How many units should a hotel start with?',
        '100 units is the production minimum. For an active gift shop, spa and seasonal gifting programme, 200–300 units across one or two SKUs is a more useful starting range. Volume and SKU count should be matched to realistic channel demand rather than the minimum.',
      ),
      faq(
        'Who owns the scent formula after the first production run?',
        'Formula exclusivity and long-term ownership depend on the commercial terms agreed at brief stage. These should be confirmed in writing before production begins, not assumed after the first batch ships.',
      ),
      faq(
        'Can room sprays and personal fragrances share the same scent brief?',
        'They can start from the same inspiration, but formula, safety classification, regulatory treatment and packaging are different for each product type. A room spray and a personal perfume with the same name should be scoped, assessed and approved as separate products.',
      ),
      faq(
        'What documentation does a hotel gift shop typically need?',
        'IFRA certificate, INCI list, country of origin and — depending on the destination market and retail channel — a cosmetic product safety assessment. Retail products stocked in hotel boutiques follow the same cosmetic regulations as any retail fragrance sold in that country.',
      ),
      faq(
        'How far in advance should a hotel start the fragrance development process?',
        'For a property opening, seasonal relaunch or event gift programme, allow 10–14 weeks from brief to in-hand. That covers sampling (1–2 weeks), artwork and approval rounds, production (3–6 weeks) and inbound freight. Starting later compresses revision time and risks stock shortfalls.',
      ),
    ],
    faqTitle: 'Hotel signature scent questions',
    faqDescription:
      'Answers for hotels, resorts and hospitality teams considering a branded fragrance for gift shops, spa retail, amenities or VIP gifting.',
    ctaTitle: 'Build a hotel scent guests remember',
    ctaDescription:
      'Share your property brief — location, guest profile, intended use and any scent references. Samples and a production plan will follow.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I want to create a hotel signature scent product.',
  }),

  '/salon-spa-private-label-fragrance': buildCommercialPage({
    path: '/salon-spa-private-label-fragrance',
    badge: 'SALONS & SPAS',
    heroDescription:
      'Salons and spas can extend the treatment-room experience with a branded fragrance clients take home — sample-first private label perfume, body mist or room spray with packaging that fits the service environment and a retail price the client recognises as fair.',
    eyebrowPrefix: 'SALON & SPA',
    keyFacts: {
      title: 'Salon and spa launch facts',
      description:
        'Service businesses can start with curated samples and a first production batch from 100 units. Indicative pricing starts from $10 per unit depending on product format, bottle and packaging choices.',
      facts: defaultKeyFacts({ format: 'EDP, mist, oil, room spray', market: 'Salon and spa retail' }),
    },
    answerBlocks: [
      {
        id: 'salon-spa-channel-reality',
        question: 'What channel realities shape salon and spa fragrance retail?',
        answer:
          'Service businesses sell fragrance in a fundamentally different context from a boutique or online store. The conversion moment is a staff recommendation after a treatment — not a search result or an impulse display. Format, retail price and merchandising placement must make sense given what clients already spend at the same business.',
        detail:
          'Salons and spas are part of the broader [who we work with](/who-we-work-with) audience because fragrance connects naturally to the physical service experience.',
      },
      {
        id: 'wellness-product-choice',
        question: 'Which fragrance formats fit salons and spas?',
        answer:
          'Format choices depend on the service environment and client spending behaviour. Eau de parfum suits premium retail positions; body mist works at accessible price points; perfume oil can feel intimate at the treatment-room price level; room sprays extend the atmosphere into a take-home context. The format should match the client, not the supplier catalogue.',
      },
    ],
    sections: [
      {
        id: 'service-experience',
        title: 'Give the service atmosphere a product form',
        description:
          'Clients remember scent from a treatment room, reception area or styling experience. A private label fragrance gives that memory something to buy, gift or use between appointments — keeping the brand present outside the booking.',
        bullets: sectionBullets(
          'Define the feeling clients already associate with the space',
          'Choose calming, polished or expressive directions with intention',
          'Connect fragrance to treatments, retail shelves or memberships',
          'Avoid generic "spa" notes when the brand has a stronger identity',
        ),
      },
      {
        id: 'format-and-price',
        title: 'Match format to the service menu and price ladder',
        description:
          'A high-end spa and a mid-market salon have different client price ceilings. Format, bottle and packaging choices must land at a retail price clients consider reasonable given what they already spend at the same business.',
        bullets: sectionBullets(
          'Eau de parfum for premium take-home retail',
          'Body mist for lighter everyday use and accessible gifting',
          'Perfume oil for intimate or ritual-style positioning',
          'Room spray for treatment rooms, reception and home atmosphere',
        ),
      },
      {
        id: 'sample-with-team',
        title: 'Sample with the people who know your clients',
        description:
          'Stylists, therapists and front-of-house staff usually know which scent directions clients respond to. The five-scent sample path gives that team something to evaluate with the client profile in mind — producing a scent they can explain from personal experience, not from reading a spec sheet.',
        bullets: sectionBullets(
          'Compare samples against the client profile, not personal preference alone',
          'Listen for staff language that makes the scent natural to recommend',
          'Choose a hero direction before adding seasonal or supplementary products',
          'Use sample feedback to plan merchandising positions and selling scripts',
        ),
      },
      {
        id: 'retail-merchandising',
        title: 'Place fragrance at the right client moment',
        description:
          'Salon and spa fragrance converts best when clients understand the connection to the service. Staff recommendation immediately after a treatment, a tester near checkout and a clear product story outperform passive shelf placement every time.',
        bullets: sectionBullets(
          'Position fragrance near checkout, treatment rooms or gift displays',
          'Use testers and blotters in client-facing areas',
          'Build gift bundles around services, memberships or seasonal occasions',
          'Keep packaging aligned with towels, robes, skincare and brand materials',
        ),
      },
      {
        id: 'documents-and-quality',
        title: 'Support the product with quality checks and available documents',
        description:
          'Beauty service brands need clients to trust the retail products they recommend. Production sample approval, filling checks and available documentation — IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support — are available where the project requires them.',
        bullets: sectionBullets(
          'Approve scent, bottle, label and box before bulk production releases',
          'Review labels against formula, claims and destination market',
          'Keep documents available for retail or wholesale conversations',
          'Plan reorders around appointment peaks and gift-giving seasons',
        ),
      },
    ],
    faqItems: [
      faq(
        'What fragrance retail price makes sense for a salon or spa client?',
        'Price should sit relative to existing service spend. A high-end spa with treatments at $150–200 can support a $60–80 fragrance retail price; a mid-market salon may find $30–40 more appropriate. The format and packaging must justify the price point before the first client picks it up.',
      ),
      faq(
        'Can a multi-location salon or franchise run the same fragrance across all sites?',
        'Yes, as long as label accuracy, compliance and stock responsibilities are managed centrally. Multi-location orders also consolidate reorder volume, which is more cost-efficient than each site ordering independently at production minimums.',
      ),
      faq(
        'Who handles cosmetic compliance for a salon selling retail fragrance?',
        'The salon, as brand owner, is responsible for label accuracy and destination-market compliance. IFRA, COA and manufacturing information are available to support that. The salon should also confirm that its retail product classification meets any applicable local rules for cosmetics sold in service businesses.',
      ),
      faq(
        'How do staff recommend the fragrance without it feeling like a hard sell?',
        'The most effective recommendation follows naturally from the service: naming the scent used during the treatment, letting the client smell the retail version and explaining the connection. A brief team tasting session before launch produces staff who describe the product from experience, not from a training document.',
      ),
      faq(
        'Can a salon launch a room spray alongside a personal fragrance?',
        'Yes, but they are separate products with separate formulas, safety assessments and packaging considerations. Scoping both products in a single brief is more efficient than staging them separately, as long as the salon can commit stock and sales attention to two SKUs.',
      ),
      faq(
        'Is 100 units a sensible starting quantity for a single-location salon?',
        '100 units is the production minimum and a practical test run for a single location. Sell-through data from the first batch tells you whether to reorder the same spec, adjust the retail price or reconsider the format before committing to larger quantities.',
      ),
    ],
    faqTitle: 'Salon and spa fragrance questions',
    faqDescription:
      'Answers for salons, spas and wellness studios adding branded fragrance to retail shelves, treatment rooms or client gifting programmes.',
    ctaTitle: 'Create a fragrance clients take home',
    ctaDescription:
      'Share your service environment, client profile and target retail price. Curated samples and a first batch can be planned from that brief.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I run a salon or spa and want a private label fragrance.',
  }),

  '/corporate-gifting-perfume-supplier': buildCommercialPage({
    path: '/corporate-gifting-perfume-supplier',
    badge: 'CORPORATE GIFTS',
    heroDescription:
      'Branded perfume gifts for clients, events, employees and partners — production from 100 units, gift-ready packaging options, realistic procurement timelines and clear documentation support for corporate gifting programmes.',
    eyebrowPrefix: 'GIFT PROGRAM',
    keyFacts: {
      title: 'Corporate gifting facts',
      description:
        'Corporate perfume gifting can begin with samples and move into production from 100 units. Pricing starts from $10 per unit, with final cost driven by format, gift packaging, decoration and quantity.',
      facts: defaultKeyFacts({ format: 'EDP, travel, gift sets', market: 'Corporate gifting' }),
    },
    answerBlocks: [
      {
        id: 'gifting-channel-reality',
        question: 'What makes corporate gifting a distinct production challenge?',
        answer:
          'Corporate gift programmes involve stakeholder approval rounds, event deadlines, potential multi-site delivery and procurement policies that standard DTC production does not face. A lead time that works for a boutique reorder may not work for a conference gift that must arrive at three offices across two countries by a fixed date.',
        detail:
          'Corporate gifting teams are on [who we work with](/who-we-work-with) because a polished branded fragrance gift does not require in-house production — it requires planning discipline.',
      },
      {
        id: 'gifting-moq',
        question: 'What is the minimum order for corporate perfume gifts?',
        answer:
          'Production starts at 100 units after sampling and approval. For a corporate programme that needs consistent stock across multiple events or offices, the right quantity is determined by total programme demand rather than the minimum. Document the full programme scope before the first purchase order is placed.',
      },
    ],
    sections: [
      {
        id: 'recipient-first-brief',
        title: 'Start with the recipient, not the logo',
        description:
          'A corporate perfume gift that feels considered is more effective than one that is clearly promotional. The brief starts with who receives it, the occasion, the tone and any cultural or regulatory sensitivities — before fragrance and packaging choices are made.',
        bullets: sectionBullets(
          'Define client, employee, event or partner recipient groups clearly',
          'Choose a scent direction that is broadly wearable across recipient cultures',
          'Avoid over-branding when premium perception matters more than visibility',
          'Match the product tone to the occasion and the recipient relationship',
        ),
      },
      {
        id: 'gift-packaging',
        title: 'Build gift-ready packaging from the start',
        description:
          'Corporate gifts often require boxes, inserts, message cards or event presentation. Packaging should protect the bottle, communicate the occasion and feel intentional when opened — not like a product pulled from a retail shipment.',
        bullets: sectionBullets(
          'Use cartons, rigid boxes or sets where the budget supports them',
          'Plan branded inserts or message cards early in the brief',
          'Keep recipient unboxing and safe delivery in mind throughout',
          'Confirm artwork approvals well before production is released',
        ),
      },
      {
        id: 'sample-for-stakeholders',
        title: 'Sample before stakeholder approval rounds',
        description:
          'Corporate gifting decisions typically involve procurement, marketing, legal and leadership. A curated five-scent sample path gives those stakeholders something real to evaluate — reducing the number of revision rounds needed after packaging and quantities are committed.',
        bullets: sectionBullets(
          'Use samples to align stakeholders on scent direction early',
          'Choose broadly appealing fragrance for mixed-culture recipient groups',
          'Confirm packaging materials alongside the scent approval',
          'Document the full approved spec before the purchase order is released',
        ),
      },
      {
        id: 'timelines-and-logistics',
        title: 'Plan timelines against the event date, not the production estimate',
        description:
          'A corporate event gift needs sampling, approval rounds, production and freight time — all before the in-hand date. Typical production is 3–6 weeks after full approval. Buffer for revision rounds and multi-leg freight must be built in, not assumed away.',
        bullets: sectionBullets(
          'Work backward from the in-hand event or gifting date',
          'Allow time for artwork, sample and packaging approval rounds',
          'Confirm shipping responsibilities and destination requirements early',
          'Account for staggered delivery across multiple offices or countries',
        ),
      },
      {
        id: 'documents-and-restrictions',
        title: 'Check documents and recipient-market rules',
        description:
          'Corporate gifts can cross borders and enter regulated workplace environments. Available documentation includes IFRA, GMP, ISO 22716, COA and MoCRA support. Procurement teams must confirm internal gift policies and destination-country rules for fragrance.',
        bullets: sectionBullets(
          'Verify corporate gifting policies before finalising value and format',
          'Review destination rules for alcohol-based fragrance where relevant',
          'Request documentation during specification, not after production',
          'Keep claims simple, accurate and appropriate for diverse recipients',
        ),
      },
    ],
    faqItems: [
      faq(
        'Can orders be delivered directly to multiple office locations?',
        'Delivery logistics depend on terms agreed at brief stage. Direct-to-recipient, consolidated and staged delivery all carry different cost and coordination implications. Confirm the delivery model before the purchase order is issued, not after production completes.',
      ),
      faq(
        'Can the fragrance carry a personalised message for recipients?',
        'Personalised inserts, message cards or printed sleeves can be planned as part of the packaging spec. Bottle-level personalisation — engraving or individual print — is a distinct scope item that must be agreed before production begins, not added at the despatch stage.',
      ),
      faq(
        'What is a realistic lead time for a corporate gift order?',
        'Four months is a comfortable target from brief to in-hand; six weeks is tight and leaves no room for revision rounds. Production takes 3–6 weeks after full approval; add sampling, stakeholder sign-off, artwork and freight time around that.',
      ),
      faq(
        'Are there restrictions on perfume as a corporate gift?',
        'Some corporate policies restrict high-value items or alcohol-based products. Certain recipient markets have regulatory restrictions on receiving fragrance by post or across borders. These are the brand\'s and procurement team\'s responsibility to confirm — not a production question.',
      ),
      faq(
        'Can the same fragrance be reordered for future events?',
        'Yes, provided the spec is fully documented at the first production. Reorders are faster and lower-risk when packaging, artwork and formula are already approved and on file. Reorder speed deteriorates when spec documentation is incomplete.',
      ),
      faq(
        'Is halal fragrance available for events with mixed-culture recipient groups?',
        'Alcohol-free attar and mukhallat formats, and halal ingredient audit paths for alcohol-based eau de parfum, can be requested through the partner network. The halal position should be confirmed at brief stage so it is reflected in formula, label and packaging from the first batch.',
      ),
    ],
    faqTitle: 'Corporate perfume gifting questions',
    faqDescription:
      'Answers for marketing, procurement and events teams planning branded perfume gifts with realistic timelines, clear delivery responsibilities and low MOQ production.',
    ctaTitle: 'Plan a premium perfume gift programme',
    ctaDescription:
      'Share your recipient group, deadline, budget and packaging requirements. Curated samples and a production plan can be scoped from that brief.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I need branded perfume for a corporate gifting program.',
  }),

  '/private-label-perfume-for-fashion-brands': buildCommercialPage({
    path: '/private-label-perfume-for-fashion-brands',
    badge: 'FASHION BRANDS',
    heroDescription:
      'Fashion brands can extend apparel, accessories or lifestyle collections into fragrance — private label perfume with curated sampling against the collection brief, packaging designed as an accessory and production timelines that respect the buying calendar.',
    eyebrowPrefix: 'FASHION EXTENSION',
    keyFacts: {
      title: 'Fashion fragrance facts',
      description:
        'Fashion brands can start with one scent that reflects the collection world. Production MOQ starts at 100 units, with indicative pricing from $10 per unit depending on format and packaging.',
      facts: defaultKeyFacts({ format: 'EDP, travel, gift sets', market: 'Fashion and lifestyle' }),
    },
    answerBlocks: [
      {
        id: 'fashion-channel-reality',
        question: 'What do fashion channel realities mean for a perfume launch?',
        answer:
          'Fashion wholesale buyers, DTC drops and department store buyers each have distinct expectations for fragrance: dossier documentation, sell-in dates, pricing architecture and packaging standards that differ from anything a garment buyer discusses. A fragrance launched alongside a collection needs to be scoped and approved on a separate timeline — production for fragrance does not follow garment factory logic.',
        detail:
          'Fashion brands are on [who we work with](/who-we-work-with) because fragrance works best when a brand already has a recognisable aesthetic and a defined customer.',
      },
      {
        id: 'fashion-first-scent',
        question: 'How should fashion brands choose a first scent?',
        answer:
          'The first scent should match the brand world more than founder preference. A brief drawn from the customer profile, collection mood, price architecture and visual direction produces five curated samples for the team to evaluate — rather than an open catalogue browse that rarely connects scent to brand in a coherent way.',
      },
    ],
    sections: [
      {
        id: 'brand-aesthetic',
        title: 'Translate the aesthetic into fragrance',
        description:
          'Fashion customers buy into a world. The perfume should express that world through scent family, name, bottle silhouette, label hierarchy and packaging finish — not repurpose whatever stock components happen to fit a convenient price.',
        bullets: sectionBullets(
          'Use collection mood, materials and customer lifestyle as brief inputs',
          'Choose scent families that match the brand attitude and price tier',
          'Avoid a generic trend scent if it conflicts with the existing brand',
          'Treat fragrance as part of the product line, not a marketing add-on',
        ),
      },
      {
        id: 'packaging-as-accessory',
        title: 'Design the packaging like an accessory',
        description:
          'For a fashion brand, bottle and box choices carry as much meaning as the scent. Components and decoration are coordinated so the finished product feels visually coherent with the garment, accessory and retail context it will live in.',
        bullets: sectionBullets(
          'Match cap, label and carton decisions to the brand visual codes',
          'Plan product photography alongside packaging direction early',
          'Use gift-ready details for drops, bundles or seasonal campaigns',
          'Keep decoration practical for the production volume and retail price',
        ),
      },
      {
        id: 'drop-strategy',
        title: 'Use fragrance for drops and seasonal launches',
        description:
          'A first perfume can launch as a permanent hero product, a capsule drop or an event gift. A small first batch lets fashion brands test customer and wholesale response before planning a broader range.',
        bullets: sectionBullets(
          'Launch one hero scent with a clear campaign story',
          'Use limited outer packaging when it supports the collection narrative',
          'Bundle fragrance with apparel or accessories where it makes editorial sense',
          'Review customer response before building out flankers or a wardrobe',
        ),
      },
      {
        id: 'sampling-with-brand-team',
        title: 'Sample with brand and wholesale teams before committing',
        description:
          'A fashion perfume needs to work for the customer, the wholesale buyer and the campaign story. The sample stage lets creative, merchandising and retail teams compare directions before production specs are finalised and packaging is committed.',
        bullets: sectionBullets(
          'Review five curated samples against the actual customer profile',
          'Compare scent strength, drydown and giftability as a team',
          'Align naming and packaging decisions after the scent direction is chosen',
          'Use cross-team feedback to avoid a niche first launch',
        ),
      },
      {
        id: 'quality-and-compliance',
        title: 'Keep the fashion launch production-ready',
        description:
          'A polished campaign needs a product that can be made consistently and documented properly. Production sample approval, quality checks and available certifications — IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support — are available where the project requires them.',
        bullets: sectionBullets(
          'Confirm formula, bottle, decoration and carton before launch assets are shot',
          'Review labels and claims before production is released',
          'Keep documents available for wholesale buyers and retail partners',
          'Plan reorder timing before seasonal demand peaks arrive',
        ),
      },
    ],
    faqItems: [
      faq(
        'How should a fashion brand time a fragrance launch against a seasonal collection?',
        'A fragrance needs sampling, approvals and production typically 10–14 weeks before the in-hand date. A garment collection finalises materials 8–12 weeks before delivery. Brief the fragrance when the collection concept is settled — not when the garments are already in production and the season is locked.',
      ),
      faq(
        'Should the scent change each season, or stay constant?',
        'Building one recognisable brand scent is generally more commercially valuable than seasonal reformulation. A permanent hero scent with seasonal or limited-edition outer packaging is more practical than a new formula twice a year and avoids confusing customers who have come to associate the brand with a specific scent.',
      ),
      faq(
        'Can the perfume be included on a fashion wholesale order alongside garments?',
        'Only if the channel buyers stock fragrance and have appropriate cosmetic handling procedures. Multi-brand fashion stores in some markets require separate cosmetic sections, specific labelling and regulatory documentation. Confirm with wholesale buyers before adding fragrance to an order form.',
      ),
      faq(
        'What documents do fashion wholesale buyers typically ask for?',
        'IFRA certificate, COA, INCI list, responsible-party contact and — depending on the destination country — a Cosmetic Product Safety Report or RP certificate. Having those ready before the range presentation avoids a first-order delay while documentation is assembled after the fact.',
      ),
      faq(
        'Can limited packaging be produced for a collaboration without reworking the full range?',
        'Yes. A capsule with a different outer carton or sleeve can be scoped as a standalone production run, provided minimum quantities and lead times are viable. Existing packaging dielines and artwork files from the main range reduce the work required.',
      ),
      faq(
        'Can the fashion brand own the fragrance name exclusively?',
        'The brand name on the product belongs to the brand. Formula exclusivity and whether it is held exclusively for one brand should be confirmed in the commercial terms agreed at brief stage, in writing, before the first production order.',
      ),
    ],
    faqTitle: 'Fashion brand perfume questions',
    faqDescription:
      'Answers for fashion, apparel and accessories brands adding fragrance as a private label extension — from first sample to wholesale launch and seasonal reorders.',
    ctaTitle: 'Extend your fashion brand into scent',
    ctaDescription:
      'Share your aesthetic, customer profile and launch model. Curated samples and a packaging plan for a first production run will follow.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I have a fashion brand and want to launch private label perfume.',
  }),

  '/private-label-perfume-for-skincare-beauty-brands': buildCommercialPage({
    path: '/private-label-perfume-for-skincare-beauty-brands',
    badge: 'BEAUTY BRANDS',
    heroDescription:
      'Skincare and beauty brands can add a fragrance extension that sits coherently inside the existing line — sample-first private label perfume, packaging coordination, production from 100 units and certification pathways matched to the brand\'s compliance position.',
    eyebrowPrefix: 'BEAUTY EXTENSION',
    keyFacts: {
      title: 'Beauty brand launch facts',
      description:
        'Beauty brands can extend into fragrance with curated samples and production from 100 units. Indicative pricing starts from $10 per unit, with final cost based on format, bottle and packaging.',
      facts: defaultKeyFacts({ format: 'EDP, body mist, oil', market: 'Beauty and skincare' }),
    },
    answerBlocks: [
      {
        id: 'beauty-channel-reality',
        question: 'What channel realities should a beauty brand expect when adding fragrance?',
        answer:
          'Beauty retail buyers — whether at Sephora, independent boutiques or online marketplaces — treat fragrance SKUs differently from skincare or haircare. They may require a separate Responsible Person, a distinct CPNP or SCPN notification, a safety assessment for the fragrance formula specifically, and retailer dossier documentation that the skincare range did not need. Plan the fragrance as a new regulatory file, not an extension of an existing one.',
        detail:
          'Beauty and skincare brands are a major audience on [who we work with](/who-we-work-with) because fragrance connects naturally to routine, identity and repeat purchase.',
      },
      {
        id: 'beauty-claims',
        question: 'How should beauty brands keep fragrance claims compliant?',
        answer:
          'Fragrance claims should be tied to scent, format and cosmetic use unless stronger claims are reviewed and substantiated. The brand owner carries final responsibility for label wording, marketing language and market compliance — no production partner or coordinator takes that obligation away from the person selling the product.',
      },
    ],
    sections: [
      {
        id: 'extend-scent-world',
        title: 'Connect the fragrance to the existing product world',
        description:
          'If customers already associate the brand with a texture, ingredient story or aromatic profile, a branded perfume makes that world wearable. The brief uses existing product cues — not unsupported therapeutic claims from the skincare range — to curate samples for a coherent fragrance extension.',
        bullets: sectionBullets(
          'Use existing scent cues without copying claims from the skincare line',
          'Choose a fragrance family that matches the routine positioning',
          'Decide whether the direction is clean, sensual, fresh or ritual-led',
          'Keep the first scent recognisably connected to the brand customers know',
        ),
      },
      {
        id: 'choose-beauty-format',
        title: 'Choose a format that fits the beauty routine',
        description:
          'Eau de parfum, body mist, perfume oil and travel formats each occupy a different position in a beauty customer\'s routine. The format should sit naturally alongside the existing product range rather than being chosen for production convenience.',
        bullets: sectionBullets(
          'Eau de parfum for a premium fragrance extension at the top of the range',
          'Body mist for lighter daily routines and accessible gifting',
          'Perfume oil for concentrated or ritual-style positioning',
          'Travel sizes for discovery sets, checkout add-ons and gifting',
        ),
      },
      {
        id: 'packaging-coherence',
        title: 'Make the packaging feel native to the line',
        description:
          'The perfume bottle and carton should sit naturally beside skincare jars, haircare bottles or cosmetic compacts. Components, labels and decoration are coordinated so the fragrance reads as part of the beauty system — not as an import from a different brand.',
        bullets: sectionBullets(
          'Match label language, colour palette and finish to existing products',
          'Plan cartons or inserts for gift sets and cross-sell bundles',
          'Keep INCI and net quantity space clear and legible on labels',
          'Use premium packaging touches only where the retail price supports them',
        ),
      },
      {
        id: 'sample-for-customer-fit',
        title: 'Sample for customer fit, not founder preference',
        description:
          'Beauty customers may expect the perfume to match the sensorial promise of the existing products. The curated sample path gives the team five directions to compare against customer expectations and brand positioning before packaging is committed.',
        bullets: sectionBullets(
          'Evaluate opening, drydown and layering potential against the product range',
          'Compare scent directions with existing customer reviews and rituals',
          'Use the sample stage before committing to bottle or carton choices',
          'Select one hero scent before planning a broader fragrance collection',
        ),
      },
      {
        id: 'documentation-for-beauty',
        title: 'Prepare documentation for beauty retail channels',
        description:
          'Beauty retailers frequently require documentation that goes beyond what a standalone perfume brand faces. Available certifications and support include IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support — scoped to the formula, market and channel, not selected for marketing effect.',
        bullets: sectionBullets(
          'Request relevant documents during specification, not at the buyer meeting',
          'Review cosmetic label requirements for each target market separately',
          'Keep fragrance claims distinct from any skincare performance claims',
          'Approve production samples before launch photography and stock is ordered',
        ),
      },
    ],
    faqItems: [
      faq(
        'Does the perfume need to match an existing product\'s scent exactly?',
        'Not necessarily. The branded perfume can be inspired by or connected to an existing product scent without being identical. The perfume label, ingredient list and allergen disclosure must reflect the actual perfume formula — not the skincare product it draws inspiration from.',
      ),
      faq(
        'How should beauty brands position a perfume alongside clean skincare claims?',
        '"Clean" has no universal legal definition for fragrance or skincare. If the brand uses "clean" across the existing range, the fragrance should meet the same internal criteria or carry a separately substantiated positioning. Applying the term without clear criteria risks inconsistency that regulators and industry press notice.',
      ),
      faq(
        'Can the fragrance be designed to layer with existing skincare?',
        'Layering is a marketing direction; the formula is a separate specification. A layering claim used in marketing or on-pack must be testable and must not mislead consumers under applicable cosmetics claims rules in the sales market.',
      ),
      faq(
        'Who handles cosmetic labelling for the fragrance extension?',
        'The brand owner. INCI list, allergen disclosure, responsible-party details, PAO or best-before and any market-specific mandatory fields are the brand\'s responsibility. Product-side inputs — IFRA, COA, manufacturing context — are supplied to support label preparation; final label sign-off belongs to the brand.',
      ),
      faq(
        'Does adding a fragrance SKU require expanding the brand\'s Responsible Person scope?',
        'If the brand has an existing UK or EU RP relationship, adding a fragrance SKU may be possible within the existing structure depending on RP service terms and whether the fragrance formula has been separately safety assessed. Confirm this with the brand\'s existing RP or regulatory advisor — do not assume it is automatic.',
      ),
      faq(
        'What documentation do beauty retailers typically request for a new fragrance SKU?',
        'IFRA certificate, COA, INCI and allergen list, responsible-party contact and — for UK or EU retail — a completed safety assessment (CPSR). Some retailers also request PIF access or a supplier questionnaire. Preparing these during specification avoids a first-order delay while documentation is assembled after the buyer meeting.',
      ),
    ],
    faqTitle: 'Beauty brand fragrance questions',
    faqDescription:
      'Answers for skincare, haircare and beauty brands extending into private label perfume — from clean claim positioning to retailer documentation requirements.',
    ctaTitle: 'Add fragrance to your beauty line',
    ctaDescription:
      'Share your product range, customer profile and scent direction. Curated samples and a first production batch can be planned from that brief.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I have a skincare or beauty brand and want to add private label perfume.',
  }),
};
