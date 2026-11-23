import {requireExportAccount} from "../account/access";
import {useEffect,useRef,useState} from "react";
import "./Docking.css";

/** Keep an ordinary download link available after asynchronous file creation.
 * A separate user click retains browser/mobile download activation and allows
 * Save link as. Coordinate files can also be inspected before saving.
 */
export function DockingDownload({label,filename,create,inspect=false}:{label:string;filename:string;create:()=>Promise<Blob>;inspect?:boolean}){
  const [url,setUrl]=useState(""),[text,setText]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState("");
  const generation=useRef(0);
  useEffect(()=>()=>{generation.current++;},[]);
  useEffect(()=>()=>{if(url)URL.revokeObjectURL(url);},[url]);
  async function prepare(){if(!requireExportAccount())return;const request=++generation.current;setBusy(true);setError("");try{
    const blob=await create(),content=inspect?await blob.text():"";
    if(request!==generation.current)return;
    setUrl(URL.createObjectURL(blob));setText(content);
  }catch(e){if(request===generation.current)setError((e as Error).message);}finally{if(request===generation.current)setBusy(false);}}
  return <div className="docking-export"><button className="secondary" disabled={busy} onClick={()=>void prepare()}>{busy?"Preparing…":`Prepare ${label}`}</button>{url&&<a className="secondary" href={url} download={filename}>{`Download ${label}`}</a>}{text&&<details><summary>{`Inspect ${label}`}</summary><pre className="docking-coordinate-file" aria-label={`${label} contents`}>{text}</pre></details>}{error&&<p role="alert">{error}</p>}</div>;
}
