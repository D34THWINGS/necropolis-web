import { RootState } from '../../store/mainReducer'

export const getHasActiveGame = (state: RootState) => state.settings.hasActiveGame
