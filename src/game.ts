import { GAMES } from './games'
import { Timer } from './timer'
import { GAME_ID_GAME_STARTED } from './types'
import type { Game, GameEvent, GameID, GameMemory, GameTimer, Player, PlayerID, ScoreEvent } from './types'

export function createEmptyState(): State {
  return new State()
}

export class State {
  private currentGame: GameID = GAME_ID_GAME_STARTED
  private gameData: Game = GAMES[GAME_ID_GAME_STARTED]
  private players: Player[] = []
  private memory: Map<GameID, GameMemory> = new Map()
  private score: Map<PlayerID, ScoreEvent[]> = new Map()
  private timer: Timer
  private timers: GameTimer[] = []
  private history: GameEvent[] = []

  private onTickHandler: (tick: number) => void = () => {}

  constructor() {
    this.timer = new Timer()
    this.timer.onTick(this._onTick.bind(this))

    // @ts-expect-error debuggen
    window.state = this
  }

  public initializePlayersFromStringArray(ps: string[]): void {
    let idx = 1
    this.players = ps.map(p => {
      return {
        pid: idx++,
        score: 0,
        name: p
      }
    })
  }

  public startGame() {
    this.timer.start()
  }

  private _onTick(tick: number) {
    localStorage.setItem('sies-state', JSON.stringify(this))

    if (this.onTickHandler) {
      this.onTickHandler(tick)
    }
  }

  public onTick(handler: (tick: number) => void) {
    this.onTickHandler = handler
  }

  public getTimeHumanReadable() {
    return this.timer.getTimeHumanReadable()
  }

  public getCurrentGame() {
    return this.currentGame
  }

  public getPlayers() {
    return this.players
  }
}