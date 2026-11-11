import {
  useEffect,
  useState,
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { LandingPage } from "./pages/LandingPage";
import { WorkspaceShell } from "./features/workspace/WorkspaceShell";
import { useUIStore } from "./store/chemUIStore";
import "./App.css";
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      "ChemEase rendering error",
      error.message,
      info.componentStack,
    );
  }
  render() {
    if (this.state.error)
      return (
        <div style={{ padding: 48, maxWidth: 620, margin: "auto" }}>
          <h1>The workspace needs a reset.</h1>
          <p style={{ margin: "20px 0" }}>
            Your saved molecule has not been deleted. Reload to recover the last
            local save.
          </p>
          <button className="primary" onClick={() => location.reload()}>
            Reload ChemEase
          </button>
        </div>
      );
    return this.props.children;
  }
}
export default function App() {
  const [editor, setEditor] = useState(false);
  const theme = useUIStore((s) => s.theme),
    toast = useUIStore((s) => s.toast);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const enter = () => {
    setEditor(true);
    window.scrollTo(0, 0);
  };
  return (
    <ErrorBoundary>
      <div className="app">
        {editor ? (
          <WorkspaceShell
            onIntro={() => {
              setEditor(false);
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          <LandingPage onEnter={enter} />
        )}{" "}
        {toast && (
          <div className="toast" role="status" aria-live="polite">
            {toast}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
