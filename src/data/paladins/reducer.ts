import { createReducer } from 'typesafe-actions'
import {
  addTrap,
  beginPaladinsAssault,
  breakPaladinShield,
  callToArms,
  changeAssaultPhase,
  changePaladinCategories,
  changePaladinsDamages,
  doDamagesToPaladin,
  endPaladinsAssault,
  increasePaladinHealth,
  increasePaladinsCounter,
  increasePaladinsStrength,
  killPaladins,
  markPaladinsRevealed,
  removeTrap,
  repairStructure,
  resetPaladinsCounter,
  setChangingPaladinCategories,
  shieldPaladin,
  skipPaladin,
  swapPaladinPostions,
  triggerPaladinAttack,
  triggerPaladinBattleCry,
  triggerPaladinsAssault,
  triggerTrap,
} from './actions'
import { applyDamagesToPaladin, Assault, createPaladinsAssault, isCommander, PaladinCard } from './helpers'
import { NECROPOLIS_STRUCTURE_POINTS, PALADINS_ATTACK_THRESHOLD, PaladinsAssaultPhase } from '../../config/constants'
import { findAndPutFirstInArray, setInArray, shuffleArray } from '../helpers'
import { createTrap } from './traps'

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
  paladinId: string,
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
  strength: 1,
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
    counter: 2,
    strength: 3,
  }))
  .handleAction(killPaladins, state => ({ ...state, calledToArms: false }))
  .handleAction(resetPaladinsCounter, state => ({ ...state, counter: 0 }))
  .handleAction(beginPaladinsAssault, state => ({
    ...state,
    assault: createPaladinsAssault(state.strength, state.structureHealth),
  }))
  .handleAction(endPaladinsAssault, state => ({ ...state, assault: null, counter: 0, strength: state.strength + 1 }))
  .handleAction(changeAssaultPhase, (state, { payload: { phase } }) =>
    updateAssault(state, assault => {
      // Shuffle deck when entering prepare phase
      if (assault.phase === PaladinsAssaultPhase.Revealing && phase === PaladinsAssaultPhase.Preparing) {
        return { phase, deck: findAndPutFirstInArray(shuffleArray(assault.deck), isCommander) }
      }
      return { phase }
    }),
  )
  .handleAction(addTrap, (state, { payload }) =>
    updateAssault(state, assault => ({ traps: [...assault.traps, createTrap(payload.type)] })),
  )
  .handleAction(removeTrap, (state, { payload }) =>
    updateAssault(state, assault => ({ traps: assault.traps.filter(trap => trap.id !== payload.id) })),
  )
  .handleAction(triggerTrap, (state, { payload: { trap } }) =>
    updateAssault(state, assault => {
      const trapIndex = assault.traps.findIndex(({ id }) => id === trap.id)
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
  .handleAction(markPaladinsRevealed, (state, { payload: { paladinIds } }) =>
    updateAssault(state, assault => ({
      deck: paladinIds.reduce(
        (deck, paladinId) =>
          updatePaladinById(deck, paladinId, paladin => ({
            ...paladin,
            revealed: true,
          })),
        assault.deck,
      ),
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
  .handleAction(repairStructure, (state, { payload: { amount } }) => ({
    ...state,
    structureHealth: Math.min(state.structureHealth + amount, NECROPOLIS_STRUCTURE_POINTS),
  }))
