import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  calculateFragranceSimilarity,
  isFreshCitrusWoody,
  selectDiversifiedRecommendations,
  normalizePreferenceScores,
  buildSelectionProfileFromMongo,
  recommendationConfig,
} from '../server/sampling/diversifiedSelection.mjs';
import { recommendFiveFromRows } from '../server/sampling/recommendFiveCore.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const importJson = JSON.parse(
  readFileSync(path.resolve(__dirname, '../public/brandsamor_fragrance_library_16_import.json'), 'utf8'),
);

const core16Rows = importJson.fragrances.map((fragrance) => ({
  fragrance,
  notePyramid: {
    layers: {
      top: fragrance.notes?.top ?? [],
      heart: fragrance.notes?.heart ?? [],
      base: fragrance.notes?.base ?? [],
    },
    hero: fragrance.notes?.hero ?? [],
  },
}));

const bySlug = Object.fromEntries(
  core16Rows.map((row) => [row.fragrance.slug, buildSelectionProfileFromMongo(row.fragrance, row.notePyramid)]),
);

const baseAnswers = {
  brandPersonalities: ['fresh-clean', 'modern-energetic'],
  scentFamilies: ['recommend'],
  scentExpression: 'gender-neutral',
  businessType: 'fashion',
  exclusions: [],
};

test('calculateFragranceSimilarity returns 0..1 and ranks near-duplicates higher', () => {
  const a = bySlug['sparkling-citrus-woods'];
  const b = bySlug['modern-blue'];
  const c = bySlug['midnight-cafe'];
  const similar = calculateFragranceSimilarity(a, b);
  const different = calculateFragranceSimilarity(a, c);
  assert.ok(similar >= 0 && similar <= 1);
  assert.ok(different >= 0 && different <= 1);
  assert.ok(similar > different);
});

test('fresh-profile clustering does not return five fresh citrus-aromatic fragrances', () => {
  // Force high preference on the classic fresh cluster from the brief.
  const boosted = new Set([
    'sparkling-citrus-woods', // Imagination
    'modern-blue', // Sauvage EDT
    'bright-citrus', // Lime Basil & Mandarin
    'salted-air', // Wood Sage & Sea Salt
    'green-horizon', // Hacivat
    'warm-spice', // Man in Black
    'soft-petals', // Valaya-like soft floral stand-in
    'vanilla-veil', // adjacent warm contrast stand-in
  ]);

  const scored = normalizePreferenceScores(
    Object.values(bySlug).map((profile) => ({
      profile,
      rawScore: boosted.has(profile.id) ? (profile.id === 'sparkling-citrus-woods' ? 20 : 16) : 4,
    })),
  );

  const selected = selectDiversifiedRecommendations(scored, {
    ...baseAnswers,
    resolvedFamilies: ['fresh-aromatic', 'citrus', 'green', 'woody'],
  });

  assert.equal(selected.length, 5);
  assert.equal(new Set(selected.map((s) => s.profile.id)).size, 5);

  const freshCount = selected.filter((s) => isFreshCitrusWoody(s.profile)).length;
  assert.ok(
    freshCount <= recommendationConfig.maximumFreshCitrusWoody + 1,
    `expected limited fresh-citrus-woody count, got ${freshCount}: ${selected.map((s) => s.profile.id).join(', ')}`,
  );

  const families = new Set(selected.map((s) => s.profile.primaryFamily));
  assert.ok(families.size >= 2, 'expected more than one primary family in diversified fresh scenario');
});

test('gourmand preference stays relevant without five identical vanilla profiles', () => {
  const result = recommendFiveFromRows(core16Rows, {
    brandPersonalities: ['sweet-playful', 'warm-sensual'],
    scentFamilies: ['recommend'],
    scentExpression: 'feminine-leaning',
    businessType: 'beauty',
    exclusions: [],
  });

  assert.equal(result.recommendations.length, 5);
  assert.equal(new Set(result.recommendations.map((r) => r.fragranceSlug)).size, 5);

  const selected = result.recommendations.map((r) => bySlug[r.fragranceSlug]);
  const gourmandish = selected.filter((p) =>
    ['floral-fruity-gourmand'].includes(p.primaryFamily) ||
    p.secondaryFamilies.some((f) => ['vanilla', 'gourmand', 'coffee', 'fruity'].includes(f)),
  );
  assert.ok(gourmandish.length >= 2, 'expected mostly relevant gourmand-adjacent picks');

  const vanillaHeavy = selected.filter((p) => p.dominantAccords.includes('vanilla') || p.tags.includes('vanilla'));
  assert.ok(vanillaHeavy.length <= 2, 'should not return five near-identical vanilla fragrances');
});

test('oud preference yields varied woods-spice expressions plus an adjacent contrast', () => {
  const result = recommendFiveFromRows(core16Rows, {
    brandPersonalities: ['bold-luxurious', 'dark-mysterious'],
    scentFamilies: ['recommend'],
    scentExpression: 'gender-neutral',
    businessType: 'standalone',
    exclusions: [],
  });

  assert.equal(result.recommendations.length, 5);
  const selected = result.recommendations.map((r) => bySlug[r.fragranceSlug]);
  const woods = selected.filter((p) => p.primaryFamily === 'woods-spice-oud');
  assert.ok(woods.length >= 2, 'expected multiple woods-spice-oud expressions');

  const accords = new Set(selected.flatMap((p) => p.dominantAccords));
  assert.ok(accords.size >= 3, 'expected varied accords across oud-leaning set');
});

test('strong sweetness exclusion never returns a sweet gourmand wildcard', () => {
  const result = recommendFiveFromRows(core16Rows, {
    brandPersonalities: ['fresh-clean', 'minimal-understated'],
    scentFamilies: ['recommend'],
    scentExpression: 'gender-neutral',
    businessType: 'wellness',
    exclusions: ['very-sweet'],
  });

  assert.equal(result.recommendations.length, 5);
  const wildcard = result.recommendations.find((r) => r.recommendationType === 'wildcard' || r.role === 'wildcard');
  assert.ok(wildcard, 'expected a wildcard recommendation');
  const profile = bySlug[wildcard.fragranceSlug];
  const sweetSignals = ['gourmand', 'vanilla', 'coffee', 'sweet'];
  const hit = [...profile.tags, ...profile.secondaryFamilies, ...profile.dominantAccords].some((t) =>
    sweetSignals.includes(t),
  );
  assert.equal(hit, false, `wildcard should not be a sweet gourmand, got ${profile.id}`);
});

test('limited candidate pool still returns five unique fragrances', () => {
  const limitedRows = core16Rows.filter((row) =>
    ['bright-citrus', 'green-horizon', 'modern-blue', 'salted-air', 'aromatic-reserve', 'sparkling-citrus-woods'].includes(
      row.fragrance.slug,
    ),
  );
  const result = recommendFiveFromRows(limitedRows, {
    ...baseAnswers,
    exclusions: [],
  });
  assert.equal(result.recommendations.length, 5);
  assert.equal(new Set(result.recommendations.map((r) => r.fragranceSlug)).size, 5);
});

test('duplicate prevention: final set always has five unique IDs', () => {
  const result = recommendFiveFromRows(core16Rows, baseAnswers);
  const ids = result.recommendations.map((r) => r.fragranceSlug);
  assert.equal(ids.length, 5);
  assert.equal(new Set(ids).size, 5);
});

test('recommendation roles contain two core, two adjacent, one wildcard', () => {
  const result = recommendFiveFromRows(core16Rows, baseAnswers);
  const types = result.recommendations.map((r) => r.recommendationType);
  assert.equal(types.filter((t) => t === 'core_match').length, 2);
  assert.equal(types.filter((t) => t === 'adjacent_discovery').length, 2);
  assert.equal(types.filter((t) => t === 'wildcard').length, 1);

  const roles = result.recommendations.map((r) => r.role);
  assert.equal(roles.filter((r) => r === 'best-match' || r === 'close-match').length, 2);
  assert.equal(roles.filter((r) => r === 'safe-option' || r === 'adjacent').length, 2);
  assert.equal(roles.filter((r) => r === 'wildcard').length, 1);
});

test('prior paid fragrance slugs are excluded from a new curation', () => {
  const priorSlugs = [
    'bright-citrus',
    'soft-petals',
    'polished-woods',
    'sparkling-citrus-woods',
    'vanilla-veil',
  ];
  const excluded = new Set(priorSlugs);
  const filteredRows = core16Rows.filter((row) => !excluded.has(row.fragrance.slug));
  const result = recommendFiveFromRows(filteredRows, baseAnswers);

  assert.equal(result.recommendations.length, 5);
  for (const slug of priorSlugs) {
    assert.ok(
      !result.recommendations.some((r) => r.fragranceSlug === slug),
      `expected ${slug} to be excluded`,
    );
  }
});
