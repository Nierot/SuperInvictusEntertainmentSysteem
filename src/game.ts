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

  public currentTick = 0
  private onTickHandler: (tick: number) => void = () => {}

  constructor() {
    this.timer = new Timer()
    this.timer.onTick(this._onTick.bind(this))

    // @ts-expect-error debuggen
    window.state = this
  }

  public dump() {
    localStorage.setItem('sies-state', JSON.stringify(this))
  }

  public restoreFromDump(dump: string): boolean {
    try {
      const obj = JSON.parse(dump)
      this.setCurrentGame(obj.currentGame)
      this.gameData = obj.gameData
      this.players = obj.players
      // @ts-expect-error jaja
      this.memory = new Map<GameID, GameMemory>(Object.entries(obj.memory))
      // @ts-expect-error jaja
      this.score = new Map<PlayerID, ScoreEvent[]>(Object.entries(obj.score))
      this.timer.setTick(obj.currentTick)
      console.error('TODO: Gametimers worden gereset')
      obj.timers.map((t: GameTimer) => {
        this.timers.push(t)
        this.timer.addTimer(t)
      })
      this.history = obj.history
    } catch (err: unknown) {
      console.error(err)
      return false
    }

    return true

  }

  public initializePlayersFromStringArray(ps: string[]): void {
    console.log('Initializing players')
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
    this.dump()
    this.currentTick = tick

    if (this.onTickHandler) {
      this.onTickHandler(tick)
    }
  }

  public onTick(handler: (tick: number) => void) {
    this.onTickHandler = handler
  }

  public setTick(tick: number) {
    this.timer.setTick(tick)
  }

  public getTimeHumanReadable() {
    return this.timer.getTimeHumanReadable()
  }

  public getCurrentGame() {
    return this.currentGame
  }

  public setCurrentGame(currentGame: GameID) {
    this.currentGame = currentGame
  }

  public getPlayers() {
    return this.players
  }

  public setPlayers(ps: Player[]) {
    this.players = ps
  }

  public getGameData() {
    return this.gameData
  }
}