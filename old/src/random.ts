import { GAME_IDS, GAMES } from './games';
import type { GameID } from './types.ts';

export function selectRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export function selectRandomGame(playerCount: number): GameID {
  const games: GameID[] = []

  Object.values(GAMES).forEach(game => {
    console.log(game)

    // IDLE/GameStarted etc.
    if (game.gid < 0) {
      return
    }

    if (game.cooldown > 0) {
      return
    }

    if (game.numPlayers > playerCount) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _num of Array(game.weight).keys()) {
      games.push(game.gid)
    }
  })

  if (games.length === 0) {
    console.error('games.length is 0, wtf')
    return GAME_IDS.IDLE
  }

  console.log(games)

  const gameIdx = selectRandomNumberBetween(0, games.length - 1)

  console.log(gameIdx)

  return games[gameIdx]
}
