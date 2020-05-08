import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { EMPTY } from 'rxjs'
import { filter, mergeMapTo, tap } from 'rxjs/operators'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'
import { endEventEpic, eventsEpic } from './events/epics'
import { castSpellEpic, discoverSpellEpic, soulStormEpic } from './spells/epics'
import { repairBuildingEpic, upgradeBuildingEpic, upgradeBuildingRewardsEpic } from './buildings/epics'
import { MAIN_HUB } from '../config/routes'
import { resetGame } from './settings/actions'
import { endExpeditionEpic, fleeExpeditionEpic } from './expeditions/epics'
import { raiseUndeadEpic, valetEpic } from './undeads/epics'

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
  valetEpic,
  raiseUndeadEpic,
  eventsEpic,
  endEventEpic,
  discoverSpellEpic,
  castSpellEpic,
  endExpeditionEpic,
  fleeExpeditionEpic,
  soulStormEpic,
  resetGameEpic,
)
