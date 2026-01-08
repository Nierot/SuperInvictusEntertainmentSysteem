import { useParticipants } from '../hooks/useParticipants'

export function Klocus() {
  const participants = useParticipants()

  return (
    <div>
      <h1>Klonkieballen</h1>
      <h6>Het is koud, het sneeuwt, en we gaan klonkieballen!</h6>
      <h6>Team 1: {participants[0].name}, {participants[1].name}, {participants[2].name}, {participants[3].name}</h6>
      <h6>Team 2: {participants[4].name}, {participants[5].name}, {participants[6].name}, {participants[7].name}</h6>
    </div>
  )
}

