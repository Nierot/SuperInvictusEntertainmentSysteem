import { useParticipants } from '../hooks/useParticipants.ts'

export function Diederik() {
  const ps = useParticipants()
  return (
    <div>
      <h1>Diederik doet je wat</h1>
      <h6>Pas maar op {ps[0].name}!</h6>
    </div>
  )
}

