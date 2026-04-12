export type Action =
  | { type: 'START_ROUND' }
  | { type: 'SPIN' }
  | { type: 'LOCK_TARGET' }
  | { type: 'SUBMIT_CLUE'; clue: string }
  | { type: 'ADJUST_GUESS'; delta?: number; absolute?: number }
  | { type: 'REVEAL' }
  | { type: 'NEXT_ROUND' }
