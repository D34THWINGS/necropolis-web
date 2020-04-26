import { createReducer } from 'typesafe-actions'
import { EventType } from '../../config/constants'
import { endEvent, gainArtifact, setEventStep, startEvent } from './actions'

type EventsState = {
  pastEvents: EventType[]
  currentEvent: { type: EventType; step: number } | null
  hasArtifact: boolean
}

export const events = createReducer<EventsState>({
  pastEvents: [],
  currentEvent: null,
  hasArtifact: false,
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
  .handleAction(
    setEventStep,
    (state, { payload: { step } }): EventsState =>
      state.currentEvent
        ? {
            ...state,
            currentEvent: { ...state.currentEvent, step },
          }
        : state,
  )
  .handleAction(gainArtifact, state => ({ ...state, hasArtifact: true }))
