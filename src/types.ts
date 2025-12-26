export type GameID = number
export type PlayerID = number
export type AmountOfPlayers = 0 | 1 | 2 | 4 | 8

export const RESERVED_GAME_IDS = [-1]
export const GAME_ID_GAME_STARTED = -1

export type State = {
  currentGame: GameID
  gameData: Game
  players: Player[]
  memory: Map<GameID, GameMemory>
  score: Map<PlayerID, ScoreEvent[]>
  timers: GameTimer[]
  history: GameEvent[]
}

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

type GameMemory = {
  game: GameID
  timer: GameTimer | null;
  trigger: () => void
}

type TimerType = 'time' | 'rounds'

type GameTimer = {
  type: TimerType
}

type GameEvent = {
  gid: GameID
  participants: PlayerID[]
}

type ScoreEvent = {
  pid: PlayerID
  score: number;
}