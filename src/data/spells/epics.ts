import { isActionOf } from 'typesafe-actions'
import { Epic } from 'redux-observable'
import { filter, mapTo } from 'rxjs/operators'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { setEventStep } from '../events/actions'
import { setExpeditionStep } from '../expeditions/actions'
import { getIsSoulStormActive } from './selectors'
import { toggleSoulStorm } from './actions'

export const soulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([nextPhase, setEventStep, setExpeditionStep])),
    filter(() => getIsSoulStormActive(state$.value)),
    mapTo(toggleSoulStorm(false)),
  )
