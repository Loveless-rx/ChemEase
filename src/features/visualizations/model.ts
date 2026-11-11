import type { ToolkitResult } from "../../engine/toolkit";
import type { SavedDescriptorAnalysis, MoleculeVersion } from "../workspace/types";

export const plotProperties={
  logP:{label:"LogP · Wildman–Crippen",unit:"",min:-3,max:6,reference:5},
  tpsa:{label:"TPSA",unit:"Å²",min:0,max:160,reference:140},
  weight:{label:"Molecular weight",unit:"g/mol",min:0,max:600,reference:500},
  donors:{label:"Hydrogen bond donors",unit:"",min:0,max:8,reference:5},
  acceptors:{label:"Hydrogen bond acceptors",unit:"",min:0,max:15,reference:10},
  rotatable:{label:"Rotatable bonds · strict",unit:"",min:0,max:15,reference:10},
  rings:{label:"Ring count · RDKit",unit:"",min:0,max:8,reference:null},
  molarRefractivity:{label:"Molar refractivity",unit:"cm³/mol",min:0,max:150,reference:null},
} as const;
export type PlotProperty=keyof typeof plotProperties;
const escape=(s:unknown)=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"})[c]!);
const display=(v:number)=>String(Number(v.toFixed(3)));
export function plotRange(property:PlotProperty,value:number):[number,number] {
  if(!Number.isFinite(value))throw new Error("The saved plot input is not a finite number.");
  const p=plotProperties[property],low=Math.min(p.min,value),high=Math.max(p.max,value),padding=(high-low)*.08;
  return [low-padding,high+padding];
}
export function buildPropertyPlot(source:SavedDescriptorAnalysis,version:MoleculeVersion,x:PlotProperty,y:PlotProperty,showReferences:boolean) {
  if(source.versionId!==version.id||source.structureKey!==version.structureKey)throw new Error("The plot source does not match the saved molecule version.");
  if(!Object.hasOwn(plotProperties,x)||!Object.hasOwn(plotProperties,y))throw new Error("Choose a supported plot axis.");
  const d:ToolkitResult=source.descriptors,xValue=d[x],yValue=d[y],xr=plotRange(x,xValue),yr=plotRange(y,yValue);
  const px=(v:number)=>95+(v-xr[0])/(xr[1]-xr[0])*565,py=(v:number)=>355-(v-yr[0])/(yr[1]-yr[0])*260;
  let body="";
  for(let i=0;i<=4;i++){
    const xv=xr[0]+(xr[1]-xr[0])*i/4,yv=yr[0]+(yr[1]-yr[0])*i/4;
    body+=`<path d="M${px(xv)} 95V355 M95 ${py(yv)}H660" stroke="#e2dfd8" stroke-width="1"/><text x="${px(xv)}" y="376" text-anchor="middle" font-size="11">${display(xv)}</text><text x="82" y="${py(yv)+4}" text-anchor="end" font-size="11">${display(yv)}</text>`;
  }
  if(showReferences){const a=plotProperties[x].reference,b=plotProperties[y].reference;if(a!==null)body+=`<path d="M${px(a)} 95V355" stroke="#9c641c" stroke-dasharray="5 4"/><text x="${px(a)+5}" y="89" font-size="10">Reference ${a}</text>`;if(b!==null)body+=`<path d="M95 ${py(b)}H660" stroke="#9c641c" stroke-dasharray="5 4"/><text x="660" y="${py(b)-6}" text-anchor="end" font-size="10">Reference ${b}</text>`;}
  const point={x:px(xValue),y:py(yValue)};
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="470" viewBox="0 0 720 470"><title>${escape(version.graph.metadata.name)} version ${version.number}: ${escape(plotProperties[x].label)} versus ${escape(plotProperties[y].label)}</title><desc>Recorded inputs ${escape(xValue)}, ${escape(yValue)}. Source result ${escape(source.id)}. ${escape(source.engine)}. This is a descriptor plot, not an absorption or safety prediction.</desc><rect width="720" height="470" fill="#fffefa"/><g font-family="Arial,sans-serif" fill="#2d2b32"><text x="35" y="31" font-size="17" font-weight="bold">${escape(version.graph.metadata.name.slice(0,60))} · v${version.number}</text><text x="35" y="53" font-size="10">${escape(source.engine)} · saved ${escape(source.createdAt)}</text>${body}<path d="M95 95V355H660" fill="none" stroke="#77727d"/><path d="M95 ${point.y}H${point.x}V355" fill="none" stroke="#7655ad" stroke-dasharray="3 5"/><circle cx="${point.x}" cy="${point.y}" r="7" fill="#7655ad" stroke="#fffefa" stroke-width="2"><title>${escape(xValue)}, ${escape(yValue)}</title></circle><text x="377" y="411" text-anchor="middle" font-size="12">${escape(plotProperties[x].label)} ${escape(plotProperties[x].unit)}</text><text x="21" y="225" text-anchor="middle" font-size="12" transform="rotate(-90 21 225)">${escape(plotProperties[y].label)} ${escape(plotProperties[y].unit)}</text><text x="35" y="439" font-size="10">Dashed reference limits, when shown, are property heuristics; no GI/BBB classification is inferred.</text><text x="35" y="456" font-size="9">Result ${escape(source.id)} · Structure version ${escape(version.id)}</text></g></svg>`;
  return {svg,point,xRange:xr,yRange:yr,xValue,yValue};
}
