import { describe, it, expect } from 'vitest'
import { angleToPoint, clampAngle, randomTarget } from './dial'

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
})

describe('randomTarget', () => {
  it('always returns a value in [15, 165]', () => {
    for (let i = 0; i < 200; i++) {
      const t = randomTarget()
      expect(t).toBeGreaterThanOrEqual(15)
      expect(t).toBeLessThanOrEqual(165)
    }
  })
})
