import type {WorkspaceData} from "../workspace/types";
import {moleculeSvg} from "../../engine/export";
import {reportSections,reportChart,reportLimitationsFor,reportReferencesFor,type SavedReport} from "./model";
import {ReportDocument,reportCanvas,renderDocument,type DocumentDraw,type MeasureText} from "../exports/document";
export type ReportDraw=DocumentDraw;
export function layoutReport(data:WorkspaceData,report:SavedReport,measure:MeasureText):ReportDraw[][]{
 const sections=reportSections(data,report),doc=new ReportDocument(measure);
 doc.cover(report.title,"Research report",[["Report ID",report.id],["Recorded",report.createdAt],["Method",report.method],["Structures",String(sections.length)]],"A structured record of saved molecules, calculated properties, screening outcomes and selected predictions. Each finding remains linked to its original saved version.");
 if(report.notes){if(report.notes.length>650)doc.heading("Study notes",true);else doc.paragraph("Study notes",15,true,"#7655ad");doc.paragraph(report.notes);}
 for(const section of sections){
  doc.heading(section.heading,true);doc.image(moleculeSvg(section.column!.version.graph,{branded:true}),215);
  let group="Structure identity and source records",rows:[string,string][]=[];
  const flush=()=>{if(rows.length){doc.room(100);doc.paragraph(group,15,true,"#7655ad");doc.table(["Property / record","Recorded value"],rows,[.35,.65]);rows=[];}};
  for(const row of section.rows){
   const [label]=row;
   const next=label.startsWith("Molecular weight")?"Physicochemical properties":label==="Screening source / method"?"Drug-likeness screening":label==="Alert source / method"?"Structural alerts":label==="Solubility result / model"?"Aqueous solubility prediction":label==="Skin result / model"?"Skin permeability prediction":label==="hERG prediction source"?"hERG blocker-class prediction":label==="Hepatic prediction source"?"Hepatic clearance prediction":group;
   if(next!==group){flush();group=next;}
   const display=/^-?\d+\.\d+(e[+-]?\d+)?$/i.test(row[1])&&Number.isFinite(Number(row[1]))?String(Number(Number(row[1]).toPrecision(9))):row[1];
   rows.push([label,display]);
  }flush();
 }
 const chart=reportChart(data,report);if(chart){doc.heading("Molecule comparison",true);doc.paragraph("Compare recorded descriptors across the selected saved structures. Numbered points follow the molecule order in this report; overlapping points retain their exact coordinates.");const h=Number(chart.svg.match(/height="([\d.]+)"/)?.[1]??600);doc.image(chart.svg,Math.min(720,678*h/720));}
 doc.heading("Methods and interpretation",true);doc.paragraph("This document uses frozen saved-result references. No chemistry is recalculated during export. Standalone decimal values are displayed to at most nine significant figures. The accompanying CSV retains searchable text and full numeric precision.");doc.paragraph(reportLimitationsFor(report));
 doc.heading("References and method sources",true);reportReferencesFor(report).forEach((r,i)=>doc.paragraph(`[${i+1}] ${r}`,12));
 doc.contents();return doc.pages;
}
export async function researchReportPdf(data:WorkspaceData,report:SavedReport){const {canvas,measure}=reportCanvas();return renderDocument(layoutReport(data,report,measure),report.title,"Research report",report.id,canvas);}
