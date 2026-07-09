import test from 'node:test';
import assert from 'node:assert/strict';
import { toPublicFragrance } from '../server/fragrance/publicSerializer.mjs';

test('public serializer omits internal supplier fields', () => {
  const row = {
    fragrance: {
      number: 101,
      slug: 'bright-citrus',
      customerFacingName: 'Bright Citrus',
      shortDescription: 'desc',
      primaryFamily: 'fresh-aromatic',
      secondaryFamilies: ['citrus'],
      scentExpression: 'gender-neutral',
      tags: ['fresh'],
      bestForBusinessTypes: ['beauty'],
      scores: { intensity: 4 },
      inspiredBy: { brand: 'X', fragrance: 'Y' },
      customerDisplay: { showInspiredBy: true, referenceDisclaimer: 'disc' },
      sourcing: { selectedSupplier: 'PP', activeSupplierVariantId: 'F101-PP-01' },
      cost: { amount: 12, currency: 'USD' },
    },
    notePyramid: {
      basis: 'ORIGINAL_REFERENCE',
      layers: { top: ['Lime'], heart: [], base: [] },
      hero: ['Lime'],
    },
  };

  const out = toPublicFragrance(row);

  assert.equal(out.number, 101);
  assert.equal(out.slug, 'bright-citrus');
  assert.ok(out.inspiredBy);
  assert.deepEqual(out.notes.top, ['Lime']);

  assert.equal('sourcing' in out, false);
  assert.equal('cost' in out, false);
});

