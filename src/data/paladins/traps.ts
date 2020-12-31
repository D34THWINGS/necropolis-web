import { v4 as uuid } from 'uuid'
import { PaladinCategory, TRAP_DAMAGES_MAP, TRAP_TARGET_CATEGORIES_MAP, TrapType } from '../../config/constants'

export type Trap = {
  id: string
  type: TrapType
  used: boolean
  damages: number
  targetsCategories: PaladinCategory[]
}

export const createTrap = (type: TrapType): Trap => ({
  id: uuid(),
  type,
  used: false,
  damages: TRAP_DAMAGES_MAP[type],
  targetsCategories: TRAP_TARGET_CATEGORIES_MAP[type],
})
