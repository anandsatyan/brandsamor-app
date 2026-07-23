# Fragrance import (MongoDB Atlas)

## Prerequisites

- Set Mongo env vars (see `.env.example`):
  - `DB_QUERY_STRING`
  - `DB_NAME` (optional; otherwise derived from the URI path)

## Create/ensure indexes

```bash
npm run fragrance:indexes
```

## Import the initial 16 fragrances

```bash
npm run fragrance:import:core16
```

This reads `public/brandsamor_fragrance_library_16_import.json` and performs idempotent upserts:

- Upserts `fragrances` by `masterId` (`F###`)
- Creates/updates the `ORIGINAL_REFERENCE` note pyramid without overwriting other bases
- Upserts candidate supplier variants by `variantId` (`F###-PP-01`, `F###-PX-01`)
- Creates **missing** compliance placeholders per supplier variant (does not mark anything verified)
- Upserts research source URLs without deleting manually-added sources

### Idempotency / safety rules

- **Never overwrites** non-null `sourcing.selectedSupplier` or `sourcing.activeSupplierVariantId` once they’ve been set manually.
- **Never overwrites** an existing `supplierProductCode` with `null` from the import.
- Never deletes supplier variants, documents, or research sources that were added outside the import.

## Import Batch 8 (additional candidates)

```bash
npm run fragrance:import:batch8
npm run fragrance:verify:batch8
```

Reads `public/brandsamor_fragrance_library_batch8_import.json` (renumbered to Core 16 family-band convention). Records are imported as `inactive` until supplier evaluation.
