import {
  applyDamages,
  EntityWithHealth,
  getMostInjured,
  increaseMajorTalent,
  makeBloodPrince,
  makeBrikoler,
  makeSkeleton,
  makeUndeadPool,
} from '../helpers'
import { UndeadTalent } from '../../../config/constants'
import { restoreDefaultSeeder, useTestSeed } from '../../seeder'

describe('Undead helpers', () => {
  describe('getMostInjured()', () => {
    it('should return the entity with the largest amount of missing health', () => {
      const highlyDamagedEntity = { health: 7, maxHealth: 10 }

      const entitiesList: EntityWithHealth[][] = [
        [
          { health: 10, maxHealth: 10 },
          { health: 9, maxHealth: 10 },
          highlyDamagedEntity,
          { health: 10, maxHealth: 10 },
        ],
        [
          { health: 10, maxHealth: 10 },
          highlyDamagedEntity,
          { health: 9, maxHealth: 10 },
          { health: 10, maxHealth: 10 },
          { health: 10, maxHealth: 10 },
        ],
      ]

      entitiesList.forEach(entities => {
        const mostInjured = getMostInjured(entities)
        expect(mostInjured).toEqual(highlyDamagedEntity)
      })
    })
  })

  describe('applyDamages()', () => {
    it('should reduce entity health', () => {
      expect(applyDamages(10, 1)).toEqual(9)
      expect(applyDamages(10, 15)).toEqual(0)
      expect(applyDamages(10, 0)).toEqual(10)
      expect(applyDamages(10, 0.1)).toEqual(9.9)
      expect(applyDamages(10, -1)).toEqual(10)
    })
  })

  describe('increaseMajorTalent()', () => {
    it('should increase major talent by given value', () => {
      expect(increaseMajorTalent(makeBloodPrince(), 2).talents).toEqual([
        [UndeadTalent.Necromancy, 5],
        [UndeadTalent.Subjugation, 1],
      ])
    })
    it('should increase first talent if no major one', () => {
      expect(increaseMajorTalent(makeSkeleton(), 2).talents).toEqual([
        [UndeadTalent.Lethality, 4],
        [UndeadTalent.Subjugation, 2],
      ])
    })
  })

  describe('makeUndeadPool()', () => {
    it('should draw X undead from possible undeads', () => {
      useTestSeed()
      expect(makeUndeadPool(2)).toEqual([
        { ...makeBloodPrince(), id: expect.any(String), dices: expect.any(Array) },
        { ...makeBrikoler(), id: expect.any(String), dices: expect.any(Array) },
      ])
      restoreDefaultSeeder()
    })

    it('should not draw already raised undeads', () => {
      useTestSeed()
      expect(makeUndeadPool(2, [makeBloodPrince()])).toEqual([
        { ...makeSkeleton(), id: expect.any(String), dices: expect.any(Array) },
        { ...makeBrikoler(), id: expect.any(String), dices: expect.any(Array) },
      ])
      restoreDefaultSeeder()
    })
  })
})
