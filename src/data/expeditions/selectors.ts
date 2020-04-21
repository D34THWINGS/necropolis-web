import { ExpeditionType } from '../../config/constants'
import { RootState } from '../../store/mainReducer'

export const getHasAchievedExpedition = (type: ExpeditionType) => (state: RootState) =>
  state.expeditions.done.includes(type)

export const getExpeditionStep = (type: ExpeditionType) => (state: RootState) =>
  state.expeditions.active.find(expedition => expedition.type === type)?.step

export const getOpenedExpedition = (state: RootState) => state.expeditions.opened

export const getIsExpeditionActive = (type: ExpeditionType) => (state: RootState) =>
  state.expeditions.active.some(expedition => expedition.type === type)

export const getHasCancelledReinforcements = (state: RootState) => state.expeditions.cancelledReinforcements
