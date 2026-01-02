import '@/style/components/sies.sass'
import { useEffect, useContext, useState } from 'react'
import { State } from './game'
import { GameContext } from './context'

export function SuperInvictusEntertainmentSysteem() {
  const state = useContext<State>(GameContext)
  const [tick, setTick] = useState<number>(0)

  useEffect(() => {
    state.onTick(setTick)
    state.startGame()
  }, [])

  useEffect(() => {
  }, [tick])

  return <div className="SIES">
    <StateVisualizer />
  </div>
}

function StateVisualizer() {
  const state = useContext<State>(GameContext)

  return <div className="StateVisualizer">
    <table>
      <tbody>
        <tr>
          <td>Tick</td>
          <td>{state.getTimeHumanReadable()}</td>
        </tr>
        <tr>
          <td>Game</td>
          <td>{state.getCurrentGame()}</td>
        </tr>
        <tr>
          <td>Players</td>
          <td>{state.getPlayers().map(p => <p>{p.pid} {p.name} {p.score}</p>)}</td>
        </tr>
      </tbody>
    </table>
  </div>
}
