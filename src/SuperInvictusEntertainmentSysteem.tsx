import '@/style/components/sies.sass'
import { useEffect, useState, type ReactNode } from 'react'
import type { GameID } from './types'
import { NLAlert, GAME_IDS } from './games'
import { useGame } from './hooks/useGame'
import { DebugDialog } from './DebugDialog'
import { GameStarted } from './games/GameStarted'
import type { State } from './game'
import { Quizmaster } from './games/Quizmaster'
import { GameIdle } from './games/GameIdle'
import { Mexxen } from './games/Mexxen'
import { NotificationComponent } from './games/Notification'
import { Kerstbakjes } from './games/Kerstbakjes'
import { Opus } from './games/Opus'
import { Rookpauze } from './games/Rookpauze'
import { Daan } from './games/Daan'
import { Beermile } from './games/Beermile'
import { SteenPapierBak } from './games/SteenPapierBak'
import { Diederik } from './games/Diederik'
import { SnakeEyes } from './games/SnakeEyes'
import { Sjoerd } from './games/Sjoerd'
import { Bus } from './games/Bus'
import { Ketel } from './games/Ketel'
import { Klocus } from './games/Klocus'
import { MarcoB } from './games/MarcoB'
import { FrituurAlarm } from './games/FrituurAlarm'
import { DrinkingBuddies } from './games/DrinkingBuddies'

function getGameComponent(gid: GameID): ReactNode {
  switch (gid) {
    case GAME_IDS.GAME_STARTED:
      return <GameStarted />
    case GAME_IDS.IDLE:
      return <GameIdle />
    case GAME_IDS.QUIZMASTER:
      return <Quizmaster />
    case GAME_IDS.NL_ALERT:
      return <NLAlert />
    case GAME_IDS.MEXXEN:
      return <Mexxen />
    case GAME_IDS.NOTIFICATION:
      return <NotificationComponent />
    case GAME_IDS.KERSTBAKJES:
      return <Kerstbakjes />
    case GAME_IDS.OPUS:
      return <Opus />
    case GAME_IDS.ROOKPAUZE:
      return <Rookpauze />
    case GAME_IDS.DAAN:
      return <Daan />
    case GAME_IDS.BEERMILE:
      return <Beermile />
    case GAME_IDS.STEEN_PAPIER_BAK:
      return <SteenPapierBak />
    case GAME_IDS.DIEDERIK:
      return <Diederik />
    case GAME_IDS.SNAKE_EYES:
      return <SnakeEyes />
    case GAME_IDS.SJOERD:
      return <Sjoerd />
    case GAME_IDS.BUS:
      return <Bus />
    case GAME_IDS.KETEL:
      return <Ketel />
    case GAME_IDS.KLOCUS:
      return <Klocus />
    case GAME_IDS.MARCOB:
      return <MarcoB />
    case GAME_IDS.FRITUUR:
      return <FrituurAlarm />
    case GAME_IDS.DRINKING_BUDDIES:
      return <DrinkingBuddies />
    default:
      return <div>no game component found</div>
  }
}

export function SuperInvictusEntertainmentSysteem() {
  const state: State = useGame()
  const [debug, openDebug] = useState<boolean>(false)

  // die variable is ongebruikt, aangezien dit is om een update te forceren
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceUpdate] = useState<number>(0)

  useEffect(() => {
    state.onTick(forceUpdate)
    state.startGame()
    // Initialisatie effect, kop houde
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>
    <DebugDialog show={debug} onClose={() => openDebug(false)} />

    <div className={"SIES " + state.getCssClass()}>
      <div className="Timer">
        {state.getTimeHumanReadable()}
      </div>
      <div className="Title">
        {state.getGameData()?.name}
      </div>
      <div className="DialogButton">
        <button onClick={() => openDebug(true)}>
          Debug
        </button>
      </div>

      <div className="GameComponent">
        {getGameComponent(state.getCurrentGame())}
      </div>
    </div>
  </div>

}