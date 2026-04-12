import GuessNeedle from './GuessNeedle'

// SVG coordinate constants — all child components use these same values
export const CX = 400   // pivot x
export const CY = 420   // pivot y
export const R = 360    // semicircle radius
export const NEEDLE_LENGTH = 320

type Props = {
  guessAngle: number   // degrees, 0–180
}

export default function Dial({ guessAngle }: Props) {
  return (
    <svg
      viewBox="0 0 800 450"
      style={{ width: '100%', maxWidth: 800, display: 'block' }}
    >
      <GuessNeedle
        angle={guessAngle}
        cx={CX}
        cy={CY}
        length={NEEDLE_LENGTH}
      />
    </svg>
  )
}
