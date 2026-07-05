import type { InfoSection } from '../components/info/InfoPageLayout';
import { ORGANIZATION } from '../seo/siteConfig';

const legalEntity = ORGANIZATION.legalName;

export const privacyPolicySections: InfoSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      `This Privacy Policy explains how ${legalEntity} ("Brandsamor," "we," "us") collects, uses, and protects personal information when you visit brandsamor.com, contact us, place orders, or use onboarding and account features related to private-label fragrance services.`,
    ],
  },
  {
    id: 'information-collected',
    title: 'Information we collect',
    paragraphs: ['We may collect the following categories of information depending on how you interact with Brandsamor:'],
    bullets: [
      'Contact details such as name, email address, phone number, and company name',
      'Project information you provide about your brand, product ideas, quantities, and packaging preferences',
      'Billing and shipping details when you place sample or production orders',
      'Account credentials for your Brandsamor customer account',
      'Communications you send by email, phone, or in-app messaging',
      'Technical data such as IP address, browser type, device information, and pages visited',
      'Cookie or similar analytics data where permitted by law',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use information',
    paragraphs: ['We use personal information to operate and improve Brandsamor services, including to:'],
    bullets: [
      'Respond to inquiries and provide customer support',
      'Process fragrance sampling and production requests',
      'Create and manage customer accounts and project profiles',
      'Send service-related email or SMS updates you request or that are necessary for your order',
      'Improve website performance, security, and user experience',
      'Comply with legal, tax, and regulatory obligations',
    ],
  },
  {
    id: 'sharing',
    title: 'How we share information',
    paragraphs: [
      'We do not sell your personal information. We may share information with production partners, logistics providers, payment processors, and professional advisers only as needed to fulfill your request, operate the service, or comply with law. Partners are expected to protect information appropriately.',
    ],
  },
  {
    id: 'retention-security',
    title: 'Retention and security',
    paragraphs: [
      'We retain information for as long as needed to provide services, maintain business records, resolve disputes, and meet legal requirements. We use reasonable administrative, technical, and organizational safeguards, but no method of transmission or storage is completely secure.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your choices and rights',
    paragraphs: [
      'Depending on your location, you may have rights to access, correct, delete, or restrict certain processing of your personal information. You may opt out of non-essential marketing communications by following unsubscribe instructions or contacting us.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [
      `Questions about this policy may be sent to ${ORGANIZATION.email}. ${legalEntity} is the data controller for Brandsamor marketing and service operations described here.`,
    ],
  },
];

export const termsSections: InfoSection[] = [
  {
    id: 'agreement',
    title: 'Agreement',
    paragraphs: [
      `These Terms of Service ("Terms") govern your use of brandsamor.com and private-label fragrance services offered by ${legalEntity} through the Brandsamor brand. By using the site or placing an order, you agree to these Terms.`,
    ],
  },
  {
    id: 'services',
    title: 'Services',
    paragraphs: [
      'Brandsamor provides private-label fragrance services including scent sampling, product format guidance, packaging customization support, production coordination, filling, quality checks, and delivery of finished fragrance products under your brand. Specific scope, pricing, and timelines are confirmed in project communications and order documents. Binding terms for each project are defined in order confirmations and production agreements.',
    ],
  },
  {
    id: 'orders-approval',
    title: 'Orders, samples, and approvals',
    paragraphs: [
      'Fragrance production involves custom goods. You are responsible for reviewing samples, approving artwork, confirming bottle and packaging specifications, and signing off on production samples before bulk manufacturing begins. Approved specifications become the basis for production.',
    ],
    bullets: [
      'Sampling fees may apply and are generally non-refundable once samples are prepared or shipped',
      'Production deposits may be required before manufacturing starts',
      'Lead-time estimates are targets, not guarantees, and depend on scent, packaging, and batch complexity',
      'Minor production tolerances may apply to color, fill level, and packaging finishes within industry norms',
    ],
  },
  {
    id: 'customer-responsibilities',
    title: 'Your responsibilities',
    paragraphs: [
      'You must provide accurate brand, contact, and shipping information. You are responsible for ensuring that label claims, marketing statements, and product positioning comply with laws in the markets where you sell. You must have rights to any logos, artwork, or trademarks you supply for production.',
    ],
  },
  {
    id: 'shipping-risk',
    title: 'Shipping, import duties, and risk of loss',
    paragraphs: [
      'Shipping terms, insurance, and responsibility for loss or damage in transit are confirmed per order. Import duties, taxes, and customs clearance for international shipments are typically the customer\'s responsibility unless otherwise agreed in writing.',
    ],
  },
  {
    id: 'limitation',
    title: 'Disclaimers and limitation of liability',
    paragraphs: [
      'The website and services are provided on an "as available" basis to the extent permitted by law. Except where prohibited, liability is limited to the amount paid for the specific order giving rise to the claim. Nothing in these Terms limits liability that cannot be limited under applicable law.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    paragraphs: [
      `These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict-of-law rules, except where mandatory consumer protections apply in your jurisdiction.`,
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [`Legal and service questions: ${ORGANIZATION.email}. Legal entity: ${legalEntity}.`],
  },
];

export const refundPolicySections: InfoSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      'Private-label fragrance products are custom-made to your specifications. This Refund and Cancellation Policy explains how cancellations, changes, and quality issues are handled for sampling and production orders placed with Brandsamor.',
      'This policy is not a standard ecommerce return policy. Custom fragrance production generally cannot be resold to other customers once your branding and formula selections are applied.',
    ],
  },
  {
    id: 'sampling',
    title: 'Fragrance sampling',
    paragraphs: [
      'Sampling fees cover scent evaluation, preparation, and fulfillment. Once sample preparation has started or samples have shipped, sampling fees are typically non-refundable. If Brandsamor cannot fulfill a sample order due to its own error, a remedy or credit will be offered.',
    ],
  },
  {
    id: 'deposits-cancellations',
    title: 'Production deposits and cancellations',
    paragraphs: [
      'Production may require a deposit before sourcing components or scheduling filling. If you cancel after sample approval or after production has begun, deposits and amounts covering committed materials or labor may be non-refundable.',
    ],
    bullets: [
      'Cancellations before production approval are handled case by case',
      'Cancellations after artwork or production sample approval may incur material and setup costs',
      'Changes to approved bottle, packaging, or scent selections may restart timelines and affect pricing',
    ],
  },
  {
    id: 'artwork-approval',
    title: 'Artwork and specification approval',
    paragraphs: [
      'You are responsible for reviewing and approving label artwork, packaging proofs, and production samples. Brandsamor is not responsible for errors in customer-supplied files that were approved for production.',
    ],
  },
  {
    id: 'damaged-goods',
    title: 'Damaged or incorrect goods',
    paragraphs: [
      'If finished goods arrive damaged or materially differ from the approved production sample because of a Brandsamor production error, contact us promptly with order details and photos. Verified issues may be remedied by replacement, rework, or credit as appropriate.',
    ],
  },
  {
    id: 'non-returnable',
    title: 'Non-returnable custom goods',
    paragraphs: [
      'Except where required by law or expressly agreed in writing, finished private-label fragrance batches produced to your approved specifications cannot be returned for a refund simply because of a change of mind, slow sales, or revised brand direction.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [
      `To discuss a cancellation, quality concern, or damaged shipment, email ${ORGANIZATION.email} with your order reference and supporting details.`,
    ],
  },
];
