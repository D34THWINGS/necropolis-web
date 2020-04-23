import { RootState } from '../../store/mainReducer'

export const getCurrentEvent = (state: RootState) => state.events.currentEvent
