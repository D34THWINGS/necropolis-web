import { Middleware } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { DELAY_BETWEEN_TRAP_EFFECTS, PaladinCategory, PaladinType } from '../../config/constants'
import { getPaladinById, getPaladinsAssaultOngoing, getPaladinsDeck, getRemainingPaladins } from './selectors'
import { shuffleArray } from '../helpers'
import { changePaladinCategories, swapPaladinPostions, triggerTrap } from './actions'
import { castSpell } from '../spells/actions'
import { isSpellWithDamages } from '../spells/helpers'
import { PaladinCard } from './helpers'
import { random } from '../seeder'
import { RootState } from '../../store/mainReducer'

const isTriggerTrapAction = isActionOf(triggerTrap)
const isCastSpellAction = isActionOf(castSpell)

// We use a middleware instead of an epic because effects need to happen BEFORE the actual action takes
// effect on the state. This is used for every effect that triggers before applying damaging action to a paladin.
// eslint-disable-next-line @typescript-eslint/ban-types
export const paladinsDamageEffectsMiddleware: Middleware<{}, RootState> = api => next => action => {
  const state = api.getState()

  let targetPaladin: PaladinCard | null = null
  if (isTriggerTrapAction(action)) {
    targetPaladin = getPaladinById(action.payload.paladinId)(state) ?? null
  }
  if (isCastSpellAction(action) && getPaladinsAssaultOngoing(state) && isSpellWithDamages(action.payload.spell)) {
    ;[targetPaladin] = getRemainingPaladins(state)
  }

  // Commander position swap
  if (targetPaladin && targetPaladin.type === PaladinType.Commander) {
    const deck = getPaladinsDeck(state)
    const commanderIndex = deck.indexOf(targetPaladin)
    if (commanderIndex === 0) {
      const remainingPaladins = getPaladinsDeck(state).slice(commanderIndex + 1)
      const swappedPaladin = shuffleArray(remainingPaladins)[0]
      if (swappedPaladin) {
        api.dispatch(swapPaladinPostions(targetPaladin.id, swappedPaladin.id))
        if (isTriggerTrapAction(action)) {
          // Re-wire trap on the right paladin
          setTimeout(
            () => api.dispatch(triggerTrap(action.payload.trap, swappedPaladin.id)),
            DELAY_BETWEEN_TRAP_EFFECTS,
          )
          return
        }
      }
    }
  }

  // Pure category swap
  if (targetPaladin && targetPaladin.categories.includes(PaladinCategory.Pure)) {
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
    api.dispatch(changePaladinCategories(targetPaladin.id, updatedCategories))
    setTimeout(() => next(action), DELAY_BETWEEN_TRAP_EFFECTS)
    return
  }

  return next(action)
}
