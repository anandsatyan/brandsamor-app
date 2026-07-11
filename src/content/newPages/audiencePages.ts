import type { TopicPageConfig } from '../../components/topic/types';
import {
  BodyMistIllustration,
  BrandBriefIllustration,
  ComplianceDocIllustration,
  DeliveryIllustration,
  FlatLayIllustration,
  FragranceFamilyIllustration,
  GiftSetIllustration,
  HeroBottleIllustration,
  LabelIllustration,
  LaunchPlanningIllustration,
  MarbleBottleIllustration,
  PackagingIllustration,
  ProcessTimelineIllustration,
  ProductionIllustration,
  QualityCheckIllustration,
  RoomSprayIllustration,
  ScentSamplesIllustration,
} from '../../components/Illustrations';
import type { FaqItem } from '../../seo/siteConfig';
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

const audienceFaqs = ({
  audience,
  product,
  channel,
}: {
  audience: string;
  product: string;
  channel: string;
}): FaqItem[] => [
  faq(
    `Can ${audience} start with 100 units?`,
    `Yes. Brandsamor production MOQ starts at 100 units, so ${audience} can test a focused first batch before committing to a larger line. Sampling comes first, then production is quoted from $10 per unit depending on bottle, format, decoration, packaging and destination.`,
  ),
  faq(
    `What kind of ${product} should we launch first?`,
    `Most ${audience} start with one hero scent in a format that fits ${channel}. Eau de parfum, perfume oils, body mists, room sprays, travel sizes and gift sets can all work when the scent story and packaging match the buyer.`,
  ),
  faq(
    'Do we choose from a scent list?',
    'Brandsamor starts with a short brand and customer brief, then curates five fragrance samples for review. This keeps the process focused and helps your team evaluate scents against your positioning instead of browsing a long unfiltered catalogue.',
  ),
  faq(
    'Can certifications and documents be provided?',
    'Certifications and documentation are available where the project requires them, including IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support. Exact documents depend on formula, production route, sales market and product claims.',
  ),
  faq(
    'How long does production take after approval?',
    'Typical production takes about 3-6 weeks after scent, packaging, artwork and production details are approved. Sampling, artwork revisions, freight, destination compliance checks and final sign-off can add time before or after that production window.',
  ),
];

export const audiencePageConfigs: Record<string, TopicPageConfig> = {
  '/perfume-manufacturer-for-amazon-sellers': buildCommercialPage({
    path: '/perfume-manufacturer-for-amazon-sellers',
    badge: 'AMAZON SELLERS',
    heroDescription:
      'Build a retail-ready perfume line for Amazon without guessing through factory catalogues. Brandsamor coordinates curated samples, compliant-looking packaging, production from 100 units and documentation support so your listing has a real product behind it.',
    eyebrowPrefix: 'AMAZON LAUNCH',
    heroIllustration: PackagingIllustration,
    ctaIllustration: ScentSamplesIllustration,
    keyFacts: {
      title: 'Amazon seller launch facts',
      description:
        'Start with samples, then move into production from 100 units with indicative pricing from $10 per unit. Packaging, documentation and fulfilment planning should be confirmed before listing inventory.',
      facts: defaultKeyFacts({ format: 'EDP, oils, travel sizes', market: 'Amazon and DTC' }),
    },
    answerBlocks: [
      {
        id: 'amazon-fit',
        question: 'What makes perfume suitable for Amazon sellers?',
        answer:
          'Amazon perfume needs more than a bottle and scent. Your product should photograph clearly, explain its format honestly, include compliant label information, ship safely and support repeat reorders. Brandsamor helps sellers turn a fragrance idea into a private label SKU with sampling before production.',
        detail:
          'This page links back to [who we work with](/who-we-work-with) because Amazon sellers are one of several audiences that use private label fragrance to extend an existing customer base.',
      },
      {
        id: 'amazon-first-batch',
        question: 'How should Amazon sellers plan a first perfume batch?',
        answer:
          'A first Amazon batch should focus on one clear customer, one scent direction and packaging that looks strong in thumbnails. Production starts at 100 units, with pricing from $10 per unit depending on the final spec, so sellers can test demand before scaling inventory.',
      },
    ],
    sections: [
      {
        id: 'listing-ready-positioning',
        title: 'Position the fragrance for search and conversion',
        description:
          'Amazon customers compare products quickly, so your first perfume needs a clear promise: scent family, format, size, gifting angle and brand story. Brandsamor helps translate your brief into fragrance samples and packaging choices that support a focused listing instead of a generic private label bottle.',
        bullets: sectionBullets(
          'Define customer, scent family and use occasion before sampling',
          'Choose a bottle size that fits your target price and shipping plan',
          'Use packaging that photographs clearly for marketplace thumbnails',
          'Keep claims realistic and supportable for the formula and channel',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'sample-before-inventory',
        title: 'Sample before buying marketplace inventory',
        description:
          'Fragrance is hard to judge from supplier photos. Brandsamor curates five samples from your brief so you can smell the direction, evaluate drydown and choose a launch scent before committing to bulk production or Amazon stock planning.',
        bullets: sectionBullets(
          'Curated five-scent sample path before production',
          'Evaluate scent on blotter and skin before selecting the hero SKU',
          'Use sample feedback to refine product page language',
          'Move to production only after scent and packaging decisions are clear',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'packaging-for-online-retail',
        title: 'Packaging built for online retail reality',
        description:
          'Amazon packaging must look premium but still survive pick, pack and delivery. Bottle, cap, label, carton and insert choices should support photos, unboxing, storage and safe transit rather than only looking good in a supplier catalogue.',
        bullets: sectionBullets(
          'Select bottles and cartons that balance shelf appeal with transit needs',
          'Plan label hierarchy for small mobile images',
          'Include box or insert choices that reduce damage risk',
          'Confirm barcode, net quantity and responsible-party space early',
        ),
        Illustration: FlatLayIllustration,
      },
      {
        id: 'documentation-and-compliance',
        title: 'Documentation for marketplace confidence',
        description:
          'Amazon sellers may need documents for internal records, retail partners or marketplace review depending on product type and claims. Certifications are available where applicable, including IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support.',
        bullets: sectionBullets(
          'Request relevant fragrance and batch documents during specification',
          'Avoid unsupported therapeutic or medical claims in listings',
          'Review destination and marketplace rules before inventory purchase',
          'Keep label text aligned with the formula and product format',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'reorder-path',
        title: 'Plan reorders before stock runs out',
        description:
          'A launch batch is only useful if the next order can follow. Brandsamor coordinates production details, packaging decisions and quality checks so sellers can learn from customer response and reorder with clearer demand signals.',
        bullets: sectionBullets(
          'Track sell-through before adding more scent variants',
          'Keep approved packaging and artwork files organized',
          'Use reviews and return reasons to improve future batches',
          'Plan production lead time before inventory reaches zero',
        ),
        Illustration: ProductionIllustration,
      },
    ],
    faqItems: [
      ...audienceFaqs({
        audience: 'Amazon sellers',
        product: 'perfume SKU',
        channel: 'Amazon search, ads and brand store merchandising',
      }),
      faq(
        'Does Brandsamor prepare Amazon listings?',
        'Brandsamor focuses on fragrance sampling, packaging, production coordination and documentation support. Your team remains responsible for Amazon account setup, listing copy, images, advertising, fulfilment method, marketplace compliance and final claims review.',
      ),
    ],
    faqTitle: 'Amazon perfume manufacturing questions',
    faqDescription:
      'Answers for Amazon sellers planning a private label fragrance SKU with low MOQ production and sample-first decision making.',
    ctaTitle: 'Plan your Amazon-ready perfume SKU',
    ctaDescription:
      'Share your customer, target price, fulfilment model and launch goal. Brandsamor will help you start with curated samples, then plan packaging and production from 100 units.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I sell on Amazon and want to plan a private label perfume SKU.',
  }),

  '/perfume-line-for-influencers-creators': buildCommercialPage({
    path: '/perfume-line-for-influencers-creators',
    badge: 'CREATORS',
    heroDescription:
      'Turn an audience into a fragrance product they can wear, gift and remember. Brandsamor helps influencers and creators launch private label perfume with curated samples, branded packaging, MOQ from 100 units and pricing from $10 per unit.',
    eyebrowPrefix: 'CREATOR LINE',
    heroIllustration: HeroBottleIllustration,
    ctaIllustration: BrandBriefIllustration,
    keyFacts: {
      title: 'Creator launch facts',
      description:
        'A creator fragrance should feel personal, but production still needs practical specs, documentation and repeatable quality. Start with samples, then approve the scent and packaging before your first 100-unit batch.',
      facts: defaultKeyFacts({ format: 'EDP, oils, mists, gift sets', market: 'Creator commerce' }),
    },
    answerBlocks: [
      {
        id: 'creator-fit',
        question: 'Can influencers launch a perfume line without a factory?',
        answer:
          'Yes. Influencers and creators can launch private label perfume without owning a factory by working through Brandsamor. The process starts with a brand brief, continues through five curated samples, then moves into packaging, production and quality checks for a first batch from 100 units.',
        detail:
          'Creators are one audience in the broader [who we work with](/who-we-work-with) group, alongside boutiques, hotels, salons, beauty brands and gifting teams.',
      },
      {
        id: 'audience-match',
        question: 'How do creator fragrances avoid feeling generic?',
        answer:
          'A creator fragrance feels specific when the scent family, name, packaging and launch story all connect to the audience. Brandsamor uses your content style, customer profile and price point to curate fragrance samples instead of forcing a one-size-fits-all stock perfume.',
      },
    ],
    sections: [
      {
        id: 'translate-personal-brand',
        title: 'Translate your personal brand into scent',
        description:
          'Your audience already knows your tone, visuals and point of view. The fragrance should extend that world through scent notes, bottle mood, box design and product naming that feel credible for your creator brand.',
        bullets: sectionBullets(
          'Define the audience mood before choosing fragrance families',
          'Connect scent direction to your content, values and style',
          'Choose packaging that feels like merchandise, not a giveaway',
          'Keep the first line focused so launch messaging stays clear',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'sample-with-small-circle',
        title: 'Use samples to test the story privately',
        description:
          'Before public launch, curated samples let you compare scent directions with a small trusted circle. This helps you avoid overpromising a fragrance your audience has never smelled and gives you language for launch content.',
        bullets: sectionBullets(
          'Receive five curated fragrances from your creator brief',
          'Evaluate wear, drydown and feedback before production',
          'Build launch content around the selected scent story',
          'Approve the hero scent before packaging is locked',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'packaging-for-fans',
        title: 'Create packaging fans want to keep',
        description:
          'Creator products often succeed when they feel collectible and giftable. Brandsamor coordinates bottle, cap, label, carton and optional gift packaging so the perfume feels aligned with your audience and retail price.',
        bullets: sectionBullets(
          'Match bottle and box choices to your visual identity',
          'Plan unboxing moments for launch content',
          'Use travel sizes or gift sets where they fit the audience',
          'Keep decoration choices realistic for a first 100-unit batch',
        ),
        Illustration: GiftSetIllustration,
      },
      {
        id: 'launch-calendar',
        title: 'Build around a realistic launch calendar',
        description:
          'Creator launches need content timing, preorder decisions, fulfilment planning and production sign-off. Typical production is 3-6 weeks after approvals, so your content calendar should account for sampling and packaging decisions first.',
        bullets: sectionBullets(
          'Work backward from campaign date, not only production date',
          'Leave time for sample review and artwork changes',
          'Confirm fulfilment and customer service responsibilities',
          'Use a first batch to learn before expanding variants',
        ),
        Illustration: ProcessTimelineIllustration,
      },
      {
        id: 'responsible-claims',
        title: 'Keep claims and documents launch-safe',
        description:
          'Fragrance can be emotional without making unsupported claims. Brandsamor can support applicable certifications and documents, while your team remains responsible for final marketing claims, labels and destination-market compliance.',
        bullets: sectionBullets(
          'Use scent and mood language without medical or therapeutic claims',
          'Request IFRA, COA, GMP, ISO 22716 or halal support when needed',
          'Review ingredient and label wording for your sales market',
          'Keep final approvals documented before production release',
        ),
        Illustration: ComplianceDocIllustration,
      },
    ],
    faqItems: audienceFaqs({
      audience: 'creators and influencers',
      product: 'signature fragrance',
      channel: 'creator shops, drops, events and social commerce',
    }),
    faqTitle: 'Creator perfume line questions',
    faqDescription:
      'Answers for creators planning a branded fragrance launch with sample-first development and a practical low-MOQ first batch.',
    ctaTitle: 'Create your signature fragrance brief',
    ctaDescription:
      'Tell us about your audience, visual world and launch goal. Brandsamor will curate five samples and help you turn the winning direction into a sellable perfume.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I am a creator and want to launch a private label perfume line.',
  }),

  '/private-label-perfume-for-boutiques': buildCommercialPage({
    path: '/private-label-perfume-for-boutiques',
    badge: 'BOUTIQUES',
    heroDescription:
      'Add a boutique-exclusive perfume that feels giftable, display-ready and aligned with your shop. Brandsamor supports curated scent sampling, packaging, production from 100 units and documentation for retail-minded private label fragrance.',
    eyebrowPrefix: 'BOUTIQUE RETAIL',
    heroIllustration: FlatLayIllustration,
    ctaIllustration: PackagingIllustration,
    keyFacts: {
      title: 'Boutique launch facts',
      description:
        'Boutiques can start with one hero scent and a 100-unit production batch. Indicative pricing starts from $10 per unit, with final cost shaped by bottle, box, decoration and quantity.',
      facts: defaultKeyFacts({ format: 'EDP, oils, travel, gift sets', market: 'Boutique retail' }),
    },
    answerBlocks: [
      {
        id: 'boutique-fit',
        question: 'Why do boutiques add private label perfume?',
        answer:
          'Boutiques add private label perfume because fragrance is giftable, compact, repeatable and emotionally connected to the shop experience. A focused scent line can complement apparel, accessories, home goods or beauty products without requiring the boutique to build production capacity.',
        detail:
          'Boutiques are a core audience on the broader [who we work with](/who-we-work-with) page because private label fragrance fits stores with a clear customer and curated point of view.',
      },
      {
        id: 'boutique-moq',
        question: 'Can a small boutique afford a first perfume run?',
        answer:
          'A boutique can start with production from 100 units after sampling. Indicative pricing begins from $10 per unit depending on the specification, so a first batch can test sell-through, gifting demand and customer response before adding scents or larger quantities.',
      },
    ],
    sections: [
      {
        id: 'retail-assortment-fit',
        title: 'Fit the fragrance into your retail assortment',
        description:
          'A boutique perfume should feel like it belongs beside your existing products. Brandsamor helps define the customer, scent family, bottle style and price point before samples are curated, so the final product supports your merchandising story.',
        bullets: sectionBullets(
          'Match scent direction to your store aesthetic and shopper',
          'Choose a retail price that fits nearby categories',
          'Start with one scent instead of a scattered collection',
          'Plan display, gifting and online merchandising together',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'giftable-packaging',
        title: 'Make packaging work on the shelf and in a gift bag',
        description:
          'Boutique fragrance needs to attract browsers, photograph well for social posts and feel ready to gift. Bottle, label, cap and carton decisions should support the store environment as much as the scent itself.',
        bullets: sectionBullets(
          'Use cartons or sleeves for clean shelf presentation',
          'Keep label hierarchy readable in small retail displays',
          'Consider gift sets when your customers buy for occasions',
          'Align colors and finish with your boutique identity',
        ),
        Illustration: GiftSetIllustration,
      },
      {
        id: 'sampling-for-merchants',
        title: 'Evaluate scents like a merchant',
        description:
          'Sampling helps boutique teams compare fragrance options against customer taste, not personal preference alone. Staff can smell the five curated samples, identify the most commercial fit and prepare talking points for the sales floor.',
        bullets: sectionBullets(
          'Test samples with staff who know your customers',
          'Compare opening, drydown and giftability',
          'Choose a scent that is distinctive but easy to explain',
          'Use sample notes to train sales associates',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'quality-for-repeat-sales',
        title: 'Support repeat sales with consistent specs',
        description:
          'Retail success depends on a product customers can return for. Brandsamor coordinates production details, quality checks and available documentation so your boutique can treat fragrance as a real line, not a one-off novelty.',
        bullets: sectionBullets(
          'Approve a production sample before bulk filling',
          'Document bottle, cap, fragrance and packaging choices',
          'Use quality checks for fill, spray, label and carton condition',
          'Plan reorder timing around seasonal retail peaks',
        ),
        Illustration: QualityCheckIllustration,
      },
      {
        id: 'expand-carefully',
        title: 'Expand after the first scent proves demand',
        description:
          'The strongest boutique lines often begin with a hero product. Once customers respond, you can explore travel sizes, perfume oils, seasonal scents or gift sets with better data from your own store.',
        bullets: sectionBullets(
          'Track sell-through and customer comments after launch',
          'Use gift seasons to test sets or limited packaging',
          'Add variants only when the hero scent has traction',
          'Keep the brand story consistent across future batches',
        ),
        Illustration: ProductionIllustration,
      },
    ],
    faqItems: audienceFaqs({
      audience: 'boutiques',
      product: 'boutique perfume',
      channel: 'in-store retail, online shops and gift merchandising',
    }),
    faqTitle: 'Boutique private label perfume questions',
    faqDescription:
      'Answers for boutique owners evaluating private label perfume as a retail, gifting or online product extension.',
    ctaTitle: 'Plan a boutique-exclusive fragrance',
    ctaDescription:
      'Share your store concept, customer and target retail price. Brandsamor will help you sample scent directions and plan a first batch from 100 units.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I own a boutique and want to create a private label perfume.',
  }),

  '/hotel-signature-scent-manufacturer': buildCommercialPage({
    path: '/hotel-signature-scent-manufacturer',
    badge: 'HOSPITALITY',
    heroDescription:
      'Create a signature hotel scent guests can remember, buy and take home. Brandsamor supports hospitality fragrance products for retail, gifting and amenities with curated sampling, packaging coordination and production from 100 units.',
    eyebrowPrefix: 'HOTEL SCENT',
    heroIllustration: RoomSprayIllustration,
    ctaIllustration: BrandBriefIllustration,
    keyFacts: {
      title: 'Hospitality launch facts',
      description:
        'Hotel fragrance projects can begin with samples and move into production from 100 units. Unit pricing starts from $10 depending on format, bottle, packaging and quantity.',
      facts: defaultKeyFacts({ format: 'EDP, room spray, travel', market: 'Hotels and resorts' }),
    },
    answerBlocks: [
      {
        id: 'hotel-fit',
        question: 'What is a hotel signature scent product?',
        answer:
          'A hotel signature scent product is a branded fragrance, room spray or gift format that lets guests take the property experience home. It can support retail, amenities, VIP gifting or spa sales when the scent and packaging reflect the property identity.',
        detail:
          'Hotels and hospitality teams are included on [who we work with](/who-we-work-with) because scent can extend the memory of a stay into a tangible branded product.',
      },
      {
        id: 'hotel-use-cases',
        question: 'Where can hotels use private label fragrance?',
        answer:
          'Hotels can use private label fragrance in gift shops, minibar programs, spa retail, VIP welcome gifts, event gifting and branded room sprays. Brandsamor helps select formats that match the property, audience and operational plan instead of assuming every hotel needs the same product.',
      },
    ],
    sections: [
      {
        id: 'property-story',
        title: 'Capture the property story in scent',
        description:
          'A hotel fragrance should express place, service style and guest memory. Brandsamor uses your property brief to curate scent directions that fit the mood of the lobby, spa, rooms or retail environment.',
        bullets: sectionBullets(
          'Translate location, materials and mood into scent direction',
          'Choose fragrance families that fit the guest profile',
          'Avoid overpowering notes for hospitality contexts',
          'Keep the retail product aligned with the on-property experience',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'product-formats',
        title: 'Choose formats for retail, rooms or gifts',
        description:
          'A hotel may need wearable perfume, room spray, travel sizes or gift packaging. The right format depends on where guests encounter the product and whether the goal is revenue, recognition or appreciation.',
        bullets: sectionBullets(
          'Eau de parfum for gift shop and spa retail',
          'Room spray for atmosphere and take-home memory',
          'Travel sizes for amenities, events and VIP stays',
          'Gift sets for premium rooms, weddings and corporate bookings',
        ),
        Illustration: GiftSetIllustration,
      },
      {
        id: 'hospitality-packaging',
        title: 'Package for a premium hospitality experience',
        description:
          'Hotel fragrance packaging should feel like part of the property. Brandsamor coordinates bottle, label, box and insert options so the finished product can sit in a boutique, spa or guest room without feeling generic.',
        bullets: sectionBullets(
          'Use brand colors, typography and property cues carefully',
          'Consider gift-ready cartons for front-desk and spa sales',
          'Plan compact formats for luggage and travel retail',
          'Keep labels clear for destination-market requirements',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'operations-and-reorders',
        title: 'Plan for hotel operations and reorders',
        description:
          'Hospitality teams need predictable lead times, reorder planning and internal ownership. Typical production takes 3-6 weeks after approvals, so inventory planning should account for seasons, events and guest occupancy.',
        bullets: sectionBullets(
          'Assign one decision owner for scent and packaging approvals',
          'Plan quantities around retail, amenities and gifting separately',
          'Track consumption by use case before scaling',
          'Keep reorder specs consistent for future batches',
        ),
        Illustration: DeliveryIllustration,
      },
      {
        id: 'documents-and-claims',
        title: 'Keep hospitality claims and documents grounded',
        description:
          'Whether the fragrance is sold or gifted, labels and claims need to match the product. Certifications and documentation are available where applicable, including IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support.',
        bullets: sectionBullets(
          'Review market rules for retail versus amenity use',
          'Use accurate product identity and net quantity information',
          'Request relevant certificates during the specification stage',
          'Avoid wellness or therapeutic claims unless properly supported',
        ),
        Illustration: ComplianceDocIllustration,
      },
    ],
    faqItems: audienceFaqs({
      audience: 'hotels and resorts',
      product: 'signature scent product',
      channel: 'gift shops, spa retail, guest amenities and VIP gifting',
    }),
    faqTitle: 'Hotel signature scent questions',
    faqDescription:
      'Answers for hotels, resorts and hospitality teams considering a branded fragrance product or room scent line.',
    ctaTitle: 'Build a hotel scent guests remember',
    ctaDescription:
      'Share your property concept, guest profile and product use case. Brandsamor will curate scent samples and help you plan a retail or gifting batch from 100 units.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I want to create a hotel signature scent product.',
  }),

  '/salon-spa-private-label-fragrance': buildCommercialPage({
    path: '/salon-spa-private-label-fragrance',
    badge: 'SALONS & SPAS',
    heroDescription:
      'Extend the salon or spa experience with a branded fragrance clients can take home. Brandsamor helps wellness and beauty service businesses launch private label perfume, body mist or room spray from 100 units.',
    eyebrowPrefix: 'SALON & SPA',
    heroIllustration: MarbleBottleIllustration,
    ctaIllustration: ScentSamplesIllustration,
    keyFacts: {
      title: 'Salon and spa launch facts',
      description:
        'Service businesses can start with curated samples and a first production batch from 100 units. Pricing starts from $10 per unit depending on product format, bottle and packaging choices.',
      facts: defaultKeyFacts({ format: 'EDP, mist, oil, room spray', market: 'Salon and spa retail' }),
    },
    answerBlocks: [
      {
        id: 'salon-spa-fit',
        question: 'Why do salons and spas launch private label fragrance?',
        answer:
          'Salons and spas launch private label fragrance to let clients continue the service experience at home. A branded perfume, mist or room spray can support retail sales, client gifting, treatment-room memory and repeat engagement without adding in-house manufacturing.',
        detail:
          'Salons and spas are part of the broader [who we work with](/who-we-work-with) audience because fragrance naturally connects to beauty, wellness and client experience.',
      },
      {
        id: 'wellness-product-choice',
        question: 'Which fragrance formats fit salons and spas?',
        answer:
          'Eau de parfum works for premium retail, body mist can fit lighter wellness positioning, perfume oils can feel intimate and room sprays can extend treatment-room atmosphere. Brandsamor helps choose formats based on client profile, price point and sales environment.',
      },
    ],
    sections: [
      {
        id: 'service-experience',
        title: 'Turn the service atmosphere into a product',
        description:
          'Clients remember scent from a treatment room, reception area or styling experience. A private label fragrance gives that memory a product form they can buy, gift or use between visits.',
        bullets: sectionBullets(
          'Define the feeling clients associate with your space',
          'Choose calming, polished or expressive scent directions intentionally',
          'Connect the fragrance to treatments, retail shelves or memberships',
          'Avoid generic spa notes when your brand has a clearer identity',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'format-and-price',
        title: 'Select a format that fits your service menu',
        description:
          'A high-end spa may prefer eau de parfum or oils, while a salon may sell body mists or travel sizes near checkout. Brandsamor helps align format, packaging and retail price before production.',
        bullets: sectionBullets(
          'Eau de parfum for premium take-home retail',
          'Body mist for lighter everyday use and accessible gifting',
          'Perfume oil for intimate or ritual-style positioning',
          'Room spray for treatment rooms, reception and home atmosphere',
        ),
        Illustration: BodyMistIllustration,
      },
      {
        id: 'sample-with-team',
        title: 'Sample with the team that knows your clients',
        description:
          'Your stylists, therapists or retail staff often know what clients ask for. Use the five curated samples to choose a scent that staff can confidently explain and recommend after services.',
        bullets: sectionBullets(
          'Compare samples with the customer profile in mind',
          'Listen for staff language that makes the scent easy to sell',
          'Choose a hero scent before adding seasonal products',
          'Use sample feedback to plan merchandising and scripts',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'retail-merchandising',
        title: 'Merchandise fragrance at the right client moment',
        description:
          'Salon and spa fragrance sells best when clients understand why it belongs with the service. Packaging, display and staff education should make the product feel like a natural extension rather than a random retail add-on.',
        bullets: sectionBullets(
          'Place fragrance near checkout, treatment rooms or gift displays',
          'Use testers and blotters where appropriate',
          'Build gift bundles around services or memberships',
          'Keep packaging aligned with towels, robes, skincare or salon branding',
        ),
        Illustration: FlatLayIllustration,
      },
      {
        id: 'documents-and-quality',
        title: 'Support the product with quality checks and documents',
        description:
          'Beauty service brands need client trust. Brandsamor coordinates production sample approval, filling checks and available documentation such as IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support where relevant.',
        bullets: sectionBullets(
          'Approve scent, bottle, label and box before bulk production',
          'Review labels against formula, claims and destination market',
          'Keep documents available for retail or wholesale conversations',
          'Plan reorders around busy seasons and appointment peaks',
        ),
        Illustration: QualityCheckIllustration,
      },
    ],
    faqItems: audienceFaqs({
      audience: 'salons and spas',
      product: 'private label fragrance',
      channel: 'spa retail, salon checkout, treatment rooms and client gifting',
    }),
    faqTitle: 'Salon and spa fragrance questions',
    faqDescription:
      'Answers for salons, spas and wellness studios adding branded fragrance to retail shelves or client gifting.',
    ctaTitle: 'Create a fragrance clients take home',
    ctaDescription:
      'Tell us about your service experience, client profile and retail price point. Brandsamor will curate samples and help plan a first batch from 100 units.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I run a salon or spa and want a private label fragrance.',
  }),

  '/corporate-gifting-perfume-supplier': buildCommercialPage({
    path: '/corporate-gifting-perfume-supplier',
    badge: 'CORPORATE GIFTS',
    heroDescription:
      'Create branded perfume gifts for clients, events, employees and partners. Brandsamor coordinates fragrance sampling, gift-ready packaging, production from 100 units and documentation support for corporate gifting programs.',
    eyebrowPrefix: 'GIFT PROGRAM',
    heroIllustration: GiftSetIllustration,
    ctaIllustration: DeliveryIllustration,
    keyFacts: {
      title: 'Corporate gifting facts',
      description:
        'Corporate perfume gifting can begin with samples and move into production from 100 units. Pricing starts from $10 per unit, with final cost driven by format, gift packaging, decoration and quantity.',
      facts: defaultKeyFacts({ format: 'EDP, travel, gift sets', market: 'Corporate gifting' }),
    },
    answerBlocks: [
      {
        id: 'gifting-fit',
        question: 'Why use perfume for corporate gifting?',
        answer:
          'Perfume works for corporate gifting when the goal is a premium, personal and memorable branded product. It can suit client appreciation, employee rewards, event gifts or partnership launches when scent, packaging and message are chosen with the recipient in mind.',
        detail:
          'Corporate gifting teams are included on [who we work with](/who-we-work-with) because private label fragrance can become a polished B2B gift without requiring in-house production.',
      },
      {
        id: 'gifting-moq',
        question: 'What is the minimum order for corporate perfume gifts?',
        answer:
          'Production starts at 100 units after sampling and approval. Pricing begins from $10 per unit depending on bottle, format, decoration, carton, gift packaging and destination, so teams can build a premium gift program without starting with thousands of pieces.',
      },
    ],
    sections: [
      {
        id: 'recipient-first-brief',
        title: 'Start with the recipient, not the logo',
        description:
          'A strong corporate perfume gift feels considered rather than promotional. Brandsamor helps define who receives the gift, the occasion, the tone and the practical delivery needs before fragrance and packaging choices are made.',
        bullets: sectionBullets(
          'Define client, employee, event or partner recipient groups',
          'Choose scent direction that is broadly wearable and giftable',
          'Avoid over-branding when premium perception matters',
          'Match the product to the occasion and budget',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'gift-packaging',
        title: 'Build gift-ready packaging from the start',
        description:
          'Corporate gifts often need boxes, inserts, sleeves, note cards or event-ready presentation. Packaging should protect the bottle, communicate the occasion and feel intentional when opened.',
        bullets: sectionBullets(
          'Use cartons, rigid boxes or sets where the budget supports them',
          'Plan branded inserts or message cards early',
          'Keep recipient unboxing and safe delivery in mind',
          'Confirm artwork approvals before production release',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'sample-for-stakeholders',
        title: 'Sample before stakeholder approval',
        description:
          'Corporate gifting usually involves multiple decision makers. A curated five-scent sample path gives procurement, marketing and leadership something real to evaluate before final artwork, quantities and production are approved.',
        bullets: sectionBullets(
          'Use samples to align stakeholders on scent direction',
          'Choose broadly appealing fragrance for mixed recipient groups',
          'Confirm packaging materials alongside scent approval',
          'Document the approved spec before purchase order release',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'timelines-and-logistics',
        title: 'Plan timelines around event dates',
        description:
          'Perfume gifts need sampling, approvals, production and delivery timing. Typical production is 3-6 weeks after all details are approved, so event programs should build in buffer for stakeholder review and freight.',
        bullets: sectionBullets(
          'Work backward from the in-hand event or gifting date',
          'Leave time for artwork, sample and packaging approval',
          'Confirm shipping responsibilities and destination requirements',
          'Consider staggered delivery needs for multiple offices',
        ),
        Illustration: ProcessTimelineIllustration,
      },
      {
        id: 'documents-and-restrictions',
        title: 'Confirm documents and recipient-market restrictions',
        description:
          'Corporate gifts can cross borders or enter regulated workplaces. Certifications and documentation are available where applicable, including IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support, but your team should confirm internal gift policies and destination rules.',
        bullets: sectionBullets(
          'Check corporate gifting policies before finalizing value and format',
          'Review destination rules for alcohol-based fragrance where relevant',
          'Request project documents during specification',
          'Keep claims simple, accurate and suitable for broad recipients',
        ),
        Illustration: ComplianceDocIllustration,
      },
    ],
    faqItems: [
      ...audienceFaqs({
        audience: 'corporate gifting teams',
        product: 'branded perfume gift',
        channel: 'events, employee rewards, client gifts and partner programs',
      }),
      faq(
        'Can you ship gifts directly to every recipient?',
        'Brandsamor coordinates production and packing for the project, but delivery model depends on destination, quantity, packaging and agreed logistics. Direct-to-recipient shipping, bulk delivery or staged delivery should be discussed early so responsibilities and costs are clear.',
      ),
    ],
    faqTitle: 'Corporate perfume gifting questions',
    faqDescription:
      'Answers for marketing, procurement and event teams planning branded perfume gifts with realistic timelines and low MOQ production.',
    ctaTitle: 'Plan a premium perfume gift program',
    ctaDescription:
      'Share your recipient group, deadline, budget and packaging needs. Brandsamor will help you sample fragrance options and plan production from 100 units.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I need branded perfume for a corporate gifting program.',
  }),

  '/private-label-perfume-for-fashion-brands': buildCommercialPage({
    path: '/private-label-perfume-for-fashion-brands',
    badge: 'FASHION BRANDS',
    heroDescription:
      'Extend apparel, accessories or lifestyle collections into fragrance with a product that matches your aesthetic. Brandsamor helps fashion brands sample scents, coordinate packaging and produce private label perfume from 100 units.',
    eyebrowPrefix: 'FASHION EXTENSION',
    heroIllustration: LabelIllustration,
    ctaIllustration: HeroBottleIllustration,
    keyFacts: {
      title: 'Fashion fragrance facts',
      description:
        'Fashion brands can start with one scent that reflects the collection world. Production MOQ starts at 100 units, with indicative pricing from $10 per unit depending on format and packaging.',
      facts: defaultKeyFacts({ format: 'EDP, travel, gift sets', market: 'Fashion and lifestyle' }),
    },
    answerBlocks: [
      {
        id: 'fashion-fit',
        question: 'Why should a fashion brand launch perfume?',
        answer:
          'A fashion brand can use perfume to turn visual identity into a wearable sensory product. Fragrance supports gifting, repeat purchase and brand memory, while private label production lets the brand launch without building fragrance manufacturing inside the apparel business.',
        detail:
          'Fashion brands sit within the broader [who we work with](/who-we-work-with) audience because fragrance often works best when a brand already has a recognizable style and customer.',
      },
      {
        id: 'fashion-first-scent',
        question: 'How should fashion brands choose a first scent?',
        answer:
          'The first scent should match the brand world more than a founder preference alone. Brandsamor uses your customer, collection mood, price point and visual direction to curate five samples, then helps translate the selected scent into bottle and packaging choices.',
      },
    ],
    sections: [
      {
        id: 'brand-aesthetic',
        title: 'Translate your aesthetic into fragrance',
        description:
          'Fashion customers buy into a world. The perfume should express that same world through scent family, name, bottle silhouette, label hierarchy and packaging finish.',
        bullets: sectionBullets(
          'Use collection mood, materials and customer lifestyle as inputs',
          'Choose scent families that match your brand attitude',
          'Avoid a generic trend scent if it conflicts with the brand',
          'Treat fragrance as part of the line, not a separate novelty',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'packaging-as-accessory',
        title: 'Design packaging like an accessory',
        description:
          'For fashion brands, bottle and box choices carry as much meaning as scent. Brandsamor coordinates components and decoration so the finished product feels visually coherent with apparel, accessories and retail displays.',
        bullets: sectionBullets(
          'Match cap, label and carton decisions to brand codes',
          'Plan product photography alongside packaging direction',
          'Use gift-ready details for drops, bundles or seasonal campaigns',
          'Keep decoration choices practical for MOQ and price point',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'drop-strategy',
        title: 'Use fragrance for drops and seasonality',
        description:
          'A first perfume can launch as a permanent hero product, capsule drop or event gift. Production from 100 units lets fashion brands test response before planning a larger fragrance wardrobe.',
        bullets: sectionBullets(
          'Launch one hero scent with a clear campaign story',
          'Use limited packaging when it supports the collection',
          'Bundle fragrance with apparel or accessories where appropriate',
          'Review customer response before expanding into flankers',
        ),
        Illustration: LaunchPlanningIllustration,
      },
      {
        id: 'sampling-with-brand-team',
        title: 'Sample with brand and merchandising teams',
        description:
          'A fashion perfume should work for the customer and commercial plan. Sampling lets creative, merchandising and retail teams compare directions before production specs are finalized.',
        bullets: sectionBullets(
          'Review five curated samples against the customer profile',
          'Compare scent strength, drydown and giftability',
          'Align naming and packaging after the scent direction is chosen',
          'Use team feedback to avoid overly niche first launches',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'quality-and-compliance',
        title: 'Keep the fashion launch production-ready',
        description:
          'A polished campaign needs a product that can be made consistently. Brandsamor coordinates production sample approval, quality checks and available certifications such as IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support where relevant.',
        bullets: sectionBullets(
          'Confirm formula, bottle, decoration and carton before launch assets',
          'Review labels and claims before production release',
          'Keep documents available for wholesale or retail partners',
          'Plan reorder timing before seasonal demand peaks',
        ),
        Illustration: QualityCheckIllustration,
      },
    ],
    faqItems: audienceFaqs({
      audience: 'fashion brands',
      product: 'fashion fragrance',
      channel: 'DTC drops, retail stores, wholesale and seasonal campaigns',
    }),
    faqTitle: 'Fashion brand perfume questions',
    faqDescription:
      'Answers for fashion, apparel and accessories brands adding fragrance as a private label product extension.',
    ctaTitle: 'Extend your fashion brand into scent',
    ctaDescription:
      'Share your aesthetic, audience and launch model. Brandsamor will curate fragrance samples and help plan packaging and production from 100 units.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I have a fashion brand and want to launch private label perfume.',
  }),

  '/private-label-perfume-for-skincare-beauty-brands': buildCommercialPage({
    path: '/private-label-perfume-for-skincare-beauty-brands',
    badge: 'BEAUTY BRANDS',
    heroDescription:
      'Add a fragrance line that feels coherent with your skincare, haircare or beauty brand. Brandsamor supports sample-first private label perfume, packaging coordination, production from 100 units and available certification pathways.',
    eyebrowPrefix: 'BEAUTY EXTENSION',
    heroIllustration: FragranceFamilyIllustration,
    ctaIllustration: ScentSamplesIllustration,
    keyFacts: {
      title: 'Beauty brand launch facts',
      description:
        'Beauty brands can extend into fragrance with curated samples and production from 100 units. Indicative pricing starts from $10 per unit, with final cost based on format, bottle and packaging.',
      facts: defaultKeyFacts({ format: 'EDP, body mist, oil', market: 'Beauty and skincare' }),
    },
    answerBlocks: [
      {
        id: 'beauty-fit',
        question: 'Why should skincare and beauty brands add perfume?',
        answer:
          'Skincare and beauty brands add perfume to extend an existing scent world into a wearable product. A private label fragrance can increase basket size, create giftable bundles and deepen brand memory while keeping production, filling and packaging coordination outside the internal team.',
        detail:
          'Beauty and skincare brands are a major audience on [who we work with](/who-we-work-with) because fragrance naturally connects to routine, identity and repeat purchase.',
      },
      {
        id: 'beauty-claims',
        question: 'How can beauty brands keep fragrance claims compliant?',
        answer:
          'Beauty brands should keep fragrance claims tied to scent, format and cosmetic use unless stronger claims are properly reviewed. Brandsamor can support applicable documents, but the brand owner remains responsible for final labelling, marketing language and market compliance.',
      },
    ],
    sections: [
      {
        id: 'extend-scent-world',
        title: 'Extend your existing scent world',
        description:
          'If customers already associate your brand with a texture, ingredient story or aromatic profile, fragrance can make that world wearable. Brandsamor helps translate your brand cues into curated samples for a private label launch.',
        bullets: sectionBullets(
          'Use existing product scent cues without copying unsupported claims',
          'Choose a fragrance family that matches your routine positioning',
          'Decide whether perfume should be clean, sensual, fresh or ritual-led',
          'Keep the first scent aligned with the brand customers already know',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'choose-beauty-format',
        title: 'Choose a format that fits the beauty routine',
        description:
          'Beauty brands can choose eau de parfum for premium positioning, body mist for accessible everyday use, perfume oil for intimate ritual or travel formats for discovery sets and gifting.',
        bullets: sectionBullets(
          'Eau de parfum for premium fragrance extensions',
          'Body mist for lighter daily routines and layering',
          'Perfume oil for concentrated ritual positioning',
          'Travel sizes for discovery, sets and checkout add-ons',
        ),
        Illustration: BodyMistIllustration,
      },
      {
        id: 'packaging-coherence',
        title: 'Make packaging feel native to your line',
        description:
          'The bottle and carton should sit naturally beside skincare jars, haircare bottles or cosmetics. Brandsamor coordinates components, labels and decoration so fragrance feels like part of the beauty system.',
        bullets: sectionBullets(
          'Match label language, color and finish to existing products',
          'Plan cartons or inserts for gift sets and bundles',
          'Keep ingredient and net quantity space clear on labels',
          'Use premium touches only where they support the retail price',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'sample-for-customer-fit',
        title: 'Sample for customer fit, not only founder taste',
        description:
          'Beauty customers may expect your fragrance to match the sensorial promise of your products. The curated sample path helps your team compare five directions against customer expectations and brand positioning.',
        bullets: sectionBullets(
          'Evaluate opening, drydown and layering potential',
          'Compare scent choices with customer reviews and product rituals',
          'Use the sample stage before committing to packaging',
          'Select a hero scent before building a broader collection',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'documentation-for-beauty',
        title: 'Prepare documentation for beauty retail',
        description:
          'Beauty brands often sell through channels that ask for documentation. Certifications and support are available where applicable, including IFRA, GMP, ISO 22716, COA, MoCRA support and halal certification support, depending on formula, market and claims.',
        bullets: sectionBullets(
          'Request relevant documents during specification',
          'Review cosmetic label requirements for target markets',
          'Keep fragrance claims separate from skincare performance claims',
          'Approve production samples before launch photography and stock',
        ),
        Illustration: ComplianceDocIllustration,
      },
    ],
    faqItems: audienceFaqs({
      audience: 'skincare and beauty brands',
      product: 'beauty fragrance extension',
      channel: 'DTC stores, beauty retail, bundles and gifting',
    }),
    faqTitle: 'Beauty brand fragrance questions',
    faqDescription:
      'Answers for skincare, haircare and beauty brands extending into private label perfume or body fragrance.',
    ctaTitle: 'Add fragrance to your beauty line',
    ctaDescription:
      'Share your product range, customer and scent direction. Brandsamor will curate samples and help plan a first production batch from 100 units.',
    relatedLinks: audienceLinks,
    whatsappPrefill: 'I have a skincare or beauty brand and want to add private label perfume.',
  }),
};
