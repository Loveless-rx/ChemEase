// Research-only arithmetic port; no browser feature generation or product inference.
const fs=require('fs');const fixture=JSON.parse(fs.readFileSync('qa/herg/network-fixtures.json'));const bytes=fs.readFileSync('qa/herg/network-weights.bin');
function model(index,graph,features){
 const spec=fixture.models[index];const weights={};for(const [name,t] of Object.entries(spec))weights[name]=new Float32Array(bytes.buffer,bytes.byteOffset+t.offset,t.count);
 const linear=(input,prefix,relu)=>{const w=weights[prefix+'.weight'],bias=weights[prefix+'.bias'],n=spec[prefix+'.weight'].shape[0],out=new Float32Array(n);for(let i=0;i<n;i++){let v=bias?bias[i]:0;for(let j=0;j<input.length;j++)v+=w[i*input.length+j]*input[j];out[i]=relu?Math.max(0,v):v;}return out;};
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
const results=fixture.rows.map(row=>{const members=fixture.models.map((_,i)=>model(i,row.graph,row.features));const mean=members.reduce((a,b)=>a+b)/5;return {smiles:row.smiles,mean,expected:row.expected,error:Math.abs(mean-row.expected),members};});
const maximumError=Math.max(...results.map(r=>r.error));fs.writeFileSync('qa/herg/network-parity.json',JSON.stringify({maximumError,tolerance:1e-5,results},null,2));console.log({maximumError,passed:maximumError<=1e-5});if(maximumError>1e-5)process.exitCode=1;
