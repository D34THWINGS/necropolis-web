import { createReducer } from 'typesafe-actions'
import { ExpeditionStep, ExpeditionType } from '../../config/constants'
import {
  beginExpedition,
  closeExpedition,
  endExpedition,
  fleeExpedition,
  openExpedition,
  setExpeditionStep,
} from './actions'

export type ActiveExpedition = {
  type: ExpeditionType
  step: ExpeditionStep | number
}

export const expeditions = createReducer({
  done: [] as ExpeditionType[],
  active: [] as ActiveExpedition[],
  opened: null as ExpeditionType | null,
})
  .handleAction(openExpedition, (state, { payload: { type } }) => ({
    ...state,
    opened: type,
  }))
  .handleAction(beginExpedition, (state, { payload: { type } }) => ({
    ...state,
    active: [...state.active, { type, step: 0 }],
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
