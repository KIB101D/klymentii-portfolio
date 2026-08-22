import type { CSSProperties } from "react";

interface NodeProps {
  id: "about" | "experience" | "projects" | "contacts";
  label: string;
  float: {
    x: number;
    y: number;
    duration: string;
    delay: string;
  };
  visible: boolean;
  active: boolean;
  onClick: () => void;
  register: (element: HTMLButtonElement | null) => void;
}

export function Node({
  id,
  label,
  float,
  visible,
  active,
  onClick,
  register,
}: NodeProps) {
  return (
    <button
      ref={register}
      className={`node node--${id} ${visible ? "is-in" : ""} ${
        active ? "is-active" : ""
      }`}
      type="button"
      aria-label={label}
      aria-expanded={active}
      onClick={onClick}
    >
      <span
        className="node-float"
        style={
          {
            "--fx": `${float.x}px`,
            "--fy": `${float.y}px`,
            "--fdur": float.duration,
            "--fdelay": float.delay,
          } as CSSProperties
        }
      >
        <span className="node-core">
          <span className="node-label">{label}</span>
        </span>
      </span>
    </button>
  );
}
