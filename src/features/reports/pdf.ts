import { jsPDF } from "jspdf";
import type { WorkspaceData } from "../workspace/types";
import { moleculeSvg } from "../../engine/export";
import { reportSections, reportChart, reportLimitationsFor, reportReferencesFor, type SavedReport } from "./model";
export type ReportDraw={kind:"text";text:string;x:number;y:number;size:number;bold:boolean}|{kind:"image";svg:string;x:number;y:number;width:number;height:number};
export function layoutReport(data:WorkspaceData,report:SavedReport,measure:(text:string,size:number,bold:boolean)=>number):ReportDraw[][] {
  const pages:ReportDraw[][]=[[]];let y=115;
  const page=()=>{if(pages.length>=200)throw new Error("This PDF exceeds 200 pages. Choose fewer structures.");pages.push([]);y=115;};
  const room=(height:number)=>{if(y+height>1030)page();};
  const line=(text:string,size=12,bold=false)=>{room(size*1.6);pages.at(-1)!.push({kind:"text",text,x:65,y,size,bold});y+=size*1.6;};
  const paragraph=(text:string,size=12,bold=false)=>{
    for(const raw of text.split(/\r?\n/)){
      let current="";
      for(const char of Array.from(raw)){if(current&&measure(current+char,size,bold)>660){line(current,size,bold);current="";}current+=char;}
      line(current,size,bold);
    }y+=7;
  };
  const image=(svg:string,height:number)=>{room(height+15);pages.at(-1)!.push({kind:"image",svg,x:65,y,width:660,height});y+=height+15;};
  paragraph(report.title,25,true);paragraph(`Report ${report.id} · ${report.method} · ${report.createdAt}`,10);if(report.notes)paragraph(report.notes);
  paragraph("Recorded research results",16,true);paragraph("This report uses frozen saved-result references. No chemistry is recalculated. CSV provides searchable text and full numeric precision; this PDF preserves the visual report as high-resolution pages.");
  for(const section of reportSections(data,report)){
    page();paragraph(section.heading,20,true);image(moleculeSvg(section.column!.version.graph),210);
    for(const [label,value] of section.rows){room(55);paragraph(label,11,true);paragraph(value,12);}
  }
  const chart=reportChart(data,report);if(chart){page();paragraph("Molecule comparison",20,true);const svgHeight=Number(chart.svg.match(/height="(\d+)"/)?.[1]??600);image(chart.svg,660*svgHeight/720);}
  page();paragraph("Methods and interpretation",20,true);paragraph(reportLimitationsFor(report));for(const reference of reportReferencesFor(report))paragraph(reference,11);
  for(let i=0;i<pages.length;i++){pages[i].unshift({kind:"text",text:"CHEMEASE / RESEARCH REPORT",x:65,y:53,size:12,bold:true});pages[i].push({kind:"text",text:`Recorded results · ${i+1} / ${pages.length}`,x:65,y:1080,size:10,bold:false});}
  return pages;
}
async function imageFromSvg(svg:string) {
  const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml"}));
  try{return await new Promise<HTMLImageElement>((resolve,reject)=>{const img=new Image();const timer=setTimeout(()=>reject(new Error("Report image timed out. Please retry.")),15000);img.onload=()=>{clearTimeout(timer);resolve(img);};img.onerror=()=>{clearTimeout(timer);reject(new Error("A report structure or chart could not be rendered."));};img.src=url;});}finally{URL.revokeObjectURL(url);}
}
export async function researchReportPdf(data:WorkspaceData,report:SavedReport) {
  // Canvas uses the browser's Unicode fonts; PDF pages retain the exact visible glyphs.
  const canvas=document.createElement("canvas");canvas.width=794*2;canvas.height=1123*2;const ctx=canvas.getContext("2d");if(!ctx)throw new Error("This browser cannot render PDF report pages.");
  const font=(size:number,bold:boolean)=>`${bold?600:400} ${size}px Arial, sans-serif`;
  const pages=layoutReport(data,report,(text,size,bold)=>{ctx.font=font(size,bold);return ctx.measureText(text).width;});
  const pdf=new jsPDF({format:"a4",unit:"mm",compress:true});pdf.setProperties({title:report.title,subject:`${report.method}; report ${report.id}; source versions ${report.refs.map(r=>r.versionId).join(", ")}`,creator:"ChemEase",author:""});
  for(let i=0;i<pages.length;i++){
    ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle="#fffefa";ctx.fillRect(0,0,794,1123);
    ctx.strokeStyle="#ded8e7";ctx.beginPath();ctx.moveTo(65,76);ctx.lineTo(729,76);ctx.stroke();
    for(const op of pages[i]){if(op.kind==="text"){ctx.fillStyle=op.bold?"#7655ad":"#302a39";ctx.font=font(op.size,op.bold);ctx.textBaseline="alphabetic";ctx.fillText(op.text,op.x,op.y);}else{const img=await imageFromSvg(op.svg),scale=Math.min(op.width/img.naturalWidth,op.height/img.naturalHeight),w=img.naturalWidth*scale,h=img.naturalHeight*scale;ctx.drawImage(img,op.x+(op.width-w)/2,op.y+(op.height-h)/2,w,h);}}
    if(i)pdf.addPage();pdf.addImage(canvas.toDataURL("image/png"),"PNG",0,0,210,297,undefined,"FAST");await new Promise(resolve=>setTimeout(resolve,0));
  }
  canvas.width=canvas.height=0;return pdf.output("blob");
}
