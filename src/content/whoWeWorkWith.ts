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
import {
  WHO_WE_WORK_WITH_DESCRIPTION,
  WHO_WE_WORK_WITH_FAQ_ITEMS,
  WHO_WE_WORK_WITH_TITLE,
  WHO_WE_WORK_WITH_URL,
} from '../seo/pageSeo';
import { sectionBullets, withSteps } from './sectionHelpers';

export const whoWeWorkWithConfig: TopicPageConfig = {
  seo: {
    title: WHO_WE_WORK_WITH_TITLE,
    description: WHO_WE_WORK_WITH_DESCRIPTION,
    url: WHO_WE_WORK_WITH_URL,
  },
  hero: {
    badge: 'WHO WE WORK WITH',
    title: 'Private label perfume for brands ready to extend',
    description:
      'Brandsamor works with beauty brands, creators, boutiques, hotels, spas, salons, home fragrance labels, and gifting companies that want a premium branded fragrance — without building production in-house.',
    Illustration: HeroBottleIllustration,
  },
  sections: withSteps(
    [
      {
        id: 'creators-influencers',
        title: 'Creators and influencers',
        description:
          'A signature perfume gives creators a tangible product their audience can buy, gift, and associate with their personal brand. Sampling, production, and quality checks are handled so you can focus on your community.',
        bullets: sectionBullets(
          'Launch a fragrance your audience can wear and gift',
          'Sample scents before committing to production',
          'Customize bottle and packaging to match your aesthetic',
          'Sell through your own channels or retail partners',
        ),
        Illustration: HeroBottleIllustration,
      },
      {
        id: 'boutiques',
        title: 'Boutiques and retail stores',
        description:
          'A well-packaged private label perfume can become a high-margin product on your retail floor or online store — especially when it aligns with the aesthetic and price point your customers already expect.',
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
        title: 'Salons and spas',
        description:
          'Spas and salons can extend the in-visit experience with a branded fragrance clients take home. Perfume reinforces your treatment environment and gives clients a daily reminder of your studio.',
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
        title: 'Beauty and skincare brands',
        description:
          'Fragrance extends your scent world into a personal, wearable product your customers can buy, gift, and come back for — without adding heavy inventory or in-house fragrance production.',
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
          'If you already sell candles, diffusers, or room sprays, personal fragrance is a natural extension. Move into wearable scent with your existing fragrance expertise and customer base.',
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
        title: 'Hotels and hospitality',
        description:
          'A branded perfume lets guests take home the scent of your property, spa, or resort — reinforcing your brand long after checkout. Hospitality fragrance becomes a souvenir customers actively want.',
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
          'Wellness and lifestyle labels can offer fragrance as part of a holistic brand experience — clean scents, mindful gifting, and products that fit a daily ritual without feeling mass-market.',
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
        title: 'Corporate gifting companies',
        description:
          'Premium branded perfume sets are a strong fit for B2B gifting programs — client appreciation, employee rewards, and event giveaways where a tangible, luxurious product makes an impression.',
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
          'If you have an audience, a brand, and a reason to offer a premium product — retail, e-commerce, events, or gifting — private label perfume may be a strong next line. Start with scent samples and a brief conversation to explore the fit.',
        bullets: sectionBullets(
          'You have a brand and customers who would buy fragrance',
          'You want production handled without factory setup',
          'You are ready to sample scents before bulk production',
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
      'Tell us about your brand, audience, and launch goals. We will help you explore scent directions, packaging options, and whether private label perfume is the right next product for your business.',
    Illustration: BrandBriefIllustration,
  },
};
