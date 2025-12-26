import '@/style/components/setup.sass'
import { useState, useCallback, useRef } from 'react'

type SetupProps = {
  navigate: (to: string) => void
}

export function Setup({ navigate }: SetupProps) {
  const [players, setPlayers] = useState<Array<string>>([])

  const confirmDialog = useRef<HTMLDialogElement>(null)
  const [dialogText, setDialogText] = useState<string>('')
  const [dialogAction, setDialogAction] = useState<string>('')
  const [dialogActionButton, setDialogActionButton] = useState<() => void>()

  const openDialog = (text: string, action: string, button: () => void) => {
    setDialogText(text)
    setDialogAction(action)
    setDialogActionButton(button)
    confirmDialog.current?.show()
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
      <dialog ref={confirmDialog} onClick={closeDialog} open={false}>
        <h5>Weet je het zeker?</h5>
        <p>{dialogText}</p>
        <button onClick={dialogActionButton}>{dialogAction}</button>
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