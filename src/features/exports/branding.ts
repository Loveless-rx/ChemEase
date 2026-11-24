import {exportIdentity} from "../account/access";

import {logoMarkSvg} from "./logoAsset";

export const exportBrand = {name:"ChemEase",site:"loveless-rx.github.io/ChemEase/",ink:"#251d33",purple:"#7655ad",muted:"#756b80",pale:"#f2edf8",line:"#e3dbea"};

export const xmlEscape=(value:string)=>value.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"})[c]!);

export function svgBrand(x:number,y:number,dark=false){

  const color=dark?"#c5aaec":exportBrand.purple;

  return `<g fill="none" transform="translate(${x} ${y-2}) scale(.38)">${logoMarkSvg.replace(/<svg[^>]*>|<\/svg>/g,"").replaceAll("#7655ad",color)}</g><text x="${x+31}" y="${y+16}" fill="${color}" font-family="Arial,sans-serif" font-size="16" font-weight="700">ChemEase</text>`;

}

/** Adds a dedicated brand strip without changing scientific plot coordinates. */

export function brandPlotSvg(svg:string){

  const width=Number(svg.match(/\bwidth="([\d.]+)"/)?.[1]),height=Number(svg.match(/\bheight="([\d.]+)"/)?.[1]);

  if(!width||!height)throw new Error("Export figure dimensions are missing.");

  return svg.replace(`height="${height}"`,`height="${height+72}"`).replace(`viewBox="0 0 ${width} ${height}"`,`viewBox="0 0 ${width} ${height+72}"`).replace('</svg>',`<text x="${width/2}" y="${height/2}" text-anchor="middle" fill="#7655ad" fill-opacity="0.055" font-family="Arial,sans-serif" font-size="64" font-weight="700" pointer-events="none">ChemEase</text><rect y="${height}" width="${width}" height="72" fill="#f2edf8"/><path d="M0 ${height}H${width}" stroke="#e3dbea"/>${svgBrand(25,height+14)}${svgAttribution(25,height+57,width-50)}<text x="${width-25}" y="${height+31}" text-anchor="end" font-family="Arial,sans-serif" font-size="10" fill="#756b80">${exportBrand.site}</text></svg>`);

}



export function svgAttribution(x:number,y:number,width:number,dark=false){

 const identity=exportIdentity();if(!identity)return "";

 const max=Math.max(12,Math.floor(width/5.5));const label=identity.length>max?identity.slice(0,max-1)+"…":identity;

 return `<text x="${x}" y="${y}" fill="${dark?'#b6a9c4':'#756b80'}" font-family="Arial,sans-serif" font-size="9"><title>${xmlEscape(identity)}</title>EXPORTED BY · ${xmlEscape(label)}</text>`;

}

