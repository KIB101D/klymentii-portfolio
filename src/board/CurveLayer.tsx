interface CurveLayerProps {
  register: (index: number, element: SVGPathElement | null) => void;
  drawn: boolean[];
}

export function CurveLayer({ register, drawn }: CurveLayerProps) {
  return (
    <svg
      className="curves"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {[0, 1, 2].map((index) => (
        <path
          key={index}
          ref={(element) => register(index, element)}
          className={`curve-segment ${drawn[index] ? "is-drawn" : ""}`}
          pathLength={1}
        />
      ))}
    </svg>
  );
}
