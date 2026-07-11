import type { PageMetadata } from '../../seo/pageMetadata';

const CANONICAL_ORIGIN = 'https://www.brandsamor.com';
const DEFAULT_ROBOTS = 'index, follow';

const canonical = (path: string) => `${CANONICAL_ORIGIN}${path}`;

const page = (
  path: string,
  pageName: string,
  title: string,
  description: string,
  h1: string,
  includeServiceSchema = true,
): PageMetadata => ({
  path,
  pageName,
  title,
  description,
  canonical: canonical(path),
  h1,
  robots: DEFAULT_ROBOTS,
  includeServiceSchema,
  includeHomeGraph: false,
});

/** Phase 4 new commercial / geo / product / audience / comparison pages. */
export const NEW_PAGE_METADATA: Record<string, PageMetadata> = {
  // ——— Money pages ———
  '/white-label-perfume-supplier': page(
    '/white-label-perfume-supplier',
    'White Label Perfume Supplier',
    'White Label Perfume Supplier | Brandsamor',
    'Source white label perfume with your branding. Fast, lower-cost fragrance launches from $10/unit with MOQ from 100 and sampling before production.',
    'White Label Perfume Supplier for Fast Brand Launches',
  ),
  '/low-moq-perfume-manufacturer': page(
    '/low-moq-perfume-manufacturer',
    'Low MOQ Perfume Manufacturer',
    'Low MOQ Perfume Manufacturer | Brandsamor',
    'Low MOQ perfume manufacturing from 100 units. Sample first, then produce branded fragrance with packaging, filling and quality checks from $10/unit.',
    'Low MOQ Perfume Manufacturer Starting at 100 Units',
  ),
  '/contract-perfume-manufacturing': page(
    '/contract-perfume-manufacturing',
    'Contract Perfume Manufacturing',
    'Contract Perfume Manufacturing | Brandsamor',
    'Scale with contract perfume manufacturing — filling, packaging and quality coordination for brands ready to grow beyond a first private label batch.',
    'Contract Perfume Manufacturing for Scaling Brands',
  ),
  '/private-label-perfume-oil-manufacturer': page(
    '/private-label-perfume-oil-manufacturer',
    'Private Label Perfume Oil Manufacturer',
    'Private Label Perfume Oil Manufacturer | Brandsamor',
    'Launch private label perfume oils and attar-style formats with sampling, bottles, branding, filling and documentation — MOQ from 100 units.',
    'Private Label Perfume Oil Manufacturer',
  ),
  '/perfume-filling-services': page(
    '/perfume-filling-services',
    'Perfume Filling Services',
    'Perfume Filling Services | Brandsamor',
    'Contract perfume filling services for brands that already have a formula — filling, finishing, packaging coordination and quality checks.',
    'Perfume Filling Services for Existing Formulas',
  ),
  '/private-label-perfume-pricing': page(
    '/private-label-perfume-pricing',
    'Private Label Perfume Pricing',
    'Private Label Perfume Pricing | Brandsamor',
    'Private label perfume pricing starts from $10 per unit with MOQ from 100. See what drives cost: format, bottle, decoration, packaging and quantity.',
    'Private Label Perfume Pricing: What Drives Unit Cost',
  ),
  '/perfume-moq-guide': page(
    '/perfume-moq-guide',
    'Perfume MOQ Guide',
    'Perfume MOQ Guide | Brandsamor',
    'Perfume MOQ explained: Brandsamor production starts at 100 units. Learn how format, packaging and decoration affect minimums and first-batch planning.',
    'Perfume MOQ Guide: Minimum Orders Explained',
  ),
  '/best-private-label-perfume-manufacturers': page(
    '/best-private-label-perfume-manufacturers',
    'Best Private Label Perfume Manufacturers',
    'Best Private Label Perfume Manufacturers | Brandsamor',
    'An honest guide to choosing private label perfume manufacturers — including when Brandsamor fits (low-MOQ launches) and when another model may suit better.',
    'Best Private Label Perfume Manufacturers: How to Choose',
  ),

  // ——— Geo pages ———
  '/private-label-perfume-manufacturer-uae': page(
    '/private-label-perfume-manufacturer-uae',
    'Private Label Perfume Manufacturer UAE',
    'Private Label Perfume Manufacturer UAE | Brandsamor',
    'Private label perfume manufacturer for UAE brands — oud and attar demand, Dubai/Sharjah context, sampling, packaging and WhatsApp-first support.',
    'Private Label Perfume Manufacturer for the UAE',
  ),
  '/private-label-perfume-manufacturer-saudi-arabia': page(
    '/private-label-perfume-manufacturer-saudi-arabia',
    'Private Label Perfume Manufacturer Saudi Arabia',
    'Private Label Perfume Manufacturer KSA | Brandsamor',
    'Private label perfume manufacturer for Saudi Arabia — SFDA-aware support, halal options, oud and bakhoor demand, with WhatsApp project coordination.',
    'Private Label Perfume Manufacturer for Saudi Arabia',
  ),
  '/private-label-perfume-manufacturer-uk': page(
    '/private-label-perfume-manufacturer-uk',
    'Private Label Perfume Manufacturer UK',
    'Private Label Perfume Manufacturer UK | Brandsamor',
    'Private label perfume manufacturer for UK brands — SCPN/Responsible Person context, sampling, packaging, production coordination and GBP-aware planning.',
    'Private Label Perfume Manufacturer for the UK',
  ),
  '/private-label-perfume-manufacturer-germany': page(
    '/private-label-perfume-manufacturer-germany',
    'Private Label Perfume Manufacturer Germany',
    'Private Label Perfume Manufacturer Germany | Brandsamor',
    'Private label perfume manufacturer for Germany — EU CPNP context, Responsible Person considerations, clean/vegan demand and production coordination.',
    'Private Label Perfume Manufacturer for Germany',
  ),

  // ——— Product-type pages ———
  '/private-label-attar-manufacturer': page(
    '/private-label-attar-manufacturer',
    'Private Label Attar Manufacturer',
    'Private Label Attar Manufacturer | Brandsamor',
    'Private label attar and perfume oil manufacturing with sampling, bottles, branding and low MOQ from 100 units — strong fit for GCC and oil-first brands.',
    'Private Label Attar Manufacturer',
  ),
  '/private-label-oud-perfume-manufacturer': page(
    '/private-label-oud-perfume-manufacturer',
    'Private Label Oud Perfume Manufacturer',
    'Oud Perfume Manufacturer | Brandsamor',
    'Private label oud perfume manufacturing for Middle East and global brands — sampling, packaging, filling and documentation with MOQ from 100 units.',
    'Private Label Oud Perfume Manufacturer',
  ),
  '/arabic-perfume-manufacturer': page(
    '/arabic-perfume-manufacturer',
    'Arabic Perfume Manufacturer',
    'Arabic Perfume Manufacturer | Brandsamor',
    'Arabic perfume manufacturer for oud, attar and oriental fragrance lines — private label sampling, packaging and production coordination from 100 units.',
    'Arabic Perfume Manufacturer for Private Label Brands',
  ),
  '/halal-perfume-manufacturer': page(
    '/halal-perfume-manufacturer',
    'Halal Perfume Manufacturer',
    'Halal Perfume Manufacturer | Brandsamor',
    'Halal perfume manufacturer support for private label brands — alcohol-aware options, documentation pathways and packaging for GCC and Muslim-majority markets.',
    'Halal Perfume Manufacturer for Private Label Brands',
  ),
  '/vegan-clean-perfume-manufacturer': page(
    '/vegan-clean-perfume-manufacturer',
    'Vegan Clean Perfume Manufacturer',
    'Vegan Clean Perfume Manufacturer | Brandsamor',
    'Vegan and clean fragrance manufacturing for private label brands — sample-first launches, transparent documentation and packaging that matches your claims.',
    'Vegan & Clean Perfume Manufacturer',
  ),
  '/private-label-body-mist-manufacturer': page(
    '/private-label-body-mist-manufacturer',
    'Private Label Body Mist Manufacturer',
    'Private Label Body Mist Manufacturer | Brandsamor',
    'Private label body mist manufacturer for beauty and lifestyle brands — lighter formats, accessible pricing from $10/unit and MOQ from 100 units.',
    'Private Label Body Mist Manufacturer',
  ),
  '/private-label-room-spray-manufacturer': page(
    '/private-label-room-spray-manufacturer',
    'Private Label Room Spray Manufacturer',
    'Private Label Room Spray Manufacturer | Brandsamor',
    'Private label room spray manufacturer for home, spa and hospitality brands — scent worlds beyond skin fragrance with packaging and filling support.',
    'Private Label Room Spray Manufacturer',
  ),
  '/private-label-car-freshener-manufacturer': page(
    '/private-label-car-freshener-manufacturer',
    'Private Label Car Freshener Manufacturer',
    'Private Label Car Freshener Manufacturer | Brandsamor',
    'Private label car freshener manufacturer for automotive, fleet and lifestyle brands — branded scent products with practical MOQs from 100 units.',
    'Private Label Car Freshener Manufacturer',
  ),
  '/eau-de-parfum-manufacturer': page(
    '/eau-de-parfum-manufacturer',
    'Eau de Parfum Manufacturer',
    'Eau de Parfum Manufacturer | Brandsamor',
    'Eau de parfum manufacturer for private label brands — EDP as your hero SKU with sampling, bottles, packaging, filling and quality checks from 100 units.',
    'Eau de Parfum Manufacturer for Brand Launches',
  ),
  '/niche-perfume-manufacturer': page(
    '/niche-perfume-manufacturer',
    'Niche Perfume Manufacturer',
    'Niche Perfume Manufacturer | Brandsamor',
    'Niche perfume manufacturer path for distinctive brand stories — private label or custom direction, premium packaging and documentation-aware production.',
    'Niche Perfume Manufacturer for Distinctive Brands',
  ),
  '/private-label-cologne-manufacturer': page(
    '/private-label-cologne-manufacturer',
    'Private Label Cologne Manufacturer',
    'Private Label Cologne Manufacturer | Brandsamor',
    'Private label cologne and men\'s fragrance manufacturing — sampling, packaging and production for masculine lines with MOQ from 100 units.',
    'Private Label Cologne & Men\'s Fragrance Manufacturer',
  ),

  // ——— Audience pages ———
  '/perfume-manufacturer-for-amazon-sellers': page(
    '/perfume-manufacturer-for-amazon-sellers',
    'Perfume Manufacturer for Amazon Sellers',
    'Perfume Manufacturer for Amazon Sellers | Brandsamor',
    'Perfume manufacturer for Amazon sellers — private label fragrance with packaging that photographs well, practical MOQs and documentation for online retail.',
    'Perfume Manufacturer for Amazon Sellers',
  ),
  '/perfume-line-for-influencers-creators': page(
    '/perfume-line-for-influencers-creators',
    'Perfume Line for Influencers & Creators',
    'Perfume Line for Influencers | Brandsamor',
    'Launch a perfume line as an influencer or creator — curated sampling, brandable packaging and low MOQ private label production from 100 units.',
    'Perfume Line for Influencers and Creators',
  ),
  '/private-label-perfume-for-boutiques': page(
    '/private-label-perfume-for-boutiques',
    'Private Label Perfume for Boutiques',
    'Private Label Perfume for Boutiques | Brandsamor',
    'Private label perfume for boutiques and retailers — exclusive-feeling scents, gift-ready packaging and reorder-friendly production from 100 units.',
    'Private Label Perfume for Boutiques',
  ),
  '/hotel-signature-scent-manufacturer': page(
    '/hotel-signature-scent-manufacturer',
    'Hotel Signature Scent Manufacturer',
    'Hotel Signature Scent Manufacturer | Brandsamor',
    'Hotel signature scent manufacturer for amenities, retail and brand atmosphere — private label fragrance coordinated with hospitality packaging needs.',
    'Hotel Signature Scent Manufacturer',
  ),
  '/salon-spa-private-label-fragrance': page(
    '/salon-spa-private-label-fragrance',
    'Salon & Spa Private Label Fragrance',
    'Salon Spa Private Label Fragrance | Brandsamor',
    'Salon and spa private label fragrance — retail bottles, treatment-room scent and branded take-home products with MOQ from 100 units.',
    'Salon & Spa Private Label Fragrance',
  ),
  '/corporate-gifting-perfume-supplier': page(
    '/corporate-gifting-perfume-supplier',
    'Corporate Gifting Perfume Supplier',
    'Corporate Gifting Perfume Supplier | Brandsamor',
    'Corporate gifting perfume supplier for branded sets, client gifts and employee rewards — custom packaging and reliable production coordination.',
    'Corporate Gifting Perfume Supplier',
  ),
  '/private-label-perfume-for-fashion-brands': page(
    '/private-label-perfume-for-fashion-brands',
    'Private Label Perfume for Fashion Brands',
    'Private Label Perfume for Fashion Brands | Brandsamor',
    'Private label perfume for fashion brands — extend apparel into fragrance with packaging that matches your aesthetic and MOQ from 100 units.',
    'Private Label Perfume for Fashion Brands',
  ),
  '/private-label-perfume-for-skincare-beauty-brands': page(
    '/private-label-perfume-for-skincare-beauty-brands',
    'Private Label Perfume for Skincare Brands',
    'Perfume for Skincare Beauty Brands | Brandsamor',
    'Add fragrance to a skincare or beauty brand with private label perfume — coherent scent stories, packaging and documentation-aware production.',
    'Private Label Perfume for Skincare & Beauty Brands',
  ),

  // ——— Comparison pages ———
  '/private-label-vs-white-label-perfume': page(
    '/private-label-vs-white-label-perfume',
    'Private Label vs White Label Perfume',
    'Private Label vs White Label Perfume | Brandsamor',
    'Private label vs white label perfume compared — scent control, packaging, MOQ, cost and which model fits testing versus building a lasting brand.',
    'Private Label vs White Label Perfume: Which Fits?',
  ),
  '/us-vs-china-vs-europe-perfume-manufacturing': page(
    '/us-vs-china-vs-europe-perfume-manufacturing',
    'US vs China vs Europe Perfume Manufacturing',
    'US vs China vs Europe Perfume Manufacturing | Brandsamor',
    'Compare US, China and Europe perfume manufacturing trade-offs — cost, lead time, compliance support and when a coordinated private label partner fits.',
    'US vs China vs Europe Perfume Manufacturing',
  ),
  '/brandsamor-vs-alibaba-perfume-suppliers': page(
    '/brandsamor-vs-alibaba-perfume-suppliers',
    'Brandsamor vs Alibaba Perfume Suppliers',
    'Brandsamor vs Alibaba Perfume Suppliers | Brandsamor',
    'Honest comparison of Brandsamor vs Alibaba perfume suppliers — speed, risk, branding support, MOQ and when a marketplace listing is enough.',
    'Brandsamor vs Alibaba Perfume Suppliers',
  ),
};

export const NEW_PAGE_PATHS = Object.keys(NEW_PAGE_METADATA);
