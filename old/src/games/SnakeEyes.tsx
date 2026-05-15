import { useParticipants } from '../hooks/useParticipants.ts'
import { usePunishment } from '../hooks/usePunishment.ts'

export function SnakeEyes() {
  const participants = useParticipants()
  const punishment = usePunishment(true)

  return (
    <div>
      <h1>Snake eyes!</h1>
      <h6>Als je {participants[0].name} aankijkt, dan {punishment}!</h6>
    </div>
  )
}

