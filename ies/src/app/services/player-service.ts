import {
  computed,
  Injectable,
  Signal,
  signal,
} from '@angular/core';

interface Player {
  name: string;
  last_called: Date;
  blood_alcohol_content: number;
  last_bakkeltje: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private readonly _playerList = signal<Player[]>([]);

  readonly playerNames: Signal<string[]> = computed(() => {
    return this._playerList().map((player) => player.name);
  });

  addPlayer(name: string) {
    const trimmed = name.trim();

    if (!trimmed) {
      return;
    }

    this._playerList.update((players) => [
      ...players,
      {
        name: trimmed,
        last_called: new Date(),
        blood_alcohol_content: 0,
        last_bakkeltje: new Date()
      },
    ]);
  }

  removePlayer(index: number) {
    this._playerList.update((players) =>
      players.filter((_, i) => i !== index)
    );
  }

  clearPlayers() {
    this._playerList.set([]);
  }
}
