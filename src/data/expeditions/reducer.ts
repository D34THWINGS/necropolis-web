import { createReducer } from 'typesafe-actions'
import { ExpeditionType } from '../../config/constants'
import {
  addUndeadToObstacle,
  beginExpedition,
  cancelReinforcements,
  clearObstacle,
  closeExpedition,
  endExpedition,
  fleeExpedition,
  openExpedition,
  removeUndeadFromObstacle,
  setExpeditionStep,
  setObstacleActiveRow,
  setObstacleRolls,
  triggerCarnage,
  triggerObstacle,
} from './actions'
import { Obstacle } from './helpers'
import { setInArray } from '../helpers'

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
  .handleAction(setObstacleActiveRow, (state, { payload: { rowId } }) => {
    if (!state.obstacle) {
      return state
    }
    return {
      ...state,
      obstacle: {
        ...state.obstacle,
        activeRow: state.obstacle.activeRow === rowId ? null : rowId,
      },
    }
  })
  .handleAction(addUndeadToObstacle, (state, { payload: { undeadId } }) => {
    const { obstacle } = state
    if (!obstacle || !obstacle.activeRow) {
      return state
    }
    const activeRowIndex = obstacle.rows.findIndex(row => row.id === obstacle.activeRow)
    if (
      activeRowIndex === -1 ||
      obstacle.rows[activeRowIndex].slottedUndeads.length >= obstacle.rows[activeRowIndex].diceSlots ||
      obstacle.rows[activeRowIndex].slottedUndeads.includes(undeadId)
    ) {
      return state
    }
    return {
      ...state,
      obstacle: {
        ...obstacle,
        rows: setInArray(
          obstacle.rows.map(row => ({
            ...row,
            slottedUndeads: row.slottedUndeads.filter(slottedUndeadId => slottedUndeadId !== undeadId),
          })),
          activeRowIndex,
          {
            ...obstacle.rows[activeRowIndex],
            slottedUndeads: [...obstacle.rows[activeRowIndex].slottedUndeads, undeadId],
          },
        ),
      },
    }
  })
  .handleAction(removeUndeadFromObstacle, (state, { payload: { undeadId } }) => {
    if (!state.obstacle || !state.obstacle.activeRow) {
      return state
    }
    return {
      ...state,
      obstacle: {
        ...state.obstacle,
        rows: state.obstacle.rows.map(row => ({
          ...row,
          slottedUndeads: row.slottedUndeads.filter(slottedUndeadId => slottedUndeadId !== undeadId),
        })),
      },
    }
  })
  .handleAction(setObstacleRolls, (state, { payload: { rolls } }) => {
    if (!state.obstacle) {
      return state
    }
    return {
      ...state,
      obstacle: {
        ...state.obstacle,
        rolls,
      },
    }
  })
