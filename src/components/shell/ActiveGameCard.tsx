import type { Spectrum } from '../../lib/spectra'

type Props = {
  spectrum: Spectrum
  roundNumber: number
}

export default function ActiveGameCard({ spectrum, roundNumber }: Props) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 10,
        padding: '12px 14px',
        boxShadow: '0 2px 8px rgba(62, 42, 31, 0.12)',
        border: '1px solid var(--color-cream-shadow)',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'var(--color-brown-soft)',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        Active Game
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--color-brown-dark)',
          marginBottom: 4,
          lineHeight: 1.3,
        }}
      >
        {spectrum.left} ↔ {spectrum.right}
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-brown-soft)' }}>
        Round {roundNumber}
      </div>
    </div>
  )
}
