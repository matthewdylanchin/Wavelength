import { clampAngle, randomTarget } from '../lib/dial'
import { scoreFor } from '../lib/scoring'
import { pickRandomSpectrum } from '../lib/spectra'
import type { Action } from './actions'
import type { GameState } from './gameState'

export function gameReducer(state: GameState, action: Action): GameState {
  const { phase, round } = state

  switch (action.type) {
    case 'START_ROUND': {
      if (phase !== 'idle' && phase !== 'scored') return state
      return {
        ...state,
        phase: 'spinning',
        round: {
          ...round,
          spectrum: pickRandomSpectrum(round.spectrum),
          clue: '',
          targetAngle: randomTarget(),
          guessAngle: 90,
          pointsThisRound: null,
        },
      }
    }

    case 'SPIN': {
      if (phase !== 'spinning') return state
      return {
        ...state,
        round: { ...round, targetAngle: randomTarget() },
      }
    }

    case 'LOCK_TARGET': {
      if (phase !== 'spinning') return state
      return { ...state, phase: 'clue' }
    }

    case 'SUBMIT_CLUE': {
      if (phase !== 'clue') return state
      return {
        ...state,
        phase: 'guessing',
        round: { ...round, clue: action.clue },
      }
    }

    case 'ADJUST_GUESS': {
      if (phase !== 'guessing') return state
      const next =
        action.absolute !== undefined
          ? clampAngle(action.absolute)
          : clampAngle(round.guessAngle + (action.delta ?? 0))
      return {
        ...state,
        round: { ...round, guessAngle: next },
      }
    }

    case 'REVEAL': {
      if (phase !== 'guessing') return state
      const points = scoreFor(round.guessAngle, round.targetAngle)
      // 'revealing' is transient — reducer settles directly into 'scored'
      // so the RevealCover exit animation fires as soon as phase === 'scored'
      return {
        ...state,
        phase: 'scored',
        round: { ...round, pointsThisRound: points },
      }
    }

    case 'NEXT_ROUND': {
      if (phase !== 'scored') return state
      return {
        phase: 'spinning',
        round: {
          ...round,
          number: round.number + 1,
          spectrum: pickRandomSpectrum(round.spectrum),
          clue: '',
          targetAngle: randomTarget(),
          guessAngle: 90,
          pointsThisRound: null,
        },
        totalScore: state.totalScore + (round.pointsThisRound ?? 0),
      }
    }

    default:
      return state
  }
}
