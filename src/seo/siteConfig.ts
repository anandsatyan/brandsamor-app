export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://brandsamor.com';

export const SITE_NAME = 'Brandsamor Launch Studio';

export const DEFAULT_TITLE = 'Start Your Own Perfume Line | Brandsamor Private Label';

export const DEFAULT_DESCRIPTION =
  'Launch a ready-to-sell private label perfume line in weeks. Brandsamor handles scent selection, bottles, packaging, filling, and quality checks for beauty brands, retailers, creators, and hotels.';

export const ORGANIZATION = {
  name: 'Brandsamor',
  legalName: 'Packamor LLC',
  phone: '+1-848-220-1353',
  email: 'info@brandsamor.com',
  address: {
    streetAddress: '11118 S Governors Ave',
    addressLocality: 'Dover',
    addressRegion: 'DE',
    postalCode: '19904',
    addressCountry: 'US',
  },
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
      'Start by sampling scents from the Brandsamor scent library, choose one or a small set of fragrances to launch with, customize your bottle and packaging, then receive a finished batch within weeks. Brandsamor handles sourcing, filling, packaging, and quality checks so you can focus on selling.',
  },
  {
    question: 'Who is private label perfume best for?',
    answer:
      'Private label perfume works well for beauty and skincare brands, creators and influencers, boutiques, hotels and spas, salons, candle and home fragrance brands, and corporate gifting companies that want a premium branded product without building their own factory.',
  },
  {
    question: 'How long does it take to launch a branded perfume?',
    answer:
      'Most brands can move from scent selection to a ready-to-sell first batch in weeks, not months. Timelines depend on scent choice, packaging customization, and batch size, but Brandsamor is built for faster launches than traditional private label setups.',
  },
  {
    question: 'Do I need my own perfume factory to sell under my brand?',
    answer:
      'No. Brandsamor handles production, filling, packaging, and quality checks for you. That means you can launch a branded fragrance line without investing in manufacturing equipment, factory setup, or in-house production staff.',
  },
  {
    question: 'Can I order perfume samples before placing a bulk order?',
    answer:
      'Yes. Brandsamor is designed so you can order samples first, compare scent options, and confirm the direction that fits your brand before committing to your first production batch.',
  },
  {
    question: 'What packaging options are available for private label perfume?',
    answer:
      'You can customize bottle shape and size, cap and spray hardware, label design, screen printing, color direction, boxes, inserts, and gift packaging so the finished product looks aligned with your brand and price point.',
  },
  {
    question: 'What compliance support does Brandsamor provide for fragrance products?',
    answer:
      'Compliance needs vary by product type, market, and sales channel. Where applicable, Brandsamor can support documentation such as FDA MoCRA registration guidance, GMP-compliant production, Certificates of Analysis, IFRA certificates, allergen information, and batch records.',
  },
  {
    question: 'What is the minimum order quantity for a private label perfume launch?',
    answer:
      'Minimum order quantities depend on the bottle, packaging, and scent you choose. Brandsamor is built to help brands start with a focused first batch, test customer demand, and expand the line over time rather than requiring a large factory-scale launch on day one.',
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
      'Brandsamor supports brands launching fragrance products with worldwide shipping options. Exact shipping availability and lead times depend on your order details and destination.',
  },
];
