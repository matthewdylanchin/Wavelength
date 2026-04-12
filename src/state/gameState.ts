import type { Spectrum } from '../lib/spectra'

export type Phase =
  | 'idle'
  | 'spinning'
  | 'clue'
  | 'guessing'
  | 'revealing'
  | 'scored'

export type Round = {
  number: number
  spectrum: Spectrum
  clue: string
  targetAngle: number
  guessAngle: number
  pointsThisRound: number | null
}

export type GameState = {
  phase: Phase
  round: Round
  totalScore: number
}

export const initialState: GameState = {
  phase: 'idle',
  round: {
    number: 1,
    spectrum: { left: 'Freezing', right: 'Scorching' },
    clue: '',
    targetAngle: 90,
    guessAngle: 90,
    pointsThisRound: null,
  },
  totalScore: 0,
}
