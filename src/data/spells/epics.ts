import { isActionOf } from 'typesafe-actions'
import { Epic } from 'redux-observable'
import { EMPTY, merge, of } from 'rxjs'
import { filter, map, mapTo, mergeMap } from 'rxjs/operators'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { endEvent } from '../events/actions'
import { setExpeditionStep } from '../expeditions/actions'
import { getIsSoulStormActive } from './selectors'
import { castSpell, disableSoulStorm } from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType } from '../../config/constants'
import { isRestoration, restoration } from './helpers'
import { healUndead } from '../undeads/actions'
import { getMostInjuredUndead } from '../undeads/selectors'
import { getIsInExpedition } from '../expeditions/selectors'
import { getPaladinsAssaultOngoing } from '../paladins/selectors'
import { repairStructure } from '../paladins/actions'

export const soulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([nextPhase, endEvent, setExpeditionStep])),
    filter(() => getIsSoulStormActive(state$.value)),
    mapTo(disableSoulStorm(false)),
  )

export const castSpellEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(castSpell)),
    map(({ payload: { spell } }) => spendResources({ [ResourceType.Souls]: spell.cost })),
  )

export const castRestorationEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const restorationCast$ = action$.pipe(
    filter(isActionOf(castSpell)),
    filter(({ payload: { spell } }) => isRestoration(spell)),
  )

  const restorationCastDuringExpedition$ = restorationCast$.pipe(
    filter(() => getIsInExpedition(state$.value)),
    mergeMap(() => {
      const mostInjuredUndead = getMostInjuredUndead(state$.value)
      if (mostInjuredUndead) {
        return of(healUndead(mostInjuredUndead.id, restoration.healthRestored ?? 0))
      }
      return EMPTY
    }),
  )

  const restorationCastDuringAssault$ = restorationCast$.pipe(
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    map(() => repairStructure(restoration.structureRepairAmount ?? 0)),
  )

  return merge(restorationCastDuringExpedition$, restorationCastDuringAssault$)
}
