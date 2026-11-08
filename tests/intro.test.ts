import test from "node:test";
import assert from "node:assert/strict";
import {
  sceneFrame,
  chapterOpacity,
  perspective,
  lookAt,
  rotate,
} from "../src/Components/intro/sceneMath";
import { parseMolecule } from "../src/utils/storage";
import { molecularFormula } from "../src/engine/formula";
test("scroll progress drives real camera motion and molecular disassembly", () => {
  const a = sceneFrame(0),
    b = sceneFrame(0.32),
    c = sceneFrame(0.65);
  assert.notDeepEqual(a.camera, b.camera);
  assert.ok(b.spread > 2);
  assert.ok(c.spread < 0.1);
  assert.ok(c.position[0] < 0);
});
test("scroll animation is deterministic and reversible", () => {
  const a = sceneFrame(0.35);
  sceneFrame(0.9);
  assert.deepEqual(sceneFrame(0.35), a);
});
test("progress is clamped safely", () => {
  assert.equal(sceneFrame(-1).at, 0);
  assert.equal(sceneFrame(2).at, 1);
});
test("reduced motion disables camera orbit and disassembly", () => {
  const f = sceneFrame(0.35, false, true);
  assert.deepEqual(f.camera, [0, 0, 10.5]);
  assert.equal(f.spread, 0);
  assert.equal(f.bonds, 1);
});
test("chapter transitions do not show two interactive text panels", () => {
  for (let i = 0; i <= 1000; i++) {
    const count = [0, 1, 2, 3].filter(
      (n) => chapterOpacity(i / 1000, n) > 0.7,
    ).length;
    assert.ok(count <= 1);
  }
});
test("3D matrices contain finite values", () => {
  for (const matrix of [perspective(0.65, 1.6), lookAt([0, 0, 10], [0, 0, 0])])
    assert.ok([...matrix].every(Number.isFinite));
  assert.ok(Math.abs(rotate([1, 0, 0], [0, Math.PI / 2, 0])[2] + 1) < 1e-10);
});
test("legacy numeric-ID molecule imports without changing chemistry", () => {
  const raw = {
    atoms: [
      { id: 1, element: "C", x: 10, y: 20 },
      { id: 2, element: "C", x: 40, y: 20 },
      { id: 3, element: "O", x: 70, y: 20 },
    ],
    bonds: [
      { id: 1, atomA: 1, atomB: 2, type: "single" },
      { id: 2, atomA: 2, atomB: 3, type: "single" },
    ],
  };
  const m = parseMolecule(JSON.stringify(raw));
  assert.equal(molecularFormula(m), "C2H6O");
  assert.equal(m.atoms[0].id, "legacy-atom-1");
  assert.equal(m.atoms[0].x, 10);
});
test("legacy dangling edges are rejected by normal validation", () => {
  assert.throws(() =>
    parseMolecule(
      JSON.stringify({
        atoms: [{ id: 1, element: "C", x: 0, y: 0 }],
        bonds: [{ id: 1, atomA: 1, atomB: 2, type: "single" }],
      }),
    ),
  );
});
