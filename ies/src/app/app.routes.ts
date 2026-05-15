import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Setup} from './pages/setup/setup';
import {Game} from './pages/game/game';
import {environment} from '../environment/environment';
import {SpotifyCallback} from './pages/spotify-callback/spotify-callback';

export const HOME_PATH = "";
export const SETUP_PATH = "setup";
export const GAME_PATH = "game";

export const routes: Routes = [
  {
    path: HOME_PATH,
    component: Home
  },
  {
    path: SETUP_PATH,
    component: Setup
  },
  {
    path: GAME_PATH,
    component: Game
  },
  {
    path: environment.spotify.redirectUri,
    component: SpotifyCallback
  }
];
