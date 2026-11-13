"""Engine adapters never receive shell text or caller-chosen executable paths."""
import os
import subprocess
from pathlib import Path
from typing import Protocol
from .schemas import DockingRequest


class Engine(Protocol):
    id: str
    def executable(self) -> str | None: ...
    def command(self, request: DockingRequest) -> list[str]: ...
    def version(self) -> str | None: ...


class Vina:
    id = "vina"

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


class DockingManager:
    def __init__(self):
        self.adapters: dict[str, Engine] = {"vina": Vina()}

    def engine(self, identifier):
        if identifier not in self.adapters:
            raise ValueError("This engine has no verified adapter in this release.")
        return self.adapters[identifier]

    def capabilities(self):
        vina = self.adapters["vina"]
        reason=None
        try:
            version=vina.version()
            available=bool(version and version.startswith("AutoDock Vina"))
            if not available:reason="Vina is missing or the configured executable is not AutoDock Vina."
        except (OSError,subprocess.SubprocessError):
            version=None;available=False;reason="Configured Vina could not execute. Check its platform, dependencies and CHEMEASE_VINA path."
        return [{"id": "vina", "label": "AutoDock Vina", "available": available, "version": version,"reason":reason}, *[{"id": key, "label": label, "available": False, "reason": "Adapter not yet implemented or validated"} for key, label in [("autodock4", "AutoDock 4"), ("rdock", "rDock"), ("flexaid", "FlexAID")]]]
