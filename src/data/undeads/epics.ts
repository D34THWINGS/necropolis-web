import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, mergeMap, map } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { addUndead, banUndead, sacrificeUndead, upgradeValet } from './actions'
import { getUndeadCount, getUndeadTypes } from './selectors'
import { spendResources } from '../resources/actions'
import { LooseReason, ResourceType, UndeadType } from '../../config/constants'
import { getCatacombs } from '../buildings/selectors'
import { loose, nextPhase } from '../turn/actions'
import { endExpedition } from '../expeditions/actions'
import { raiseUndead } from '../buildings/actions'

export const raiseUndeadEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(raiseUndead)),
    mergeMap(({ payload: { undead } }) => {
      const catacombs = getCatacombs(state$.value)
      if (!catacombs) {
        return EMPTY
      }
      return of(spendResources({ [ResourceType.Souls]: catacombs.raiseUndeadSoulCost }), addUndead(undead), nextPhase())
    }),
  )

export const valetEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(endExpedition)),
    filter(() => getUndeadTypes(state$.value).includes(UndeadType.Valet)),
    map(() => upgradeValet()),
  )

export const looseUndeadEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([banUndead, sacrificeUndead])),
    mergeMap(() => {
      const undeadCount = getUndeadCount(state$.value)
      if (undeadCount === 0) {
        return of(loose(LooseReason.UndeadsKilled))
      }
      return EMPTY
    }),
  )
