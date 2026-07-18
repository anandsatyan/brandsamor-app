import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIBRARY_PATH = path.resolve(
  __dirname,
  '../../public/brandsamor_fragrance_library_16.json',
);

let cached = null;

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  return normalize(text)
    .split(' ')
    .filter((t) => t.length > 1);
}

function scoreMatch(query, candidate) {
  const q = normalize(query);
  const c = normalize(candidate);
  if (!q || !c) return 0;
  if (q === c) return 100;
  if (c.includes(q) || q.includes(c)) return 80;
  const qt = new Set(tokenize(q));
  const ct = new Set(tokenize(c));
  if (!qt.size || !ct.size) return 0;
  let overlap = 0;
  for (const t of qt) if (ct.has(t)) overlap += 1;
  const ratio = overlap / Math.max(qt.size, ct.size);
  return Math.round(ratio * 70);
}

export function loadReferenceDirectory() {
  if (cached) return cached;

  const raw = JSON.parse(fs.readFileSync(LIBRARY_PATH, 'utf8'));
  const fragrances = Array.isArray(raw.fragrances) ? raw.fragrances : [];

  cached = fragrances
    .map((row) => {
      const inspired = row.inspiredBy || {};
      const name = String(inspired.fragrance || '').trim();
      const brand = String(inspired.brand || '').trim();
      if (!name) return null;

      const aliases = [
        name,
        inspired.supplierListedName,
        row.customerFacingName,
        brand ? `${brand} ${name}` : null,
        brand && name ? `${name} by ${brand}` : null,
      ]
        .filter(Boolean)
        .map(String);

      const notes = row.notes || {};
      const verified =
        inspired.referenceStatus === 'confirmed' ||
        inspired.referenceStatus === 'staff_reviewed';

      return {
        id: `ref-${row.id || row.slug}`,
        name,
        brand,
        aliases: [...new Set(aliases)],
        primaryFamily: row.primaryFamily || undefined,
        supportingFamilies: Array.isArray(row.secondaryFamilies) ? row.secondaryFamilies : [],
        accordDescriptors: Array.isArray(row.tags) ? row.tags : [],
        topNotes: Array.isArray(notes.top) ? notes.top : [],
        heartNotes: Array.isArray(notes.heart) ? notes.heart : [],
        baseNotes: Array.isArray(notes.base) ? notes.base : [],
        performanceDescription: row.shortDescription || undefined,
        profileStatus: verified ? 'verified' : 'unverified',
        sourceNotes: inspired.referenceNote || undefined,
        libraryFragranceId: row.id || null,
        librarySlug: row.slug || null,
        active: row.status !== 'inactive',
      };
    })
    .filter(Boolean);

  return cached;
}

export function searchReferenceFragrances(query, { limit = 5 } = {}) {
  const q = String(query || '').trim();
  if (!q) return [];

  const directory = loadReferenceDirectory().filter((r) => r.active);
  const scored = [];

  for (const ref of directory) {
    let best = 0;
    for (const alias of ref.aliases) {
      best = Math.max(best, scoreMatch(q, alias));
    }
    best = Math.max(best, scoreMatch(q, ref.name), scoreMatch(q, `${ref.brand} ${ref.name}`));
    if (best >= 45) {
      scored.push({ ref, score: best });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ ref, score }) => ({ ...ref, matchScore: score }));
}

export function findReferencesInText(text) {
  const directory = loadReferenceDirectory().filter((r) => r.active);
  const hay = normalize(text);
  if (!hay) return [];

  const hits = [];
  for (const ref of directory) {
    for (const alias of ref.aliases) {
      const needle = normalize(alias);
      if (needle.length < 4) continue;
      if (hay.includes(needle)) {
        hits.push({ ...ref, matchScore: 90 });
        break;
      }
    }
  }

  // Deduplicate by id
  const seen = new Set();
  return hits.filter((h) => {
    if (seen.has(h.id)) return false;
    seen.add(h.id);
    return true;
  });
}

export function toModelSafeReference(ref) {
  if (!ref) return null;
  return {
    id: ref.id,
    name: ref.name,
    brand: ref.brand,
    matchStatus: ref.profileStatus === 'verified' ? 'verified' : 'unverified',
    primaryFamily: ref.primaryFamily,
    supportingFamilies: ref.supportingFamilies,
    accordDescriptors: ref.accordDescriptors,
    topNotes: ref.topNotes,
    heartNotes: ref.heartNotes,
    baseNotes: ref.baseNotes,
    performanceDescription: ref.performanceDescription,
  };
}
