import {Component, inject} from '@angular/core';
import {BirthdaysService} from '../../../../services/birthdays-service';

@Component({
  selector: 'app-het-is-je-verjaardag-game',
  imports: [],
  templateUrl: './het-is-je-verjaardag-game.html',
  styleUrl: './het-is-je-verjaardag-game.less',
})
export class HetIsJeVerjaardagGame {
  private birthdaysService = inject(BirthdaysService);
}
