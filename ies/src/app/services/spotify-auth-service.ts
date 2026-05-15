import {Injectable, Signal, signal} from '@angular/core';
import {environment} from '../../environment/environment';

const ACCESS_TOKEN_STORAGE_KEY = 'spotify_access_token'
const REFRESH_TOKEN_STORAGE_KEY = 'spotify_refresh_token'
const CODE_VERIFIER_STORAGE_KEY = 'spotify_code_verifier'
const AUTH_CODE_STORAGE_KEY = 'spotify_auth_code';

export const OAUTH_STATE_STORAGE_KEY = 'spotify_oauth_state';
export const SPOTIFY_AUTH_CHANNEL_KEY = 'spotify_auth';
export const SPOTIFY_AUTH_EVENT_CODE = 'SPOTIFY_AUTH_CODE';

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
};

/**
 * Manages authentication towards the Spotify API
 */
@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  private clientId = environment.spotify.clientId;
  private redirectUri = environment.url + environment.spotify.redirectUri;
  private authChannel = new BroadcastChannel(SPOTIFY_AUTH_CHANNEL_KEY);

  private _accessToken = signal<string>('');
  public accessToken = this._accessToken.asReadonly();
  private _refreshToken = signal<string>('');

  constructor() {
    this.loadStoredTokens();
    this.initAuthListener();
  }

  private loadStoredTokens() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

    if (accessToken) {
      this._accessToken.set(accessToken);
    }

    if (refreshToken) {
      this._refreshToken.set(refreshToken);
    }
  }

  private storeTokens(access: string, refresh: string) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh);
  }

  // ----------------------------
  // PKCE helpers
  // ----------------------------

  private generateRandomString(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const values = crypto.getRandomValues(new Uint8Array(length));

    return Array.from(values)
      .map(x => chars[x % chars.length])
      .join('');
  }

  private async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    return crypto.subtle.digest('SHA-256', encoder.encode(plain));
  }

  private base64UrlEncode(buffer: ArrayBuffer): string {
    return btoa(
      String.fromCharCode(...new Uint8Array(buffer))
    )
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private async createCodeChallenge(verifier: string): Promise<string> {
    const hashed = await this.sha256(verifier);
    return this.base64UrlEncode(hashed);
  }

  // ----------------------------
  // Login
  // ----------------------------

  async login(): Promise<void> {
    const codeVerifier = this.generateRandomString(64);
    const codeChallenge = await this.createCodeChallenge(codeVerifier);

    const state = crypto.randomUUID();

    sessionStorage.setItem(CODE_VERIFIER_STORAGE_KEY, codeVerifier);
    sessionStorage.setItem(OAUTH_STATE_STORAGE_KEY, state);

    const scopes = [
      'user-modify-playback-state',
      'user-read-playback-state',
      'user-read-currently-playing',
    ];

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope: scopes.join(' '),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: this.redirectUri,
      state,
    });

    const url =
      `https://accounts.spotify.com/authorize?${params}`;

    window.open(url, '_blank', 'width=500,height=700');
  }

  public logout() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);

    this._accessToken.set('');
    this._refreshToken.set('');
  }

  // ----------------------------
  // Callback handling
  // ----------------------------

  initAuthListener(): void {
    this.authChannel.onmessage = async (event) => {
      if (event.data?.type !== SPOTIFY_AUTH_EVENT_CODE) return;
      if (event.data?.error) {
        sessionStorage.removeItem(CODE_VERIFIER_STORAGE_KEY);
        sessionStorage.removeItem(OAUTH_STATE_STORAGE_KEY);
        return;
      }

      sessionStorage.setItem(AUTH_CODE_STORAGE_KEY, event.data.code);

      await this.exchangeCodeForToken();
    };
  }

  // ----------------------------
  // Token exchange
  // ----------------------------

  async exchangeCodeForToken(): Promise<void> {
    const authCode = sessionStorage.getItem(AUTH_CODE_STORAGE_KEY);
    const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_STORAGE_KEY);

    if (!authCode || !codeVerifier) {
      throw new Error(
        'Missing auth code or code verifier'
      );
    }

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          grant_type: 'authorization_code',
          code: authCode,
          redirect_uri: this.redirectUri,
          code_verifier: codeVerifier,
        }),
      }
    );

    const data: TokenResponse = await response.json();

    const access_token = data.access_token;
    const refresh_token = data.refresh_token ?? '';

    this._accessToken.set(access_token);
    this._refreshToken.set(refresh_token);

    this.storeTokens(
      access_token,
      refresh_token
    );

    sessionStorage.removeItem(AUTH_CODE_STORAGE_KEY);
    sessionStorage.removeItem(CODE_VERIFIER_STORAGE_KEY);
    sessionStorage.removeItem(OAUTH_STATE_STORAGE_KEY);
  }

  // ----------------------------
  // Refresh token
  // ----------------------------

  async refreshAccessToken(): Promise<void> {
    if (!this._refreshToken()) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this._refreshToken(),
          client_id: this.clientId,
        }),
      }
    );

    const data: TokenResponse = await response.json();

    const access_token = data.access_token;
    const refresh_token = data.refresh_token ?? '';

    this._accessToken.set(access_token);
    this._refreshToken.set(refresh_token);

    this.storeTokens(access_token, refresh_token);
  }

  // ----------------------------
  // Helpers
  // ----------------------------

  isAuthorized(): boolean {
    return this._accessToken() !== '';
  }
}
