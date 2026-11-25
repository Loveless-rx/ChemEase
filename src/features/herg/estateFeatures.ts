type Values=(number|boolean)[];
const outer:Record<number,number>={1:1,5:3,6:4,7:5,8:6,9:7,11:1,15:5,16:6,17:7,35:7,53:7};
/** Historical RDKit EState equations; unsupported elements fail closed. */
export function estateFeatures(atoms:Values[],bonds:Values[],areas:number[]):Record<string,number>{
 const n=atoms.length;if(!n||areas.length!==n)throw new Error("Invalid EState inputs.");
 const distances:number[][]=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:1e8)),degree=Array<number>(n).fill(0);
 for(const b of bonds){const a=Number(b[0]),c=Number(b[1]);distances[a][c]=distances[c][a]=1;degree[a]++;degree[c]++;}
 for(let k=0;k<n;k++)for(let i=0;i<n;i++)for(let j=0;j<n;j++)distances[i][j]=Math.min(distances[i][j],distances[i][k]+distances[k][j]);
 const intrinsic=atoms.map((a,i)=>{const z=Number(a[0]);if(outer[z]===undefined)throw new Error("Unsupported EState element.");const shell=z<=2?1:z<=10?2:z<=18?3:z<=36?4:z<=54?5:z<=86?6:7;return degree[i]?(4/(shell*shell)*(outer[z]-Number(a[4]))+1)/degree[i]:0;});
 const values=[...intrinsic];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const d=distances[i][j]+1;if(d<1e6){const delta=(intrinsic[i]-intrinsic[j])/(d*d);values[i]+=delta;values[j]-=delta;}}
 const result:Record<string,number>={MaxEStateIndex:Math.max(...values),MinEStateIndex:Math.min(...values),MaxAbsEStateIndex:Math.max(...values.map(Math.abs)),MinAbsEStateIndex:Math.min(...values.map(Math.abs)),NumValenceElectrons:atoms.reduce((v,a)=>v+outer[Number(a[0])]-Number(a[2])+Number(a[4]),0),HeavyAtomMolWt:atoms.reduce((v,a)=>v+(Number(a[0])>1?Number(a[7]):0),0)};
 const estateBins=[-.390,.290,.717,1.165,1.540,1.807,2.05,4.69,9.17,15],vsaBins=[4.78,5,5.410,5.740,6,6.07,6.45,7,11];
 for(let i=1;i<=11;i++)result['EState_VSA'+i]=0;for(let i=1;i<=10;i++)result['VSA_EState'+i]=0;
 for(let i=0;i<n;i++){const e=estateBins.filter(b=>values[i]>=b).length+1,v=vsaBins.filter(b=>areas[i]>=b).length+1;result['EState_VSA'+e]+=areas[i];result['VSA_EState'+v]+=values[i];}
 return result;
}
