# Adding a fragrance (workflow)

This workflow preserves Brandsamor governance rules: permanent numbering, provenance, and supplier-variant history.

## Candidate creation (master record)

1. **Reserve/assign the permanent number** according to the number band rules in `public/Brandsamor_16_Fragrance_Database_JSON.txt`.
2. Create a `fragrances` document with:
   - `masterId`, `number`, `slug`
   - `customerFacingName`, `internalProfile`
   - `primaryFamily` (+ `secondaryFamilies`)
   - `shortDescription`
   - `status: "inactive"` until minimum publication requirements are met
3. Add `inspiredBy` + `customerDisplay` (even if not publicly displayed).

## Original-reference notes (do not claim supplier-confirmed)

4. Add a `notePyramids` document with:
   - `basis: "ORIGINAL_REFERENCE"`
   - `supplierVariantId: null`
   - `layers.top|heart|base` + `hero`

## Supplier candidates

5. Create one or more `supplierVariants` docs:
   - `variantId` like `F124-PP-01`
   - `fragranceMasterId`
   - `supplierCode` (`PP`, `PX`)
   - Keep procurement + test results nullable until real
6. Create `complianceDocuments` placeholders per variant as `MISSING` (never fabricate documents).

## Evaluation and approval (later)

7. Add supplier-variant evaluation results (sensory/technical/alcohol compatibility) **without overwriting** the original-reference notes.
8. Add additional `notePyramids` bases when available:
   - `SUPPLIER_CONFIRMED`
   - `BRANDSAMOR_OBSERVED`
9. Only after evaluation + doc review:
   - set `fragrances.sourcing.selectedSupplier`
   - set `fragrances.sourcing.activeSupplierVariantId`
   - set `availability` for sampling

## Minimum requirements before public display

- `number`, `masterId`, `slug`
- `customerFacingName`
- `shortDescription`
- `primaryFamily`
- `notePyramids` with `ORIGINAL_REFERENCE` basis
- tags + business types (as per standard)
- `customerDisplay.showInspiredBy` + disclaimer handling

