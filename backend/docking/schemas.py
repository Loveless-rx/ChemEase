from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, model_validator


class Strict(BaseModel):
    model_config = ConfigDict(extra="forbid", allow_inf_nan=False, strict=True)


class Source(Strict):
    kind: Literal["editor", "smiles", "sdf"]
    name: str = Field(min_length=1, max_length=120)
    versionId: str | None = Field(default=None, max_length=100)
    structureKey: str | None = Field(default=None, max_length=100000)

    @model_validator(mode="after")
    def identity(self):
        self.name=self.name.strip()
        if not self.name:raise ValueError("Provide a ligand name.")
        if self.kind!="editor" and (self.versionId is not None or self.structureKey is not None):raise ValueError("Only an editor source can reference a workspace molecule version.")
        if self.kind=="editor" and not self.structureKey:raise ValueError("Editor preparation requires its original structure key.")
        return self


class ReceptorPreparation(Strict):
    receptorId: str = Field(pattern=r"^[a-f0-9]{32}$")
    chains: list[str] = Field(min_length=1, max_length=20)
    ph: float = Field(default=7.4, ge=2, le=12)
    rebuildSidechains: bool = True
    removeNonProteinConfirmed: bool

    @model_validator(mode="after")
    def confirmed(self):
        if not self.removeNonProteinConfirmed or len(set(self.chains)) != len(self.chains):
            raise ValueError("Confirm removal of water/non-protein residues and choose distinct protein chains.")
        return self


class LigandPreparation(Strict):
    content: str = Field(min_length=1, max_length=2_000_000)
    format: Literal["smiles", "sdf"]
    ph: float = Field(default=7.4, ge=2, le=12)
    protonation: Literal["rules", "supplied"] = "rules"
    source: Source


class Vector(Strict):
    x: float = Field(ge=-10000, le=10000)
    y: float = Field(ge=-10000, le=10000)
    z: float = Field(ge=-10000, le=10000)


class Grid(Strict):
    center: Vector
    size: Vector

    @model_validator(mode="after")
    def bounded(self):
        values = (self.size.x, self.size.y, self.size.z)
        if any(v < 6 or v > 40 for v in values) or self.size.x*self.size.y*self.size.z > 40000:
            raise ValueError("Use box sides from 6 to 40 Å and total volume at most 40,000 Å³.")
        return self


class AD4Settings(Strict):
    runs: int = Field(default=10, ge=1, le=50)
    evaluations: int = Field(default=2500000, ge=100000, le=10000000)


class DockingRequest(Strict):
    receptorId: str = Field(pattern=r"^[a-f0-9]{32}$")
    ligandId: str = Field(pattern=r"^[a-f0-9]{32}$")
    engine: Literal["vina", "autodock4"] = "vina"
    grid: Grid
    exhaustiveness: int | None = Field(default=None, ge=1, le=32)
    ad4: AD4Settings | None = None
    poses: int = Field(default=9, ge=1, le=20)
    seed: int = Field(default=42, ge=1, le=2147483647)

    @model_validator(mode="after")
    def engine_settings(self):
        if self.engine == "vina":
            if self.ad4 is not None: raise ValueError("AutoDock 4 settings cannot be used for Vina.")
            if self.exhaustiveness is None: self.exhaustiveness = 8
        else:
            if self.exhaustiveness is not None: raise ValueError("AutoDock 4 uses LGA runs/evaluations, not Vina exhaustiveness.")
            if self.ad4 is None: self.ad4 = AD4Settings()
        return self
