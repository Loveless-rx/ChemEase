/* ChemEase isolated runtime host. Tools run in disposable workers; inputs stay local. */
let currentModule;
self.addEventListener("error",event=>{const nested=event.error;self.postMessage({ok:false,error:[event.message,nested?.message,nested?.filename,event.filename,event.lineno].filter(Boolean).join(" / ")});});
self.onmessage=async ({data})=>{
  if(data.cancel){currentModule?.PThread?.terminateAllThreads();self.close();return;}
  const {tool,args,files={},outputs=[]}=data;
  let stdout="",stderr="",finished=false;
  const base=new URL("./",self.location.href);
  try{
    const manifest=await (await fetch(new URL("manifest.json",base))).json();
    const paths={vina:"webina/vina",babel:"obabel-wasm/obabel",reduce:"reduce/index"};
    if(!paths[tool])throw Error("Unknown browser chemistry tool.");
    const blobs=[];
    async function asset(path){
      const expected=manifest.assets[path];if(!expected)throw Error("Unpinned runtime asset.");
      const url=new URL(path,base).href;let cache;
      try{cache=await caches.open("chemease-docking-"+manifest.release);}catch{/* Storage can be unavailable. */}
      let response=await cache?.match(url);let buffer=response?await response.arrayBuffer():null;
      async function valid(b){return b&&b.byteLength===expected.bytes&&Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",b)),v=>v.toString(16).padStart(2,"0")).join("")===expected.sha256;}
      if(!await valid(buffer)){response=await fetch(url);if(!response.ok)throw Error("Could not download "+path);buffer=await response.arrayBuffer();if(!await valid(buffer))throw Error("Runtime checksum mismatch: "+path);try{await cache?.put(url,new Response(buffer));}catch{/* Run without persistent caching. */}}
      return buffer;
    }
    const prefix=paths[tool];const js=await asset(prefix+".js"),wasm=await asset(prefix+".wasm");
    const script=URL.createObjectURL(new Blob([js],{type:"text/javascript"}));blobs.push(script);
    let packed;
    if(tool!=="vina")packed=await asset(prefix+".data");
    let pthread;
    if(tool==="vina"){await asset("webina/vina.worker.mjs");pthread=new URL("webina/vina.worker.mjs",base).href;}
    function finish(code=0){
      if(finished)return;finished=true;
      try{
        if(code!==0)throw Error("Chemistry tool exited with code "+code+". "+stderr.slice(-3000));
        const result={};for(const name of outputs)result[name]=currentModule.FS.readFile("/"+name,{encoding:"utf8"});
        self.postMessage({ok:true,stdout,stderr,files:result});
      }catch(error){self.postMessage({ok:false,error:String(error)});}
    }
    const options={noInitialRun:true,mainScriptUrlOrBlob:tool==="vina"?new URL("webina/vina.js",base).href:undefined,wasmBinary:new Uint8Array(wasm),locateFile:path=>path.endsWith("worker.mjs")?pthread:new URL(path,new URL(prefix.slice(0,prefix.lastIndexOf("/")+1),base)).href,getPreloadedPackage:()=>packed,
      print:text=>{stdout+=text+"\n";if(stdout.length>16*1024*1024)throw Error("Browser tool output exceeded 16 MB.");},printErr:text=>{stderr=(stderr+text+"\n").slice(-200000);},onExit:code=>finish(code),onAbort:error=>{if(!finished){finished=true;self.postMessage({ok:false,error:"Browser runtime aborted: "+String(error)});}},
      preRun:[mod=>{if(tool==="babel")mod.ENV.BABEL_DATADIR="/data";for(const [name,text] of Object.entries(files)){if(!/^[\w.-]+$/.test(name))throw Error("Invalid input filename.");mod.FS.writeFile("/"+name,text);}}]};
    let factory;
    if(tool==="babel"){importScripts(script);factory=self.Webobabel;}
    else factory=(await import(tool==="vina"?new URL("webina/vina.js",base).href:script)).default;
    currentModule=await factory(options);
    let code;
    try{code=currentModule.callMain([...args]);}catch(error){if(error?.status!==0)throw error;code=0;}
    if(tool==="babel")finish(typeof code==="number"?code:0);
    // Vina's pthread main exits asynchronously; Reduce reports onExit.
  }catch(error){if(!finished)self.postMessage({ok:false,error:String(error)+" "+stderr.slice(-3000)});}
};
