import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, flatMap } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { addUndead, banUndead, killUndead, raiseUndead, upgradeValet } from './actions'
import { getUndeadCount, getUndeadTypes } from './selectors'
import { spendResources } from '../resources/actions'
import { LooseReason, ResourceType, UndeadType } from '../../config/constants'
import { getRaiseUndeadSoulCost } from '../buildings/helpers'
import { getCatacombs } from '../buildings/selectors'
import { loose, nextPhase } from '../turn/actions'
import { endExpedition } from '../expeditions/actions'

export const raiseUndeadEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(raiseUndead)),
    flatMap(({ payload: { undead } }) =>
      of(
        spendResources({ [ResourceType.Souls]: getRaiseUndeadSoulCost(getCatacombs(state$.value).level) }),
        addUndead(undead),
        nextPhase(),
      ),
    ),
  )

export const valetEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(endExpedition)),
    flatMap(() => {
      const hasValet = getUndeadTypes(state$.value).includes(UndeadType.Valet)
      return hasValet ? of(upgradeValet()) : EMPTY
    }),
  )

export const looseUndeadEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([banUndead, killUndead])),
    flatMap(() => {
      const undeadCount = getUndeadCount(state$.value)
      if (undeadCount === 0) {
        return of(loose(LooseReason.UndeadsKilled))
      }
      return EMPTY
    }),
  )
