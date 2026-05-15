import {
  Component, inject
} from '@angular/core';
import {Logo} from '../../logo/logo';
import {Router} from '@angular/router';
import {SETUP_PATH} from '../../app.routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.less',
  imports: [
    Logo
  ]
})
export class Home {
  private router = inject(Router);

  toSetup() {
    this.router.navigate([SETUP_PATH]);
  }
}
