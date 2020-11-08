import {
  NECROPOLIS_STRUCTURE_POINTS,
  PALADINS_HEALTH_MAP,
  PaladinCategory,
  PaladinsAssaultPhase,
  PaladinType,
  TrapType,
  TRAP_TARGET_CATEGORIES_MAP,
  PALADINS_CATEGORIES_MAP,
} from '../../config/constants'

export type Trap = {
  id: number
  type: TrapType
  used: boolean
  targetsCategories: PaladinCategory[]
}

export type Assault = { phase: PaladinsAssaultPhase; deck: PaladinCard[]; traps: Trap[]; structureHealth: number }

export type PaladinCard = {
  id: number
  type: PaladinType
  revealed: boolean
  health: number
  categories: PaladinCategory[]
}

export const createPaladinsAssault = (strength: number): Assault => ({
  phase: PaladinsAssaultPhase.Revealing,
  deck: Array.from({ length: strength }).map((_, index) => {
    const type = PaladinType.Vanguard
    return {
      id: index,
      type,
      revealed: index === 0,
      health: PALADINS_HEALTH_MAP[type],
      categories: PALADINS_CATEGORIES_MAP[type],
    }
  }),
  traps: [],
  structureHealth: NECROPOLIS_STRUCTURE_POINTS,
})

export const createTrap = (type: TrapType): Trap => ({
  id: Date.now(),
  type,
  used: false,
  targetsCategories: TRAP_TARGET_CATEGORIES_MAP[type],
})
