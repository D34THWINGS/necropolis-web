import { RootState } from '../../store/mainReducer'
import { getTurn } from '../turn/selectors'
import { PALADINS_ATTACK_THRESHOLD, PALADINS_INCREASE_SPACING } from '../../config/constants'

export const getPaladinsStrength = (state: RootState) => state.paladins.strength

export const getPaladinsCounter = (state: RootState) => state.paladins.counter

export const getPaladinsCalledToArms = (state: RootState) => state.paladins.calledToArms !== false

export const getShouldIncreasePaladinsStrength = (state: RootState) => {
  const calledToArmsTurn = state.paladins.calledToArms
  if (calledToArmsTurn === false) {
    return false
  }
  const turn = getTurn(state)
  return (turn - calledToArmsTurn) % PALADINS_INCREASE_SPACING === 0
}

export const getPaladinsShouldAttack = (state: RootState) => getPaladinsCounter(state) >= PALADINS_ATTACK_THRESHOLD

export const getPaladinsAssault = (state: RootState) => state.paladins.assault

export const getPaladinsAssaultOngoing = (state: RootState) => !!getPaladinsAssault(state)

export const getTraps = (state: RootState) => getPaladinsAssault(state)?.traps ?? []

export const isAssaultFinished = (state: RootState) => {
  const assault = getPaladinsAssault(state)
  if (!assault) {
    return false
  }
  if (!assault.deck.some(card => card.health > 0)) {
    return true
  }
  return !assault.traps.some(trap => !trap.used)
}
