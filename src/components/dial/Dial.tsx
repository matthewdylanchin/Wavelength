import GuessNeedle from './GuessNeedle'
import TargetLayer from './TargetLayer'

// SVG coordinate constants — all child components use these same values
export const CX = 400   // pivot x
export const CY = 420   // pivot y
export const R = 360    // semicircle radius
export const NEEDLE_LENGTH = 320

type Props = {
  guessAngle: number   // degrees, 0–180
  targetAngle: number  // degrees, 0–180
}

export default function Dial({ guessAngle, targetAngle }: Props) {
  return (
    <svg
      viewBox="0 0 800 450"
      style={{ width: '100%', maxWidth: 800, display: 'block' }}
    >
      {/* Layer 1: DialBase will go here (Step 1 / DialBase build) */}

      {/* Layer 2: scoring bands, visible for dev — RevealCover comes in Step 6 */}
      <TargetLayer targetAngle={targetAngle} />

      {/* Layer 3: guess needle always above the target layer */}
      <GuessNeedle
        angle={guessAngle}
        cx={CX}
        cy={CY}
        length={NEEDLE_LENGTH}
      />
    </svg>
  )
}
