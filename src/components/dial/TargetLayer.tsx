import { bandPath } from "../../lib/dial";
import { CX, CY } from "./Dial";

// All three bands share the same inner/outer radii.
// Painter's order (2 → 3 → 4) makes each narrower band cover the one below it,
// producing a visible bullseye without needing separate ring geometry.
const INNER_R = 120;
const OUTER_R = 340;

const BANDS = [
  { points: 2, halfWidth: 17, color: "var(--color-band-2)" },
  { points: 3, halfWidth: 10, color: "var(--color-band-3)" },
  { points: 4, halfWidth: 4, color: "var(--color-band-4)" },
];

type Props = {
  targetAngle: number; // degrees, 0–180
};

export default function TargetLayer({ targetAngle }: Props) {
  return (
    <g>
      {BANDS.map(({ points, halfWidth, color }) => (
        <path
          key={points}
          d={bandPath(targetAngle, halfWidth, INNER_R, OUTER_R, CX, CY)}
          fill={color}
          stroke="none"
        />
      ))}
    </g>
  );
}
