# Docking verification record

Checked on Windows x64 with Python 3.12.14 and AutoDock Vina 1.2.7.
This is implementation/protocol verification, not a general docking accuracy
validation or evidence of experimental binding.

## Automated checks

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

AutoDock 4, rDock and FlexAID adapters are unavailable. Flexible-receptor,
covalent, metal/cofactor and explicit-water protocols are unsupported. The
service is a loopback workstation backend; shared hosting needs authenticated
authorization and a production supervisor. No physical phone connectivity or
Linux/macOS execution has been verified on this Windows host. Responsive browser
checks do not substitute for those tests. Target-specific redocking/enrichment
and reviewed protonation remain necessary for research use.
