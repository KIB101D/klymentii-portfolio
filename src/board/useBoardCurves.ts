import { useEffect, type RefObject } from "react";

interface CurveRefs {
  boardRef: RefObject<HTMLDivElement | null>;
  nodeRefs: RefObject<Array<HTMLButtonElement | null>>;
  curveRefs: RefObject<Array<SVGPathElement | null>>;
}

function center(
  board: HTMLDivElement,
  node: HTMLButtonElement,
): { x: number; y: number } {
  const core = node.querySelector<HTMLElement>(".node-core") ?? node;
  const rect = core.getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2 - boardRect.left,
    y: rect.top + rect.height / 2 - boardRect.top,
  };
}

function straightLine(
  a: { x: number; y: number },
  b: { x: number; y: number },
): string {
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

export function useBoardCurves({ boardRef, nodeRefs, curveRefs }: CurveRefs): void {
  useEffect(() => {
    const board = boardRef.current;
    const nodes = nodeRefs.current;
    const curves = curveRefs.current;

    if (!board || nodes.some((node) => !node) || curves.some((curve) => !curve)) {
      return;
    }

    let rafId = 0;

    const update = () => {
      const centers = nodes.map((node) => center(board, node!));
      curves[0]!.setAttribute("d", straightLine(centers[0], centers[1]));
      curves[1]!.setAttribute("d", straightLine(centers[1], centers[2]));
      curves[2]!.setAttribute("d", straightLine(centers[2], centers[3]));
      rafId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(rafId);
  }, [boardRef, nodeRefs, curveRefs]);
}
