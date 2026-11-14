# Browser docking accuracy correction: 1IEP

The corrected browser protocol reproduces the top-ranked imatinib crystal pose in the tested 1IEP receptor. This is target-specific redocking evidence, not general affinity or docking accuracy validation.

| Predefined seed | Vina score (kcal/mol) | Top-ranked crystal RMSD (Angstrom) |
| --- | --- | --- |
| 42 | -12.930 | 0.7659 |
| 104729 | -13.471 | 0.7724 |
| 2026 | -12.728 | 0.7413 |

All three pass the predefined 2 Angstrom criterion. RMSD uses all 37 heavy atoms, complete chemical-graph symmetry mapping, the common receptor coordinate frame and **no coordinate alignment**. Poses retain their Vina ranking; the crystal reference never chooses a pose or enters the docking search. Every repeat used the same prepared receptor/ligand, +1 ligand charge, 20 x 20 x 20 Angstrom box centered at (15.190, 53.903, 16.917), exhaustiveness 32 and four browser CPU workers. The requested maximum was nine poses; the engine returned two, one and one respectively.

## Cause and correction

The old Open Babel torsion tree froze the anilino-pyrimidine bond (prepared v1 SDF atoms 25-26). Its starting dihedral was about 178.1 degrees, while the corresponding crystal dihedral was about -0.5 degrees. The search could not rotate that bond to recover the reference conformation.

Protocol `chemease-browser-v2` keeps Open Babel atom types/charges and preserved atom indices, then builds the tree from RDKit's chemical bond graph. Acyclic nonterminal single bonds rotate; genuine amide/amidine bonds and rings stay rigid. Internal alkynes use one triple-bond axis in place of the adjacent single-bond axes. A balanced heavy-atom root avoids unnecessarily moving most of the ligand from a terminal ring. This is a rigid-ring protocol, not a macrocycle or amide-state ensemble, and does not run native Meeko.

A controlled diagnostic used native Vina 1.2.7 with **identical protein, ligand coordinates, charges, seed 42 and exhaustiveness 32**, changing only the ligand torsion-tree representation. Top-ranked RMSD improved from **11.9223 to 0.9269 Angstrom**. Both diagnostic inputs were +2; this isolates the tree correction from the independently reviewed protonation used in the final browser runs. The browser results above use actual Vina 1.2.3 WebAssembly, not that diagnostic executable.

## Preparation and protonation checks

The receptor retains 2,229 chain-A protein heavy atoms in the crystal frame. Reduce 4.13 adds hydrogens without heavy-atom flips; Open Babel 3.1.0 produces rigid PDBQT. Incomplete standard-residue heavy atoms are refused. A known near-crystal pose scored -13.381 kcal/mol against the browser-prepared receptor versus -13.382 against the native-prepared receptor in a native score-only control. This supports compatibility for this pocket; it does not validate every protein protonation assignment. Histidine states, essential cofactors, missing loops and pKa-dependent sites still require review.

The initial Open Babel pH heuristic produced a +2 imatinib candidate. It does not model coupled microscopic pKa values or state populations. The reference tutorial input is +1; the browser example now explicitly supplies that state and generates fresh 3D coordinates from its SMILES. It does not import the crystal ligand as a starting conformer. Supplied charge and cross-format chemical/stereo identity are checked before publishing a preparation; the actual prepared SMILES/charge and files remain inspectable. Protein pH remains an annotation, not a pKa prediction.

The recorded Open Babel PDBQT partial-charge sum is about -0.003 although the SDF formal charge is +1. Those are distinct fields; this is not a validated electrostatic charge preparation. Standard Vina ignores user-supplied partial charges (see its [official FAQ](https://autodock-vina.readthedocs.io/en/latest/faq.html)). Protonation still matters through donor/acceptor atom types, which were retained and checked. The raw tool output remains unchanged for reproducibility. Do not reuse these browser PDBQT files for AD4 or electrostatic calculations; use the separate native preparation for those methods.

## Integrity, geometry and integration

The primary and seed-104729 complete ZIPs passed CRC, prepared-input and preparation-file SHA-256, engine-version/CPU-log checks, torsion-manifest checks, and every SDF's chemical identity and rank/score properties. The seed-2026 actual SDF and preparation snapshot were inspected in the UI; all three runs had identical input manifests. No pose had a protein-ligand heavy-atom contact below 1.5 Angstrom. Maximum ligand bond-length drift was below 0.002 Angstrom, consistent with coordinate serialization.

All three completed runs saved to Foundation reports. Saved CSV retained the exact seed, CPU count, budget, protocol and scores; PDF generation produced a download link from the frozen snapshot. Persistent links allow saving after asynchronous generation, and SDF/CSV contents can be inspected in the interface. V1 preparations cannot start a new search; historical v1 results remain readable and export a visible rerun advisory without changing recorded values.

The initial one-worker run hit the old 20-minute limit. The remaining two runs under that resource configuration were cancelled, with no partial accuracy results published. All predefined seeds were repeated with four workers and a 45-minute docking limit. The primary search itself took about 7 minutes 41 seconds on this device; runtime depends on hardware. Physical-phone performance has not been benchmarked.

## Reproducing the check

Use **Load 1IEP / imatinib presentation example**, prepare chain A after reviewing cleanup, prepare the supplied +1 ligand, review the box and run each seed above. Export the complete ZIP or inspect/save its SDF and exact preparation snapshot. Raw coordinates remain separate from Foundation backups.

The reference is retained outside the website runtime at [fixtures/1iep-crystal-ligand.sdf](fixtures/1iep-crystal-ligand.sdf), SHA-256 `051b8742c32adc05c07fb486a4e7c9327f84e131cee33ac4e6a568d07553eb38`. It contains crystallographic heavy coordinates and modeled hydrogens/protonation. It is used only by the independent checker:

```powershell
backend/.venv/Scripts/python.exe tools/verify-docking-archive.py downloaded-results.zip --reference docs/fixtures/1iep-crystal-ligand.sdf --rmsd-threshold 2
```

The checker reports top-ranked and best-sampled RMSD separately and fails the threshold on the top-ranked pose. [Machine-readable evidence](docking-benchmark-1iep.json) retains run IDs, runtime/input hashes, settings, metric definition and diagnostic controls. Preparation and sampling still need validation for other targets, ligand states and receptor conformations. Scores are scoring-function estimates, not measured affinity or efficacy.

Primary method sources: [official Vina 1IEP tutorial](https://autodock-vina.readthedocs.io/en/stable/docking_basic.html), [Meeko bond-typing reference](https://github.com/forlilab/Meeko/blob/develop/meeko/bondtyper.py), [Open Babel PDBQT options](https://openbabel.org/docs/FileFormats/AutoDock_PDBQT_format.html). The official tutorial recommends increased sampling for this challenging ligand. Browser runtime source/version notices remain in `public/docking-wasm`.
