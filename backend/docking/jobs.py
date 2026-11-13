import os
import subprocess
import sys
import threading
import time
import uuid
from concurrent.futures import ThreadPoolExecutor
from . import storage as db

TERMINAL = {"completed", "failed", "cancelled"}


class Jobs:
    def __init__(self):
        self.pool=ThreadPoolExecutor(max_workers=1,thread_name_prefix="docking-manager")
        self.stop=threading.Event();self.processes={};self.lock=threading.Lock();self.nonce=uuid.uuid4().hex
        db.ROOT.mkdir(parents=True,exist_ok=True)
        self.lease=(db.ROOT/"server.lock").open("a+b")
        if self.lease.tell()==0:self.lease.write(b"1");self.lease.flush()
        self.lease.seek(0)
        try:
            if os.name=="nt":
                import msvcrt
                msvcrt.locking(self.lease.fileno(),msvcrt.LK_NBLCK,1)
            else:
                import fcntl
                fcntl.flock(self.lease.fileno(),fcntl.LOCK_EX|fcntl.LOCK_NB)
        except OSError as error:
            self.lease.close();self.pool.shutdown(wait=False)
            raise RuntimeError("Another docking backend owns this data directory. Run one server or choose a separate CHEMEASE_DOCKING_DATA directory.") from error
        for record in db.records():
            if record["status"] not in TERMINAL:
                db.update(record["id"],status="failed",stage="interrupted",message="Backend restarted before this job completed. Submit a new job; no partial result is certified.")
        (db.ROOT/"server.instance").write_text(self.nonce)
        self.heartbeat=threading.Thread(target=self.beat,daemon=True);self.heartbeat.start()

    def beat(self):
        while not self.stop.wait(2):
            (db.ROOT/"server.instance").touch()

    def submit(self,scope,task,request):
        with self.lock:return self._submit(scope,task,request)

    def _submit(self,scope,task,request):
        records=db.records()
        if len([r for r in records if r["status"] not in TERMINAL])>=10 or len([r for r in records if r["scope"]==scope and r["status"] not in TERMINAL])>=3:
            raise ValueError("Docking queue is full. Wait for a job to finish or cancel one.")
        if len([r for r in records if r["scope"]==scope])>=200:
            raise ValueError("This workspace reached its 200-job retention limit. Archive results before creating a new local workspace.")
        record=db.create(scope,"job",task=task,status="queued",stage="queued",message="Waiting for the local worker",request=request,ready=False)
        self.pool.submit(self.run,record["id"])
        return record

    def run(self,identifier):
        try:self._execute(identifier)
        except Exception as error:
            if db.get(identifier)["status"] not in TERMINAL:db.update(identifier,status="failed",stage="worker-start-failed",message=str(error)[:2000])

    def _execute(self,identifier):
        record=db.get(identifier)
        if record["status"] in TERMINAL or self.stop.is_set(): return
        db.update(identifier,status="running",startedAt=db.now())
        folder=db.folder(identifier)
        flags={"creationflags":subprocess.CREATE_NEW_PROCESS_GROUP} if os.name=="nt" else {"start_new_session":True}
        with (folder/"worker.log").open("w") as log:
            proc=subprocess.Popen([sys.executable,"-m","docking.worker",identifier,self.nonce],cwd=__import__("pathlib").Path(__file__).resolve().parents[1],env={**os.environ,"CHEMEASE_DOCKING_DATA":str(db.ROOT)},stdout=log,stderr=subprocess.STDOUT,**flags)
            with self.lock:self.processes[identifier]=proc
            start=time.monotonic();cancelled_at=None
            try:
                while proc.poll() is None:
                    r=db.get(identifier)
                    if self.stop.is_set() or time.monotonic()-start>1800:
                        (folder/"cancel.request").touch()
                        cancelled_at=cancelled_at or time.monotonic()
                    if (folder/"cancel.request").exists():cancelled_at=cancelled_at or time.monotonic()
                    if cancelled_at and time.monotonic()-cancelled_at>8:
                        if os.name=="nt":subprocess.run(["taskkill","/PID",str(proc.pid),"/T","/F"],capture_output=True,timeout=10)
                        else:
                            import signal
                            os.killpg(proc.pid,signal.SIGKILL)
                        break
                    time.sleep(.5)
                proc.wait(timeout=15)
                if db.get(identifier)["status"] not in TERMINAL:
                    db.update(identifier,status="cancelled" if cancelled_at else "failed",stage="stopped",message="Job cancelled or time limit reached." if cancelled_at else "Worker exited unexpectedly. Review preparation inputs and backend worker log.")
            finally:
                with self.lock:self.processes.pop(identifier,None)

    def cancel(self,identifier,scope):
        record=db.get(identifier,scope,"job")
        if record["status"] not in TERMINAL:
            (db.folder(identifier)/"cancel.request").touch()
            return db.update(identifier,status="cancelled" if record["status"]=="queued" else "cancelling",message="Cancellation requested; partial outputs will not be published.")
        return record

    def close(self):
        self.stop.set()
        for record in db.records():
            if record["status"] not in TERMINAL:self.cancel(record["id"],record["scope"])
        self.pool.shutdown(wait=True,cancel_futures=True)
        self.heartbeat.join(timeout=3)
        self.lease.seek(0)
        if os.name=="nt":
            import msvcrt
            msvcrt.locking(self.lease.fileno(),msvcrt.LK_UNLCK,1)
        else:
            import fcntl
            fcntl.flock(self.lease.fileno(),fcntl.LOCK_UN)
        self.lease.close()

