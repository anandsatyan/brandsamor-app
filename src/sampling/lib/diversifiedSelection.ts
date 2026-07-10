// @ts-nocheck
/**
 * Diversified fragrance selection: 2 core matches + 2 adjacent discoveries + 1 controlled wildcard.
 * Pure functions — no I/O — so the algorithm can be unit-tested without Mongo.
 * Keep in sync with server/sampling/diversifiedSelection.mjs
 */

export const recommendationConfig = {
  highSimilarityThreshold: 0.72,
  nearDuplicateThreshold: 0.85,
  adjacentMinimumPreferenceScore: 0.55,
  wildcardMinimumPreferenceScore: 0.35,
  maximumSamePrimaryFamily: 2,
  maximumSameDominantAccord: 2,
  maximumFreshCitrusWoody: 2,
  corePreferenceWeight: 0.85,
  coreDiversityWeight: 0.15,
  adjacentPreferenceWeight: 0.7,
  adjacentDiversityWeight: 0.3,
  wildcardPreferenceWeight: 0.45,
  wildcardDiversityWeight: 0.55,
  nearDuplicatePenalty: 0.35,
  minimumDistinctDirections: 3,
};

const similarityWeights = {
  primaryFamily: 0.25,
  dominantAccords: 0.25,
  secondaryFamilies: 0.1,
  openingProfile: 0.1,
  heartProfile: 0.1,
  drydownProfile: 0.15,
  numericProfileSimilarity: 0.05,
};

const FRESH_CITRUS_WOODY_FAMILIES = new Set([
  'fresh-aromatic',
  'citrus-fresh',
  'aquatic-aromatic',
]);

const FRESH_CITRUS_WOODY_ACCORDS = new Set([
  'citrus',
  'fresh',
  'woody',
  'aromatic',
  'green',
  'marine',
  'mineral',
  'herbal',
  'lavender',
  'pepper',
  'tea',
]);

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const uniqueNormalized = (values) => {
  const out = [];
  const seen = new Set();
  for (const value of values ?? []) {
    const n = normalize(value);
    if (!n || seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
};

const jaccard = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  if (setA.size === 0 && setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection += 1;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
};

const numericSimilarity = (a, b) => {
  const keys = ['sweetness', 'freshness', 'warmth', 'darkness', 'floralIntensity', 'woodiness'];
  let total = 0;
  for (const key of keys) {
    const av = Number(a[key] ?? 5);
    const bv = Number(b[key] ?? 5);
    total += 1 - Math.min(1, Math.abs(av - bv) / 10);
  }
  return total / keys.length;
};

const tokenOverlapRatio = (a, b) => jaccard(a, b);

/**
 * @param {object} a selection profile
 * @param {object} b selection profile
 * @returns {number} 0..1 similarity
 */
export function calculateFragranceSimilarity(a, b) {
  const primary = normalize(a.primaryFamily) === normalize(b.primaryFamily) ? 1 : 0;
  const dominant = tokenOverlapRatio(a.dominantAccords ?? [], b.dominantAccords ?? []);
  const secondary = tokenOverlapRatio(a.secondaryFamilies ?? [], b.secondaryFamilies ?? []);
  const opening = tokenOverlapRatio(a.openingProfile ?? [], b.openingProfile ?? []);
  const heart = tokenOverlapRatio(a.heartProfile ?? [], b.heartProfile ?? []);
  const drydown = tokenOverlapRatio(a.drydownProfile ?? [], b.drydownProfile ?? []);
  const numeric = numericSimilarity(a, b);

  return (
    primary * similarityWeights.primaryFamily +
    dominant * similarityWeights.dominantAccords +
    secondary * similarityWeights.secondaryFamilies +
    opening * similarityWeights.openingProfile +
    heart * similarityWeights.heartProfile +
    drydown * similarityWeights.drydownProfile +
    numeric * similarityWeights.numericProfileSimilarity
  );
}

const dominantAccordOf = (profile) => normalize(profile.dominantAccords?.[0] ?? '');

export function isFreshCitrusWoody(profile) {
  if (FRESH_CITRUS_WOODY_FAMILIES.has(normalize(profile.primaryFamily))) return true;
  const accords = new Set([
    ...(profile.dominantAccords ?? []).map(normalize),
    ...(profile.secondaryFamilies ?? []).map(normalize),
    ...(profile.tags ?? []).map(normalize),
  ]);
  let hits = 0;
  for (const accord of accords) {
    if (FRESH_CITRUS_WOODY_ACCORDS.has(accord)) hits += 1;
  }
  return hits >= 3;
}

const scentDirectionKey = (profile) => {
  const family = normalize(profile.primaryFamily);
  const accord = dominantAccordOf(profile) || 'none';
  return `${family}:${accord}`;
};

const averageNumeric = (selected, key) => {
  if (!selected.length) return 0;
  return selected.reduce((sum, item) => sum + Number(item.profile[key] ?? 5), 0) / selected.length;
};

const profilesTooUniform = (selected, candidate) => {
  if (selected.length < 3) return false;
  const keys = ['freshness', 'sweetness', 'warmth'];
  return keys.every((key) => {
    const avg = averageNumeric(selected, key);
    const value = Number(candidate[key] ?? 5);
    return Math.abs(avg - value) <= 1.5;
  });
};

/**
 * Build constraint snapshot for the current selected set.
 */
function analyzeSelected(selected) {
  const familyCounts = {};
  const accordCounts = {};
  let freshCitrusWoody = 0;
  let nearDuplicatePairs = 0;
  const directions = new Set();

  for (const item of selected) {
    const family = normalize(item.profile.primaryFamily);
    familyCounts[family] = (familyCounts[family] ?? 0) + 1;
    const accord = dominantAccordOf(item.profile);
    if (accord) accordCounts[accord] = (accordCounts[accord] ?? 0) + 1;
    if (isFreshCitrusWoody(item.profile)) freshCitrusWoody += 1;
    directions.add(scentDirectionKey(item.profile));
  }

  for (let i = 0; i < selected.length; i += 1) {
    for (let j = i + 1; j < selected.length; j += 1) {
      const sim = calculateFragranceSimilarity(selected[i].profile, selected[j].profile);
      if (sim >= recommendationConfig.highSimilarityThreshold) nearDuplicatePairs += 1;
    }
  }

  return { familyCounts, accordCounts, freshCitrusWoody, nearDuplicatePairs, directions };
}

function similarityStats(candidate, selected) {
  if (!selected.length) {
    return { maxSimilarity: 0, averageSimilarity: 0, diversityScore: 1, similarities: [] };
  }
  const similarities = selected.map((item) => calculateFragranceSimilarity(candidate, item.profile));
  const maxSimilarity = Math.max(...similarities);
  const averageSimilarity = similarities.reduce((sum, value) => sum + value, 0) / similarities.length;
  return {
    maxSimilarity,
    averageSimilarity,
    diversityScore: 1 - averageSimilarity,
    similarities,
  };
}

function sharesConnectionWithSelected(candidate, selected) {
  if (!selected.length) return true;
  const candidateTokens = new Set([
    normalize(candidate.primaryFamily),
    ...(candidate.secondaryFamilies ?? []).map(normalize),
    ...(candidate.dominantAccords ?? []).map(normalize),
    ...(candidate.tags ?? []).map(normalize),
  ]);
  return selected.some((item) => {
    const tokens = [
      normalize(item.profile.primaryFamily),
      ...(item.profile.secondaryFamilies ?? []).map(normalize),
      ...(item.profile.dominantAccords ?? []).map(normalize),
      ...(item.profile.tags ?? []).map(normalize),
    ];
    return tokens.some((token) => token && candidateTokens.has(token));
  });
}

function violatesHardConstraints(candidate, selected, stage, relaxLevel) {
  const cfg = recommendationConfig;
  const analysis = analyzeSelected(selected);
  const family = normalize(candidate.primaryFamily);
  const accord = dominantAccordOf(candidate);
  const stats = similarityStats(candidate, selected);

  // Always reject exact near-duplicates unless heavily relaxed.
  if (relaxLevel < 3 && stats.maxSimilarity >= cfg.nearDuplicateThreshold) {
    return 'Near-duplicate of an already-selected fragrance';
  }

  if (relaxLevel < 2) {
    if ((analysis.familyCounts[family] ?? 0) >= cfg.maximumSamePrimaryFamily) {
      return `Already have ${cfg.maximumSamePrimaryFamily} fragrances in primary family ${family}`;
    }
    if (accord && (analysis.accordCounts[accord] ?? 0) >= cfg.maximumSameDominantAccord) {
      return `Already have ${cfg.maximumSameDominantAccord} fragrances with dominant accord ${accord}`;
    }
    if (isFreshCitrusWoody(candidate) && analysis.freshCitrusWoody >= cfg.maximumFreshCitrusWoody) {
      return 'Fresh-citrus-woody quota already filled';
    }
  }

  if (relaxLevel < 1 && stats.maxSimilarity >= cfg.highSimilarityThreshold) {
    if (analysis.nearDuplicatePairs >= 1) {
      return 'Would create more than one highly similar pair';
    }
  }

  if (stage === 'wildcard' && relaxLevel < 2) {
    const cores = selected.filter((item) => item.recommendationType === 'core_match');
    for (const core of cores) {
      const sameFamily = normalize(core.profile.primaryFamily) === family;
      const sameAccord = dominantAccordOf(core.profile) === accord && Boolean(accord);
      if (sameFamily && sameAccord) {
        return 'Wildcard shares primary family and dominant accord with a core match';
      }
    }
  }

  if (relaxLevel < 2 && profilesTooUniform(selected, candidate)) {
    return 'Would keep freshness/sweetness/warmth essentially uniform across the set';
  }

  return null;
}

function scoreForStage(preferenceScore, diversityScore, maxSimilarity, stage) {
  const cfg = recommendationConfig;
  let score;
  if (stage === 'core') {
    score = preferenceScore * cfg.corePreferenceWeight + diversityScore * cfg.coreDiversityWeight;
  } else if (stage === 'adjacent') {
    score = preferenceScore * cfg.adjacentPreferenceWeight + diversityScore * cfg.adjacentDiversityWeight;
  } else {
    score = preferenceScore * cfg.wildcardPreferenceWeight + diversityScore * cfg.wildcardDiversityWeight;
  }
  if (maxSimilarity >= cfg.nearDuplicateThreshold) {
    score -= cfg.nearDuplicatePenalty;
  }
  return score;
}

function buildReasons(profile, recommendationType, answers, selected, preferenceScore) {
  const reasons = [];
  const families = Array.isArray(answers?.resolvedFamilies) ? answers.resolvedFamilies : [];
  const family = normalize(profile.primaryFamily);
  const accords = (profile.dominantAccords ?? []).slice(0, 3);
  const accordText = accords.length ? accords.join(', ') : family;

  if (families.map(normalize).includes(family) || preferenceScore >= 0.7) {
    reasons.push(`A direct match for your preference around ${accordText}.`);
  } else if (preferenceScore >= 0.45) {
    reasons.push(`Stays relevant to your brief through ${accordText}.`);
  } else {
    reasons.push(`Keeps a meaningful link to your brief via ${accordText}.`);
  }

  if (selected.length) {
    const stats = similarityStats(profile, selected);
    if (stats.diversityScore >= 0.45) {
      const contrast = profile.drydownProfile?.[0] || profile.heartProfile?.[0] || accords[1] || 'a contrasting texture';
      reasons.push(`Adds contrast with ${normalize(contrast)} against the cleaner or closer matches already chosen.`);
    } else {
      reasons.push('Supports the set while shifting the profile enough to compare side by side.');
    }
  }

  if (recommendationType === 'core_match') {
    reasons.push('Selected as a Core Match — one of the strongest fits to your answers.');
  } else if (recommendationType === 'adjacent_discovery') {
    reasons.push('Selected as an Adjacent Discovery — relevant, but a noticeably different direction.');
  } else {
    reasons.push('Selected as a Controlled Wildcard — more distinct, still connected to your preferences.');
  }

  return reasons.slice(0, 3);
}

const ROLE_BY_TYPE_INDEX = {
  core_match: ['best-match', 'close-match'],
  adjacent_discovery: ['safe-option', 'adjacent'],
  wildcard: ['wildcard'],
};

function toApiRole(recommendationType, typeIndex) {
  const roles = ROLE_BY_TYPE_INDEX[recommendationType] ?? ['adjacent'];
  return roles[Math.min(typeIndex, roles.length - 1)];
}

/**
 * Iteratively select five fragrances with diversity constraints.
 *
 * @param {Array<{ profile: object, preferenceScore: number, rawScore?: number }>} scored
 * @param {object} answers
 * @param {{ isDev?: boolean }} [options]
 */
export function selectDiversifiedRecommendations(scored, answers = {}, options = {}) {
  const cfg = recommendationConfig;
  const isDev = Boolean(options.isDev);
  const selected = [];
  const rejected = [];
  const usedIds = new Set();

  const available = () => scored.filter((entry) => !usedIds.has(entry.profile.id));

  const trySelect = (stage, recommendationType, typeIndex, predicates, relaxStart = 0) => {
    for (let relaxLevel = relaxStart; relaxLevel <= 4; relaxLevel += 1) {
      const pool = available()
        .map((entry) => {
          const stats = similarityStats(entry.profile, selected);
          const rejection = violatesHardConstraints(entry.profile, selected, stage, relaxLevel);
          const predicateFailure = predicates(entry, stats, relaxLevel);
          return {
            entry,
            stats,
            rejection: rejection || predicateFailure,
            finalScore: scoreForStage(entry.preferenceScore, stats.diversityScore, stats.maxSimilarity, stage),
          };
        })
        .filter((row) => !row.rejection)
        .sort((a, b) => b.finalScore - a.finalScore || b.entry.preferenceScore - a.entry.preferenceScore);

      if (!pool.length) {
        continue;
      }

      const best = pool[0];
      const reasons = buildReasons(
        best.entry.profile,
        recommendationType,
        answers,
        selected,
        best.entry.preferenceScore,
      );
      selected.push({
        profile: best.entry.profile,
        preferenceScore: best.entry.preferenceScore,
        diversityScore: best.stats.diversityScore,
        finalScore: best.finalScore,
        maxSimilarityToSelected: best.stats.maxSimilarity,
        averageSimilarityToSelected: best.stats.averageSimilarity,
        recommendationType,
        role: toApiRole(recommendationType, typeIndex),
        reasons,
        reason: reasons.join(' '),
        relaxLevel,
      });
      usedIds.add(best.entry.profile.id);

      if (isDev) {
        for (const row of available().slice(0, 8)) {
          const stats = similarityStats(row.profile, selected.slice(0, -1));
          const rejection = violatesHardConstraints(row.profile, selected.slice(0, -1), stage, relaxLevel);
          const predicateFailure = predicates(row, stats, relaxLevel);
          if (rejection || predicateFailure) {
            rejected.push({
              name: row.profile.name,
              rejected: true,
              rejectionReason: rejection || predicateFailure,
            });
          }
        }
      }
      return true;
    }
    return false;
  };

  // Stage 1 — first Core Match: highest preference score.
  trySelect(
    'core',
    'core_match',
    0,
    (entry, _stats, relaxLevel) => {
      if (relaxLevel === 0 && entry.preferenceScore < 0.2) return 'Preference score too low for first core match';
      return null;
    },
  );

  // Stage 2 — second Core Match with light diversity.
  trySelect(
    'core',
    'core_match',
    1,
    (entry, stats, relaxLevel) => {
      if (relaxLevel === 0 && stats.maxSimilarity >= cfg.highSimilarityThreshold) {
        return 'Too similar to the first core match';
      }
      return null;
    },
  );

  // Stages 3–4 — Adjacent Discoveries.
  for (let i = 0; i < 2; i += 1) {
    trySelect(
      'adjacent',
      'adjacent_discovery',
      i,
      (entry, stats, relaxLevel) => {
        if (relaxLevel === 0 && entry.preferenceScore < cfg.adjacentMinimumPreferenceScore) {
          return `Adjacent preference below ${cfg.adjacentMinimumPreferenceScore}`;
        }
        if (relaxLevel <= 1 && !sharesConnectionWithSelected(entry.profile, selected)) {
          return 'No shared family/accord connection with selected set';
        }
        if (relaxLevel === 0 && stats.maxSimilarity >= cfg.highSimilarityThreshold) {
          return 'Too similar to an already-selected fragrance';
        }
        return null;
      },
    );
  }

  // Stage 5 — Controlled Wildcard.
  trySelect(
    'wildcard',
    'wildcard',
    0,
    (entry, stats, relaxLevel) => {
      if (relaxLevel === 0 && entry.preferenceScore < cfg.wildcardMinimumPreferenceScore) {
        return `Wildcard preference below ${cfg.wildcardMinimumPreferenceScore}`;
      }
      if (relaxLevel <= 1 && !sharesConnectionWithSelected(entry.profile, selected)) {
        return 'Wildcard lacks a meaningful preference connection';
      }
      if (relaxLevel === 0 && stats.diversityScore < 0.35) {
        return 'Not distinct enough to serve as wildcard';
      }
      return null;
    },
  );

  // Fallback fill — never return fewer than five unique IDs.
  let relaxLevel = 0;
  while (selected.length < 5 && available().length) {
    const filled = trySelect(
      selected.length < 2 ? 'core' : selected.length < 4 ? 'adjacent' : 'wildcard',
      selected.length < 2 ? 'core_match' : selected.length < 4 ? 'adjacent_discovery' : 'wildcard',
      selected.length < 2 ? selected.length : selected.length < 4 ? selected.length - 2 : 0,
      () => null,
      Math.min(4, relaxLevel),
    );
    if (!filled) {
      // Absolute last resort: take highest remaining preference, ignoring diversity.
      const next = available().sort((a, b) => b.preferenceScore - a.preferenceScore)[0];
      if (!next) break;
      const recommendationType =
        selected.length < 2 ? 'core_match' : selected.length < 4 ? 'adjacent_discovery' : 'wildcard';
      const typeIndex = selected.filter((item) => item.recommendationType === recommendationType).length;
      const reasons = buildReasons(next.profile, recommendationType, answers, selected, next.preferenceScore);
      selected.push({
        profile: next.profile,
        preferenceScore: next.preferenceScore,
        diversityScore: similarityStats(next.profile, selected).diversityScore,
        finalScore: next.preferenceScore,
        maxSimilarityToSelected: similarityStats(next.profile, selected).maxSimilarity,
        averageSimilarityToSelected: similarityStats(next.profile, selected).averageSimilarity,
        recommendationType,
        role: toApiRole(recommendationType, typeIndex),
        reasons,
        reason: reasons.join(' '),
        relaxLevel: 4,
      });
      usedIds.add(next.profile.id);
    }
    relaxLevel += 1;
  }

  if (isDev) {
    const table = selected.map((item) => ({
      name: item.profile.name,
      preferenceScore: Number(item.preferenceScore.toFixed(3)),
      recommendationType: item.recommendationType,
      maxSimilarityToSelected: Number(item.maxSimilarityToSelected.toFixed(3)),
      averageSimilarityToSelected: Number(item.averageSimilarityToSelected.toFixed(3)),
      diversityScore: Number(item.diversityScore.toFixed(3)),
      finalScore: Number(item.finalScore.toFixed(3)),
      primaryFamily: item.profile.primaryFamily,
      dominantAccords: item.profile.dominantAccords,
    }));
    console.log('[sampling-selection] final set', table);
    if (rejected.length) {
      console.log('[sampling-selection] sample rejections', rejected.slice(0, 12));
    }
  }

  return selected.slice(0, 5);
}

/**
 * Normalize raw preference scores to 0..1 using the max score in the pool.
 */
export function normalizePreferenceScores(scored) {
  const max = Math.max(...scored.map((entry) => entry.rawScore), 0.0001);
  return scored.map((entry) => ({
    ...entry,
    preferenceScore: Math.max(0, Math.min(1, entry.rawScore / max)),
  }));
}

/**
 * Derive a selection profile from a Mongo fragrance document (+ optional notes).
 */
export function buildSelectionProfileFromMongo(fragrance, notePyramid = null) {
  const layers = notePyramid?.layers ?? fragrance.notes ?? {};
  const tags = uniqueNormalized(fragrance.tags);
  const secondaryFamilies = uniqueNormalized(fragrance.secondaryFamilies);
  const openingProfile = uniqueNormalized(layers.top);
  const heartProfile = uniqueNormalized(layers.heart);
  const drydownProfile = uniqueNormalized(layers.base);
  const hero = uniqueNormalized(notePyramid?.hero ?? layers.hero ?? []);

  const dominantAccords = uniqueNormalized([
    ...secondaryFamilies.slice(0, 3),
    ...tags.slice(0, 3),
    ...hero.slice(0, 2),
  ]).slice(0, 4);

  const scores = fragrance.scores ?? {};
  const scale = (value, fallback) => {
    if (value == null || Number.isNaN(Number(value))) return fallback;
    const n = Number(value);
    // Stored scores are typically 1–5; convert to 0–10.
    return n <= 5 ? n * 2 : Math.max(0, Math.min(10, n));
  };

  const tokenSet = new Set([...tags, ...secondaryFamilies, ...openingProfile, ...heartProfile, ...drydownProfile]);
  const has = (...keys) => keys.some((key) => tokenSet.has(key));

  return {
    id: fragrance.slug || fragrance.id,
    name: fragrance.customerFacingName || fragrance.name || fragrance.slug || fragrance.id,
    primaryFamily: normalize(fragrance.primaryFamily),
    secondaryFamilies,
    dominantAccords,
    supportingAccords: uniqueNormalized([...tags, ...secondaryFamilies]).slice(4, 8),
    openingProfile,
    heartProfile,
    drydownProfile,
    tags,
    sweetness: scale(scores.sweetness, has('gourmand', 'vanilla', 'sweet', 'fruity') ? 7 : has('floral') ? 5 : 3),
    freshness: scale(scores.freshness, has('citrus', 'fresh', 'green', 'marine', 'mint') ? 8 : 4),
    warmth: scale(scores.warmth, has('amber', 'vanilla', 'spicy', 'tobacco', 'oud', 'incense') ? 7 : 4),
    darkness: scale(scores.darkness, has('oud', 'smoky', 'incense', 'leather', 'dark') ? 8 : 3),
    floralIntensity: scale(scores.floralIntensity, has('floral', 'rose', 'violet', 'iris') ? 7 : 3),
    woodiness: scale(scores.woodiness, has('woody', 'cedar', 'sandalwood', 'vetiver', 'cypress') ? 7 : 4),
    genderExpression: normalize(fragrance.scentExpression) || undefined,
    exclusions: uniqueNormalized(fragrance.exclusions),
    raw: fragrance,
  };
}

/**
 * Derive a selection profile from the client static FragranceProfile shape.
 */
export function buildSelectionProfileFromClient(profile) {
  const tags = uniqueNormalized(profile.tags);
  const primaryFamily = normalize(profile.primaryFamily);
  const dominantAccords = uniqueNormalized([primaryFamily, ...tags]).slice(0, 4);

  const scale5to10 = (value, fallback) => {
    if (value == null || Number.isNaN(Number(value))) return fallback;
    return Math.max(0, Math.min(10, Number(value) * 2));
  };

  return {
    id: profile.id,
    name: profile.customerName || profile.id,
    primaryFamily,
    secondaryFamilies: uniqueNormalized(profile.secondaryFamilies ?? tags),
    dominantAccords,
    supportingAccords: tags.slice(0, 4),
    openingProfile: uniqueNormalized(profile.openingProfile ?? tags.slice(0, 2)),
    heartProfile: uniqueNormalized(profile.heartProfile ?? tags.slice(0, 2)),
    drydownProfile: uniqueNormalized(profile.drydownProfile ?? [primaryFamily]),
    tags,
    sweetness: scale5to10(profile.sweetness, 5),
    freshness: scale5to10(profile.freshness, 5),
    warmth: scale5to10(profile.warmth, 10 - scale5to10(profile.freshness, 5)),
    darkness: scale5to10(profile.darkness, profile.intensity >= 4 ? 7 : 3),
    floralIntensity: scale5to10(
      profile.floralIntensity,
      primaryFamily.includes('floral') ? 7 : 3,
    ),
    woodiness: scale5to10(profile.woodiness, primaryFamily.includes('wood') ? 7 : 4),
    genderExpression: Array.isArray(profile.scentExpression)
      ? normalize(profile.scentExpression[0])
      : normalize(profile.scentExpression),
    exclusions: uniqueNormalized(profile.exclusions),
    raw: profile,
  };
}
