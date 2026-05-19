import {Type} from '@angular/core';
import {HetIsJeVerjaardagGame} from './games/het-is-je-verjaardag-game';
import {BeginGame} from './games/begin-game';
import {Beermile} from './games/beermile';
import {FrituurGame} from './games/frituur-game';
import {SjoerdGame} from './games/sjoerd';

export interface GameEntry {
  id:string,
  rarity:number,
  component:Type<any>,
}

const RARITIES = {
  COMMON: 5,
  UNCOMMON: 3,
  RARE: 1,
  NOT_USED: 0
}

export const BEGIN_GAME: GameEntry = {
  id: 'begin',
  rarity: RARITIES.NOT_USED,
  component: BeginGame,
}

export const GAMES: GameEntry[] = [
  {
    id: 'verjaardag',
    rarity: RARITIES.UNCOMMON,
    component: HetIsJeVerjaardagGame
  },
  {
    id: 'beermile',
    rarity: RARITIES.UNCOMMON,
    component: Beermile
  },
  {
    id: 'frituur',
    rarity: RARITIES.RARE,
    component: FrituurGame
  }, {
    id: 'sjoerd',
    rarity: RARITIES.UNCOMMON,
    component: SjoerdGame
  }
]
