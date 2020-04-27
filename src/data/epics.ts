import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, flatMap, mapTo, skip, tap } from 'rxjs/operators'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'
import { nextPhase } from './turn/actions'
import { gainResources, spendResources } from './resources/actions'
import { getRaisableUndeadTypes, getUpkeep } from './undeads/selectors'
import { getBuildingsProduction, getCatacombs } from './buildings/selectors'
import { getRaiseUndeadSoulCost } from './buildings/helpers'
import { addUndead, killUndead, raiseUndead } from './undeads/actions'
import { ResourceType, TurnPhase } from '../config/constants'
import { getCurrentPhase } from './turn/selectors'
import { getMeat } from './resources/selectors'
import { createUndead } from './undeads/helpers'
import { endExpedition, fleeExpedition } from './expeditions/actions'
import { endEventEpic, eventsEpic } from './events/epics'
import { discoverSpellEpic, soulStormEpic } from './spells/epics'
import { repairBuildingEpic, upgradeBuildingEpic } from './buildings/epics'
import { MAIN_HUB } from '../config/routes'
import { resetGame } from './settings/actions'

const upkeepEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([nextPhase, killUndead])),
    filter(
      () => getCurrentPhase(state$.value) === TurnPhase.Upkeep && getMeat(state$.value) >= getUpkeep(state$.value),
    ),
    flatMap(() => of(spendResources({ [ResourceType.Meat]: getUpkeep(state$.value) }), nextPhase())),
  )

const productionEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(() => getCurrentPhase(state$.value) === TurnPhase.Production),
    flatMap(() => of(gainResources(getBuildingsProduction(state$.value)), nextPhase())),
  )

const raiseUndeadEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(raiseUndead)),
    flatMap(() => {
      const types = getRaisableUndeadTypes(state$.value)
      const undead = createUndead(types[Math.round(Math.random() * (types.length - 1))], true)
      return of(
        spendResources({ [ResourceType.Souls]: getRaiseUndeadSoulCost(getCatacombs(state$.value).level) }),
        addUndead(undead),
        nextPhase(),
      )
    }),
  )

const fleeExpeditionEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf([fleeExpedition, endExpedition])), mapTo(nextPhase()))

const resetGameEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (action$, _, { history }) =>
  action$.pipe(
    filter(isActionOf(resetGame)),
    tap(() => history.push(MAIN_HUB)),
    skip(Infinity),
  )

export const rootEpic = combineEpics(
  upgradeBuildingEpic,
  repairBuildingEpic,
  upkeepEpic,
  productionEpic,
  raiseUndeadEpic,
  eventsEpic,
  endEventEpic,
  discoverSpellEpic,
  fleeExpeditionEpic,
  soulStormEpic,
  resetGameEpic,
)
