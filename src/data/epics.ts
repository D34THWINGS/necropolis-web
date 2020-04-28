import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, flatMap, mergeMapTo, tap } from 'rxjs/operators'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'
import { nextPhase } from './turn/actions'
import { gainResources } from './resources/actions'
import { getBuildingsProduction } from './buildings/selectors'
import { TurnPhase } from '../config/constants'
import { getCurrentPhase } from './turn/selectors'
import { endEventEpic, eventsEpic } from './events/epics'
import { discoverSpellEpic, soulStormEpic } from './spells/epics'
import { repairBuildingEpic, upgradeBuildingEpic, upgradeBuildingRewardsEpic } from './buildings/epics'
import { MAIN_HUB } from '../config/routes'
import { resetGame } from './settings/actions'
import { endExpeditionEpic, fleeExpeditionEpic } from './expeditions/epics'
import { raiseUndeadEpic, upkeepEpic, valetEpic } from './undeads/epics'

const productionEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(() => getCurrentPhase(state$.value) === TurnPhase.Production),
    flatMap(() => of(gainResources(getBuildingsProduction(state$.value)), nextPhase())),
  )

const resetGameEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (action$, _, { history }) =>
  action$.pipe(
    filter(isActionOf(resetGame)),
    tap(() => history.push(MAIN_HUB)),
    mergeMapTo(EMPTY),
  )

export const rootEpic = combineEpics(
  upgradeBuildingEpic,
  upgradeBuildingRewardsEpic,
  repairBuildingEpic,
  upkeepEpic,
  valetEpic,
  productionEpic,
  raiseUndeadEpic,
  eventsEpic,
  endEventEpic,
  discoverSpellEpic,
  endExpeditionEpic,
  fleeExpeditionEpic,
  soulStormEpic,
  resetGameEpic,
)
