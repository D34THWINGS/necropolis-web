import {
  NECROPOLIS_STRUCTURE_POINTS,
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

export type Trap = {
  id: number
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
}

export type PaladinCard = {
  id: number
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

export const createPaladinsAssault = (strength: number): Assault => ({
  phase: PaladinsAssaultPhase.Revealing,
  deck: Array.from({ length: strength }).reduce<PaladinCard[]>((deck, _, index) => {
    // Never draw more than 1 commander
    const possibleTypes = Object.values(PaladinType)
    if (deck.some(paladin => paladin.type === PaladinType.Commander)) {
      possibleTypes.splice(possibleTypes.indexOf(PaladinType.Commander), 1)
    }

    const type = possibleTypes[Math.floor(random() * possibleTypes.length)] ?? PaladinType.Vanguard

    const paladin: PaladinCard = {
      id: index,
      type,
      revealed: index === 0,
      battleCryTriggered: false,
      health: PALADINS_HEALTH_MAP[type],
      maxHealth: PALADINS_HEALTH_MAP[type],
      damages: PALADINS_DAMAGES_MAP[type],
      categories: PALADINS_CATEGORIES_MAP[type],
      shield: PALADINS_WITH_SHIELD.indexOf(type) >= 0,
      skipped: false,
    }

    // Commander always first in deck
    return type === PaladinType.Commander ? [paladin, ...deck] : [...deck, paladin]
  }, []),
  traps: [],
  changingPaladinCategory: false,
})

export const createTrap = (type: TrapType): Trap => ({
  id: Date.now(),
  type,
  used: false,
  damages: TRAP_DAMAGES_MAP[type],
  targetsCategories: TRAP_TARGET_CATEGORIES_MAP[type],
})

export const isPaladinAlive = (paladin: PaladinCard) => paladin.health > 0 && !paladin.skipped
