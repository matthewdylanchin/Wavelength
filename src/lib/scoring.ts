import { BANDS } from './bands'

export function scoreFor(guessAngle: number, targetAngle: number): number {
  const delta = Math.abs(guessAngle - targetAngle)
  let best = 0
  for (const band of BANDS) {
    if (delta <= band.halfWidth) best = Math.max(best, band.points)
  }
  return best
}
