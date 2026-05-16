import {inject, Injectable} from '@angular/core';
import {SpotifyAuthService} from './spotify-auth-service';

export interface Track {
  id: string,
  name: string
}

export const INVICTUS_PLAYLIST_ID = '3ATkm5SqvN1wNdm3Rcct8B';
export const VERJAARDAGEN_PLAYLIST_ID = '2F0cdo3x9N91YG4TM1bOzT';

/**
 * Manages interactions with the Spotify API (excluding authorization; see the SpotifyAuthService)
 */
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private SPOTIFY_API_URL = 'https://api.spotify.com/v1';
  private spotifyAuthService = inject(SpotifyAuthService);

  public isAuthenticated = this.spotifyAuthService.isAuthenticated;

  private async fetch(url: string, method: string = 'GET', body?: BodyInit): Promise<Response> {

    if (!this.spotifyAuthService.isAuthenticated()) {
      throw new Error('You must be authorized before using the Spotify API');
    }

    const makeRequest = async (): Promise<Response> => {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${this.spotifyAuthService.accessToken()}`,
      };

      if (body) {
        headers['Content-Type'] = 'application/json';
      }

      return fetch(this.SPOTIFY_API_URL + url, {
        method,
        headers,
        body,
      });
    };

    let response = await makeRequest();

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("Retry-After") || 1);
      console.log(`Rate limited. Waiting ${retryAfter}s`);
      await new Promise(r => setTimeout(r, retryAfter * 1000));
      response = await makeRequest();
    } else if (response.status === 401) {
      await this.spotifyAuthService.refreshAccessToken();
      response = await makeRequest();
    } else if(!response.ok) {
      const body = await response.json();
      alert(body.error.message);
    }

    return response;
  }

  public async playPlaylist(playlistId: string): Promise<void> {
    await this.fetch(
      '/me/player/play',
      'PUT',
      JSON.stringify({context_uri: `spotify:playlist:${playlistId}`,})
    );
  }

  public async getPlaybackState() {
    const response = await this.fetch('/me/player');
    return await response.json();
  }

  public async getCurrentTrack() {
    const response = await this.fetch('/me/player/currently-playing');
    return await response.json();
  }

  public async getAllAlbumTracks(albumId:string):Promise<Track[]> {
    const tracks: { name:string, id:string }[] = [];
    let offset:number = 0;
    const limit:number = 50;

    while (true) {
      const response =  await this.fetch(`/albums/${albumId}/tracks?limit=${limit}&offset=${offset}`)

      const data = await response.json();

      tracks.push(...data.items.map(t => {return {name: t.name, id: t.id}}));

      if (!data.next) break;

      offset += limit;

      await new Promise(r => setTimeout(r, 200));
    }

    return tracks;
  }
}
