# Docking verification record

Checked on Windows x64 with Python 3.12.14 and AutoDock Vina 1.2.7.
This is implementation/protocol verification, not a general docking accuracy
validation or evidence of experimental binding.

## Initial Vina-first automated checks

- Application: 231 tests passed, including immutable docking snapshots, owner/
  version links, malformed imports, finite scores/contacts, CSV provenance,
  backend-origin validation and backend-specific capability isolation.
- Backend: 23 tests passed using isolated stores. Coverage includes strict input
  validation, scoped access, partial-output gating, artifact hash verification,
  job cancellation/restart handling, single-server lease, process-launch failure,
  PDB/SEQRES handling, geometric criteria and covalent hydrophobic atom typing.
  Real ligand preparation verifies both rule-based and supplied-charge policies.
- ESLint and the TypeScript/Vite/standalone production build passed. Vite retains
  dependency warnings for 3Dmol's internal eval and large bundle size.
- The `npm run docking:backend` helper started on an isolated data directory and
  port 8002; its health endpoint returned the installed tool and Vina versions.

Run the commands in [backend/README.md](../backend/README.md) to reproduce the
automated checks. API queue/orchestration tests stub worker launch where needed;
the executions below use the actual chemistry tools and Vina executable.

## Real execution and browser evidence

Public protein 1IEP and imatinib were used for end-to-end execution. Receptor
chain A was prepared with PDBFixer/OpenMM and Meeko; the editor ligand was
converted using MolScrub, five RDKit ETKDGv3 conformers, converged MMFF94s and
Meeko. pH 7.4 rule-based preparation produced a +2 ligand state; this is a rule
assignment, not a validated pKa/population prediction. The actual state remains
visible. Experts can preserve a curated supplied state instead.

The browser workflow exercised PDB-ID retrieval and PDB upload, editor and SDF
ligand sources, co-crystal site selection, grid review, stage polling, real
Vina execution, pose overlays/contact lines, snapshot saving and PDF/ZIP export.
An earlier editor-linked run (`c5e7a1347d544719b061c50309bcb281`)
returned three scores: -13.382, -11.417 and -10.385 kcal/mol. The downloaded ZIP
passed CRC, prepared-input SHA-256 and every pose's reloaded SDF chemistry/
stereochemistry checks. Its best pose was 0.6472 Å from the aligned tutorial
crystal ligand using the verifier's complete symmetry mapping without coordinate
alignment. That one result does not establish general predictive accuracy.

A separate actual running Vina search was cancelled; it became terminal
`cancelled`, exposed no result, and rejected archive/artifact downloads. A
downloaded six-page PDF was rendered and visually inspected. Fresh workspace
Reports also rendered without saved docking data or console errors.

The hydrophobic contact implementation was subsequently tightened to use
carbon-only-C/H covalent neighbors from the actual prepared topology
(`geometry-v2`). Old result snapshots retain their recorded interaction method;
older preparation assets must be regenerated before a new search.

The final `geometry-v2` browser run
`fa726ad7d9f848a188ecc6de87074b77` repeated the editor-linked protocol with chain A,
center (15.19, 53.9025, 16.917) Å, a 20 × 20 × 20 Å box, exhaustiveness 8,
seed 42 and a three-pose maximum. It returned the same three scores, with
28/19/15 topology-filtered contacts. Its downloaded archive passed the permanent
verifier and the best-pose reference RMSD was again 0.6472 Å, without hitting
the mapping cap. Engine binary SHA-256:
`e0c4b2715e0c1a74f6e92d0f3be0328ac97542eafbc111e6b1efad897a73cce5`.

The final production build restored this job from backend history after reload;
both saved runs remained in Reports. The current run's saved-report PDF and CSV
downloaded successfully. All five PDF pages were rendered and inspected,
including the exact interaction-method and protonation-policy descriptions.
The 3D viewer rendered real receptor/pose coordinates and contact lines without
browser console errors. Browser widths 320, 390 and 768 pixels showed no page
or card overflow; result tables scroll locally. Desktop and phone screenshots
were retained as local review artifacts. Physical-device connectivity remains
outside this check.

## Reproduce an artifact check

```powershell
backend/.venv/Scripts/python.exe tools/verify-docking-archive.py downloaded.zip
# Optional: a reference already in the receptor's coordinate frame
backend/.venv/Scripts/python.exe tools/verify-docking-archive.py downloaded.zip --reference aligned-crystal-ligand.sdf
```

The optional comparison requires a complete element/bond heavy-atom MCS match,
ignores protonation/stereo differences for reference matching, performs no
alignment and checks at most 1,000 mappings per molecule. A cap flag is reported.
It is distinct from the UI's fixed-mapping pose-to-pose matrix and Vina's own
best-pose-relative RMSD bounds.

## Explicit outstanding scope

rDock and FlexAID adapters are unavailable. Flexible-receptor,
covalent, metal/cofactor and explicit-water protocols are unsupported. The
service is a loopback workstation backend; shared hosting needs authenticated
authorization and a production supervisor. No physical phone connectivity or
Linux/macOS execution has been verified on this Windows host. Responsive browser
checks do not substitute for those tests. Target-specific redocking/enrichment
and reviewed protonation remain necessary for research use.

## AutoDock 4 addition — 2026-11-13

The latest application checks passed 233 tests; backend checks passed 36 tests.
TypeScript, ESLint, Vite and standalone builds passed. New cases cover native
GPF/DPF generation, effective even-point grids, engine-specific settings, supported
types/torsion limits, complete DLG ensembles and native clustering, malformed/
partial/identity-changed poses, missing installations/version output, AD4 backup
restore, null Vina bounds, map hashes and correct CSV interpretation.

The optional installer was executed against the official Windows 4.2.6 package.
It verified the package SHA-256
`306dc72a06e80a2da6f3c410ac6aba7ebdaeef6b702eca42de44c7c6c9d48755`,
AutoDock binary `36c0b16c04d7df8e6225737bae65bb04058d1f4c90accfaf2d230dbc913954bf`,
and AutoGrid binary `797efce687d1ae82df59726461e0e1966b3d8edb0f8b187f982fa1ab0c12da9e`.
Both reported 4.2.6; this is native AD4, not Vina with an AD4 scoring option.

Real 1IEP chain A / imatinib runs used pH 7.4 (+2 rule-based ligand), seed 42/43,
20 Å requested sides (20.25 Å effective), 0.375 Å spacing and native LGA:

| Preparation/run | LGA runs × max evaluations | Best AD4 energy (kcal/mol) | Best-pose crystal RMSD (Å) |
| --- | --- | --- | --- |
| API SMILES preparation `c3813570ebb643049de452963c92e31d` | 3 × 2,500,000 | -13.54 | 1.1130 |
| Editor-linked preparation `0b870d3042e340d284c7d7d42e27cf00` | 3 × 2,500,000 | -10.55 | 6.6888 |
| Same editor inputs, default budget `db9bc2a8b46d447cbe54a8c98f15d648` | 10 × 2,500,000 | -11.75 | 3.5690 |

The first recovered a near-crystal pose; the second did **not** pass a 2 Å
redocking criterion. Both observations are retained. Input comparison found the
ligand PDBQT identical, but receptor PDBQT coordinates differed by up to 0.0047 Å
between the two preparation executions (heavy-atom coordinates were identical;
only hydrogen coordinates differed). The stochastic search produced different
outcomes. The default ten-run check returned five native cluster representatives
and improved the editor-input result, but its top-scoring pose still failed the
2 Å criterion. The default must **not** be described as a target-validated 1IEP
preset. No seed/pose was substituted to hide this failure. The model's published validation cannot certify every preparation,
target or parameter choice. Reference matching uses the verifier's full heavy-atom
MCS, no coordinate alignment, and ignores charge/stereo differences for matching;
the mapping cap was not reached. This is distinct from native AD4 clustering.

A low-budget browser run `4a0f050a5f1147eb88911495bbb6944f` (3 × 100,000) was
used for workflow checks only. Its result saved to Foundation with the original
editor version/key; a four-page PDF was downloaded from Reports, rendered and
inspected. Its CSV used AD4 energy/source-run/cluster labels, not Vina scores or
invented RMSD bounds. Both this archive and the later editor-run archive passed
CRC, prepared-input SHA-256, map SHA-256 and every pose's reloaded SDF chemical/
stereochemical identity checks. Ranked SDF download also succeeded.

Real cancellation was exercised during both `generating-ad4-maps` and native
`docking`: each became terminal `cancelled`, hid results and rejected partial
archive/SDF downloads with HTTP 409. A real Vina regression run
`8b602b6f08a54b7693f4f53a716b789d` completed with -13.403 kcal/mol and passed
archive/pose chemistry verification, preserving the separate Vina protocol.

The final default-budget run's complete downloaded ZIP also passed the permanent
verifier, including maps and the prepared ligand PDBQT needed by the native DPF.
It saved to Foundation and survived a browser reload alongside earlier Vina/AD4
records. Its six-page saved-report PDF was rendered and visually inspected.
The final production UI displayed real pose overlays/contact lines and native
run/cluster IDs with no browser console errors. Browser widths 320, 390 and 768
had no page/card overflow; tables scroll locally. Desktop/phone screenshots were
retained. The viewport override was reset. These are responsive browser checks,
not physical-device/backend-connectivity or broad scientific accuracy validation.


## Browser-only provider verification - 2026-11-14

Real Vina 1.2.3, Open Babel 3.1.0 and Reduce 4.13 WebAssembly from pinned MolModa
commit d458231d7ea235fa0e7c60ca8fe1526622e06b88 ran in the browser with the
Python docking service stopped. No sample results replace computed searches.
These checks verify workflows and artifact integrity, not target-specific accuracy.

Protein: chain-A 1IEP preparation retained heavy coordinates, added hydrogens and
produced rigid Gasteiger-charged PDBQT. Incomplete standard-residue heavy atoms
are refused. First-model/alternate occupancy selection has regression coverage.

A reference check caught and fixed combined generation/pH preparation losing
ionization. pH is now a separate Open Babel conversion after 3D generation.
At pH 7.4, methylamine produced C[NH3+] (+1), acetate CC(=O)[O-] (-1).
Supplied-state methylamine remained CN (0). This is not a validation of all pKa
states: the rule-based imatinib preparation produced +2 and needs state review.

Run b7dde10f4ac545c2b463a3a168b2da91 used this +2 imatinib, seed 42,
exhaustiveness 8 and a 20 Angstrom cube. Three real scores were -9.217, -9.119,
-9.051 kcal/mol. Its ZIP passed CRC, prepared-input SHA-256 and all exported
pose chemical/stereochemical identity checks. Best-pose crystal-frame heavy-atom
RMSD was 12.5018 Angstrom: it did not reproduce the crystal pose. This cube was
smaller than the co-crystal site's suggested box on two axes.

Final co-crystal-site box run 26c08642211e450b913c6ff3ec0fd478 used sides
18.664 x 26.739 x 23.526 Angstrom, the same state/seed/exhaustiveness, and returned
three poses scoring -9.002, -8.984 and -8.418 kcal/mol. Its archive passed the same
checks. Best-pose crystal-frame RMSD was 12.4716 Angstrom. Enlarging the box did
not establish redocking accuracy. No repeated seed selection hid this outcome.
Do not infer accuracy from favorable scores: preparation/protonation and
redocking/enrichment validation remain necessary before scientific interpretation.

Editor-linked run 1c097441038747df939abf2355a3ee47 completed with the exact saved
Foundation version 15597eec-dcca-47be-a8a1-86fff549206f, supplied-state methylamine
and the co-crystal-derived site. It saved to reports. This small-ligand run is an
integration check, not an accuracy benchmark. Completed jobs/preparations and
Foundation report snapshots survived reload. The browser report's four-page PDF
was downloaded, rendered and visually inspected, with provider/tool versions,
runtime hashes, inputs, poses, contacts and scientific limits visible.

Real running search e277de0df8f24b34882f0882117c2192 was cancelled. It became
terminal cancelled, with no partial result/download section. A tab reload
interrupts execution; the persisted job recovery checks active Web Locks before
marking interrupted work failed, rather than publishing partial output.

Production /ChemEase/ static hosting without COOP/COEP server headers reached
Browser docking ready through the isolation service worker. A fresh origin
reached ready automatically with the controller-change bootstrap. No GitHub
deployment was performed. Widths 320, 390 and 768 px had no page/card overflow;
these are emulations, not physical-phone memory/background suspension tests.

Identity guards normalize ordinary explicit H before canonical comparison,
refuse 3D-generation or H-removal chemical/stereo identity changes, and preserve
prepared-state chemistry in every pose export. Real final preparations passed
for imatinib and C[C@H](O)C(=O)O to C[C@H](O)C(=O)[O-], retaining its specified
stereocenter. The regression test covers explicit-H round trips, charged
references, opposite stereoisomers and ambiguous-stereocenter rejection.

Checks: 240 frontend tests, strict TypeScript, ESLint and production build;
36 native regression tests (one existing Starlette/httpx deprecation warning).
Native and browser protocols remain distinct; no engine parity or universal
scientific accuracy is claimed. See BROWSER_DOCKING.md for methods and limits.

Interrupted-job recovery was exercised with preparation
4c426836b5c34322a500aa2a56f9355a: reloading immediately after submission stopped
its worker; reopening its history entry showed terminal failed / interrupted
with no published partial output. Final desktop and 390 px phone previews show
real overlaid poses/contact lines. The viewport override was reset.
