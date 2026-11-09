import { useEffect, useRef, useId, type ReactNode } from "react";
import { IconButton } from "./IconButton";
import "../dialogs/Dialog.css";
export function Modal({
  title,
  children,
  onClose,
  wide = false,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const node = ref.current;
    node?.focus();
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab" && node) {
        const items = [
          ...node.querySelectorAll<HTMLElement>(
            'button:not(:disabled),input,select,textarea,[tabindex="0"]',
          ),
        ].filter(item => item.tabIndex >= 0 && !item.hidden && item.getClientRects().length > 0);
        const first = items[0],
          last = items.at(-1);
        if (
          e.shiftKey &&
          (document.activeElement === first || document.activeElement === node)
        ) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", fn, true);
    return () => {
      document.removeEventListener("keydown", fn, true);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        className={`modal ${wide ? "wide" : ""} ${className}`}
        tabIndex={-1}
        ref={ref}
      >
        <header className="modal-header">
          <div>
            <span className="eyebrow muted">ChemEase / workspace</span>
            <h2 id={id}>{title}</h2>
          </div>
          <IconButton label="Close dialog" icon="close" onClick={onClose} />
        </header>
        {children}
      </div>
    </div>
  );
}
