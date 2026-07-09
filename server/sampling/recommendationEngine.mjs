import { getMongoDb } from '../db/mongo.mjs';

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
    if (mapped.length) return [...new Set(mapped)];
    return ['fresh-aromatic', 'floral-fruity-gourmand', 'woods-spice-oud'];
  }
  return selected.filter((f) => f !== 'recommend').map(normalize);
};

const score = (fragrance, answers) => {
  let s = 0;
  const families = resolveFamilies(answers);
  const expressions = resolveExpression(answers);

  // Primary family match.
  if (families.includes(normalize(fragrance.primaryFamily))) s += 12;

  // Secondary families.
  const secondary = Array.isArray(fragrance.secondaryFamilies) ? fragrance.secondaryFamilies.map(normalize) : [];
  secondary.forEach((f) => {
    if (families.includes(f)) s += 2;
  });

  // Personality → family hints.
  const personalities = (Array.isArray(answers?.brandPersonalities) ? answers.brandPersonalities : []).filter(
    (p) => p !== 'recommend',
  );
  personalities.forEach((p) => {
    const mapped = (FAMILY_MAP[p] ?? []).map(normalize);
    if (mapped.includes(normalize(fragrance.primaryFamily))) s += 6;
    if (secondary.some((x) => mapped.includes(x))) s += 2;
  });

  // Scent expression.
  const expr = normalize(fragrance.scentExpression);
  expressions.forEach((e) => {
    if (expr === normalize(e)) s += 5;
  });

  // Business type suitability.
  const bt = normalize(answers?.businessType);
  if (bt && Array.isArray(fragrance.bestForBusinessTypes) && fragrance.bestForBusinessTypes.map(normalize).includes(bt)) {
    s += 3;
  }

  // Exclusions (soft) – penalize if overlap with tags/secondary families.
  const exclusions = Array.isArray(answers?.exclusions) ? answers.exclusions.map(normalize) : [];
  const exActive = exclusions.filter((e) => e !== 'none' && e !== 'unsure');
  const tags = Array.isArray(fragrance.tags) ? fragrance.tags.map(normalize) : [];
  exActive.forEach((ex) => {
    if (tags.includes(ex) || secondary.includes(ex)) s -= 8;
  });

  return s;
};

const isNearDuplicate = (a, b) => normalize(a.primaryFamily) === normalize(b.primaryFamily);

const pickRole = (i) => (['best-match', 'close-match', 'safe-option', 'adjacent', 'wildcard'][i] ?? 'adjacent');

const buildReason = (fragrance, role) => {
  if (role === 'best-match') return 'Selected as the strongest overall match to your brief.';
  if (role === 'close-match') return 'Selected as a close complementary direction that supports your brief.';
  if (role === 'safe-option') return 'Selected as a broadly approachable option for wearability.';
  if (role === 'wildcard') return 'Selected as a slightly more distinctive contrast to compare against.';
  return 'Selected as an adjacent direction to help you compare nearby scent styles.';
};

export async function recommendFive(answers) {
  const db = await getMongoDb();
  const fragrances = await db.collection('fragrances').find({ status: 'active' }).toArray();

  const bt = normalize(answers?.businessType) || 'unsure';
  const defaults = BUSINESS_DEFAULTS_BY_SLUG[bt] ?? BUSINESS_DEFAULTS_BY_SLUG.unsure;
  const defaultIndex = new Map(defaults.map((slug, idx) => [slug, idx]));

  const scored = fragrances
    .map((f) => {
      const base = score(f, answers);
      const boostIdx = defaultIndex.has(f.slug) ? defaultIndex.get(f.slug) : null;
      const boosted = boostIdx == null ? base : base + (defaults.length - boostIdx) * 2;
      return { fragrance: f, score: boosted };
    })
    .sort((a, b) => b.score - a.score);

  const selected = [];
  for (const entry of scored) {
    if (selected.length >= 5) break;
    if (selected.some((s) => isNearDuplicate(s.fragrance, entry.fragrance))) continue;
    selected.push(entry);
  }

  // If pool is tiny, just take top 5.
  const final = selected.length >= 5 ? selected.slice(0, 5) : scored.slice(0, 5);

  return {
    recommendations: final.map((entry, i) => ({
      fragranceSlug: entry.fragrance.slug,
      role: pickRole(i),
      reason: buildReason(entry.fragrance, pickRole(i)),
    })),
    selectionSummary: 'Recommendations were scored by family, expression, business fit, and preference exclusions.',
  };
}

