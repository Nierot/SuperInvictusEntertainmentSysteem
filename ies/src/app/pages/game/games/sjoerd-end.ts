import {Component, input} from '@angular/core';

@Component({
  selector: 'app-sjoerd-end-game',
  imports: [],
  template: `
    <h1>Fin Sjoerd</h1>
    <p>Het was weer gezellig Sjoerd, tabee!</p>
    <p>Om afscheid te nemen, drinken {{players()[0]}} en {{players()[1]}} een biertje met personen naar keuze</p>
  `,
})
export class SjoerdEndGame {
  protected players = input<string[]>(['idiot 1', 'idiot 2']);
}
