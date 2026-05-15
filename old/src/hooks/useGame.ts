import { useContext } from 'react'
import { GameContext } from '../context.ts'
import { State } from '../game.ts'

export function useGame(): State {
  return useContext<State>(GameContext)
}

