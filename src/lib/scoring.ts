const BANDS = [
  { points: 4, halfWidth: 7 },
  { points: 3, halfWidth: 14 },
  { points: 2, halfWidth: 22 },
]

export function scoreFor(guessAngle: number, targetAngle: number): number {
  const delta = Math.abs(guessAngle - targetAngle)
  for (const band of BANDS) {
    if (delta <= band.halfWidth) return band.points
  }
  return 0
}
