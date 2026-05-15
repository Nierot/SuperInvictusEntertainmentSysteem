import '@/style/components/dialog.sass'
import { useRef, useEffect } from 'react'
import { useGame } from './hooks/useGame.ts'
import { GAMES } from './games'

type DebugDialogProps = {
  show: boolean
  onClose?: () => void
}

export function DebugDialog({ show, onClose }: DebugDialogProps) {
  const state = useGame()
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (show) {
      dialog.current?.show()
    } else {
      if (dialog.current?.open) {
        dialog.current?.close()
      }
    }
  }, [show])

  const closeDialog = () => {
    if (dialog.current?.open) {
      dialog.current?.close()
      onClose?.()
    }
  }

  return <div className="StateVisualizer">
    <dialog ref={dialog} onClick={closeDialog}>
      <table>
        <tbody>
          <tr>
            <td>Tick</td>
            <td>{state.getTimeHumanReadable()}</td>
          </tr>
          <tr>
            <td>Game</td>
            <td>{state.getCurrentGame()} - {state.getGameData()?.name}</td>
          </tr>
          <tr>
            <td>Players</td>
            <td>{state.getPlayers()?.map(p => <p>{p.pid} {p.name} {p.score}</p>)}</td>
          </tr>
          <tr>
            <td>Games</td>
            <td>{Object.values(GAMES).map(g => <p>{g.name} {g.cooldown} ({g.defaultCooldown})</p>)}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => state.forceNewGame()}>
        Force next game
      </button>
    </dialog>
  </div>
}

