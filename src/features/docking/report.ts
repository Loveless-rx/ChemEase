import type {DockingResult} from "./types";
import {validateDockingResult,dockingAdvisory} from "./model";
import {ReportDocument,reportCanvas,renderDocument,type MeasureText} from "../exports/document";
const value=(v:unknown)=>typeof v==="string"?v:JSON.stringify(v,null,2)??"Not recorded";
export function layoutDockingReport(r:DockingResult,measure:MeasureText){
 validateDockingResult(r);const doc=new ReportDocument(measure,80);
 const fields=(rows:[string,unknown][])=>doc.table(["Record / parameter","Recorded value"],rows.map(([k,v])=>[k,value(v)]),[.32,.68]);
 doc.cover(`Docking study: ${r.ligand.name}`,"Molecular docking report",[["Run ID",r.jobId],["Completed",r.completedAt],["Receptor",r.receptor.name],["Engine",r.engineVersion]],"Prepared inputs, ranked poses and geometric contacts in one reproducible research record. Docking scores are model outputs, not measured binding affinities.");
 doc.heading("Study overview and key results",true);
 fields([["Ligand",r.ligand.name],["Receptor",r.receptor.name],["Returned poses",r.poses.length],[r.engine==="vina"?"Top-ranked Vina score (kcal/mol)":"Top-ranked AD4 energy (kcal/mol)",r.poses[0].affinity],["Execution",r.execution?.kind??"Native engine / legacy snapshot"]]);
 doc.paragraph(r.limitations);if(dockingAdvisory(r))doc.paragraph(dockingAdvisory(r)!,13,true);
 doc.heading("Protein and ligand preparation",true);
 fields([["Ligand input source",{kind:r.ligand.source?.kind,name:r.ligand.source?.name,versionId:r.ligand.source?.versionId,inputContentSha256:r.ligand.sourceHash}],["Prepared ligand SMILES",r.ligand.smiles],["Protonation / charge / conformer",{ph:r.ligand.ph,protonationPolicy:r.ligand.protonation??"Not recorded in this older run",charge:r.ligand.charge,MMFF94sEnergy:r.ligand.conformerEnergy}],["Ligand preparation warnings",r.ligand.warnings],["Receptor preparation",r.receptor.settings],["Receptor preparation warnings",r.receptor.warnings]]);
 if(r.execution?.kind==="browser-wasm")doc.paragraph("Vina charge interpretation: the SDF formal charge/protonation state is retained separately. Standard Vina scoring uses atom types and ignores user-supplied PDBQT partial charges. Raw Open Babel charge columns are not validated for AD4 or electrostatic calculations; reprepare for those methods.");
 doc.heading("Binding site and search protocol",true);fields([["Exact grid and search configuration",r.settings],["Tool versions",r.tools],["Execution provider",r.execution??"Native engine / legacy snapshot"]]);if(r.protocol)fields([["AutoDock 4 / AutoGrid protocol",r.protocol]]);
 doc.heading("Ranked docking poses",true);
 doc.table(r.engine==="vina"?["Rank","Vina score (kcal/mol)","RMSD lower / upper (Å)","Contacts"]:["Rank","AD4 energy (kcal/mol)","LGA run / cluster","Contacts"],r.poses.map(p=>[String(p.rank),String(p.affinity),r.engine==="vina"?`${p.rmsdLower} / ${p.rmsdUpper}`:`${p.sourceRun} / ${p.cluster}`,`${p.contacts.length}${p.truncated?"+":""}`]),[.10,.29,.43,.18]);
 doc.paragraph(r.rmsdMethod);doc.paragraph("Mapped heavy-atom pose comparison (Å)",15,true);
 fields(r.mappedHeavyAtomRmsd.map((row,i)=>[`Pose ${i+1} vs. poses 1–${row.length}`,row.join(" | ")]));
 doc.heading("Protein–ligand interaction review",true);
 doc.paragraph("Contacts are geometric review candidates. They do not establish experimentally validated hydrogen bonds or binding mechanisms.");
 for(const p of r.poses){doc.room(110);doc.paragraph(`Pose ${p.rank} / geometric interaction review`,16,true);doc.paragraph(p.method,12);if(p.truncated)doc.paragraph("Contacts were truncated at 2,000 entries; review raw coordinates.");if(p.contacts.length>200)doc.paragraph("This PDF lists the first 200 contacts for this pose. Complete contacts remain in CSV/ZIP.");
  if(p.contacts.length)doc.table(["Contact type","Protein residue / atom","Ligand atom","Distance (Å)","Angle (°)"],p.contacts.slice(0,200).map(c=>[c.type,`${c.residue} ${c.receptorAtom}`,String(c.ligandAtom),String(c.distance),c.angle===null?"Not recorded":String(c.angle)]),[.25,.27,.14,.17,.17]);else doc.paragraph("No contacts matched the recorded geometry rules. This does not establish an absence of binding.");
 }
 doc.heading("Artifact records and reproducibility",true);fields([["Engine executable / WebAssembly SHA-256",r.engineBinarySha256??"Not recorded in this older run"],["Receptor artifact hashes",r.receptor.files],["Ligand artifact hashes",r.ligand.files]]);
 doc.heading("Research limits and method sources",true);doc.paragraph(r.limitations);
 for(const reference of ["AutoDock 4: https://doi.org/10.1002/jcc.21256","AutoDock Vina: https://doi.org/10.1002/jcc.21334 and https://doi.org/10.1021/acs.jcim.1c00203","Preparation (provider-specific): browser Open Babel/Reduce https://openbabel.org and https://github.com/rlabduke/reduce ; native https://meeko.readthedocs.io and https://github.com/openmm/pdbfixer","Protonation: the selected rule-based or supplied-state policy is recorded in this report. Interaction geometry is defined by the recorded method for each pose; assignments are not PLIP or experimentally validated interactions.","Source snapshots record provenance, not independent certification. Raw coordinates and logs belong to the execution archive and are not embedded in browser workspace backups."])doc.paragraph(reference,12);
 doc.contents();return doc.pages;
}
export async function dockingPdf(r:DockingResult){const {canvas,measure}=reportCanvas();return renderDocument(layoutDockingReport(r,measure),`Docking research report: ${r.ligand.name}`,"Molecular docking",r.jobId,canvas);}
