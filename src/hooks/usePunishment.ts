/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { selectRandomNumberBetween } from '../random';

export function usePunishment(firstPerson: boolean): string {
  const [punishment, setPunishment] = useState('0 slokken')

  useEffect(() => {
    const p = selectRandomNumberBetween(1, 10)
    if (p === 1) {
      if (firstPerson) {
        setPunishment('neem je 1 slok')
      } else {
        setPunishment('nemen 1 slok')
      }
    } else if (p > 9) {
      if (firstPerson) {
        setPunishment('trek je een bak')
      } else {
        setPunishment('trekken een bak')
      }
    } else {
      if (firstPerson) {
        setPunishment(`neem je ${p} slokken`)
      } else {
        setPunishment(`nemen ${p} slokken`)
      }
    }
  }, [])

  return punishment
}

