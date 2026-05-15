import { useParticipants } from '../hooks/useParticipants.ts'

export function Beermile() {
  const ps = useParticipants()
  return (
    <div>
      <h1>Beermile</h1>
      <h6>{ps[0].name} vs. {ps[1].name}</h6>
      <h6>Rondje bastille</h6>
    </div>
  )
}

