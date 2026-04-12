import { randomTarget } from '../lib/dial'
import { pickRandomSpectrum, type Spectrum } from '../lib/spectra'

export type { Spectrum }

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
  phase: 'spinning',
  round: {
    number: 1,
    spectrum: pickRandomSpectrum(),
    clue: '',
    targetAngle: randomTarget(),
    guessAngle: 90,
    pointsThisRound: null,
  },
  totalScore: 0,
}
