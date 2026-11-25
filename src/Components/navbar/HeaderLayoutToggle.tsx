import { useUIStore } from '../../store/chemUIStore';
import './HeaderLayoutToggle.css';

export function HeaderLayoutToggle() {
  const compact = useUIStore(s => s.editorCompactHeader);
  return <button className={`header-layout-toggle ${compact ? 'is-compact' : ''}`}
    aria-label={compact ? 'Expand editor header' : 'Collapse editor header'}
    aria-expanded={!compact} aria-controls="workspace-header"
    title={compact ? 'Full view · restore all header controls' : 'Focus view · more room for your molecule'}
    onClick={() => {
      useUIStore.getState().set({ editorCompactHeader: !compact });
      requestAnimationFrame(() => {
        const selector = compact ? '[aria-label="Collapse editor header"]' : '[aria-label="Expand editor header"]';
        [...document.querySelectorAll<HTMLButtonElement>(selector)].find(button => button.getClientRects().length > 0)?.focus({ preventScroll: true });
      });
    }}>
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="3" width="15" height="14" rx="3" stroke="currentColor" strokeWidth="1.25"/>
      <path d={compact ? 'M3 7h14' : 'M3 7h14M3 10h14'} stroke="currentColor" strokeWidth="1.25"/>
      <rect x="5" y={compact ? 10 : 12} width="10" height="2" rx="1" fill="currentColor" opacity=".3"/>
    </svg>
    <span>{compact ? 'Full view' : 'Focus view'}</span>
  </button>;
}
