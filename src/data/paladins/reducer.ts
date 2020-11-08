import { createReducer } from 'typesafe-actions'
import {
  addTrap,
  beginPaladinsAssault,
  callToArms,
  changeAssaultPhase,
  endPaladinsAssault,
  increasePaladinsCounter,
  increasePaladinsStrength,
  killPaladins,
  removeTrap,
  resetPaladinsCounter,
  triggerPaladinsAttack,
  useTrap,
} from './actions'
import { Assault, createPaladinsAssault, createTrap, PaladinCard } from './helpers'
import { PALADINS_ATTACK_THRESHOLD, TRAP_DAMAGES_MAP } from '../../config/constants'

const doDamages = (deck: PaladinCard[], damages: number) => {
  const activePaladin = deck.find(paladin => paladin.health > 0)

  if (!activePaladin) {
    return deck
  }

  const activePaladinIndex = deck.indexOf(activePaladin)
  return [
    ...deck.slice(0, activePaladinIndex),
    { ...activePaladin, health: Math.max(0, activePaladin.health - damages) },
    ...deck.slice(activePaladinIndex + 1),
  ]
}

export const paladins = createReducer({
  strength: 0,
  counter: 0,
  calledToArms: false as false | number,
  assault: null as Assault | null,
})
  .handleAction(increasePaladinsStrength, state => ({ ...state, strength: state.strength + 1 }))
  .handleAction(increasePaladinsCounter, state => ({ ...state, counter: state.counter + 1 }))
  .handleAction(triggerPaladinsAttack, state => ({ ...state, counter: PALADINS_ATTACK_THRESHOLD }))
  .handleAction(callToArms, (state, { payload: { turn } }) => ({
    ...state,
    calledToArms: turn,
    counter: state.counter + 1,
    strength: 1,
  }))
  .handleAction(killPaladins, state => ({ ...state, calledToArms: false }))
  .handleAction(resetPaladinsCounter, state => ({ ...state, counter: 0 }))
  .handleAction(beginPaladinsAssault, state => ({ ...state, assault: createPaladinsAssault(state.strength) }))
  .handleAction(endPaladinsAssault, state => ({ ...state, assault: null, counter: 0 }))
  .handleAction(changeAssaultPhase, (state, { payload }) => {
    if (state.assault) {
      return { ...state, assault: { ...state.assault, phase: payload.phase } }
    }
    return state
  })
  .handleAction(addTrap, (state, { payload }) => {
    if (!state.assault) {
      return state
    }
    return {
      ...state,
      assault: {
        ...state.assault,
        traps: [...state.assault.traps, createTrap(payload.type)],
      },
    }
  })
  .handleAction(removeTrap, (state, { payload }) => {
    if (!state.assault) {
      return state
    }
    return {
      ...state,
      assault: {
        ...state.assault,
        traps: state.assault.traps.filter(trap => trap.id !== payload.id),
      },
    }
  })
  .handleAction(useTrap, (state, { payload }) => {
    if (!state.assault) {
      return state
    }
    const {
      assault: { traps, deck },
    } = state
    const trap = traps.find(t => t.id === payload.id)
    const activePaladin = deck.find(paladin => paladin.health > 0)
    if (!trap || !activePaladin) {
      return state
    }
    const trapIndex = traps.indexOf(trap)
    const trapDamages = TRAP_DAMAGES_MAP[trap.type]
    return {
      ...state,
      assault: {
        ...state.assault,
        traps: [...traps.slice(0, trapIndex), { ...trap, used: true }, ...traps.slice(trapIndex + 1)],
        deck: Array.isArray(trapDamages) ? trapDamages.reduce(doDamages, deck) : doDamages(deck, trapDamages),
      },
    }
  })
