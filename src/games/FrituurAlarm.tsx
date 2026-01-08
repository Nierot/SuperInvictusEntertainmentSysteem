import { useParticipants } from '../hooks/useParticipants'

export function FrituurAlarm() {
  const ps = useParticipants()
  return (
    <div>
      <h1>{ps[0].name} gaat frituren!</h1>
      <h6>En het wordt gestreept op {ps[1].name}</h6>
    </div>
  )
}

