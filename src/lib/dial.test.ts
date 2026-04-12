import { describe, it, expect } from 'vitest'
import { angleToPoint, bandPath, clampAngle, randomTarget } from './dial'

// Splits an SVG path string into its individual tokens (commands and numbers).
// bandPath produces exactly: M x y A rx ry 0 la sw x y L x y A rx ry 0 la sw x y Z
function parsePath(d: string) {
  const t = d.trim().split(/\s+/)
  return {
    // M — start point (outer arc, at startAngle)
    cmd0: t[0],
    mx: parseFloat(t[1]!),
    my: parseFloat(t[2]!),
    // A (outer arc, startAngle → endAngle)
    cmd1: t[3],
    outerRx: parseFloat(t[4]!),
    outerRy: parseFloat(t[5]!),
    outerLargeArc: t[7],
    outerSweep: t[8],
    ax: parseFloat(t[9]!),   // outer arc end x (at endAngle)
    ay: parseFloat(t[10]!),  // outer arc end y
    // L — line to inner arc (at endAngle)
    cmd2: t[11],
    lx: parseFloat(t[12]!),
    ly: parseFloat(t[13]!),
    // A (inner arc, endAngle → startAngle)
    cmd3: t[14],
    innerRx: parseFloat(t[15]!),
    innerRy: parseFloat(t[16]!),
    innerLargeArc: t[18],
    innerSweep: t[19],
    bx: parseFloat(t[20]!),  // inner arc end x (back at startAngle)
    by: parseFloat(t[21]!),  // inner arc end y
    // Z — close path
    cmdZ: t[22],
  }
}

describe('angleToPoint', () => {
  it('0° maps to left tip', () => {
    const p = angleToPoint(0, 100, 100, 50)
    expect(p.x).toBeCloseTo(50)
    expect(p.y).toBeCloseTo(100)
  })

  it('90° maps to top center', () => {
    const p = angleToPoint(90, 100, 100, 50)
    expect(p.x).toBeCloseTo(100)
    expect(p.y).toBeCloseTo(50)
  })

  it('180° maps to right tip', () => {
    const p = angleToPoint(180, 100, 100, 50)
    expect(p.x).toBeCloseTo(150)
    expect(p.y).toBeCloseTo(100)
  })
})

describe('clampAngle', () => {
  it('clamps below 0', () => expect(clampAngle(-10)).toBe(0))
  it('clamps above 180', () => expect(clampAngle(200)).toBe(180))
  it('passes through midrange', () => expect(clampAngle(90)).toBe(90))
  it('leaves 0 unchanged', () => expect(clampAngle(0)).toBe(0))
  it('leaves 180 unchanged', () => expect(clampAngle(180)).toBe(180))
})

describe('bandPath', () => {
  const CX = 200, CY = 200, INNER = 50, OUTER = 100

  it('produces a closed path with correct command structure', () => {
    const p = parsePath(bandPath(90, 10, INNER, OUTER, CX, CY))
    expect(p.cmd0).toBe('M')
    expect(p.cmd1).toBe('A')
    expect(p.cmd2).toBe('L')
    expect(p.cmd3).toBe('A')
    expect(p.cmdZ).toBe('Z')
  })

  it('M starts at the outer arc at (centerAngle − halfWidth)', () => {
    const expected = angleToPoint(80, CX, CY, OUTER) // 90 − 10
    const p = parsePath(bandPath(90, 10, INNER, OUTER, CX, CY))
    expect(p.mx).toBeCloseTo(expected.x)
    expect(p.my).toBeCloseTo(expected.y)
  })

  it('outer arc ends at the outer arc at (centerAngle + halfWidth)', () => {
    const expected = angleToPoint(100, CX, CY, OUTER) // 90 + 10
    const p = parsePath(bandPath(90, 10, INNER, OUTER, CX, CY))
    expect(p.ax).toBeCloseTo(expected.x)
    expect(p.ay).toBeCloseTo(expected.y)
  })

  it('L goes to the inner arc at (centerAngle + halfWidth)', () => {
    const expected = angleToPoint(100, CX, CY, INNER)
    const p = parsePath(bandPath(90, 10, INNER, OUTER, CX, CY))
    expect(p.lx).toBeCloseTo(expected.x)
    expect(p.ly).toBeCloseTo(expected.y)
  })

  it('inner arc returns to the inner arc at (centerAngle − halfWidth)', () => {
    const expected = angleToPoint(80, CX, CY, INNER)
    const p = parsePath(bandPath(90, 10, INNER, OUTER, CX, CY))
    expect(p.bx).toBeCloseTo(expected.x)
    expect(p.by).toBeCloseTo(expected.y)
  })

  it('outer arc uses sweep=1 (clockwise), inner arc uses sweep=0 (counterclockwise)', () => {
    const p = parsePath(bandPath(90, 10, INNER, OUTER, CX, CY))
    expect(p.outerSweep).toBe('1')
    expect(p.innerSweep).toBe('0')
  })

  it('arc commands carry the correct radii', () => {
    const p = parsePath(bandPath(90, 10, 40, 90, CX, CY))
    expect(p.outerRx).toBeCloseTo(90)
    expect(p.outerRy).toBeCloseTo(90)
    expect(p.innerRx).toBeCloseTo(40)
    expect(p.innerRy).toBeCloseTo(40)
  })

  it('large-arc flag is 0 for normal band widths', () => {
    // Widest scoring band is ±22° = 44° total — well under 180°
    const p = parsePath(bandPath(90, 22, INNER, OUTER, CX, CY))
    expect(p.outerLargeArc).toBe('0')
    expect(p.innerLargeArc).toBe('0')
  })

  it('is symmetric around 90°: outer start and end have equal y', () => {
    // At 90°, (90−w) and (90+w) are mirror-symmetric → sin values are equal
    const p = parsePath(bandPath(90, 15, INNER, OUTER, CX, CY))
    expect(p.my).toBeCloseTo(p.ay)
  })

  it('clamps at the left edge: center=15, halfWidth=22 starts at 0° (left tip)', () => {
    // 15 − 22 = −7 → clamped to 0°
    const expected = angleToPoint(0, CX, CY, OUTER)
    const p = parsePath(bandPath(15, 22, INNER, OUTER, CX, CY))
    expect(p.mx).toBeCloseTo(expected.x)
    expect(p.my).toBeCloseTo(expected.y)
  })

  it('clamps at the right edge: center=165, halfWidth=22 ends at 180° (right tip)', () => {
    // 165 + 22 = 187 → clamped to 180°
    const expected = angleToPoint(180, CX, CY, OUTER)
    const p = parsePath(bandPath(165, 22, INNER, OUTER, CX, CY))
    expect(p.ax).toBeCloseTo(expected.x)
    expect(p.ay).toBeCloseTo(expected.y)
  })
})

describe('randomTarget', () => {
  it('always returns a value in [15, 165]', () => {
    for (let i = 0; i < 500; i++) {
      const t = randomTarget()
      expect(t).toBeGreaterThanOrEqual(15)
      expect(t).toBeLessThanOrEqual(165)
    }
  })

  it('produces values across the full range, not just near the edges', () => {
    const samples = Array.from({ length: 500 }, randomTarget)
    const min = Math.min(...samples)
    const max = Math.max(...samples)
    // With 500 samples, min should be well below 20 and max well above 160
    expect(min).toBeLessThan(20)
    expect(max).toBeGreaterThan(160)
  })
})
