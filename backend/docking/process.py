"""Cancellable child execution shared by grid generation and both docking engines."""
import subprocess
import time


def execute(command, folder, log_name, check):
    check()
    with (folder / log_name).open("w") as log:
        process = subprocess.Popen(command, cwd=folder, stdout=log, stderr=subprocess.STDOUT)
        try:
            while process.poll() is None:
                check()
                time.sleep(.25)
            if process.returncode:
                detail=(folder / log_name).read_text(errors="replace")[-2500:]
                raise ValueError(f"Engine process failed ({process.returncode}): {detail}")
        finally:
            if process.poll() is None:
                process.terminate()
                try: process.wait(timeout=5)
                except subprocess.TimeoutExpired: process.kill(); process.wait()
    check()
