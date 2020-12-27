import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, mergeMap, mapTo } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { freeUpgradeBuilding, repairBuilding, upgradeBuilding } from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType } from '../../config/constants'
import { nextPhase, win } from '../turn/actions'
import { getAreAllBuildingsFullyUpgraded } from './selectors'

export const upgradeBuildingEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(upgradeBuilding)),
    mergeMap(({ payload: { building } }) =>
      of(spendResources({ [ResourceType.Materials]: building.upgradeCost }), nextPhase()),
    ),
  )

export const upgradeBuildingWinEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([upgradeBuilding, freeUpgradeBuilding])),
    mergeMap(() => (getAreAllBuildingsFullyUpgraded(state$.value) ? of(win()) : EMPTY)),
  )

export const repairBuildingEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(repairBuilding)), mapTo(nextPhase()))
