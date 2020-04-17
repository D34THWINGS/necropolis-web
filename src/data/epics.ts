import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, flatMap, mapTo, throttle } from 'rxjs/operators'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'
import { upgradeBuilding } from './buildings/actions'
import { nextTurn } from './turn/actions'
import { gainResources, spendResources } from './resources/actions'
import { getUndeadCount } from './undeads/selectors'
import { getBuildingsProduction } from './buildings/selectors'

const upgradeBuildingEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(upgradeBuilding)), mapTo(nextTurn()))

const newTurnEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  state$.pipe(
    throttle(() => action$.pipe(filter(isActionOf(nextTurn))), { leading: false, trailing: true }),
    flatMap(state =>
      of<RootAction, RootAction>(
        spendResources({ meat: getUndeadCount(state) }),
        gainResources(getBuildingsProduction(state)),
      ),
    ),
  )

export const rootEpic = combineEpics(upgradeBuildingEpic, newTurnEpic)
