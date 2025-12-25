import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style/style.sass'
import { SuperInvictusEntertainmentSysteem } from './SuperInvictusEntertainmentSysteem.tsx'
import { Setup } from './Setup'
import { Splash } from './Splash'

function App() {
  const [screen, setScreen] = useState(<Splash />)
  const [gameState, setGameState] = useState({})

  useEffect(() => {
    const ongoingGame = localStorage.getItem('sies-game')

    if (ongoingGame) {
      console.error('ongoing game')
      // parse ongoing game then set screen
      setScreen(<SuperInvictusEntertainmentSysteem state={gameState} />)
    }
  }, [])

  return screen
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
