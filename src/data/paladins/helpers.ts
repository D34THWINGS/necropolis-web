import { v4 as uuid } from 'uuid'
import {
  PaladinCategory,
  PALADINS_CATEGORIES_MAP,
  PALADINS_DAMAGES_MAP,
  PALADINS_HEALTH_MAP,
  PALADINS_WITH_SHIELD,
  PaladinsAssaultPhase,
  PaladinType,
} from '../../config/constants'
import { applyDamages } from '../undeads/helpers'
import { drawRandomInArray, findAndPutFirstInArray } from '../helpers'
import { Trap } from './traps'

export type Assault = {
  phase: PaladinsAssaultPhase
  deck: PaladinCard[]
  traps: Trap[]
  changingPaladinCategory: boolean
  startingStructureHealth: number
}

export type PaladinCard = {
  id: string
  type: PaladinType
  revealed: boolean
  battleCryTriggered: boolean
  health: number
  maxHealth: number
  damages: number
  categories: PaladinCategory[]
  shield: boolean
  skipped: boolean
}

export const createPaladinCard = (type: PaladinType, revealed = false): PaladinCard => ({
  id: uuid(),
  type,
  revealed,
  battleCryTriggered: false,
  health: PALADINS_HEALTH_MAP[type],
  maxHealth: PALADINS_HEALTH_MAP[type],
  damages: PALADINS_DAMAGES_MAP[type],
  categories: PALADINS_CATEGORIES_MAP[type],
  shield: PALADINS_WITH_SHIELD.indexOf(type) >= 0,
  skipped: false,
})

export const createDeck = (nbOfCards: number, possibleTypes: PaladinType[] = Object.values(PaladinType)) =>
  Array.from({ length: nbOfCards }).reduce<PaladinCard[]>(tmpDeck => {
    // Never draw more than 1 commander
    const hasCommander = tmpDeck.some(paladin => paladin.type === PaladinType.Commander)
    const adjustedPossibleTypes = hasCommander
      ? possibleTypes.filter(type => type !== PaladinType.Commander)
      : possibleTypes

    return [...tmpDeck, createPaladinCard(drawRandomInArray(adjustedPossibleTypes))]
  }, [])

export const getMostPresentTypeInDeck = (deck: PaladinCard[]) =>
  Array.from(
    deck
      .reduce((stats, card) => {
        stats.set(card.type, (stats.get(card.type) ?? 0) + 1)
        return stats
      }, new Map<PaladinType, number>())
      .entries(),
  ).sort(([, a], [, b]) => b - a)[0][0]

export const createPaladinsAssault = (strength: number, structureHealth: number): Assault => {
  const unsortedDeck = createDeck(strength)
  const majorityType = getMostPresentTypeInDeck(unsortedDeck)
  const deck = findAndPutFirstInArray(unsortedDeck, card => card.type === majorityType).map((paladinCard, index) =>
    index === 0 ? { ...paladinCard, revealed: true } : paladinCard,
  )

  return {
    phase: PaladinsAssaultPhase.Revealing,
    deck,
    traps: [],
    changingPaladinCategory: false,
    startingStructureHealth: structureHealth,
  }
}

export const isCommander = (paladin: PaladinCard) => paladin.type === PaladinType.Commander
export const isPaladinAlive = (paladin: PaladinCard) => paladin.health > 0 && !paladin.skipped
export const isPaladinConsecrated = (paladin: PaladinCard) => paladin.categories.includes(PaladinCategory.Pure)
export const canTargetPaladin = (paladin: PaladinCard, targetsCategories: PaladinCategory[]) =>
  targetsCategories.some(category => paladin.categories.indexOf(category) >= 0)

export const applyDamagesToPaladin = (damages: number, targetCategories: PaladinCategory[]) => (
  paladin: PaladinCard,
) => {
  if (paladin.shield || !canTargetPaladin(paladin, targetCategories)) {
    return paladin
  }
  return { ...paladin, health: applyDamages(paladin.health, damages) }
}
