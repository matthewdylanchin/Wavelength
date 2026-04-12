import { randomTarget } from '../lib/dial'

export type Phase =
  | 'idle'
  | 'spinning'
  | 'clue'
  | 'guessing'
  | 'revealing'
  | 'scored'

export type Spectrum = {
  left: string
  right: string
}

export type Round = {
  number: number
  spectrum: Spectrum
  clue: string
  targetAngle: number     // degrees, 0–180 — set on spin, immutable from clue onward
  guessAngle: number      // degrees, 0–180 — mutable during guessing only
  pointsThisRound: number | null
}

export type GameState = {
  phase: Phase
  round: Round
  totalScore: number
}

const INITIAL_SPECTRUM: Spectrum = { left: 'Freezing', right: 'Scorching' }

export const initialState: GameState = {
  phase: 'spinning',
  round: {
    number: 1,
    spectrum: INITIAL_SPECTRUM,
    clue: '',
    targetAngle: randomTarget(),
    guessAngle: 90,
    pointsThisRound: null,
  },
  totalScore: 0,
}
