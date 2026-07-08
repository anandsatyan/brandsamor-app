export type ProcessStageImage = {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  focalPoint?: string;
};

export type ProcessStage = {
  number: string;
  id: string;
  eyebrow?: string;
  title: string;
  summary: string;
  details?: string[];
  qualityChecks?: string[];
  customerApproval?: string;
  cautiousNote?: string;
  transparentNote?: string;
  output?: string;
  image?: ProcessStageImage;
};

export type ApprovalCheckpoint = {
  step: string;
  title: string;
  description: string;
};

export type QualityMatrixRow = {
  stage: string;
  checked: string;
  why: string;
};

export type BatchProcessFaqItem = {
  question: string;
  answer: string;
};

export const BATCH_PROCESS_OVERVIEW_STEPS = [
  'Approved specification',
  'Component preparation',
  'Fragrance preparation',
  'Filling and closure',
  'Branding and finishing',
  'Quality inspection',
  'Packing and dispatch preparation',
] as const;

export const batchProcessStages: ProcessStage[] = [
  {
    number: '01',
    id: 'production-specification',
    eyebrow: 'THE CONTROL DOCUMENT',
    title: 'Confirm the Approved Product Specification',
    summary:
      'Before production begins, the approved scent, bottle, cap, spray, label, box and finishing requirements are consolidated into one production specification.',
    details: [
      'Approved fragrance reference',
      'Product format and fill quantity',
      'Bottle, cap and spray combination',
      'Label or print specifications',
      'Box and packing requirements',
      'Batch and coding requirements where applicable',
    ],
    customerApproval:
      'Production should begin only after the customer-approved product details are clear and documented.',
    output: 'Approved production specification',
    image: undefined,
  },
  {
    number: '02',
    id: 'component-readiness',
    eyebrow: 'BEFORE FILLING',
    title: 'Prepare and Check the Components',
    summary:
      'Bottles, pumps, caps, labels and boxes must be available and suitable for the approved product before filling begins.',
    details: [
      'Bottle and closure matching',
      'Spray and crimp compatibility',
      'Visual finish checks',
      'Label and box readiness',
      'Quantity verification',
      'Packing-material preparation',
    ],
    qualityChecks: [
      'Visible component defects',
      'Incorrect finishes or colours',
      'Closure compatibility',
      'Print and packaging consistency',
    ],
    output: 'Components cleared for production',
    image: undefined,
  },
  {
    number: '03',
    id: 'fragrance-preparation',
    eyebrow: 'THE PRODUCT INSIDE',
    title: 'Prepare the Fragrance for Filling',
    summary:
      'The approved fragrance is prepared according to the selected product format and production requirements before it enters the filling stage.',
    details: [
      'Approved fragrance reference',
      'Selected product format',
      'Batch preparation',
      'Controlled handling and storage',
      'Batch identification',
      'Supporting documentation where applicable',
    ],
    cautiousNote:
      'The exact preparation process and available documentation depend on the fragrance, product format and production partner.',
    output: 'Prepared fragrance batch',
    image: undefined,
  },
  {
    number: '04',
    id: 'filling',
    eyebrow: 'CONTROLLED DOSING',
    title: 'Fill Each Bottle to the Required Level',
    summary:
      'The prepared fragrance is filled into the approved bottles using the production method appropriate for the format, volume and batch size.',
    details: [
      'Bottle presentation and handling',
      'Controlled filling',
      'Fill-level consistency',
      'Spill and contamination controls',
      'In-process quantity checks',
    ],
    qualityChecks: [
      'Fill-level consistency',
      'Bottle cleanliness',
      'Visible product condition',
      'Batch identification',
    ],
    output: 'Filled bottles ready for closure',
    image: undefined,
  },
  {
    number: '05',
    id: 'closure-assembly',
    eyebrow: 'SEAL AND FUNCTION',
    title: 'Apply the Spray, Crimp and Cap',
    summary:
      'The approved closure system is applied so the bottle seals correctly and delivers the intended spray experience.',
    details: [
      'Spray-pump insertion',
      'Crimping or closure application',
      'Collar placement where applicable',
      'Cap fitting',
      'Functional inspection',
    ],
    qualityChecks: [
      'Closure security',
      'Visible crimp consistency',
      'Leakage indicators',
      'Spray operation',
      'Cap fit and alignment',
    ],
    output: 'Closed and function-checked bottles',
    image: undefined,
  },
  {
    number: '06',
    id: 'branding-finishing',
    eyebrow: 'MAKE IT YOUR PRODUCT',
    title: 'Apply Labels, Printing and Finishing',
    summary:
      'Approved branding is applied to the bottle and packaging according to the selected decoration method.',
    details: [
      'Label application',
      'Screen printing where applicable',
      'Decorative finishes',
      'Batch coding where required',
      'Box assembly',
      'Product insertion',
    ],
    qualityChecks: [
      'Label alignment',
      'Print clarity',
      'Colour consistency',
      'Box finish',
      'Correct product-to-box matching',
    ],
    output: 'Branded products ready for final inspection',
    image: undefined,
  },
  {
    number: '07',
    id: 'quality-inspection',
    eyebrow: 'BEFORE PACKING',
    title: 'Inspect the Finished Batch',
    summary:
      'The finished products are reviewed against the approved specification before they are packed for shipment.',
    details: [
      'Visual appearance',
      'Fill-level review',
      'Spray-function sampling',
      'Closure and cap review',
      'Label and print placement',
      'Box and packing review',
      'Quantity reconciliation',
    ],
    transparentNote:
      'Inspection methods and sampling levels depend on the project, production partner and agreed quality process.',
    output: 'Finished batch cleared for packing',
    image: undefined,
  },
  {
    number: '08',
    id: 'packing-dispatch',
    eyebrow: 'READY TO MOVE',
    title: 'Pack the Finished Products for Delivery',
    summary:
      'Finished products are packed to reduce movement and damage during handling and transportation.',
    details: [
      'Inner product protection',
      'Carton packing',
      'Quantity marking',
      'Shipment preparation',
      'Export or delivery documentation where applicable',
      'Dispatch coordination',
    ],
    qualityChecks: [
      'Carton condition',
      'Product count',
      'Packing stability',
      'Shipping-label accuracy',
      'Required documentation',
    ],
    output: 'Packed batch prepared for dispatch',
    image: undefined,
  },
];

export const approvalCheckpoints: ApprovalCheckpoint[] = [
  {
    step: '01',
    title: 'Fragrance sample approval',
    description: 'Confirm the scent direction before packaging and production decisions advance.',
  },
  {
    step: '02',
    title: 'Bottle and component approval',
    description: 'Approve bottle shape, cap, spray hardware and component finishes.',
  },
  {
    step: '03',
    title: 'Artwork approval',
    description: 'Sign off label, print and box artwork before decoration and packing.',
  },
  {
    step: '04',
    title: 'Production-sample approval',
    description: 'Review a physical sample that reflects the approved product specification.',
  },
  {
    step: '05',
    title: 'Bulk production release',
    description: 'Release the batch for filling and finishing once the sample matches expectations.',
  },
];

export const qualityControlMatrix: QualityMatrixRow[] = [
  {
    stage: 'Components',
    checked: 'Finish, colour, compatibility and visible defects',
    why: 'Prevents filling issues and inconsistent shelf presentation',
  },
  {
    stage: 'Filling',
    checked: 'Fill level, cleanliness and batch identification',
    why: 'Protects product consistency and customer trust',
  },
  {
    stage: 'Closure',
    checked: 'Crimp security, cap fit and leakage indicators',
    why: 'Ensures the bottle seals and functions as intended',
  },
  {
    stage: 'Spray function',
    checked: 'Spray pattern, operation and hardware alignment',
    why: 'Confirms the product performs in daily use',
  },
  {
    stage: 'Branding',
    checked: 'Label alignment, print clarity and colour consistency',
    why: 'Keeps the finished product aligned with approved artwork',
  },
  {
    stage: 'Packaging',
    checked: 'Box finish, product matching and insert fit',
    why: 'Supports retail-ready presentation and safe handling',
  },
  {
    stage: 'Final packing',
    checked: 'Carton condition, counts, stability and shipping labels',
    why: 'Reduces transit damage and dispatch errors',
  },
];

export const batchDocumentationItems = [
  'IFRA documentation',
  'Certificate of Analysis',
  'Allergen information',
  'Batch identification',
  'Production or QC records',
  'Packing records',
  'Export documentation where applicable',
] as const;

export const brandsamorCoordinates = [
  'Product specification',
  'Fragrance and packaging selection',
  'Sampling and approvals',
  'Production communication',
  'Quality checkpoints',
  'Packing and delivery preparation',
] as const;

export const specialistPartnerTasks = [
  'Fragrance preparation',
  'Bottle and component production',
  'Filling and closure',
  'Printing and decoration',
  'Box manufacturing',
  'Market-specific testing or documentation',
] as const;

export const BATCH_PROCESS_FAQ: BatchProcessFaqItem[] = [
  {
    question: 'How is perfume filled?',
    answer:
      'Perfume is filled into approved bottles using a production method matched to the product format, volume and batch size. Fill levels are checked during production to support consistency before closures are applied.',
  },
  {
    question: 'How are perfume bottles sealed?',
    answer:
      'After filling, the approved spray pump is inserted, crimped or otherwise secured, and the cap is fitted. Functional checks help confirm closure integrity and spray performance before branding and packing.',
  },
  {
    question: 'What quality checks happen during perfume production?',
    answer:
      'Checks may include component inspection, fill-level review, closure security, spray-function sampling, label alignment, box condition and final packing review. The exact inspection process depends on the project and agreed quality process.',
  },
  {
    question: 'What documents may support a batch?',
    answer:
      'Documents such as IFRA information, Certificates of Analysis, allergen information and batch records may be available depending on the fragrance, production partner and project requirements. Not every document applies to every project.',
  },
  {
    question: 'Does Brandsamor own the production facility?',
    answer:
      'Brandsamor coordinates private-label fragrance projects through qualified fragrance, filling, packaging and finishing partners. The exact production setup depends on the product, quantity, components and destination requirements.',
  },
  {
    question: 'Can I approve a finished sample before bulk production?',
    answer:
      'Yes. A production sample can be used to confirm the approved scent, bottle, closure, branding and packaging before the bulk batch is released.',
  },
  {
    question: 'What quality checks are performed?',
    answer:
      'Checks may include component inspection, fill-level consistency, closure integrity, spray function, branding alignment, box condition and final packing review. The exact inspection process depends on the project.',
  },
  {
    question: 'Can Brandsamor provide batch documents?',
    answer:
      'Documents such as IFRA information, Certificates of Analysis, allergen information and batch records may be available depending on the fragrance, production partner and project requirements.',
  },
  {
    question: 'How long does production take?',
    answer:
      'Typical production takes approximately 3–6 weeks after the fragrance, packaging, artwork and production details have been approved. Complex decoration or custom components may require additional time.',
  },
  {
    question: 'Can I provide my own bottle or fragrance formula?',
    answer:
      'This may be possible depending on compatibility, documentation, quantity and production requirements. Brandsamor should review customer-supplied components or formulas before confirming production.',
  },
];

export const getConfiguredProcessImages = () =>
  batchProcessStages
    .filter((stage): stage is ProcessStage & { image: ProcessStageImage } => Boolean(stage.image))
    .map((stage) => ({
      src: stage.image.src,
      alt: stage.image.alt,
      caption: stage.image.caption,
      aspectRatio: stage.image.aspectRatio,
      focalPoint: stage.image.focalPoint,
      stageTitle: stage.title,
    }));
