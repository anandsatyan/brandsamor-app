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

const SLOT_META = [
  { role: 'best-match', recommendationType: 'core_match' },
  { role: 'close-match', recommendationType: 'core_match' },
  { role: 'safe-option', recommendationType: 'adjacent_discovery' },
  { role: 'adjacent', recommendationType: 'adjacent_discovery' },
  { role: 'wildcard', recommendationType: 'wildcard' },
];

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const activeExclusions = (answers) =>
  (Array.isArray(answers?.exclusions) ? answers.exclusions : [])
    .map(normalize)
    .filter((e) => e && e !== 'none' && e !== 'unsure');

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

/** @returns {{ exclusion: string, signals: string[] }[]} */
export function getExclusionConflicts(profile, answers) {
  const exclusions = activeExclusions(answers);
  if (!exclusions.length) return [];

  const tokens = profileTokens(profile);
  const conflicts = [];
  for (const ex of exclusions) {
    const signals = (EXCLUSION_SIGNALS[ex] ?? [ex]).filter((signal) => tokens.has(signal));
    if (signals.length) {
      conflicts.push({ exclusion: ex, signals });
    }
  }
  return conflicts;
}

export const isHardExcluded = (profile, answers) => getExclusionConflicts(profile, answers).length > 0;

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

const toRecommendation = (item, { stretch = false, exclusionConflicts = [] } = {}) => ({
  fragranceSlug: item.profile.id,
  fragranceNumber: item.profile.number ?? item.profile.raw?.number ?? null,
  fragranceName: item.profile.name ?? null,
  role: item.role,
  reason: item.reason,
  recommendationType: item.recommendationType,
  preferenceScore: item.preferenceScore,
  diversityScore: item.diversityScore ?? null,
  finalScore: item.finalScore ?? item.preferenceScore,
  reasons: item.reasons ?? [item.reason].filter(Boolean),
  stretch: Boolean(stretch),
  exclusionConflicts: exclusionConflicts.map((c) => c.exclusion ?? c).filter(Boolean),
});

/**
 * Pad a short exclusion-safe set to five using least-conflicting remaining profiles.
 */
function padWithLeastConflict(selected, allProfiles, answers, preferenceById) {
  const used = new Set(selected.map((item) => item.profile.id));
  const result = selected.map((item) => ({
    ...item,
    stretch: false,
    exclusionConflicts: [],
  }));

  while (result.length < 5) {
    const ranked = allProfiles
      .filter((profile) => !used.has(profile.id))
      .map((profile) => {
        const conflicts = getExclusionConflicts(profile, answers);
        const signalCount = conflicts.reduce((sum, c) => sum + c.signals.length, 0);
        return {
          profile,
          conflicts,
          conflictCount: conflicts.length,
          signalCount,
          preferenceScore: preferenceById.get(profile.id) ?? 0,
        };
      })
      .sort(
        (a, b) =>
          a.conflictCount - b.conflictCount ||
          a.signalCount - b.signalCount ||
          b.preferenceScore - a.preferenceScore,
      );

    if (!ranked.length) break;

    const next = ranked[0];
    used.add(next.profile.id);
    const slot = SLOT_META[result.length] ?? SLOT_META[SLOT_META.length - 1];
    const conflictLabels = next.conflicts.map((c) => c.exclusion.replace(/-/g, ' '));
    const reason =
      next.conflicts.length > 0
        ? `Stretch pick to complete your five-sample kit — closest available option despite some overlap with your exclusions (${conflictLabels.join(', ')}).`
        : 'Added to complete your five-sample kit while staying as close as possible to your brief.';

    result.push({
      profile: next.profile,
      preferenceScore: next.preferenceScore,
      diversityScore: 0,
      finalScore: next.preferenceScore,
      recommendationType: slot.recommendationType,
      role: slot.role,
      reasons: [reason],
      reason,
      stretch: next.conflicts.length > 0,
      exclusionConflicts: next.conflicts,
    });
  }

  return result;
}

/**
 * Score + diversify selection from already-loaded fragrance rows.
 * Always targets five picks: exclusion-safe first, then least-conflict stretch pads.
 *
 * @param {Array<{ fragrance: object, notePyramid?: object|null }>} rows
 * @param {object} answers
 * @param {{ isDev?: boolean }} [options]
 */
export function recommendFiveFromRows(rows, answers, options = {}) {
  const bt = normalize(answers?.businessType) || 'unsure';
  const defaults = BUSINESS_DEFAULTS_BY_SLUG[bt] ?? BUSINESS_DEFAULTS_BY_SLUG.unsure;
  const defaultIndex = new Map(defaults.map((slug, idx) => [slug, idx]));
  const resolvedFamilies = resolveFamilies(answers);

  const allProfiles = rows.map(({ fragrance, notePyramid }) =>
    buildSelectionProfileFromMongo(fragrance, notePyramid),
  );

  if (allProfiles.length === 0) {
    return {
      recommendations: [],
      selectionSummary: 'No fragrances are available to curate right now.',
      exclusionSafeCount: 0,
      stretchCount: 0,
    };
  }

  const scoredRaw = allProfiles.map((profile) => {
    const base = scorePreference(profile, answers);
    const boostIdx = defaultIndex.has(profile.id) ? defaultIndex.get(profile.id) : null;
    const boosted = boostIdx == null ? base : base + (defaults.length - boostIdx) * 2;
    return { profile, rawScore: boosted };
  });
  const scoredAll = normalizePreferenceScores(scoredRaw);
  const preferenceById = new Map(scoredAll.map((row) => [row.profile.id, row.preferenceScore]));

  const safeScored = scoredAll.filter((row) => !isHardExcluded(row.profile, answers));
  let selected = [];

  if (safeScored.length > 0) {
    selected = selectDiversifiedRecommendations(
      safeScored,
      { ...answers, resolvedFamilies },
      { isDev: options.isDev ?? process.env.NODE_ENV === 'development' },
    ).map((item) => ({
      ...item,
      stretch: false,
      exclusionConflicts: [],
    }));
  }

  const filled = padWithLeastConflict(selected, allProfiles, answers, preferenceById).slice(0, 5);
  const stretchCount = filled.filter((item) => item.stretch).length;
  const families = [...new Set(filled.map((item) => item.profile.primaryFamily))];

  const selectionSummary =
    stretchCount > 0
      ? 'We built a full five-sample kit prioritizing matches that avoid your dislikes, then completed the set with the closest remaining options.'
      : `We balanced ${families.length} scent families across two core matches, two adjacent discoveries, and one controlled wildcard so the set stays relevant without feeling repetitive.`;

  return {
    recommendations: filled.map((item) =>
      toRecommendation(item, {
        stretch: item.stretch,
        exclusionConflicts: item.exclusionConflicts,
      }),
    ),
    selectionSummary,
    exclusionSafeCount: safeScored.length,
    stretchCount,
  };
}
