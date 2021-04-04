import { createReducer } from 'typesafe-actions'
import { ExpeditionType } from '../../config/constants'
import {
  beginExpedition,
  cancelReinforcements,
  clearObstacle,
  closeExpedition,
  endExpedition,
  fleeExpedition,
  openExpedition,
  setExpeditionStep,
  triggerCarnage,
  triggerObstacle,
} from './actions'
import { Obstacle } from './helpers'

export type ActiveExpedition = {
  type: ExpeditionType
  step: number
}

export type ExpeditionsState = {
  done: ExpeditionType[]
  active: ActiveExpedition[]
  opened: ExpeditionType | null
  carnage: boolean
  cancelledReinforcements: boolean
  obstacle: Obstacle | null
}

export const expeditions = createReducer<ExpeditionsState>({
  done: [],
  active: [],
  opened: null,
  carnage: false,
  cancelledReinforcements: false,
  obstacle: null,
})
  .handleAction(openExpedition, (state, { payload: { type } }) => ({
    ...state,
    opened: type,
  }))
  .handleAction(beginExpedition, (state, { payload: { type } }) => ({
    ...state,
    active: [...state.active, { type, step: 0 }],
    opened: type,
  }))
  .handleAction([closeExpedition, fleeExpedition], state => ({ ...state, opened: null }))
  .handleAction(setExpeditionStep, (state, { payload: { type, step } }) => ({
    ...state,
    active: state.active.map(expedition => (expedition.type === type ? { ...expedition, step } : expedition)),
  }))
  .handleAction(endExpedition, (state, { payload: { type } }) => ({
    ...state,
    done: [...state.done, type],
    opened: null,
    active: state.active.filter(expedition => expedition.type !== type),
  }))
  .handleAction(cancelReinforcements, state => ({ ...state, cancelledReinforcements: true }))
  .handleAction(triggerCarnage, state => ({ ...state, carnage: true }))
  .handleAction(triggerObstacle, (state, { payload: { obstacle } }) => ({ ...state, obstacle }))
  .handleAction(clearObstacle, state => ({ ...state, obstacle: null }))
