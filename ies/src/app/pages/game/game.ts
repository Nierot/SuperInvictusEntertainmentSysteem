import {Component, inject, signal, WritableSignal} from '@angular/core';
import {NgComponentOutlet} from '@angular/common';
import {BEGIN_GAME, GameEntry, GAMES} from './game.registry';
import {SpotifyService} from '../../services/spotify-service';
import {GameFlowService} from '../../services/game-flow-service';

interface QueuedGame {
  game: GameEntry;
  context?: any;
}

interface GameHistory {
  game: GameEntry,
  rounds_since_last_played: number,
  total_played: number
}

@Component({
  selector: 'app-game',
  imports: [NgComponentOutlet],
  template: `
    <ng-container
      [ngComponentOutlet]="currentGame().component"
      [ngComponentOutletInputs]="{context: currentContext()}"
    >
    </ng-container>
  `,
  styleUrl: './game.less',
})
export class Game {
  private gameFlowService = inject(GameFlowService);

  protected currentGame = this.gameFlowService.currentGame;
  protected currentContext = this.gameFlowService.currentContext;
}
