import type { HergGraph } from "./graphFeatures";
export interface Tensor { offset:number; shape:number[]; count:number }
export type TensorSpec=Record<string,Tensor>;
/** ADMET-AI v1.4.0 / Chemprop 1.6.1 directed-message inference.
 * Converted hERG readout only. Upstream MIT license: vendor/herg/ADMET_AI_LICENSE.txt.
 */
function model(index:number,graph:HergGraph,features:number[],specs:TensorSpec[],bytes:Uint8Array){
 const spec=specs[index];const weights:Record<string,Float32Array>={};for(const [name,t] of Object.entries(spec))weights[name]=new Float32Array(bytes.buffer,bytes.byteOffset+t.offset,t.count);
 const linear=(input:ArrayLike<number>,prefix:string,relu:boolean)=>{const w=weights[prefix+'.weight'],bias=weights[prefix+'.bias'],n=spec[prefix+'.weight'].shape[0],out=new Float32Array(n);for(let i=0;i<n;i++){let v=bias?bias[i]:0;for(let j=0;j<input.length;j++)v+=w[i*input.length+j]*input[j];out[i]=relu?Math.max(0,v):v;}return out;};
 const prefix='encoder.encoder.0.';
 const initial=graph.bonds.map(b=>linear(b,prefix+'W_i',false));let messages=initial.map(v=>Float32Array.from(v,x=>Math.max(0,x)));
 for(let depth=0;depth<2;depth++){
 const incoming=graph.a2b.map(ids=>{const a=new Float32Array(300);for(const id of ids)for(let k=0;k<300;k++)a[k]+=messages[id][k];return a;});
 messages=graph.bonds.map((_,b)=>{const v=Float32Array.from(incoming[graph.b2a[b]],(x,k)=>x-messages[graph.reverse[b]][k]);const h=linear(v,prefix+'W_h',false);return Float32Array.from(h,(x,k)=>Math.max(0,x+initial[b][k]));});
 }
 const atoms=graph.atoms.map((a,i)=>{const h=new Float32Array(300);for(const id of graph.a2b[i])for(let k=0;k<300;k++)h[k]+=messages[id][k];return linear([...a,...h],prefix+'W_o',true);});
 const [start,count]=graph.atomScope[0],pooled=new Float32Array(300);for(let i=start;i<start+count;i++)for(let k=0;k<300;k++)pooled[k]+=atoms[i][k];for(let k=0;k<300;k++)pooled[k]/=count;
 const hidden=linear([...pooled,...features],'readout.1',true);const logit=linear(hidden,'readout.4',false)[0];return 1/(1+Math.exp(-logit));
}

export function inferHerg(graph:HergGraph,features:number[],specs:TensorSpec[],bytes:Uint8Array){
 if(features.length!==200||features.some(x=>!Number.isFinite(x))||specs.length!==5)throw new Error("Invalid hERG network inputs.");
 const members=specs.map((_,i)=>model(i,graph,features,specs,bytes));
 if(members.some(x=>!Number.isFinite(x)||x<0||x>1))throw new Error("Non-finite hERG inference.");
 return {members,score:members.reduce((a,b)=>a+b,0)/members.length};
}
