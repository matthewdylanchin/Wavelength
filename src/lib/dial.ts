// Pure dial math — no React, no side effects.
// Angles in degrees, 0–180. 0° = left tip, 90° = top center, 180° = right tip.

export function angleToPoint(
  angle: number,
  cx: number,
  cy: number,
  r: number,
): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180
  return {
    x: cx - r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  }
}

export function clampAngle(angle: number): number {
  return Math.max(0, Math.min(180, angle))
}

export function randomTarget(): number {
  return Math.random() * 150 + 15 // [15, 165]
}

export function bandPath(
  centerAngle: number,
  halfWidth: number,
  innerR: number,
  outerR: number,
  cx: number,
  cy: number,
): string {
  const startAngle = clampAngle(centerAngle - halfWidth)
  const endAngle = clampAngle(centerAngle + halfWidth)

  const inner1 = angleToPoint(startAngle, cx, cy, innerR)
  const inner2 = angleToPoint(endAngle, cx, cy, innerR)
  const outer1 = angleToPoint(startAngle, cx, cy, outerR)
  const outer2 = angleToPoint(endAngle, cx, cy, outerR)

  const largeArc = endAngle - startAngle > 180 ? 1 : 0

  return [
    `M ${outer1.x} ${outer1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outer2.x} ${outer2.y}`,
    `L ${inner2.x} ${inner2.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${inner1.x} ${inner1.y}`,
    'Z',
  ].join(' ')
}
