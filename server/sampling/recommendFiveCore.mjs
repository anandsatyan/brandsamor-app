import {
  buildSelectionProfileFromMongo,
  normalizePreferenceScores,
  selectDiversifiedRecommendations,
} from './diversifiedSelection.mjs';

const FAMILY_MAP = {
  'fresh-clean': ['fresh-aromatic', 'citrus', 'green', 'marine', 'mineral'],
  'soft-elegant': ['floral', 'musky', 'powdery', 'amber'],
  'sweet-playful': ['fruity', 'gourmand', 'vanilla'],
  'warm-sensual': ['amber', 'spicy', 'woody', 'vanilla', 'incense'],
  'bold-luxurious': ['oud', 'incense', 'leather', 'resin', 'amber', 'woody'],
  'natural-calming': ['green', 'herbal', 'citrus', 'tea', 'mineral'],
  'dark-mysterious': ['oud', 'incense', 'smoky', 'amber', 'resin'],
  'modern-energetic': ['citrus', 'fresh', 'mint', 'fruity', 'pepper'],
  'minimal-understated': ['woody', 'musk', 'tea', 'mineral'],
};

const BUSINESS_DEFAULTS_BY_SLUG = {
  fashion: ['sparkling-citrus-woods', 'polished-woods', 'soft-petals', 'warm-spice', 'electric-fruit'],
  beauty: ['soft-petals', 'pear-blossom', 'green-horizon', 'bright-citrus', 'vanilla-veil'],
  salon: ['green-horizon', 'aromatic-reserve', 'soft-petals', 'bright-citrus', 'pear-blossom'],
  wellness: ['green-horizon', 'bright-citrus', 'polished-woods', 'aromatic-reserve', 'salted-air'],
  creator: ['electric-fruit', 'sparkling-citrus-woods', 'midnight-cafe', 'modern-blue', 'vanilla-veil'],
  hospitality: ['bright-citrus', 'polished-woods', 'salted-air', 'modern-blue', 'vanilla-veil'],
  standalone: ['dark-amber-oud', 'fireside-woods', 'sparkling-citrus-woods', 'midnight-cafe', 'warm-spice'],
  other: ['bright-citrus', 'soft-petals', 'polished-woods', 'sparkling-citrus-woods', 'vanilla-veil'],
  unsure: ['bright-citrus', 'soft-petals', 'polished-woods', 'sparkling-citrus-woods', 'vanilla-veil'],
};

const EXCLUSION_SIGNALS = {
  'very-sweet': ['gourmand', 'vanilla', 'sweet', 'coffee'],
  'heavy-oud': ['oud'],
  'strong-smoke': ['smoky', 'smoke', 'incense'],
  powdery: ['powdery'],
  'sharp-citrus': ['citrus'],
  'strong-florals': ['floral', 'rose'],
  'marine-aquatic': ['marine', 'aquatic'],
  spicy: ['spicy', 'spice', 'pepper'],
};

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const resolveExpression = (answers) => {
  const expr = normalize(answers?.scentExpression);
  if (expr && expr !== 'recommend' && expr !== 'mix') return [expr];
  if (expr === 'mix') return ['feminine-leaning', 'masculine-leaning', 'gender-neutral'];
  return ['gender-neutral'];
};

const resolveFamilies = (answers) => {
  const selected = Array.isArray(answers?.scentFamilies) ? answers.scentFamilies : [];
  if (selected.includes('recommend')) {
    const personalities = (Array.isArray(answers?.brandPersonalities) ? answers.brandPersonalities : []).filter(
      (p) => p !== 'recommend',
    );
    const mapped = personalities.flatMap((p) => FAMILY_MAP[p] ?? []);
    if (mapped.length) return [...new Set(mapped.map(normalize))];
    return ['fresh-aromatic', 'floral-fruity-gourmand', 'woods-spice-oud'];
  }
  return selected.filter((f) => f !== 'recommend').map(normalize);
};

const profileTokens = (profile) =>
  new Set([
    normalize(profile.primaryFamily),
    ...(profile.secondaryFamilies ?? []).map(normalize),
    ...(profile.dominantAccords ?? []).map(normalize),
    ...(profile.tags ?? []).map(normalize),
    ...(profile.openingProfile ?? []).map(normalize),
    ...(profile.heartProfile ?? []).map(normalize),
    ...(profile.drydownProfile ?? []).map(normalize),
  ]);

const isHardExcluded = (profile, answers) => {
  const exclusions = (Array.isArray(answers?.exclusions) ? answers.exclusions : [])
    .map(normalize)
    .filter((e) => e && e !== 'none' && e !== 'unsure');
  if (!exclusions.length) return false;

  const tokens = profileTokens(profile);
  return exclusions.some((ex) => {
    const signals = EXCLUSION_SIGNALS[ex] ?? [ex];
    return signals.some((signal) => tokens.has(signal));
  });
};

const scorePreference = (profile, answers) => {
  let s = 0;
  const families = resolveFamilies(answers);
  const expressions = resolveExpression(answers);
  const fragrance = profile.raw ?? {};

  if (families.includes(normalize(profile.primaryFamily))) s += 12;

  (profile.secondaryFamilies ?? []).forEach((f) => {
    if (families.includes(normalize(f))) s += 2;
  });

  const personalities = (Array.isArray(answers?.brandPersonalities) ? answers.brandPersonalities : []).filter(
    (p) => p !== 'recommend',
  );
  personalities.forEach((p) => {
    const mapped = (FAMILY_MAP[p] ?? []).map(normalize);
    if (mapped.includes(normalize(profile.primaryFamily))) s += 6;
    if ((profile.secondaryFamilies ?? []).some((x) => mapped.includes(normalize(x)))) s += 2;
  });

  const expr = normalize(fragrance.scentExpression ?? profile.genderExpression);
  expressions.forEach((e) => {
    if (expr === normalize(e)) s += 5;
  });

  const bt = normalize(answers?.businessType);
  if (
    bt &&
    Array.isArray(fragrance.bestForBusinessTypes) &&
    fragrance.bestForBusinessTypes.map(normalize).includes(bt)
  ) {
    s += 3;
  }

  return Math.max(0, s);
};

/**
 * Score + diversify selection from already-loaded fragrance rows.
 * @param {Array<{ fragrance: object, notePyramid?: object|null }>} rows
 * @param {object} answers
 * @param {{ isDev?: boolean }} [options]
 */
export function recommendFiveFromRows(rows, answers, options = {}) {
  const bt = normalize(answers?.businessType) || 'unsure';
  const defaults = BUSINESS_DEFAULTS_BY_SLUG[bt] ?? BUSINESS_DEFAULTS_BY_SLUG.unsure;
  const defaultIndex = new Map(defaults.map((slug, idx) => [slug, idx]));
  const resolvedFamilies = resolveFamilies(answers);

  let profiles = rows.map(({ fragrance, notePyramid }) =>
    buildSelectionProfileFromMongo(fragrance, notePyramid),
  );

  const hardFiltered = profiles.filter((profile) => !isHardExcluded(profile, answers));
  if (hardFiltered.length >= 5) {
    profiles = hardFiltered;
  }

  const scoredRaw = profiles.map((profile) => {
    const base = scorePreference(profile, answers);
    const boostIdx = defaultIndex.has(profile.id) ? defaultIndex.get(profile.id) : null;
    const boosted = boostIdx == null ? base : base + (defaults.length - boostIdx) * 2;
    return { profile, rawScore: boosted };
  });

  const scored = normalizePreferenceScores(scoredRaw);
  const selected = selectDiversifiedRecommendations(
    scored,
    { ...answers, resolvedFamilies },
    { isDev: options.isDev ?? process.env.NODE_ENV === 'development' },
  );

  const families = [...new Set(selected.map((item) => item.profile.primaryFamily))];
  return {
    recommendations: selected.map((item) => ({
      fragranceSlug: item.profile.id,
      fragranceNumber: item.profile.number ?? item.profile.raw?.number ?? null,
      fragranceName: item.profile.name ?? null,
      role: item.role,
      reason: item.reason,
      recommendationType: item.recommendationType,
      preferenceScore: item.preferenceScore,
      diversityScore: item.diversityScore,
      finalScore: item.finalScore,
      reasons: item.reasons,
    })),
    selectionSummary: `We balanced ${families.length} scent families across two core matches, two adjacent discoveries, and one controlled wildcard so the set stays relevant without feeling repetitive.`,
  };
}
