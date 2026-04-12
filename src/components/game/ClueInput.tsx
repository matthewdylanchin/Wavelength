type Props = {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
}

export default function ClueInput({ value, onChange, onSubmit }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSubmit()
      }}
      placeholder="Type a clue (or skip)…"
      autoFocus
      style={{
        width: '100%',
        maxWidth: 480,
        padding: '10px 16px',
        fontSize: 18,
        fontFamily: 'var(--font-body)',
        fontStyle: 'italic',
        background: 'var(--color-cream-dark)',
        border: '2px solid var(--color-cream-shadow)',
        borderRadius: 8,
        color: 'var(--color-brown-dark)',
        outline: 'none',
        boxShadow: 'var(--shadow-button)',
        display: 'block',
        margin: '0 auto',
      }}
    />
  )
}
