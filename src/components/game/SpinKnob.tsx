type Props = {
  onSpin: () => void
}

export default function SpinKnob({ onSpin }: Props) {
  return (
    <button
      onClick={onSpin}
      aria-label="Spin target"
      style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        border: '2px solid var(--color-cream-shadow)',
        background: '#4a6741',           // accent-green from the design
        color: '#f5f0e8',
        fontSize: 28,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 3px 10px rgba(74, 103, 65, 0.35)',
        flexShrink: 0,
      }}
    >
      ⟳
    </button>
  )
}
