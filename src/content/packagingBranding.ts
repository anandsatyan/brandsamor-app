import type { TopicPageConfig } from '../components/topic/types';
import {
  ApprovalIllustration,
  BrandBriefIllustration,
  FlatLayIllustration,
  HeroBottleIllustration,
  LabelIllustration,
  MarbleBottleIllustration,
  PackagingIllustration,
  RigidBoxIllustration,
} from '../components/Illustrations';
import { PACKAGING_BRANDING_FAQ_ITEMS } from '../seo/pageSeo';
import { createTopicPageMeta } from '../seo/topicPageMeta';
import { sectionBullets, withSteps } from './sectionHelpers';

const pageMeta = createTopicPageMeta('/packaging-branding');

export const packagingBrandingConfig: TopicPageConfig = {
  navKey: 'packaging',
  seo: pageMeta.seo,
  hero: {
    badge: 'PACKAGING & BRANDING',
    title: pageMeta.h1,
    description:
      'Shape every detail — bottle, cap, spray, label, printing, color, and boxes — so your private label fragrance looks and feels ready to sell from the first batch.',
    Illustration: PackagingIllustration,
  },
  sections: withSteps(
    [
      {
        id: 'bottle-selection',
        title: 'Bottle selection',
        description:
          'The bottle is the first thing customers notice. Brandsamor offers shapes, profiles, and glass finishes that help your fragrance feel intentional — not like a generic private label template.',
        bullets: sectionBullets(
          'Choose from multiple bottle shapes and profiles',
          'Select glass weight and finish that match your price point',
          'Pair bottle style with your brand aesthetic',
          'See how your scent looks in bottle before bulk production',
        ),
        Illustration: MarbleBottleIllustration,
      },
      {
        id: 'bottle-sizes',
        title: 'Bottle sizes',
        description:
          'Capacity affects price perception, margin, and use case. From full-size hero bottles to compact travel formats, pick the size that fits your launch strategy and sales channel.',
        bullets: sectionBullets(
          'Standard capacities for retail and e-commerce launches',
          'Travel and trial sizes for gifting and discovery',
          'Size choices that affect unit cost and perceived value',
          'Plan a size range once your hero format proves demand',
        ),
        Illustration: HeroBottleIllustration,
      },
      {
        id: 'caps-sprays',
        title: 'Caps and spray pumps',
        description:
          'Cap finish and spray quality shape how premium the product feels in hand. Metal, wood, ABS, and specialty caps pair with spray hardware matched to your bottle and fragrance format.',
        bullets: sectionBullets(
          'Metal, wood, ABS, and specialty cap options',
          'Spray and pump hardware for different product types',
          'Crimp and fit combinations tested for your bottle',
          'Hardware choices that affect shelf presence and hand feel',
        ),
        Illustration: FlatLayIllustration,
      },
      {
        id: 'labels',
        title: 'Labels',
        description:
          'Your label carries the brand name, product details, and regulatory information customers expect. Custom label design, placement, and material choices make the bottle unmistakably yours.',
        bullets: sectionBullets(
          'Custom label design with your logo and brand typography',
          'Front, back, and wrap label configurations',
          'Material and finish options for premium presentation',
          'Label layouts that meet your market’s information requirements',
        ),
        Illustration: LabelIllustration,
      },
      {
        id: 'screen-printing',
        title: 'Screen printing',
        description:
          'Screen printing adds logos, patterns, and brand marks directly onto the bottle glass — a premium finishing technique that elevates the product beyond a standard labeled bottle.',
        bullets: sectionBullets(
          'Print logos and brand marks directly on glass',
          'Add patterns, text, and decorative elements',
          'Combine screen printing with labels for layered branding',
          'Preview print placement on a production sample',
        ),
        Illustration: LabelIllustration,
      },
      {
        id: 'bottle-colouring',
        title: 'Bottle colouring and coating',
        description:
          'Glass color and coating direction affect how the fragrance is perceived through the bottle. Tinted, frosted, and coated finishes help your product stand out on shelf and in photography.',
        bullets: sectionBullets(
          'Tinted and frosted glass options',
          'Coating and lacquer finishes for a distinct look',
          'Color direction aligned with your brand palette',
          'See color and coating on a sample before bulk runs',
        ),
        Illustration: MarbleBottleIllustration,
      },
      {
        id: 'decorative-finishes',
        title: 'Decorative finishes',
        description:
          'Beyond labels and printing, decorative finishes — embossing, hot foil, textured caps, and specialty details — add the tactile quality that makes a perfume feel gift-worthy.',
        bullets: sectionBullets(
          'Embossing, foil, and specialty print techniques',
          'Textured caps and accent hardware details',
          'Finishing choices that support premium positioning',
          'Combine finishes for a cohesive brand expression',
        ),
        Illustration: FlatLayIllustration,
      },
      {
        id: 'folding-cartons',
        title: 'Folding cartons',
        description:
          'Folding cartons are the most common outer packaging for retail perfume. Custom box design, print, and insert layout turn a bottle into a product that is ready for shelf, e-commerce, or gifting.',
        bullets: sectionBullets(
          'Custom carton design with your brand artwork',
          'Inserts and fitments to protect the bottle in transit',
          'Print finishes including matte, gloss, and soft-touch',
          'Retail-ready outer packaging from the first batch',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'rigid-boxes',
        title: 'Rigid boxes',
        description:
          'Rigid boxes offer a more premium unboxing experience — thicker walls, magnetic closures, and luxury presentation. They suit gift sets, limited editions, and high-end brand positioning.',
        bullets: sectionBullets(
          'Premium rigid box construction for gift positioning',
          'Magnetic, lift-off, and drawer-style closures',
          'Ideal for gift sets and limited-edition launches',
          'Elevated unboxing that supports higher price points',
        ),
        Illustration: RigidBoxIllustration,
      },
      {
        id: 'stock-vs-custom',
        title: 'Stock packaging vs custom packaging',
        description:
          'Stock packaging gets you to market faster with proven formats. Custom packaging gives you more control over shape, print, and finishing. Most brands start with stock options and refine as the line grows.',
        bullets: sectionBullets(
          'Stock options for faster, cost-effective first launches',
          'Custom packaging for distinct brand differentiation',
          'Mix stock bottles with custom labels and boxes',
          'Upgrade packaging on repeat orders as you learn',
        ),
        Illustration: PackagingIllustration,
      },
      {
        id: 'artwork-requirements',
        title: 'Artwork requirements',
        description:
          'You do not need finished artwork on day one, but clear brand assets speed up production. Logo files, color references, and label copy help Brandsamor prepare accurate proofs for your approval.',
        bullets: sectionBullets(
          'Vector logo files and brand color references',
          'Label copy including product name and required details',
          'Box artwork with bleed and dieline specifications',
          'Refine artwork during the pre-production proof stage',
        ),
        Illustration: BrandBriefIllustration,
      },
      {
        id: 'packaging-approval',
        title: 'Packaging approval process',
        description:
          'Before bulk production, review a production sample that reflects your approved scent, bottle, cap, label, and box. Sign off when the finished product matches your brand vision.',
        bullets: sectionBullets(
          'Review a physical production sample before bulk filling',
          'Confirm label alignment, print quality, and box finish',
          'Request adjustments before the full batch runs',
          'Move to production only when the sample feels right',
        ),
        Illustration: ApprovalIllustration,
      },
    ],
    'PACKAGING',
  ),
  faq: {
    id: 'packaging-branding-faq',
    eyebrow: 'FAQ',
    title: 'Packaging and branding questions',
    description:
      'Common questions about customizing bottles, labels, boxes, and finishing details for your private label perfume.',
    items: PACKAGING_BRANDING_FAQ_ITEMS,
  },
  cta: {
    eyebrow: 'READY TO BEGIN',
    title: 'Start Designing',
    description:
      'Share your brand direction and packaging goals. Brandsamor helps you shape bottle, label, and box choices into a finished product that looks and feels ready to sell.',
    Illustration: PackagingIllustration,
  },
  beforeFaq: null,
};
