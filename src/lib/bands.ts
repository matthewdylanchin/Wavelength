// Single source of truth for scoring band thresholds.
// Widest-first order = natural painter's order for TargetLayer rendering.
// scoreFor() is order-independent (finds highest-scoring matching band).
export const BANDS = [
  { points: 2, halfWidth: 17 },
  { points: 3, halfWidth: 10 },
  { points: 4, halfWidth: 4 },
]
