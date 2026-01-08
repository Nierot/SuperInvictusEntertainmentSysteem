import '@/style/style.sass'
import { useEffect, useState, type ReactNode } from 'react'
import { SuperInvictusEntertainmentSysteem } from './SuperInvictusEntertainmentSysteem.tsx'
import { Setup } from './Setup'
import { Splash } from './Splash'
import { GameContext } from './context'
import { State } from './game.ts'

export function App() {
  const [game] = useState<State>(new State())
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
    const success = game.restoreFromDump(og)

    if (success) {
      navigate('game')
    } else {
      navigate('splash')
    }
  }


  useEffect(() => {
    let hash = window.location.hash
    const ongoingGame = sessionStorage.getItem('sies-state')

    if (hash) {
      const spl = hash.split('#')

      hash = spl[1]

      if (hash && hash !== 'game') {
        navigate(spl[1])
        return
      } else if (hash === 'game' && ongoingGame) {
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
    <GameContext.Provider value={game}>
      {screen}
    </GameContext.Provider>
  </div>
}