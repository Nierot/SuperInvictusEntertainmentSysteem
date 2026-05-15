import {inject, Injectable} from '@angular/core';
import {SpotifyAuthService} from './spotify-auth-service';

interface Token {
  access_token: string,
  token_type: string,
  expires_in: number
}

interface Song {

}

export const INVICTUS_PLAYLIST_ID = '3ATkm5SqvN1wNdm3Rcct8B';

/**
 * Manages interactions with the Spotify API (excluding authorization; see the SpotifyAuthService)
 */
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private spotifyAuthService = inject(SpotifyAuthService);

  public async playPlaylist(playlistId: string): Promise<void> {
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/play',
      {
        method: 'PUT',
        headers: {
          Authorization:
            `Bearer ${this.spotifyAuthService.accessToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context_uri: `spotify:playlist:${playlistId}`,
        }),
      }
    );

    if (!response.ok) {
      console.log(JSON.stringify(response))
      throw new Error(
        `Spotify playback failed: ${response.status}`
      );
    }
  }
}
