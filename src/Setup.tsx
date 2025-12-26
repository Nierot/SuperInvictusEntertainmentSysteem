import '@/style/components/setup.sass'
import { useState, useCallback, useRef } from 'react'
import { initState } from './game'
import type { State } from './types'

type SetupProps = {
  navigate: (to: string) => void
  setGameState: (state: State) => void
}

type Dialog = {
  text: string
  action: string
  button: () => void
}

export function Setup({ navigate, setGameState }: SetupProps) {
  const [players, setPlayers] = useState<Array<string>>([])

  const confirmDialog = useRef<HTMLDialogElement>(null)
  const [dialog, setDialog] = useState<Dialog>({ text: '', action: '', button: () => null })

  const openDialog = (text: string, action: string, button: () => void) => {
    setDialog({ text, action, button })
    confirmDialog.current!.show()
  }

  const closeDialog = () => {
    if (confirmDialog.current?.open) {
      confirmDialog.current?.close()
    }
  }

  const done = () => {
    if (players.length <= 1) {
      return openDialog(
        `Je hebt maar ${players.length} spelers gedefineerd, dat klopt vast niet.`,
        `Nee dat klopt niet nee`,
        closeDialog
      )
    }

    // TODO: init gamestate
    const state = initState(players)
    setGameState(state)

    navigate('game')
  }

  const handleChange = useCallback((event) => {
    const spl: Array<string> = event.target.value.split(',')

    const ps: Array<string> = []

    spl.forEach(p => {
      if (p !== '') {
        ps.push(p.trim())
      }
    })

    setPlayers(ps)
  }, [])


  return <div>
    <div className="SetupScreen">
      <dialog ref={confirmDialog} onClick={closeDialog}>
        <h5>Weet je het zeker?</h5>
        <p>{dialog.text}</p>
        <button onClick={dialog.button}>{dialog.action}</button>
      </dialog>
      <h2>Spel instellingen</h2>
      <div className='Players'>
        <h3>Spelers</h3>
        <textarea onChange={handleChange} />
        <p>Voer de naam van elke speler komma-gescheiden in. Spelers kunnen tijdens het spel ten alle tijde worden toegevoegd/verwijderd.</p>
        <table>
          <tbody>
            {players.map(p => <tr key={p}><td>{p}</td></tr>)}
          </tbody>
        </table>
      </div>
      <div>
      </div>
      <button onClick={done}>
        Start het spel
      </button>
    </div>
  </div>
}