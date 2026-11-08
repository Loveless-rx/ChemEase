# Architecture and engineering decisions

## Integration basis

This edition combines the uploaded React/Vite project configuration and assets with the working graph editor. The original prototype is retained in a source-only backup; the active app uses one coordinated state/engine/UI architecture and a new native-WebGL scroll introduction.

## State and data flow

1. Canvas and toolbar events call typed molecule-store operations.
2. Each committed mutation clones the prior graph, applies an operation, normalizes aromatic flags from aromatic bonds and records a history snapshot.
3. Zustand publishes the new immutable molecule. The SVG renderer displays it.
4. Pure chemistry functions consume that graph. Analysis is cached by chemistry fields and connectivity, excluding atom coordinates and molecule name; geometry-only drags do not regenerate descriptors or SMILES.
5. Sidebar and analysis dialog display the same computed analysis. Export functions consume the graph, never a screenshot of UI controls.

Selection, active tools, viewport, theme, dialog state and chemistry data are deliberately separate concerns. Selection is not stored on Atom. Implicit hydrogens are derived, with an optional explicit override, rather than storing stale duplicate values on the graph.

## History transactions

Ordinary mutations are discrete snapshots with descriptive labels. A drag captures one starting snapshot, updates coordinates transiently, then records one history entry on pointer-up. Cancellation restores the starting snapshot without adding a history entry. Undo/redo clears pending bonds and selection. A new edit clears the redo branch. History is bounded to 120 snapshots.

Save markers are fingerprints of atoms, bonds and name, not merely counters. Undoing back to saved contents returns to a clean state. New, import, restore and example loading are themselves undoable; they do not silently discard the current graph.

## Geometry and interaction

World coordinates are independent of viewport size. SVG transformation is viewport center + pan + zoom. Pointer coordinates are inverted through that transform. Native wheel handling prevents page scroll while zooming and anchors the world point under the pointer. Resizing refits the current graph; the explicit Fit command is always available.

Pointer capture preserves dragging and rectangular lasso across the canvas boundary. Shift selection supports groups. The bond tool resolves existing endpoints and existing atom pairs, so applying a different order edits the existing edge rather than introducing duplicate edges. Empty-space chain extension snaps to 30-degree angles and the standard bond length.

Rings are generated as atoms and bonds, then handled by the same renderer and editor as any other graph. Automatic ring fusion is intentionally not inferred.

## Chemistry design

- Element constants and isotope masses are centralized.
- Adjacency maps support valence and connectivity operations.
- Mass includes each explicit atom plus only its derived implicit hydrogens.
- The valence engine handles a bounded set of common main-group states. Drawing is not prohibited when a state is unusual.
- Ring count is graph cycle rank; Tarjan-style bridge detection identifies bonds belonging to cycles.
- The SMILES writer builds a DFS spanning forest, records non-tree ring closures, serializes branches and handles disconnected fragments with dots. Bracket atoms include supported isotope, hydrogen and charge information.
- Validation runs before SMILES output. Unsupported aromaticity, impossible typical valence and uninterpreted stereo produce an explicit unavailable result rather than a plausible but misleading string.
- Donor, acceptor and rotatable counts are intentionally qualified organic graph-rule estimates.

The full accepted chemistry scope and its limitations are documented in README.md and displayed in the analysis/help interface.

## Renderer and exports

`engine/rendering.ts` supplies shared label and bond-segment geometry to the interactive renderer and pure SVG exporter. The exporter escapes user-controlled text, crops to graph bounds and excludes interaction targets, grid, selection and interface chrome. PNG export rasterizes the actual generated SVG and releases temporary object URLs.

## Storage and error handling

One versioned molecule can be saved to localStorage. JSON export is the portable multi-file persistence mechanism. Import validates shape, unique IDs, finite bounded coordinates, charges, bond types, endpoints, duplicate atom pairs, isotope/H overrides and size limits. Unknown element symbols can remain drawable but receive warnings and unavailable mass/SMILES where appropriate.

Browser storage failures are surfaced and do not delete the molecule. Malformed saves are not loaded. Missing bond endpoints do not crash pure analysis or rendering. The React error boundary offers recovery without clearing saved data.

## Extending ChemEase

The next chemistry milestone should be a trusted-toolkit adapter, preferably RDKit/WASM. Add a result contract that carries descriptor provenance, confidence/scope and sanitization warnings. Preserve the lightweight drawing graph, then adapt it into toolkit structures. Do not write toolkit-specific values into SVG nodes.

Other natural extension points:

- New graph entities for reaction arrows, text and reaction schemes, separate from molecular atoms/bonds.
- Stereo and isotope property controls with tested serialization.
- A graph-command layer if history needs more efficient deltas for very large structures.
- A spatial index for hit-testing or layout when the current 1,500-atom cap is raised.
- IndexedDB document collections when one local save is insufficient.
- A renderer-neutral export contract for MOL/SDF once a trustworthy writer is integrated.

## Production-readiness boundary

This is an implemented and tested integration release, not a claim of comprehensive production or scientific validation. The supplied standalone uses official dependencies and was bundled with esbuild. The preserved npm/Vite build path must still be verified on a machine that can install the appropriate native dependencies. Validate across browsers and external chemistry fixtures before deployment.


## Integrated scroll-WebGL introduction
`sceneMath.ts` is a pure, testable timeline of camera, rotation, position, scale, separation and bond visibility. Smooth interpolation makes forward and backward scrolling reversible. Mobile framing interpolates separately; reduced motion uses stationary camera views.

`MoleculeScene.ts` owns WebGL buffers, sphere/cylinder meshes, shaders, view/projection matrices and GPU cleanup. Lighting uses key/fill diffuse, specular and violet rim terms. The 12-atom benzene illustration includes explicit hydrogen balls; the independent editor benzene template contains six drawn aromatic C atoms with implicit H. The intro panel correctly labels its count as **drawn atoms**. Neither geometry nor animation is a conformer calculation.

`Intro.tsx` owns native scroll, ResizeObserver, a bounded-progress RAF loop, chapter accessibility, pointer parallax and the no-reload transition. It does not intercept wheel scrolling. GPU draws stop when the document is hidden or the scene is unchanged; RAF scheduling itself remains active while the intro is mounted. WebGL buffers/programs and listeners are cleaned up on unmount. Context loss shows a fallback; restoration rebuilds the scene.

No external 3D models, fonts, CDN scripts, Three.js or animation packages are required. The new chemistry memo uses a local, chemistry-only serialized signature so coordinate dragging does not rerun graph analysis and does not mutate a shared cache during React rendering.
