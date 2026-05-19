import {Component, inject} from '@angular/core';
import {PlayerPickingComponent} from '../../../components/player-picking-component';
import {AlertService} from '../../../services/alert-service';
import {GameFlowService} from '../../../services/game-flow-service';
import {SjoerdEndGame} from './sjoerd-end';

@Component({
  selector: 'app-sjoerd-game',
  imports: [],
  template: `
    <h1>Sjoerd</h1>
    <p>Na een lange tijd is Sjoerd weer terug!!</p>
    <p>Maar {{ players()[0]?.name }} en {{ players()[1]?.name }} zijn opeens verdwenen...</p>
  `,
})
export class SjoerdGame extends PlayerPickingComponent {
  private alertService = inject(AlertService);
  private gameFlowService = inject(GameFlowService);

  protected override pickCount = 2;

  override ngOnInit() {
    super.ngOnInit();

    const rounds = 3;

    this.alertService.addAlert(
      `${this.players()[0]?.name} en ${this.players()[1]?.name} zijn verdwenen, maar Sjoerd bestaat`,
      rounds
    );
    this.gameFlowService.queueGameInRounds(rounds, {
      id: "sjoerd-end",
      rarity: 0,
      component: SjoerdEndGame
    }, [this.players()[0]?.name, this.players()[1]?.name]
    )
  }
}
