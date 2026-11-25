import { HeaderLayoutToggle } from "../../Components/navbar/HeaderLayoutToggle";
import { AccountButton, AccountStatus } from "../account/AccountUI";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Editor } from "../../Components/editor/Editor";
import { Icon, BrandMark } from "../../Components/common/Icon";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore } from "../../store/moleculeStore";
import { emptyMolecule } from "../../models/Molecule";
import { downloadBlob } from "../../engine/export";
import { useWorkspaceStore } from "./store";
import { applyGraph, confirmSwitch, flushDraft, initializeEditor, openSavedVersion, subscribeDraft } from "./editorBridge";
import { parseRoute, routeLabels, type WorkspaceRoute } from "./routes";
import { HomePage, LibraryPage, ProjectsPage, PropertiesPage } from "./WorkspacePages";
import { DrugLikenessPage } from "../drugLikeness/DrugLikenessPage";
import { MedicinalChemistryPage } from "../medicinalChemistry/MedicinalChemistryPage";
import { VisualizationsPage } from "../visualizations/VisualizationsPage";
import { SolubilityPage } from "../solubility/SolubilityPage";
import { SimilarityPage } from "../similarity/SimilarityPage";
import { DockingPage } from "../docking/DockingPage";
import { HepaticPage } from "../hepatic/HepaticPage";
import { AdmetDashboard } from "../admet/AdmetDashboard";
import { BatchPage } from "../batch/BatchPage";
import { ReportsPage } from "../reports/ReportsPage";
import { ComparisonPage } from "../comparison/ComparisonPage";
import type { PageActions } from "./pageActions";
import { ProjectDialog, SaveVersionDialog } from "./WorkspaceDialogs";
import { snapshotKey, validateWorkspace } from "./domain";
import type { Project } from "./types";
import "./Workspace.css";

const subscribeRoute=(fn:()=>void)=>{window.addEventListener("hashchange",fn);return()=>window.removeEventListener("hashchange",fn);};
const routeSnapshot=()=>parseRoute(window.location.hash);
const icons:Record<WorkspaceRoute,string>={similarity:"search",home:"grid",editor:"atom",projects:"folder",library:"ring",properties:"flask","drug-likeness":"info","medicinal-chemistry":"search",visualizations:"chart",comparison:"grid",batch:"folder",reports:"save",solubility:"flask",admet:"flask","hepatic-clearance":"flask",docking:"atom"};
const primaryRoutes = ["home", "editor"] as const;
const navigationGroups: { label: string; routes: WorkspaceRoute[] }[] = [
  { label: "Workspace", routes: ["projects", "library", "batch", "reports"] },
  { label: "Features", routes: ["docking", "similarity", "properties", "drug-likeness", "medicinal-chemistry", "visualizations", "comparison", "admet"] },
];
export function WorkspaceShell({onIntro}:{onIntro:()=>void}) {
  const route=useSyncExternalStore(subscribeRoute,routeSnapshot);
  const {data,ready,writable,error,pending}=useWorkspaceStore();
  const theme=useUIStore(s=>s.theme);
  const compactHeader=useUIStore(s=>s.editorCompactHeader);
  const molecule=useMoleculeStore(s=>s.molecule);
  const [dialog,setDialog]=useState<"save"|"project"|null>(null),[project,setProject]=useState<Project|undefined>();
  const [booted,setBooted]=useState(false),[busy,setBusy]=useState(false),[actionError,setActionError]=useState("");
  const backupInput=useRef<HTMLInputElement>(null);
  useEffect(()=>{
    let alive=true,unsubscribe:(()=>void)|undefined;
    initializeEditor().catch(e=>{if(alive)setActionError((e as Error).message);}).finally(()=>{
      if(alive){unsubscribe=subscribeDraft();setBooted(true);}
    });
    return()=>{alive=false;unsubscribe?.();};
  },[]);
  const navigate=useCallback((r:WorkspaceRoute)=>{window.location.hash=`/${r}`;useUIStore.getState().set({dialog:null});},[]);
  const close=useCallback(()=>setDialog(null),[]);
  const save=useCallback(()=>{if(!useMoleculeStore.getState().molecule.atoms.length){useUIStore.getState().notify("Draw or import a molecule before saving a version.");return;}setDialog("save");},[]);
  const perform=async(fn:()=>Promise<void>)=>{setBusy(true);setActionError("");try{await fn();}catch(e){setActionError((e as Error).message);}finally{setBusy(false);}};
  const actions:PageActions={navigate,save,project:p=>{setProject(p);setDialog("project");},
    newDrawing:()=>{void perform(async()=>{
      if(!confirmSwitch())return;await flushDraft();const graph=emptyMolecule();
      await useWorkspaceStore.getState().newDraft(graph);applyGraph(graph);
      useUIStore.getState().set({tool:"draw",atom:"C",zoom:1,pan:{x:0,y:0}});navigate("editor");
    });},
    smiles:()=>{navigate("editor");useUIStore.getState().set({dialog:"smiles"});},
    open:(id,destination="editor")=>{void perform(async()=>{if(await openSavedVersion(id))navigate(destination);});},
  };
  const version=data.versions.find(v=>v.id===data.active.versionId), activeProject=data.projects.find(p=>p.id===data.active.projectId);
  const versionLabel=version?(snapshotKey(version.graph)===snapshotKey(molecule)?`Saved version ${version.number}`:`Draft from v${version.number}`):"Local draft";
  const navigationLink = (r: WorkspaceRoute) => <a key={r} href={`#/${r}`} aria-current={(route===r||(r==="admet"&&(route==="solubility"||route==="hepatic-clearance")))?"page":undefined}>{["editor","docking","admet","properties","similarity"].includes(r)?<span aria-hidden="true" className="ws-module-icon" style={{maskImage:`url(${import.meta.env.BASE_URL}navigation/${r}.${r==="similarity"?"svg":"png"})`,WebkitMaskImage:`url(${import.meta.env.BASE_URL}navigation/${r}.${r==="similarity"?"svg":"png"})`}}/>:<Icon name={icons[r]} size={21}/>}<span>{routeLabels[r]}</span></a>;
  return <div className={`workspace-shell ${route==="editor"&&compactHeader?"editor-focus-mode":""}`}>
    <aside className="ws-rail"><button className="ws-symbol" aria-label="ChemEase Home" onClick={()=>navigate("home")}><BrandMark size={30}/></button><nav aria-label="Workspace modules"><div className="ws-nav-primary">{primaryRoutes.map(navigationLink)}</div>{navigationGroups.map(group=><section className="ws-nav-section" key={group.label} aria-label={group.label}><span className="ws-nav-heading" aria-hidden="true">{group.label}</span>{group.routes.map(navigationLink)}</section>)}</nav><button className="ws-intro-link" onClick={onIntro}>View intro</button></aside>
    <div className="ws-main"><header id="workspace-header" className="ws-header"><div className="ws-desktop-title"><span className="eyebrow">{route==="editor"&&compactHeader?"EDITOR":`CHEMEASE / ${routeLabels[route].toUpperCase()}`}</span><strong title={molecule.metadata.name}>{molecule.metadata.name}</strong></div><label className="ws-mobile-navigation"><span className="sr-only">Workspace page</span><select aria-label="Workspace page" value={route==="solubility"||route==="hepatic-clearance"?"admet":route} onChange={e=>navigate(e.target.value as WorkspaceRoute)}>{primaryRoutes.map(r=><option key={r} value={r}>{routeLabels[r]}</option>)}{navigationGroups.map(group=><optgroup key={group.label} label={group.label}>{group.routes.map(r=><option key={r} value={r}>{routeLabels[r]}</option>)}</optgroup>)}</select></label><div className="ws-header-context"><span title={activeProject?.name}>{activeProject?.name??"Personal workspace"}</span><small>{pending?"Saving draft…":versionLabel}</small></div><button className="secondary ws-theme-toggle" aria-label={theme==="light"?"Switch to dark mode":"Switch to light mode"} title={theme==="light"?"Switch to dark mode":"Switch to light mode"} onClick={()=>useUIStore.getState().setTheme(theme==="light"?"dark":"light")}><Icon name={theme==="light"?"moon":"sun"} size={18}/></button>{route==="editor"&&<HeaderLayoutToggle/>}<AccountButton/><button className="primary ws-save" disabled={!booted||!writable||busy||!!pending} onClick={save}><Icon name="save" size={16}/><span>Save version</span></button></header>
    <AccountStatus/>
    {(error||actionError)&&<div className="ws-error" role="alert"><span>{actionError||error} Your current drawing remains available. Export a backup before clearing browser storage.</span><button className="secondary" disabled={busy||!!pending} onClick={()=>{setActionError("");if(error)window.location.reload();}}> {error?"Reload storage":"Dismiss"}</button></div>}
    <div className="ws-content" aria-busy={!booted||busy}>{!booted||!ready?<div className="ws-empty" role="status">Opening your workspace…</div>:<>
      {route==="editor"?<Editor onIntro={onIntro} onSaveVersion={save} onLibrary={()=>navigate("library")}/>:<main className="ws-scroll" key={route}>
        {route==="home"&&<HomePage actions={actions}/>}{route==="projects"&&<ProjectsPage actions={actions}/>}
        {route==="library"&&<LibraryPage actions={actions} onBackup={()=>{void perform(async()=>{
          // Export remains usable if browser persistence failed; include the live drawing.
          await flushDraft().catch(()=>undefined);
          const backup=structuredClone(useWorkspaceStore.getState().data);
          backup.draft=structuredClone(useMoleculeStore.getState().molecule);
          downloadBlob(new Blob([JSON.stringify(backup)],{type:"application/json"}),"ChemEase-workspace-backup.json");
        });}} onRestore={()=>backupInput.current?.click()}/>}
        {route==="properties"&&<PropertiesPage actions={actions}/>}
        {route==="drug-likeness"&&<DrugLikenessPage actions={actions}/>}
        {route==="medicinal-chemistry"&&<MedicinalChemistryPage actions={actions}/>}
        {route==="visualizations"&&<VisualizationsPage actions={actions}/>}{route==="comparison"&&<ComparisonPage actions={actions}/>}{route==="batch"&&<BatchPage actions={actions}/>}{route==="reports"&&<ReportsPage actions={actions}/>}{route==="solubility"&&<SolubilityPage actions={actions}/>}{route==="admet"&&<AdmetDashboard actions={actions}/>}{route==="hepatic-clearance"&&<HepaticPage actions={actions}/>}{route==="docking"&&<DockingPage actions={actions}/>}{route==="similarity"&&<SimilarityPage actions={actions}/>}
      </main>}
    </>}</div><footer className="ws-mobile-footer"><span title={molecule.metadata.name}>{molecule.metadata.name} · {pending?"Saving…":versionLabel}</span><button onClick={onIntro}>View intro</button></footer></div>
    <input ref={backupInput} hidden type="file" accept="application/json,.json" aria-label="Restore workspace backup" onChange={e=>{
      const file=e.target.files?.[0];e.target.value="";if(!file)return;
      void perform(async()=>{
        if(file.size>25*1024*1024)throw new Error("Choose a workspace backup smaller than 25 MB.");
        const input=JSON.parse(await file.text()) as unknown;
        validateWorkspace(structuredClone(input),data.ownerId);
        if(!window.confirm("Replace all projects, versions, saved results, and the current drawing in the current workspace with this backup? Export your current workspace first to keep a copy."))return;
        await flushDraft();await useWorkspaceStore.getState().restore(input);
        const restored=useWorkspaceStore.getState().data;
        applyGraph(restored.draft??restored.versions.find(v=>v.id===restored.active.versionId)?.graph??emptyMolecule());
        useUIStore.getState().notify("Workspace backup restored. Stored results retain their recorded engine and values.");
      });
    }}/>
    {dialog==="save"&&<SaveVersionDialog onClose={close}/>}{dialog==="project"&&<ProjectDialog project={project} onClose={close}/>}
    {busy&&<div className="ws-busy" role="status">Updating workspace…</div>}
  </div>;
}
