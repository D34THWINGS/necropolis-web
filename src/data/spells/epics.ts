import { Epic } from 'redux-observable'
import { EMPTY, merge, of } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { ResourceType } from '../../config/constants'
import { RootState } from '../../store/mainReducer'
import { RootAction } from '../actions'
import { getIsInExpedition } from '../expeditions/selectors'
import { damageActivePaladin, repairStructure } from '../paladins/actions'
import { getPaladinsAssaultOngoing, getRemainingPaladins } from '../paladins/selectors'
import { spendResources } from '../resources/actions'
import { healUndead } from '../undeads/actions'
import { getMostInjuredUndead } from '../undeads/selectors'
import { castSpell, disableSoulStorm } from './actions'
import { isRestoration, isSoulStorm, restoration, soulStorm } from './helpers'

export const castSoulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const cast$ = action$.pipe(
    filter(isActionOf(castSpell)),
    filter(({ payload: { spell } }) => isSoulStorm(spell)),
  )

  const castDuringExpedition$ = cast$.pipe(
    filter(() => getIsInExpedition(state$.value)),
    map(() => disableSoulStorm(true)),
  )

  const castDuringAssault$ = cast$.pipe(
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    mergeMap(() => {
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
            actions: [...actions, damageActivePaladin(appliedDamages, soulStorm.targetCategories ?? [])],
          }
        },
        {
          leftDamages: soulStorm.damages ?? 0,
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
  const cast$ = action$.pipe(
    filter(isActionOf(castSpell)),
    filter(({ payload: { spell } }) => isRestoration(spell)),
  )

  const castDuringExpedition$ = cast$.pipe(
    filter(() => getIsInExpedition(state$.value)),
    mergeMap(() => {
      const mostInjuredUndead = getMostInjuredUndead(state$.value)
      if (mostInjuredUndead) {
        return of(healUndead(mostInjuredUndead.id, restoration.healthRestored ?? 0))
      }
      return EMPTY
    }),
  )

  const castDuringAssault$ = cast$.pipe(
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    map(() => repairStructure(restoration.structureRepairAmount ?? 0)),
  )

  return merge(castDuringExpedition$, castDuringAssault$)
}
