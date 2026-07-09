import 'dotenv/config';
import { getMongoDb } from '../../server/db/mongo.mjs';

export async function ensureIndexes() {
  const db = await getMongoDb();

  await db.collection('fragrances').createIndexes([
    { key: { masterId: 1 }, unique: true, name: 'uniq_masterId' },
    { key: { number: 1 }, unique: true, name: 'uniq_number' },
    { key: { slug: 1 }, unique: true, name: 'uniq_slug' },
    { key: { status: 1, availability: 1 }, name: 'idx_status_availability' },
    { key: { primaryFamily: 1 }, name: 'idx_primaryFamily' },
  ]);

  await db.collection('suppliers').createIndexes([
    { key: { code: 1 }, unique: true, name: 'uniq_supplier_code' },
  ]);

  await db.collection('supplierVariants').createIndexes([
    { key: { variantId: 1 }, unique: true, name: 'uniq_variantId' },
    { key: { fragranceMasterId: 1 }, name: 'idx_variant_fragrance' },
    { key: { supplierCode: 1 }, name: 'idx_variant_supplier' },
    { key: { status: 1 }, name: 'idx_variant_status' },
    { key: { isActiveForSampling: 1 }, name: 'idx_variant_sampling' },
  ]);

  await db.collection('notePyramids').createIndexes([
    {
      key: { fragranceMasterId: 1, basis: 1, supplierVariantId: 1 },
      unique: true,
      name: 'uniq_pyramid_scope',
    },
  ]);

  await db.collection('researchSources').createIndexes([
    { key: { fragranceMasterId: 1, url: 1 }, unique: true, name: 'uniq_research_url' },
  ]);

  await db.collection('tags').createIndexes([{ key: { slug: 1 }, unique: true, name: 'uniq_tag_slug' }]);
  await db
    .collection('businessTypes')
    .createIndexes([{ key: { slug: 1 }, unique: true, name: 'uniq_businessType_slug' }]);

  await db.collection('complianceDocuments').createIndexes([
    { key: { supplierVariantId: 1, type: 1 }, unique: true, name: 'uniq_compliance_doc_type' },
    { key: { status: 1 }, name: 'idx_doc_status' },
  ]);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await ensureIndexes();
  console.log('✅ MongoDB indexes ensured.');
  process.exit(0);
}

