import { isActionOf } from 'typesafe-actions'
import { Epic } from 'redux-observable'
import { filter, mapTo, throttle } from 'rxjs/operators'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { setEventStep } from '../events/actions'
import { setExpeditionStep } from '../expeditions/actions'
import { getIsSoulStormActive } from './selectors'
import { toggleSoulStorm } from './actions'

export const soulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  state$.pipe(
    throttle(() => action$.pipe(filter(isActionOf([nextPhase, setEventStep, setExpeditionStep]))), {
      leading: false,
      trailing: true,
    }),
    filter(getIsSoulStormActive),
    mapTo(toggleSoulStorm(false)),
  )
