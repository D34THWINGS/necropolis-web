import { createAction } from 'typesafe-actions'
import { PaladinCategory, PaladinsAssaultPhase, TrapType } from '../../config/constants'

export const increasePaladinsStrength = createAction('paladins/INCREASE_STRENGTH')()

export const increasePaladinsCounter = createAction('paladins/INCREASE_COUNTER')()

export const triggerPaladinsAssault = createAction('paladins/TRIGGER_PALADINS_ASSAULT')()

export const resetPaladinsCounter = createAction('paladins/RESET_COUNTER')()

export const callToArms = createAction('paladins/CALL_TO_ARMS', (turn: number) => ({ turn }))()

export const killPaladins = createAction('paladins/KILL')()

export const beginPaladinsAssault = createAction('paladins/BEGIN_ASSAULT')()

export const endPaladinsAssault = createAction('paladins/END_ASSAULT')()

export const changeAssaultPhase = createAction('paladins/CHANGE_ASSAULT_PHASE', (phase: PaladinsAssaultPhase) => ({
  phase,
}))()

export const addTrap = createAction('paladins/ADD_TRAP', (type: TrapType) => ({ type }))()

export const removeTrap = createAction('paladins/REMOVE_TRAP', (id: number) => ({ id }))()

export const triggerTrap = createAction('paladins/TRIGGER_TRAP', (trapId: number, paladinId: number) => ({
  trapId,
  paladinId,
}))()

export const triggerPaladinBattleCry = createAction('paladins/TRIGGER_BATTLE_CRY', (paladinId: number) => ({
  paladinId,
}))()

export const doDamagesToPaladin = createAction(
  'paladins/DO_DAMAGES_TO_PALADIN',
  (paladinId: number, damages: number, targetCategories: PaladinCategory[]) => ({
    paladinId,
    damages,
    targetCategories,
  }),
)()

export const damageActivePaladin = createAction(
  'paladins/DAMAGE_ACTIVE_PALADIN',
  (damages: number, targetCategories: PaladinCategory[]) => ({ damages, targetCategories }),
)()

export const changePaladinsDamages = createAction(
  'paladins/CHANGE_PALADIN_DAMAGES',
  (paladinIds: number[], changeValue: number) => ({ paladinIds, changeValue }),
)()

export const breakPaladinShield = createAction('paladins/BREAK_PALADIN_SHIELD', (paladinId: number) => ({
  paladinId,
}))()

export const setChangingPaladinCategories = createAction('paladins/SET_CHANGING_PALADIN_CATEGORIES')()

export const changePaladinCategories = createAction(
  'paladins/CHANGE_CATEGORIES',
  (paladinId: number, categories: PaladinCategory[]) => ({ paladinId, categories }),
)()

export const markPaladinsRevealed = createAction('paladins/MARK_REVEALED', (paladinIds: number[]) => ({ paladinIds }))()

export const increasePaladinHealth = createAction(
  'paladins/INCREASE_PALADIN_HEALTH',
  (paladinId: number, amount: number) => ({ paladinId, amount }),
)()

export const shieldPaladin = createAction('paladins/SHIELD_PALADIN', (paladinId: number) => ({
  paladinId,
}))()

export const skipPaladin = createAction('paladins/SKIP_PALADIN', (paladinId: number) => ({
  paladinId,
}))()

export const triggerPaladinAttack = createAction('paladins/TRIGGER_PALADIN_ATTACK', (paladinId: number) => ({
  paladinId,
}))()

export const swapPaladinPostions = createAction(
  'paladins/SWAP_POSITIONS',
  (paladinId: number, swappedPaladinId: number) => ({
    paladinId,
    swappedPaladinId,
  }),
)()

export const repairStructure = createAction('paladins/REPAIR_STRUCTURE', (amount: number) => ({ amount }))()
