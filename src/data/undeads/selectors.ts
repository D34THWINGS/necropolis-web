import { RootState } from '../../store/mainReducer'

export const getUndeadCount = (state: RootState) => state.undeads.length
