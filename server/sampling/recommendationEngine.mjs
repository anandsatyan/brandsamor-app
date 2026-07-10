import { getMongoDb } from '../db/mongo.mjs';
import { recommendFiveFromRows } from './recommendFiveCore.mjs';

async function loadActiveFragrancesWithNotes() {
  const db = await getMongoDb();
  const fragrances = await db.collection('fragrances').find({ status: 'active' }).toArray();
  const masterIds = fragrances.map((f) => f.masterId).filter(Boolean);

  const pyramids = masterIds.length
    ? await db
        .collection('notePyramids')
        .find({
          fragranceMasterId: { $in: masterIds },
          basis: 'ORIGINAL_REFERENCE',
          supplierVariantId: null,
        })
        .toArray()
    : [];

  const pyramidByMasterId = new Map(pyramids.map((p) => [p.fragranceMasterId, p]));
  return fragrances.map((fragrance) => ({
    fragrance,
    notePyramid: pyramidByMasterId.get(fragrance.masterId) ?? null,
  }));
}

export { recommendFiveFromRows };

export async function recommendFive(answers) {
  const rows = await loadActiveFragrancesWithNotes();
  return recommendFiveFromRows(rows, answers);
}
