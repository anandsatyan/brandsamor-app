import { FRAGRANCE_LIBRARY } from '../data/fragranceLibrary';
import type {
  FragranceProfile,
  Recommendation,
  RecommendationRole,
  SamplingAnswers,
} from '../types/sampling';

interface ScoredProfile {
  profile: FragranceProfile;
  score: number;
}

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
  beauty: ['soft-floral', 'soft-amber', 'green-fresh', 'clean-citrus', 'vanilla-veil'],
  salon: ['green-fresh', 'herbal-aromatic', 'soft-floral', 'clean-citrus', 'soft-amber'],
  wellness: ['green-fresh', 'clean-citrus', 'clean-woods', 'soft-amber', 'herbal-aromatic'],
  creator: ['bright-fruity', 'sparkling-modern', 'dark-gourmand', 'sporty-blue', 'rich-white-floral'],
  hospitality: ['clean-citrus', 'clean-woods', 'soft-amber', 'sporty-blue', 'vanilla-veil'],
  standalone: ['dark-sensual', 'smoky-woods', 'sparkling-modern', 'rich-white-floral', 'warm-spicy'],
  other: ['clean-citrus', 'soft-floral', 'clean-woods', 'vanilla-veil', 'sparkling-modern'],
  unsure: ['clean-citrus', 'soft-floral', 'clean-woods', 'sparkling-modern', 'soft-amber'],
};

// Fix id references - vanilla-veil should be sweet-gourmand
const fixBusinessDefaults = () => {
  for (const key of Object.keys(BUSINESS_DEFAULTS)) {
    BUSINESS_DEFAULTS[key] = BUSINESS_DEFAULTS[key].map((id) =>
      id === 'vanilla-veil' ? 'sweet-gourmand' : id,
    );
  }
};
fixBusinessDefaults();

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

const targetAdventure = (answers: SamplingAnswers): number => {
  switch (answers.adventureLevel) {
    case 'familiar':
      return 2;
    case 'premium-wearable':
      return 3;
    case 'distinctive':
      return 4;
    case 'wildcard':
      return 5;
    default:
      return 3;
  }
};

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

  const adventureTarget = targetAdventure(answers);
  score += 4 - Math.abs(profile.adventure - adventureTarget) * 0.8;

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

const familyCount = (selected: FragranceProfile[]) => {
  const counts: Record<string, number> = {};
  selected.forEach((p) => {
    counts[p.primaryFamily] = (counts[p.primaryFamily] ?? 0) + 1;
  });
  return counts;
};

const isNearDuplicate = (a: FragranceProfile, b: FragranceProfile) =>
  a.primaryFamily === b.primaryFamily &&
  Math.abs(a.sweetness - b.sweetness) <= 1 &&
  Math.abs(a.freshness - b.freshness) <= 1;

const buildReason = (profile: FragranceProfile, role: RecommendationRole, answers: SamplingAnswers): string => {
  const families = resolveFamilies(answers);
  if (role === 'best-match') {
    if (families.includes(profile.primaryFamily)) {
      return `Selected because this direction aligns closely with the scent families you described for your brand.`;
    }
    return `Selected as the strongest overall match based on your brand brief and audience direction.`;
  }
  if (role === 'close-match') {
    return `Selected as a close complementary direction that supports your brief without repeating the same impression.`;
  }
  if (role === 'safe-option') {
    return `Selected as a broadly approachable option that helps you sense-check commercial wearability.`;
  }
  if (role === 'adjacent') {
    return `Selected to offer a relevant adjacent direction so you can compare a neighbouring scent style.`;
  }
  return `Selected as a contrast option to help you explore a slightly more distinctive direction within your brief.`;
};

const pickRole = (index: number, adventure: number): RecommendationRole => {
  const roles: RecommendationRole[] = ['best-match', 'close-match', 'safe-option', 'adjacent', 'wildcard'];
  if (adventure >= 4) return roles[Math.min(index, roles.length - 1)];
  return roles[index] ?? 'adjacent';
};

export interface CurationResult {
  recommendations: Recommendation[];
  selectionSummary: string;
}

export const runRecommendationEngine = (answers: SamplingAnswers): CurationResult => {
  const businessType = answers.businessType ?? 'unsure';
  const defaults = BUSINESS_DEFAULTS[businessType] ?? BUSINESS_DEFAULTS.unsure;

  let candidates = FRAGRANCE_LIBRARY.filter((p) => !isExcluded(p, answers.exclusions));

  if (candidates.length < 5) {
    console.warn('[Sampling] Exclusions reduced pool — relaxing soft preferences');
    candidates = FRAGRANCE_LIBRARY.filter((p) => {
      const hardExclusions = answers.exclusions.filter((e) => e !== 'none' && e !== 'unsure');
      return !hardExclusions.some((ex) => {
        const tag = EXCLUSION_MAP[ex];
        return tag && p.exclusions.includes(tag);
      });
    });
  }

  const scored: ScoredProfile[] = candidates
    .map((profile) => ({ profile, score: scoreProfile(profile, answers) }))
    .sort((a, b) => b.score - a.score);

  // Boost business defaults
  defaults.forEach((id, i) => {
    const entry = scored.find((s) => s.profile.id === id);
    if (entry) entry.score += (defaults.length - i) * 2;
  });

  scored.sort((a, b) => b.score - a.score);

  const selected: FragranceProfile[] = [];
  const usedIds = new Set<string>();

  const tryAdd = (profile: FragranceProfile) => {
    if (selected.length >= 5 || usedIds.has(profile.id)) return false;
    const counts = familyCount(selected);
    if ((counts[profile.primaryFamily] ?? 0) >= 2) return false;
    if (selected.some((s) => isNearDuplicate(s, profile))) return false;
    selected.push(profile);
    usedIds.add(profile.id);
    return true;
  };

  // 1. Best match
  if (scored[0]) tryAdd(scored[0].profile);

  // 2. Safe commercial option
  const safe = [...scored].sort((a, b) => b.profile.commerciality - a.profile.commerciality);
  for (const s of safe) {
    if (selected.length >= 2) break;
    if (s.profile.commerciality >= 4) tryAdd(s.profile);
  }

  // 3. Fill from scored list with diversity
  for (const s of scored) {
    if (selected.length >= 5) break;
    tryAdd(s.profile);
  }

  // 4. Wildcard if adventure warrants
  const adventure = targetAdventure(answers);
  if (adventure >= 4 || answers.adventureLevel === 'wildcard') {
    const wildcard = [...scored].sort((a, b) => b.profile.adventure - a.profile.adventure);
    for (const w of wildcard) {
      if (selected.length >= 5) break;
      if (w.profile.adventure >= 4) tryAdd(w.profile);
    }
  }

  // 5. Fallback fill from defaults
  for (const id of defaults) {
    if (selected.length >= 5) break;
    const profile = FRAGRANCE_LIBRARY.find((p) => p.id === id);
    if (profile && !isExcluded(profile, answers.exclusions)) tryAdd(profile);
  }

  // 6. Last resort — any remaining
  for (const s of scored) {
    if (selected.length >= 5) break;
    if (!usedIds.has(s.profile.id)) {
      selected.push(s.profile);
      usedIds.add(s.profile.id);
    }
  }

  while (selected.length < 5) {
    const remaining = FRAGRANCE_LIBRARY.find((p) => !usedIds.has(p.id));
    if (!remaining) break;
    selected.push(remaining);
    usedIds.add(remaining.id);
  }

  const recommendations: Recommendation[] = selected.slice(0, 5).map((profile, index) => ({
    fragranceId: profile.id,
    role: pickRole(index, adventure),
    reason: buildReason(profile, pickRole(index, adventure), answers),
  }));

  const families = [...new Set(selected.map((p) => p.primaryFamily))];
  const selectionSummary = `We balanced ${families.length} scent families across five focused directions based on your brand personality, audience and preferences. Each selection plays a distinct role — from your strongest match to a complementary contrast — so you can compare directions without feeling overwhelmed.`;

  return { recommendations, selectionSummary };
};
