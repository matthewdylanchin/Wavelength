import { bandPath } from "../../lib/dial";
import { BANDS } from "../../lib/bands";
import { CX, CY } from "./Dial";

const INNER_R = 120;
const OUTER_R = 340;

// Colors parallel to BANDS by points value — visual concern, lives here not in bands.ts
const BAND_COLOR: Record<number, string> = {
  2: "var(--color-band-2)",
  3: "var(--color-band-3)",
  4: "var(--color-band-4)",
};

type Props = {
  targetAngle: number; // degrees, 0–180
};

export default function TargetLayer({ targetAngle }: Props) {
  return (
    <g>
      {/* BANDS is widest-first, so painter's order is correct: wide renders first, narrow on top */}
      {BANDS.map(({ points, halfWidth }) => (
        <path
          key={points}
          d={bandPath(targetAngle, halfWidth, INNER_R, OUTER_R, CX, CY)}
          fill={BAND_COLOR[points]}
          stroke="none"
        />
      ))}
    </g>
  );
}
