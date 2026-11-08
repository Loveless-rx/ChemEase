import type { ButtonHTMLAttributes } from "react";
import { Icon } from "./Icon";
export function IconButton({
  icon,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: string; label: string }) {
  return (
    <button
      {...props}
      className={`icon-button ${props.className || ""}`}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} />
    </button>
  );
}
