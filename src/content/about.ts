import type { InfoSection } from '../components/info/InfoPageLayout';
import { ORGANIZATION } from '../seo/siteConfig';

export const aboutSections: InfoSection[] = [
  {
    id: 'about-brandsamor',
    title: 'About Brandsamor',
    paragraphs: [
      'Brandsamor is a private-label fragrance studio that helps businesses launch ready-to-sell perfumes under their own brand. Instead of building a factory, brands work with Brandsamor to sample scents, choose product formats, customize packaging, and receive finished fragrance products with quality checks handled for them.',
      'The service is designed for beauty brands, creators, boutiques, hotels, salons, home fragrance labels, gifting companies, and other businesses that want a premium branded fragrance without managing production in-house.',
    ],
  },
  {
    id: 'why-created',
    title: 'Why Brandsamor was created',
    paragraphs: [
      'Many brands want to sell perfume under their own name but do not want the cost, complexity, or lead time of setting up fragrance manufacturing. Brandsamor was created to make that path practical: sample first, approve packaging, then receive a finished batch you can sell, gift, or distribute.',
      'The private-label model is built for focused first launches. Most brands start with one scent and one format, learn what customers respond to, and expand the line over time.',
    ],
  },
  {
    id: 'packaging-background',
    title: 'Our perfume-packaging background',
    paragraphs: [
      'Before private-label fragrance manufacturing, Brandsamor built deep experience helping fragrance brands source perfume bottles, caps, sprays, labels, and retail packaging. That packaging expertise is now part of a broader launch service that covers scent selection through finished product delivery.',
      'Packaging remains a core strength: bottle shapes, hardware, printing, boxes, and gift presentation are all part of how a fragrance becomes a credible branded product.',
    ],
  },
  {
    id: 'private-label-model',
    title: 'How our private-label model works',
    paragraphs: [
      'Brandsamor guides you through sampling, product format selection, packaging customization, production approval, filling, quality checks, and delivery. You choose the scent direction and brand presentation; Brandsamor coordinates sourcing, production, and documentation support where applicable.',
    ],
    bullets: [
      'Share your brand brief and launch goals',
      'Order fragrance samples and choose your starting scent',
      'Select bottle, cap, label, and packaging details',
      'Approve a production sample before bulk filling',
      'Receive finished perfumes ready to sell or gift',
    ],
  },
  {
    id: 'team-regions',
    title: 'Team presence and operating regions',
    paragraphs: [
      'Brandsamor is operated by Packamor LLC in the United States and works with brands worldwide. The team has presence across the US, India, Dubai, and China to support sourcing, production coordination, and customer communication across time zones.',
    ],
  },
  {
    id: 'quality-suppliers',
    title: 'Quality and supplier approach',
    paragraphs: [
      'Quality checks are part of filling, finishing, and packing — not an afterthought. Where applicable, Brandsamor supports documentation such as Certificates of Analysis, IFRA certificates, allergen information, and batch records. Compliance needs vary by product type, market, and sales channel.',
      'Production arrangements and documentation availability are confirmed during project planning. Claims on the website reflect what Brandsamor can support at launch and are reviewed as operational details are finalized.',
    ],
  },
  {
    id: 'packamor-llc',
    title: 'Packamor LLC',
    paragraphs: [
      `Brandsamor is a trade name and service brand operated by ${ORGANIZATION.legalName}, a company registered in Delaware, United States. Packamor LLC is the legal entity responsible for customer agreements, billing, and business operations related to Brandsamor private-label fragrance services.`,
    ],
  },
  {
    id: 'contact',
    title: 'Contact information',
    paragraphs: [
      `Email: ${ORGANIZATION.email}`,
      `Phone: ${ORGANIZATION.phone}`,
      `Address: ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.addressLocality}, ${ORGANIZATION.address.addressRegion} ${ORGANIZATION.address.postalCode}, ${ORGANIZATION.address.addressCountry}`,
      'For project questions, use the contact page or email address above. A full onboarding application is coming soon.',
    ],
  },
];
