import { getLethalityBonusFromEffects, makeLethalityBuffEffect } from '../effects'

describe('Spell helpers', () => {
  describe('getLethalityBonusFromEffects()', () => {
    it('should return cumulated lethality bonus from given effects', () => {
      const lethality = getLethalityBonusFromEffects([makeLethalityBuffEffect(4), makeLethalityBuffEffect(2)])
      expect(lethality).toEqual(6)
    })
  })
})
