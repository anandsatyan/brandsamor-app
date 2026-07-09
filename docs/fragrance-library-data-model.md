# Fragrance Library Data Model (MongoDB)

This project stores the Brandsamor fragrance library in **MongoDB Atlas**. The model is designed to scale from the initial 16 records to thousands, while preserving permanent fragrance numbering and supplier/history provenance.

## Identity & governance

- **`masterId`**: stable internal master identifier from the source standard (e.g. `F124`). **Unique.**
- **`number`**: permanent customer-facing fragrance number (e.g. `124`). **Unique. Never renumber. Never reuse.**
- **`slug`**: stable URL/API identifier (e.g. `sparkling-citrus-woods`). **Unique.**
- Retire/deactivate instead of deleting. Preserve historical references.

## Collections

### `fragrances`
Master fragrance profile.

- **Identity**: `masterId`, `number`, `slug`
- **Public fields**: `customerFacingName`, `shortDescription`, `longDescription`, `primaryFamily`, `secondaryFamilies`, `scentExpression`, `tags`, `bestForBusinessTypes`, `scores`, `availability`
- **Inspiration**: `inspiredBy` + `customerDisplay` (controls whether inspiration can be shown)
- **Supplier selection (internal)**: `sourcing.selectedSupplier`, `sourcing.activeSupplierVariantId` (nullable until approved)
- **Status**: `status` (`active|inactive|retired` per source standard, stored as string)

Indexes:
- unique: `masterId`, `number`, `slug`
- query: `status+availability`, `primaryFamily`

### `suppliers`
Supplier master records.

- `code` (`PP`, `PX`) **unique**
- `name`

### `supplierVariants`
Supplier-specific oils/versions for a fragrance. **A fragrance profile is not the same as a supplier oil.**

- `variantId` (e.g. `F124-PP-01`) **unique**
- `fragranceMasterId` (links to `fragrances.masterId`)
- `supplierCode` (`PP|PX`)
- `supplierProductCode` (nullable; do not fabricate)
- `status` (e.g. `not-evaluated`, etc.)

### `notePyramids`
Stores top/heart/base (+ hero) notes with explicit provenance.

- `fragranceMasterId`
- `supplierVariantId` (nullable for master-level pyramids)
- `basis`: `ORIGINAL_REFERENCE` (initial import), later can add supplier-confirmed and Brandsamor-observed pyramids without overwriting the original reference
- `layers.top|heart|base` arrays
- `hero` array

Unique index:
- (`fragranceMasterId`, `basis`, `supplierVariantId`)

### `complianceDocuments`
Versioned compliance docs **per supplier variant** (not just per fragrance).

- `supplierVariantId`
- `type` (`IFRA|COA|ALLERGEN|...`)
- `status` (`MISSING|REQUESTED|RECEIVED|UNDER_REVIEW|VERIFIED|SUPERSEDED|EXPIRED|NOT_APPLICABLE`)
- optional metadata: `fileRef`, `documentNumber`, `version`, `issueDate`, `reviewDate`, `expiryDate`, `uploadedAt`, `verifiedAt`, `internalNotes`

Unique index:
- (`supplierVariantId`, `type`)

### `researchSources`
Audit trail of research URLs from the source JSON.

- `fragranceMasterId`
- `url` **unique per fragrance**
- `accessedAt`, `confidence`

### `tags`, `businessTypes`
Controlled vocabulary registries.

- `slug` **unique**
- `label`

## Public vs internal

- Public API responses must never expose supplier procurement details (cost/MOQ/lead time/product codes) or internal approval/testing notes.
- Public note pyramids default to the `ORIGINAL_REFERENCE` basis unless later configured otherwise.

