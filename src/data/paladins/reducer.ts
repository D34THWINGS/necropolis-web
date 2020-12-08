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
  increasePaladinHealth,
  increasePaladinsCounter,
  increasePaladinsStrength,
  killPaladins,
  markPaladinRevealed,
  changePaladinsDamages,
  removeTrap,
  resetPaladinsCounter,
  setChangingPaladinCategories,
  triggerPaladinBattleCry,
  triggerPaladinsAssault,
  useTrap,
  shieldPaladin,
  skipPaladin,
  triggerPaladinAttack,
  swapPaladinPostions,
} from './actions'
import {
  applyDamagesToPaladin,
  Assault,
  createPaladinsAssault,
  createTrap,
  isPaladinAlive,
  PaladinCard,
} from './helpers'
import { NECROPOLIS_STRUCTURE_POINTS, PALADINS_ATTACK_THRESHOLD } from '../../config/constants'
import { setInArray } from '../helpers'

export type PaladinState = {
  strength: number
  counter: number
  calledToArms: false | number
  assault: Assault | null
  structureHealth: number
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
  structureHealth: NECROPOLIS_STRUCTURE_POINTS,
})
  .handleAction(increasePaladinsStrength, state => ({ ...state, strength: state.strength + 1 }))
  .handleAction(increasePaladinsCounter, state => ({ ...state, counter: state.counter + 1 }))
  .handleAction(triggerPaladinsAssault, state => ({ ...state, counter: PALADINS_ATTACK_THRESHOLD }))
  .handleAction(callToArms, (state, { payload: { turn } }) => ({
    ...state,
    calledToArms: turn,
    counter: state.counter + 1,
    strength: 3,
  }))
  .handleAction(killPaladins, state => ({ ...state, calledToArms: false }))
  .handleAction(resetPaladinsCounter, state => ({ ...state, counter: 0 }))
  .handleAction(beginPaladinsAssault, state => ({
    ...state,
    assault: createPaladinsAssault(state.strength, state.structureHealth),
  }))
  .handleAction(endPaladinsAssault, state => ({ ...state, assault: null, counter: 0 }))
  .handleAction(changeAssaultPhase, (state, { payload }) => updateAssault(state, () => ({ phase: payload.phase })))
  .handleAction(addTrap, (state, { payload }) =>
    updateAssault(state, assault => ({ traps: [...assault.traps, createTrap(payload.type)] })),
  )
  .handleAction(removeTrap, (state, { payload }) =>
    updateAssault(state, assault => ({ traps: assault.traps.filter(trap => trap.id !== payload.id) })),
  )
  .handleAction(useTrap, (state, { payload: { trapId } }) =>
    updateAssault(state, assault => {
      const trapIndex = assault.traps.findIndex(trap => trap.id === trapId)
      return trapIndex === -1
        ? null
        : {
            traps: setInArray(assault.traps, trapIndex, { ...assault.traps[trapIndex], used: true }),
          }
    }),
  )
  .handleAction(triggerPaladinBattleCry, (state, { payload: { paladinId } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, paladin => ({
        ...paladin,
        battleCryTriggered: true,
      })),
    })),
  )
  .handleAction(triggerPaladinAttack, (state, { payload: { paladinId } }) => {
    const paladin = state.assault?.deck.find(p => p.id === paladinId)
    if (!paladin) {
      return state
    }
    return {
      ...state,
      structureHealth: Math.max(state.structureHealth - paladin.damages, 0),
    }
  })
  .handleAction(doDamagesToPaladin, (state, { payload: { paladinId, damages, targetCategories } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, applyDamagesToPaladin(damages, targetCategories)),
    })),
  )
  .handleAction(damageActivePaladin, (state, { payload: { damages, targetCategories } }) =>
    updateAssault(state, assault => {
      const activePaladinIndex = assault.deck.findIndex(isPaladinAlive)
      return activePaladinIndex === -1
        ? null
        : {
            deck: updatePaladinByIndex(
              assault.deck,
              activePaladinIndex,
              applyDamagesToPaladin(damages, targetCategories),
            ),
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
  .handleAction(changePaladinsDamages, (state, { payload: { paladinIds, changeValue } }) =>
    updateAssault(state, assault => ({
      deck: paladinIds.reduce(
        (tempDeck, paladinId) =>
          updatePaladinById(tempDeck, paladinId, paladin => ({
            ...paladin,
            damages: Math.max(paladin.damages + changeValue, 0),
          })),
        assault.deck,
      ),
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
  .handleAction(shieldPaladin, (state, { payload: { paladinId } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, paladin => ({
        ...paladin,
        shield: true,
      })),
    })),
  )
  .handleAction(increasePaladinHealth, (state, { payload: { paladinId, amount } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, paladin => ({
        ...paladin,
        health: paladin.health + amount,
        maxHealth: paladin.maxHealth + amount,
      })),
    })),
  )
  .handleAction(skipPaladin, (state, { payload: { paladinId } }) =>
    updateAssault(state, assault => ({
      deck: updatePaladinById(assault.deck, paladinId, paladin => ({
        ...paladin,
        skipped: true,
      })),
    })),
  )
  .handleAction(swapPaladinPostions, (state, { payload: { paladinId, swappedPaladinId } }) =>
    updateAssault(state, assault => {
      const firstPaladinIndex = assault.deck.findIndex(paladin => paladin.id === paladinId)
      if (firstPaladinIndex === -1) {
        return null
      }
      const secondPaladinIndex = assault.deck.findIndex(paladin => paladin.id === swappedPaladinId)
      if (secondPaladinIndex === -1) {
        return null
      }
      return {
        deck: [
          ...assault.deck.slice(0, firstPaladinIndex),
          assault.deck[secondPaladinIndex],
          ...assault.deck.slice(firstPaladinIndex + 1, secondPaladinIndex),
          assault.deck[firstPaladinIndex],
          ...assault.deck.slice(secondPaladinIndex + 1),
        ],
      }
    }),
  )
