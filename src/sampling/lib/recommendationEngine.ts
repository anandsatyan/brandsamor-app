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

  score += profile.commerciality * 0.5;

  return score;
};

const isExcluded = (profile: FragranceProfile, exclusions: string[]): boolean => {
  const active = exclusions.filter((e) => e !== 'none' && e !== 'unsure');
  return active.some((ex) => {
    const tag = EXCLUSION_MAP[ex];
    return tag && profile.exclusions.includes(tag);
  });
};

export interface CurationResult {
  recommendations: Recommendation[];
  selectionSummary: string;
}

export const runRecommendationEngine = (answers: SamplingAnswers): CurationResult => {
  const businessType = answers.businessType ?? 'unsure';
  const defaults = BUSINESS_DEFAULTS[businessType] ?? BUSINESS_DEFAULTS.unsure;
  const resolvedFamilies = resolveFamilies(answers);

  // Hard exclusions are never bypassed — better a smaller kit than disliked notes.
  const candidates = FRAGRANCE_LIBRARY.filter((p) => !isExcluded(p, answers.exclusions));

  if (candidates.length === 0) {
    return {
      recommendations: [],
      selectionSummary:
        'No fragrances in the current library fully avoid your exclusions. Relax one or two dislike filters to unlock a curated set.',
    };
  }

  const scoredRaw = candidates.map((profile) => {
    let rawScore = scoreProfile(profile, answers);
    const boostIdx = defaults.indexOf(profile.id);
    if (boostIdx >= 0) rawScore += (defaults.length - boostIdx) * 2;
    return {
      profile: buildSelectionProfileFromClient(profile),
      rawScore,
    };
  });

  const scored = normalizePreferenceScores(scoredRaw);
  const selected = selectDiversifiedRecommendations(
    scored,
    { ...answers, resolvedFamilies },
    { isDev: Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV) },
  );

  const recommendations: Recommendation[] = selected.map((item: {
    profile: { id: string; primaryFamily: string };
    role: string;
    reason: string;
  }) => ({
    fragranceId: item.profile.id,
    role: item.role as RecommendationRole,
    reason: item.reason,
  }));

  const families = [...new Set(selected.map((item: { profile: { primaryFamily: string } }) => item.profile.primaryFamily))];
  const count = recommendations.length;
  const selectionSummary =
    count < 5
      ? `We found ${count} fragrance${count === 1 ? '' : 's'} that fit your brief while respecting your exclusions. A narrower dislike set can yield a fuller five-sample kit.`
      : `We balanced ${families.length} scent families across two core matches, two adjacent discoveries, and one controlled wildcard so the set stays relevant without feeling repetitive.`;

  return { recommendations, selectionSummary };
};
