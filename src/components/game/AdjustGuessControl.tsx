import { clampAngle } from '../../lib/dial'

type Props = {
  angle: number
  onChange: (next: number) => void
}

const FINE = 2
const COARSE = 10

function adjust(current: number, delta: number): number {
  return clampAngle(current + delta)
}

// Large rotary button — coarse adjustment
function RotaryButton({
  label,
  delta,
  angle,
  onChange,
}: {
  label: string
  delta: number
  angle: number
  onChange: (n: number) => void
}) {
  return (
    <button
      onClick={() => onChange(adjust(angle, delta))}
      aria-label={delta < 0 ? 'Coarse left' : 'Coarse right'}
      style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        border: '2px solid var(--color-cream-shadow)',
        background: 'var(--color-cream-dark)',
        color: 'var(--color-brown-dark)',
        fontSize: 22,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-button)',
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  )
}

export default function AdjustGuessControl({ angle, onChange }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        justifyContent: 'center',
      }}
    >
      {/* Coarse left */}
      <RotaryButton label="↺" delta={-COARSE} angle={angle} onChange={onChange} />

      {/* Center pill with fine controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          background: 'var(--color-cream-dark)',
          border: '2px solid var(--color-cream-shadow)',
          borderRadius: 999,
          boxShadow: 'var(--shadow-button)',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => onChange(adjust(angle, -FINE))}
          aria-label="Fine left"
          style={fineBtnStyle}
        >
          ‹
        </button>
        <span
          style={{
            padding: '0 16px',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: 'var(--color-brown-soft)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          ADJUST GUESS
        </span>
        <button
          onClick={() => onChange(adjust(angle, FINE))}
          aria-label="Fine right"
          style={fineBtnStyle}
        >
          ›
        </button>
      </div>

      {/* Coarse right */}
      <RotaryButton label="↻" delta={COARSE} angle={angle} onChange={onChange} />
    </div>
  )
}

const fineBtnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  border: 'none',
  background: 'transparent',
  color: 'var(--color-brown-dark)',
  fontSize: 26,
  lineHeight: 1,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}
