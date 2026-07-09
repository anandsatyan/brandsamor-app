import 'dotenv/config';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getMongoDb } from '../../server/db/mongo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_PATH = path.resolve(__dirname, '../../public/brandsamor_fragrance_library_16_import.json');

function uniq(values) {
  return new Set(values).size === values.length;
}

async function main() {
  const raw = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
  const sourceFragrances = raw.fragrances;
  assert.equal(sourceFragrances.length, 16, 'Expected 16 source fragrances');

  const db = await getMongoDb();
  const fragrances = await db.collection('fragrances').find({}).toArray();
  assert.equal(fragrances.length, 16, 'Expected 16 fragrances in DB');

  assert.ok(uniq(fragrances.map((f) => f.masterId)), 'Duplicate masterId in DB');
  assert.ok(uniq(fragrances.map((f) => f.number)), 'Duplicate number in DB');
  assert.ok(uniq(fragrances.map((f) => f.slug)), 'Duplicate slug in DB');

  for (const src of sourceFragrances) {
    const dbFragrance = await db.collection('fragrances').findOne({ masterId: src.id });
    assert.ok(dbFragrance, `Missing fragrance ${src.id}`);
    assert.equal(dbFragrance.number, src.number, `Number mismatch for ${src.id}`);
    assert.equal(dbFragrance.slug, src.slug, `Slug mismatch for ${src.id}`);
    assert.equal(dbFragrance.customerFacingName, src.customerFacingName, `Name mismatch for ${src.id}`);
    assert.equal(dbFragrance.internalProfile, src.internalProfile, `Internal profile mismatch for ${src.id}`);
    assert.equal(dbFragrance.primaryFamily, src.primaryFamily, `Primary family mismatch for ${src.id}`);

    const pyramid = await db.collection('notePyramids').findOne({
      fragranceMasterId: src.id,
      basis: 'ORIGINAL_REFERENCE',
      supplierVariantId: null,
    });
    assert.ok(pyramid, `Missing original-reference note pyramid for ${src.id}`);
    assert.deepEqual(pyramid.layers?.top ?? [], src.notes?.top ?? [], `Top notes mismatch for ${src.id}`);
    assert.deepEqual(pyramid.layers?.heart ?? [], src.notes?.heart ?? [], `Heart notes mismatch for ${src.id}`);
    assert.deepEqual(pyramid.layers?.base ?? [], src.notes?.base ?? [], `Base notes mismatch for ${src.id}`);

    const variants = Array.isArray(src?.sourcing?.candidateVariants) ? src.sourcing.candidateVariants : [];
    for (const v of variants) {
      const dbVariant = await db.collection('supplierVariants').findOne({ variantId: v.variantId });
      assert.ok(dbVariant, `Missing supplier variant ${v.variantId}`);
      assert.equal(dbVariant.fragranceMasterId, src.id, `Variant fragrance mismatch ${v.variantId}`);
      assert.equal(dbVariant.supplierCode, v.supplierCode, `Variant supplier code mismatch ${v.variantId}`);

      const docs = await db.collection('complianceDocuments').find({ supplierVariantId: v.variantId }).toArray();
      assert.ok(docs.length >= 3, `Expected compliance placeholders for ${v.variantId}`);
    }

    // Must remain nullable unless explicitly selected
    assert.equal(dbFragrance?.sourcing?.selectedSupplier ?? null, src?.sourcing?.selectedSupplier ?? null);
    assert.equal(dbFragrance?.sourcing?.activeSupplierVariantId ?? null, src?.sourcing?.activeSupplierVariantId ?? null);
  }

  console.log('✅ Mongo fragrance import verification passed.');
}

try {
  await main();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}

