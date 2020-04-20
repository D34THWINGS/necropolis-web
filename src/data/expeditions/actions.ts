import { createAction } from 'typesafe-actions'
import { ExpeditionStep, ExpeditionType } from '../../config/constants'

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

export const setExpeditionStep = createAction(
  'expeditions/SET_STEP',
  (type: ExpeditionType, step: number | ExpeditionStep.Reward) => ({
    type,
    step,
  }),
)<{
  type: ExpeditionType
  step: number | ExpeditionStep.Reward
}>()
