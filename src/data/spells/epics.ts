import { Epic } from 'redux-observable'
import { EMPTY, merge, of } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { ActionType, isActionOf } from 'typesafe-actions'
import { ResourceType } from '../../config/constants'
import { RootState } from '../../store/mainReducer'
import { RootAction } from '../actions'
import { getIsInExpedition } from '../expeditions/selectors'
import { damageActivePaladin, repairStructure } from '../paladins/actions'
import { getPaladinsAssaultOngoing, getRemainingPaladins } from '../paladins/selectors'
import { spendResources } from '../resources/actions'
import { healUndead } from '../undeads/actions'
import { getMostInjuredUndead } from '../undeads/selectors'
import { applyEffects, blurEffects, castSpell } from './actions'
import { isRestoration, isSoulStorm } from './helpers'
import { fleeExpedition, setExpeditionStep } from '../expeditions/actions'
import { getEffectsBlurringOnStepChange } from './effects'
import { getActiveSpellEffects } from './selectors'

const mapToSpell = map(({ payload: { spell } }: ActionType<typeof castSpell>) => spell)

export const castSoulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const cast$ = action$.pipe(filter(isActionOf(castSpell)), mapToSpell, filter(isSoulStorm))

  const castDuringExpedition$ = cast$.pipe(
    filter(() => getIsInExpedition(state$.value)),
    map(soulStorm => applyEffects(soulStorm.effects)),
  )

  const castDuringAssault$ = cast$.pipe(
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    mergeMap(soulStorm => {
      const remainingPaladins = getRemainingPaladins(state$.value)
      if (remainingPaladins.length === 0) {
        return EMPTY
      }
      const { actions: finalActions } = remainingPaladins.reduce(
        ({ leftDamages, actions }, paladinCard) => {
          if (leftDamages === 0) {
            return { leftDamages, actions }
          }
          const appliedDamages = Math.min(leftDamages, paladinCard.health)
          return {
            leftDamages: leftDamages - appliedDamages,
            actions: [...actions, damageActivePaladin(appliedDamages, soulStorm.targetCategories)],
          }
        },
        {
          leftDamages: soulStorm.damages,
          actions: new Array<RootAction>(),
        },
      )
      return of(...finalActions)
    }),
  )

  return merge(castDuringExpedition$, castDuringAssault$)
}

export const castSpellEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(castSpell)),
    map(({ payload: { spell } }) => spendResources({ [ResourceType.Souls]: spell.cost })),
  )

export const castRestorationEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const cast$ = action$.pipe(filter(isActionOf(castSpell)), mapToSpell, filter(isRestoration))

  const castDuringExpedition$ = cast$.pipe(
    filter(() => getIsInExpedition(state$.value)),
    mergeMap(restoration => {
      const mostInjuredUndead = getMostInjuredUndead(state$.value)
      if (mostInjuredUndead) {
        return of(healUndead(mostInjuredUndead.id, restoration.healthRestored))
      }
      return EMPTY
    }),
  )

  const castDuringAssault$ = cast$.pipe(
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    map(restoration => repairStructure(restoration.structureRepairAmount)),
  )

  return merge(castDuringExpedition$, castDuringAssault$)
}

export const blurEffectsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const blurOnExpeditionStep$ = action$.pipe(
    filter(isActionOf([setExpeditionStep, fleeExpedition])),
    map(() => getEffectsBlurringOnStepChange(getActiveSpellEffects(state$.value))),
  )

  return merge(blurOnExpeditionStep$).pipe(
    filter(effects => effects.length > 0),
    map(blurEffects),
  )
}
