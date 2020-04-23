import { createReducer } from 'typesafe-actions'
import { EventType } from '../../config/constants'
import { endEvent, setEventStep, startEvent } from './actions'

export const events = createReducer({
  pastEvents: [] as EventType[],
  currentEvent: null as null | { type: EventType; step: number },
})
  .handleAction(startEvent, (state, { payload: { event } }) => ({ ...state, currentEvent: { type: event, step: 0 } }))
  .handleAction(endEvent, state =>
    state.currentEvent
      ? {
          ...state,
          currentEvent: null,
          pastEvents: [...state.pastEvents, state.currentEvent.type],
        }
      : state,
  )
  .handleAction(setEventStep, (state, { payload: { step } }) =>
    state.currentEvent
      ? {
          ...state,
          currentEvent: { ...state.currentEvent, step },
        }
      : state,
  )
