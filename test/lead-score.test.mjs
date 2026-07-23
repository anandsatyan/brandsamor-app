import test from 'node:test';
import assert from 'node:assert/strict';
import { applyLeadAgeDecay, scoreSamplingLead } from '../server/admin/leadScore.mjs';

const DAY = 24 * 60 * 60 * 1000;

const hotLead = {
  status: 'curated',
  lead: { brandName: 'Atelier Lumière Beauty' },
  answers: {
    brandStage: 'adding-fragrance',
    businessType: 'beauty',
    scentExpression: 'feminine-leaning',
    brandPersonalities: ['soft-elegant', 'bold-luxurious'],
    scentFamilies: ['floral', 'amber-spicy'],
    intensity: 'versatile',
    useCase: 'everyday',
    exclusions: ['very-sweet'],
    likedFragrances: 'I love Delina and soft rose musks for our boutique clients',
    additionalNotes: 'We already sell skincare in two stores and want a signature scent this quarter.',
  },
};

test('existing brand adding fragrance scores hot when fresh', () => {
  const now = Date.now();
  const result = scoreSamplingLead(
    { ...hotLead, createdAt: new Date(now - 2 * DAY).toISOString() },
    { now },
  );

  assert.equal(result.tier, 'hot');
  assert.equal(result.baseTier, 'hot');
  assert.ok(result.score >= 70);
  assert.equal(result.hasExistingBrandSignal, true);
  assert.equal(result.ageDecay, null);
});

test('early explorer with thin brief scores cold', () => {
  const now = Date.now();
  const result = scoreSamplingLead(
    {
      status: 'in_progress',
      createdAt: new Date(now - DAY).toISOString(),
      lead: { brandName: null },
      answers: {
        brandStage: 'exploring',
        businessType: 'creator',
        scentExpression: 'recommend',
        brandPersonalities: ['recommend'],
        scentFamilies: ['recommend'],
        intensity: 'recommend',
        useCase: 'recommend',
        exclusions: ['unsure'],
      },
    },
    { now },
  );

  assert.equal(result.tier, 'cold');
  assert.ok(result.score < 40);
  assert.equal(result.hasExistingBrandSignal, false);
});

test('first launch with solid brief is warm or hot when fresh', () => {
  const now = Date.now();
  const result = scoreSamplingLead(
    {
      status: 'checkout_started',
      createdAt: new Date(now - DAY).toISOString(),
      lead: { brandName: 'Northwind' },
      checkout: { company: 'Northwind Studio LLC' },
      answers: {
        brandStage: 'first-launch',
        businessType: 'standalone',
        scentExpression: 'gender-neutral',
        brandPersonalities: ['fresh-clean', 'modern-energetic'],
        scentFamilies: ['citrus-fresh', 'woody'],
        intensity: 'versatile',
        useCase: 'everyday',
        exclusions: ['heavy-oud'],
        likedFragrances: 'Santal 33 vibes but cleaner',
      },
    },
    { now },
  );

  assert.ok(result.score >= 40);
  assert.ok(['warm', 'hot'].includes(result.tier));
  assert.equal(result.hasExistingBrandSignal, true);
});

test('hot lead cools to warm after one week', () => {
  const now = Date.now();
  const result = scoreSamplingLead(
    { ...hotLead, createdAt: new Date(now - 8 * DAY).toISOString() },
    { now },
  );

  assert.equal(result.baseTier, 'hot');
  assert.equal(result.tier, 'warm');
  assert.ok(result.score <= 69);
  assert.equal(result.ageDecay, 'cooled_to_warm');
});

test('any lead becomes cold after two weeks', () => {
  const now = Date.now();
  const result = scoreSamplingLead(
    { ...hotLead, createdAt: new Date(now - 15 * DAY).toISOString() },
    { now },
  );

  assert.equal(result.baseTier, 'hot');
  assert.equal(result.tier, 'cold');
  assert.ok(result.score <= 39);
  assert.equal(result.ageDecay, 'cooled_to_cold');
});

test('missing commercialTier leaves older lead scores unchanged', () => {
  const now = Date.now();
  const without = scoreSamplingLead(
    { ...hotLead, createdAt: new Date(now - 2 * DAY).toISOString() },
    { now },
  );
  const withLuxury = scoreSamplingLead(
    {
      ...hotLead,
      createdAt: new Date(now - 2 * DAY).toISOString(),
      answers: { ...hotLead.answers, commercialTier: 'luxury_limited_edition' },
    },
    { now },
  );

  assert.equal(without.signals.some((s) => s.key === 'commercialTier'), false);
  assert.ok(withLuxury.baseScore > without.baseScore);
  assert.ok(withLuxury.signals.some((s) => s.key === 'commercialTier' && s.points === 14));
});

test('premium commercial tiers adds points only when present', () => {
  const now = Date.now();
  const premium = scoreSamplingLead(
    {
      ...hotLead,
      createdAt: new Date(now - 2 * DAY).toISOString(),
      answers: { ...hotLead.answers, commercialTier: 'premium_brand_extension' },
    },
    { now },
  );
  assert.ok(premium.signals.some((s) => s.key === 'commercialTier' && s.points === 10));
});

test('applyLeadAgeDecay steps tiers without raising them', () => {
  assert.equal(applyLeadAgeDecay('hot', new Date(Date.now() - 3 * DAY)).tier, 'hot');
  assert.equal(applyLeadAgeDecay('hot', new Date(Date.now() - 10 * DAY)).tier, 'warm');
  assert.equal(applyLeadAgeDecay('warm', new Date(Date.now() - 10 * DAY)).tier, 'warm');
  assert.equal(applyLeadAgeDecay('cold', new Date(Date.now() - 10 * DAY)).tier, 'cold');
  assert.equal(applyLeadAgeDecay('warm', new Date(Date.now() - 20 * DAY)).tier, 'cold');
});
