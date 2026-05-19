import {Component, inject, signal} from '@angular/core';
import {Player, PlayerService} from '../services/player-service';

@Component({
  selector: 'app-player-picking-component-base',
  imports: [],
  template: ``,
})
export abstract class PlayerPickingComponent {

  protected playerService =
    inject(PlayerService);

  protected players =
    signal<Player[]>([]);

  protected abstract pickCount: number;

  ngOnInit() {
    this.players.set(
      this.playerService.pickPlayers(
        this.pickCount
      )
    );
  }
}
