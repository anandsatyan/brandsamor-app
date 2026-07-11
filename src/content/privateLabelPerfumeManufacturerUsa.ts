import type { TopicPageConfig } from '../components/topic/types';
import {
  ComplianceDocIllustration,
  DeliveryIllustration,
  PackagingIllustration,
  ProcessTimelineIllustration,
  ScentSamplesIllustration,
} from '../components/Illustrations';
import { COMMERCIAL_COPY } from '../seo/businessFacts';
import { PRIVATE_LABEL_USA_FAQ_ITEMS } from '../seo/pageSeo';
import { ORGANIZATION } from '../seo/siteConfig';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/private-label-perfume-manufacturer-usa');

export const privateLabelPerfumeManufacturerUsaConfig: TopicPageConfig = {
  seo: pageMeta.seo,
  hero: {
    badge: 'UNITED STATES',
    title: pageMeta.h1,
    description:
      'Looking for a perfume manufacturer USA founders can work with clearly? Brandsamor is operated by Packamor LLC in Delaware and coordinates sampling, packaging, production and documentation for US and worldwide launches through a specialist partner network.',
    Illustration: ProcessTimelineIllustration,
  },
  sections: withSteps(
    [
      {
        id: 'us-brands-needs',
        title: 'What US brands typically need',
        description:
          'US founders often need a credible first product, clear documentation for retail or e-commerce, and a launch path that does not require building a factory. Private label perfume lets you sell under your own brand while Brandsamor coordinates fragrance selection, packaging and production through qualified partners.',
        bullets: sectionBullets(
          'A finished product customers can buy, gift and reorder',
          'Packaging that feels retail-ready for DTC or wholesale',
          'Documentation support based on product and channel',
          'A sample-first path before bulk production',
        ),
        Illustration: ScentSamplesIllustration,
      },
      {
        id: 'delaware-entity',
        title: 'Packamor LLC and US operations',
        description:
          `Brandsamor is a service brand operated by ${ORGANIZATION.legalName}, registered in Delaware. Customer agreements, billing and project communication are handled through the US entity at ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.addressLocality}, ${ORGANIZATION.address.addressRegion} ${ORGANIZATION.address.postalCode}, USA.`,
        bullets: sectionBullets(
          'US-based legal entity for customer agreements',
          'Team presence across the US, India, China and the UAE',
          'Coordinated production through specialist partners',
          'No claim that every production step occurs in one US facility',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'mocra-considerations',
        title: 'MoCRA considerations for US sellers',
        description:
          'US cosmetic fragrance products may fall under FDA oversight, including Modernization of Cosmetics Regulation Act (MoCRA) requirements for facility registration and product listing where applicable. Brandsamor can discuss documentation and production context with you, but the brand owner remains responsible for claims, labelling and market compliance. See [quality and compliance](/quality-compliance) and our [MoCRA guide](/knowledge-base/fda-mocra-requirements-perfume-brands).',
        bullets: sectionBullets(
          'Confirm whether your product and sales channel trigger MoCRA obligations',
          'Use official FDA resources for registration and listing requirements',
          'Request applicable documentation from your production setup',
          'Work with qualified advisors for final compliance decisions',
        ),
        Illustration: ComplianceDocIllustration,
      },
      {
        id: 'us-labelling',
        title: 'US labelling considerations',
        description:
          'Perfume sold in the United States generally needs clear product identity, net quantity, responsible party information and ingredient disclosure rules that apply to your product type and claims. Label copy should be reviewed against your market, formula and sales channel before production release.',
        bullets: sectionBullets(
          'Product name and net contents on the label',
          'Responsible party and contact details where required',
          'Ingredient listing rules for cosmetic fragrance products',
          'Avoid drug or therapeutic claims unless properly supported',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'shipping-imports',
        title: 'Shipping, imports and delivery responsibilities',
        description:
          'Finished batches may be prepared for domestic US delivery or export depending on your project. Import duties, customs clearance and destination-market rules remain the brand owner’s responsibility unless otherwise agreed in writing. ' +
          COMMERCIAL_COPY.worldwideService,
        bullets: sectionBullets(
          'Confirm Incoterms and freight responsibilities early',
          'Plan lead time for customs and last-mile delivery',
          'Review import rules if components or finished goods cross borders',
          'Pack for safe transit through coordinated packing checks',
        ),
        Illustration: DeliveryIllustration,
      },
      {
        id: 'launch-path',
        title: 'A practical US launch path',
        description:
          'Most US brands begin with [fragrance sampling](/fragrance-sampling), choose a [product format](/fragrance-products), finalize [custom perfume packaging](/packaging-branding), approve a production sample, then move into coordinated filling and finishing. Review [how perfume is made](/how-your-batch-is-made) before bulk release.',
        bullets: sectionBullets(
          'Define customer, channel and price point first',
          'Sample scents before packaging and production decisions',
          'Approve artwork, bottle and box before bulk runs',
          'Use production-sample approval before batch release',
        ),
        Illustration: ProcessTimelineIllustration,
      },
    ],
    'US LAUNCH',
  ),
  faq: {
    id: 'private-label-usa-faq',
    eyebrow: 'FAQ',
    title: 'US private label perfume questions',
    description:
      'Answers about launching private label fragrance for US customers with Brandsamor.',
    items: PRIVATE_LABEL_USA_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'NEXT STEP',
    title: 'Plan your US fragrance launch',
    description:
      'Share your brand direction, target customer and launch goals. Brandsamor curates five fragrance samples matched to your business, then helps you plan packaging and production for a focused first batch.',
    Illustration: ScentSamplesIllustration,
  },
  relatedLinks: {
    links: [
      { to: '/fragrance-sampling', label: 'Explore private label perfume samples' },
      { to: '/quality-compliance', label: 'Review perfume quality and compliance support' },
      { to: '/how-your-batch-is-made', label: 'See how perfume is made' },
      { to: '/contact', label: 'Contact Brandsamor about your US project' },
    ],
  },
};
