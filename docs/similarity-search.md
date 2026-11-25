# Molecular similarity search

ChemEase runs the ranking in the browser. No Python service or private API key is required. The module is available at `#/similarity` in the Features navigation group.

## Method

`morgan-tanimoto-v1` uses the application's pinned RDKit WebAssembly build, Morgan radius 2, 2,048 bits and `useChirality: false`. Scores are the number of shared on-bits divided by the number of on-bits in either fingerprint. The reference ethanol fingerprint has on-bits 80, 222, 294, 807, 1057 and 1410. Ethanol versus 1-propanol gives 5 / 9.

This is structural similarity, not an activity or safety prediction. Fingerprint collisions and ignored stereochemistry mean a score of 1 does not prove identity. The separate “same canonical structure” label compares canonical SMILES. Supplied charges, salts and tautomers are retained; no pH adjustment, desalting or tautomer standardization occurs locally. Multi-component hits are labelled.

## Collections and boundaries

- **Library:** all saved versions in the current owner scope. Structures with the same canonical SMILES are collapsed, retaining the first (latest-first) candidate. No public network request is made.
- **Teaching collection:** 28 explicitly defined compounds for demonstrations; not a drug-discovery database.
- **Imported collection:** up to 2,000 lines / 500 KB, one SMILES and optional name per line. Invalid rows are individually disclosed.
- **PubChem:** explicit user action sends the validated query to PUG REST. Its 2D search retrieves at most 100 candidates at a separately recorded threshold of 80–100%. Structures are then fingerprinted and re-ranked locally. PubChem's retrieval threshold is not a Morgan threshold, and the resulting ranking is not an exhaustive Morgan search of PubChem. Do not silently substitute demo hits if PubChem is unavailable.

The local threshold is 0–1 and the display limit is 1–50. Molecules are limited to 500 specified atoms. Jobs can be cancelled and have a 60-second client timeout. Existing results remain unchanged on errors or cancellation. Network access and PubChem availability are required only for live retrieval.

## Foundation and reports

`WorkspaceData.similaritySearches` is an optional backwards-compatible list of up to 20 immutable search snapshots. It is validated on load/save and carried through the existing local/cloud repository, backups and explicit guest imports. Saving uses the normal revision-checked transaction. No Supabase migration is required.

Each snapshot retains the exact query and any saved version ID, RDKit version, method, source/retrieval settings, counts, skipped rows, hit structures, fingerprints and numeric scores. Validation recalculates hit Tanimoto values from retained fingerprints and checks counts and ordering. It does not certify the chemical identities of an untrusted imported backup.

Reports exposes saved searches separately from docking and prediction reports. PDF uses the shared branded/watermarked document renderer and export identity, includes the query and first six hit drawings, and lists every reported hit's SMILES and provenance. CSV retains unrounded numeric scores. The existing account requirement applies to downloads; guest searches and local saves remain available. PDF downloads check that the account has not changed during rendering.

Opening a saved library hit uses the existing version switch. Other hits pass through the standard SMILES importer and unsaved-drawing confirmation before becoming a new draft. The editor's existing stereo-specific import limitation remains in force; the search itself and reports preserve supplied stereo SMILES.

## Files and checks

- `model.ts`: fingerprints, scoring, ranking, parsing and snapshot validation.
- `sources.ts`: teaching structures and bounded PubChem client.
- `SimilarityPage.tsx` / `Similarity.css`: responsive search, structure previews, transfer and history.
- `SimilarityReports.tsx` / `report.ts`: report integration and branded exports.
- `tests/similarity.test.ts`: reference bits, independent bit-string overlap, charge/stereo behavior, sorting, filters, invalid inputs, snapshots, owner isolation, guest import, export content and PubChem response/error handling.

References: [RDKit Morgan fingerprints](https://www.rdkit.org/docs/GettingStartedInPython.html#morgan-fingerprints-circular-fingerprints), [PubChem PUG REST](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest).
