import { useParticipants } from '../hooks/useParticipants.ts'

export function Sjoerd() {
  const ps = useParticipants()
  return (
    <div>
      <h1>SJOERD!</h1>
      <h6>{ps[0].name} en {ps[1].name} vormen samen Sjoerd!</h6>
    </div>
  )
}

