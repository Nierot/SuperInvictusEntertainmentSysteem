import { useParticipants } from '../hooks/useParticipants.ts'
import { usePunishment } from '../hooks/usePunishment.ts'

export function Quizmaster() {
  const participants = useParticipants()
  const punishment = usePunishment(true)

  return (
    <div>
      <h1>{participants[0].name} is Quizmaster</h1>
      <h6>Mocht je een vraag beantwoorden, dan {punishment}!</h6>
    </div>
  )
}

