import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, flatMap, mapTo, throttle } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { getCurrentPhase, getTurn } from '../turn/selectors'
import { EVENTS_TURN_SPACING, EventType, PALADINS_CALL_TO_ARMS_TURN, TurnPhase } from '../../config/constants'
import {
  getPaladinsCalledToArms,
  getPaladinsShouldAttack,
  getShouldIncreasePaladinsStrength,
} from '../paladins/selectors'
import { increasePaladinsStrength } from '../paladins/actions'
import { endEvent, startEvent } from './actions'
import { getRandomEventPool } from '../selectors'

export const eventsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  state$.pipe(
    throttle(() => action$.pipe(filter(isActionOf(nextPhase))), { leading: false, trailing: true }),
    filter(state => getCurrentPhase(state) === TurnPhase.Event),
    flatMap(state => {
      const actions: RootAction[] = []
      const turn = getTurn(state)
      if (turn === PALADINS_CALL_TO_ARMS_TURN) {
        actions.push(startEvent(EventType.CallToArms))
      } else if (getPaladinsShouldAttack(state)) {
        actions.push(startEvent(EventType.PaladinsAssault))
      } else if (turn % EVENTS_TURN_SPACING === 0) {
        const possibleEvents = getRandomEventPool(state)
        const event = possibleEvents[Math.round(Math.random() * (possibleEvents.length - 1))]
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
