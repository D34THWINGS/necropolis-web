import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, mergeMap, mapTo } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { freeUpgradeBuilding, repairBuilding, upgradeBuilding } from './actions'
import { gainResources, spendResources } from '../resources/actions'
import {
  BuildingType,
  OSSUARY_UPGRADE_BONUS_BONES,
  OSSUARY_UPGRADE_BONUS_MEAT,
  ResourceType,
  Spell,
} from '../../config/constants'
import { getBuildingUpgradeCost } from './helpers'
import { nextPhase, win } from '../turn/actions'
import { getBuildingLevel, getIsBuildingsFullyUpgraded } from './selectors'
import { addSpell } from '../spells/actions'

export const upgradeBuildingEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(upgradeBuilding)),
    mergeMap(({ payload: { type } }) => {
      const level = getBuildingLevel(type)(state$.value)
      return of(spendResources({ [ResourceType.Materials]: getBuildingUpgradeCost(type, level) }), nextPhase())
    }),
  )

export const upgradeBuildingRewardsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([upgradeBuilding, freeUpgradeBuilding])),
    mergeMap(({ payload: { type } }) => {
      const level = getBuildingLevel(type)(state$.value)
      const actions: RootAction[] = []

      if (type === BuildingType.SoulWell && level === 2) {
        actions.push(addSpell(Spell.SoulStorm))
      }

      if (type === BuildingType.Ossuary && level >= 2) {
        actions.push(
          gainResources({
            [ResourceType.Meat]: OSSUARY_UPGRADE_BONUS_MEAT[level],
            [ResourceType.Bones]: OSSUARY_UPGRADE_BONUS_BONES[level],
          }),
        )
      }

      const isBuildingsFullyUpgraded = getIsBuildingsFullyUpgraded(state$.value)
      if (isBuildingsFullyUpgraded) {
        actions.push(win())
      }

      return of(...actions)
    }),
  )

export const repairBuildingEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(repairBuilding)), mapTo(nextPhase()))
