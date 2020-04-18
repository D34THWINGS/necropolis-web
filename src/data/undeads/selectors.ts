import { RootState } from '../../store/mainReducer'

export const getUndeads = (state: RootState) => state.undeads

export const getUpkeep = (state: RootState) => getUndeads(state).length

export const getRaisedUndeadCount = (state: RootState) =>
  getUndeads(state).reduce((sum, undead) => (undead.raised ? sum + 1 : sum), 0)
