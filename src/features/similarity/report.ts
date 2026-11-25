import { ReportDocument, reportCanvas, renderDocument, type MeasureText } from '../exports/document';
import { fingerprintSettings, similarityLimits, validateSimilaritySearch, type SimilaritySearch } from './model';
export function similarityCsv(result:SimilaritySearch){
 validateSimilaritySearch(result);
 const row=(values:unknown[])=>values.map(v=>`"${String(v).replace(/^\s*[=+@-]/,"'$&").replaceAll('"','""')}"`).join(',');
 return [row(['ChemEase molecular similarity report',result.id]),row(['Query',result.query.canonical]),row(['Query name',result.query.name]),row(['Query saved version',result.query.versionId??'Draft / imported']),row(['Method',result.method]),row(['Engine',result.engine]),row(['Fingerprint settings',JSON.stringify(fingerprintSettings)]),row(['Database',result.databaseLabel]),row(['Retrieved',result.createdAt]),row(['PubChem retrieval threshold',result.retrievalThreshold??'Not applicable']),row(['Local Tanimoto threshold',result.settings.threshold]),row(['Result limit',result.settings.limit]),row(['Exclude identical canonical structures',result.settings.excludeIdentical]),row(['Candidates / valid / duplicates / matches',`${result.candidateCount} / ${result.validCount} / ${result.duplicateCount} / ${result.matchedCount}`]),row(['Interpretation',similarityLimits]),row(['Rank','Compound','Canonical SMILES','Tanimoto','Shared bits','Union bits','Molecular weight (g/mol)','Saved version','PubChem CID','Same canonical structure']),...result.hits.map((h,i)=>row([i+1,h.name,h.canonical,h.score,h.sharedBits,h.unionBits,h.weight,h.versionId??'',h.cid??'',h.identical])),...result.skipped.map(s=>row(['Skipped candidate',s.name,s.reason]))].join('\r\n');
}
export function layoutSimilarityReport(r:SimilaritySearch,measure:MeasureText,figures:Record<string,string>={}){
 validateSimilaritySearch(r);const doc=new ReportDocument(measure,30);
 doc.cover(`Similarity search: ${r.query.name}`,'Molecular similarity report', [['Search ID',r.id],['Created',r.createdAt],['Database',r.databaseLabel],['Engine',r.engine]],'An exact snapshot of the query, fingerprint method, search settings and ranked candidate structures.');
 doc.heading('Query and search protocol',true);
 doc.table(['Record','Recorded value'],[['Query name',r.query.name],['Canonical query SMILES',r.query.canonical],['Saved query version',r.query.versionId??'Draft / imported'],['Method',`${r.method}: Morgan radius 2, 2,048 bits; Tanimoto; chirality off`],['Chemical state','Supplied charge, salts and tautomers retained; no pH adjustment'],['Local minimum Tanimoto',String(r.settings.threshold)],['Maximum reported hits',String(r.settings.limit)],['Exclude same canonical structures',String(r.settings.excludeIdentical)],['PubChem candidate threshold',r.retrievalThreshold===undefined?'Not applicable':`${r.retrievalThreshold}% using PubChem retrieval fingerprints; not the Morgan score`],['Candidates / valid / duplicates / matches',`${r.candidateCount} / ${r.validCount} / ${r.duplicateCount} / ${r.matchedCount}`]],[.32,.68]);
 doc.paragraph('Tanimoto = shared on-bits / on-bits in either fingerprint. A value of 0 means no shared bits; 1 means identical bit patterns, which can also arise from collisions or ignored stereochemistry.');
 if(figures.query){doc.room(210);doc.current.push({kind:'image',svg:figures.query,x:58,y:doc.y,width:678,height:190});doc.y+=210;}
 doc.heading('Ranked matches',true);
 if(!r.hits.length)doc.paragraph('No matches met the recorded settings in the searched collection.');
 else doc.table(['Rank / compound','Tanimoto','Shared / union bits','MW (g/mol)'],r.hits.map((h,i)=>[`${i+1}. ${h.name}`,h.score.toFixed(6),`${h.sharedBits} / ${h.unionBits}`,h.weight.toFixed(3)]),[.42,.18,.22,.18]);
 doc.heading('Structure identities and provenance',true);
 for(const [i,h] of r.hits.entries()){doc.room(figures[h.id]?270:95);doc.paragraph(`${i+1}. ${h.name}`,14,true);if(figures[h.id]){doc.current.push({kind:'image',svg:figures[h.id],x:58,y:doc.y,width:678,height:160});doc.y+=175;}doc.paragraph(h.canonical,11);doc.paragraph(`Source: ${h.cid?`https://pubchem.ncbi.nlm.nih.gov/compound/${h.cid}`:h.versionId?`Saved version ${h.versionId}`:r.databaseLabel}. Same canonical query structure: ${h.identical}.`,11);}
 if(r.skipped.length){doc.heading('Excluded invalid structures',true);doc.table(['Candidate','Reason'],r.skipped.map(s=>[s.name,s.reason]),[.3,.7]);}
 doc.heading('Interpretation and sources',true);doc.paragraph(similarityLimits);doc.paragraph('Morgan fingerprint reference: https://www.rdkit.org/docs/GettingStartedInPython.html#morgan-fingerprints-circular-fingerprints');doc.paragraph('Live candidate retrieval: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest');doc.paragraph('This report freezes recorded results. Editing a drawing or library later does not rerun or change this search.');doc.contents();return doc.pages;
}
export async function similarityPdf(result:SimilaritySearch){
 validateSimilaritySearch(result);
 const {loadRDKit}=await import('../../engine/rdkit'),rdkit=await loadRDKit(),figures:Record<string,string>={};
 for(const [key,smiles] of [['query',result.query.canonical],...result.hits.slice(0,6).map(h=>[h.id,h.canonical])]){
  const mol=rdkit.get_mol(smiles);if(!mol)throw new Error('A recorded structure could not be rendered for the PDF.');
  try{mol.set_new_coords();figures[key]=mol.get_svg(600,200);}finally{mol.delete();}
 }
 const {canvas,measure}=reportCanvas();return renderDocument(layoutSimilarityReport(result,measure,figures),`Similarity search: ${result.query.name}`,'Molecular similarity',result.id,canvas);
}
