import {exportIdentity} from "../account/access";
import {logoMarkData} from "./logoAsset";
import {jsPDF} from "jspdf";
import {exportBrand as B} from "./branding";

export type DocumentDraw=
 |{kind:"text";text:string;x:number;y:number;size:number;bold:boolean;color?:string}
 |{kind:"rect";x:number;y:number;width:number;height:number;fill:string}
 |{kind:"image";svg:string;x:number;y:number;width:number;height:number};
export type MeasureText=(text:string,size:number,bold:boolean)=>number;
const LEFT=58,WIDTH=678,TOP=119,BOTTOM=1017;
export function wrapText(text:string,width:number,size:number,bold:boolean,measure:MeasureText):string[]{
 const lines:string[]=[];
 for(const raw of text.split(/\r?\n/)){
  let line="";
  for(const word of raw.split(/(\s+)/u)){
   if(!word)continue;
   if(line&&measure(line+word,size,bold)>width){lines.push(line.trimEnd());line="";}
   if(!line&&/^\s+$/u.test(word))continue;
   for(const char of Array.from(word)){
    if(line&&measure(line+char,size,bold)>width){lines.push(line);line="";}
    line+=char;
   }
  }
  if(line||!raw)lines.push(line.trimEnd());
 }
 return lines;
}
/** Pure layout shared by both report modules; tables paginate with repeated headings. */
export class ReportDocument {
 pages:DocumentDraw[][]=[[]]; y=TOP;
 sections:{title:string;page:number}[]=[];
 readonly measure:MeasureText;readonly limit:number;
 constructor(measure:MeasureText,limit=200){this.measure=measure;this.limit=limit;}
 get current(){return this.pages[this.pages.length-1];}
 text(text:string,x:number,y:number,size=12,bold=false,color=B.ink){this.current.push({kind:"text",text,x,y,size,bold,color});}
 rect(x:number,y:number,width:number,height:number,fill:string){this.current.push({kind:"rect",x,y,width,height,fill});}
 page(){if(this.pages.length>=this.limit)throw new Error(`This report exceeds ${this.limit} pages. Export CSV/ZIP for the full data.`);this.pages.push([]);this.y=TOP;}
 room(height:number){if(this.y+height>BOTTOM)this.page();}
 paragraph(value:string,size=13,bold=false,color=B.ink){
  for(const line of wrapText(value,WIDTH,size,bold,this.measure)){this.room(size*1.55);this.text(line,LEFT,this.y+size,size,bold,color);this.y+=size*1.55;}this.y+=11;
 }
 heading(title:string,fresh=false){
  if(fresh&&(this.pages.length===1||this.y>TOP+260))this.page();
  const lines=wrapText(title,WIDTH-36,21,true,this.measure);this.room(lines.length*30+46);
  this.sections.push({title,page:this.pages.length});this.text(String(this.sections.length).padStart(2,"0"),LEFT,this.y+20,12,true,B.purple);
  lines.forEach((line,i)=>this.text(line,LEFT+36,this.y+22+i*30,21,true));this.y+=lines.length*30+13;this.rect(LEFT,this.y,WIDTH,2,B.line);this.y+=22;
 }
 image(svg:string,height=222){this.room(height+24);this.current.push({kind:"image",svg,x:LEFT,y:this.y,width:WIDTH,height});this.y+=height+24;}
 table(headers:string[],rows:string[][],fractions:number[]){
  const widths=fractions.map(f=>WIDTH*f),size=12,lineHeight=18;
  const header=()=>{
   const lines=headers.map((h,i)=>wrapText(h,widths[i]-20,size,true,this.measure)),h=Math.max(...lines.map(l=>l.length))*lineHeight+20;
   this.room(h+38);this.rect(LEFT,this.y,WIDTH,h,B.purple);let x=LEFT;
   lines.forEach((ls,i)=>{ls.forEach((l,j)=>this.text(l,x+10,this.y+17+j*lineHeight,size,true,"#ffffff"));x+=widths[i];});this.y+=h;
  };
  header();
  rows.forEach((row,index)=>{
   const cells=headers.map((_,i)=>wrapText(row[i]??"",widths[i]-20,size,i===0,this.measure));
   let offset=0;const total=Math.max(...cells.map(c=>c.length));
   while(offset<total){
    if(this.y+38>BOTTOM){this.page();header();}
    const count=Math.min(total-offset,Math.floor((BOTTOM-this.y-20)/lineHeight));
    if(count<1){this.page();header();continue;}
    const h=count*lineHeight+20;this.rect(LEFT,this.y,WIDTH,h,index%2?B.pale:"#faf8fc");let x=LEFT;
    cells.forEach((ls,i)=>{ls.slice(offset,offset+count).forEach((l,j)=>this.text(l,x+10,this.y+17+j*lineHeight,size,i===0));x+=widths[i];});
    this.rect(LEFT,this.y+h-1,WIDTH,1,B.line);this.y+=h;offset+=count;
    if(offset<total){this.page();header();}
   }
  });this.y+=22;
 }
 field(label:string,value:unknown){const text=typeof value==="string"?value:JSON.stringify(value,null,2)??"Not recorded";this.table(["Record","Recorded value"],[[label,text]],[.29,.71]);}
 cover(title:string,subtitle:string,metadata:[string,string][],summary:string){
  this.rect(0,106,794,285,"#20182e");
  this.text(subtitle.toUpperCase(),LEFT,148,12,true,"#c5aaec");
  const lines=wrapText(title,WIDTH,32,true,this.measure);let top=187;
  // Titles are bounded by module validation; smaller type handles long research titles.
  const size=lines.length>4?26:32;
  for(const line of wrapText(title,WIDTH,size,true,this.measure)){this.text(line,LEFT,top,size,true,"#ffffff");top+=size*1.4;}
  this.text("STRUCTURES  /  METHODS  /  RECORDED EVIDENCE",LEFT,365,11,true,"#c5aaec");
  this.y=427;this.paragraph(summary,15);this.table(["Report record","Details"],metadata,[.26,.74]);
 }
 contents(){
  const guides:DocumentDraw[][]=[[]],refs:{op:Extract<DocumentDraw,{kind:"text"}>;page:number}[]=[];const measure=this.measure;
  let y=TOP;const add=(text:string,x:number,yy:number,size:number,bold:boolean,color=B.ink)=>{const op:Extract<DocumentDraw,{kind:"text"}>={kind:"text",text,x,y:yy,size,bold,color};guides.at(-1)!.push(op);return op;};
  const start=()=>{add(guides.length===1?"Report guide":"Report guide / continued",LEFT,y+23,24,true);y+=65;};start();
  const room=(height:number)=>{if(y+height>BOTTOM){guides.push([]);y=TOP;start();}};
  for(const [i,s] of this.sections.entries()){
   const lines=wrapText(s.title,WIDTH-95,14,true,measure);
   const height=Math.max(48,lines.length*21+20);room(height);
   for(const [j,line] of lines.entries())add(line,LEFT+37,y+18+j*21,14,true);
   add(String(i+1).padStart(2,"0"),LEFT,y+18,12,true,B.purple);refs.push({op:add("",WIDTH+LEFT-23,y+18,13,true,B.purple),page:s.page});y+=height;
  }
  room(145);add("Reading this report",LEFT,y+29,15,true,B.purple);
  wrapText("Read the structure and result summaries first. Methods, source records and limitations follow the findings. Missing values remain marked as not calculated; values are never replaced with zero.",WIDTH,13,false,measure).forEach((l,i)=>add(l,LEFT,y+59+i*21,13,false));
  if(this.pages.length+guides.length>this.limit)throw new Error(`This report exceeds ${this.limit} pages. Export CSV/ZIP for the full data.`);
  refs.forEach(({op,page})=>{op.text=String(page===1?1:page+guides.length);});this.pages.splice(1,0,...guides);
 }
}
export function canvasMeasure(ctx:CanvasRenderingContext2D):MeasureText{return(text,size,bold)=>{ctx.font=`${bold?600:400} ${size}px Arial,sans-serif`;return ctx.measureText(text).width;};}
async function svgImage(svg:string){const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml"}));try{return await new Promise<HTMLImageElement>((resolve,reject)=>{const img=new Image(),timer=setTimeout(()=>reject(new Error("Report image timed out. Please retry.")),15000);img.onload=()=>{clearTimeout(timer);resolve(img);};img.onerror=()=>{clearTimeout(timer);reject(new Error("A report figure could not be rendered."));};img.src=url;});}finally{URL.revokeObjectURL(url);}}
export async function renderDocument(pages:DocumentDraw[][],title:string,category:string,id:string,canvas:HTMLCanvasElement){
 const attribution=exportIdentity();
 const ctx=canvas.getContext("2d");if(!ctx)throw new Error("PDF rendering is unavailable.");
 const pdf=new jsPDF({format:"a4",unit:"mm",compress:true});pdf.setProperties({title,subject:`${category}; record ${id}`,author:attribution?`ChemEase / ${attribution}`:"ChemEase",creator:"ChemEase Studio"});
 const brandImage=await svgImage(`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="52"><image href="${logoMarkData}" width="60" height="52"/></svg>`);
 for(let i=0;i<pages.length;i++){
  ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle="#ffffff";ctx.fillRect(0,0,794,1123);
  ctx.drawImage(brandImage,54,32,36,32);
  ctx.fillStyle=B.ink;ctx.font="700 23px Arial,sans-serif";ctx.fillText("ChemEase",94,59);ctx.fillStyle=B.muted;ctx.font="10px Arial,sans-serif";ctx.textAlign="right";ctx.fillText(category.toUpperCase(),736,56);ctx.textAlign="left";
  ctx.fillStyle=B.line;ctx.fillRect(LEFT,83,WIDTH,1);
  for(const op of pages[i]){
   if(op.kind==="rect"){ctx.fillStyle=op.fill;ctx.fillRect(op.x,op.y,op.width,op.height);}
   else if(op.kind==="text"){ctx.fillStyle=op.color??B.ink;ctx.font=`${op.bold?600:400} ${op.size}px Arial,sans-serif`;ctx.fillText(op.text,op.x,op.y);}
   else{const img=await svgImage(op.svg),scale=Math.min(op.width/img.naturalWidth,op.height/img.naturalHeight),w=img.naturalWidth*scale,h=img.naturalHeight*scale;ctx.drawImage(img,op.x+(op.width-w)/2,op.y+(op.height-h)/2,w,h);}
  }
  ctx.save();ctx.translate(397,565);ctx.rotate(-Math.PI/6);ctx.globalAlpha=.035;ctx.fillStyle=B.purple;ctx.font="700 99px Arial,sans-serif";ctx.textAlign="center";ctx.fillText("ChemEase",0,0);ctx.restore();
  // The footer brand remains visible even on pages containing opaque figures/tables.
  ctx.fillStyle=B.line;ctx.fillRect(LEFT,1043,WIDTH,1);ctx.fillStyle=B.purple;ctx.font="600 11px Arial,sans-serif";ctx.fillText("ChemEase | Recorded research results",LEFT,1066);ctx.fillStyle=B.muted;ctx.font="10px Arial,sans-serif";ctx.fillText(B.site,LEFT,1084);ctx.textAlign="right";ctx.fillText(`${String(i+1).padStart(2,"0")} / ${String(pages.length).padStart(2,"0")}`,736,1074);ctx.textAlign="left";
  if(attribution){ctx.fillStyle=B.muted;ctx.font="10px Arial,sans-serif";const label=`EXPORTED BY  /  ${attribution}`;ctx.fillText(label,LEFT,1104,WIDTH);}
  if(i)pdf.addPage();pdf.addImage(canvas.toDataURL("image/png"),"PNG",0,0,210,297,undefined,"FAST");await new Promise(resolve=>setTimeout(resolve,0));
 }
 canvas.width=canvas.height=0;return pdf.output("blob");
}
export function reportCanvas(){const canvas=document.createElement("canvas");canvas.width=1588;canvas.height=2246;const ctx=canvas.getContext("2d");if(!ctx)throw new Error("This browser cannot render PDF pages.");return{canvas,measure:canvasMeasure(ctx)};}
