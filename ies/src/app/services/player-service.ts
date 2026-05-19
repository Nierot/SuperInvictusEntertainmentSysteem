import {computed, effect, Injectable, signal, Signal,} from '@angular/core';

export interface Player {
  name: string;
  last_called: number;
  blood_alcohol_content: number;
  last_bakkeltje: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private readonly PLAYER_SAVE_KEY = 'ies_players';

  private readonly _playerList = signal<Player[]>([]);

  readonly playerNames: Signal<string[]> = computed(() => {
    return this._playerList().map((player) => player.name);
  });

  constructor() {
    this.loadPlayers();

    effect(() => {
      this.savePlayers();
    });
  }

  /**
   * Save players to localStorage
   */
  private savePlayers() {
    localStorage.setItem(
      this.PLAYER_SAVE_KEY,
      JSON.stringify(this._playerList())
    );
  }

  /**
   * Load players from localStorage
   */
  private loadPlayers() {
    const stored =
      localStorage.getItem(this.PLAYER_SAVE_KEY);

    if (!stored) { return; }

    try {
      const players: Player[] = JSON.parse(stored);

      this._playerList.set(players);
    } catch (error) {
      console.error(
        'Failed to load players from localStorage',
        error
      );

      this._playerList.set([]);
    }
  }

  addPlayer(name: string) {
    const trimmed = name.trim();

    if (!trimmed) { return; }

    this._playerList.update((players) => [
      ...players,
      {
        name: trimmed,
        last_called: 0,
        blood_alcohol_content: 0,
        last_bakkeltje: 0
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

  private weightedPick<T>(
    items: T[],
    weightFn: (item: T) => number
  ): T {
    if (items.length === 0) {
      throw Error(
        'Waarom gebruik je ook een lege lijst hierop??'
      );
    }

    const weighted = items.map(item => ({
      item,
      weight: Math.max(0, weightFn(item))
    }));

    const totalWeight = weighted.reduce(
      (sum, entry) => sum + entry.weight,
      0
    );

    if (totalWeight <= 0) {
      return items[
        Math.floor(Math.random() * items.length)
        ];
    }

    let random = Math.random() * totalWeight;

    for (const entry of weighted) {
      random -= entry.weight;

      if (random <= 0) {
        return entry.item;
      }
    }

    return weighted[0].item;
  }

  pickPlayers(
    count: number,
    options?: {
      exclude?: string[];
      preferDrunk?: boolean;
      preferSober?: boolean;
    }
  ): Player[] {

    const exclude = options?.exclude ?? [];

    let availablePlayers =
      this._playerList().filter(
        player =>
          !exclude.includes(player.name)
      );

    const selected: Player[] = [];

    count = Math.min(count, availablePlayers.length);

    for (let i = 0; i < count; i++) {
      const picked =
        this.weightedPick(
          availablePlayers,
          player => {
            let weight = player.last_called;

            if (options?.preferDrunk) {
              weight *= (
                player.blood_alcohol_content + 1
              );
            }

            if (options?.preferSober) {
              weight *= (
                1 /
                (player.blood_alcohol_content + 0.1)
              );
            }

            return weight;
          }
        );

      selected.push(picked);

      availablePlayers =
        availablePlayers.filter(
          p => p.name !== picked.name
        );
    }

    this._playerList.update(players =>
      players.map(player =>
        selected.includes(player)
          ? {
        ...player,
          last_called: 0
          }
          : {
            ...player,
            last_called: player.last_called + 1
          }
      )
    );

    return selected;
  }

  increaseBAC(
    playerName: string,
    amount: number
  ) {
    this._playerList.update(players =>
      players.map(player =>
        player.name === playerName
          ? {
            ...player,
            blood_alcohol_content:
              player.blood_alcohol_content + amount
          }
          : player
      )
    );
  }
}
