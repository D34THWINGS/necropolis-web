import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, flatMap } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { addUndead, killUndead, raiseUndead, upgradeValet } from './actions'
import { getRaisableUndeadTypes, getUndeadTypes, getUpkeep } from './selectors'
import { createUndead } from './helpers'
import { spendResources } from '../resources/actions'
import { ResourceType, TurnPhase, UndeadType } from '../../config/constants'
import { getRaiseUndeadSoulCost } from '../buildings/helpers'
import { getCatacombs } from '../buildings/selectors'
import { nextPhase } from '../turn/actions'
import { getCurrentPhase } from '../turn/selectors'
import { getMeat } from '../resources/selectors'
import { endExpedition } from '../expeditions/actions'

export const raiseUndeadEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(raiseUndead)),
    flatMap(() => {
      const types = getRaisableUndeadTypes(state$.value)

      if (types.length === 0) {
        return EMPTY
      }

      const undead = createUndead(types[Math.round(Math.random() * (types.length - 1))], true)
      return of(
        spendResources({ [ResourceType.Souls]: getRaiseUndeadSoulCost(getCatacombs(state$.value).level) }),
        addUndead(undead),
        nextPhase(),
      )
    }),
  )

export const upkeepEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([nextPhase, killUndead])),
    filter(
      () => getCurrentPhase(state$.value) === TurnPhase.Upkeep && getMeat(state$.value) >= getUpkeep(state$.value),
    ),
    flatMap(() => of(spendResources({ [ResourceType.Meat]: getUpkeep(state$.value) }), nextPhase())),
  )

export const valetEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(endExpedition)),
    flatMap(() => {
      const hasValet = getUndeadTypes(state$.value).includes(UndeadType.Valet)
      return hasValet ? of(upgradeValet()) : EMPTY
    }),
  )
