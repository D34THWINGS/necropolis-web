import { PaladinCategory } from '../../config/constants'
import { makeLethalityBuffEffect, SpellEffect } from './effects'

enum SpellKey {
  SoulStorm = 'soulStorm',
  TheKey = 'theKey',
  Prediction = 'prediction',
  Restoration = 'restoration',
}

type BaseSpell = {
  cost: number
  canBeCasted: boolean
}

type SpellWithEffects = {
  effects: SpellEffect[]
}

type SpellWithDamages = {
  damages: number
  targetCategories: PaladinCategory[]
}

export type SoulStorm = BaseSpell &
  SpellWithEffects &
  SpellWithDamages & {
    key: SpellKey.SoulStorm
  }

export const makeSoulStorm = (): SoulStorm => ({
  key: SpellKey.SoulStorm,
  canBeCasted: true,
  cost: 4,
  damages: 4,
  targetCategories: [PaladinCategory.Magical, PaladinCategory.Ethereal],
  effects: [makeLethalityBuffEffect(5)],
})

type TheKey = BaseSpell &
  SpellWithDamages & {
    key: SpellKey.TheKey
  }

export const makeTheKey = (): TheKey => ({
  key: SpellKey.TheKey,
  cost: 3,
  canBeCasted: false,
  damages: 3,
  targetCategories: [PaladinCategory.Physical, PaladinCategory.Ethereal],
})

type Prediction = BaseSpell & {
  key: SpellKey.Prediction
  revealBonus: number
}

export const makePrediction = (): Prediction => ({
  key: SpellKey.Prediction,
  cost: 2,
  canBeCasted: true,
  revealBonus: 3,
})

type Restoration = BaseSpell & {
  key: SpellKey.Restoration
  healthRestored: number
  structureRepairAmount: number
  cleanse: boolean
}

export const makeRestoration = (): Restoration => ({
  key: SpellKey.Restoration,
  cost: 4,
  canBeCasted: true,
  healthRestored: 3,
  structureRepairAmount: 3,
  cleanse: true,
})

export type Spell = SoulStorm | TheKey | Restoration | Prediction

export const canCast = (spell: Spell, souls: number) => spell.cost <= souls

export const isSoulStorm = (spell: Spell): spell is SoulStorm => spell.key === SpellKey.SoulStorm

export const isRestoration = (spell: Spell): spell is Restoration => spell.key === SpellKey.Restoration

export const isTheKey = (spell: Spell): spell is TheKey => spell.key === SpellKey.TheKey

export const isPrediction = (spell: Spell): spell is Prediction => spell.key === SpellKey.Prediction
