import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, map, mapTo, mergeMapTo } from 'rxjs/operators'
import { endExpedition, fleeExpedition, rollObstacleDices, setObstacleRolls } from './actions'
import { nextPhase } from '../turn/actions'
import { increasePaladinsCounter } from '../paladins/actions'
import { isNotNull, NecropolisEpic } from '../helpers'
import { getObstacle } from './selectors'
import { getUndeads } from '../undeads/selectors'
import { getUndeadDice, rollDice, UndeadId } from '../undeads/helpers'

export const endExpeditionEpic: NecropolisEpic = action$ =>
  action$.pipe(filter(isActionOf(endExpedition)), mapTo(nextPhase()))

export const fleeExpeditionEpic: NecropolisEpic = action$ =>
  action$.pipe(filter(isActionOf(fleeExpedition)), mergeMapTo(of(increasePaladinsCounter(), nextPhase())))

export const rollObstacleDicesEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(rollObstacleDices)),
    map(() => getObstacle(state$.value)),
    filter(isNotNull),
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
