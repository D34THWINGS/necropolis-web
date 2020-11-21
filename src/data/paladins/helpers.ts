import {
  NECROPOLIS_STRUCTURE_POINTS,
  PALADINS_HEALTH_MAP,
  PaladinCategory,
  PaladinsAssaultPhase,
  PaladinType,
  TrapType,
  TRAP_TARGET_CATEGORIES_MAP,
  PALADINS_CATEGORIES_MAP,
  PALADINS_DAMAGES_MAP,
  TRAP_DAMAGES_MAP,
  PALADINS_WITH_SHIELD,
} from '../../config/constants'

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
  structureHealth: number
  changingPaladinCategory: boolean
}

export type PaladinCard = {
  id: number
  type: PaladinType
  revealed: boolean
  health: number
  maxHealth: number
  damages: number
  categories: PaladinCategory[]
  shield: boolean
}

export const createPaladinsAssault = (strength: number): Assault => ({
  phase: PaladinsAssaultPhase.Revealing,
  deck: Array.from({ length: strength }).map((_, index) => {
    const possibleTypes = Object.values(PaladinType)
    const type = possibleTypes[Math.floor(Math.random() * possibleTypes.length)] ?? PaladinType.Vanguard
    return {
      id: index,
      type,
      revealed: index === 0,
      health: PALADINS_HEALTH_MAP[type],
      maxHealth: PALADINS_HEALTH_MAP[type],
      damages: PALADINS_DAMAGES_MAP[type],
      categories: PALADINS_CATEGORIES_MAP[type],
      shield: PALADINS_WITH_SHIELD.indexOf(type) >= 0,
    }
  }),
  traps: [],
  structureHealth: NECROPOLIS_STRUCTURE_POINTS,
  changingPaladinCategory: false,
})

export const createTrap = (type: TrapType): Trap => ({
  id: Date.now(),
  type,
  used: false,
  damages: TRAP_DAMAGES_MAP[type],
  targetsCategories: TRAP_TARGET_CATEGORIES_MAP[type],
})

export const isPaladinAlive = (paladin: PaladinCard) => paladin.health > 0
