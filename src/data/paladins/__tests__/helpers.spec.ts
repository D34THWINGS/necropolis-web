import {
  applyDamagesToPaladin,
  createDeck,
  createPaladinCard,
  getMostPresentTypeInDeck,
  isCommander,
  isHealer,
  isVanguard,
  isZealot,
} from '../helpers'
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

  describe('getMostPresentTypeInDeck()', () => {
    it('should return most present type', () => {
      expect(
        getMostPresentTypeInDeck([
          createPaladinCard(PaladinType.Vanguard),
          createPaladinCard(PaladinType.Healer),
          createPaladinCard(PaladinType.Dreadnought),
          createPaladinCard(PaladinType.Healer),
          createPaladinCard(PaladinType.Wizard),
        ]),
      ).toEqual(PaladinType.Healer)
    })

    it('should return first paladin if no majority', () => {
      expect(
        getMostPresentTypeInDeck([
          createPaladinCard(PaladinType.Vanguard),
          createPaladinCard(PaladinType.Dreadnought),
          createPaladinCard(PaladinType.Healer),
          createPaladinCard(PaladinType.Wizard),
        ]),
      ).toEqual(PaladinType.Vanguard)
    })

    it('should return first in deck majority', () => {
      expect(
        getMostPresentTypeInDeck([
          createPaladinCard(PaladinType.Vanguard),
          createPaladinCard(PaladinType.Dreadnought),
          createPaladinCard(PaladinType.Dreadnought),
          createPaladinCard(PaladinType.Healer),
          createPaladinCard(PaladinType.Wizard),
          createPaladinCard(PaladinType.Healer),
        ]),
      ).toEqual(PaladinType.Dreadnought)
    })
  })

  describe('createDeck()', () => {
    it('should never draw more than 50% of the same card with 2 types', () => {
      const deck = createDeck(100, [PaladinType.Vanguard, PaladinType.Healer])
      expect(deck.filter(isVanguard).length).toEqual(50)
      expect(deck.filter(isHealer).length).toEqual(50)
    })

    it('should never draw more than 50% of the same card with 3 types', () => {
      const deck = createDeck(100, [PaladinType.Vanguard, PaladinType.Healer, PaladinType.Provost])
      expect(deck.filter(isVanguard).length < 50).toEqual(true)
      expect(deck.filter(isZealot).length < 50).toEqual(true)
      expect(deck.filter(isHealer).length < 50).toEqual(true)
    })

    it('should never draw more than one commander', () => {
      const deck = createDeck(100, [PaladinType.Vanguard, PaladinType.Zealot, PaladinType.Commander])
      expect(deck.filter(isVanguard).length <= 50).toEqual(true)
      expect(deck.filter(isZealot).length <= 50).toEqual(true)
      expect(deck.filter(isCommander).length).toEqual(1)
    })

    it('should never draw undefined type', () => {
      const deck = createDeck(100, [PaladinType.Vanguard])
      expect(deck.filter(isVanguard).length).toEqual(100)
      expect(deck.filter(card => card.type === undefined).length).toEqual(0)
    })
  })
})
