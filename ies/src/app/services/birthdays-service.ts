import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {SpotifyService, Track, VERJAARDAGEN_PLAYLIST_ID} from './spotify-service';

@Injectable({
  providedIn: 'root',
})
export class BirthdaysService {
  private readonly BIRTHDAYS_CACHE_KEY = 'ies_birthday_cache';

  private readonly spotifyApi = inject(SpotifyService);

  readonly birthdays: WritableSignal<Track[]> = signal([]);

  constructor() {
    this.loadBirthdaysFromCache();

    effect(() => {
      const authenticated = this.spotifyApi.isAuthenticated();

      if (!authenticated) return;
      if (this.birthdays().length > 0) return;

      this.loadBirthdays();
    });

    effect(() => {
      const birthdays = this.birthdays();

      localStorage.setItem(
        this.BIRTHDAYS_CACHE_KEY,
        JSON.stringify(birthdays)
      );
    });
  }

  private loadBirthdaysFromCache() {
    try {
      const savedBirthdays = localStorage.getItem(
        this.BIRTHDAYS_CACHE_KEY
      );

      if (!savedBirthdays) {
        return;
      }

      const parsed: Track[] = JSON.parse(savedBirthdays);

      this.birthdays.set(parsed);
    } catch (err) {
      console.error('Failed to parse birthday cache', err);

      localStorage.removeItem(this.BIRTHDAYS_CACHE_KEY);
    }
  }

  private async loadBirthdays() {
    const tracks = await this.spotifyApi.getAllAlbumTracks(
      VERJAARDAGEN_PLAYLIST_ID
    );

    this.birthdays.set(tracks);
  }

  public getBirthdayTrack(playerName: string): string {
    const tracks = this.birthdays();

    if (tracks.length === 0) {
      return '';
    }

    const normalizedPlayer = this.normalize(playerName);

    const scoredTracks = tracks
      .map(track => {
        const birthdayName = this.normalize(
          this.extractBirthdayName(track.name)
        );

        return {
          track,
          score: this.calculateNameScore(
            normalizedPlayer,
            birthdayName
          ),
        };
      })
      .sort((a, b) => b.score - a.score);

    const bestMatch = scoredTracks[0];

    if (!bestMatch || bestMatch.score < 3) {
      return this.getDefaultBirthdayTrackId();
    }

    return bestMatch.track.id;
  }

  private extractBirthdayName(trackTitle: string): string {
    return trackTitle.split(',')[0].trim();
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .trim();
  }

  private calculateNameScore(
    player: string,
    candidate: string
  ): number {
    let score = 0;

    const maxLength = Math.min(
      player.length,
      candidate.length
    );

    for (let i = 0; i < maxLength; i++) {
      if (player[i] !== candidate[i]) {
        break;
      }

      score++;
    }

    if (player === candidate) {
      score += 100;
    }

    return score;
  }

  private getDefaultBirthdayTrackId(): string {
    const fallback = this.birthdays().find(track =>
      this.normalize(track.name) ===
      'dit is je verjaardag'
    );

    return fallback?.id ?? '';
  }
}
