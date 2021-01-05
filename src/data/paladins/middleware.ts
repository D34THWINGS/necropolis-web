import { Middleware } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { PaladinCategory, PaladinType } from '../../config/constants'
import {
  getActivePaladin,
  getPaladinById,
  getPaladinsAssaultOngoing,
  getPaladinsDeck,
  getRemainingPaladins,
} from './selectors'
import { getAnimationDelay, shuffleArray } from '../helpers'
import {
  changePaladinCategories,
  doDamagesToPaladin,
  forwardDamages,
  swapPaladinPostions,
  triggerTrap,
} from './actions'
import { castSpell } from '../spells/actions'
import { isSpellWithDamages } from '../spells/helpers'
import { isPaladinConsecrated, PaladinCard } from './helpers'
import { random } from '../seeder'
import { RootState } from '../../store/mainReducer'
import { castUndeadAbility } from '../undeads/actions'
import { isAbilityWithDamages } from '../undeads/abilities'

const isTriggerTrapAction = isActionOf(triggerTrap)
const isForwardDamagesAction = isActionOf(forwardDamages)
const isDoDamageAction = isActionOf(doDamagesToPaladin)
const isCastSpellAction = isActionOf(castSpell)
const isCastAbilityAction = isActionOf(castUndeadAbility)

// We use a middleware instead of an epic because effects need to happen BEFORE the actual action takes
// effect on the state. This is used for every effect that triggers before applying damaging action to a paladin.
// eslint-disable-next-line @typescript-eslint/ban-types
export const paladinsDamageEffectsMiddleware: Middleware<{}, RootState> = api => next => action => {
  const state = api.getState()

  if (!getPaladinsAssaultOngoing(state)) {
    return next(action)
  }

  let targetPaladin: PaladinCard | null = null
  if (isTriggerTrapAction(action) || isDoDamageAction(action)) {
    targetPaladin = getPaladinById(action.payload.paladinId)(state) ?? null
  }
  if (isCastSpellAction(action) && isSpellWithDamages(action.payload.spell)) {
    ;[targetPaladin] = getRemainingPaladins(state)
  }
  if (isCastAbilityAction(action) && isAbilityWithDamages(action.payload.ability)) {
    ;[targetPaladin] = getRemainingPaladins(state)
  }
  if (isForwardDamagesAction(action)) {
    targetPaladin = getActivePaladin(state)
  }

  if (!targetPaladin) {
    return next(action)
  }

  // Commander position swap
  if (targetPaladin.type === PaladinType.Commander) {
    const deck = getPaladinsDeck(state)
    const commanderIndex = deck.indexOf(targetPaladin)
    if (commanderIndex === 0) {
      const remainingPaladins = getPaladinsDeck(state).slice(commanderIndex + 1)
      const swappedPaladin = shuffleArray(remainingPaladins)[0]
      if (swappedPaladin) {
        api.dispatch(swapPaladinPostions(targetPaladin.id, swappedPaladin.id))
        if (isTriggerTrapAction(action)) {
          // Re-wire trap on the right paladin
          setTimeout(() => api.dispatch(triggerTrap(action.payload.trap, swappedPaladin.id)), getAnimationDelay())
          return
        }
      }
    }
  }

  // Pure category swap
  if (isPaladinConsecrated(targetPaladin)) {
    const updatedCategories = targetPaladin.categories.reduce<PaladinCategory[]>((acc, existingCategory) => {
      if (existingCategory === PaladinCategory.Pure) {
        const possibleCategories = Object.values(PaladinCategory).filter(
          category => category !== PaladinCategory.Pure && acc.indexOf(category) === -1,
        )
        return [
          ...acc,
          possibleCategories[Math.floor(random() * possibleCategories.length)] ?? PaladinCategory.Physical,
        ]
      }
      return [...acc, existingCategory]
    }, [])
    const paladinId = targetPaladin.id
    setTimeout(() => api.dispatch(changePaladinCategories(paladinId, updatedCategories)), getAnimationDelay() / 2)
    setTimeout(() => api.dispatch(action), getAnimationDelay())
    return
  }

  return next(action)
}
