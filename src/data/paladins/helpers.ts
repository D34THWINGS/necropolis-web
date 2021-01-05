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
import { countInArray, drawRandomInArray, findAndPutFirstInArray } from '../helpers'
import { Trap } from './traps'

export enum BuildingExtraTrap {
  Upgraded = 'upgraded',
  Normal = 'normal',
  Off = 'off',
}

export type Assault = {
  phase: PaladinsAssaultPhase
  deck: PaladinCard[]
  traps: Trap[]
  changingPaladinCategory: boolean
  startingStructureHealth: number
  buildingExtraTrap: BuildingExtraTrap | null
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
  buffed: boolean
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
  buffed: false,
})

export const createDeck = (nbOfCards: number, possibleTypes: PaladinType[] = Object.values(PaladinType)) =>
  Array.from({ length: nbOfCards }).reduce<PaladinCard[]>(tmpDeck => {
    // Never draw more than 50% identical cards
    let adjustedPossibleTypes = possibleTypes.filter(
      type => countInArray(tmpDeck, card => card.type === type) < nbOfCards / 2,
    )

    // Revert filtering if no types left
    if (adjustedPossibleTypes.length === 0) {
      adjustedPossibleTypes = possibleTypes
    }

    // Never draw more than 1 commander
    const hasCommander = tmpDeck.some(paladin => paladin.type === PaladinType.Commander)
    if (hasCommander) {
      adjustedPossibleTypes = adjustedPossibleTypes.filter(type => type !== PaladinType.Commander)
    }

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

export const createPaladinsAssault = (
  strength: number,
  structureHealth: number,
  possibleTypes: PaladinType[] = Object.values(PaladinType),
): Assault => {
  const unsortedDeck = createDeck(strength, possibleTypes)
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
    buildingExtraTrap: null,
  }
}

export const isVanguard = (paladin: PaladinCard) => paladin.type === PaladinType.Vanguard
export const isHealer = (paladin: PaladinCard) => paladin.type === PaladinType.Healer
export const isZealot = (paladin: PaladinCard) => paladin.type === PaladinType.Zealot
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
