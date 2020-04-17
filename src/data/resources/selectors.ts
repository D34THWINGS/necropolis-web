import { RootState } from '../../store/mainReducer'

export const getResources = (state: RootState) => state.resources

export const getMaterials = (state: RootState) => getResources(state).materials

export const getBones = (state: RootState) => getResources(state).bones

export const getSouls = (state: RootState) => getResources(state).souls
