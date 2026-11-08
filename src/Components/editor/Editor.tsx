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
export function Editor({ onIntro }: { onIntro: () => void }) {
  const dialog = useUIStore((s) => s.dialog);
  const [mobilePanel, setMobilePanel] = useState(false),
    [mobileTools, setMobileTools] = useState(false);
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
        <span>Desktop recommended · compact editing mode</span>
        <button onClick={() => setMobileTools(!mobileTools)}>
          <Icon name="atom" size={14} />
          Tools
        </button>
        <button onClick={() => setMobilePanel(!mobilePanel)}>
          <Icon name="info" size={14} />
          Info
        </button>
      </div>
      <div
        className={`editor-body ${mobilePanel ? "mobile-info-open" : ""} ${mobileTools ? "mobile-tools-open" : ""}`}
      >
        <div className="toolbar-container">
          <Toolbar />
        </div>
        <Canvas />
        <div className="info-container">
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
      {dialog === "help" && <HelpDialog onClose={close} />}
    </main>
  );
}
