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

  private async fetch(url: string, method: string, body?: BodyInit): Promise<Response> {

    if (!this.spotifyAuthService.isAuthorized()) {
      throw new Error('You must be authorized before using the Spotify API');
    }

    const makeRequest = async (): Promise<Response> => {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${this.spotifyAuthService.accessToken()}`,
      };

      if (body) {
        headers['Content-Type'] = 'application/json';
      }

      return fetch(url, {
        method,
        headers,
        body,
      });
    };

    let response = await makeRequest();

    if (response.status === 401) {
      await this.spotifyAuthService.refreshAccessToken();
      response = await makeRequest();
    } else if(!response.ok) {
      const body = await response.json();
      alert(body.error.message);
    }

    return response;
  }

  public async playPlaylist(playlistId: string): Promise<void> {
    const response = await this.fetch(
      'https://api.spotify.com/v1/me/player/play',
      'PUT',
      JSON.stringify({context_uri: `spotify:playlist:${playlistId}`,})
    );

    if (!response.ok) {
      console.log(JSON.stringify(response))
      throw new Error(
        `Spotify playback failed: ${response.status}`
      );
    }
  }
}
