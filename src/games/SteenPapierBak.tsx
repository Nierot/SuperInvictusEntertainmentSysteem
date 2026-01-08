import { useParticipants } from '../hooks/useParticipants'

export function SteenPapierBak() {
  const ps = useParticipants()
  return (
    <div>
      <h1>Steen papier bak</h1>
      <h6>{ps[0].name} vs. {ps[1].name}</h6>
    </div>
  )
}

