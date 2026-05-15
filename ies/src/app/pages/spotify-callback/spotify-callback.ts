import {Component} from '@angular/core';
import {
  OAUTH_STATE_STORAGE_KEY,
  SPOTIFY_AUTH_CHANNEL_KEY,
  SPOTIFY_AUTH_EVENT_CODE,
} from '../../services/spotify-auth-service';

@Component({
  selector: 'app-spotify-callback',
  imports: [],
  template: '<p>Wat doe jij hier maat? Dit is een plaatshoudende pagina. Ga spelen ofzo!</p>',
})
export class SpotifyCallback {
  private authChannel = new BroadcastChannel(SPOTIFY_AUTH_CHANNEL_KEY);

  ngOnInit(): void {
    const params = new URLSearchParams(
      window.location.search
    );

    const code = params.get('code');
    const returnedState = params.get('state');

    const storedState = sessionStorage.getItem(OAUTH_STATE_STORAGE_KEY);

    let payload:{
      type:string,
      error?:boolean,
      code?:string
    } = {type: SPOTIFY_AUTH_EVENT_CODE}

    if (!code || !storedState || returnedState !== storedState) {
      payload.error = true;
      alert("Error lol");
    } else {
      payload.code = code;
    }

    this.authChannel.postMessage(payload);
    window.close();
  }
}
