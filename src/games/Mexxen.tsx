import { usePunishment } from '../hooks/usePunishment'

export function Mexxen() {
  const p = usePunishment(true)
  return (
    <div>
      <h1>We gaan een rondje Mexxen!</h1>
      <h6>Als je verliest dan {p}</h6>
    </div>
  )
}

