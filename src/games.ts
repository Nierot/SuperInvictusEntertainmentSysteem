import { GAME_ID_GAME_STARTED, type GameID, type Game } from './types';

export const GAMES: Record<GameID, Game> = {
  [GAME_ID_GAME_STARTED]: {
    gid: GAME_ID_GAME_STARTED,
    weight: -1,
    roundTime: -1,
    cooldown: 'rounds',
    name: 'Spel begint...',
    numPlayers: 0,
    participants: []
  }
};