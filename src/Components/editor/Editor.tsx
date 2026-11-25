import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../navbar/Navbar";
import { Toolbar } from "../toolbar/Toolbar";
import { Canvas } from "../canvas/Canvas";
import { InfoPanel } from "../sidebar/InfoPanel";
import { StatusBar } from "../statusbar/StatusBar";
import { AnalysisPanel } from "../sidebar/AnalysisPanel";
import { NewMoleculeDialog } from "../dialogs/NewMoleculeDialog";
import { ExportDialog } from "../dialogs/ExportDialog";
import { SettingsDialog } from "../dialogs/SettingsDialog";
import { HelpDialog } from "../dialogs/HelpDialog";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { Icon } from "../common/Icon";
import "./Editor.css";
import { Molecule3DDialog } from "../viewer/Molecule3DDialog";
import { SmilesDialog } from "../dialogs/SmilesDialog";
import { PeriodicTableDialog } from "../dialogs/PeriodicTableDialog";
export function Editor({ onIntro, onSaveVersion, onLibrary }: { onIntro: () => void; onSaveVersion?:()=>void; onLibrary?:()=>void }) {
  const dialog = useUIStore((s) => s.dialog);
  const toolsOpen = useUIStore(s => s.editorToolsOpen);
  const infoOpen = useUIStore(s => s.editorInfoOpen);
  const [mobileDrawer, setMobileDrawer] = useState<"tools" | "info" | null>(null);
  const focusToggle = (panel: "tools" | "info") => requestAnimationFrame(() => {
    const mobile = window.matchMedia('(max-width: 960px)').matches;
    document.getElementById(`${mobile ? 'editor-toggle' : 'editor-reopen'}-${panel}`)?.focus({preventScroll:true});
  });
  const hidePanel = (panel: "tools" | "info") => {
    if (window.matchMedia('(max-width: 960px)').matches) setMobileDrawer(null);
    else useUIStore.getState().set(panel === 'tools' ? {editorToolsOpen:false} : {editorInfoOpen:false});
    focusToggle(panel);
  };
  const resetLayout = () => {
    useUIStore.getState().set({editorToolsOpen:true,editorInfoOpen:true,expanded:true,editorCompactHeader:false});
    setMobileDrawer(null);
    useUIStore.getState().notify('Editor layout restored. Your molecule is unchanged.');
  };
  useEffect(() => useUIStore.subscribe((state, previous) => {
    if (state.dialog && state.dialog !== previous.dialog) setMobileDrawer(null);
  }), []);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 961px)');
    const update = () => { if (media.matches) setMobileDrawer(null); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!mobileDrawer) return;
    const panel = document.getElementById(mobileDrawer === 'tools' ? 'chemistry-tools-panel' : 'structure-info-panel');
    const focusable = () => [...(panel?.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex="0"]') ?? [])].filter(el=>el.getClientRects().length > 0);
    focusable()[0]?.focus({preventScroll:true});
    const dismiss = (e: KeyboardEvent) => {
      if (useUIStore.getState().dialog) return;
      if (e.key === "Escape") { e.preventDefault(); setMobileDrawer(null); document.getElementById(`editor-toggle-${mobileDrawer}`)?.focus({preventScroll:true}); }
      if (e.key === 'Tab') {
        const items=focusable(),first=items[0],last=items[items.length-1];
        if (e.shiftKey && document.activeElement===first) {e.preventDefault();last?.focus();}
        else if (!e.shiftKey && document.activeElement===last) {e.preventDefault();first?.focus();}
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [mobileDrawer]);
  useKeyboardShortcuts(onSaveVersion);
  const close = useCallback(
    () => useUIStore.getState().set({ dialog: null }),
    [],
  );
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      const s = useMoleculeStore.getState();
      if (fingerprint(s.molecule) !== s.savedFingerprint) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  return (
    <main className="editor">
      <Navbar onSaveVersion={onSaveVersion} onResetLayout={resetLayout}/>
      <div className="mobile-notice">
        <span>Your molecular workspace</span>
        <button
          id="editor-toggle-tools"
          aria-expanded={mobileDrawer === "tools"}
          aria-controls="chemistry-tools-panel"
          onClick={() => {useUIStore.getState().set({expanded:true});setMobileDrawer(mobileDrawer === "tools" ? null : "tools");}}
        >
          <Icon name="atom" size={14} />
          {mobileDrawer === "tools" ? "Close tools" : "Tools"}
        </button>
        <button
          id="editor-toggle-info"
          aria-expanded={mobileDrawer === "info"}
          aria-controls="structure-info-panel"
          onClick={() => setMobileDrawer(mobileDrawer === "info" ? null : "info")}
        >
          <Icon name="info" size={14} />
          {mobileDrawer === "info" ? "Close info" : "Info"}
        </button>
      </div>
      <div
        className={`editor-body ${!toolsOpen ? 'tools-is-collapsed' : ''} ${!infoOpen ? 'info-is-collapsed' : ''} ${mobileDrawer === "info" ? "mobile-info-open" : ""} ${mobileDrawer === "tools" ? "mobile-tools-open" : ""}`}
      >
        {mobileDrawer && (
          <button
            className="drawer-backdrop"
            aria-label="Close workspace panel"
            onClick={() => {setMobileDrawer(null);focusToggle(mobileDrawer);}}
          />
        )}
        {!toolsOpen && <div className="editor-panel-rail editor-tools-rail"><button id="editor-reopen-tools" className="editor-panel-tab" aria-label="Show chemistry tools panel" aria-expanded={false} aria-controls="chemistry-tools-panel" title="Show chemistry tools" onClick={()=>{useUIStore.getState().set({editorToolsOpen:true,expanded:true});requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>('[aria-label="Hide chemistry tools panel"]')?.focus({preventScroll:true}));}}><Icon name="atom" size={19}/><span>Tools</span><span className="editor-panel-plus" aria-hidden="true">+</span></button></div>}
        <div className="toolbar-container" id="chemistry-tools-panel" role={mobileDrawer==='tools'?'dialog':undefined} aria-modal={mobileDrawer==='tools'?true:undefined} aria-label={mobileDrawer==='tools'?'Chemistry tools':undefined}>
          <Toolbar onCollapse={()=>hidePanel('tools')} onOpenPeriodic={() => {
            setMobileDrawer(null);
            useUIStore.getState().set({dialog: "periodic"});
          }}/>
        </div>
        <Canvas />
        <div className="info-container" id="structure-info-panel" role={mobileDrawer==='info'?'dialog':undefined} aria-modal={mobileDrawer==='info'?true:undefined} aria-label={mobileDrawer==='info'?'Structure information':undefined}>
          <InfoPanel onCollapse={()=>hidePanel('info')}/>
        </div>
        {!infoOpen && <div className="editor-panel-rail editor-info-rail"><button id="editor-reopen-info" className="editor-panel-tab" aria-label="Show structure information panel" aria-expanded={false} aria-controls="structure-info-panel" title="Show structure information" onClick={()=>{useUIStore.getState().set({editorInfoOpen:true});requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>('[aria-label="Hide structure information panel"]')?.focus({preventScroll:true}));}}><Icon name="info" size={19}/><span>Info</span><span className="editor-panel-plus" aria-hidden="true">+</span></button></div>}
      </div>
      <StatusBar />
      {dialog === "new" && <NewMoleculeDialog onClose={close} />}{" "}
      {dialog === "export" && <ExportDialog onClose={close} />}{" "}
      {dialog === "analysis" && <AnalysisPanel onClose={close} />}{" "}
      {dialog === "settings" && (
        <SettingsDialog
          onClose={close}
          onLibrary={onLibrary}
          onIntro={() => {
            close();
            onIntro();
          }}
        />
      )}{" "}
      {dialog === "3d" && <Molecule3DDialog onClose={close} />}
      {dialog === "smiles" && <SmilesDialog onClose={close} />}
      {dialog === "periodic" && <PeriodicTableDialog onClose={close} />}
      {dialog === "help" && <HelpDialog onClose={close} />}
    </main>
  );
}
