/**
 * Sampling funnel drop-off stats from session stepHistory + answers.
 * Steps mirror the curated sampling wizard; questions are fields within those steps.
 */

const FUNNEL_STEPS = [
  { key: 'contact', label: 'Contact details', stepIndex: 1 },
  { key: 'brand', label: 'Brand stage', stepIndex: 2 },
  { key: 'scent', label: 'Scent direction', stepIndex: 3 },
  { key: 'experience', label: 'Intensity & use', stepIndex: 4 },
  { key: 'preferences', label: 'Preferences', stepIndex: 5 },
  { key: 'review', label: 'Review brief', stepIndex: 6 },
  { key: 'curation', label: 'Curation', stepIndex: 7 },
  { key: 'results', label: 'Results (kit)', stepIndex: 8 },
  { key: 'checkout', label: 'Checkout', stepIndex: 10 },
  { key: 'paid', label: 'Paid', stepIndex: 11 },
];

const HISTORY_ALIASES = {
  contact: 'contact',
  brand: 'brand',
  scent: 'scent',
  experience: 'experience',
  preferences: 'preferences',
  review: 'review',
  curation: 'curation',
  results: 'results',
  checkout: 'checkout',
  checkout_started: 'checkout',
  paid: 'paid',
};

/** Value → display label for discrete sampling choices (mirrors client LABEL_MAP). */
const OPTION_LABELS = {
  exploring: 'Exploring a fragrance idea',
  'first-launch': 'Preparing for my first launch',
  'adding-fragrance': 'Adding fragrance to an existing brand',
  reworking: 'Reworking or expanding an existing fragrance line',
  recommend: 'Brandsamor will recommend for you',
  fashion: 'Fashion boutique or apparel brand',
  beauty: 'Beauty or skincare brand',
  salon: 'Salon or spa',
  wellness: 'Wellness or lifestyle brand',
  creator: 'Creator or personal brand',
  hospitality: 'Hospitality, gifting, or events',
  standalone: 'Standalone fragrance brand',
  other: 'Other',
  unsure: "I'm not sure",
  'feminine-leaning': 'Feminine-leaning',
  'masculine-leaning': 'Masculine-leaning',
  'gender-neutral': 'Gender-neutral',
  mix: 'A mix of different expressions',
  'fresh-clean': 'Fresh and clean',
  'soft-elegant': 'Soft and elegant',
  'sweet-playful': 'Sweet and playful',
  'warm-sensual': 'Warm and sensual',
  'bold-luxurious': 'Bold and luxurious',
  'natural-calming': 'Natural and calming',
  'dark-mysterious': 'Dark and mysterious',
  'modern-energetic': 'Modern and energetic',
  'minimal-understated': 'Minimal and understated',
  'citrus-fresh': 'Citrus and fresh',
  'aquatic-aromatic': 'Aquatic and aromatic',
  floral: 'Floral',
  fruity: 'Fruity',
  gourmand: 'Gourmand',
  woody: 'Woody',
  'amber-spicy': 'Amber and spicy',
  light: 'Light and close to the skin',
  versatile: 'Noticeable and versatile',
  strong: 'Strong and long-lasting',
  varied: 'A varied set',
  everyday: 'Everyday wear',
  work: 'Work or daytime',
  evening: 'Evening or special occasions',
  gifting: 'Gifting',
  mixed: 'A mix of uses',
  'very-sweet': 'Very sweet',
  'heavy-oud': 'Heavy oud',
  'strong-smoke': 'Strong smoke',
  powdery: 'Powdery scents',
  'sharp-citrus': 'Sharp citrus',
  'strong-florals': 'Strong florals',
  'marine-aquatic': 'Marine or aquatic scents',
  spicy: 'Spicy scents',
  none: 'None of these',
  yes: 'Yes',
  no: 'No',
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  AE: 'United Arab Emirates',
  IN: 'India',
  DE: 'Germany',
  FR: 'France',
  IT: 'Italy',
  ES: 'Spain',
  NL: 'Netherlands',
  SE: 'Sweden',
  CH: 'Switzerland',
  SG: 'Singapore',
  HK: 'Hong Kong',
  JP: 'Japan',
  KR: 'South Korea',
  NZ: 'New Zealand',
  ZA: 'South Africa',
  BR: 'Brazil',
  MX: 'Mexico',
  IE: 'Ireland',
  BE: 'Belgium',
  AT: 'Austria',
  PT: 'Portugal',
  PL: 'Poland',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  SA: 'Saudi Arabia',
  QA: 'Qatar',
  KW: 'Kuwait',
  MY: 'Malaysia',
  TH: 'Thailand',
  PH: 'Philippines',
  ID: 'Indonesia',
  TR: 'Turkey',
  EG: 'Egypt',
  NG: 'Nigeria',
  KE: 'Kenya',
  OTHER: 'Other',
};

const single = (getter) => (d) => {
  const value = text(getter(d));
  return value ? [value] : [];
};

const multi = (getter) => (d) => {
  const raw = getter(d);
  if (!Array.isArray(raw)) return [];
  return raw.map((v) => text(v)).filter(Boolean);
};

const QUESTIONS = [
  { key: 'contact.fullName', step: 'contact', label: 'Full name', test: (d) => text(d.lead?.fullName) },
  { key: 'contact.email', step: 'contact', label: 'Email', test: (d) => text(d.lead?.email)?.includes('@') },
  { key: 'contact.phone', step: 'contact', label: 'Phone', test: (d) => text(d.lead?.phone).length >= 7 },
  {
    key: 'contact.brandName',
    step: 'contact',
    label: 'Brand name (optional)',
    test: (d) => text(d.lead?.brandName).length > 0,
    optional: true,
  },
  {
    key: 'contact.country',
    step: 'contact',
    label: 'Country',
    test: (d) => text(d.lead?.country).length > 0,
    getValues: single((d) => d.lead?.country),
  },
  {
    key: 'contact.consent',
    step: 'contact',
    label: 'Consent',
    test: (d) => Boolean(d.lead?.consent),
    getValues: (d) => {
      if (d.lead?.consent === true) return ['yes'];
      if (d.lead?.consent === false) return ['no'];
      return [];
    },
    knownOptions: ['yes', 'no'],
  },
  {
    key: 'brand.brandStage',
    step: 'brand',
    label: 'Brand stage',
    test: (d) => text(d.answers?.brandStage),
    getValues: single((d) => d.answers?.brandStage),
    knownOptions: ['exploring', 'first-launch', 'adding-fragrance', 'reworking', 'recommend'],
  },
  {
    key: 'brand.businessType',
    step: 'brand',
    label: 'Business type',
    test: (d) => text(d.answers?.businessType),
    getValues: single((d) => d.answers?.businessType),
    knownOptions: [
      'fashion',
      'beauty',
      'salon',
      'wellness',
      'creator',
      'hospitality',
      'standalone',
      'other',
    ],
  },
  {
    key: 'scent.scentExpression',
    step: 'scent',
    label: 'Scent expression',
    test: (d) => text(d.answers?.scentExpression),
    getValues: single((d) => d.answers?.scentExpression),
    knownOptions: ['feminine-leaning', 'masculine-leaning', 'gender-neutral', 'mix', 'recommend'],
  },
  {
    key: 'scent.brandPersonalities',
    step: 'scent',
    label: 'Brand personalities',
    test: (d) => Array.isArray(d.answers?.brandPersonalities) && d.answers.brandPersonalities.length > 0,
    getValues: multi((d) => d.answers?.brandPersonalities),
    knownOptions: [
      'fresh-clean',
      'soft-elegant',
      'sweet-playful',
      'warm-sensual',
      'bold-luxurious',
      'natural-calming',
      'dark-mysterious',
      'modern-energetic',
      'minimal-understated',
      'recommend',
    ],
  },
  {
    key: 'scent.scentFamilies',
    step: 'scent',
    label: 'Scent families',
    test: (d) => Array.isArray(d.answers?.scentFamilies) && d.answers.scentFamilies.length > 0,
    getValues: multi((d) => d.answers?.scentFamilies),
    knownOptions: [
      'citrus-fresh',
      'aquatic-aromatic',
      'floral',
      'fruity',
      'gourmand',
      'woody',
      'amber-spicy',
      'recommend',
    ],
  },
  {
    key: 'experience.intensity',
    step: 'experience',
    label: 'Intensity',
    test: (d) => text(d.answers?.intensity),
    getValues: single((d) => d.answers?.intensity),
    knownOptions: ['light', 'versatile', 'strong', 'varied', 'recommend'],
  },
  {
    key: 'experience.useCase',
    step: 'experience',
    label: 'Use case',
    test: (d) => text(d.answers?.useCase),
    getValues: single((d) => d.answers?.useCase),
    knownOptions: ['everyday', 'work', 'evening', 'gifting', 'hospitality', 'mixed', 'recommend'],
  },
  {
    key: 'preferences.exclusions',
    step: 'preferences',
    label: 'Exclusions',
    test: (d) => Array.isArray(d.answers?.exclusions) && d.answers.exclusions.length > 0,
    getValues: multi((d) => d.answers?.exclusions),
    knownOptions: [
      'very-sweet',
      'heavy-oud',
      'strong-smoke',
      'powdery',
      'sharp-citrus',
      'strong-florals',
      'marine-aquatic',
      'spicy',
      'none',
      'unsure',
    ],
  },
  {
    key: 'preferences.likedFragrances',
    step: 'preferences',
    label: 'Liked fragrances (optional)',
    test: (d) => text(d.answers?.likedFragrances).length > 0,
    optional: true,
  },
  {
    key: 'preferences.additionalNotes',
    step: 'preferences',
    label: 'Additional notes (optional)',
    test: (d) => text(d.answers?.additionalNotes).length > 0,
    optional: true,
  },
];

function text(value) {
  return String(value ?? '').trim();
}

function optionLabel(value) {
  return OPTION_LABELS[value] ?? value;
}

function tallyOptionSelections(docs, question) {
  if (typeof question.getValues !== 'function') return null;

  const counts = new Map();
  for (const known of question.knownOptions || []) {
    counts.set(known, 0);
  }

  let selections = 0;
  for (const doc of docs) {
    const values = question.getValues(doc);
    const unique = [...new Set(values)];
    for (const value of unique) {
      counts.set(value, (counts.get(value) || 0) + 1);
      selections += 1;
    }
  }

  const options = [...counts.entries()]
    .map(([value, count]) => ({
      value,
      label: optionLabel(value),
      count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const topOption = options.find((o) => o.count > 0) || null;

  return {
    options,
    topOption,
    totalSelections: selections,
  };
}

function stepOrderIndex(key) {
  return FUNNEL_STEPS.findIndex((s) => s.key === key);
}

function progressIndex(doc) {
  let max = -1;

  if (text(doc.lead?.email).includes('@')) {
    max = Math.max(max, stepOrderIndex('contact'));
  }

  for (const entry of doc.stepHistory || []) {
    const raw = String(entry?.step ?? '').trim();
    const mapped = HISTORY_ALIASES[raw];
    if (mapped) max = Math.max(max, stepOrderIndex(mapped));
  }

  if (typeof doc.currentStep === 'number') {
    for (const meta of FUNNEL_STEPS) {
      if (doc.currentStep >= meta.stepIndex) {
        max = Math.max(max, stepOrderIndex(meta.key));
      }
    }
  }

  if (doc.status === 'curated') max = Math.max(max, stepOrderIndex('results'));
  if (doc.status === 'checkout_started') max = Math.max(max, stepOrderIndex('checkout'));
  if (doc.status === 'paid' || doc.status === 'canceled' || doc.order?.sampleOrderNumber != null) {
    max = Math.max(max, stepOrderIndex('paid'));
  }

  return max;
}

function reachedStep(doc, stepKey) {
  return progressIndex(doc) >= stepOrderIndex(stepKey);
}

function completedStep(doc, stepKey) {
  const idx = stepOrderIndex(stepKey);
  if (idx < 0) return false;
  if (stepKey === 'paid') return progressIndex(doc) >= idx;
  // Completed means they progressed past this step.
  return progressIndex(doc) > idx;
}

function saveExitAtStep(doc) {
  const exits = (doc.stepHistory || []).filter((e) => e?.step === 'save_exit');
  if (exits.length === 0) return null;
  const latest = exits[exits.length - 1];
  if (typeof latest.atStep === 'number') {
    const meta = FUNNEL_STEPS.find((s) => s.stepIndex === latest.atStep);
    return meta?.key ?? `step_${latest.atStep}`;
  }
  return 'unknown';
}

export function computeFunnelDropoff(docs) {
  const rows = Array.isArray(docs) ? docs : [];
  const steps = FUNNEL_STEPS.map((meta, index) => {
    const reached = rows.filter((d) => reachedStep(d, meta.key)).length;
    const completed = rows.filter((d) => completedStep(d, meta.key)).length;
    const dropped = Math.max(0, reached - completed);
    const dropOffRate = reached > 0 ? dropped / reached : 0;
    const prevReached =
      index === 0 ? rows.length : rows.filter((d) => reachedStep(d, FUNNEL_STEPS[index - 1].key)).length;
    const conversionFromPrev = prevReached > 0 ? reached / prevReached : 0;
    return {
      key: meta.key,
      label: meta.label,
      reached,
      completed,
      dropped,
      dropOffRate,
      conversionFromPrev,
    };
  });

  const saveExitByStep = {};
  for (const doc of rows) {
    const key = saveExitAtStep(doc);
    if (!key) continue;
    saveExitByStep[key] = (saveExitByStep[key] || 0) + 1;
  }

  const questions = QUESTIONS.map((q) => {
    const cohort = rows.filter((d) => reachedStep(d, q.step));
    const answered = cohort.filter((d) => q.test(d)).length;
    const missing = Math.max(0, cohort.length - answered);
    const missingRate = cohort.length > 0 ? missing / cohort.length : 0;
    const popularity = tallyOptionSelections(cohort, q);
    return {
      key: q.key,
      step: q.step,
      label: q.label,
      optional: Boolean(q.optional),
      reachedStep: cohort.length,
      answered,
      missing,
      missingRate,
      ...(popularity
        ? {
            options: popularity.options,
            topOption: popularity.topOption,
            totalSelections: popularity.totalSelections,
          }
        : {}),
    };
  }).sort((a, b) => {
    if (a.optional !== b.optional) return a.optional ? 1 : -1;
    return b.missingRate - a.missingRate || b.missing - a.missing;
  });

  const worstStep =
    [...steps]
      .filter((s) => s.reached >= 3 && s.key !== 'paid')
      .sort((a, b) => b.dropOffRate - a.dropOffRate || b.dropped - a.dropped)[0] || null;

  const worstQuestion = questions.find((q) => !q.optional && q.reachedStep >= 3) || null;

  return {
    totalSessions: rows.length,
    steps,
    questions,
    saveExitByStep,
    insights: {
      worstStep,
      worstQuestion,
      suggestion: buildSuggestion(worstStep, worstQuestion),
    },
  };
}

function buildSuggestion(worstStep, worstQuestion) {
  if (worstStep && worstStep.dropOffRate >= 0.35) {
    return `Highest step drop-off is “${worstStep.label}” (${Math.round(worstStep.dropOffRate * 100)}% of people who reached it). Shorten copy, clarify the ask, or split the step.`;
  }
  if (worstQuestion && worstQuestion.missingRate >= 0.25) {
    return `Among people on “${worstQuestion.step}”, “${worstQuestion.label}” is unanswered most often (${Math.round(worstQuestion.missingRate * 100)}% missing). Soften, make optional, or remove it.`;
  }
  if (worstStep) {
    return `Watch “${worstStep.label}” — largest relative drop among steps with enough traffic.`;
  }
  return 'Not enough traffic yet to recommend cutting a question.';
}

export async function getFunnelDropoffStats({ limit = 2000 } = {}) {
  const { getMongoDb } = await import('../db/mongo.mjs');
  const db = await getMongoDb();
  const docs = await db
    .collection('samplingSessions')
    .find(
      {},
      {
        projection: {
          status: 1,
          currentStep: 1,
          lastCompletedStep: 1,
          stepHistory: 1,
          lead: 1,
          answers: 1,
          order: 1,
          createdAt: 1,
        },
      },
    )
    .sort({ createdAt: -1 })
    .limit(Math.min(Math.max(limit, 1), 5000))
    .toArray();

  return computeFunnelDropoff(docs);
}
