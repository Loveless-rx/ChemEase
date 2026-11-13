import io
import os
import re
import zipfile
from contextlib import asynccontextmanager
from importlib.metadata import version
import httpx
from fastapi import FastAPI, Depends, File, Form, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from . import storage as db
from .structures import inspect_pdb
from .schemas import ReceptorPreparation, LigandPreparation, DockingRequest
from .engines import DockingManager
from .jobs import Jobs
from .pipeline import artifact, publish_files


@asynccontextmanager
async def lifespan(app):
    app.state.jobs=Jobs()
    yield
    app.state.jobs.close()


app=FastAPI(title="ChemEase Docking",version="1.0.0",lifespan=lifespan)
app.add_middleware(CORSMiddleware,allow_origins=[v for v in os.environ.get("CHEMEASE_DOCKING_ORIGINS","").split(",") if v],allow_origin_regex=r"http://(127\.0\.0\.1|localhost):[0-9]+",allow_methods=["GET","POST"],allow_headers=["Content-Type","X-ChemEase-Client"],expose_headers=["Content-Disposition"])


def scope(x_chemease_client: str = Header()):
    if not re.fullmatch(r"[a-f0-9]{32}",x_chemease_client):raise HTTPException(400,"Invalid local workspace capability.")
    return x_chemease_client


@app.middleware("http")
async def limit_body(request,call_next):
    try: size=int(request.headers.get("content-length","0"))
    except ValueError:return Response(status_code=400)
    if size>18*1024*1024:return Response("Upload exceeds 18 MB",status_code=413)
    return await call_next(request)


@app.exception_handler(KeyError)
async def missing(_,error):return Response("Record not found in this workspace",status_code=404)


@app.exception_handler(ValueError)
async def invalid(_,error):return Response(str(error),status_code=400)


@app.exception_handler(httpx.HTTPError)
async def remote_failure(_,error):return Response("RCSB PDB retrieval failed or timed out. Retry or upload the PDB file directly.",status_code=502)


def usable(record):
    return record.get("ready") and (not record.get("parentJobId") or db.get(record["parentJobId"])["status"]=="completed")


@app.get("/api/docking/health")
def health():
    return {"service":"chemease-docking","apiVersion":1,"engines":DockingManager().capabilities(),"tools":{name:version(name) for name in ("rdkit","meeko","openmm","pdbfixer","molscrub")},"scope":"Local workstation only; client capabilities isolate browser workspaces. Deploy behind authenticated authorization for multi-user use."}


@app.post("/api/docking/receptors")
async def upload(pdbId:str=Form(default=""),file:UploadFile|None=File(default=None),owner:str=Depends(scope)):
    if bool(pdbId)==bool(file):raise ValueError("Provide a PDB file or one PDB ID.")
    if len(db.records(owner,"receptor-upload"))>=100:raise ValueError("Receptor upload limit reached (100).")
    if pdbId:
        if not re.fullmatch(r"[0-9A-Za-z]{4}",pdbId):raise ValueError("Use a four-character PDB ID; arbitrary URLs are not accepted.")
        async with httpx.AsyncClient(timeout=30,follow_redirects=False) as client:
            async with client.stream("GET",f"https://files.rcsb.org/download/{pdbId.upper()}.pdb") as reply:
                if reply.status_code!=200:raise HTTPException(422,"PDB ID unavailable from RCSB.")
                content=bytearray()
                async for chunk in reply.aiter_bytes():
                    content.extend(chunk)
                    if len(content)>16*1024*1024:raise HTTPException(413,"PDB exceeds 16 MB.")
        name=pdbId.upper()+".pdb"
    else:
        content=await file.read(16*1024*1024+1)
        if len(content)>16*1024*1024:raise HTTPException(413,"PDB exceeds 16 MB.")
        name=(file.filename or "protein.pdb")[:120]
    try:text=bytes(content).decode("utf-8")
    except UnicodeDecodeError:raise ValueError("Use a text PDB file.")
    metadata=inspect_pdb(text)
    record=db.create(owner,"receptor-upload",name=name,metadata=metadata,ready=False,pdbId=pdbId.upper() or None)
    (db.folder(record["id"])/"original.pdb").write_bytes(bytes(content))
    return db.public(publish_files(record,{"pdb":"original.pdb"}))


@app.get("/api/docking/assets")
def assets(owner:str=Depends(scope)):
    return {"receptors":[db.public(r) for r in db.records(owner,"receptor") if usable(r)],"ligands":[db.public(r) for r in db.records(owner,"ligand") if usable(r)]}


@app.post("/api/docking/jobs/receptor",status_code=202)
def receptor(request:ReceptorPreparation,owner:str=Depends(scope)):
    db.get(request.receptorId,owner,"receptor-upload")
    return db.public(app.state.jobs.submit(owner,"receptor",request.model_dump()))


@app.post("/api/docking/jobs/ligand",status_code=202)
def ligand(request:LigandPreparation,owner:str=Depends(scope)):
    return db.public(app.state.jobs.submit(owner,"ligand",request.model_dump()))


@app.post("/api/docking/jobs/dock",status_code=202)
def dock(request:DockingRequest,owner:str=Depends(scope)):
    DockingManager().engine(request.engine).command(request)
    rec=db.get(request.receptorId,owner,"receptor");lig=db.get(request.ligandId,owner,"ligand")
    if not usable(rec) or not usable(lig):raise ValueError("Select preparations from completed jobs.")
    if "features" not in rec["files"] or "features" not in lig["files"]:raise ValueError("Reprepare these older inputs to include topology-based interaction typing.")
    artifact(rec,"pdbqt");artifact(lig,"pdbqt")
    return db.public(app.state.jobs.submit(owner,"dock",request.model_dump()))


@app.get("/api/docking/jobs")
def jobs(owner:str=Depends(scope)):
    return [{k:v for k,v in db.public(r).items() if k not in ("result","files")} for r in db.records(owner)]


@app.get("/api/docking/jobs/{identifier}")
def job(identifier:str,owner:str=Depends(scope)):return db.public(db.get(identifier,owner,"job"))


@app.post("/api/docking/jobs/{identifier}/cancel")
def cancel(identifier:str,owner:str=Depends(scope)):return db.public(app.state.jobs.cancel(identifier,owner))


@app.get("/api/docking/artifacts/{identifier}/{key}")
def download(identifier:str,key:str,owner:str=Depends(scope)):
    record=db.get(identifier,owner)
    if record["kind"]!="job" and not usable(record):raise HTTPException(409,"Preparation job did not complete.")
    if record["kind"]=="job" and record["status"]!="completed":raise HTTPException(409,"Only completed jobs have downloadable results.")
    path=artifact(record,key)
    return FileResponse(path,filename=path.name,media_type="text/plain" if path.suffix in (".pdb",".pdbqt",".sdf",".log") else None)


@app.get("/api/docking/jobs/{identifier}/archive")
def archive(identifier:str,owner:str=Depends(scope)):
    record=db.get(identifier,owner,"job")
    if record["status"]!="completed" or record["task"]!="dock":raise HTTPException(409,"Select a completed docking job.")
    data=io.BytesIO()
    with zipfile.ZipFile(data,"w",zipfile.ZIP_DEFLATED) as out:
        for key,entry in record["files"].items():out.write(artifact(record,key),entry["name"])
    return Response(data.getvalue(),media_type="application/zip",headers={"Content-Disposition":f'attachment; filename="ChemEase-docking-{identifier[:8]}.zip"'})
