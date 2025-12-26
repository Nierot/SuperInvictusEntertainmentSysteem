import { GAMES } from './games'
import { GAME_ID_GAME_STARTED, type State, type Player } from './types'

export function initState(players: Array<string>): State {

  const ps: Player[] = []
  let id = 1

  players.forEach(p => ps.push({
    pid: id++,
    name: p,
    score: 0
  }))

  return {
    currentGame: GAME_ID_GAME_STARTED,
    gameData: GAMES[GAME_ID_GAME_STARTED],
    players: ps,
    memory: new Map(),
    score: new Map(),
    timers: [],
    history: []
  }
}