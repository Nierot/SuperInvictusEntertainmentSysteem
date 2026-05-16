import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.less',
})
export class Game {
  private currentSongId = signal('');
}
