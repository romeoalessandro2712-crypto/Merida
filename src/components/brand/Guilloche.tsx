import { cn } from "@/lib/format";

/**
 * Watch-dial "guilloché" rosette drawn in SVG: 36 overlapping circles, rings and
 * minute ticks. Inherits colour from `currentColor` (use text-gold).
 */
const ROSETTE = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2;
  return { cx: +(Math.cos(a) * 230).toFixed(2), cy: +(Math.sin(a) * 230).toFixed(2) };
});
const TICKS = Array.from({ length: 120 }, (_, i) => {
  const a = (i / 120) * Math.PI * 2;
  const inner = i % 10 === 0 ? 450 : 472;
  return {
    x1: +(Math.cos(a) * inner).toFixed(2),
    y1: +(Math.sin(a) * inner).toFixed(2),
    x2: +(Math.cos(a) * 490).toFixed(2),
    y2: +(Math.sin(a) * 490).toFixed(2),
  };
});

export function Guilloche({ className, spin = "slow" }: { className?: string; spin?: "slow" | "rev" | "none" }) {
  return (
    <svg
      viewBox="-500 -500 1000 1000"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      className={cn(spin === "slow" && "spin-slow", spin === "rev" && "spin-rev", className)}
    >
      <g strokeWidth={0.7}>
        {ROSETTE.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={230} />
        ))}
      </g>
      <g strokeWidth={0.8} opacity={0.7}>
        {[60, 120, 470, 495].map((r) => (
          <circle key={r} r={r} />
        ))}
      </g>
      <g strokeWidth={1} opacity={0.6}>
        {TICKS.map((t, i) => (
          <line key={i} {...t} />
        ))}
      </g>
    </svg>
  );
}
