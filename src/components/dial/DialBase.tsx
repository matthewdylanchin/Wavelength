import type { Spectrum } from '../../lib/spectra'
import { CX, CY, R } from './dialGeometry'

type Props = {
  spectrum: Spectrum
}

const LABEL_Y = CY - 14   // just above the baseline
const LABEL_PAD = 14      // inset from each tip

const textStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  fill: 'var(--color-brown-soft)',
  fontFamily: 'var(--font-ui)',
}

export default function DialBase({ spectrum }: Props) {
  return (
    <g>
      <path
        d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY} Z`}
        fill="var(--color-cream)"
        stroke="var(--color-cream-shadow)"
        strokeWidth={2}
      />
      <text
        x={CX - R + LABEL_PAD}
        y={LABEL_Y}
        textAnchor="start"
        style={textStyle}
      >
        {spectrum.left}
      </text>
      <text
        x={CX + R - LABEL_PAD}
        y={LABEL_Y}
        textAnchor="end"
        style={textStyle}
      >
        {spectrum.right}
      </text>
    </g>
  )
}
