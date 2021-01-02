import { createAction } from 'typesafe-actions'
import { Undead } from './helpers'
import { AbilityEffect } from './abilityEffects'
import { UndeadAbility } from './abilities'

export const banUndead = createAction('undeads/BAN', (undeadId: Undead['id']) => ({ undeadId }))()

export const sacrificeUndead = createAction('undeads/SACRIFICE', (undeadId: Undead['id']) => ({ undeadId }))()

export const addUndead = createAction('undeads/ADD', (undead: Undead) => ({ undead }))()

export const requireSacrifice = createAction('undeads/REQUIRE_SACRIFICE', (count: number) => ({ count }))()

export const upgradeValet = createAction('undeads/UPGRADE_VALET')()

export const healUndead = createAction('undeads/HEAL', (undeadId: Undead['id'], amount: number) => ({
  undeadId,
  amount,
}))()

export const cleanseUndead = createAction('undeads/CLEANSE', (undeadId: Undead['id']) => ({ undeadId }))()

export const damageUndead = createAction('undeads/DAMAGE', (undeadId: Undead['id'], amount: number) => ({
  undeadId,
  amount,
}))()

export const curseUndead = createAction('undeads/CURSE', (undeadId: Undead['id']) => ({ undeadId }))()

export const castUndeadAbility = createAction(
  'undeads/CAST_ABILITY',
  (undeadId: Undead['id'], ability: UndeadAbility) => ({ undeadId, ability }),
)()

export const applyAbilityEffect = createAction(
  'undeads/APPLY_ABILITY_EFFECT',
  (undeadId: Undead['id'], abilityEffect: AbilityEffect) => ({ undeadId, abilityEffect }),
)()

export const blurAbilityEffects = createAction('undeads/BLUR_ABILITY_EFFECT')()
