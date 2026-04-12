import { describe, it, expect } from 'vitest'
import { scoreFor } from './scoring'

describe('scoreFor', () => {
  // Dead center
  it('delta 0 → 4', () => expect(scoreFor(90, 90)).toBe(4))

  // 4-point boundaries (halfWidth = 4)
  it('delta exactly 4 → 4', () => expect(scoreFor(86, 90)).toBe(4))
  it('delta 4.01 → 3',     () => expect(scoreFor(85.99, 90)).toBe(3))

  // 3-point boundaries (halfWidth = 10)
  it('delta exactly 10 → 3', () => expect(scoreFor(80, 90)).toBe(3))
  it('delta 10.01 → 2',      () => expect(scoreFor(79.99, 90)).toBe(2))

  // 2-point boundaries (halfWidth = 17)
  it('delta exactly 17 → 2', () => expect(scoreFor(73, 90)).toBe(2))
  it('delta 17.01 → 0',      () => expect(scoreFor(72.99, 90)).toBe(0))

  // Outside all bands
  it('large delta → 0', () => expect(scoreFor(0, 90)).toBe(0))

  // Symmetry: same delta on either side of target gives same score
  it('symmetry: left and right of target score equally', () =>
    expect(scoreFor(86, 90)).toBe(scoreFor(94, 90)))
})
