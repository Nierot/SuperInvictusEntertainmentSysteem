import { useParticipants } from '../hooks/useParticipants'

export function Rookpauze() {
  const ps = useParticipants()
  return (
    <div>
      <h1>Is het weer zover?</h1>
      <h6>{ps[0].name}, {ps[1].name}, {ps[2].name} en {ps[3].name} mogen gaan roken, als je dat wil. </h6>
    </div>
  )
}

