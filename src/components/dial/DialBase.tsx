import { CX, CY, R } from './Dial'

export default function DialBase() {
  return (
    <path
      d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY} Z`}
      fill="var(--color-cream)"
      stroke="var(--color-cream-shadow)"
      strokeWidth={2}
    />
  )
}
