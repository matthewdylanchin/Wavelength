import DialBase from './DialBase'
import GuessNeedle from './GuessNeedle'
import RevealCover from './RevealCover'
import TargetLayer from './TargetLayer'
import { CX, CY, NEEDLE_LENGTH, R } from './dialGeometry'

// Re-export so any external caller (App.tsx etc.) can import from here if needed
export { CX, CY, NEEDLE_LENGTH, R }

type Props = {
  guessAngle: number   // degrees, 0–180
  targetAngle: number  // degrees, 0–180
  revealed: boolean
}

export default function Dial({ guessAngle, targetAngle, revealed }: Props) {
  return (
    <svg
      viewBox="0 0 800 450"
      style={{ width: '100%', maxWidth: 800, display: 'block' }}
    >
      {/* Layer 1 */}
      <DialBase />

      {/* Layer 2 */}
      <TargetLayer targetAngle={targetAngle} />

      {/* Layer 3 — fully opaque until revealed */}
      <RevealCover revealed={revealed} />

      {/* Layer 4 — always above the cover so it stays visible during the animation */}
      <GuessNeedle
        angle={guessAngle}
        cx={CX}
        cy={CY}
        length={NEEDLE_LENGTH}
      />
    </svg>
  )
}
