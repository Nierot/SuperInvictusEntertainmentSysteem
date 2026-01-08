import { useParticipants } from '../hooks/useParticipants'

export function DrinkingBuddies() {
  const ps = useParticipants()
  return (
    <div>
      <h1>{ps[0].name} en {ps[1].name} zijn Drinking Buddies!</h1>
    </div>
  )
}

