import { useEffect, type RefObject } from "react";

export function useMousePosition(
  boardBgRef: RefObject<HTMLDivElement | null>,
  coordsRef: RefObject<HTMLDivElement | null>,
  formatCoords: (x: number, y: number) => string,
): void {
  useEffect(() => {
    const boardBg = boardBgRef.current;
    const coords = coordsRef.current;
    if (!boardBg || !coords) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pendingEvent: MouseEvent | null = null;
    let rafId = 0;

    const onMouseMove = (event: MouseEvent) => { pendingEvent = event; };
    const tick = () => {
      if (pendingEvent) {
        const event = pendingEvent;
        pendingEvent = null;
        coords.textContent = formatCoords(event.clientX, event.clientY);
        if (!reduceMotion) {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          boardBg.style.transform = `translate(${nx * -24}px, ${ny * -24}px)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [boardBgRef, coordsRef, formatCoords]);
}
