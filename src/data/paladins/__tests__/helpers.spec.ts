import { applyDamagesToPaladin, createPaladinCard } from '../helpers'
import { PaladinCategory, PaladinType } from '../../../config/constants'

describe('Paladins helpers', () => {
  describe('applyDamagesToPaladin()', () => {
    it('should not damage paladin if shield active', () => {
      const paladin = createPaladinCard(PaladinType.Vanguard)
      expect(applyDamagesToPaladin(10, [PaladinCategory.Physical])(paladin).health).toEqual(paladin.health)
    })

    it('should not damage paladin if not in target categories', () => {
      const paladin = createPaladinCard(PaladinType.Healer)
      expect(applyDamagesToPaladin(10, [PaladinCategory.Magical])(paladin).health).toEqual(paladin.health)
    })

    it('should apply damages otherwise', () => {
      const paladin = createPaladinCard(PaladinType.Dreadnought)
      expect(applyDamagesToPaladin(10, [PaladinCategory.Physical])(paladin).health).toEqual(0)
    })
  })
})
