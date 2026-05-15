import type { State } from '../game.ts'
import { type GameID, type Game } from '../types.ts'

export { NLAlert } from './NLAlert.tsx'


export const GAME_IDS = {
  GAME_STARTED: -1,
  IDLE: -2,
  NOTIFICATION: -3,
  NL_ALERT: 10,
  MEXXEN: 11,
  OPUS: 12,
  MARCOB: 13,
  FRITUUR: 14,
  DRINKING_BUDDIES: 15,
  QUIZMASTER: 20,
  DAAN: 21,
  BEERMILE: 22,
  STEEN_PAPIER_BAK: 23,
  DIEDERIK: 24,
  SNAKE_EYES: 25,
  SJOERD: 26,
  BUS: 27,
  KETEL: 28,
  KERSTBAKJES: 30,
  ROOKPAUZE: 31,
  KLOCUS: 32,
}

export const SECOND = 1
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE


export const RESERVED_GAME_IDS = [-1]

export const GAMES: Record<GameID, Game> = {
  [GAME_IDS.GAME_STARTED]: {
    gid: GAME_IDS.GAME_STARTED,
    weight: -1,
    roundTime: 60,
    defaultRoundTime: 60,
    name: 'Spel begint...',
    numPlayers: 0,
    cooldown: -1,
    defaultCooldown: -1,
    cssClass: 'GameStartedWrapper'
  },
  [GAME_IDS.IDLE]: {
    gid: GAME_IDS.IDLE,
    weight: -1,
    roundTime: 5 * MINUTE,
    defaultRoundTime: 5 * MINUTE,
    name: '',
    numPlayers: 0,
    cooldown: 0,
    defaultCooldown: 0,
    cssClass: 'GameIdleWrapper'
  },
  [GAME_IDS.NOTIFICATION]: {
    gid: GAME_IDS.NOTIFICATION,
    weight: -1,
    roundTime: 1 * MINUTE,
    defaultRoundTime: 1 * MINUTE,
    name: 'Notificatie',
    numPlayers: 0,
    cooldown: 0,
    defaultCooldown: 0,
    cssClass: 'NotificationWrapper'
  },
  [GAME_IDS.NL_ALERT]: {
    gid: GAME_IDS.NL_ALERT,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 1 * HOUR,
    name: 'NL Alert',
    numPlayers: 0,
    cssClass: 'NLAlertWrapper'
  },
  [GAME_IDS.QUIZMASTER]: {
    gid: GAME_IDS.QUIZMASTER,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 30 * MINUTE,
    name: 'Quizmaster',
    numPlayers: 1,
    effect: (state: State) => {
      console.log('effect!')
      const participants = state.getParticipants()

      state.addNotification(15 * MINUTE, `${participants[0].name} is geen Quizmaster meer!`, 'Je kan weer gezellig doen')

      state.addScore(participants[0].pid, 10)
    }
  },
  [GAME_IDS.MEXXEN]: {
    gid: GAME_IDS.MEXXEN,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 30 * MINUTE,
    name: 'Mexxen',
    numPlayers: 0,
  },
  [GAME_IDS.KERSTBAKJES]: {
    gid: GAME_IDS.KERSTBAKJES,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 2 * HOUR,
    name: 'Kerstbakjes maken!',
    numPlayers: 4,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addNotification(10 * MINUTE, `Stop de tijd`, 'Laat maar zien die kerstbakjes')

      for (const p of participants) {
        state.addScore(p.pid, 20)
      }
    },
  },
  [GAME_IDS.OPUS]: {
    gid: GAME_IDS.OPUS,
    weight: 2,
    roundTime: 5 * MINUTE,
    defaultRoundTime: 5 * MINUTE,
    cooldown: 0,
    defaultCooldown: 1 * HOUR,
    name: 'Opus',
    numPlayers: 0,
  },
  [GAME_IDS.ROOKPAUZE]: {
    gid: GAME_IDS.ROOKPAUZE,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 20 * MINUTE,
    name: 'Rookpauze!',
    numPlayers: 4,
    effect: (state: State) => {
      const participants = state.getParticipants()

      for (const p of participants) {
        state.addScore(p.pid, 5)
      }
    },
  },
  [GAME_IDS.DAAN]: {
    gid: GAME_IDS.DAAN,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 1 * HOUR,
    name: 'Daan trekt een bak haha L',
    numPlayers: 1,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addScore(participants[0].pid, 15)
    }
  },
  [GAME_IDS.BEERMILE]: {
    gid: GAME_IDS.BEERMILE,
    weight: 2,
    roundTime: 4 * MINUTE,
    defaultRoundTime: 4 * MINUTE,
    cooldown: 0,
    defaultCooldown: 1 * HOUR,
    name: 'Beermile',
    numPlayers: 2,
    effect: (state: State) => {
      const participants = state.getParticipants()

      for (const p of participants) {
        state.addScore(p.pid, 25)
      }
    },
  },
  [GAME_IDS.STEEN_PAPIER_BAK]: {
    gid: GAME_IDS.STEEN_PAPIER_BAK,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 1 * HOUR,
    name: 'Steen Papier Bak',
    numPlayers: 2,
    effect: (state: State) => {
      const participants = state.getParticipants()

      for (const p of participants) {
        state.addScore(p.pid, 15)
      }
    },
  },
  [GAME_IDS.DIEDERIK]: {
    gid: GAME_IDS.DIEDERIK,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 90 * MINUTE,
    name: 'Diederik doet je wat',
    numPlayers: 1,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addScore(participants[0].pid, 10)
    }
  },
  [GAME_IDS.SNAKE_EYES]: {
    gid: GAME_IDS.SNAKE_EYES,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 30 * MINUTE,
    name: 'Snake Eyes',
    numPlayers: 1,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addScore(participants[0].pid, 10)
    }
  },
  [GAME_IDS.SJOERD]: {
    gid: GAME_IDS.SJOERD,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 90 * MINUTE,
    name: 'Sjoerd',
    numPlayers: 2,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addNotification(1 * HOUR, `Geen sjoerd meer!`, `${participants[0].name} & ${participants[1].name} mogen los.`)

      for (const p of participants) {
        state.addScore(p.pid, 15)
      }
    },
  },
  [GAME_IDS.BUS]: {
    gid: GAME_IDS.BUS,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 30 * MINUTE,
    name: 'De bus',
    numPlayers: 1,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addScore(participants[0].pid, 10)
    }
  },
  [GAME_IDS.KETEL]: {
    gid: GAME_IDS.KETEL,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 60 * MINUTE,
    name: 'Ketel',
    numPlayers: 1,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addScore(participants[0].pid, 10)
    }
  },
  [GAME_IDS.KLOCUS]: {
    gid: GAME_IDS.KLOCUS,
    weight: 2,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 2 * HOUR,
    name: 'Klonkieballen!',
    numPlayers: 8,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addScore(participants[0].pid, 20)
    }
  },
  [GAME_IDS.MARCOB]: {
    gid: GAME_IDS.MARCOB,
    weight: 1,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 10 * HOUR,
    name: 'Marco Borsato',
    numPlayers: 0,
  },
  [GAME_IDS.FRITUUR]: {
    gid: GAME_IDS.FRITUUR,
    weight: 3,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 2 * HOUR,
    name: 'Frituur',
    numPlayers: 2,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addScore(participants[0].pid, 30)
      state.addScore(participants[1].pid, 10)
    }
  },
  [GAME_IDS.DRINKING_BUDDIES]: {
    gid: GAME_IDS.DRINKING_BUDDIES,
    weight: 6,
    roundTime: MINUTE,
    defaultRoundTime: MINUTE,
    cooldown: 0,
    defaultCooldown: 1 * HOUR,
    name: 'Drinking Buddies',
    numPlayers: 2,
    effect: (state: State) => {
      const participants = state.getParticipants()

      state.addNotification(90 * MINUTE, `Gelukkig maar!`, `${participants[0].name} en ${participants[1].name} zijn geen drinking buddies meer`)

      state.addScore(participants[0].pid, 30)
      state.addScore(participants[1].pid, 30)
    }
  },
};

