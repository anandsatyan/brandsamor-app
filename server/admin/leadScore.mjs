/**
 * Deterministic sampling-lead heat score from brief + funnel signals.
 * Does not call external web enrichment — formalized brand is inferred from
 * brand name, checkout company, and brand-stage answers.
 *
 * Age decay (from createdAt):
 * - under 7 days: tier from score as-is
 * - 7–14 days: hot steps down to warm (warm/cold unchanged)
 * - over 14 days: everything steps down to cold
 */

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const TWO_WEEKS_MS = 14 * DAY_MS;

const BRAND_STAGE_POINTS = {
  reworking: 32,
  'adding-fragrance': 28,
  'first-launch': 16,
  recommend: 8,
  exploring: 4,
};

const BUSINESS_TYPE_POINTS = {
  fashion: 12,
  beauty: 12,
  salon: 11,
  wellness: 11,
  hospitality: 11,
  standalone: 12,
  creator: 7,
  other: 6,
};

const STATUS_POINTS = {
  paid: 20,
  checkout_started: 12,
  curated: 8,
  in_progress: 2,
};

const TIER_SCORE_CAP = {
  hot: 100,
  warm: 69,
  cold: 39,
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function textLen(value) {
  return String(value ?? '').trim().length;
}

function looksLikeBrandName(name) {
  const raw = String(name ?? '').trim();
  if (raw.length < 2) return false;
  if (/^(n\/?a|none|test|asdf|xxx|no brand|tbd|null|undefined)$/i.test(raw)) return false;
  return true;
}

function looksFormalizedBrand(name) {
  const raw = String(name ?? '').trim();
  if (!looksLikeBrandName(raw)) return false;
  if (/\b(llc|ltd|inc|corp|co\.|company|studio|atelier|beauty|salon|spa|hotel|group)\b/i.test(raw)) {
    return true;
  }
  return raw.split(/\s+/).filter(Boolean).length >= 2 && raw.length >= 6;
}

function isRecommend(value) {
  return String(value ?? '').trim().toLowerCase() === 'recommend';
}

function countSpecific(values) {
  if (!Array.isArray(values)) return 0;
  return values.filter((v) => v && !isRecommend(v) && v !== 'none' && v !== 'unsure').length;
}

function tierFromScore(score) {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
}

function labelForTier(tier) {
  if (tier === 'hot') return 'Hot';
  if (tier === 'warm') return 'Warm';
  return 'Cold';
}

/**
 * Step heat down based on lead age from createdAt.
 * @param {'hot'|'warm'|'cold'} tier
 * @param {string|Date|null|undefined} createdAt
 * @param {number} [nowMs]
 */
export function applyLeadAgeDecay(tier, createdAt, nowMs = Date.now()) {
  const created = createdAt ? new Date(createdAt) : null;
  if (!created || Number.isNaN(created.getTime())) {
    return {
      tier,
      ageDays: null,
      ageDecay: null,
      detail: null,
    };
  }

  const ageMs = Math.max(0, nowMs - created.getTime());
  const ageDays = Math.floor(ageMs / DAY_MS);

  if (ageMs > TWO_WEEKS_MS) {
    return {
      tier: 'cold',
      ageDays,
      ageDecay: tier === 'cold' ? 'aged_over_two_weeks' : 'cooled_to_cold',
      detail:
        tier === 'cold'
          ? `Lead is ${ageDays} days old (over 2 weeks) — stays cold`
          : `Lead is ${ageDays} days old (over 2 weeks) — stepped down from ${tier} to cold`,
    };
  }

  if (ageMs > WEEK_MS) {
    if (tier === 'hot') {
      return {
        tier: 'warm',
        ageDays,
        ageDecay: 'cooled_to_warm',
        detail: `Lead is ${ageDays} days old (over 1 week) — stepped down from hot to warm`,
      };
    }
    return {
      tier,
      ageDays,
      ageDecay: 'aged_over_one_week',
      detail:
        tier === 'warm'
          ? `Lead is ${ageDays} days old (over 1 week) — hot is capped; stays warm`
          : `Lead is ${ageDays} days old (over 1 week) — stays cold`,
    };
  }

  return {
    tier,
    ageDays,
    ageDecay: null,
    detail: ageDays === 0 ? 'Lead created today' : `Lead is ${ageDays} day${ageDays === 1 ? '' : 's'} old`,
  };
}

/**
 * @param {object} doc - raw session or serialized lead-like shape
 * @param {{ now?: number }} [options]
 */
export function scoreSamplingLead(doc, options = {}) {
  const nowMs = typeof options.now === 'number' ? options.now : Date.now();
  const lead = doc?.lead ?? {};
  const answers = doc?.answers ?? {};
  const checkout = doc?.checkout ?? null;
  const status = String(doc?.status ?? 'in_progress');
  const signals = [];
  let score = 0;

  const brandStage = answers.brandStage ?? null;
  const stagePoints = BRAND_STAGE_POINTS[brandStage] ?? 0;
  if (stagePoints) {
    score += stagePoints;
    signals.push({
      key: 'brandStage',
      label: 'Brand stage',
      points: stagePoints,
      detail:
        brandStage === 'reworking' || brandStage === 'adding-fragrance'
          ? 'Existing brand / line — higher near-term priority'
          : brandStage === 'first-launch'
            ? 'Preparing a first launch'
            : brandStage === 'exploring'
              ? 'Still exploring — typically longer horizon'
              : 'Asked Brandsamor to recommend a starting route',
    });
  }

  const brandName = lead.brandName ?? null;
  let hasExistingBrandSignal = false;
  if (looksLikeBrandName(brandName)) {
    const base = 14;
    const formal = looksFormalizedBrand(brandName) ? 8 : 0;
    const points = base + formal;
    score += points;
    hasExistingBrandSignal = brandStage === 'adding-fragrance' || brandStage === 'reworking' || formal > 0;
    signals.push({
      key: 'brandName',
      label: 'Brand name provided',
      points,
      detail: formal
        ? `Named brand looks formalized (“${String(brandName).trim()}”)`
        : `Provided brand name “${String(brandName).trim()}”`,
    });
  } else if (brandStage === 'exploring') {
    signals.push({
      key: 'brandName',
      label: 'Brand name',
      points: 0,
      detail: 'No brand name — early / exploratory signal',
    });
  }

  if (textLen(checkout?.company) >= 2) {
    const points = 10;
    score += points;
    hasExistingBrandSignal = true;
    signals.push({
      key: 'company',
      label: 'Checkout company',
      points,
      detail: `Company on checkout: “${String(checkout.company).trim()}”`,
    });
  }

  const businessType = answers.businessType ?? null;
  const bizPoints = BUSINESS_TYPE_POINTS[businessType] ?? 0;
  if (bizPoints) {
    score += bizPoints;
    signals.push({
      key: 'businessType',
      label: 'Business type',
      points: bizPoints,
      detail:
        businessType === 'creator'
          ? 'Creator / personal brand'
          : businessType === 'other' && textLen(answers.businessTypeOther)
            ? `Other: ${String(answers.businessTypeOther).trim()}`
            : `Operating as ${String(businessType).replace(/-/g, ' ')}`,
    });
  }

  const statusPoints = STATUS_POINTS[status] ?? 0;
  if (statusPoints) {
    score += statusPoints;
    signals.push({
      key: 'funnel',
      label: 'Funnel progress',
      points: statusPoints,
      detail:
        status === 'paid'
          ? 'Paid for sample kit'
          : status === 'checkout_started'
            ? 'Reached checkout'
            : status === 'curated'
              ? 'Completed curation'
              : 'Still in progress',
    });
  }

  let detailPoints = 0;
  const specificChoices = [
    !isRecommend(answers.scentExpression) && answers.scentExpression,
    !isRecommend(answers.intensity) && answers.intensity,
    !isRecommend(answers.useCase) && answers.useCase,
    !isRecommend(answers.packagingDirection) && answers.packagingDirection,
    !isRecommend(answers.bottleSize) && answers.bottleSize,
  ].filter(Boolean).length;
  detailPoints += specificChoices * 2;

  const personalityCount = countSpecific(answers.brandPersonalities);
  const familyCount = countSpecific(answers.scentFamilies);
  detailPoints += Math.min(6, personalityCount * 2);
  detailPoints += Math.min(6, familyCount * 2);

  const likedLen = textLen(answers.likedFragrances);
  if (likedLen >= 12) detailPoints += likedLen >= 80 ? 10 : likedLen >= 40 ? 7 : 4;

  const notesLen = textLen(answers.additionalNotes);
  if (notesLen >= 12) detailPoints += notesLen >= 120 ? 10 : notesLen >= 40 ? 7 : 4;

  const exclusions = Array.isArray(answers.exclusions) ? answers.exclusions : [];
  if (exclusions.some((e) => e && e !== 'none' && e !== 'unsure')) detailPoints += 3;

  const recommendHeavy =
    [answers.scentExpression, answers.intensity, answers.useCase, brandStage].filter(isRecommend)
      .length >= 2;
  if (recommendHeavy && (brandStage === 'exploring' || !looksLikeBrandName(brandName))) {
    detailPoints -= 6;
  }

  detailPoints = clamp(detailPoints, 0, 28);
  if (detailPoints > 0) {
    score += detailPoints;
    signals.push({
      key: 'detail',
      label: 'Brief detail',
      points: detailPoints,
      detail:
        detailPoints >= 18
          ? 'Detailed, specific brief'
          : detailPoints >= 10
            ? 'Moderate brief detail'
            : 'Some specificity in answers',
    });
  }

  if (
    (brandStage === 'adding-fragrance' || brandStage === 'reworking') &&
    looksLikeBrandName(brandName)
  ) {
    hasExistingBrandSignal = true;
  }

  const baseScore = clamp(Math.round(score), 0, 100);
  const baseTier = tierFromScore(baseScore);

  const age = applyLeadAgeDecay(baseTier, doc?.createdAt, nowMs);
  const tier = age.tier;
  const scoreAfterAge = Math.min(baseScore, TIER_SCORE_CAP[tier]);

  if (age.detail) {
    signals.push({
      key: 'age',
      label: 'Age',
      points: scoreAfterAge - baseScore,
      detail: age.detail,
    });
  }

  let summary =
    tier === 'hot'
      ? hasExistingBrandSignal
        ? 'High near-term priority — existing brand / commercial signals'
        : 'High near-term priority — strong intent and brief quality'
      : tier === 'warm'
        ? 'Medium priority — nurture now if capacity allows'
        : 'Lower near-term priority — better for later re-engagement';

  if (age.ageDecay === 'cooled_to_warm') {
    summary = 'Was hot on brief quality, but cooled to warm after one week';
  } else if (age.ageDecay === 'cooled_to_cold') {
    summary = `Was ${baseTier} on brief quality, but cooled to cold after two weeks`;
  } else if (age.ageDecay === 'aged_over_two_weeks') {
    summary = 'Over two weeks old — treated as cold for near-term outreach';
  }

  signals.sort((a, b) => Math.abs(b.points) - Math.abs(a.points));

  return {
    score: scoreAfterAge,
    baseScore,
    tier,
    baseTier,
    label: labelForTier(tier),
    summary,
    signals,
    hasExistingBrandSignal: Boolean(hasExistingBrandSignal),
    ageDays: age.ageDays,
    ageDecay: age.ageDecay,
  };
}

export function heatSortRank(tier) {
  if (tier === 'hot') return 0;
  if (tier === 'warm') return 1;
  return 2;
}
