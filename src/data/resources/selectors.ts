import { RootState } from '../../store/mainReducer'
import { ResourceType } from '../../config/constants'

export const getResources = (state: RootState) => state.resources

export const getMaterials = (state: RootState) => getResources(state)[ResourceType.Materials]

export const getBones = (state: RootState) => getResources(state)[ResourceType.Bones]

export const getSouls = (state: RootState) => getResources(state)[ResourceType.Souls]
