import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, mergeMap, map } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { addUndead, upgradeValet } from './actions'
import { getUndeads } from './selectors'
import { spendResources } from '../resources/actions'
import { ResourceType } from '../../config/constants'
import { getCatacombs } from '../buildings/selectors'
import { nextPhase } from '../turn/actions'
import { endExpedition } from '../expeditions/actions'
import { raiseUndead } from '../buildings/actions'
import { isValet } from './helpers'

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
    filter(() => getUndeads(state$.value).some(isValet)),
    map(() => upgradeValet()),
  )
