import { useParticipants } from '../hooks/useParticipants'

export function Ketel() {
  const p = useParticipants()
  return (
    <div>
      <h1>Kijk! Het is Stok</h1>
      <h6>{p[0].name} drinkt gezellig een keteltje met hem</h6>
    </div>
  )
}

