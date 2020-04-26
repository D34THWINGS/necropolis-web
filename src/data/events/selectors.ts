import { RootState } from '../../store/mainReducer'

export const getCurrentEvent = (state: RootState) => state.events.currentEvent

export const getPastEvents = (state: RootState) => state.events.pastEvents

export const getHasArtifact = (state: RootState) => state.events.hasArtifact
