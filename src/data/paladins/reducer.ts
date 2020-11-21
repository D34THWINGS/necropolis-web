import { createReducer } from 'typesafe-actions'
import {
  addTrap,
  beginPaladinsAssault,
  breakPaladinShield,
  callToArms,
  changeAssaultPhase,
  changePaladinCategories,
  damageActivePaladin,
  doDamagesToPaladin,
  endPaladinsAssault,
  increasePaladinsCounter,
  increasePaladinsStrength,
  killPaladins,
  markPaladinRevealed,
  reducePaladinDamages,
  removeTrap,
  resetPaladinsCounter,
  setChangingPaladinCategories,
  triggerPaladinsAttack,
  useTrap,
} from './actions'
import { Assault, createPaladinsAssault, createTrap, isPaladinAlive, PaladinCard } from './helpers'
import { PALADINS_ATTACK_THRESHOLD } from '../../config/constants'
import { setInArray } from '../helpers'

type PaladinState = {
  strength: number
  counter: number
  calledToArms: false | number
  assault: Assault | null
}

const updatePaladinByIndex = (
  deck: PaladinCard[],
  paladinIndex: number,
  callback: (activePaladin: PaladinCard) => PaladinCard,
) => setInArray(deck, paladinIndex, callback(deck[paladinIndex]))

const updatePaladinById = (
  deck: PaladinCard[],
  paladinId: number,
  callback: (activePaladin: PaladinCard) => PaladinCard,
) => {
  const paladinIndex = deck.findIndex(({ id }) => paladinId === id)
  if (paladinIndex === -1) {
    return deck
  }

  return updatePaladinByIndex(deck, paladinIndex, callback)
}

const applyDamagesToPaladin = (damages: number) => (paladin: PaladinCard) =>
  paladin.shield
    ? paladin
    : {
        ...paladin,
        health: Math.max(0, paladin.health - damages),
      }

const updateAssault = (state: PaladinState, callback: (assault: Assault) => Partial<Assault> | null) => {
  if (!state.assault) {
    return state
  }
  const updatedAssault = callback(state.assault)
  if (updatedAssault === null) {
    return state
  }
  return {
    ...state,
    assault: {
      ...state.assault,
      ...updatedAssault,
    },
  }
}

export const paladins = createReducer<PaladinState>({
  strength: 0,
  counter: 0,
  calledToArms: false,
  assault: null,
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
  .handleAction(changeAssaultPhase, (state, { payload }) => updateAssault(state, () => ({ phase: payload.phase })))
  .handleAction(addTrap, (state, { payload }) =>
    updateAssault(state, assault => ({ traps: [...assault.traps, createTrap(payload.type)] })),
  )
  .handleAction(removeTrap, (state, { payload }) =>
    updateAssault(state, assault => ({ traps: assault.traps.filter(trap => trap.id !== payload.id) })),
  )
  .handleAction(useTrap, (state, { payload }) =>
    updateAssault(state, assault => {
      const trapIndex = assault.traps.findIndex(trap => trap.id === payload.id)
      return trapIndex === -1
        ? null
        : {
            traps: setInArray(assault.traps, trapIndex, { ...assault.traps[trapIndex], used: true }),
          }
    }),
  )
  .handleAction(doDamagesToPaladin, (state, { payload: { paladinId, damages } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, applyDamagesToPaladin(damages)),
    })),
  )
  .handleAction(damageActivePaladin, (state, { payload: { damages } }) =>
    updateAssault(state, assault => {
      const activePaladinIndex = assault.deck.findIndex(isPaladinAlive)
      return activePaladinIndex === -1
        ? null
        : {
            deck: updatePaladinByIndex(assault.deck, activePaladinIndex, applyDamagesToPaladin(damages)),
          }
    }),
  )
  .handleAction(setChangingPaladinCategories, state => updateAssault(state, () => ({ changingPaladinCategory: true })))
  .handleAction(changePaladinCategories, (state, { payload: { paladinId, categories } }) =>
    updateAssault(state, assault => ({
      changingPaladinCategory: false,
      deck: updatePaladinById(assault.deck, paladinId, paladin => ({
        ...paladin,
        categories,
      })),
    })),
  )
  .handleAction(breakPaladinShield, (state, { payload: { paladinId } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, paladin => ({
        ...paladin,
        shield: false,
      })),
    })),
  )
  .handleAction(reducePaladinDamages, (state, { payload: { paladinId } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, paladin => ({
        ...paladin,
        damages: Math.max(paladin.damages - 1, 0),
      })),
    })),
  )
  .handleAction(markPaladinRevealed, (state, { payload: { paladinId } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, paladin => ({
        ...paladin,
        revealed: true,
      })),
    })),
  )
