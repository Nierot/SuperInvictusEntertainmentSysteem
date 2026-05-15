import { createContext } from 'react'
import { State } from './game.ts'

// @ts-expect-error is maar zo he
export const GameContext = createContext<State>(null)

