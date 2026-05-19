import {Component, inject} from '@angular/core';
import {BirthdaysService} from '../../../services/birthdays-service';

@Component({
  selector: 'app-het-is-je-verjaardag-game',
  imports: [],
  template: `<p>Het is je verjaardag!</p>`,
})
export class HetIsJeVerjaardagGame {
  private birthdaysService = inject(BirthdaysService);
}
