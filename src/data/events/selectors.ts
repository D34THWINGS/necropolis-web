import { RootState } from '../../store/mainReducer'
import { EventType } from '../../config/constants'

export const getCurrentEvent = (state: RootState) => state.events.currentEvent

export const getPastEvents = (state: RootState) => state.events.pastEvents

export const getHasArtifact = (state: RootState) => state.events.hasArtifact

export const getIsEventPast = (type: EventType) => (state: RootState) => getPastEvents(state).includes(type)
