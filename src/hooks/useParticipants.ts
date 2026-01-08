import { useContext } from 'react'
import { GameContext } from '../context'
import { State } from '../game'
import type { Player } from '../types'

export function useParticipants(): Player[] {
  const state = useContext<State>(GameContext)
  return state.getParticipants()
}

