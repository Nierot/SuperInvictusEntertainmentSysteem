import {Component, inject, signal, WritableSignal} from '@angular/core';
import {PlayerService} from '../../../../services/player-service';

@Component({
  selector: 'app-beermile',
  imports: [],
  template: `<div>
    <h1>Beermile!!</h1>
    <p>{{player1()}} v.s. {{player2()}}</p>
    <p>Bak vouwen + rondje Bastille</p>
  </div>`,
  styleUrl: './beermile.less',
})
export class Beermile {
  private playerService = inject(PlayerService);

  protected player1:WritableSignal<string> = signal('');
  protected player2:WritableSignal<string> = signal('');

  ngOnInit() {
    const [p1, p2] = this.playerService.pickPlayers(2);

    this.player1.set(p1?.name ?? 'Iemand');
    this.player2.set(p2?.name ?? 'Iemand');

    this.playerService.markPlayerCalled(p1);
    this.playerService.markPlayerCalled(p2);

    this.playerService.increaseBAC(p1.name, 1);
    this.playerService.increaseBAC(p2.name, 1);
  }
}
