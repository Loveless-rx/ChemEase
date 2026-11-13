import subprocess
import sys
import time
import traceback
from . import storage as db
from . import pipeline


def run(identifier,nonce):
    def check():
        path=db.ROOT/"server.instance"
        if (db.folder(identifier)/"cancel.request").exists() or db.get(identifier)["status"] in {"failed","cancelled","cancelling"}:
            raise InterruptedError("Job cancelled; partial outputs are not results.")
        if not path.exists() or path.read_text()!=nonce or time.time()-path.stat().st_mtime>30:
            raise InterruptedError("The backend owner stopped; submit a new job.")
    def stage(name,message):
        check();db.update(identifier,stage=name,message=message)
    try:
        check();job=db.get(identifier)
        fn={"receptor":pipeline.prepare_receptor,"ligand":pipeline.prepare_ligand,"dock":pipeline.dock}[job["task"]]
        result=fn(job,stage,check);check()
        db.update(identifier,status="completed",stage="completed",message="Finished",result=result,completedAt=db.now())
    except InterruptedError as error:
        if db.get(identifier)["status"]!="failed":db.update(identifier,status="cancelled",stage="cancelled",message=str(error))
    except Exception as error:
        traceback.print_exc()
        message=str(error)
        if isinstance(error,subprocess.CalledProcessError):message+=(error.stderr or error.stdout or "")[-3000:]
        db.update(identifier,status="failed",stage="failed",message=message[:4000],completedAt=db.now())


if __name__=="__main__":run(sys.argv[1],sys.argv[2])
