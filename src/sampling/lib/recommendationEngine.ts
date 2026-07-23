import { FRAGRANCE_LIBRARY } from '../data/fragranceLibrary';
import type {
  FragranceProfile,
  Recommendation,
  RecommendationRole,
  SamplingAnswers,
} from '../types/sampling';
import {
  buildSelectionProfileFromClient,
  normalizePreferenceScores,
  selectDiversifiedRecommendations,
} from './diversifiedSelection';

const FAMILY_MAP: Record<string, string[]> = {
  'fresh-clean': ['citrus-fresh', 'aquatic-aromatic'],
  'soft-elegant': ['floral', 'amber-spicy'],
  'sweet-playful': ['fruity', 'gourmand', 'floral'],
  'warm-sensual': ['amber-spicy', 'gourmand', 'woody'],
  'bold-luxurious': ['amber-spicy', 'woody', 'gourmand'],
  'natural-calming': ['citrus-fresh', 'aquatic-aromatic', 'floral'],
  'dark-mysterious': ['amber-spicy', 'woody', 'gourmand'],
  'modern-energetic': ['citrus-fresh', 'fruity', 'aquatic-aromatic'],
  'minimal-understated': ['woody', 'aquatic-aromatic', 'amber-spicy'],
};

const BUSINESS_DEFAULTS: Record<string, string[]> = {
  fashion: ['sparkling-modern', 'clean-woods', 'soft-floral', 'warm-spicy', 'bright-fruity'],
  beauty: ['soft-floral', 'soft-amber', 'green-fresh', 'clean-citrus', 'sweet-gourmand'],
  salon: ['green-fresh', 'herbal-aromatic', 'soft-floral', 'clean-citrus', 'soft-amber'],
  wellness: ['green-fresh', 'clean-citrus', 'clean-woods', 'soft-amber', 'herbal-aromatic'],
  creator: ['bright-fruity', 'sparkling-modern', 'dark-gourmand', 'sporty-blue', 'rich-white-floral'],
  hospitality: ['clean-citrus', 'clean-woods', 'soft-amber', 'sporty-blue', 'sweet-gourmand'],
  standalone: ['dark-sensual', 'smoky-woods', 'sparkling-modern', 'rich-white-floral', 'warm-spicy'],
  other: ['clean-citrus', 'soft-floral', 'clean-woods', 'sweet-gourmand', 'sparkling-modern'],
  unsure: ['clean-citrus', 'soft-floral', 'clean-woods', 'sparkling-modern', 'soft-amber'],
};

const EXCLUSION_MAP: Record<string, string> = {
  'very-sweet': 'very-sweet',
  'heavy-oud': 'heavy-oud',
  'strong-smoke': 'strong-smoke',
  powdery: 'powdery',
  'sharp-citrus': 'sharp-citrus',
  'strong-florals': 'strong-florals',
  'marine-aquatic': 'marine-aquatic',
  spicy: 'spicy',
};

const resolveExpression = (answers: SamplingAnswers): string[] => {
  if (answers.scentExpression && answers.scentExpression !== 'recommend' && answers.scentExpression !== 'mix') {
    return [answers.scentExpression];
  }
  if (answers.scentExpression === 'mix') {
    return ['feminine-leaning', 'masculine-leaning', 'gender-neutral'];
  }
  return ['gender-neutral'];
};

const resolveFamilies = (answers: SamplingAnswers): string[] => {
  if (answers.scentFamilies.includes('recommend')) {
    const fromPersonality = answers.brandPersonalities
      .filter((p) => p !== 'recommend')
      .flatMap((p) => FAMILY_MAP[p] ?? []);
    if (fromPersonality.length) return [...new Set(fromPersonality)];
    return ['citrus-fresh', 'floral', 'woody', 'amber-spicy'];
  }
  return answers.scentFamilies.filter((f) => f !== 'recommend');
};

const targetIntensity = (answers: SamplingAnswers): number => {
  switch (answers.intensity) {
    case 'light':
      return 2;
    case 'versatile':
      return 3;
    case 'strong':
      return 4;
    case 'varied':
      return 3;
    default:
      return 3;
  }
};

/** Preserve existing preference scoring (raw, unnormalized). */
const scoreProfile = (profile: FragranceProfile, answers: SamplingAnswers): number => {
  let score = 0;
  const families = resolveFamilies(answers);
  const expressions = resolveExpression(answers);

  if (families.includes(profile.primaryFamily)) score += 12;

  answers.brandPersonalities
    .filter((p) => p !== 'recommend')
    .forEach((p) => {
      const mapped = FAMILY_MAP[p] ?? [];
      if (mapped.includes(profile.primaryFamily)) score += 6;
    });

  expressions.forEach((expr) => {
    if (profile.scentExpression.includes(expr)) score += 5;
  });

  if (answers.useCase && answers.useCase !== 'recommend' && answers.useCase !== 'mixed') {
    if (profile.useCases.includes(answers.useCase)) score += 4;
  }

  if (answers.businessType && answers.businessType !== 'other' && answers.businessType !== 'unsure') {
    if (profile.businessTypes.includes(answers.businessType)) score += 3;
  }

  const intensityTarget = targetIntensity(answers);
  score += 4 - Math.abs(profile.intensity - intensityTarget);

  score += commercialTierBoost(profile.commerciality, profile.adventure, answers.commercialTier);

  return score;
};

/** Map commercial tier intent onto oil commerciality (1–5) and adventure (1–5). */
const commercialTierBoost = (
  commerciality: number,
  adventure: number,
  tier: string | undefined,
): number => {
  const c = Number.isFinite(commerciality) ? commerciality : 3;
  const a = Number.isFinite(adventure) ? adventure : 3;

  switch (tier) {
    case 'affordable_everyday':
      // Safer, broad-appeal oils: high commerciality, lower adventure.
      return c * 1.6 + (6 - a) * 0.9;
    case 'accessible_premium':
      // Commercial mid-tier.
      return c * 1.1 + (4 - Math.abs(a - 3)) * 0.6;
    case 'premium_brand_extension':
      // More elevated / distinctive.
      return a * 1.3 + c * 0.7;
    case 'luxury_limited_edition':
      // Richer, niche-style oils: higher adventure, lower mass commerciality.
      return a * 1.8 + (6 - c) * 0.7;
    case 'unsure_recommend':
    default:
      // Balanced set (legacy behavior when unanswered).
      return c * 0.5;
  }
};

const activeExclusions = (exclusions: string[]) =>
  exclusions.filter((e) => e !== 'none' && e !== 'unsure');

const exclusionConflictsFor = (profile: FragranceProfile, exclusions: string[]): string[] => {
  const active = activeExclusions(exclusions);
  return active.filter((ex) => {
    const tag = EXCLUSION_MAP[ex];
    return Boolean(tag && profile.exclusions.includes(tag));
  });
};

const isExcluded = (profile: FragranceProfile, exclusions: string[]): boolean =>
  exclusionConflictsFor(profile, exclusions).length > 0;

const SLOT_ROLES: RecommendationRole[] = [
  'best-match',
  'close-match',
  'safe-option',
  'adjacent',
  'wildcard',
];

export interface CurationResult {
  recommendations: Recommendation[];
  selectionSummary: string;
}

export const runRecommendationEngine = (answers: SamplingAnswers): CurationResult => {
  const businessType = answers.businessType ?? 'unsure';
  const defaults = BUSINESS_DEFAULTS[businessType] ?? BUSINESS_DEFAULTS.unsure;
  const resolvedFamilies = resolveFamilies(answers);

  if (FRAGRANCE_LIBRARY.length === 0) {
    return {
      recommendations: [],
      selectionSummary: 'No fragrances are available to curate right now.',
    };
  }

  const scoredRaw = FRAGRANCE_LIBRARY.map((profile) => {
    let rawScore = scoreProfile(profile, answers);
    const boostIdx = defaults.indexOf(profile.id);
    if (boostIdx >= 0) rawScore += (defaults.length - boostIdx) * 2;
    return {
      profile: buildSelectionProfileFromClient(profile),
      clientProfile: profile,
      rawScore,
    };
  });

  type ScoredRow = { profile: { id: string; primaryFamily: string }; preferenceScore: number };
  const scoredAll = normalizePreferenceScores(
    scoredRaw.map(({ profile, rawScore }) => ({ profile, rawScore })),
  ) as ScoredRow[];
  const preferenceById = new Map(
    scoredAll.map((row: ScoredRow) => [row.profile.id, row.preferenceScore]),
  );
  const clientById = new Map(FRAGRANCE_LIBRARY.map((p) => [p.id, p]));

  const safeScored = scoredAll.filter((row: ScoredRow) => {
    const client = clientById.get(row.profile.id);
    return client ? !isExcluded(client, answers.exclusions) : true;
  });

  const selected =
    safeScored.length > 0
      ? selectDiversifiedRecommendations(
          safeScored,
          { ...answers, resolvedFamilies },
          { isDev: Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV) },
        )
      : [];

  const used = new Set(
    selected.map((item: { profile: { id: string } }) => item.profile.id as string),
  );
  const recommendations: Recommendation[] = selected.map(
    (item: { profile: { id: string }; role: string; reason: string }) => ({
      fragranceId: item.profile.id,
      role: item.role as RecommendationRole,
      reason: item.reason,
    }),
  );

  while (recommendations.length < 5) {
    const ranked = FRAGRANCE_LIBRARY.filter((p) => !used.has(p.id))
      .map((profile) => {
        const conflicts = exclusionConflictsFor(profile, answers.exclusions);
        return {
          profile,
          conflicts,
          preferenceScore: Number(preferenceById.get(profile.id) ?? 0),
        };
      })
      .sort(
        (a, b) =>
          a.conflicts.length - b.conflicts.length || b.preferenceScore - a.preferenceScore,
      );

    if (!ranked.length) break;
    const next = ranked[0];
    used.add(next.profile.id);
    const role = SLOT_ROLES[recommendations.length] ?? 'wildcard';
    const conflictLabels = next.conflicts.map((c) => c.replace(/-/g, ' '));
    recommendations.push({
      fragranceId: next.profile.id,
      role,
      reason:
        next.conflicts.length > 0
          ? `Stretch pick to complete your five-sample kit — closest available option despite some overlap with your exclusions (${conflictLabels.join(', ')}).`
          : 'Added to complete your five-sample kit while staying as close as possible to your brief.',
    });
  }

  const families = [
    ...new Set(
      recommendations
        .map((rec) => clientById.get(rec.fragranceId)?.primaryFamily)
        .filter(Boolean),
    ),
  ];
  const stretchCount = recommendations.filter((rec) => {
    const profile = clientById.get(rec.fragranceId);
    return profile ? isExcluded(profile, answers.exclusions) : false;
  }).length;

  const selectionSummary =
    stretchCount > 0
      ? 'We built a full five-sample kit prioritizing matches that avoid your dislikes, then completed the set with the closest remaining options.'
      : `We balanced ${families.length} scent families across two core matches, two adjacent discoveries, and one controlled wildcard so the set stays relevant without feeling repetitive.`;

  return { recommendations, selectionSummary };
};
