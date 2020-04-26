import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, flatMap, mapTo } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { getCurrentPhase, getTurn } from '../turn/selectors'
import { EVENTS_TURN_SPACING, EventType, PALADINS_CALL_TO_ARMS_TURN, TurnPhase } from '../../config/constants'
import { getPaladinsCalledToArms, getShouldIncreasePaladinsStrength } from '../paladins/selectors'
import { increasePaladinsStrength } from '../paladins/actions'
import { endEvent, startEvent } from './actions'
import { getQuestEvent, getRandomEventPool } from '../selectors'

export const eventsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(() => getCurrentPhase(state$.value) === TurnPhase.Event),
    flatMap(() => {
      const state = state$.value
      const actions: RootAction[] = []
      const turn = getTurn(state)
      const possibleRandomEvents = getRandomEventPool(state)
      const questEvent = getQuestEvent(state)
      if (turn === PALADINS_CALL_TO_ARMS_TURN) {
        actions.push(startEvent(EventType.CallToArms))
      } else if (questEvent !== null) {
        actions.push(startEvent(questEvent))
      } else if (turn % EVENTS_TURN_SPACING === 0 && possibleRandomEvents.length > 0) {
        const event = possibleRandomEvents[Math.round(Math.random() * (possibleRandomEvents.length - 1))]
        actions.push(startEvent(event))
      } else {
        actions.push(nextPhase())
      }
      if (getPaladinsCalledToArms(state) && getShouldIncreasePaladinsStrength(state)) {
        actions.unshift(increasePaladinsStrength())
      }
      return of(...actions)
    }),
  )

export const endEventEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(endEvent)), mapTo(nextPhase()))
