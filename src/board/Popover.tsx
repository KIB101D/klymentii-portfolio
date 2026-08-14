import { useLayoutEffect, useRef, useState } from "react";
import { CONTENT, type NodeKey } from "./content/content";

interface PopoverProps {
  nodeKey: NodeKey;
  anchor: HTMLButtonElement;
  zIndex: number;
  onClose: () => void;
}

interface Position {
  left: number;
  top: number;
}

const placement: Record<NodeKey, { dir: "up" | "right" | "down-left" | "down"; extraGap?: number }> = {
  about: { dir: "up" },
  experience: { dir: "right" },
  projects: { dir: "down-left" },
  contacts: { dir: "down", extraGap: 30 },
};

function getPosition(
  anchor: HTMLButtonElement,
  nodeKey: NodeKey,
  width = 320,
  height = 360,
): Position {
  const core = anchor.querySelector<HTMLElement>(".node-core") ?? anchor;
  const rect = core.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const gap = 22;
  const nodeCenterX = rect.left + rect.width / 2;
  const nodeCenterY = rect.top + rect.height / 2;
  const config = placement[nodeKey];
  const extraGap = config.extraGap ?? 0;

  let left = 0;
  let top = 0;

  switch (config.dir) {
    case "up":
      left = nodeCenterX - width / 2;
      top = rect.top - gap - height;
      break;
    case "down":
      left = nodeCenterX - width / 2;
      top = rect.bottom + gap + extraGap;
      break;
    case "down-left":
      left = nodeCenterX - width + 60;
      top = rect.bottom + gap + extraGap;
      break;
    case "right":
      left = rect.right + gap;
      top = nodeCenterY - height / 2;
      break;
  }

  return {
    left: Math.max(16, Math.min(left, vw - width - 16)),
    top: Math.max(16, Math.min(top, vh - height - 16)),
  };
}

export function Popover({ nodeKey, anchor, zIndex, onClose }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(() => getPosition(anchor, nodeKey));
  const popoverRef = useRef<HTMLDivElement>(null);
  const Content = CONTENT[nodeKey];

  useLayoutEffect(() => {
    const popover = popoverRef.current;
    const update = () => {
      if (!popover) return;
      setPosition(
        getPosition(anchor, nodeKey, popover.offsetWidth || 320, popover.offsetHeight || 360),
      );
    };

    update();

    window.addEventListener("resize", update);
    requestAnimationFrame(() => {
      update();
      setOpen(true);
    });

    return () => window.removeEventListener("resize", update);
  }, [anchor, nodeKey]);

  return (
    <div
      ref={popoverRef}
      className={`node-popover ${open ? "is-open" : ""}`}
      role="dialog"
      aria-label={nodeKey}
      style={{ left: position.left, top: position.top, zIndex }}
    >
      <button className="popover-close" type="button" aria-label="Close" onClick={onClose}>
        ✕
      </button>
      <Content />
    </div>
  );
}
