import { PACKAMOR_URL } from './businessFacts';
import { CANONICAL_ORIGIN, OG_SITE_NAME, PAGE_METADATA } from './pageMetadata';

const envSiteUrl =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_SITE_URL
    : undefined;

export const SITE_URL = envSiteUrl ?? CANONICAL_ORIGIN;

export const SITE_NAME = OG_SITE_NAME;

export const DEFAULT_TITLE = PAGE_METADATA['/'].title;

export const DEFAULT_DESCRIPTION = PAGE_METADATA['/'].description;

export const ORGANIZATION = {
  name: 'Brandsamor',
  legalName: 'Packamor LLC',
  phone: '+1-848-220-1353',
  email: 'info@brandsamor.com',
  address: {
    streetAddress: '1111B S Governors Ave',
    addressLocality: 'Dover',
    addressRegion: 'DE',
    postalCode: '19904',
    addressCountry: 'US',
  },
  sameAs: [PACKAMOR_URL],
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is private label perfume?',
    answer:
      'Private label perfume is a finished fragrance product sold under your brand name instead of the manufacturer\'s. You choose the scent, bottle, cap, label, and packaging, and the product is filled, finished, and delivered ready to sell or gift under your brand.',
  },
  {
    question: 'How do I start my own perfume line with Brandsamor?',
    answer:
      'Complete the curated sampling brief about your business and customers. Brandsamor selects five fragrances matched to your brand, ships them for evaluation, and helps you customize bottle and packaging before your first production batch. Brandsamor handles sourcing, filling, packaging, and quality checks so you can focus on selling.',
  },
  {
    question: 'Who is private label perfume best for?',
    answer:
      'Private label perfume works well for beauty and skincare brands, creators and influencers, boutiques, hotels and spas, salons, candle and home fragrance brands, and corporate gifting companies that want a premium branded product without building their own factory.',
  },
  {
    question: 'How long does it take to launch a branded perfume?',
    answer:
      'Typical production takes approximately 3-6 weeks after fragrance, packaging, artwork and production details have been approved. Earlier steps such as sampling and packaging decisions happen before that window begins.',
  },
  {
    question: 'Do I need my own perfume factory to sell under my brand?',
    answer:
      'No. Brandsamor handles production, filling, packaging, and quality checks for you. That means you can launch a branded fragrance line without investing in manufacturing equipment, factory setup, or in-house production staff.',
  },
  {
    question: 'Can I order perfume samples before placing a bulk order?',
    answer:
      'Yes — complete the sampling brief and we curate five fragrances for your sample kit. Available fragrance samples are normally dispatched within 2-3 business days. Delivery timing depends on destination and shipping service selected.',
  },
  {
    question: 'What packaging options are available for private label perfume?',
    answer:
      'You can customize bottle shape and size, cap and spray hardware, label design, screen printing, color direction, boxes, inserts, and gift packaging so the finished product looks aligned with your brand and price point.',
  },
  {
    question: 'What compliance support does Brandsamor provide for fragrance products?',
    answer:
      'Compliance needs vary by product type, market, and sales channel. Where applicable, Brandsamor supports documentation such as FDA MoCRA registration, GMP-compliant production, Certificates of Analysis, IFRA certificates, allergen information, and batch records.',
  },
  {
    question: 'What is the minimum order quantity for a private label perfume launch?',
    answer:
      'Start with samples — there is no production minimum to explore scents and packaging direction. When you are ready for your first batch, quantity depends on product format, bottle, decoration, box, fragrance, and destination. Brandsamor helps you plan a focused first run rather than over-ordering upfront.',
  },
  {
    question: 'How is private label perfume different from white label fragrance?',
    answer:
      'White label fragrance usually refers to a pre-made product with limited branding changes. Private label perfume gives you more control over scent selection, bottle design, branding, packaging, and how the finished product is presented under your own brand.',
  },
  {
    question: 'Why should a brand add perfume to its product line?',
    answer:
      'Perfume can be a high-margin, giftable product that strengthens brand memory, creates repeat purchases, and extends your brand into a premium category without requiring you to build fragrance manufacturing from scratch.',
  },
  {
    question: 'Does Brandsamor ship private label perfume worldwide?',
    answer:
      'Yes — Brandsamor initially serves customers worldwide, subject to destination, product, logistics and compliance requirements.',
  },
];

export const PROCESS_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How long does the full private label process take?',
    answer:
      'Typical production takes approximately 3-6 weeks after fragrance, packaging, artwork and production details have been approved. Sampling and approvals before production can add time depending on your pace.',
  },
  {
    question: 'Do I need to finalize every detail before starting?',
    answer:
      'No. You need a clear audience, product idea, and rough quantity range to begin. Logo files, exact label artwork, and packaging preferences can be refined as you move through samples and pre-production approval.',
  },
  {
    question: 'What happens after I approve the production sample?',
    answer:
      'Once you sign off on scent, bottle, cap, label, and packaging, Brandsamor moves into filling, finishing, quality checks, and batch documentation before your finished perfumes are packed for delivery.',
  },
  {
    question: 'Can I change bottle or packaging choices later?',
    answer:
      'Yes, but changes are easiest before production approval. For repeat orders, you can refine packaging, add new scents, or adjust product formats once you know what customers respond to.',
  },
  {
    question: 'What if I only want to start with scent samples?',
    answer:
      'That is the recommended starting point. Complete the sampling brief, receive five curated fragrances, and compare them on skin before committing to production with more confidence.',
  },
  {
    question: 'Who approves the final product before shipping?',
    answer:
      'You do. Brandsamor prepares a production sample for your review so you can confirm the scent, look, and packaging match your brand before the full batch is filled and shipped.',
  },
];
