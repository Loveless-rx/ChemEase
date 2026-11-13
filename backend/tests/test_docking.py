import io
import json
import math
import pytest
from fastapi.testclient import TestClient
from docking import storage as db
from docking.api import app
from docking.jobs import Jobs
from docking.schemas import DockingRequest, Grid, ReceptorPreparation, LigandPreparation
from docking.structures import inspect_pdb, clean_pdb, atoms
from docking.interactions import contacts
from docking.engines import DockingManager
from docking.pipeline import prepare_ligand, artifact, publish_files

OWNER="a"*32
OTHER="b"*32


def atom(serial,x,y,z,name="CA",res="ALA",chain="A",num=1,element="C",kind="ATOM",alt=" ",occupancy=1):
    return f"{kind:<6}{serial:5d} {name:^4}{alt}{res:>3} {chain}{num:4d}    {x:8.3f}{y:8.3f}{z:8.3f}{occupancy:6.2f}{20:6.2f}          {element:>2}"


def protein():
    return "\n".join(atom(i+1,i*1.4,0,0,num=i+1) for i in range(25))+"\nEND\n"


@pytest.fixture
def isolated(tmp_path,monkeypatch):
    monkeypatch.setattr(db,"ROOT",tmp_path)
    return tmp_path


@pytest.fixture
def client(isolated,monkeypatch):
    # Queue/authorization tests intentionally isolate chemistry execution.
    monkeypatch.setattr(Jobs,"run",lambda *_:None)
    with TestClient(app) as c:
        c.headers["X-ChemEase-Client"]=OWNER
        yield c


def test_pdb_inspection_and_cleanup_preserve_selected_identity():
    pdb=protein().replace("END\n","")+"\n"+"\n".join(atom(100+i,i,2,0,name=f"C{i}",res="LIG",num=100,kind="HETATM") for i in range(4))+"\n"+atom(200,0,0,0,name="O",res="HOH",num=200,kind="HETATM",element="O")
    meta=inspect_pdb(pdb)
    assert meta["chains"]==[{"id":"A","atoms":25}]
    assert len(meta["sites"])==1 and meta["sites"][0]["label"].startswith("LIG")
    assert meta["nonProteinCount"]==2
    cleaned=clean_pdb(pdb,["A"])
    assert "LIG" not in cleaned and "HOH" not in cleaned
    assert len(atoms(cleaned))==25


def test_altloc_and_first_model_are_explicit():
    pdb=atom(1,1,0,0,alt="A",occupancy=.2)+"\n"+atom(2,2,0,0,alt="B",occupancy=.8)+"\nENDMDL\n"+atom(3,99,0,0)
    rows=atoms(pdb);assert len(rows)==1 and rows[0]["xyz"][0]==2
    assert rows[0]["line"][16]==" "


def test_bad_structures_fail_instead_of_silent_protein_changes():
    with pytest.raises(ValueError):inspect_pdb("not a PDB")
    with pytest.raises(ValueError):atoms(atom(1,float("nan"),0,0))
    with pytest.raises(ValueError):clean_pdb(protein()+atom(100,0,0,0,res="UNK"),["A"])
    with pytest.raises(ValueError):clean_pdb(protein(),["B"])


def test_explicit_hydrogen_bond_geometry_and_hydrophobic_contact_rules():
    def pdbqt(line,kind):return line+f"    0.000 {kind}"
    ligand="\n".join([pdbqt(atom(1,0,0,0,name="N",element="N"),"N"),pdbqt(atom(2,1,0,0,name="H",element="H"),"HD"),pdbqt(atom(3,0,3,0),"C")])
    receptor="\n".join([pdbqt(atom(10,2.8,0,0,name="O",element="O",res="ASP"),"OA"),pdbqt(atom(11,2,3,0,res="PHE"),"A")])
    c=contacts(receptor,ligand,{11},{3})["contacts"]
    assert any(r["type"]=="hydrogen-bond candidate" and r["angle"]==180 for r in c)
    assert any(r["type"]=="hydrophobic carbon contact" for r in c)
    wrong=pdbqt(atom(10,-2.8,0,0,name="O",element="O"),"OA")
    assert not any(r["type"]=="hydrogen-bond candidate" for r in contacts(wrong,ligand,set(),{3})["contacts"])


def test_settings_reject_nan_unbounded_grids_and_unconfirmed_cleanup():
    for size in (0,5,41,math.inf,math.nan):
        with pytest.raises(ValueError):Grid(center={"x":0,"y":0,"z":0},size={"x":size,"y":20,"z":20})
    with pytest.raises(ValueError):Grid(center={"x":0,"y":0,"z":0},size={"x":40,"y":40,"z":40})
    with pytest.raises(ValueError):ReceptorPreparation(receptorId="a"*32,chains=["A"],removeNonProteinConfirmed=False)
    with pytest.raises(ValueError):ReceptorPreparation(receptorId="a"*32,chains=["A","A"],removeNonProteinConfirmed=True)
    with pytest.raises(ValueError):LigandPreparation(content="CC",format="smiles",ph=13,source={"kind":"smiles","name":"Test"})


def test_engine_manager_uses_argv_not_shell_and_rejects_unimplemented_engines(monkeypatch):
    request=DockingRequest(receptorId="a"*32,ligandId="b"*32,grid={"center":{"x":1,"y":2,"z":3},"size":{"x":20,"y":20,"z":20}})
    manager=DockingManager();args=manager.engine("vina").command(request)
    assert args[args.index("--center_x")+1]=="1.0" and "--seed" in args
    monkeypatch.setattr(manager.engine("autodock4"),"executable",lambda:"trusted-autodock4")
    monkeypatch.setattr(manager.engine("autodock4"),"autogrid",lambda:"trusted-autogrid4")
    assert manager.engine("autodock4").command(request)[1:]==["-p","docking.dpf","-l","docking.dlg"]
    assert not next(e for e in manager.capabilities() if e["id"]=="rdock")["available"]
    for name in ("rdock","flexaid","../../cmd.exe"):
        with pytest.raises(ValueError):manager.engine(name)


def test_scope_authorization_blocks_cross_workspace_records(client):
    raw=client.post("/api/docking/receptors",files={"file":("protein.pdb",protein())})
    assert raw.status_code==200
    identifier=raw.json()["id"]
    assert client.get(f"/api/docking/artifacts/{identifier}/pdb").status_code==200
    assert client.get(f"/api/docking/artifacts/{identifier}/pdb",headers={"X-ChemEase-Client":OTHER}).status_code==404
    assert client.get("/api/docking/jobs",headers={"X-ChemEase-Client":"bad"}).status_code==400


def test_missing_ad4_installation_is_service_unavailable_not_a_server_crash(client,monkeypatch):
    from docking.engines import AutoDock4
    monkeypatch.setattr(AutoDock4,"autogrid",lambda _:None)
    response=client.post("/api/docking/jobs/dock",json={"engine":"autodock4","receptorId":"a"*32,"ligandId":"b"*32,"grid":{"center":{"x":0.,"y":0.,"z":0.},"size":{"x":20.,"y":20.,"z":20.}}})
    assert response.status_code==503 and "AutoGrid" in response.json()["detail"]


def test_upload_validation_and_pdb_id_do_not_accept_arbitrary_urls(client):
    assert client.post("/api/docking/receptors",data={"pdbId":"https://localhost/secret"}).status_code==400
    assert client.post("/api/docking/receptors",files={"file":("x.pdb","bad")}).status_code==400
    assert client.post("/api/docking/receptors",headers={"Content-Length":str(20*1024*1024)}).status_code==413


def test_queue_cancel_and_nonterminal_results_are_not_exposed(client):
    response=client.post("/api/docking/jobs/ligand",json={"content":"CCO","format":"smiles","source":{"kind":"smiles","name":"Ethanol"}})
    assert response.status_code==202
    identifier=response.json()["id"]
    db.update(identifier,result={"shouldNotBePublished":True},files={})
    assert "result" not in client.get(f"/api/docking/jobs/{identifier}").json()
    cancelled=client.post(f"/api/docking/jobs/{identifier}/cancel").json()
    assert cancelled["status"]=="cancelled"
    assert client.get(f"/api/docking/jobs/{identifier}/archive").status_code==409
    assert client.get(f"/api/docking/jobs/{identifier}",headers={"X-ChemEase-Client":OTHER}).status_code==404


def test_failed_preparation_assets_are_not_usable(client):
    parent=db.create(OWNER,"job",status="cancelled",task="ligand")
    record=db.create(OWNER,"ligand",parentJobId=parent["id"],ready=False)
    (db.folder(record["id"])/"ligand.sdf").write_text("partial")
    publish_files(record,{"sdf":"ligand.sdf"})
    assert client.get("/api/docking/assets").json()["ligands"]==[]
    assert client.get(f"/api/docking/artifacts/{record['id']}/sdf").status_code==409


def test_artifact_hash_validation_rejects_changed_input(isolated):
    record=db.create(OWNER,"ligand",ready=False)
    (db.folder(record["id"])/"ligand.sdf").write_text("original")
    record=publish_files(record,{"sdf":"ligand.sdf"})
    (db.folder(record["id"])/"ligand.sdf").write_text("modified")
    with pytest.raises(ValueError,match="hash changed"):artifact(record,"sdf")


@pytest.mark.parametrize("content,format",[("C.C","smiles"),("not-smiles","smiles"),("[Zn]","smiles"),("CC(F)Cl","smiles"),("bad sdf","sdf")])
def test_ligand_preparation_fails_invalid_ambiguous_or_unsupported_input(isolated,content,format):
    request={"content":content,"format":format,"ph":7.4,"source":{"kind":"smiles" if format=="smiles" else "sdf","name":"Invalid test"}}
    with pytest.raises((ValueError,RuntimeError)):
        prepare_ligand({"id":"a"*32,"scope":OWNER,"request":request},lambda *_:None,lambda:None)


def test_real_ligand_preparation_produces_3d_meeko_inputs(isolated):
    from rdkit import Chem
    parent=db.create(OWNER,"job",status="running",task="ligand")
    parent["request"]={"content":"CC(=O)Oc1ccccc1C(=O)O","format":"smiles","ph":7.4,"source":{"kind":"smiles","name":"Aspirin"}}
    result=prepare_ligand(parent,lambda *_:None,lambda:None)
    assert result["ligands"]
    for record in result["ligands"]:
        assert "ROOT" in artifact(record,"pdbqt").read_text()
        mol=next(Chem.SDMolSupplier(str(artifact(record,"sdf")),removeHs=False))
        assert mol.GetConformer().Is3D() and record["convergedConformers"]>=1
        assert record["inputSmiles"]=="CC(=O)Oc1ccccc1C(=O)O"


def test_restart_marks_interrupted_jobs_failed(isolated):
    record=db.create(OWNER,"job",task="dock",status="running")
    jobs=Jobs()
    try:assert db.get(record["id"])["status"]=="failed"
    finally:jobs.close()


def test_only_one_backend_can_own_a_data_directory(isolated):
    first=Jobs()
    try:
        with pytest.raises(RuntimeError,match="Another docking backend"):Jobs()
    finally:first.close()


def test_worker_launch_failure_becomes_a_failed_job(isolated,monkeypatch):
    manager=Jobs();record=db.create(OWNER,"job",task="ligand",status="queued")
    def fail(*args,**kwargs):raise OSError("process start failed")
    monkeypatch.setattr("subprocess.Popen",fail)
    try:
        manager.run(record["id"])
        assert db.get(record["id"])["status"]=="failed"
        assert "process start failed" in db.get(record["id"])["message"]
    finally:manager.close()


def test_selected_seqres_is_preserved_for_missing_loop_audit():
    pdb="SEQRES   1 A   26  ALA ALA ALA\nSEQRES   1 B    2  ALA GLY\n"+protein()
    cleaned=clean_pdb(pdb,["A"])
    assert "SEQRES   1 A" in cleaned and "SEQRES   1 B" not in cleaned


def test_polar_carbons_are_not_hydrophobic_features():
    from docking.features import carbon_only_neighbors
    # Acetone: the carbonyl carbon (1) has an oxygen neighbor and is excluded.
    assert carbon_only_neighbors({0:"C",1:"C",2:"O",3:"C"},[(0,1),(1,2),(1,3)])=={0,3}
    # A carbon directly bonded to an amine is excluded too.
    assert carbon_only_neighbors({0:"C",1:"N"},[(0,1)])==set()


def test_supplied_ligand_charge_can_be_preserved(isolated):
    parent=db.create(OWNER,"job",status="running",task="ligand")
    parent["request"]={"content":"CN","format":"smiles","ph":7.4,"protonation":"supplied","source":{"kind":"smiles","name":"Supplied methylamine"}}
    result=prepare_ligand(parent,lambda *_:None,lambda:None)
    assert len(result["ligands"])==1 and result["ligands"][0]["charge"]==0
    assert "annotation only" in result["ligands"][0]["warnings"][0]
