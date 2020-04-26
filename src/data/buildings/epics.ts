import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, flatMap, mapTo } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { repairBuilding, upgradeBuilding } from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType } from '../../config/constants'
import { getBuildingUpgradeCost } from './helpers'
import { nextPhase } from '../turn/actions'

export const upgradeBuildingEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(upgradeBuilding)),
    flatMap(({ payload: { type, level } }) =>
      of(spendResources({ [ResourceType.Materials]: getBuildingUpgradeCost(type, level) }), nextPhase()),
    ),
  )

export const repairBuildingEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(repairBuilding)), mapTo(nextPhase()))
