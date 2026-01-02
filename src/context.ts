import { createContext } from 'react'
import { State } from './game'

export const GameContext = createContext<State>(new State())
