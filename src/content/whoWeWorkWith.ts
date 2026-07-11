import type { TopicPageConfig } from '../components/topic/types';
import {
  BodyMistIllustration,
  BrandBriefIllustration,
  DeliveryIllustration,
  FlatLayIllustration,
  FragranceFamilyIllustration,
  GiftSetIllustration,
  HeroBottleIllustration,
  MarbleBottleIllustration,
  PackagingIllustration,
  ProductionIllustration,
  RoomSprayIllustration,
} from '../components/Illustrations';
import { COMMERCIAL_COPY } from '../seo/businessFacts';
import { WHO_WE_WORK_WITH_FAQ_ITEMS } from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/who-we-work-with');

export const whoWeWorkWithConfig: TopicPageConfig = {
  seo: pageMeta.seo,
  hero: {
    badge: 'WHO WE WORK WITH',
    title: pageMeta.h1,
    description:
      'Ready to create your own perfume brand? Brandsamor helps boutiques, creators, salons, beauty brands, hotels and gifting companies launch private label fragrance without building production in-house. ' +
      COMMERCIAL_COPY.suitabilityNote,
    Illustration: HeroBottleIllustration,
  },
  sections: withSteps(
    [
      {
        id: 'creators-influencers',
        title: 'Private label perfume for creators and influencers',
        description:
          'A signature perfume gives creators a tangible product their audience can buy, gift, and associate with their personal brand. Fragrance suits creators because it extends brand memory beyond content into a wearable product. Typical formats include eau de parfum and travel sizes. Start with [fragrance sampling](/fragrance-sampling), then explore [product formats](/fragrance-products).',
        bullets: sectionBullets(
          'Launch a fragrance your audience can wear and gift',
          'Evaluate curated fragrance samples before committing to production',
          'Customize bottle and packaging to match your aesthetic',
          'Sell through your own channels or retail partners',
        ),
        Illustration: HeroBottleIllustration,
      },
      {
        id: 'boutiques',
        title: 'Private label perfume for boutiques',
        description:
          'A well-packaged private label perfume can become a high-margin product on your retail floor or online store. Fragrance suits boutiques because it is giftable, display-friendly, and complements existing assortments. Eau de parfum and gift sets are common starting formats. Launch with [fragrance sampling](/fragrance-sampling) and [packaging options](/packaging-branding).',
        bullets: sectionBullets(
          'Add a branded fragrance that sells itself in-store',
          'Retail-ready packaging for shelf and gift presentation',
          'Margin-friendly product that complements your assortment',
          'Start with one hero scent before expanding the line',
        ),
        Illustration: FlatLayIllustration,
      },
      {
        id: 'salons-spas',
        title: 'Private label perfume for salons and spas',
        description:
          'Spas and salons can extend the in-visit experience with a branded fragrance clients take home. Body mists and eau de parfum work well for wellness positioning. Start with sampling, then choose packaging that matches your studio aesthetic via [packaging and branding](/packaging-branding).',
        bullets: sectionBullets(
          'Let clients take your scent experience home',
          'Pair fragrance with existing wellness or beauty services',
          'Giftable format for client appreciation and retail',
          'Build repeat visits through a product they use daily',
        ),
        Illustration: MarbleBottleIllustration,
      },
      {
        id: 'beauty-skincare',
        title: 'Private label fragrance for beauty brands',
        description:
          'Fragrance extends your scent world into a personal, wearable product your customers can buy, gift, and come back for. Eau de parfum and body mists are common extensions for skincare brands. See [fragrance products](/fragrance-products) and the [launch process](/how-it-works).',
        bullets: sectionBullets(
          'Extend your brand into a premium fragrance category',
          'Align scent direction with your existing product line',
          'Offer a wearable version of your brand identity',
          'Launch without fragrance manufacturing expertise',
        ),
        Illustration: FragranceFamilyIllustration,
      },
      {
        id: 'candle-home-fragrance',
        title: 'Candle and home fragrance brands',
        description:
          'If you already sell candles, diffusers, or room sprays, personal fragrance is a natural extension. Room sprays and eau de parfum help you offer a complete scent world. Explore [product formats](/fragrance-products) and [sampling](/fragrance-sampling).',
        bullets: sectionBullets(
          'Extend home scent into personal perfume',
          'Leverage your existing scent direction and audience',
          'Offer room sprays alongside wearable formats',
          'Cross-sell between home and personal fragrance',
        ),
        Illustration: RoomSprayIllustration,
      },
      {
        id: 'hotels-hospitality',
        title: 'Private label perfume for hotels and hospitality',
        description:
          'A branded perfume lets guests take home the scent of your property, spa, or resort. Travel sizes and room sprays suit hospitality retail and amenities. See [packaging and branding](/packaging-branding) for gift-ready presentation.',
        bullets: sectionBullets(
          'Guests take your property scent home with them',
          'Amenity, retail, and gift shop revenue opportunity',
          'Reinforce brand memory beyond the stay',
          'Travel sizes work well for hotel retail and gifting',
        ),
        Illustration: DeliveryIllustration,
      },
      {
        id: 'lifestyle-wellness',
        title: 'Lifestyle and wellness brands',
        description:
          'Wellness and lifestyle labels can offer fragrance as part of a holistic brand experience. Body mists and perfume oils suit lighter everyday positioning. Start with [fragrance sampling](/fragrance-sampling) to find a scent direction.',
        bullets: sectionBullets(
          'Fragrance as part of a broader wellness story',
          'Formats like body mists for lighter everyday wear',
          'Packaging that reflects calm, clean, or premium positioning',
          'Gift sets for retreats, subscriptions, and events',
        ),
        Illustration: BodyMistIllustration,
      },
      {
        id: 'corporate-gifting',
        title: 'Private label fragrance for corporate gifting',
        description:
          'Premium branded perfume sets are a strong fit for B2B gifting programs. Gift sets and travel formats work well for corporate events. Explore [product formats](/fragrance-products) and [packaging options](/packaging-branding).',
        bullets: sectionBullets(
          'Offer custom-branded perfume for corporate programs',
          'Gift sets and travel sizes for event and client gifting',
          'Retail-ready packaging under your or your client brand',
          'Repeatable production for ongoing gifting needs',
        ),
        Illustration: GiftSetIllustration,
      },
      {
        id: 'tourist-destinations',
        title: 'Tourist destinations',
        description:
          'Destination brands — cities, resorts, cultural venues — can capture a place through scent. A branded fragrance becomes a souvenir that travelers bring home and share, extending reach beyond the visit.',
        bullets: sectionBullets(
          'Capture a destination mood through branded scent',
          'Sell in gift shops, airports, and visitor centers',
          'Packaging that reflects local identity and storytelling',
          'A memorable takeaway travelers actively seek out',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'established-fragrance-brands',
        title: 'Established fragrance brands',
        description:
          'Brands already in fragrance can use Brandsamor for new formats, limited runs, or packaging refreshes — with production, filling, and quality checks handled without expanding in-house capacity.',
        bullets: sectionBullets(
          'Launch new formats or limited editions faster',
          'Access bottle, cap, and packaging options at scale',
          'Production sample approval before bulk filling',
          'Repeat orders with consistent quality processes',
        ),
        Illustration: ProductionIllustration,
      },
      {
        id: 'is-brandsamor-right',
        title: 'Is Brandsamor right for you?',
        description:
          'If you have an audience, a brand, and a reason to offer a premium product — retail, e-commerce, events, or gifting — private label perfume may be a strong next line. ' +
          COMMERCIAL_COPY.suitabilityNote +
          ' Start with the [fragrance sampling](/fragrance-sampling) brief to receive curated samples and explore the fit.',
        bullets: sectionBullets(
          'You have a brand and customers who would buy fragrance',
          'You want production handled without factory setup',
          'You are ready to complete the sampling brief and evaluate curated fragrances before bulk production',
          'You prefer starting small and growing the line over time',
        ),
        Illustration: BrandBriefIllustration,
      },
    ],
    'AUDIENCE',
  ),
  faq: {
    id: 'who-we-work-with-faq',
    eyebrow: 'FAQ',
    title: 'Who we work with questions',
    description:
      'Answers about which businesses use Brandsamor for private label perfume and whether your brand is a good fit.',
    items: WHO_WE_WORK_WITH_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'LET\'S TALK',
    title: 'Discuss Your Project',
    description:
      'Tell us about your brand, audience, and launch goals. We will help you complete the sampling brief, evaluate curated fragrance directions, and explore whether private label perfume is the right next product for your business.',
    Illustration: BrandBriefIllustration,
  },
  relatedLinks: {
    title: 'Audience guides',
    links: [
      { to: '/perfume-line-for-influencers-creators', label: 'Perfume line for influencers and creators' },
      { to: '/private-label-perfume-for-boutiques', label: 'Private label perfume for boutiques' },
      { to: '/hotel-signature-scent-manufacturer', label: 'Hotel signature scent manufacturer' },
      { to: '/salon-spa-private-label-fragrance', label: 'Salon and spa private label fragrance' },
      { to: '/corporate-gifting-perfume-supplier', label: 'Corporate gifting perfume supplier' },
      { to: '/private-label-perfume-for-fashion-brands', label: 'Private label perfume for fashion brands' },
      { to: '/private-label-perfume-for-skincare-beauty-brands', label: 'Private label perfume for skincare brands' },
      { to: '/perfume-manufacturer-for-amazon-sellers', label: 'Perfume manufacturer for Amazon sellers' },
    ],
  },
};
