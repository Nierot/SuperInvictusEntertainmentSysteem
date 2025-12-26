import { useRef } from 'react';
import { Logo } from './Logo';
import '@/style/components/splash.sass'
import '@/style/components/dialog.sass'

type SplashProps = {
  navigate: (to: string) => void
}

export function Splash({ navigate }: SplashProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  function openDialog() {
    dialog.current?.show()
  }

  function closeDialog() {
    if (dialog.current?.open) {
      dialog.current?.close()
    }
  }

  function moveToSetup() {
    navigate('setup')
  }

  return <div className="SplashScreen">
    <dialog ref={dialog} onClick={closeDialog} open={false}>
      <h3>Super Invictus Entertainment Systeem</h3>
      <br />
      <p>Een leuk stukje tekst die je het spelletje uitlegd kan hier staan, maar dat staat er niet. De enige manier om er achter te komen wat dit is, is om het een keertje te spelen, dus ik vraag mij een beetje af waarom je uberhaupt op deze knop hebt gedrukt. Eehhh, @chris als je dit leest dan krijg je een any</p>
    </dialog>

    <Logo />

    <button onClick={moveToSetup}>
      Start spel
    </button>

    <button onClick={openDialog}>
      Wat is dit?
    </button>
  </div>
}