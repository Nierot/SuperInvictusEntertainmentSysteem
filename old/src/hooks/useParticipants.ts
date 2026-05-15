import { useContext } from 'react'
import { GameContext } from '../context.ts'
import { State } from '../game.ts'
import type { Player } from '../types.ts'

export function useParticipants(): Player[] {
  const state = useContext<State>(GameContext)
  return state.getParticipants()
}

