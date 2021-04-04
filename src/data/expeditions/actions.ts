import { createAction } from 'typesafe-actions'
import { ExpeditionType } from '../../config/constants'
import { Obstacle } from './helpers'

export const openExpedition = createAction('expeditions/OPEN', (type: ExpeditionType) => ({ type }))<{
  type: ExpeditionType
}>()

export const closeExpedition = createAction('expeditions/CLOSE')()

export const fleeExpedition = createAction('expeditions/FLEE')()

export const beginExpedition = createAction('expeditions/BEGIN', (type: ExpeditionType) => ({ type }))<{
  type: ExpeditionType
}>()

export const endExpedition = createAction('expeditions/END', (type: ExpeditionType) => ({ type }))<{
  type: ExpeditionType
}>()

export const setExpeditionStep = createAction('expeditions/SET_STEP', (type: ExpeditionType, step: number) => ({
  type,
  step,
}))<{
  type: ExpeditionType
  step: number
}>()

export const cancelReinforcements = createAction('expeditions/CANCEL_REINFORCEMENTS')()

export const triggerCarnage = createAction('expeditions/CARNAGE')()

export const triggerObstacle = createAction('expeditions/TRIGGER_OBSTACLE', (obstacle: Obstacle) => ({ obstacle }))()

export const clearObstacle = createAction('expeditions/CLEAR_OBSTACLE')()
