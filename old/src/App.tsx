import '@/style/style.sass'
import {useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'

import {GameContext} from './context.ts'
import {State} from './game.ts'

export function App() {
    const [game] = useState(() => new State())

    const navigate = useNavigate()

    function parseOngoingGame(og: string) {
        const success = game.restoreFromDump(og)

        if (success) {
            navigate('/game')
        } else {
            navigate('/')
        }
    }

    const ongoingGame = sessionStorage.getItem('sies-state')

    const hash = window.location.hash.replace('#', '')

    if (hash && hash !== 'game') {
        navigate(`/${hash}`)
        return
    }

    if (hash === 'game' && ongoingGame) {
        parseOngoingGame(ongoingGame)
        return
    }

    if (ongoingGame) {
        parseOngoingGame(ongoingGame)
    } else {
        navigate('/')
    }

    return (
        <div className="SiesMain">
            <GameContext.Provider value={game}>
                <Outlet/>
            </GameContext.Provider>
        </div>
    )
}