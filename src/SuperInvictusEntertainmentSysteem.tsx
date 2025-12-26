import '@/style/components/sies.sass'
import { useState, useEffect, useRef } from 'react'
import { type State } from './types'
import { Timer } from './timer'

type SIESProps = {
  initialState: State
}

export function SuperInvictusEntertainmentSysteem({ initialState }: SIESProps) {
  const [state, setState] = useState<State>(initialState)
  const [tick, setTick] = useState<number>()
  const [timeReadable, setTimeReadable] = useState<string>('')
  const timer = useRef<Timer>(new Timer())

  useEffect(() => {
    timer.current.onTick((tick: number, thr: string) => {
      setTick(tick)
      setTimeReadable(thr)
    })

    timer.current.start()
  }, [timer])

  useEffect(() => {

  }, [tick])


  return <div className="SIES">
    <p>{timeReadable}</p>
  </div>
}
