import { RootState } from '../../store/mainReducer'
import { getTurn } from '../turn/selectors'
import { PALADINS_ATTACK_THRESHOLD, PALADINS_INCREASE_SPACING } from '../../config/constants'
import { isPaladinAlive, PaladinCard, Trap } from './helpers'

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

export const getPaladinsAssaultPhase = (state: RootState) => getPaladinsAssault(state)?.phase ?? null

export const getTraps = (state: RootState) => getPaladinsAssault(state)?.traps ?? []

export const getTrapById = (id: Trap['id']) => (state: RootState) => getTraps(state).find(trap => trap.id === id)

export const getIsChangingPaladinCategory = (state: RootState) =>
  getPaladinsAssault(state)?.changingPaladinCategory ?? false

export const getRemainingPaladins = (state: RootState) => getPaladinsAssault(state)?.deck.filter(isPaladinAlive) ?? []

export const getPaladinsDeck = (state: RootState) => getPaladinsAssault(state)?.deck ?? []

export const getPaladinById = (id: PaladinCard['id']) => (state: RootState) =>
  getPaladinsDeck(state).find(paladin => paladin.id === id)

export const isAssaultFinished = (state: RootState) => {
  const assault = getPaladinsAssault(state)
  if (!assault) {
    return false
  }
  return !assault.deck.some(isPaladinAlive) || assault.structureHealth === 0
}

export const getLostPaladinAssault = (state: RootState) => getPaladinsAssault(state)?.structureHealth === 0
