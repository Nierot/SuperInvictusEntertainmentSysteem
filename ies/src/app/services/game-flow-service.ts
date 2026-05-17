import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {SpotifyService} from './spotify-service';
import {BEGIN_GAME, GameEntry, GAMES} from '../pages/game/game.registry';

interface QueuedGame {
  game: GameEntry;
  context?: any;
}

interface GameHistory {
  game: GameEntry,
  rounds_since_last_played: number,
  total_played: number
}

@Injectable({
  providedIn: 'root',
})
export class GameFlowService {
  private DEFAULT_TIMEOUT = 5000;

  private spotifyApi = inject(SpotifyService);

  private _currentGame: WritableSignal<GameEntry> = signal(BEGIN_GAME);
  private _currentContext = signal<any>(null);

  public currentGame = this._currentGame.asReadonly();
  public currentContext = this._currentContext.asReadonly();

  private gameHistory: GameHistory[] = []

  private timer: any;

  /**
   * FIFO queue
   */
  private queuedGames: QueuedGame[] = [];

  constructor() {
    this.startTimer();
  }

  /**
   * Add a game to the queue
   */
  public queueGame(
    game: GameEntry,
    context?: any
  ) {
    this.queuedGames.push({
      game: game,
      context
    });
  }

  public queueGameInRounds(
    rounds: number,
    game: GameEntry,
    context?: any,
  ) {
    const missingGames = Math.max(0, rounds - this.queuedGames.length);

    for (let i = 0; i < missingGames; i++) {
      this.queueGame(this.pickGame());
    }

    this.queuedGames.splice(rounds, 0, {
      game,
      context
    });
  }

  /**
   * Remove and return the next queued game
   */
  public popGame(): QueuedGame | undefined {
    return this.queuedGames.shift();
  }

  private nextGame() {
    const queued = this.popGame();

    if (queued) {
      this._currentGame.set(queued.game);

      this._currentContext.set(
        queued.context ?? null
      );
    } else {
      const randomGame = this.pickGame();

      this._currentGame.set(randomGame);

      this._currentContext.set(null);
    }

    this.recordHistory(this._currentGame());

    this.startTimer();
  }

  private recordHistory(game: GameEntry) {
    let gameFound = false;
    this.gameHistory.forEach((e) => {
      if (e.game.id === game.id) {
        e.total_played++;
        e.rounds_since_last_played = 0;
        gameFound = true;
      } else {
        e.rounds_since_last_played++;
      }
    });

    if (!gameFound) {
      this.gameHistory.push({
        game: game,
        total_played: 1,
        rounds_since_last_played: 0
      });
    }
  }

  private async getTimeoutDuration(): Promise<number> {
    if (!this.spotifyApi.isAuthenticated()) {
      return this.DEFAULT_TIMEOUT;
    }

    const track = await this.spotifyApi.getCurrentTrack();

    return (
      track.item.duration_ms -
      track.progress_ms
    );
  }

  private async startTimer() {
    const timeout =
      await this.getTimeoutDuration();

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.nextGame();
    }, timeout);
  }

  private MIN_ROUNDS_BEFORE_REPEAT = 3;

  private pickGame(): GameEntry {
    const candidates = GAMES.filter(game => game.rarity > 0);

    const weightedGames = candidates.map(game => {
      const history = this.gameHistory.find(
        h => h.game.id === game.id
      );

      if (
        history &&
        history.rounds_since_last_played < this.MIN_ROUNDS_BEFORE_REPEAT
      ) {
        return {
          game,
          weight: 0
        };
      }

      // Defaults for never-played games
      const totalPlayed = history?.total_played ?? 0;
      const roundsSincePlayed = history?.rounds_since_last_played ?? 999;

      // Base rarity weight
      let weight = game.rarity;

      // Strongly favor games that have not been played recently
      weight *= Math.max(1, roundsSincePlayed);

      // Reduce likelihood for games that have appeared many times
      weight /= (totalPlayed + 1);

      return {game, weight};
    });

    const totalWeight = weightedGames.reduce(
      (sum, entry) => sum + entry.weight,
      0
    );

    let random = Math.random() * totalWeight;

    for (const entry of weightedGames) {
      random -= entry.weight;

      if (random <= 0) {
        return entry.game;
      }
    }

    return candidates[0];
  }
}
