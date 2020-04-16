import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { filter, mapTo } from 'rxjs/operators'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'
import { upgradeBuilding } from './buildings/actions'
import { nextTurn } from './turn/actions'

const upgradeBuildingEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(upgradeBuilding)), mapTo(nextTurn()))

export const rootEpic = combineEpics(upgradeBuildingEpic)
