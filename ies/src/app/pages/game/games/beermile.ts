import {Component, inject, signal, WritableSignal} from '@angular/core';
import {PlayerService} from '../../../services/player-service';
import {PlayerPickingComponent} from '../../../components/player-picking-component';

@Component({
  selector: 'app-beermile',
  imports: [],
  template: `<div>
    <h1>Beermile!!</h1>
    <p>{{players()[0]?.name}} v.s. {{players()[1]?.name}}</p>
    <p>Bak vouwen + rondje Bastille</p>
  </div>`,
})
export class Beermile extends PlayerPickingComponent {
  protected override pickCount = 2;

  override ngOnInit() {
    super.ngOnInit();

    this.playerService.increaseBAC(this.players()[0]?.name, 1);
    this.playerService.increaseBAC(this.players()[1]?.name, 1);
  }
}
