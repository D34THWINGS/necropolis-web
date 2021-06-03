import React, { useRef } from 'react'
import { isActionOf } from 'typesafe-actions'
import anime from 'animejs'
import { Dice, DiceProps } from './Dice'
import { useReduxEventHook } from '../../hooks/useReduxEventHook'
import { rollObstacleDices } from '../../data/expeditions/actions'

export type RollingDiceProps = DiceProps

export const RollingDice = ({ size, value, type }: RollingDiceProps) => {
  const diceRef = useRef<HTMLSpanElement>(null)

  useReduxEventHook(isActionOf(rollObstacleDices), () => {
    if (!diceRef.current) {
      return
    }
    anime({
      targets: diceRef.current,
      autoplay: true,
      duration: 800,
      rotate: [0, '8turn'],
      easing: 'easeInOutSine',
    })
    anime({
      targets: Array.from(diceRef.current.children)[1],
      direction: 'alternate',
      autoplay: true,
      duration: 400,
      opacity: 0,
      easing: 'easeInOutSine',
    })
  })

  return <Dice ref={diceRef} type={type} value={value} size={size} />
}
