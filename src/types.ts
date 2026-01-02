import type { Timer } from './timer'

export type GameID = number
export type PlayerID = number
export type AmountOfPlayers = 0 | 1 | 2 | 4 | 8

export const RESERVED_GAME_IDS = [-1]
export const GAME_ID_GAME_STARTED = -1

export type Player = {
  pid: PlayerID
  name: string
  score: number
}

export type Game = {
  gid: GameID
  weight: number
  roundTime: number
  cooldown: TimerType
  name: string
  numPlayers: AmountOfPlayers
  participants: PlayerID[]
}

export type GameMemory = {
  game: GameID
  timer: GameTimer | null;
  trigger: () => void
}

export type TimerType = 'time' | 'rounds'

export type GameTimer = {
  timer: Timer
  type: TimerType
}

export type GameEvent = {
  gid: GameID
  participants: PlayerID[]
}

export type ScoreEvent = {
  pid: PlayerID
  score: number;
}