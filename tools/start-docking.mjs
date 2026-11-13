import {existsSync} from "node:fs";
import {spawn} from "node:child_process";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
const root=fileURLToPath(new URL("..",import.meta.url));
const python=join(root,"backend",".venv",process.platform==="win32"?"Scripts/python.exe":"bin/python");
if(!existsSync(python)){process.stderr.write("Docking environment is missing. Follow backend/README.md to create it and install Vina.\n");process.exit(1);}
const port=process.env.CHEMEASE_DOCKING_PORT??"8000";
if(!/^\d+$/.test(port)||Number(port)<1024||Number(port)>65535)throw new Error("CHEMEASE_DOCKING_PORT must be between 1024 and 65535.");
const child=spawn(python,["-m","uvicorn","docking.api:app","--app-dir",join(root,"backend"),"--host","127.0.0.1","--port",port],{stdio:"inherit",cwd:root});
child.on("error",error=>{process.stderr.write(error.message+"\n");process.exitCode=1;});
child.on("exit",code=>{process.exitCode=code??0;});
process.on("SIGINT",()=>child.kill("SIGINT"));
process.on("SIGTERM",()=>child.kill("SIGTERM"));
