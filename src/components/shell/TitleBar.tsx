import { Waves } from 'lucide-react'

export default function TitleBar() {
  return (
    <div
      style={{
        height: 56,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 28,
        paddingRight: 28,
        background: 'var(--bg-window)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: 'var(--color-brown-dark)',
        }}
      >
        <Waves size={20} strokeWidth={2} />
        <span
          style={{
            fontWeight: 700,
            fontSize: 17,
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.01em',
          }}
        >
          Wavelength
        </span>
      </div>
    </div>
  )
}
