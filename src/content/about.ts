import type { InfoSection } from '../components/info/InfoPageLayout';
import { BUSINESS_FACTS, COMMERCIAL_COPY } from '../seo/businessFacts';
import { ORGANIZATION } from '../seo/siteConfig';

export const aboutSections: InfoSection[] = [
  {
    id: 'about-brandsamor',
    title: 'About Brandsamor',
    paragraphs: [
      'Brandsamor is a private-label fragrance studio that helps businesses launch ready-to-sell fragrance products under their own brand. Instead of building a factory, brands work with Brandsamor to sample scents, choose product formats, customize packaging, and receive finished fragrance products with quality checks handled for them.',
      'The service is designed for beauty brands, creators, boutiques, hotels, salons, home fragrance labels, gifting companies, and other businesses that want a premium branded fragrance without managing production in-house.',
    ],
  },
  {
    id: 'why-created',
    title: 'Why Brandsamor Was Created',
    paragraphs: [
      'Many brands want to sell perfume under their own name but do not want the cost, complexity, or lead time of setting up fragrance manufacturing. Brandsamor was created to make that path practical: sample first, approve packaging, then receive a finished batch you can sell, gift, or distribute.',
      'The private-label model is built for focused first launches. Most brands start with one scent and one format, learn what customers respond to, and expand the line over time.',
    ],
  },
  {
    id: 'experience',
    title: 'Experience You Can Build On',
    paragraphs: [
      `Brandsamor is operated by ${ORGANIZATION.legalName}, the company behind [Packamor](https://www.packamor.com/) — a fragrance-packaging business founded to help independent perfumers and emerging fragrance brands access quality packaging without the very large minimums traditionally demanded by suppliers.`,
      `Brandsamor has served more than ${BUSINESS_FACTS.brandsServed} brands, earned a ${BUSINESS_FACTS.customerRating} customer rating, shipped fragrance products to more than ${BUSINESS_FACTS.countriesShipped} countries, and built on more than ${BUSINESS_FACTS.yearsOperating} years of fragrance industry experience.`,
    ],
  },
  {
    id: 'supply-chain',
    title: 'Packaging and Supply-Chain Capability',
    paragraphs: [
      `The Brandsamor team has experience across design, fragrance, sourcing, packaging, and supply-chain coordination — spanning ${BUSINESS_FACTS.teamRegions}. The team works with glass manufacturers, printers, decorators and finishing specialists.`,
      'Quality checks include dimensional accuracy, closure integrity, finish consistency and shipment safety. That production network supports both emerging brands and larger production requirements.',
    ],
  },
  {
    id: 'how-brandsamor-works',
    title: 'How Brandsamor Works',
    paragraphs: [
      'Brandsamor coordinates the full private-label launch path for customers who want a finished fragrance product under their own brand.',
    ],
    bullets: [
      'Customer brief — share your audience, brand style, launch goals and rough quantity range',
      'Fragrance samples — start your project and explore the scent library with our team before production',
      'Product format and scent — choose the format and fragrance that fit your customer and channel',
      'Bottle and packaging — select bottle, cap, label, printing and retail packaging details',
      'Production sample approval — review a real unit before bulk filling begins',
      'Production, filling and quality checks — filling, labeling, finishing and batch documentation',
      'Delivery — finished perfumes packed and shipped ready to sell or gift',
    ],
  },
  {
    id: 'quality-approach',
    title: 'Quality Approach',
    paragraphs: [
      'Quality checks are part of filling, finishing, and packing. Brandsamor applies operational checks such as bottle and closure compatibility, closure integrity, spray functionality, fill and finish consistency, label and print placement, box inspection and shipment preparation.',
      'Brandsamor supports documentation such as Certificates of Analysis, IFRA certificates, allergen information and batch records where applicable to your project. See [quality and compliance](/quality-compliance) for more detail.',
    ],
  },
  {
    id: 'worldwide-service',
    title: 'Worldwide Service',
    paragraphs: [
      COMMERCIAL_COPY.worldwideService,
      'For an overview of the launch path, see [how it works](/how-it-works). For packaging options, visit [packaging and branding](/packaging-branding).',
    ],
  },
  {
    id: 'packamor-llc',
    title: 'Packamor LLC',
    paragraphs: [
      COMMERCIAL_COPY.legalEntity,
    ],
  },
  {
    id: 'contact',
    title: 'Contact Information',
    paragraphs: [
      `${ORGANIZATION.legalName}`,
      `${ORGANIZATION.address.streetAddress}`,
      `${ORGANIZATION.address.addressLocality}, ${ORGANIZATION.address.addressRegion} ${ORGANIZATION.address.postalCode}`,
      `${ORGANIZATION.address.addressCountry}`,
      `Phone: ${ORGANIZATION.phone}`,
      `Email: ${ORGANIZATION.email}`,
      'For project questions, visit the [contact page](/contact) or email the address above.',
    ],
  },
];
