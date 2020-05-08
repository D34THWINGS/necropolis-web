import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, flatMap } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { addUndead, raiseUndead, upgradeValet } from './actions'
import { getUndeadTypes } from './selectors'
import { spendResources } from '../resources/actions'
import { ResourceType, UndeadType } from '../../config/constants'
import { getRaiseUndeadSoulCost } from '../buildings/helpers'
import { getCatacombs } from '../buildings/selectors'
import { nextPhase } from '../turn/actions'
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
