import { useEffect, useState, type ReactNode } from 'react'
import './style/style.sass'
import { SuperInvictusEntertainmentSysteem } from './SuperInvictusEntertainmentSysteem.tsx'
import { Setup } from './Setup'
import { Splash } from './Splash'
import type { State } from './types.ts'

export function App() {
  const [screen, setScreen] = useState<ReactNode>()
  const [gameState, setGameState] = useState<State>()

  function navigate(to: string) {
    localStorage.setItem('sies-page', to)
    window.location.hash = to

    switch (to) {
      case 'game':
        return setScreen(<SuperInvictusEntertainmentSysteem initialState={gameState!} />)
      case 'setup':
        return setScreen(<Setup navigate={navigate} setGameState={setGameState} />)
      default:
        setScreen(<Splash navigate={navigate} />)
    }
  }

  function parseOngoingGame(og: string) {

    navigate('game')
  }


  useEffect(() => {
    let hash = window.location.hash
    const ongoingGame = localStorage.getItem('sies-game')


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

    const curPage = localStorage.getItem('sies-page')

    if (curPage) {
      navigate(curPage)
    }


    if (ongoingGame) {
      parseOngoingGame(ongoingGame)
    }
  }, [])

  return <div className="SiesMain">
    {screen}
  </div>
}