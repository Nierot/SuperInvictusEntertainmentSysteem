import { useParticipants } from '../hooks/useParticipants'

export function Bus() {
  const ps = useParticipants()
  return (
    <div>
      <h1>Kijk! Het is Fred Teeven!</h1>
      <h6>En {ps[0].name} gaat de bus in!</h6>
    </div>
  )
}

