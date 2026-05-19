import {Component} from '@angular/core';
import {PlayerPickingComponent} from '../../../components/player-picking-component';

@Component({
  selector: 'app-frituur-game',
  imports: [],
  template: `
    <h1>Tijd voor frituur!</h1>
    <p>{{players()[0]?.name}} gaat het even regelen</p>
  `,
})
export class FrituurGame extends PlayerPickingComponent {
    protected override pickCount = 1;
}
