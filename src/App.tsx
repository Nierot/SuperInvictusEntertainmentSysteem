import '@/style/style.sass'
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { SuperInvictusEntertainmentSysteem } from './SuperInvictusEntertainmentSysteem.tsx'
import { Setup } from './Setup'
import { Splash } from './Splash'
import { GameContext } from './context'
import { createEmptyState, State } from './game.ts'

export function App() {
  const gameState = useContext<State>(GameContext)
  const [screen, setScreen] = useState<ReactNode>()

  function navigate(to: string) {
    window.location.hash = to

    switch (to) {
      case 'game':
        return setScreen(<SuperInvictusEntertainmentSysteem />)
      case 'setup':
        return setScreen(<Setup navigate={navigate} />)
      default:
        setScreen(<Splash navigate={navigate} />)
    }
  }

  function parseOngoingGame(og: string) {
    const success = gameState.restoreFromDump(og)

    if (success) {
      navigate('game')
    } else {
      navigate('splash')
    }
  }


  useEffect(() => {
    let hash = window.location.hash
    const ongoingGame = localStorage.getItem('sies-state')

    if (hash) {
      const spl = hash.split('#')

      hash = spl[1]

      if (hash && hash !== 'game') {
        navigate(spl[1])
        return
      } else if (ongoingGame) {
        parseOngoingGame(ongoingGame)
        return
      }
    }

    if (ongoingGame) {
      parseOngoingGame(ongoingGame)
    } else {
      navigate('splash')
    }
  }, [])

  return <div className="SiesMain">
    <GameContext value={createEmptyState()}>
      {screen}
    </GameContext>
  </div>
}