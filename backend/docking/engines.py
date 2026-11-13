"""Engine adapters never receive shell text or caller-chosen executable paths."""
import os
import subprocess
from pathlib import Path
from typing import Protocol
from .schemas import DockingRequest


class Engine(Protocol):
    id: str
    label: str
    def executable(self) -> str | None: ...
    def command(self, request: DockingRequest) -> list[str]: ...
    def version(self) -> str | None: ...


class Vina:
    id = "vina"
    label = "AutoDock Vina"

    def executable(self):
        path = Path(os.environ.get("CHEMEASE_VINA", Path(__file__).resolve().parents[1] / "bin" / ("vina.exe" if os.name == "nt" else "vina")))
        return str(path.resolve()) if path.is_file() else None

    def command(self, r):
        exe = self.executable()
        if not exe:
            raise RuntimeError("AutoDock Vina is not installed. Configure CHEMEASE_VINA on the backend.")
        args = [exe, "--receptor", "receptor.pdbqt", "--ligand", "ligand.pdbqt", "--out", "poses.pdbqt", "--cpu", "2", "--exhaustiveness", str(r.exhaustiveness), "--num_modes", str(r.poses), "--seed", str(r.seed)]
        for name in ("center", "size"):
            for axis in ("x", "y", "z"):
                args += [f"--{name}_{axis}", str(getattr(getattr(r.grid, name), axis))]
        return args

    def version(self):
        exe = self.executable()
        if not exe:
            return None
        return subprocess.run([exe, "--version"], capture_output=True, text=True, timeout=10, check=True).stdout.strip()


class AutoDock4:
    id = "autodock4"
    label = "AutoDock 4"

    def path(self, name, setting):
        path=Path(os.environ.get(setting, Path(__file__).resolve().parents[1]/"bin"/(name+(".exe" if os.name=="nt" else ""))))
        return str(path.resolve()) if path.is_file() else None

    def executable(self): return self.path("autodock4", "CHEMEASE_AUTODOCK4")
    def autogrid(self): return self.path("autogrid4", "CHEMEASE_AUTOGRID4")

    def command(self, r):
        if not self.executable() or not self.autogrid():
            raise RuntimeError("Install both AutoDock 4 and AutoGrid 4. Configure CHEMEASE_AUTODOCK4 / CHEMEASE_AUTOGRID4.")
        return [self.executable(), "-p", "docking.dpf", "-l", "docking.dlg"]

    def tool_version(self, path, label):
        if not path: return None
        p=subprocess.run([path,"--version"],capture_output=True,text=True,timeout=10,check=True)
        lines=(p.stdout+p.stderr).strip().splitlines()
        if not lines: raise ValueError(f"{label} did not report a version.")
        first=lines[0]
        if not first.startswith(label+" 4.2."): raise ValueError(f"Expected {label} 4.2.x executable.")
        return first.strip()

    def version(self):
        self.tool_version(self.autogrid(), "AutoGrid")
        return self.tool_version(self.executable(), "AutoDock")


class DockingManager:
    def __init__(self):
        self.adapters: dict[str, Engine] = {"vina": Vina(), "autodock4": AutoDock4()}

    def engine(self, identifier):
        if identifier not in self.adapters:
            raise ValueError("This engine has no verified adapter in this release.")
        return self.adapters[identifier]

    def capabilities(self):
        entries=[]
        for key,engine in self.adapters.items():
            try:
                version=engine.version()
                available=bool(version and (key!="vina" or version.startswith("AutoDock Vina")))
                if key=="autodock4": available=available and bool(engine.autogrid())
                reason=None if available else "Required engine binaries are missing or invalid."
            except (OSError,ValueError,subprocess.SubprocessError):
                version=None;available=False;reason="Configured engine could not execute. Check binary versions, platform and dependencies."
            entries.append({"id":key,"label":engine.label,"available":available,"version":version,"reason":reason})
        return entries+[{"id":key,"label":label,"available":False,"reason":"Adapter not yet implemented or validated"} for key,label in [("rdock","rDock"),("flexaid","FlexAID")]]
