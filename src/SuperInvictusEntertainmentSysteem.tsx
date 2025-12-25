import { useEffect, useState } from 'react'
import { type State } from './types'
import { Logo } from './Logo'

export function SuperInvictusEntertainmentSysteem({ state: State }) {
  const [state, _setState] = useContext(state)

  // useEffect(() => {
  // _setState({
  // })
  // }, [])

  return <div>
    <Logo />
  </div>
}
