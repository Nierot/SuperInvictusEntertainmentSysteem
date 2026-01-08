import { useContext } from 'react'
import { GameContext } from '../context'
import { State } from '../game'

export function useGame(): State {
  return useContext<State>(GameContext)
}

