import type { GameTimer } from './types'

export class Timer {

  private clock: number
  private currentTick = 0
  private lastPaused = new Date()
  private running = false
  private handler: (tick: number) => void = () => {}

  constructor() {
    this.clock = setInterval(this.tick.bind(this), 1000)
    // @ts-expect-error is alleen maar voor debuggen
    window.timer = this
  }

  public setTick(tick: number) {
    this.currentTick = tick
  }

  public getTime() {
    return this.currentTick
  }

  public getTimeHumanReadable() {
    if (this.currentTick < 60) {
      return this.currentTick + ''
    }

    const hms = new Date(this.currentTick * 1000).toLocaleString('nl-NL')

    const hours = Math.floor(this.currentTick / 3600)
    const ms = hms.substring(13, 19)

    if (hours > 0) {
      // "1-1-1970, 01:01:07"
      return `${hours}:${ms}`
    }
    return ms
  }

  public onTick(f: (time: number) => void) {
    this.handler = f
  }

  public addTimer(t: GameTimer) {

  }

  public tick() {
    if (!this.running) {
      return
    }

    if (this.handler) {
      this.handler(this.currentTick)
    }

    this.currentTick++
  }

  public start() {
    console.log(`Starting timer at ${new Date()}`)
    this.running = true
  }

  public stop() {
    console.log(`Stopping timer at ${new Date()}`)
    this.lastPaused = new Date()
    this.running = false
  }
}