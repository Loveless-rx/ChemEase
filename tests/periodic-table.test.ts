import test from "node:test";
import assert from "node:assert/strict";
import { PERIODIC_ELEMENTS, findElements, periodicNeighbor } from "../src/utils/periodicTable";
import { ELEMENTS } from "../src/utils/elementData";
import { atomLabel } from "../src/engine/rendering";
import { moleculeSvg } from "../src/engine/export";
import { molecularWeight } from "../src/engine/molecularWeight";
import { template } from "../src/engine/templates";
import { emptyMolecule } from "../src/models/Molecule";
import { useUIStore } from "../src/store/chemUIStore";
import { useMoleculeStore } from "../src/store/moleculeStore";
import { useHistoryStore } from "../src/store/historyStore";
test("periodic table has 118 unique elements and non-overlapping positions", () => {
  assert.equal(PERIODIC_ELEMENTS.length,118);
  assert.equal(new Set(PERIODIC_ELEMENTS.map(e => e.symbol)).size,118);
  assert.equal(new Set(PERIODIC_ELEMENTS.map(e => `${e.row}:${e.column}`)).size,118);
  assert.deepEqual(PERIODIC_ELEMENTS.map(e => e.number),Array.from({length:118},(_,i)=>i+1));
  for (const e of PERIODIC_ELEMENTS) {
    assert.ok(e.column>=1 && e.column<=18);
    assert.equal(ELEMENTS[e.symbol].number,e.number);
    assert.ok(e.standardWeight === null || e.standardWeight>0);
  }
  const helium=PERIODIC_ELEMENTS[1],carbon=PERIODIC_ELEMENTS[5],lanthanum=PERIODIC_ELEMENTS[56],actinium=PERIODIC_ELEMENTS[88];
  assert.deepEqual([helium.row,helium.column],[1,18]);
  assert.deepEqual([carbon.row,carbon.column],[2,14]);
  assert.deepEqual([lanthanum.row,lanthanum.column],[9,3]);
  assert.deepEqual([actinium.row,actinium.column],[10,3]);
});
test("periodic search finds names, symbols, atomic numbers and alternate spellings", () => {
  assert.equal(findElements(" 26 ")[0].symbol,"Fe");
  assert.equal(findElements("iron")[0].symbol,"Fe");
  assert.equal(findElements("fe")[0].symbol,"Fe");
  assert.equal(findElements("aluminium")[0].symbol,"Al");
  assert.equal(findElements("caesium")[0].symbol,"Cs");
  assert.equal(findElements("118")[0].symbol,"Og");
  assert.equal(findElements("not-an-element").length,0);
});
test("arrow-key navigation follows table rows and groups", () => {
  assert.equal(periodicNeighbor(1,"ArrowRight"),2);
  assert.equal(periodicNeighbor(6,"ArrowDown"),14);
  assert.equal(periodicNeighbor(9,"ArrowDown"),17);
  assert.equal(periodicNeighbor(6,"Home"),3);
  assert.equal(periodicNeighbor(6,"End"),10);
  assert.equal(periodicNeighbor(1,"ArrowLeft"),1);
});
test("new elements place into the editor without automatic hydrogens or invented standard masses", () => {
  useMoleculeStore.getState().replace(emptyMolecule());
  useMoleculeStore.getState().addAtom(0,0,"Au");
  const gold=useMoleculeStore.getState().molecule;
  assert.equal(gold.atoms[0].element,"Au");
  assert.ok(Math.abs(molecularWeight(gold)!-196.96657)<0.001);
  useMoleculeStore.getState().patchAtom(gold.atoms[0].id,{element:"Og"});
  assert.equal(molecularWeight(useMoleculeStore.getState().molecule),null);
  assert.equal(ELEMENTS.Se.implicit,false);
  assert.equal(ELEMENTS.C.weight,12.011);
});
test("carbon visibility is a drawing option; essential heteroatom, isotope and charge labels remain visible", () => {
  const carbon=template("benzene").atoms[0];
  assert.equal(atomLabel(carbon,2,false),false);
  assert.equal(atomLabel(carbon,2,true),true);
  assert.equal(atomLabel({...carbon,element:"O"},2,false),true);
  assert.equal(atomLabel({...carbon,isotope:13},2,false),true);
  assert.equal(atomLabel({...carbon,charge:1},2,false),true);
  assert.equal(atomLabel(carbon,0,false),true);
});
test("SVG exports follow the same carbon and hydrogen visibility settings", () => {
  const benzene=template("benzene");
  const skeletal=moleculeSvg(benzene,{showCarbons:false,showHydrogens:false});
  const labelled=moleculeSvg(benzene,{showCarbons:true,showHydrogens:false});
  assert.equal((skeletal.match(/>C<\/text>/g)||[]).length,0);
  assert.equal((labelled.match(/>C<\/text>/g)||[]).length,6);
  const withH=moleculeSvg(benzene,{showCarbons:true,showHydrogens:true});
  assert.equal((withH.match(/>H<\/text>/g)||[]).length,6);
});
test("label toggles persist preferences without changing the molecule or undo history", () => {
  const descriptor=Object.getOwnPropertyDescriptor(globalThis,"localStorage");
  const values=new Map<string,string>();
  Object.defineProperty(globalThis,"localStorage",{configurable:true,value:{getItem:(key:string)=>values.get(key)??null,setItem:(key:string,value:string)=>values.set(key,value)}});
  const previous={showCarbons:useUIStore.getState().showCarbons,showHydrogens:useUIStore.getState().showHydrogens};
  try {
    const molecule=useMoleculeStore.getState().molecule, history=useHistoryStore.getState().past.length;
    useUIStore.getState().set({showCarbons:true,showHydrogens:false});
    assert.equal(values.get("chemease.showCarbons"),"true");
    assert.equal(values.get("chemease.showHydrogens"),"false");
    assert.equal(useMoleculeStore.getState().molecule,molecule);
    assert.equal(useHistoryStore.getState().past.length,history);
  } finally {
    useUIStore.getState().set(previous);
    if(descriptor) Object.defineProperty(globalThis,"localStorage",descriptor);
    else Reflect.deleteProperty(globalThis,"localStorage");
  }
});
