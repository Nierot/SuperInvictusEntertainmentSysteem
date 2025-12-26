import { useContext, useEffect, useState, type ReactNode } from 'react'
import './style/style.sass'
import { SuperInvictusEntertainmentSysteem } from './SuperInvictusEntertainmentSysteem.tsx'
import { Setup } from './Setup'
import { Splash } from './Splash'

export function App() {
  const [screen, setScreen] = useState<ReactNode>()
  const [gameState, setGameState] = useState({})

  function navigate(to: string) {
    localStorage.setItem('sies-page', to)
    window.location.hash = to

    switch (to) {
      case 'game':
        return setScreen(<SuperInvictusEntertainmentSysteem state={gameState} />)
      case 'setup':
        return setScreen(<Setup navigate={navigate} />)
      default:
        setScreen(<Splash navigate={navigate} />)
    }
  }

  useEffect(() => {
    const hash = window.location.hash

    if (hash) {
      const spl = hash.split('#')

      if (spl[1]) {
        navigate(spl[1])
        return
      }
    }

    const curPage = localStorage.getItem('sies-page')

    if (curPage) {
      navigate(curPage)
    }

    const ongoingGame = localStorage.getItem('sies-game')

    if (ongoingGame) {
      console.error('ongoing game')
      // parse ongoing game then set screen
      navigate('game')
    }
  }, [])

  return <div className="SiesMain">
    {screen}
  </div>
}