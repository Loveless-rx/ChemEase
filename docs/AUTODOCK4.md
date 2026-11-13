# Native AutoDock 4 integration

The software integration is operational. Scientific validation is mixed: the
1IEP/imatinib API-preparation check recovered a 1.11 Å pose, but the editor-input
default ten-run check produced a 3.57 Å top-scoring pose and failed a 2 Å
redocking criterion. This default is not a target-validated research preset.
See the complete evidence in [the verification record](DOCKING_VERIFICATION.md).

AutoDock 4 runs through the same preparation/job/artifact manager, viewer and
owner-scoped Foundation snapshots as Vina. It executes the actual AutoDock 4
binary after AutoGrid 4; Vina's AD4 scoring option is not substituted for it.
The Windows 4.2.6 official suite was used for runtime verification. Backend
setup and optional environment overrides are in [backend/README.md](../backend/README.md).

## Protocol

Prepared Meeko PDBQT inputs retain their Gasteiger/template charges and AD4
atom types. Standard organic C/A/N/NA/OA/S/SA/HD/F/Cl/Br/I/P types are supported.
Custom/reactive and macrocycle glue types are refused; maximum 32 ligand
torsions. Existing preparation warnings/protonation policies still apply.

AutoGrid generates one map per ligand atom type plus electrostatic/desolvation
maps with the built-in AD4 force field. Spacing is 0.375 Å, smoothing 0.5 Å,
and distance-dependent dielectric flag -0.1465. Each requested side is rounded
up to an even interval count, so a requested 20 Å side becomes 54 intervals /
20.25 Å. The preview shows this effective box. The exact requested/effective
grids and map hashes are frozen in the result, PDF/CSV and archive.

The native Lamarckian genetic algorithm uses pseudo-Solis-Wets local search.
Default: 10 independent runs, 2,500,000 maximum evaluations per run,
population 150 and maximum 27,000 generations. The UI permits 1–50 runs and
100,000–10,000,000 evaluations per run; limits stop excessive work, not certify
adequate sampling. Low budgets are suitable for workflow checks, not convergence
claims. Deterministic integer seeds are entered seed and seed modulo
2,147,483,646 plus one. The selected unbound-energy model is `bound`.
GPF/DPF retain the remaining fixed protocol parameters exactly.

The complete DLG ensemble must report successful completion and match the
requested run count. Native RANKING cluster membership must form complete,
unambiguous subranks. Lowest-energy representatives of the native 2 Å clusters
are sorted by estimated binding energy and limited by the user's maximum pose
count. Fewer representatives than runs/maximum poses is normal. Each retained
pose includes its source LGA run and cluster ID.

DLG coordinates are mapped by atom serial/name/type to the original Meeko
ligand tree and metadata. Prepared chemical identity/stereochemistry must
survive reloaded SDF export before publication. The same topology-based contact
analysis and common-frame pose comparison are then applied. Grid generation
and docking are cancellable; partial files never become completed results.

## Foundation and reports

Existing `dockingRuns` records retain schema 1. The engine discriminator selects
engine-specific controls and validation. Vina snapshots retain their original
settings/score interpretation. AutoDock 4 adds its protocol, map/binary hashes,
native run/cluster IDs and null Vina RMSD bounds. Restore rejects mixed controls,
incorrect effective grids/seeds, altered map provenance or fictitious Vina bounds.
These are provenance/shape checks, not scientific authentication of imported files.

Both engines use the same immutable editor version/key or explicit imported
source link. PDF/CSV exports from saved snapshots work offline. AD4 reports label
estimated binding energy in kcal/mol and native run/cluster IDs; they never label
these values as Vina scores/RMSD bounds. The fixed-atom pose comparison matrix
has the same meaning for either engine. Energies across engines must not be pooled
or interpreted as experimental binding free energies/Kd.

The full ZIP retains original inputs, prepared receptor/ligand PDBQT/SDF,
all affinity maps, GPF, DPF, GLG, DLG, normalized ranked poses, interaction CSV,
configuration and result JSON. Raw native DLG includes every search outcome;
normalized poses/SDF contain the selected cluster representatives.

## Browser-only execution

It is technically possible to run compiled docking engines in a Web Worker using
WebAssembly. [Webina](https://github.com/durrantlab/webina) demonstrates this for
Vina, but is archived and is not the AutoDock 4 engine or this app's preparation
pipeline. It expects prepared PDBQT files; its documented threaded configuration
uses SharedArrayBuffer and cross-origin isolation headers.

[MolModa's peer-reviewed workflow](https://doi.org/10.1093/nar/gkae406) also
demonstrates browser-side preparation using WebAssembly builds of Open Babel
and Reduce, followed by Vina. This is a practical reference for a future
ChemEase browser provider. Those tools/protocols differ from the present
PDBFixer/OpenMM + MolScrub/RDKit/Meeko preparation and need independent comparison;
they do not supply a validated drop-in native AutoDock 4 replacement.

ChemEase currently runs native AutoGrid/AutoDock and Python preparation on the
local service. Browser-only support would require a separately built/pinned
AutoGrid/AD4 WebAssembly runtime, worker cancellation/resource limits, validated
preparation/export replacements, hosting/header compatibility and parity checks
against native runs. It has not been implemented or claimed available here.
The existing manager/snapshot boundaries allow a future execution provider to
retain the same Foundation/report contracts with explicit execution provenance.
Phone resource limits and browser background suspension also require device tests.

## Primary references

- [Official AutoDock 4.2.6 user guide](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf): GPF/DPF, LGA, clustering and energy interpretation.
- [Official suite downloads/source](https://autodock.scripps.edu/download-autodock4/).
- [Morris et al., AutoDock4 and AutoDockTools4 (2009)](https://doi.org/10.1002/jcc.21256).
- [Meeko preparation](https://meeko.readthedocs.io/en/develop/tutorial1.html).

See [verification record](DOCKING_VERIFICATION.md). A running implementation of
a published model is not universal docking accuracy validation. Target-specific
redocking, enrichment and sampling/protonation review remain necessary.
