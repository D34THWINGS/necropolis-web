import { applyDamages, EntityWithHealth, getMostInjured } from '../helpers'

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
})
