import { PALADINS_HEALTH_MAP, PaladinsAssaultPhase, PaladinType, TrapType } from '../../config/constants'

export type Trap = {
  id: number
  type: TrapType
  used: boolean
}

export type Assault = { phase: PaladinsAssaultPhase; deck: PaladinCard[]; traps: Trap[] }

export type PaladinCard = {
  id: number
  type: PaladinType
  revealed: boolean
  health: number
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
    }
  }),
  traps: [],
})

export const createTrap = (type: TrapType): Trap => ({
  id: Date.now(),
  type,
  used: false,
})
