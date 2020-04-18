import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, flatMap, throttle } from 'rxjs/operators'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'
import { upgradeBuilding } from './buildings/actions'
import { nextTurn } from './turn/actions'
import { gainResources, spendResources } from './resources/actions'
import { getUpkeep } from './undeads/selectors'
import { getBuildingsProduction } from './buildings/selectors'
import { getBuildingUpgradeCost } from './buildings/helpers'

const upgradeBuildingEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(upgradeBuilding)),
    flatMap(({ payload: { type, level } }) =>
      of(spendResources({ materials: getBuildingUpgradeCost(type, level) }), nextTurn()),
    ),
  )

const newTurnEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  state$.pipe(
    throttle(() => action$.pipe(filter(isActionOf(nextTurn))), { leading: false, trailing: true }),
    flatMap(state => of(spendResources({ meat: getUpkeep(state) }), gainResources(getBuildingsProduction(state)))),
  )

export const rootEpic = combineEpics(upgradeBuildingEpic, newTurnEpic)
