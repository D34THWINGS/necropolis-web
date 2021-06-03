import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { delay, filter, map, mapTo, mergeMap, mergeMapTo } from 'rxjs/operators'
import {
  applyObstacleConsequences,
  clearObstacleRolls,
  endExpedition,
  fleeExpedition,
  removeUndeadFromObstacle,
  rollObstacleDices,
  setObstacleRolls,
} from './actions'
import { nextPhase } from '../turn/actions'
import { increasePaladinsCounter } from '../paladins/actions'
import { isNotNull, NecropolisEpic } from '../helpers'
import { getObstacle } from './selectors'
import { getUndeadById, getUndeads } from '../undeads/selectors'
import { getUndeadDice, rollDice, UndeadId } from '../undeads/helpers'
import { damageUndead } from '../undeads/actions'
import { isObstacleRowPassed, isUndeadSlottedInObstacle } from './helpers'
import { RootAction } from '../actions'

export const endExpeditionEpic: NecropolisEpic = action$ =>
  action$.pipe(filter(isActionOf(endExpedition)), mapTo(nextPhase()))

export const fleeExpeditionEpic: NecropolisEpic = action$ =>
  action$.pipe(filter(isActionOf(fleeExpedition)), mergeMapTo(of(increasePaladinsCounter(), nextPhase())))

export const rollObstacleDicesEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(rollObstacleDices)),
    map(() => getObstacle(state$.value)),
    filter(isNotNull),
    delay(700),
    map(obstacle => {
      const undeads = getUndeads(state$.value)
      return setObstacleRolls(
        obstacle.rows.flatMap(row =>
          row.slottedUndeads
            .map<[UndeadId, number] | null>(undeadId => {
              const undead = undeads.find(({ id }) => id === undeadId)
              if (!undead) {
                return null
              }
              const dice = getUndeadDice(undead, row.requiredTalent[0])
              return [undead.id, rollDice(dice)]
            })
            .filter(isNotNull),
        ),
      )
    }),
  )

export const applyObstacleConsequencesEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(applyObstacleConsequences)),
    map(() => getObstacle(state$.value)),
    filter(isNotNull),
    mergeMap(obstacle => {
      if (!obstacle.rolls) {
        return EMPTY
      }

      const rollsMap = new Map(obstacle.rolls)
      const failedRows = obstacle.rows.filter(row => !isObstacleRowPassed(row, rollsMap))

      if (failedRows.length === 0) {
        return EMPTY
      }

      return of<RootAction>(
        clearObstacleRolls(),
        ...failedRows.flatMap(row => row.slottedUndeads.map(undeadId => damageUndead(undeadId, row.healthCost))),
      )
    }),
  )

export const removeUndeadFromObstacleOnDeathEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(damageUndead)),
    mergeMap(({ payload: { undeadId } }) => {
      const obstacle = getObstacle(state$.value)
      if (!obstacle) {
        return EMPTY
      }

      const undead = getUndeadById(undeadId)(state$.value)
      if (!undead || undead.health > 0 || !isUndeadSlottedInObstacle(obstacle, undeadId)) {
        return EMPTY
      }

      return of(removeUndeadFromObstacle(undeadId))
    }),
  )
