import '@/style/components/setup.sass'
import { useState, useCallback, useRef, useContext } from 'react'
import { State } from './game'
import { GameContext } from './context'

type SetupProps = {
  navigate: (to: string) => void
}

type Dialog = {
  text: string
  action: string
  button: () => void
}

export function Setup({ navigate }: SetupProps) {
  const state = useContext<State>(GameContext)
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

    console.log('Starting game with state', state)

    state.initializePlayersFromStringArray(players)

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
        <ul>
          {players.map(p => <li key={p}>{p}</li>)}
        </ul>
      </div>
      <div>
      </div>
      <button onClick={done}>
        Start het spel
      </button>
    </div>
  </div>
}