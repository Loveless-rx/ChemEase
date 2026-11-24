import test from "node:test";
import assert from "node:assert/strict";
import {ReportDocument,wrapText} from "../src/features/exports/document";
import {moleculeSvg} from "../src/engine/export";
import {template} from "../src/engine/templates";
import {brandPlotSvg} from "../src/features/exports/branding";
const measure=(s:string,size:number)=>Array.from(s).length*size*.6;
test("long export table cells paginate without losing records and repeat column headers",()=>{
 const doc=new ReportDocument(measure);const long="CCO".repeat(1800);
 doc.table(["Parameter","Value"],[["Canonical SMILES",long],["Final record","END-OF-DATA"]],[.3,.7]);
 assert.ok(doc.pages.length>=2);
 const texts=doc.pages.flat().filter(op=>op.kind==="text");
 assert.equal(texts.filter(op=>/^CCO|^OCC|^COC/.test(op.text)).map(op=>op.text).join(""),long);
 assert.ok(texts.some(op=>op.text==="END-OF-DATA"));
 for(const page of doc.pages){assert.ok(page.some(op=>op.kind==="text"&&op.text==="Parameter"));for(const op of page){assert.ok(op.y>=0&&op.y<=1017);if(op.kind==="rect")assert.ok(op.y+op.height<=1017);}}
});
test("contents references include the inserted guide page and retain section order",()=>{
 const doc=new ReportDocument(measure);doc.cover("Title","Report",[["ID","record"]],"Summary");doc.heading("First section",true);doc.paragraph("First result\n".repeat(14));doc.heading("Second section",true);doc.contents();
 const guide=doc.pages[1].filter(op=>op.kind==="text").map(op=>op.text);
 assert.ok(guide.indexOf("First section")<guide.indexOf("Second section"));assert.ok(guide.includes("3"));assert.ok(guide.includes("4"));
});
test("branded molecular images retain atom labels, bonds, highlights and escape user names",()=>{
 const graph=template("aspirin");graph.metadata.name='<script>alert("x")</script>';
 const raw=moleculeSvg(graph,{showCarbons:true}),svg=moleculeSvg(graph,{showCarbons:true,branded:true,highlightAtoms:[graph.atoms[0].id]});
 assert.match(svg,/ChemEase/);assert.match(svg,/loveless-rx.github.io/);assert.ok(!svg.includes('<script>'));assert.match(svg,/fill-opacity="0.07"/);
 assert.equal((raw.match(/<line /g)??[]).length,(svg.match(/<line /g)??[]).length);assert.match(svg,/<circle/);
});
test("figure branding expands the frame while preserving plot data coordinates",()=>{
 const result=brandPlotSvg('<svg width="720" height="470" viewBox="0 0 720 470"><circle cx="104.3" cy="210.8" r="7"/></svg>');
 assert.match(result,/height="542"/);assert.match(result,/viewBox="0 0 720 542"/);assert.match(result,/cx="104.3" cy="210.8"/);assert.match(result,/ChemEase/);
});
test("wrapping preserves Unicode and bounds unbroken identifiers",()=>{
 const lines=wrapText("研究 β " + "a".repeat(1000),200,12,false,measure);assert.ok(lines.join("").includes("研究 β"));for(const line of lines)assert.ok(measure(line,12)<=200);
});

