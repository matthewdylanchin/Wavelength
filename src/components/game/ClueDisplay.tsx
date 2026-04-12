import type { Phase } from '../../state/gameState'
import type { Spectrum } from '../../lib/spectra'

type Props = {
  phase: Phase
  spectrum: Spectrum
  clue: string
}

export default function ClueDisplay({ phase, spectrum, clue }: Props) {
  const hasClue = clue.trim().length > 0
  let text: React.ReactNode

  switch (phase) {
    case 'spinning':
      text = 'Get ready — spin to find your target.'
      break

    case 'clue':
      text = (
        <>
          You're the clue giver. The target is between{' '}
          <strong>{spectrum.left}</strong> and <strong>{spectrum.right}</strong>.
          {!hasClue && " Type a clue if you'd like, then pass to your team."}
        </>
      )
      break

    case 'guessing':
      text = hasClue ? (
        <>
          The clue giver chose a point on the spectrum. Where does <em>"{clue}"</em> land?
        </>
      ) : (
        <>
          The clue giver picked a spot between{' '}
          <strong>{spectrum.left}</strong> and <strong>{spectrum.right}</strong>.
          {' '}Where do you think it is?
        </>
      )
      break

    case 'scored':
      text = hasClue ? (
        <>
          The clue was <em>"{clue}"</em>. The spectrum was{' '}
          <strong>{spectrum.left}</strong> → <strong>{spectrum.right}</strong>.
        </>
      ) : (
        <>
          The spectrum was{' '}
          <strong>{spectrum.left}</strong> → <strong>{spectrum.right}</strong>.
        </>
      )
      break

    default:
      text = null
  }

  if (!text) return null

  return (
    <p
      style={{
        textAlign: 'center',
        marginBottom: '1rem',
        fontSize: 17,
        color: 'var(--color-brown-dark)',
        fontFamily: 'var(--font-body)',
        minHeight: '1.5em',
      }}
    >
      {text}
    </p>
  )
}
