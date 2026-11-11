import { useRef } from "react";
import { Logo, Icon } from "../common/Icon";
import { IconButton } from "../common/IconButton";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useHistoryStore } from "../../store/historyStore";
import { parseMolecule } from "../../utils/storage";
import "./Navbar.css";
export function Navbar({onSaveVersion}:{onSaveVersion?:()=>void}) {
  const tool = useUIStore((s) => s.tool),
    theme = useUIStore((s) => s.theme);
  const undo = useHistoryStore((s) => s.past.length),
    redo = useHistoryStore((s) => s.future.length);
  const m = useMoleculeStore((s) => s.molecule),
    saved = useMoleculeStore((s) => s.savedFingerprint);
  const input = useRef<HTMLInputElement>(null);
  const dirty = fingerprint(m) !== saved;
  const set = useUIStore.getState().set;
  return (
    <nav className="navbar" aria-label="Editor controls">
      <button
        className="brand-button"
        title="About ChemEase"
        onClick={() => set({ dialog: "help" })}
      >
        <Logo />
      </button>
      <div className="nav-divider" />
      <div className="nav-tools">
        {(
          [
            ["select", "V"],
            ["erase", "E"],
            ["lasso", "L"],
            ["pan", "Space"],
          ] as const
        ).map(([t, key]) => (
          <button
            key={t}
            className={`nav-tool ${tool === t ? "active" : ""}`}
            aria-label={`${t[0].toUpperCase() + t.slice(1)} tool`}
            aria-pressed={tool === t}
            title={`${t[0].toUpperCase() + t.slice(1)} (${key})`}
            onClick={() => set({ tool: t, pendingAtom: null })}
          >
            <Icon name={t} size={16} />
            <span>{t[0].toUpperCase() + t.slice(1)}</span>
          </button>
        ))}
      </div>
      <div className="nav-divider" />
      <IconButton
        label="Undo (Ctrl/⌘ Z)"
        icon="undo"
        disabled={!undo}
        onClick={() => useMoleculeStore.getState().undo()}
      />
      <IconButton
        label="Redo (Ctrl/⌘ Shift Z)"
        icon="redo"
        disabled={!redo}
        onClick={() => useMoleculeStore.getState().redo()}
      />
      <div className="nav-divider" />
      <div className="nav-files">
        <button
          className="nav-tool"
          aria-label="New molecule"
          onClick={() => set({ dialog: "new" })}
          title="New molecule (Ctrl/⌘ N)"
        >
          <Icon name="plus" size={16} />
          <span>New</span>
        </button>
        <button
          className="nav-tool"
          onClick={() => input.current?.click()}
          title="Import ChemEase JSON"
          aria-label="Import JSON"
        >
          <Icon name="folder" size={16} />
        </button>
        <button
          className="nav-tool"
          aria-label={onSaveVersion?"Save molecule version":"Save molecule locally"}
          onClick={() => onSaveVersion?onSaveVersion():useMoleculeStore.getState().save()}
          title="Save version (Ctrl/⌘ S)"
        >
          <Icon name="save" size={16} />
          <span>Save</span>
          {dirty && <i className="unsaved-dot" />}
        </button>
        <button
          className="nav-tool export-button"
          aria-label="Export molecule"
          onClick={() => set({ dialog: "export" })}
        >
          <Icon name="export" size={16} />
          <span>Export</span>
        </button>
      </div>
      <div className="nav-spacer" />
      <span className="local-status">
        <i />
        {dirty ? "Unsaved changes" : "On your device"}
      </span>
      <div className="nav-divider" />
      <IconButton
        label={
          theme === "light" ? "Switch to dark theme" : "Switch to light theme"
        }
        icon={theme === "light" ? "moon" : "sun"}
        onClick={() =>
          useUIStore.getState().setTheme(theme === "light" ? "dark" : "light")
        }
      />
      <IconButton
        label="Settings"
        icon="settings"
        onClick={() => set({ dialog: "settings" })}
      />
      <IconButton
        label="Help and keyboard shortcuts"
        icon="help"
        onClick={() => set({ dialog: "help" })}
      />
      <input
        ref={input}
        type="file"
        accept=".json,application/json"
        className="sr-only"
        aria-label="Import molecule JSON file"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          try {
            if (file.size > 2_000_000)
              throw new Error("File exceeds the 2 MB import limit.");
            const next = parseMolecule(await file.text());
            if (
              dirty &&
              !window.confirm(
                "Replace unsaved structure? This change can be undone.",
              )
            )
              return;
            useMoleculeStore.getState().replace(next);
            useUIStore.getState().notify("Molecule imported.");
          } catch (err) {
            useUIStore.getState().notify((err as Error).message);
          }
        }}
      />
    </nav>
  );
}
