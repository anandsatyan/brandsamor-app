import { getMongoDb } from '../db/mongo.mjs';

const COLLECTIONS = {
  fragrances: 'fragrances',
  notePyramids: 'notePyramids',
};

export async function listPublicFragrances() {
  const db = await getMongoDb();

  // Only ACTIVE fragrances should be customer-visible by default.
  const fragrances = await db
    .collection(COLLECTIONS.fragrances)
    .find({ status: 'active' })
    .sort({ number: 1 })
    .toArray();

  const masterIds = fragrances.map((f) => f.masterId);

  const pyramids = await db
    .collection(COLLECTIONS.notePyramids)
    .find({
      fragranceMasterId: { $in: masterIds },
      basis: 'ORIGINAL_REFERENCE',
      supplierVariantId: null,
    })
    .toArray();

  const pyramidByMasterId = new Map(pyramids.map((p) => [p.fragranceMasterId, p]));

  return fragrances.map((fragrance) => ({
    fragrance,
    notePyramid: pyramidByMasterId.get(fragrance.masterId) ?? null,
  }));
}

export async function getPublicFragranceBySlug(slug) {
  const db = await getMongoDb();

  const fragrance = await db.collection(COLLECTIONS.fragrances).findOne({ slug, status: 'active' });
  if (!fragrance) return null;

  const notePyramid = await db.collection(COLLECTIONS.notePyramids).findOne({
    fragranceMasterId: fragrance.masterId,
    basis: 'ORIGINAL_REFERENCE',
    supplierVariantId: null,
  });

  return { fragrance, notePyramid: notePyramid ?? null };
}

