import { Timer } from './timer'
import { GAMES, GAME_IDS, MINUTE } from './games'
import type { Game, GameEvent, GameID, GameMemory, Player, PlayerID, ScoreEvent, Notification } from './types'
import { selectRandomGame, selectRandomNumberBetween } from './random'

const MAX_WAIT_TIME = 30 * MINUTE
const MIN_WAIT_TIME = 20 * MINUTE

export class State {
  private currentGame: GameID
  private gameData: Game
  private currentPlayers: PlayerID[] = []
  private players: Player[] = []
  private memory: Map<GameID, GameMemory> = new Map()
  private score: Map<PlayerID, ScoreEvent[]> = new Map()
  private timer: Timer
  private history: GameEvent[] = []
  private tickHandler: ((tick: number) => void) | null = null
  private notifications: Notification[] = []


  public timeSinceLastGame = 0
  public currentTick = 0

  constructor() {
    this.currentGame = GAME_IDS.GAME_STARTED
    this.gameData = GAMES[GAME_IDS.GAME_STARTED]
    this.timer = new Timer()
    this.timer.onTick(this._onTick.bind(this))
  }

  // Main game loop
  private _onTick(tick: number) {
    // @ts-expect-error jaja
    window.state = this

    this.dump()
    this.currentTick = tick

    // update all cooldowns
    Object.values(GAMES).forEach(game => {
      if (game.cooldown != 0) game.cooldown--
    })

    console.log(`Game ${this.gameData.name} eindigt in ${this.gameData.roundTime}, vorig spel ${this.timeSinceLastGame}`)

    this.gameData.roundTime--

    // idle/notification etc.
    if (this.currentGame < 0) {
      this.timeSinceLastGame++
    }

    for (const n of this.notifications) {
      n.time--

      if (n.time <= 0 && this.currentGame === GAME_IDS.IDLE) {
        // add 60 seconds to the timer and show the message
        this.startMiniGame(GAME_IDS.NOTIFICATION)
      }
    }

    if (this.gameData.roundTime <= 0) {
      console.log('new game time!')

      this.gameData.roundTime = this.gameData.defaultRoundTime

      if (this.currentGame === GAME_IDS.IDLE) {
        // idle ended, now see if another game should be played

        if (this.timeSinceLastGame >= MAX_WAIT_TIME) {
          // select next game
          this.selectNextGame()
        } else if (this.timeSinceLastGame >= MIN_WAIT_TIME && selectRandomNumberBetween(1, 10) > 5) {
          // select next game
          this.selectNextGame()
        } else {
          this.startMiniGame(GAME_IDS.IDLE)
        }

      } else {
        // game ended, loop back to idle
        this.startMiniGame(GAME_IDS.IDLE)
      }

    }

    // Update components downstream
    if (this.tickHandler) this.tickHandler(tick)
  }

  private selectNextGame() {
    this.timeSinceLastGame = 0
    const gid = selectRandomGame(this.players.length)
    this.startMiniGame(gid)
  }

  public forceNewGame() {
    this.selectNextGame()
  }

  public addNotification(time: number, title: string, text: string) {
    console.log('addNotification')
    this.notifications.push({
      time,
      title,
      text
    })
    console.log(this.notifications)
  }

  public addPlayer(name: string) {
    this.players.push({
      name,
      pid: this.players.length + 1,
      score: 0
    })
  }

  public removeNotification(): Notification {
    return this.notifications.shift()!
  }

  public addScore(pid: PlayerID, score: number) {
    const event: ScoreEvent = {
      pid,
      score
    }

    let arr = this.score.get(pid)

    if (!arr) {
      arr = []
    }

    arr.push(event)
    this.score.set(pid, arr)
    for (const p of this.players) {
      if (p.pid === pid) {
        p.score += score
      }
    }
  }

  private startMiniGame(gid: GameID) {
    console.log('Starting ' + gid)
    const gameData = GAMES[gid]
    this.currentGame = gid
    this.gameData = gameData
    this.currentPlayers = []

    console.log(GAMES)
    // set the cooldown
    gameData.cooldown = gameData.defaultCooldown
    gameData.roundTime = gameData.defaultRoundTime

    if (gid !== GAME_IDS.IDLE) {
      this.timeSinceLastGame = 0
    }

    this.history.push({
      gid: gid,
      participants: this.getParticipantIds()
    })

    if (gameData.numPlayers > 0) {
      // select the players with the lowest score
      let playersNeeded = gameData.numPlayers
      let idx = 0
      console.log(this.players)


      const ps = this.players.sort((a, b) => a.score - b.score)

      while (playersNeeded > 0) {
        this.currentPlayers.push(ps[idx].pid)
        idx++
        playersNeeded--
      }
    }

    if (gameData.effect) {
      gameData.effect(this)
    }

    console.log(`Starting minigame ${gid} (${gameData.name})`)
    // this.timer.addTimer()
  }

  public dump() {
    sessionStorage.setItem('sies-state', JSON.stringify(this))
  }

  public restoreFromDump(dump: string): boolean {
    try {
      const obj = JSON.parse(dump)
      this.setCurrentGame(obj.currentGame)
      this.gameData = obj.gameData
      this.currentPlayers = obj.currentPlayers
      this.players = obj.players
      // @ts-expect-error jaja
      this.memory = new Map<GameID, GameMemory>(Object.entries(obj.memory))
      // @ts-expect-error jaja
      this.score = new Map<PlayerID, ScoreEvent[]>(Object.entries(obj.score))
      this.timer.setTick(obj.currentTick)
      this.history = obj.history
      this.notifications = obj.notifications

      this.timeSinceLastGame = obj.timeSinceLastGame
      this.currentTick = obj.currentTick
    } catch (err: unknown) {
      console.error(err)
      return false
    }

    return true

  }

  public resetCooldowns() {
    Object.values(GAMES).forEach(game => {
      game.cooldown = 0
    })
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

  public onTick(handler: (tick: number) => void) {
    this.tickHandler = handler
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
    if (!this.gameData) {
      console.error("huh", this.currentGame, GAMES[this.currentGame])
    }

    return this.gameData
  }

  public getParticipant(pid: number): Player {
    const player = this.players.find(p => p.pid === pid)

    if (!player) {
      throw new Error(`Player ${pid} not found`)
    }

    return player
  }

  public getParticipants(): Player[] {
    return this.currentPlayers.map(pid => {
      return this.players.find(p => p.pid === pid)!
    })
  }

  private getParticipantIds(): PlayerID[] {
    return this.currentPlayers
  }

  public getCssClass(): string {
    if (this.getGameData()) {
      const c = this.getGameData().cssClass

      if (c) {
        return c
      }
    }
    return 'GameDefault'
  }
}