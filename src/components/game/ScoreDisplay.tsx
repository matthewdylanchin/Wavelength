type Props = {
  points: number
  totalScore: number
  roundNumber: number
}

const CAPTIONS: Record<number, string> = {
  4: 'Bullseye!',
  3: 'Close!',
  2: 'Almost.',
  0: 'Way off.',
}

const POINT_COLORS: Record<number, string> = {
  4: 'var(--color-band-4)',
  3: 'var(--color-brown-soft)',
  2: 'var(--color-brown-soft)',
  0: 'var(--color-brown-soft)',
}

export default function ScoreDisplay({ points, totalScore, roundNumber }: Props) {
  const caption = CAPTIONS[points] ?? ''
  const color = POINT_COLORS[points] ?? 'var(--color-brown-soft)'

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* Points earned — large, warm */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
          color,
          lineHeight: 1,
        }}
      >
        +{points}
      </div>

      {/* Caption */}
      <div
        style={{
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          color: 'var(--color-brown-dark)',
        }}
      >
        {caption}
      </div>

      {/* Running total */}
      <div
        style={{
          marginTop: 6,
          fontSize: 15,
          fontFamily: 'var(--font-ui)',
          color: 'var(--color-brown-soft)',
          letterSpacing: '0.02em',
        }}
      >
        Total: {totalScore} pts
      </div>

      {/* Round number */}
      <div
        style={{
          fontSize: 13,
          fontFamily: 'var(--font-ui)',
          color: 'var(--color-brown-soft)',
          opacity: 0.7,
        }}
      >
        Round {roundNumber}
      </div>
    </div>
  )
}
