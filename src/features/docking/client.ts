import type {Asset,Health,Job,DockingResult} from "./types";
const DEFAULT="http://127.0.0.1:8000";
export const executionMode=():"browser"|"native"=>localStorage.getItem("chemease-docking-execution")==="native"?"native":"browser";
export const setExecutionMode=(mode:"browser"|"native")=>localStorage.setItem("chemease-docking-execution",mode);
export function dockingScope(){const base=apiBase(),key=`chemease-docking-client:${base}`;let token=localStorage.getItem(key)??(base===DEFAULT?localStorage.getItem("chemease-docking-client"):null);if(!token||!/^[a-f0-9]{32}$/.test(token))token=crypto.randomUUID().replaceAll("-","");localStorage.setItem(key,token);return token;}
export function apiBase(){return localStorage.getItem("chemease-docking-api")??DEFAULT;}
export function setApiBase(input:string){const url=new URL(input);if(!["http:","https:"].includes(url.protocol)||url.username||url.password||url.search||url.hash||url.pathname!=="/")throw new Error("Use a backend origin such as http://127.0.0.1:8000, without a path or credentials.");localStorage.setItem("chemease-docking-api",url.origin);return url.origin;}
export async function dockingRequest(path:string,body?:unknown,signal?:AbortSignal){
  if(executionMode()==="browser"){if(typeof location!=="undefined"&&location.protocol==="file:")throw new Error("Browser docking requires the served website over HTTPS or localhost, including its runtime assets.");if(signal?.aborted)throw new DOMException("Aborted","AbortError");return (await import("./browser/service")).browserRequest(path,body);}
  const headers:Record<string,string>=path==="/health"?{}:{"X-ChemEase-Client":dockingScope()};let data:BodyInit|undefined;
  if(body instanceof FormData)data=body;else if(body!==undefined){headers["Content-Type"]="application/json";data=JSON.stringify(body);}
  let response:Response;
  try{response=await fetch(apiBase()+"/api/docking"+path,{method:body===undefined?"GET":"POST",headers,body:data,signal:signal??AbortSignal.timeout(45000)});}catch(e){if(signal?.aborted)throw e;throw new Error("Cannot reach the docking backend. Start the Python service and check its address/CORS settings.",{cause:e});}
  if(!response.ok){const text=await response.text();let message=text;try{const parsed=JSON.parse(text) as {detail?:string|{msg:string;loc:string[]}[]};message=Array.isArray(parsed.detail)?parsed.detail.map(e=>`${e.loc.join(".")}: ${e.msg}`).join("; "):parsed.detail??text;}catch{/* Plain-text backend error. */}throw new Error(message.slice(0,4000)||`Backend error ${response.status}`);}
  return response;
}
export const getHealth=async()=>{const h=await(await dockingRequest("/health")).json() as Health;if(h.service!=="chemease-docking"||h.apiVersion!==1||!Array.isArray(h.engines)||h.engines.some(e=>typeof e.id!=="string"||typeof e.label!=="string"||typeof e.available!=="boolean"))throw new Error("Unsupported docking service or API version.");return h;};
export const getAssets=async()=>await(await dockingRequest("/assets")).json() as {receptors:Asset[];ligands:Asset[]};
export const getJobs=async()=>await(await dockingRequest("/jobs")).json() as Job[];
export const getJob=async(id:string)=>await(await dockingRequest(`/jobs/${encodeURIComponent(id)}`)).json() as Job;
export const submitJob=async(task:Job["task"],body:unknown)=>await(await dockingRequest(`/jobs/${task}`,body)).json() as Job;
export const cancelJob=async(id:string)=>await(await dockingRequest(`/jobs/${encodeURIComponent(id)}/cancel`,{})).json() as Job;
export const artifactText=async(id:string,key:string,signal?:AbortSignal)=>await(await dockingRequest(`/artifacts/${encodeURIComponent(id)}/${encodeURIComponent(key)}`,undefined,signal)).text();
export const resultOf=(j:Job):DockingResult|undefined=>j.status==="completed"&&j.result&&"poses" in j.result?j.result:undefined;
