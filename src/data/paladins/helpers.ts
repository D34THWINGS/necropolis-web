import { v4 as uuid } from 'uuid'
import {
  PaladinCategory,
  PALADINS_CATEGORIES_MAP,
  PALADINS_DAMAGES_MAP,
  PALADINS_HEALTH_MAP,
  PALADINS_WITH_SHIELD,
  PaladinsAssaultPhase,
  PaladinType,
  TRAP_DAMAGES_MAP,
  TRAP_TARGET_CATEGORIES_MAP,
  TrapType,
} from '../../config/constants'
import { random } from '../seeder'
import { applyDamages } from '../undeads/helpers'

export type Trap = {
  id: string
  type: TrapType
  used: boolean
  damages: number
  targetsCategories: PaladinCategory[]
}

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

export const createPaladinsAssault = (strength: number, structureHealth: number): Assault => ({
  phase: PaladinsAssaultPhase.Revealing,
  deck: Array.from({ length: strength })
    .reduce<PaladinCard[]>(deck => {
      // Never draw more than 1 commander
      let possibleTypes = Object.values(PaladinType)
      if (deck.some(paladin => paladin.type === PaladinType.Commander)) {
        possibleTypes = possibleTypes.filter(type => type !== PaladinType.Commander)
      }

      const type = possibleTypes[Math.floor(random() * possibleTypes.length)] ?? PaladinType.Vanguard

      const paladin: PaladinCard = createPaladinCard(type)

      // Commander always first in deck
      return type === PaladinType.Commander ? [paladin, ...deck] : [...deck, paladin]
    }, [])
    .map((paladinCard, index) => (index === 0 ? { ...paladinCard, revealed: true } : paladinCard)),
  traps: [],
  changingPaladinCategory: false,
  startingStructureHealth: structureHealth,
})

export const createTrap = (type: TrapType): Trap => ({
  id: uuid(),
  type,
  used: false,
  damages: TRAP_DAMAGES_MAP[type],
  targetsCategories: TRAP_TARGET_CATEGORIES_MAP[type],
})

export const isPaladinAlive = (paladin: PaladinCard) => paladin.health > 0 && !paladin.skipped

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
