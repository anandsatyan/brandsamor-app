import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getMongoDb } from '../../server/db/mongo.mjs';
import { ensureIndexes } from './init-indexes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_PATH = path.resolve(
  __dirname,
  '../../public/brandsamor_fragrance_library_batch8_import.json',
);

const now = () => new Date();

function compactObject(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

function isFiniteNumber(n) {
  return typeof n === 'number' && Number.isFinite(n);
}

function normalizeKey(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

async function upsertTaxonomy(db, fragrances) {
  const tagSlugs = new Set();
  const businessTypeSlugs = new Set();

  for (const f of fragrances) {
    for (const t of Array.isArray(f.tags) ? f.tags : []) tagSlugs.add(String(t));
    for (const b of Array.isArray(f.bestForBusinessTypes) ? f.bestForBusinessTypes : []) {
      businessTypeSlugs.add(String(b));
    }
  }

  if (tagSlugs.size) {
    await db.collection('tags').bulkWrite(
      Array.from(tagSlugs).map((slug) => ({
        updateOne: {
          filter: { slug },
          update: { $setOnInsert: { slug, label: slug, createdAt: now() } },
          upsert: true,
        },
      })),
      { ordered: false },
    );
  }

  if (businessTypeSlugs.size) {
    await db.collection('businessTypes').bulkWrite(
      Array.from(businessTypeSlugs).map((slug) => ({
        updateOne: {
          filter: { slug },
          update: { $setOnInsert: { slug, label: slug, createdAt: now() } },
          upsert: true,
        },
      })),
      { ordered: false },
    );
  }
}

async function ensureSuppliers(db, supplierPolicy) {
  const candidates = Array.isArray(supplierPolicy?.candidateSuppliers)
    ? supplierPolicy.candidateSuppliers
    : [];
  if (!candidates.length) return;

  await db.collection('suppliers').bulkWrite(
    candidates.map((s) => ({
      updateOne: {
        filter: { code: s.code },
        update: {
          $setOnInsert: {
            code: s.code,
            name: s.name ?? s.code,
            createdAt: now(),
          },
          $set: { updatedAt: now() },
        },
        upsert: true,
      },
    })),
    { ordered: false },
  );
}

function fragranceDocFromSource(f) {
  return compactObject({
    customerFacingName: f.customerFacingName,
    internalProfile: f.internalProfile,
    status: f.status,
    availability: f.availability ?? null,
    primaryFamily: f.primaryFamily,
    secondaryFamilies: Array.isArray(f.secondaryFamilies) ? f.secondaryFamilies : [],
    shortDescription: f.shortDescription ?? null,
    longDescription: f.longDescription ?? null,
    scentExpression: f.scentExpression ?? null,
    tags: Array.isArray(f.tags) ? f.tags : [],
    bestForBusinessTypes: Array.isArray(f.bestForBusinessTypes) ? f.bestForBusinessTypes : [],
    useCases: Array.isArray(f.bestForUseCases) ? f.bestForUseCases : [],
    scores: compactObject({
      sweetness: isFiniteNumber(f.sweetness) ? f.sweetness : undefined,
      freshness: isFiniteNumber(f.freshness) ? f.freshness : undefined,
      intensity: isFiniteNumber(f.intensity) ? f.intensity : undefined,
      commerciality: isFiniteNumber(f.commerciality) ? f.commerciality : undefined,
      adventure: isFiniteNumber(f.adventure) ? f.adventure : undefined,
    }),
    inspiredBy: f.inspiredBy ?? null,
    customerDisplay: f.customerDisplay ?? null,
    updatedAt: now(),
  });
}

function pyramidDocFromSource(f) {
  const notes = f.notes ?? {};
  return compactObject({
    fragranceMasterId: f.id,
    supplierVariantId: null,
    basis:
      notes.basis === 'original-reference' || !notes.basis
        ? 'ORIGINAL_REFERENCE'
        : String(notes.basis),
    layers: {
      top: Array.isArray(notes.top) ? notes.top : [],
      heart: Array.isArray(notes.heart) ? notes.heart : [],
      base: Array.isArray(notes.base) ? notes.base : [],
    },
    hero: Array.isArray(notes.hero) ? notes.hero : [],
    source: { kind: 'JSON_IMPORT', version: '1.0.0', batch: 'batch8' },
    updatedAt: now(),
  });
}

async function assertNoDuplicates(db, fragrances) {
  const existing = await db
    .collection('fragrances')
    .find({})
    .project({
      masterId: 1,
      number: 1,
      slug: 1,
      customerFacingName: 1,
      inspiredBy: 1,
    })
    .toArray();

  const byMasterId = new Map(existing.map((f) => [f.masterId, f]));
  const byNumber = new Map(existing.map((f) => [f.number, f]));
  const bySlug = new Map(existing.map((f) => [f.slug, f]));
  const byInspired = new Map(
    existing
      .filter((f) => f.inspiredBy?.brand || f.inspiredBy?.fragrance)
      .map((f) => [
        `${normalizeKey(f.inspiredBy?.brand)}::${normalizeKey(f.inspiredBy?.fragrance)}`,
        f,
      ]),
  );

  for (const f of fragrances) {
    const inspiredKey = `${normalizeKey(f.inspiredBy?.brand)}::${normalizeKey(f.inspiredBy?.fragrance)}`;

    const collideNumber = byNumber.get(f.number);
    if (collideNumber && collideNumber.masterId !== f.id) {
      throw new Error(
        `Number ${f.number} already used by ${collideNumber.masterId} (${collideNumber.customerFacingName})`,
      );
    }

    const collideSlug = bySlug.get(f.slug);
    if (collideSlug && collideSlug.masterId !== f.id) {
      throw new Error(
        `Slug ${f.slug} already used by ${collideSlug.masterId} (${collideSlug.customerFacingName})`,
      );
    }

    const collideInspired = byInspired.get(inspiredKey);
    if (collideInspired && collideInspired.masterId !== f.id) {
      throw new Error(
        `Inspiration already used by ${collideInspired.masterId} (${collideInspired.customerFacingName}): ${f.inspiredBy?.brand} — ${f.inspiredBy?.fragrance}`,
      );
    }

    const sameMaster = byMasterId.get(f.id);
    if (sameMaster && sameMaster.number !== f.number) {
      throw new Error(
        `masterId ${f.id} already exists with number ${sameMaster.number}; refusing to renumber`,
      );
    }
  }
}

async function upsertFragrance(db, f) {
  const existing = await db.collection('fragrances').findOne({ masterId: f.id });
  const baseDoc = fragranceDocFromSource(f);

  const update = {
    $setOnInsert: compactObject({
      masterId: f.id,
      number: f.number,
      slug: f.slug,
      createdAt: now(),
    }),
    $set: baseDoc,
  };

  if (existing?.sourcing?.selectedSupplier != null || existing?.sourcing?.activeSupplierVariantId != null) {
    // keep manually approved supplier selection
  } else if (f.sourcing) {
    update.$set.sourcing = {
      selectedSupplier: f.sourcing.selectedSupplier ?? null,
      activeSupplierVariantId: f.sourcing.activeSupplierVariantId ?? null,
    };
  } else {
    update.$set.sourcing = existing?.sourcing ?? {
      selectedSupplier: null,
      activeSupplierVariantId: null,
    };
  }

  await db.collection('fragrances').updateOne({ masterId: f.id }, update, { upsert: true });
}

async function upsertNotePyramid(db, f) {
  const pyramid = pyramidDocFromSource(f);
  await db.collection('notePyramids').updateOne(
    {
      fragranceMasterId: pyramid.fragranceMasterId,
      basis: 'ORIGINAL_REFERENCE',
      supplierVariantId: null,
    },
    {
      $setOnInsert: { createdAt: now() },
      $set: { ...pyramid, basis: 'ORIGINAL_REFERENCE' },
    },
    { upsert: true },
  );
}

async function upsertResearch(db, f) {
  const research = f.research ?? null;
  const sources = Array.isArray(research?.sources) ? research.sources : [];

  for (const url of sources) {
    if (typeof url !== 'string' || !url.trim()) continue;
    await db.collection('researchSources').updateOne(
      { fragranceMasterId: f.id, url },
      {
        $setOnInsert: { fragranceMasterId: f.id, url, createdAt: now() },
        $set: {
          accessedAt: research?.accessed ?? null,
          confidence: research?.confidence ?? null,
          updatedAt: now(),
        },
      },
      { upsert: true },
    );
  }
}

async function upsertSupplierVariants(db, f) {
  const candidates = Array.isArray(f?.sourcing?.candidateVariants) ? f.sourcing.candidateVariants : [];
  if (!candidates.length) return;

  for (const v of candidates) {
    const variantId = v?.variantId;
    if (!variantId) continue;

    const existing = await db.collection('supplierVariants').findOne({ variantId });

    const set = compactObject({
      fragranceMasterId: f.id,
      supplierCode: v.supplierCode ?? null,
      supplierName: v.supplierName ?? null,
      supplierProductCode: v.supplierProductCode ?? null,
      status: v.status ?? 'not-evaluated',
      updatedAt: now(),
    });

    if (existing?.supplierProductCode && (v.supplierProductCode == null || v.supplierProductCode === '')) {
      delete set.supplierProductCode;
    }

    await db.collection('supplierVariants').updateOne(
      { variantId },
      { $setOnInsert: { variantId, createdAt: now() }, $set: set },
      { upsert: true },
    );

    const docs = [
      { type: 'IFRA', status: 'MISSING' },
      { type: 'COA', status: 'MISSING' },
      { type: 'ALLERGEN', status: 'MISSING' },
    ];
    await db.collection('complianceDocuments').bulkWrite(
      docs.map((d) => ({
        updateOne: {
          filter: { supplierVariantId: variantId, type: d.type },
          update: {
            $setOnInsert: {
              supplierVariantId: variantId,
              type: d.type,
              status: d.status,
              createdAt: now(),
            },
          },
          upsert: true,
        },
      })),
      { ordered: false },
    );
  }
}

async function main() {
  await ensureIndexes();

  const db = await getMongoDb();
  const raw = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
  const fragrances = Array.isArray(raw?.fragrances) ? raw.fragrances : [];

  if (fragrances.length !== 8) {
    throw new Error(`Expected 8 fragrances in batch8 source, got ${fragrances.length}`);
  }

  await assertNoDuplicates(db, fragrances);
  await ensureSuppliers(db, raw?.supplierPolicy);
  await upsertTaxonomy(db, fragrances);

  for (const f of fragrances) {
    await upsertFragrance(db, f);
    await upsertNotePyramid(db, f);
    await upsertResearch(db, f);
    await upsertSupplierVariants(db, f);
    console.log(`Upserted ${f.id} (#${f.number}) ${f.customerFacingName}`);
  }

  const total = await db.collection('fragrances').countDocuments();
  console.log(`✅ Imported Brandsamor Batch 8. Fragrance collection now has ${total} records.`);
}

try {
  await main();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
