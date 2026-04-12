type Props = {
  angle: number   // degrees, 0–180
  cx: number      // pivot x in viewBox units
  cy: number      // pivot y in viewBox units
  length: number  // needle length in viewBox units
}

export default function GuessNeedle({ angle, cx, cy, length }: Props) {
  return (
    <g transform={`rotate(${angle - 90}, ${cx}, ${cy})`}>
      {/* Needle shaft — vertical line pointing straight up from pivot */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - length}
        stroke="var(--color-brown-dark)"
        strokeWidth={5}
        strokeLinecap="round"
      />
      {/* Small circle at the tip */}
      <circle
        cx={cx}
        cy={cy - length}
        r={6}
        fill="var(--color-brown-dark)"
      />
      {/* Pivot dot */}
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill="var(--color-brown-dark)"
      />
    </g>
  )
}
