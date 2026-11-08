import test from "node:test";
import assert from "node:assert/strict";
import {
  useMoleculeStore as store,
  fingerprint,
} from "../src/store/moleculeStore";
import { useHistoryStore as history } from "../src/store/historyStore";
import { emptyMolecule } from "../src/models/Molecule";
import { molecularFormula } from "../src/engine/formula";
function reset() {
  store.setState({
    molecule: emptyMolecule(),
    selectedAtoms: [],
    selectedBonds: [],
    dragStart: null,
  });
  history.getState().clear();
}
test("atom and bond edits, undo and redo", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  store.getState().addAtom(64, 0, "O");
  const [a, b] = store.getState().molecule.atoms;
  store.getState().addBond(a.id, b.id, "single");
  assert.equal(molecularFormula(store.getState().molecule), "CH4O");
  store.getState().undo();
  assert.equal(store.getState().molecule.bonds.length, 0);
  store.getState().redo();
  assert.equal(store.getState().molecule.bonds.length, 1);
});
test("deleting atom removes connected bonds, undo restores both", () => {
  reset();
  const s = store.getState();
  s.addAtom(0, 0, "C");
  s.addAtom(64, 0, "O");
  const [a, b] = store.getState().molecule.atoms;
  s.addBond(a.id, b.id, "single");
  s.remove([a.id], []);
  assert.equal(store.getState().molecule.bonds.length, 0);
  s.undo();
  assert.equal(store.getState().molecule.atoms.length, 2);
  assert.equal(store.getState().molecule.bonds.length, 1);
});
test("continuous drag creates exactly one history entry", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  const id = store.getState().molecule.atoms[0].id;
  history.getState().clear();
  store.getState().beginDrag();
  for (let i = 1; i <= 100; i++)
    store.getState().moveAtoms(new Map([[id, { x: i, y: i }]]));
  store.getState().endDrag();
  assert.equal(history.getState().past.length, 1);
  store.getState().undo();
  assert.equal(store.getState().molecule.atoms[0].x, 0);
  store.getState().redo();
  assert.equal(store.getState().molecule.atoms[0].x, 100);
});
test("canceling a drag does not modify history", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  const id = store.getState().molecule.atoms[0].id;
  const before = fingerprint(store.getState().molecule),
    count = history.getState().past.length;
  store.getState().beginDrag();
  store.getState().moveAtoms(new Map([[id, { x: 500, y: 500 }]]));
  store.getState().endDrag(true);
  assert.equal(fingerprint(store.getState().molecule), before);
  assert.equal(history.getState().past.length, count);
});
test("new edit invalidates redo branch", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  store.getState().undo();
  store.getState().addAtom(0, 0, "O");
  assert.equal(history.getState().future.length, 0);
});
test("ring insertion and removal are atomic", () => {
  reset();
  store.getState().addRing(0, 0, 6, true);
  assert.equal(history.getState().past.length, 1);
  assert.equal(molecularFormula(store.getState().molecule), "C6H6");
  store.getState().undo();
  assert.equal(store.getState().molecule.atoms.length, 0);
  store.getState().redo();
  assert.equal(store.getState().molecule.bonds.length, 6);
});
test("repeated bond tool edits rather than duplicate bonds", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  store.getState().addAtom(64, 0, "C");
  const [a, b] = store.getState().molecule.atoms;
  store.getState().addBond(a.id, b.id, "single");
  store.getState().addBond(b.id, a.id, "double");
  assert.equal(store.getState().molecule.bonds.length, 1);
  assert.equal(molecularFormula(store.getState().molecule), "C2H4");
});
test("charge changes are undoable", () => {
  reset();
  store.getState().addAtom(0, 0, "N");
  const id = store.getState().molecule.atoms[0].id;
  store.getState().patchAtom(id, { charge: 1 });
  assert.equal(molecularFormula(store.getState().molecule), "H4N");
  store.getState().undo();
  assert.equal(molecularFormula(store.getState().molecule), "H3N");
});
