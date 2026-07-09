const toKebab = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\s+/g, '-');

export function toPublicFragrance({ fragrance, notePyramid }) {
  const notes = notePyramid?.layers ?? null;

  const inspiredBy =
    fragrance?.customerDisplay?.showInspiredBy && fragrance?.inspiredBy
      ? {
          brand: fragrance.inspiredBy.brand ?? null,
          fragrance: fragrance.inspiredBy.fragrance ?? null,
          disclaimer: fragrance.customerDisplay?.referenceDisclaimer ?? null,
        }
      : null;

  return {
    number: fragrance.number,
    slug: fragrance.slug,
    name: fragrance.customerFacingName,
    descriptionShort: fragrance.shortDescription ?? null,
    primaryFamily: fragrance.primaryFamily ?? null,
    secondaryFamilies: Array.isArray(fragrance.secondaryFamilies) ? fragrance.secondaryFamilies : [],
    scentExpression: fragrance.scentExpression ? toKebab(fragrance.scentExpression) : null,
    tags: Array.isArray(fragrance.tags) ? fragrance.tags : [],
    businessTypes: Array.isArray(fragrance.bestForBusinessTypes) ? fragrance.bestForBusinessTypes : [],
    scores: {
      sweetness: fragrance.scores?.sweetness ?? null,
      freshness: fragrance.scores?.freshness ?? null,
      intensity: fragrance.scores?.intensity ?? null,
      commerciality: fragrance.scores?.commerciality ?? null,
      adventure: fragrance.scores?.adventure ?? null,
    },
    notes: notes
      ? {
          top: Array.isArray(notes.top) ? notes.top : [],
          heart: Array.isArray(notes.heart) ? notes.heart : [],
          base: Array.isArray(notes.base) ? notes.base : [],
          hero: Array.isArray(notePyramid?.hero) ? notePyramid.hero : [],
          basis: notePyramid?.basis ?? null,
        }
      : { top: [], heart: [], base: [], hero: [], basis: null },
    inspiredBy,
    availability: fragrance.availability ?? null,
  };
}

