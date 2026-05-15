import { useParticipants } from '../hooks/useParticipants.ts'
import { usePunishment } from '../hooks/usePunishment.ts'

export function Kerstbakjes() {
  const participants = useParticipants()
  const punishment = usePunishment(false)

  return (
    <div>
      <h1>Kerstbakjes maken!</h1>
      <h6>2 teams hebben 10 minuten om het creatiefste kerstbakje te maken. De rest bepaalt wie heeft gewonnen.</h6>
      <h6>De verliezers {punishment}</h6>
      <h6>{participants[0].name} & {participants[1].name} vs {participants[2].name} & {participants[3].name}</h6>
    </div>
  )
}

