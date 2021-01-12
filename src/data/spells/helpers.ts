import { PaladinCategory } from '../../config/constants'
import { makeLethalityBuffEffect, SpellEffect } from './effects'

enum SpellKey {
  SoulStorm = 'soulStorm',
  TheKey = 'theKey',
  Prediction = 'prediction',
  Restoration = 'restoration',
}

enum CastPhase {
  PaladinsReveal = 'paladinsReveal',
  AssaultFight = 'assaultFight',
  Expeditions = 'expeditions',
  Ossuary = 'ossuary',
}

type BaseSpell = {
  cost: number
  castPhases: CastPhase[]
  used: boolean
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
  castPhases: [CastPhase.Expeditions, CastPhase.AssaultFight],
  cost: 4,
  damages: 4,
  targetCategories: [PaladinCategory.Magical, PaladinCategory.Ethereal],
  effects: [makeLethalityBuffEffect(5)],
  used: false,
})
export const isSoulStorm = (spell: Spell): spell is SoulStorm => spell.key === SpellKey.SoulStorm

type TheKey = BaseSpell &
  SpellWithDamages & {
    key: SpellKey.TheKey
  }
export const makeTheKey = (): TheKey => ({
  key: SpellKey.TheKey,
  cost: 3,
  castPhases: [CastPhase.AssaultFight],
  damages: 3,
  targetCategories: [PaladinCategory.Physical, PaladinCategory.Ethereal],
  used: false,
})
export const isTheKey = (spell: Spell): spell is TheKey => spell.key === SpellKey.TheKey

type Prediction = BaseSpell & {
  key: SpellKey.Prediction
  revealBonus: number
}
export const makePrediction = (): Prediction => ({
  key: SpellKey.Prediction,
  cost: 2,
  castPhases: [CastPhase.Ossuary, CastPhase.PaladinsReveal],
  revealBonus: 3,
  used: false,
})
export const isPrediction = (spell: Spell): spell is Prediction => spell.key === SpellKey.Prediction

type Restoration = BaseSpell & {
  key: SpellKey.Restoration
  healthRestored: number
  structureRepairAmount: number
  targetsCleansed: number
}

export const makeRestoration = (): Restoration => ({
  key: SpellKey.Restoration,
  cost: 4,
  castPhases: [CastPhase.Expeditions, CastPhase.AssaultFight],
  healthRestored: 2,
  structureRepairAmount: 3,
  targetsCleansed: 1,
  used: false,
})
export const isRestoration = (spell: Spell): spell is Restoration => spell.key === SpellKey.Restoration

export type Spell = SoulStorm | TheKey | Restoration | Prediction

export const canCast = (spell: Spell, souls: number) => spell.cost <= souls && !spell.used
export const canCastInExpeditions = (spell: Spell) => spell.castPhases.includes(CastPhase.Expeditions)
export const canCastInAssaultFight = (spell: Spell) => spell.castPhases.includes(CastPhase.AssaultFight)
export const canCastInPaladinsReveal = (spell: Spell) => spell.castPhases.includes(CastPhase.PaladinsReveal)
export const canCastOnOssuary = (spell: Spell) => spell.castPhases.includes(CastPhase.Ossuary)

export const isSpellWithDamages = (spell: unknown): spell is SpellWithDamages =>
  (spell as SpellWithDamages).damages !== undefined

const makeSpellFromKey = (key: SpellKey) => {
  switch (key) {
    case SpellKey.SoulStorm:
      return makeSoulStorm()
    case SpellKey.Restoration:
      return makeRestoration()
    case SpellKey.TheKey:
      return makeTheKey()
    case SpellKey.Prediction:
      return makePrediction()
  }
}

export const getSpellsToLearn = (knownSpells: Spell[]) =>
  Object.values(SpellKey)
    .filter(key => knownSpells.every(spell => spell.key !== key))
    .map(makeSpellFromKey)
