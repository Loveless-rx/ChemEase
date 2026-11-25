export interface HergGraph {atoms:number[][];bonds:number[][];a2b:number[][];b2a:number[];reverse:number[];atomScope:number[][]}
type Values=(number|boolean)[];
const oneHot=(value:number,choices:number[])=>{const result=Array<number>(choices.length+1).fill(0),i=choices.indexOf(value);result[i<0?choices.length:i]=1;return result;};
const range=(length:number)=>Array.from({length},(_,i)=>i);
/** Chemprop 1.6.1 graph encoding. Requires verified historical RDKit atom inputs. */
export function buildHergGraph(rawAtoms:Values[],rawBonds:Values[]):HergGraph{
 if(!rawAtoms.length||rawAtoms.length>1500)throw new Error("Unsupported hERG graph size.");
 const atoms=[Array<number>(133).fill(0),...rawAtoms.map(a=>{
  if(a.length!==8)throw new Error("Invalid historical atom inputs.");
  return [...oneHot(Number(a[0])-1,range(100)),...oneHot(Number(a[1]),range(6)),...oneHot(Number(a[2]),[-1,-2,1,2,0]),...oneHot(Number(a[3]),range(4)),...oneHot(Number(a[4]),range(5)),...oneHot(Number(a[5]),[2,3,4,6,7]),a[6]?1:0,Number(a[7])*.01].map(Math.fround);
 })];
 const graph:HergGraph={atoms,bonds:[Array<number>(147).fill(0)],a2b:Array.from({length:atoms.length},()=>[]),b2a:[0],reverse:[0],atomScope:[[1,rawAtoms.length]]};
 const sorted=rawBonds.map(b=>[...b]).sort((a,b)=>Math.min(Number(a[0]),Number(a[1]))-Math.min(Number(b[0]),Number(b[1]))||Math.max(Number(a[0]),Number(a[1]))-Math.max(Number(b[0]),Number(b[1])));
 for(const b of sorted){
  if(b.length!==6)throw new Error("Invalid historical bond inputs.");
  const a=Math.min(Number(b[0]),Number(b[1]))+1,c=Math.max(Number(b[0]),Number(b[1]))+1,type=Number(b[2]);
  if(a===c||a<1||c>=atoms.length||!Number.isInteger(a)||!Number.isInteger(c))throw new Error("Invalid hERG bond endpoints.");
  const features=[0,type===1?1:0,type===2?1:0,type===3?1:0,type===1.5?1:0,b[3]?1:0,b[4]?1:0,...oneHot(Number(b[5]),range(6))];
  const forward=graph.bonds.length,reverse=forward+1;
  graph.bonds.push([...atoms[a],...features],[...atoms[c],...features]);graph.b2a.push(a,c);graph.reverse.push(reverse,forward);graph.a2b[c].push(forward);graph.a2b[a].push(reverse);
 }
 const max=Math.max(1,...graph.a2b.map(a=>a.length));for(const row of graph.a2b)while(row.length<max)row.push(0);
 return graph;
}
