import { useEffect, useState } from 'react'
import { useGame } from '../hooks/useGame.ts'
import type { Notification } from '../types.ts'

export function NotificationComponent() {
  const state = useGame()
  const [n, setN] = useState<Notification>()

  useEffect(() => {
    const noti = state.removeNotification()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setN(noti)
  }, [])


  return (
    <div>
      <h2>{n?.title}</h2>
      <h5>{n?.text}</h5>
    </div>
  )
}

