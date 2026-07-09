# Fragrance field map (source JSON → MongoDB)

Source of truth precedence:
1. `public/Brandsamor_16_Fragrance_Database_JSON.txt` (governance + meaning)
2. `public/brandsamor_fragrance_library_16.json` (expanded internal structure)
3. `public/brandsamor_fragrance_library_16_import.json` (seed-friendly)

This map documents where the **import JSON** fields land. Expanded JSON fields should extend the same documents/collections (do not discard).

## `fragrances` collection

- **`id`** → `masterId`
- **`number`** → `number`
- **`slug`** → `slug`
- **`customerFacingName`** → `customerFacingName`
- **`internalProfile`** → `internalProfile`
- **`status`** → `status`
- **`availability`** → `availability` (nullable)
- **`primaryFamily`** → `primaryFamily`
- **`secondaryFamilies[]`** → `secondaryFamilies[]`
- **`shortDescription`** → `shortDescription`
- **`longDescription`** → `longDescription` (nullable)
- **`scentExpression`** → `scentExpression`
- **`tags[]`** → `tags[]` (slugs)
- **`bestForBusinessTypes[]`** → `bestForBusinessTypes[]` (slugs)
- **`sweetness|freshness|intensity|commerciality|adventure`** → `scores.{...}` (only stored when numeric)
- **`inspiredBy{...}`** → `inspiredBy{...}` (stored even if not displayed)
- **`customerDisplay{...}`** → `customerDisplay{...}`
- **`sourcing.selectedSupplier`** → `sourcing.selectedSupplier` (nullable)
- **`sourcing.activeSupplierVariantId`** → `sourcing.activeSupplierVariantId` (nullable)

## `notePyramids` collection

- **`notes.top[]`** → `layers.top[]`
- **`notes.heart[]`** → `layers.heart[]`
- **`notes.base[]`** → `layers.base[]`
- **`notes.hero[]`** → `hero[]`
- **`notes.basis`** (`original-reference`) → `basis: "ORIGINAL_REFERENCE"`
- import scope → `supplierVariantId: null`

## `supplierVariants` collection

For each `sourcing.candidateVariants[]`:
- **`variantId`** → `variantId`
- **`supplierCode`** → `supplierCode`
- **`supplierName`** → `supplierName`
- **`supplierProductCode`** → `supplierProductCode` (nullable; never fabricated)
- **`status`** → `status`
- **link** → `fragranceMasterId = fragrances.masterId`

## `complianceDocuments` collection

The import JSON contains master-level placeholders (`compliance.*`). The database stores compliance **per supplier variant**:

- creates placeholder documents (per variant):
  - `type: IFRA`, `status: MISSING`
  - `type: COA`, `status: MISSING`
  - `type: ALLERGEN`, `status: MISSING`

## `researchSources` collection

- **`research.accessed`** → `accessedAt`
- **`research.confidence`** → `confidence`
- **`research.sources[]`** → one document per URL keyed by (`fragranceMasterId`, `url`)

## `tags`, `businessTypes` collections

Registries populated from the arrays in the fragrance records:
- tag slug → `tags.slug`
- business type slug → `businessTypes.slug`

