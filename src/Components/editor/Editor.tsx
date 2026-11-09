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
export function Editor({ onIntro }: { onIntro: () => void }) {
  const dialog = useUIStore((s) => s.dialog);
  const [mobileDrawer, setMobileDrawer] = useState<"tools" | "info" | null>(null);
  useEffect(() => {
    if (!mobileDrawer) return;
    const dismiss = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileDrawer(null);
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [mobileDrawer]);
  useKeyboardShortcuts();
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
      <Navbar />
      <div className="mobile-notice">
        <span>Your molecular workspace</span>
        <button
          aria-expanded={mobileDrawer === "tools"}
          aria-controls="chemistry-tools-panel"
          onClick={() => setMobileDrawer(mobileDrawer === "tools" ? null : "tools")}
        >
          <Icon name="atom" size={14} />
          {mobileDrawer === "tools" ? "Close tools" : "Tools"}
        </button>
        <button
          aria-expanded={mobileDrawer === "info"}
          aria-controls="structure-info-panel"
          onClick={() => setMobileDrawer(mobileDrawer === "info" ? null : "info")}
        >
          <Icon name="info" size={14} />
          {mobileDrawer === "info" ? "Close info" : "Info"}
        </button>
      </div>
      <div
        className={`editor-body ${mobileDrawer === "info" ? "mobile-info-open" : ""} ${mobileDrawer === "tools" ? "mobile-tools-open" : ""}`}
      >
        {mobileDrawer && (
          <button
            className="drawer-backdrop"
            aria-label="Close workspace panel"
            onClick={() => setMobileDrawer(null)}
          />
        )}
        <div className="toolbar-container" id="chemistry-tools-panel">
          <Toolbar />
        </div>
        <Canvas />
        <div className="info-container" id="structure-info-panel">
          <InfoPanel />
        </div>
      </div>
      <StatusBar />
      {dialog === "new" && <NewMoleculeDialog onClose={close} />}{" "}
      {dialog === "export" && <ExportDialog onClose={close} />}{" "}
      {dialog === "analysis" && <AnalysisPanel onClose={close} />}{" "}
      {dialog === "settings" && (
        <SettingsDialog
          onClose={close}
          onIntro={() => {
            close();
            onIntro();
          }}
        />
      )}{" "}
      {dialog === "3d" && <Molecule3DDialog onClose={close} />}
      {dialog === "smiles" && <SmilesDialog onClose={close} />}
      {dialog === "help" && <HelpDialog onClose={close} />}
    </main>
  );
}
