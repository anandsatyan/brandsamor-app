import 'dotenv/config';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getMongoDb } from '../../server/db/mongo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_PATH = path.resolve(
  __dirname,
  '../../public/brandsamor_fragrance_library_batch8_import.json',
);

function uniq(values) {
  return new Set(values).size === values.length;
}

async function main() {
  const raw = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
  const sourceFragrances = raw.fragrances;
  assert.equal(sourceFragrances.length, 8, 'Expected 8 source fragrances');

  const db = await getMongoDb();
  const fragrances = await db.collection('fragrances').find({}).toArray();
  assert.ok(fragrances.length >= 24, `Expected at least 24 fragrances in DB, got ${fragrances.length}`);
  assert.ok(uniq(fragrances.map((f) => f.masterId)), 'Duplicate masterId in DB');
  assert.ok(uniq(fragrances.map((f) => f.number)), 'Duplicate number in DB');
  assert.ok(uniq(fragrances.map((f) => f.slug)), 'Duplicate slug in DB');

  for (const src of sourceFragrances) {
    const dbFragrance = await db.collection('fragrances').findOne({ masterId: src.id });
    assert.ok(dbFragrance, `Missing fragrance ${src.id}`);
    assert.equal(dbFragrance.number, src.number, `Number mismatch for ${src.id}`);
    assert.equal(dbFragrance.slug, src.slug, `Slug mismatch for ${src.id}`);
    assert.equal(dbFragrance.customerFacingName, src.customerFacingName);
    assert.equal(dbFragrance.primaryFamily, src.primaryFamily);
    assert.equal(dbFragrance.status, 'inactive', `${src.id} should remain inactive until approved`);

    const pyramid = await db.collection('notePyramids').findOne({
      fragranceMasterId: src.id,
      basis: 'ORIGINAL_REFERENCE',
      supplierVariantId: null,
    });
    assert.ok(pyramid, `Missing original-reference note pyramid for ${src.id}`);
    assert.deepEqual(pyramid.layers?.top ?? [], src.notes?.top ?? []);
    assert.deepEqual(pyramid.layers?.heart ?? [], src.notes?.heart ?? []);
    assert.deepEqual(pyramid.layers?.base ?? [], src.notes?.base ?? []);

    const variants = Array.isArray(src?.sourcing?.candidateVariants)
      ? src.sourcing.candidateVariants
      : [];
    assert.equal(variants.length, 2, `Expected PP+PX variants for ${src.id}`);
    for (const v of variants) {
      const dbVariant = await db.collection('supplierVariants').findOne({ variantId: v.variantId });
      assert.ok(dbVariant, `Missing supplier variant ${v.variantId}`);
      assert.equal(dbVariant.fragranceMasterId, src.id);
      const docs = await db
        .collection('complianceDocuments')
        .find({ supplierVariantId: v.variantId })
        .toArray();
      assert.ok(docs.length >= 3, `Expected compliance placeholders for ${v.variantId}`);
    }

    assert.equal(dbFragrance?.sourcing?.selectedSupplier ?? null, null);
    assert.equal(dbFragrance?.sourcing?.activeSupplierVariantId ?? null, null);
  }

  // Band checks
  for (const src of sourceFragrances) {
    if (src.primaryFamily === 'woods-spice-oud') {
      assert.ok(src.number >= 300 && src.number < 400, `${src.id} woods should be in 300s`);
    }
    if (src.primaryFamily === 'floral-fruity-gourmand') {
      assert.ok(
        src.number >= 200 && src.number < 300,
        `${src.id} florals should be in denser 200s`,
      );
    }
  }

  console.log('✅ Batch 8 fragrance import verification passed.');
}

try {
  await main();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
