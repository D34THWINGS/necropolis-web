import { RootState } from '../../store/mainReducer'
import { getTurn } from '../turn/selectors'
import { PALADINS_ATTACK_THRESHOLD, PALADINS_INCREASE_SPACING } from '../../config/constants'
import { isPaladinAlive, PaladinCard } from './helpers'
import { Trap } from './traps'

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

export const getPaladinsShouldAttack = (state: RootState) =>
  getPaladinsCalledToArms(state) && getPaladinsCounter(state) >= PALADINS_ATTACK_THRESHOLD

export const getPaladinsAssault = (state: RootState) => state.paladins.assault

export const getPaladinsAssaultOngoing = (state: RootState) => !!getPaladinsAssault(state)

export const getPaladinsAssaultPhase = (state: RootState) => getPaladinsAssault(state)?.phase ?? null

export const getTraps = (state: RootState) => getPaladinsAssault(state)?.traps ?? []

export const getTrapById = (id: Trap['id']) => (state: RootState) => getTraps(state).find(trap => trap.id === id)

export const getIsChangingPaladinCategory = (state: RootState) =>
  getPaladinsAssault(state)?.changingPaladinCategory ?? false

export const getRemainingPaladins = (state: RootState) => getPaladinsAssault(state)?.deck.filter(isPaladinAlive) ?? []

export const getActivePaladin = (state: RootState) => getRemainingPaladins(state)[0]

export const getUnrevealedPaladins = (state: RootState) =>
  getPaladinsAssault(state)?.deck.filter(paladin => !paladin.revealed) ?? []

export const getPaladinsDeck = (state: RootState) => getPaladinsAssault(state)?.deck ?? []

export const getPaladinById = (id: PaladinCard['id']) => (state: RootState) =>
  getPaladinsDeck(state).find(paladin => paladin.id === id)

export const getStructureHealth = (state: RootState) => state.paladins.structureHealth

export const isAssaultFinished = (state: RootState) => {
  const assault = getPaladinsAssault(state)
  if (!assault) {
    return false
  }
  return !assault.deck.some(isPaladinAlive) || getStructureHealth(state) === 0
}
