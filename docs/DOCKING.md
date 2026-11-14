# Molecular Docking: independent multi-engine module

**Default execution now runs Vina in the browser without Python.** See
[Browser docking](BROWSER_DOCKING.md) for that provider's preparation, hosting,
versions and limits. The following guide describes the optional advanced native
provider, which must be explicitly selected in Docking.

Docking is separate from the ADMET prediction workflow. React/TypeScript handles
input review, progress, 3Dmol visualization and reports; the Python FastAPI service
handles chemistry and subprocess execution. Startup is documented in
[backend/README.md](../backend/README.md).

## Receptor preparation

Upload a PDB or retrieve a four-character PDB ID from RCSB. Inspection reports
protein chains and non-protein residues and identifies co-crystal ligands as
possible grid-box references. It uses the first model and highest-occupancy
alternate atom locations (first record breaks ties). Suggestions are not pocket
validation. Select chains and explicitly review removal of waters, ligands, ions
and other non-protein residues. Essential cofactors/metals need a different,
curated protocol; removing them does not establish biological validity.

PDBFixer/OpenMM reconstructs supported missing heavy/terminal atoms only when
enabled and adds hydrogens at the selected pH. SEQRES information is retained
for auditing absent residues; missing loops/residue segments are not rebuilt.
Supported nonstandard replacement, such as MSE to MET, is recorded. Unsupported
protein residues and excessive automatic reconstruction fail explicitly. Meeko
then supplies receptor PDBQT typing. Protonation is a preparation-model assignment,
not a site-specific measured pKa result. Original/derived input hashes and tool
versions are recorded. Download the full archive to retain exact coordinates.

## Ligand preparation

Use the current editor molecule, linked to its exact saved version/key when
available, or import one SDF/SMILES molecule. Preparation captures its source;
subsequent editor/form changes cannot change that prepared ligand or a run.
Mixtures/salts are rejected rather than silently stripped. The bounded initial
protocol supports 1–80 heavy atoms and standard organic H/C/N/O/F/P/S/Cl/Br/I.
Isotope labels, metals, invalid structures and unspecified input stereocenters
are refused. Supply a stereochemically defined SDF/isomeric SMILES where needed.

The default MolScrub rule-based protonation model enumerates at one chosen pH, with a maximum
of eight states. No pKa population estimate, tautomer ensemble or stereoisomer
ensemble is claimed. Each state gets five RDKit ETKDGv3 conformers using seed 42;
only converged MMFF94s optimizations are eligible. The lowest MMFF energy within
that state is selected. MMFF energy must not rank different protonation states.
Meeko assigns Gasteiger charges and the ligand torsion tree. The user reviews
the prepared SMILES, formal charge, pH and warnings before docking. Original
received ligand text and prepared SDF/PDBQT are retained separately. A 3D SDF
reader may infer geometric stereotags absent from an input SMILES; exported
poses are checked against the reloaded prepared SDF, including stereochemistry.

Experts can instead preserve an explicitly supplied charge/protonation state.
In that mode pH is an annotation, not a state prediction. Both policies retain
the original content and actual prepared SMILES/charge.

## Binding site and execution

Choose a co-crystal reference, click a protein atom, or enter box coordinates.
Review the full displayed box. Lengths use Å, not grid-point counts. Each side
must be 6–40 Å, with volume at most 40,000 Å³. A center more than 15 Å from every
protein atom is rejected as a protocol guard. This is not automatic pocket
discovery. Search uses selected seed, exhaustiveness 1–32, at most 20 returned
poses and two CPUs. A pose limit is a maximum: Vina clustering may return fewer.
Native AutoDock 4 uses its own LGA runs/evaluation budget and AutoGrid maps;
see [AutoDock 4 protocol](AUTODOCK4.md) for its effective grid, score semantics,
clustering, controls, compatibility and browser-execution scope.

Jobs are persistent and asynchronous in isolated Python workers. Real stages
include cleanup, repair, hydrogen placement, protonation, conformer generation,
typing, map generation where needed, engine search and pose processing. No invented completion percentage or
mock affinity is used. Worker errors, timeouts, cancellation and interrupted
restarts are terminal non-success states. Outputs/preparation assets are gated
by completed parent jobs, and owned subprocesses are cancelled/terminated.

The adapter registry exposes Vina 1.2.7 and native AutoDock 4 / AutoGrid 4
(tested with 4.2.6). rDock and FlexAID remain disabled.
Preparations made before topology feature maps were introduced must be prepared
again for new searches; their existing result snapshots retain their recorded
interaction method. Future engine adapters must use the same job/artifact contract while retaining
engine-specific preparation, score meaning and validation. Scores from different
engines must not be pooled or described as interchangeable.

## Results, interactions and comparisons

Vina scores are scoring-function estimates in kcal/mol, not experimental binding
free energy, Kd, clinical effect, efficacy or safety. The receptor is rigid; this
release is not a covalent, metalloenzyme, explicit-water or flexible-receptor
protocol. Meeko restores SDF chemistry from PDBQT mappings. Every exported pose
is checked against the prepared ligand's reloaded SDF identity/stereochemistry;
invalid restoration withholds results.

3Dmol renders the receptor and up to three overlaid poses in their common
coordinate frame. Pose rankings show Vina's lower/upper RMSD bounds relative to
its best pose, **not** the crystal ligand. The comparison matrix uses a fixed
heavy-atom mapping without alignment or symmetry correction. It has a different
meaning from an optimized crystallographic redocking RMSD.

Interaction review is `geometry-v2`, not PLIP or experimentally confirmed bonds:

- Hydrogen-bond candidates: PDBQT donor/acceptor types; infer N/O/S–HD covalent
  pairs within 1.35 Å; require donor–acceptor ≤3.5 Å, H–acceptor ≤2.5 Å and
  donor–H–acceptor angle ≥120°.
- Hydrophobic carbon contacts: carbon atoms with only C/H covalent neighbors in
  the prepared OpenMM/RDKit topology, mapped one-to-one to PDBQT atoms; pairs
  within 4 Å; retain the
  nearest receptor atom per residue/ligand-carbon pair. These do not establish
  favorable energetics or exclude clashes.
- At most 2,000 contacts per pose are retained, with a truncation flag. Optional
  3D lines show up to 200 contacts for the first displayed pose; cyan hydrogen
  candidates, amber carbon contacts. Coordinates come from that actual pose.

## Foundation and reports

Completed runs can be frozen into the owner-scoped workspace as `dockingRuns`,
separate from descriptor/ADMET analysis records. Saved editor-version references
must match their original structure key. Imported or unsaved ligands are explicitly
identified. Duplicates deduplicate; an existing job ID cannot acquire different
outputs. Backup restore validates provenance/shape/finite values and version
links, not scientific authenticity of imported results. Existing backup schema 1
and old compound reports retain their prior meanings.

Reports has a separate Docking Research Reports section. PDF/CSV are generated
from saved immutable snapshots and work without a running backend. They include
preparation/protonation, artifact hashes, exact grid/search, scores, RMSD and
interaction criteria/limits. PDFs show up to 200 contacts per pose, with an explicit
note when capped, and refuse more than 80 pages. CSV/ZIP provide fuller details.
The page offers ranked SDF, CSV and a complete backend ZIP containing original
and prepared inputs, poses, native engine logs, config, JSON and contact CSV.
AutoDock 4 archives additionally retain GPF/DPF, AutoGrid maps and their hashes.
Raw coordinate
files are not embedded in browser backups: retain the ZIP separately.

Up to 100 run snapshots are retained, subject to the workspace backup size limit.
Future login/user authorization belongs in the backend scope dependency and
existing workspace repository boundaries, not inside chemistry/preparation code.
The supplied loopback service is a local workstation workflow; static hosting
alone cannot run it or provide a shared multi-user backend.

## Verification and scientific sources

See [DOCKING_VERIFICATION.md](DOCKING_VERIFICATION.md) for observed test evidence.
Actual Windows execution was tested; pinned Linux/macOS binaries still need
platform-specific runtime checks. Physical phones and broad target benchmarking
are not implied by responsive browser viewport tests.

- AutoDock Vina: https://doi.org/10.1002/jcc.21334 and
  https://doi.org/10.1021/acs.jcim.1c00203.
- Official basic protocol: https://autodock-vina.readthedocs.io/en/latest/docking_basic.html.
- Meeko: https://meeko.readthedocs.io/en/develop/tutorial1.html.
- PDBFixer: https://github.com/openmm/pdbfixer.
- Protein source: https://www.rcsb.org/structure/1IEP.

The hydrophobic atom eligibility definition is consistent with the [PLIP documentation](https://github.com/pharmai/plip/blob/master/DOCUMENTATION.md?plain=1). ChemEase does not implement the complete PLIP classification/clustering algorithm or claim identical output.

