import type { ComparisonColumn, ComparisonRow } from '../components/ComparisonTable';

type ComparisonTableData = {
  id: string;
  title: string;
  description?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
};

export const privateLabelComparison: ComparisonTableData = {
  id: 'private-label-vs-white-label-vs-custom',
  title: 'Private Label vs White Label Perfume',
  description:
    'Compare private label, white label and custom fragrance models — scent choice, packaging, development time and complexity.',
  columns: [
    { key: 'private', label: 'Private label' },
    { key: 'white', label: 'White label' },
    { key: 'custom', label: 'Custom fragrance' },
  ],
  rows: [
    {
      label: 'Scent choice',
      values: {
        private: 'Five fragrances curated from a brief about your business and customers',
        white: 'Limited to pre-made scents with minimal variation',
        custom: 'Bespoke formula developed for your brand',
      },
    },
    {
      label: 'Formula customization',
      values: {
        private: 'Select from library scents; limited adjustments may be possible',
        white: 'Minimal or no formula changes',
        custom: 'Full creative control over accords and composition',
      },
    },
    {
      label: 'Packaging choice',
      values: {
        private: 'Broad bottle, cap, label and box options',
        white: 'Often restricted to supplier stock formats',
        custom: 'Full packaging direction with your brand requirements',
      },
    },
    {
      label: 'Development time',
      values: {
        private: 'Weeks after approvals — typical production 3-6 weeks',
        white: 'Fastest path when stock formats fit',
        custom: 'Longer due to formula development and testing',
      },
    },
    {
      label: 'Complexity',
      values: {
        private: 'Moderate — sampling and packaging decisions',
        white: 'Lowest — limited choices at each step',
        custom: 'Highest — formula, compliance and packaging alignment',
      },
    },
    {
      label: 'Best use',
      values: {
        private: 'Brands launching a credible first fragrance line quickly',
        white: 'Fast tests or limited-branding add-ons',
        custom: 'Established brands investing in a signature scent identity',
      },
    },
  ],
};

export const oneScentVsCollectionComparison: ComparisonTableData = {
  id: 'one-scent-vs-collection',
  title: 'Launching One Scent vs a Collection',
  description:
    'Most brands start focused. Compare complexity, inventory, customer choice and testing value before expanding.',
  columns: [
    { key: 'one', label: 'One hero scent' },
    { key: 'collection', label: 'Small collection' },
  ],
  rows: [
    {
      label: 'Complexity',
      values: {
        one: 'Simplest path — one scent, one format, one packaging setup',
        collection: 'More decisions across scents, SKUs and packaging variants',
      },
    },
    {
      label: 'Inventory',
      values: {
        one: 'Lower upfront inventory and packaging tooling',
        collection: 'Higher inventory spread across multiple SKUs',
      },
    },
    {
      label: 'Customer choice',
      values: {
        one: 'Clear single product story for your audience',
        collection: 'More options for different moods, seasons or segments',
      },
    },
    {
      label: 'Testing value',
      values: {
        one: 'Fastest way to validate demand before expanding',
        collection: 'Useful when you already know distinct customer segments',
      },
    },
    {
      label: 'Best use',
      values: {
        one: 'First launch, new categories, or focused brand extensions',
        collection: 'Brands with proven demand or distinct scent wardrobes',
      },
    },
  ],
};

export const fragranceFormatsComparison: ComparisonTableData = {
  id: 'compare-fragrance-formats',
  title: 'Compare Fragrance Product Formats',
  description:
    'Match format to your audience, channel and price point. Exact minimum quantities vary by format and packaging.',
  columns: [
    { key: 'edp', label: 'Eau de parfum' },
    { key: 'oil', label: 'Perfume oil' },
    { key: 'mist', label: 'Body mist' },
    { key: 'room', label: 'Room spray' },
    { key: 'travel', label: 'Travel perfume' },
  ],
  rows: [
    {
      label: 'Typical use',
      values: {
        edp: 'Signature retail and e-commerce hero product',
        oil: 'Portable, concentrated, often alcohol-free wear',
        mist: 'Light everyday scent and broader reach',
        room: 'Home, spa and hospitality environments',
        travel: 'Trial, gifting and on-the-go use',
      },
    },
    {
      label: 'Application format',
      values: {
        edp: 'Spray atomizer',
        oil: 'Roll-on or dab applicator',
        mist: 'Fine spray mist',
        room: 'Room or fabric spray',
        travel: 'Compact spray or roller',
      },
    },
    {
      label: 'Positioning',
      values: {
        edp: 'Premium core fragrance',
        oil: 'Wellness, clean beauty or intimate wear',
        mist: 'Accessible, casual fragrance',
        room: 'Home fragrance and brand scent world',
        travel: 'Discovery, gift-with-purchase or amenities',
      },
    },
    {
      label: 'Packaging',
      values: {
        edp: 'Full-size glass bottle with retail box',
        oil: 'Smaller vials or rollers with compact boxes',
        mist: 'Lighter bottles suited to larger volumes',
        room: 'Spray bottles for home use',
        travel: 'Compact bottles or mini sets',
      },
    },
    {
      label: 'Best use',
      values: {
        edp: 'First launch hero scent for most brands',
        oil: 'Wellness brands and alcohol-free positioning',
        mist: 'Younger audiences and entry price points',
        room: 'Hotels, spas and home fragrance extensions',
        travel: 'Sampling, gifting and hotel retail',
      },
    },
  ],
};

export const stockVsCustomPackagingComparison: ComparisonTableData = {
  id: 'stock-vs-custom-packaging',
  title: 'Stock Packaging vs Custom Packaging',
  description:
    'Choose the packaging path that balances speed, flexibility and brand differentiation for your launch.',
  columns: [
    { key: 'stock', label: 'Stock packaging' },
    { key: 'custom', label: 'Custom packaging' },
  ],
  rows: [
    {
      label: 'Flexibility',
      values: {
        stock: 'Proven bottle and box formats with faster decisions',
        custom: 'More control over shape, print, finish and unboxing',
      },
    },
    {
      label: 'Lead time',
      values: {
        stock: 'Generally shorter setup for first launches',
        custom: 'Longer when new tooling or bespoke boxes are required',
      },
    },
    {
      label: 'Minimum quantity',
      values: {
        stock: 'Often lower entry for first production projects',
        custom: 'May require higher quantities for bespoke components',
      },
    },
    {
      label: 'Customization',
      values: {
        stock: 'Labels, printing and finishing on established formats',
        custom: 'Unique shapes, closures, inserts and print details',
      },
    },
    {
      label: 'Tooling',
      values: {
        stock: 'Little or no new tooling for standard components',
        custom: 'May involve custom molds, dies or box structures',
      },
    },
    {
      label: 'Best use',
      values: {
        stock: 'Focused first launches that need speed and clarity',
        custom: 'Premium positioning or strong retail differentiation',
      },
    },
  ],
};
