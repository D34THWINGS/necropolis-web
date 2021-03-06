import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, mergeMap, mapTo } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { getCurrentPhase, getTurn } from '../turn/selectors'
import { EventType, PALADINS_CALL_TO_ARMS_TURN, TurnPhase } from '../../config/constants'
import { endEvent, startEvent } from './actions'
import { getQuestEvent } from '../selectors'

export const eventsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(() => getCurrentPhase(state$.value) === TurnPhase.Event),
    mergeMap(() => {
      const state = state$.value
      const actions: RootAction[] = []
      const turn = getTurn(state)
      const questEvent = getQuestEvent(state)
      if (turn === PALADINS_CALL_TO_ARMS_TURN) {
        actions.push(startEvent(EventType.CallToArms))
      } else if (questEvent !== null) {
        actions.push(startEvent(questEvent))
      } else {
        actions.push(nextPhase())
      }
      return of(...actions)
    }),
  )

export const endEventEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(endEvent)), mapTo(nextPhase()))
