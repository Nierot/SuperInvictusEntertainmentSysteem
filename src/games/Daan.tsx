import { useParticipants } from '../hooks/useParticipants'

export function Daan() {
  const ps = useParticipants()
  return (
    <div>
      <h1>Dikke L</h1>
      <h6>Daan & {ps[0].name} trekken een bak!</h6>
    </div>
  )
}

