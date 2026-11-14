import type {MainModule} from "@rdkit/rdkit";
import {ligandCarbons,qtAtoms,sdfGraph} from "./chemistry";

/** Explicit chemical single-bond rules; aromatic C--N is not a carbonyl amide.
 * Rings, true amides/amidines and terminal heavy-atom bonds remain rigid.
 * Internal alkynes use one triple-bond axis instead of two adjacent singles.
 * This is a rigid-ring, acyclic-torsion protocol, not macrocycle sampling.
 */
export function ligandRotors(kit:MainModule,sdf:string):[number,number][]{
  const mol=kit.get_mol(sdf);if(!mol?.is_valid()){mol?.delete();throw Error("Cannot type ligand torsions.");}
  const matches=(smarts:string)=>{const query=kit.get_qmol(smarts);if(!query)throw Error("Invalid torsion SMARTS.");try{const result=JSON.parse(mol.get_substruct_matches(query)) as unknown;return Array.isArray(result)?result as {atoms:number[]}[]:[];}finally{query.delete();}};
  const key=(a:number,b:number)=>[a,b].sort((x,y)=>x-y).join(":");
  try{
    const rigid=new Set(matches("[NX3]-[CX3]=[O,N,S]").map(m=>key(m.atoms[0],m.atoms[1])));
    const result=new Map<string,[number,number]>();
    for(const {atoms:[a,b,c,d]} of matches("[*]-[*]#!@[*]-[*]")){
      rigid.add(key(a,b));rigid.add(key(c,d));result.set(key(b,c),[b+1,c+1]);
    }
    for(const m of matches("[*]-[*]#[*;D1]"))rigid.add(key(m.atoms[0],m.atoms[1]));
    for(const {atoms:[a,b]} of matches("[!#1;!D1]-!@[!#1;!D1]"))if(!rigid.has(key(a,b)))result.set(key(a,b),[a+1,b+1]);
    if(result.size>32)throw Error("Browser docking supports at most 32 acyclic ligand torsions.");
    return [...result.values()];
  }finally{mol.delete();}
}

/** Rebuild a Vina tree from preserved Open Babel atom records and RDKit bonds.
 * No reference coordinates enter this operation. Serial numbers are immutable.
 */
export function buildLigandTree(sdf:string,typedPdbqt:string,rotors:[number,number][]){
  ligandCarbons(sdf,typedPdbqt);
  const graph=sdfGraph(sdf),atoms=qtAtoms(typedPdbqt),byId=new Map(atoms.map(a=>[a.serial,a]));
  if(byId.size!==atoms.length)throw Error("Duplicate prepared atom indices.");
  const lines=new Map(typedPdbqt.split(/\r?\n/).filter(l=>/^(ATOM {2}|HETATM)/.test(l)).map(l=>[Number(l.slice(6,11)),l]));
  const key=(a:number,b:number)=>[a,b].sort((x,y)=>x-y).join(":");
  const cuts=new Set(rotors.map(([a,b])=>key(a,b)));
  for(const [a,b] of rotors)if(!graph.neighbors[a-1]?.includes(b-1))throw Error("Torsion endpoints are not bonded heavy atoms.");
  const component=new Map<number,number>(),groups:number[][]=[];
  function visit(serial:number,group:number){component.set(serial,group);groups[group].push(serial);for(const neighbor of graph.neighbors[serial-1]){const next=neighbor+1;if(!cuts.has(key(serial,next))&&!component.has(next))visit(next,group);}}
  for(let serial=1;serial<=graph.n;serial++)if(!component.has(serial)){groups.push([]);visit(serial,groups.length-1);}
  // Open Babel retains polar H. Attach each to its actual nearest donor, never
  // use serial adjacency to guess a hydrogen's bonded parent.
  for(const atom of atoms.filter(a=>a.serial>graph.n)){
    if(atom.type!=="HD")throw Error("Unexpected non-heavy PDBQT atom.");
    const donors=atoms.filter(a=>a.serial<=graph.n&&["N","NA","OA","O","S","SA"].includes(a.type)).map(a=>({a,d:Math.hypot(...a.xyz.map((v,i)=>v-atom.xyz[i]))})).filter(a=>a.d<=1.35).sort((a,b)=>a.d-b.d);
    if(!donors.length||donors[1]&&Math.abs(donors[1].d-donors[0].d)<.05)throw Error("Ambiguous polar-hydrogen connectivity.");
    const group=component.get(donors[0].a.serial)!;component.set(atom.serial,group);groups[group].push(atom.serial);
  }
  const edges=groups.map(()=>[] as {to:number;fromAtom:number;toAtom:number}[]);
  for(const [a,b] of rotors){const x=component.get(a)!,y=component.get(b)!;if(x===y)throw Error("A ring bond cannot be a ligand torsion.");edges[x].push({to:y,fromAtom:a,toAtom:b});edges[y].push({to:x,fromAtom:b,toAtom:a});}
  if(rotors.length!==groups.length-1)throw Error("Ligand torsion graph must be one tree.");
  const checked=new Set<number>();
  function checkTree(group:number,parent=-1){if(checked.has(group))throw Error("Cyclic torsion tree.");checked.add(group);for(const e of edges[group])if(e.to!==parent)checkTree(e.to,group);}
  checkTree(0);if(checked.size!==groups.length)throw Error("Disconnected torsion graph.");
  const heavyWeights=groups.map(g=>g.filter(serial=>serial<=graph.n).length);
  function weight(group:number,parent:number):number{return heavyWeights[group]+edges[group].filter(e=>e.to!==parent).reduce((n,e)=>n+weight(e.to,group),0);}
  // A balanced root avoids making a terminal ring the moving origin for nearly
  // the whole molecule. Hydrogens must not bias this heavy-atom choice.
  const cost=(group:number)=>Math.max(0,...edges[group].map(e=>weight(e.to,group)));
  const root=groups.reduce((best,_g,i)=>cost(i)<cost(best)?i:best,0),seen=new Set<number>(),written=new Set<number>();
  const output=["REMARK ChemEase graph-torsions-v2; preserved heavy-atom indices",`REMARK ${rotors.length} active nonterminal heavy-atom torsions`,"ROOT"];
  function emit(group:number,parent=-1,entry?:number){
    if(seen.has(group))throw Error("Cyclic torsion tree.");seen.add(group);
    const ordered=groups[group].slice().sort((a,b)=>a===entry?-1:b===entry?1:a-b);
    for(const serial of ordered){const line=lines.get(serial);if(!line||written.has(serial))throw Error("Incomplete ligand torsion tree.");output.push(line);written.add(serial);}
    if(parent===-1)output.push("ENDROOT");
    for(const e of edges[group])if(e.to!==parent){output.push(`BRANCH ${e.fromAtom.toString().padStart(3)} ${e.toAtom.toString().padStart(3)}`);emit(e.to,group,e.toAtom);output.push(`ENDBRANCH ${e.fromAtom.toString().padStart(3)} ${e.toAtom.toString().padStart(3)}`);}
  }
  emit(root);if(written.size!==atoms.length||seen.size!==groups.length)throw Error("Ligand tree lost atoms or components.");
  output.push(`TORSDOF ${rotors.length}`);
  return output.join("\n")+"\n";
}
