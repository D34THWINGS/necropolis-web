import { createAction } from 'typesafe-actions'
import { PaladinCategory, PaladinsAssaultPhase, TrapType } from '../../config/constants'

export const increasePaladinsStrength = createAction('paladins/INCREASE_STRENGTH')()

export const increasePaladinsCounter = createAction('paladins/INCREASE_COUNTER')()

export const triggerPaladinsAttack = createAction('paladins/TRIGGER_PALADINS_ATTACK')()

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

export const useTrap = createAction('paladins/USE_TRAP', (id: number) => ({ id }))()

export const doDamagesToPaladin = createAction(
  'paladins/DO_DAMAGES_TO_PALADIN',
  (paladinId: number, damages: number) => ({ paladinId, damages }),
)()

export const damageActivePaladin = createAction('paladins/DAMAGE_ACTIVE_PALADIN', (damages: number) => ({ damages }))()

export const reducePaladinDamages = createAction(
  'paladins/REDUCE_PALADIN_DAMAGES',
  (paladinId: number, damageDebuff: number) => ({ paladinId, damageDebuff }),
)()

export const breakPaladinShield = createAction('paladins/BREAK_PALADIN_SHIELD', (paladinId: number) => ({
  paladinId,
}))()

export const setChangingPaladinCategories = createAction('paladins/SET_CHANGING_PALADIN_CATEGORIES')()

export const changePaladinCategories = createAction(
  'paladins/CHANGE_CATEGORIES',
  (paladinId: number, categories: PaladinCategory[]) => ({ paladinId, categories }),
)()

export const markPaladinRevealed = createAction('paladins/MARK_REVEALED', (paladinId: number) => ({ paladinId }))()
