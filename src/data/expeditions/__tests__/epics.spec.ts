import { buildEpicObservables } from '../../../../tests/helpers'
import { applyObstacleConsequencesEpic, removeUndeadFromObstacleOnDeathEpic, rerollUndeadDicesEpic } from '../epics'
import {
  applyObstacleConsequences,
  clearObstacleRolls,
  removeUndeadFromObstacle,
  rerollUndeadDices,
  setObstacleRolls,
} from '../actions'
import { makeObstacle, makeObstacleRow } from '../helpers'
import { UndeadTalent } from '../../../config/constants'
import { makeBrikoler, makeSkeleton } from '../../undeads/helpers'
import { damageUndead } from '../../undeads/actions'
import { restoreDefaultSeeder, useTestSeed } from '../../seeder'

describe('Expedition epics', () => {
  describe('Reroll undead dice', () => {
    it('should preserve old rolls and reroll only selected undead', () => {
      useTestSeed()
      const { actionsInput$, actions, state$, stateInput$ } = buildEpicObservables(rerollUndeadDicesEpic(0))

      const valet = state$.value.undeads.list[0]
      const brikoler = makeBrikoler()
      stateInput$.next({
        ...state$.value,
        undeads: {
          ...state$.value.undeads,
          list: [...state$.value.undeads.list, brikoler],
        },
        expeditions: {
          ...state$.value.expeditions,
          obstacle: {
            ...makeObstacle(
              'foo',
              [{ ...makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1), slottedUndeads: [brikoler.id, valet.id] }],
              { loot: 1 },
            ),
            rolls: [
              [valet.id, 1],
              [brikoler.id, 5],
            ],
          },
        },
      })
      actionsInput$.next(rerollUndeadDices(valet.id))

      expect(actions).toEqual([
        setObstacleRolls([
          [valet.id, 2],
          [brikoler.id, 5],
        ]),
      ])
      restoreDefaultSeeder()
    })
  })

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
            ...makeObstacle(
              'foo',
              [
                { ...makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1), slottedUndeads: [brikoler.id] },
                { ...makeObstacleRow(0, 3, [UndeadTalent.Subjugation, 2], 1), slottedUndeads: [skeleton.id] },
              ],
              { loot: 1 },
            ),
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
            ...makeObstacle(
              'foo',
              [
                { ...makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1), slottedUndeads: [brikoler.id] },
                { ...makeObstacleRow(0, 3, [UndeadTalent.Subjugation, 2], 1), slottedUndeads: [skeleton.id] },
              ],
              { loot: 1 },
            ),
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

  describe('Remove undead from obstacle on death', () => {
    it('should do nothing if no obstacle', () => {
      const { actionsInput$, state$, actions } = buildEpicObservables(removeUndeadFromObstacleOnDeathEpic)

      actionsInput$.next(damageUndead(state$.value.undeads.list[0].id, 10))

      expect(actions).toEqual([])
    })

    it('should do nothing if undead is not in obstacle', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(removeUndeadFromObstacleOnDeathEpic)

      stateInput$.next({
        ...state$.value,
        expeditions: {
          ...state$.value.expeditions,
          obstacle: makeObstacle('foo', [makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1)], { loot: 1 }),
        },
      })
      actionsInput$.next(damageUndead(state$.value.undeads.list[0].id, 10))

      expect(actions).toEqual([])
    })

    it('should do nothing if undead is not dead', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(removeUndeadFromObstacleOnDeathEpic)

      const valetId = state$.value.undeads.list[0].id
      stateInput$.next({
        ...state$.value,
        expeditions: {
          ...state$.value.expeditions,
          obstacle: makeObstacle(
            'foo',
            [{ ...makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1), slottedUndeads: [valetId] }],
            { loot: 1 },
          ),
        },
      })
      actionsInput$.next(damageUndead(valetId, 10))

      expect(actions).toEqual([])
    })

    it('should remove from obstacle dead undead if slotted', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(removeUndeadFromObstacleOnDeathEpic)

      const valetId = state$.value.undeads.list[0].id
      stateInput$.next({
        ...state$.value,
        undeads: {
          ...state$.value.undeads,
          list: state$.value.undeads.list.map(undead => ({ ...undead, health: 0 })),
        },
        expeditions: {
          ...state$.value.expeditions,
          obstacle: makeObstacle(
            'foo',
            [{ ...makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1), slottedUndeads: [valetId] }],
            { loot: 1 },
          ),
        },
      })
      actionsInput$.next(damageUndead(valetId, 10))

      expect(actions).toEqual([removeUndeadFromObstacle(valetId)])
    })
  })
})
