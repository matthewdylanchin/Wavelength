import type { Spectrum } from '../../lib/spectra'

type Props = {
  spectrum: Spectrum
}

export default function SpectrumCard({ spectrum }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 560,
        margin: '0 auto',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(92, 74, 50, 0.15)',
        fontFamily: 'var(--font-ui)',
        userSelect: 'none',
      }}
    >
      {/* Left half — warmer cream, arrow on outer (left) edge */}
      <div
        style={{
          flex: 1,
          background: 'var(--color-cream)',
          padding: '10px 16px',
          display: 'grid',
          gridTemplateColumns: '20px 1fr 20px',
          alignItems: 'center',
          borderRight: '1px solid var(--color-cream-shadow)',
        }}
      >
        <span style={{ color: 'var(--color-brown-soft)', fontSize: 14 }}>←</span>
        <span
          style={{
            textAlign: 'center',
            fontWeight: 600,
            color: 'var(--color-brown-dark)',
            fontSize: 15,
          }}
        >
          {spectrum.left}
        </span>
        <span />
      </div>

      {/* Right half — slightly darker cream, arrow on outer (right) edge */}
      <div
        style={{
          flex: 1,
          background: 'var(--color-cream-dark)',
          padding: '10px 16px',
          display: 'grid',
          gridTemplateColumns: '20px 1fr 20px',
          alignItems: 'center',
        }}
      >
        <span />
        <span
          style={{
            textAlign: 'center',
            fontWeight: 600,
            color: 'var(--color-brown-dark)',
            fontSize: 15,
          }}
        >
          {spectrum.right}
        </span>
        <span style={{ textAlign: 'right', color: 'var(--color-brown-soft)', fontSize: 14 }}>→</span>
      </div>
    </div>
  )
}
