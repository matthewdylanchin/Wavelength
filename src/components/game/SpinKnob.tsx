type Props = {
  onSpin: () => void
  disabled: boolean
}

export default function SpinKnob({ onSpin, disabled }: Props) {
  return (
    <button
      onClick={onSpin}
      disabled={disabled}
      aria-label="Spin target"
      style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        border: '2px solid var(--color-cream-shadow)',
        background: disabled ? 'var(--color-cream-dark)' : '#4a6741',
        color: disabled ? 'var(--color-brown-soft)' : '#f5f0e8',
        fontSize: 28,
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: disabled ? 'none' : '0 3px 10px rgba(74, 103, 65, 0.35)',
        flexShrink: 0,
        opacity: disabled ? 0.45 : 1,
      }}
    >
      ⟳
    </button>
  )
}
