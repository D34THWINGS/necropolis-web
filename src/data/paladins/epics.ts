import { Epic } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { changeAssaultPhase, useTrap } from './actions'
import { isAssaultFinished } from './selectors'
import { PaladinsAssaultPhase } from '../../config/constants'

export const displayAssaultResultsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(useTrap)),
    filter(() => isAssaultFinished(state$.value)),
    map(() => changeAssaultPhase(PaladinsAssaultPhase.Result)),
  )
