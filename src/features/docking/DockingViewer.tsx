import {useEffect,useRef,useState} from "react";
import {createViewer,type AtomSpec,type GLViewer,type GLModel} from "3dmol";
import type {Vec,Grid,Contact} from "./types";
import {artifactText} from "./client";
function shapes(v:GLViewer,grid?:Grid,contacts:Contact[]=[]){
  v.removeAllShapes();
  if(grid)v.addBox({center:grid.center,dimensions:{w:grid.size.x,h:grid.size.y,d:grid.size.z},color:"#b79bdf",wireframe:true,opacity:.6});
  for(const c of contacts.slice(0,200)){if(!c.ligandPosition||!c.receptorPosition)continue;const [x,y,z]=c.ligandPosition,[a,b,d]=c.receptorPosition;v.addLine({start:{x,y,z},end:{x:a,y:b,z:d},color:c.type==="hydrogen-bond candidate"?"#66d9df":"#f3bd72",dashed:true});}
  v.render();
}
export function DockingViewer({receptorId,jobId,ranks,grid,onPick,contacts}:{receptorId:string;jobId?:string;ranks:number[];grid?:Grid;onPick?:(v:Vec)=>void;contacts?:Contact[]}){
  const host=useRef<HTMLDivElement>(null),viewer=useRef<GLViewer|null>(null),pick=useRef(onPick),box=useRef(grid),contactRef=useRef(contacts),poseModels=useRef<GLModel[]>([]),lastJob=useRef<string|undefined>(undefined);
  const [ready,setReady]=useState(0),[error,setError]=useState("");
  useEffect(()=>{pick.current=onPick;},[onPick]);
  useEffect(()=>{box.current=grid;contactRef.current=contacts;const v=viewer.current;if(v)shapes(v,grid,contacts);},[grid,contacts]);
  useEffect(()=>{
    const abort=new AbortController();let instance:GLViewer|null=null,observer:ResizeObserver|null=null;const container=host.current;
    if(!container||!receptorId)return;
    async function load(){try{
      const pdb=await artifactText(receptorId,"pdb",abort.signal);
      if(abort.signal.aborted||!container)return;
      setError("");instance=createViewer(container,{backgroundColor:"#17171d"});viewer.current=instance;poseModels.current=[];lastJob.current=undefined;
      const protein=instance.addModel(pdb,"pdb");protein.setStyle({},{cartoon:{color:"spectrum",opacity:.8}});
      protein.setClickable({},!!pick.current,(atom:AtomSpec)=>{if([atom.x,atom.y,atom.z].every(v=>typeof v==="number"&&Number.isFinite(v)))pick.current?.({x:atom.x!,y:atom.y!,z:atom.z!});});
      shapes(instance,box.current,contactRef.current);instance.zoomTo();instance.render();
      observer=new ResizeObserver(()=>{instance?.resize();instance?.render();});observer.observe(container);setReady(n=>n+1);
    }catch(e){if(!abort.signal.aborted)setError((e as Error).message+" Check prepared artifact access and WebGL.");}}
    void load();return()=>{abort.abort();observer?.disconnect();instance?.clear();viewer.current=null;poseModels.current=[];container.replaceChildren();};
  },[receptorId]);
  const rankKey=ranks.join(",");
  useEffect(()=>{
    const abort=new AbortController(),instance=viewer.current;if(!instance)return;
    async function loadPoses(){try{
      const selected=rankKey?rankKey.split(",").map(Number):[];
      const data=jobId?await Promise.all(selected.map(rank=>artifactText(jobId,`pose-${rank}`,abort.signal))):[];
      if(abort.signal.aborted||instance!==viewer.current)return;
      const view=instance!.getView();for(const model of poseModels.current)instance!.removeModel(model);poseModels.current=[];
      const colors=["#b79bdf","#63d5b5","#f4b36e"];
      for(const [i,sdf] of data.entries()){const model=instance!.addModel(sdf,"sdf");model.setStyle({},{stick:{radius:.18,color:colors[i%colors.length]}});poseModels.current.push(model);}
      if(jobId!==lastJob.current&&poseModels.current.length)instance!.zoomTo({model:poseModels.current[0].getID()});else instance!.setView(view);
      lastJob.current=jobId;shapes(instance!,box.current,contactRef.current);instance!.render();
    }catch(e){if(!abort.signal.aborted)setError((e as Error).message);}}
    void loadPoses();return()=>abort.abort();
  },[jobId,rankKey,ready]);
  return <div className="docking-visual"><div className="docking-viewport" ref={host} aria-label="Interactive protein–ligand docking viewer"/>{error&&<p role="alert">{error}</p>}<p className="descriptor-note">Drag to rotate · wheel to zoom · pose colors: purple, green, amber. {onPick?"Click a protein atom to use its coordinate as the grid center; review the entire box.":"Poses share the receptor coordinate frame."}</p><button className="secondary" onClick={()=>{viewer.current?.zoomTo();viewer.current?.render();}}>Fit entire complex</button></div>;
}
