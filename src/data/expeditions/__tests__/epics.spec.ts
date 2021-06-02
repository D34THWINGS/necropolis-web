import { buildEpicObservables } from '../../../../tests/helpers'
import { applyObstacleConsequencesEpic } from '../epics'
import { applyObstacleConsequences, clearObstacleRolls } from '../actions'
import { makeObstacle, makeObstacleRow } from '../helpers'
import { UndeadTalent } from '../../../config/constants'
import { makeBrikoler, makeSkeleton } from '../../undeads/helpers'
import { damageUndead } from '../../undeads/actions'

describe('Expedition epics', () => {
  describe('Apply obstacle consequences', () => {
    it('should do nothing if no obstacle', () => {
      const { actionsInput$, actions } = buildEpicObservables(applyObstacleConsequencesEpic)

      actionsInput$.next(applyObstacleConsequences())

      expect(actions).toEqual([])
    })

    it('should do nothing if no row failed', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(applyObstacleConsequencesEpic)

      const brikoler = makeBrikoler()
      const skeleton = makeSkeleton()
      stateInput$.next({
        ...state$.value,
        undeads: {
          ...state$.value.undeads,
          list: [...state$.value.undeads.list, brikoler, skeleton],
        },
        expeditions: {
          ...state$.value.expeditions,
          obstacle: {
            ...makeObstacle('foo', [
              { ...makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1), slottedUndeads: [brikoler.id] },
              { ...makeObstacleRow(0, 3, [UndeadTalent.Subjugation, 2], 1), slottedUndeads: [skeleton.id] },
            ]),
            rolls: [
              [brikoler.id, 4],
              [skeleton.id, 2],
            ],
          },
        },
      })
      actionsInput$.next(applyObstacleConsequences())

      expect(actions).toEqual([])
    })

    it('should damage undead in failed rows', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(applyObstacleConsequencesEpic)

      const brikoler = makeBrikoler()
      const skeleton = makeSkeleton()
      stateInput$.next({
        ...state$.value,
        undeads: {
          ...state$.value.undeads,
          list: [...state$.value.undeads.list, brikoler, skeleton],
        },
        expeditions: {
          ...state$.value.expeditions,
          obstacle: {
            ...makeObstacle('foo', [
              { ...makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1), slottedUndeads: [brikoler.id] },
              { ...makeObstacleRow(0, 3, [UndeadTalent.Subjugation, 2], 1), slottedUndeads: [skeleton.id] },
            ]),
            rolls: [
              [brikoler.id, 1],
              [skeleton.id, 2],
            ],
          },
        },
      })
      actionsInput$.next(applyObstacleConsequences())

      expect(actions).toEqual([clearObstacleRolls(), damageUndead(brikoler.id, 1)])
    })
  })
})
