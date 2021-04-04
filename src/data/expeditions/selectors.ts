import { ExpeditionType } from '../../config/constants'
import { RootState } from '../../store/mainReducer'

export const getHasAchievedExpedition = (type: ExpeditionType) => (state: RootState) =>
  state.expeditions.done.includes(type)

export const getExpeditionStep = (type: ExpeditionType) => (state: RootState) =>
  state.expeditions.active.find(expedition => expedition.type === type)?.step

export const getOpenedExpedition = (state: RootState) => state.expeditions.opened

export const getIsInExpedition = (state: RootState) => getOpenedExpedition(state) !== null

export const getIsExpeditionActive = (type: ExpeditionType) => (state: RootState) =>
  state.expeditions.active.some(expedition => expedition.type === type)

export const getHasCancelledReinforcements = (state: RootState) => state.expeditions.cancelledReinforcements

export const getCarnage = (state: RootState) => state.expeditions.carnage

export const getObstacle = (state: RootState) => state.expeditions.obstacle
