import type { State } from './game'

export type GameID = number
export type PlayerID = number
export type AmountOfPlayers = 0 | 1 | 2 | 4 | 8

export type Player = {
  pid: PlayerID
  name: string
  score: number
}

export type Game = {
  gid: GameID
  weight: number
  roundTime: number
  defaultRoundTime: number
  cooldown: number
  defaultCooldown: number
  name: string
  effect?: (state: State) => void
  numPlayers: AmountOfPlayers
  cssClass?: string
}

export type GameMemory = {
  game: GameID
  time: number;
  trigger: () => void
}

export type Notification = {
  time: number
  title: string
  text: string
}

export type GameEvent = {
  gid: GameID
  participants: PlayerID[]
}

export type ScoreEvent = {
  pid: PlayerID
  score: number;
}