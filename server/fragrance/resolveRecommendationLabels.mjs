import { getMongoDb } from '../db/mongo.mjs';

function slugOf(rec) {
  return String(rec?.fragranceSlug ?? rec?.fragranceId ?? '').trim();
}

/**
 * Batch-load fragrance docs for recommendation slugs.
 * @returns {Promise<Map<string, { slug: string, number: unknown, customerFacingName: string }>>}
 */
export async function loadFragranceDocsBySlugs(slugs = []) {
  const unique = [...new Set(slugs.map((s) => String(s ?? '').trim()).filter(Boolean))];
  if (unique.length === 0) return new Map();

  try {
    const db = await getMongoDb();
    const docs = await db
      .collection('fragrances')
      .find(
        { slug: { $in: unique } },
        { projection: { slug: 1, number: 1, customerFacingName: 1, shortDescription: 1, notes: 1, primaryFamily: 1 } },
      )
      .toArray();
    return new Map(docs.map((doc) => [doc.slug, doc]));
  } catch {
    return new Map();
  }
}

/**
 * Normalize a recommendation with fragrance number + customer-facing name.
 * Prefers values already stored on the recommendation, then Mongo doc.
 */
export function resolveRecommendationLabel(rec, doc = null) {
  const slug = slugOf(rec);
  const number = rec?.fragranceNumber ?? rec?.number ?? doc?.number ?? null;
  const name =
    rec?.fragranceName ||
    rec?.customerFacingName ||
    doc?.customerFacingName ||
    slug ||
    'Unknown fragrance';

  return {
    fragranceSlug: slug || null,
    fragranceNumber: number != null && number !== '' ? number : null,
    fragranceName: name,
    role: rec?.role ?? null,
    reason: rec?.reason ?? null,
    preferenceScore: rec?.preferenceScore ?? null,
    finalScore: rec?.finalScore ?? null,
  };
}

export function formatFragranceLabel({ fragranceNumber, fragranceName, fragranceSlug } = {}) {
  const name = fragranceName || fragranceSlug || 'Unknown fragrance';
  if (fragranceNumber != null && fragranceNumber !== '') {
    return `No. ${fragranceNumber} — ${name}`;
  }
  return name;
}

/**
 * Enrich an array of recommendation objects with number + name.
 */
export async function enrichRecommendations(recommendations = []) {
  const list = Array.isArray(recommendations) ? recommendations : [];
  const bySlug = await loadFragranceDocsBySlugs(list.map(slugOf));
  return list.map((rec) => {
    const slug = slugOf(rec);
    return {
      ...rec,
      ...resolveRecommendationLabel(rec, bySlug.get(slug) ?? null),
    };
  });
}

/**
 * Enrich recommendations across many lead/order documents in one Mongo round-trip.
 */
export async function enrichDocumentsRecommendations(docs = [], key = 'recommendations') {
  const list = Array.isArray(docs) ? docs : [];
  const slugs = [];
  for (const doc of list) {
    for (const rec of doc?.[key] ?? []) {
      const slug = slugOf(rec);
      if (slug) slugs.push(slug);
    }
  }
  const bySlug = await loadFragranceDocsBySlugs(slugs);

  return list.map((doc) => ({
    ...doc,
    [key]: (doc?.[key] ?? []).map((rec) => {
      const slug = slugOf(rec);
      const resolved = resolveRecommendationLabel(rec, bySlug.get(slug) ?? null);
      return { ...rec, ...resolved };
    }),
  }));
}
