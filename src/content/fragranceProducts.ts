import type { TopicPageConfig } from '../components/topic/types';
import {
  BodyMistsImage,
  ChoosingProductFormatImage,
  EauDeParfumImage,
  FragranceProductTypesImage,
  FragranceSampleKitWhiteImage,
  GiftSetImage,
  PerfumeOilsImage,
  RoomSpraysImage,
  TravelPerfumesImage,
} from '../components/Illustrations';
import { COMMERCIAL_COPY } from '../seo/businessFacts';
import {
  FRAGRANCE_PRODUCTS_FAQ_ITEMS,
} from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/fragrance-products');

export const fragranceProductsConfig: TopicPageConfig = {
  navKey: 'fragrance-products',
  seo: pageMeta.seo,
  hero: {
    badge: 'FRAGRANCE PRODUCTS',
    title: pageMeta.h1,
    description:
      'Private label fragrance works across more than one format — full-size eau de parfum, travel sprays, body mists, room sprays and gift sets. Choose what fits your brand, audience and price point. ' +
      COMMERCIAL_COPY.formatMinimumNote,
    Illustration: FragranceProductTypesImage,
  },
  sections: withSteps(
    [
      {
        id: 'product-formats-overview',
        title: 'Product formats overview',
        description:
          'Private label fragrance is not one-size-fits-all. Brandsamor helps you launch in the format that matches how your customers buy, gift, and use scent — whether that is a hero perfume, a lighter mist, or a curated gift set. Complete the [fragrance sampling](/fragrance-sampling) brief before locking in a format.',
        bullets: sectionBullets(
          'Compare core formats before you commit to production',
          'Match concentration and size to your price point and channel',
          'Start focused with one format or a small launch set',
          'Expand into new formats once you see what sells',
        ),
        Illustration: FragranceProductTypesImage,
      },
      {
        id: 'eau-de-parfum',
        title: 'Private Label Eau de Parfum',
        description:
          'Eau de parfum is the most common starting point for a branded perfume line. It offers strong longevity and a premium feel in standard spray bottles — ideal for retail, e-commerce, and signature scent launches.',
        bullets: sectionBullets(
          'Higher fragrance concentration for lasting wear',
          'Works well as a hero product or core collection item',
          'Pairs with a wide range of bottle shapes and capacities',
          'Familiar format customers expect from a perfume brand',
        ),
        Illustration: EauDeParfumImage,
      },
      {
        id: 'perfume-oils-roll-ons',
        title: 'Private Label Perfume Oils',
        description:
          'Perfume oils and roll-on formats offer a more intimate, portable application. They suit wellness brands, travel-focused lines, and customers who prefer alcohol-free or concentrated scent experiences.',
        bullets: sectionBullets(
          'Compact format for purses, pockets, and gifting',
          'Concentrated scent with controlled application',
          'Strong fit for clean beauty and wellness positioning',
          'Can complement a spray fragrance in the same line',
        ),
        Illustration: PerfumeOilsImage,
      },
      {
        id: 'body-mists',
        title: 'Private Label Body Mists',
        description:
          'Body mists are lighter, more approachable fragrance products — often used for everyday wear, layering, or entry-level price points. They work well for brands targeting younger audiences or broader retail distribution.',
        bullets: sectionBullets(
          'Lighter concentration for casual, all-day use',
          'Accessible price point for impulse and gift purchases',
          'Popular in beauty, lifestyle, and creator-led brands',
          'Easy to pair with full-size perfume in a collection',
        ),
        Illustration: BodyMistsImage,
      },
      {
        id: 'room-sprays',
        title: 'Private Label Room Sprays',
        description:
          'Room sprays extend your brand scent beyond personal fragrance into home and hospitality. Candle brands, hotels, spas, and lifestyle labels use them to create a consistent scent world customers can live in.',
        bullets: sectionBullets(
          'Bring your brand fragrance into homes and spaces',
          'Strong fit for hospitality, spa, and home fragrance brands',
          'Complements personal perfume in a scent collection',
          'Giftable format for housewarming and corporate gifting',
        ),
        Illustration: RoomSpraysImage,
      },
      {
        id: 'travel-perfumes',
        title: 'Private Label Travel Perfumes',
        description:
          'Travel-size perfumes make your brand portable — perfect for trial sizes, gift-with-purchase, hotel amenities, and customers who want their signature scent on the go without committing to a full bottle.',
        bullets: sectionBullets(
          'Smaller capacities for trial, travel, and gifting',
          'Lower commitment entry point for new customers',
          'Popular add-on for hotels, spas, and retail sets',
          'Helps customers discover your scent before upsizing',
        ),
        Illustration: TravelPerfumesImage,
      },
      {
        id: 'gift-sets',
        title: 'Private Label Fragrance Gift Sets',
        description:
          'Gift sets combine multiple formats — full size plus travel, mist plus spray, or perfume plus room spray — into a packaged experience. They drive higher average order value and make your brand feel ready for seasonal gifting.',
        bullets: sectionBullets(
          'Bundle formats for holidays and special occasions',
          'Increase perceived value with curated packaging',
          'Introduce customers to more than one product type',
          'Retail-ready presentation under your brand name',
        ),
        Illustration: GiftSetImage,
      },
      {
        id: 'choosing-right-format',
        title: 'Choosing the right product format',
        description:
          'The best format depends on who you sell to, where you sell, and what price point you want to own. Most brands start with one hero format, validate demand, then expand into complementary products.',
        bullets: sectionBullets(
          'Match format to your customer and sales channel',
          'Consider margin, size, and packaging cost together',
          'Start with one scent in one format before expanding',
          'Use samples to confirm scent direction before format decisions',
        ),
        Illustration: ChoosingProductFormatImage,
      },
    ],
    'PRODUCT FORMAT',
  ),
  faq: {
    id: 'fragrance-products-faq',
    eyebrow: 'FAQ',
    title: 'Fragrance product questions',
    description:
      'Common questions about private label fragrance formats, bottles, and packaging options with Brandsamor.',
    items: FRAGRANCE_PRODUCTS_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'NEXT STEP',
    title: 'Explore fragrance samples',
    description:
      'Before you lock in a product format, complete the curated sampling brief about your business and customers. We select five fragrances matched to your brand, ship them for evaluation, and help you match your launch scent to the right bottle and format.',
    Illustration: FragranceSampleKitWhiteImage,
  },
  relatedLinks: {
    links: [
      { to: '/fragrance-sampling', label: 'Compare scents through private-label fragrance sampling' },
      { to: '/packaging-branding', label: 'Explore custom perfume packaging options' },
      { to: '/eau-de-parfum-manufacturer', label: 'Eau de parfum manufacturer' },
      { to: '/private-label-perfume-oil-manufacturer', label: 'Private label perfume oil manufacturer' },
      { to: '/private-label-body-mist-manufacturer', label: 'Private label body mist manufacturer' },
      { to: '/private-label-room-spray-manufacturer', label: 'Private label room spray manufacturer' },
      { to: '/how-it-works', label: 'See the private label perfume manufacturing process' },
      { to: '/custom-perfume-manufacturer', label: 'Explore custom perfume manufacturing support' },
    ],
  },
};
