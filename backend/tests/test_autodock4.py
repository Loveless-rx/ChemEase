import pytest
from docking.schemas import DockingRequest
from docking.autodock4 import parameters, parse_dlg
from docking.engines import DockingManager


def request(**kwargs):
    return DockingRequest(receptorId="a"*32,ligandId="b"*32,engine="autodock4",grid={"center":{"x":1.,"y":2.,"z":3.},"size":{"x":20.,"y":20.1,"z":21.}},ad4={"runs":3,"evaluations":100000},poses=2,**kwargs)


def atom(serial=1, x=0., kind="C"):
    return f"ATOM  {serial:5d}  C   UNL A   1    {x:8.3f}{0.:8.3f}{0.:8.3f}{1.:6.2f}{0.:6.2f}    {0.:6.3f} {kind:<2}"


def ligand(): return "REMARK SMILES C\nREMARK SMILES IDX 1 1\nROOT\n"+atom()+"\nENDROOT\nTORSDOF 0\n"


def dlg():
    text=""
    for run,energy in [(1,-3.),(2,-5.),(3,-4.)]:
        block=f"MODEL {run}\nUSER    Estimated Free Energy of Binding    = {energy} kcal/mol\n"+atom(x=float(run))+"\nENDMDL\n"
        text+="".join("DOCKED: "+line+"\n" for line in block.splitlines())
    return text+"1 1 2 0 RANKING\n1 2 3 0 RANKING\n2 1 1 0 RANKING\nSuccessful Completion\n"


def test_engine_specific_settings_are_not_interchangeable():
    assert request().exhaustiveness is None
    for args in ({"exhaustiveness":8},{"seed":0}):
        with pytest.raises(ValueError):request(**args)
    base=request().model_dump();base["engine"]="vina"
    with pytest.raises(ValueError):DockingRequest(**base)
    base["ad4"]=None;assert DockingRequest(**base).exhaustiveness==8
    for runs,evals in [(0,100000),(51,100000),(1,99999),(1,10000001)]:
        base=request().model_dump();base["ad4"]={"runs":runs,"evaluations":evals}
        with pytest.raises(ValueError):DockingRequest(**base)


def test_gpf_rounds_up_even_intervals_and_dpf_records_native_lga_settings():
    gpf,dpf,p,types=parameters(request(seed=2147483647),atom(),ligand())
    assert "npts 54 54 56" in gpf and p["effectiveGrid"]["size"]=={"x":20.25,"y":20.25,"z":21.}
    assert "spacing 0.375" in gpf and types==["C"]
    assert "map receptor.C.map" in dpf and "ga_run 3" in dpf and "ga_num_evals 100000" in dpf
    assert "seed 2147483647 2" in dpf and "unbound_model bound" in dpf
    assert "exhaustiveness" not in dpf


def test_macrocycles_nonfinite_charges_and_excess_torsions_are_refused():
    for text in [ligand().replace(" C "," G0"),ligand().replace("TORSDOF 0","TORSDOF 33"),ligand().replace("0.000 C", "  nan C")]:
        with pytest.raises(ValueError):parameters(request(),atom(),text)


def test_dlg_selects_native_cluster_leads_by_energy_and_restores_meeko_tree():
    pdbqt,rows=parse_dlg(dlg(),ligand(),3,2)
    assert [r["sourceRun"] for r in rows]==[2,1]
    assert [r["affinity"] for r in rows]==[-5.,-3.]
    assert all(r["rmsdLower"] is None and r["rmsdUpper"] is None for r in rows)
    assert pdbqt.count("REMARK SMILES C")==2 and pdbqt.count("ROOT\n")==4
    assert "REMARK VINA RESULT" not in pdbqt


@pytest.mark.parametrize("change",[
    lambda s:s.replace("Successful Completion","failed"),
    lambda s:s.replace("1 2 3 0 RANKING\n",""),
    lambda s:s.replace("MODEL 3","MODEL 2"),
    lambda s:s.replace("ENDMDL","END",1),
    lambda s:s.replace("-5.0 kcal/mol","nan kcal/mol"),
    lambda s:s.replace("ATOM      1","ATOM      2",1),
])
def test_partial_malformed_or_identity_changed_dlg_is_never_published(change):
    with pytest.raises(ValueError):parse_dlg(change(dlg()),ligand(),3,2)


def test_missing_autogrid_disables_ad4_even_when_autodock_exists(monkeypatch):
    manager=DockingManager();engine=manager.engine("autodock4")
    monkeypatch.setattr(engine,"autogrid",lambda:None)
    assert not next(e for e in manager.capabilities() if e["id"]=="autodock4")["available"]
    with pytest.raises(RuntimeError):engine.command(request())


def test_invalid_version_output_disables_engine_instead_of_crashing_health(monkeypatch):
    from types import SimpleNamespace
    import docking.engines as engines
    engine=DockingManager().engine("autodock4")
    monkeypatch.setattr(engines.subprocess,"run",lambda *a,**k:SimpleNamespace(stdout="",stderr=""))
    with pytest.raises(ValueError):engine.tool_version("configured-binary","AutoDock")
