import {Component, inject, signal} from '@angular/core';
import {PlayerService} from '../../services/player-service';
import {GAME_PATH, HOME_PATH} from '../../app.routes';
import {Router} from '@angular/router';
import {SpotifyAuthService} from '../../services/spotify-auth-service';
import {SpotifyService} from '../../services/spotify-service';

@Component({
  selector: 'app-setup',
  imports: [],
  templateUrl: './setup.html',
  styleUrl: './setup.less',
})
export class Setup {
  private router = inject(Router);
  private playerService = inject(PlayerService);
  protected spotifyAuthService = inject(SpotifyAuthService);
  protected spotifyService = inject(SpotifyService);
  protected playerNames = this.playerService.playerNames;
  protected dialogVisible = signal(false);

  protected doConfirm() {
    this.router.navigate([GAME_PATH]);
  }

  protected doBack() {
    this.router.navigate([HOME_PATH]);
  }

  protected openDialog() {
    this.dialogVisible.set(true);
  }

  protected closeDialog() {
    this.dialogVisible.set(false);
  }

  protected enterPlayer(value:string, input:HTMLInputElement) {
      const trimmed = value.trim();

      if (!trimmed) {
        return;
      }

      this.playerService.addPlayer(trimmed);
      input.value = "";
  }

  protected removePlayer(index: number) {
    this.playerService.removePlayer(index);
  }

  protected authSpotify() {
    this.spotifyAuthService.login();
  }
}
