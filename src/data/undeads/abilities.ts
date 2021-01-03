import { PaladinCategory } from '../../config/constants'

enum UndeadAbilityType {
  Devotion = 'devotion',
  Labor = 'labor',
  Protection = 'protection',
  Seduction = 'seduction',
  SectumSempra = 'sectumSempra',
}

type BaseAbility = {
  used: boolean
}

const makeBaseAbility = (): BaseAbility => ({
  used: false,
})

type AbilityWithDamages = {
  damages: number
  targetCategories: PaladinCategory[]
}

type Devotion = BaseAbility &
  AbilityWithDamages & {
    type: UndeadAbilityType.Devotion
    healthCost: number
    talentsBonus: number
  }
export const makeDevotionAbility = (): Devotion => ({
  ...makeBaseAbility(),
  type: UndeadAbilityType.Devotion,
  healthCost: 1,
  talentsBonus: 3,
  damages: 3,
  targetCategories: [PaladinCategory.Physical],
})
export const isDevotion = (ability: UndeadAbility): ability is Devotion => ability.type === UndeadAbilityType.Devotion

type Labor = BaseAbility & {
  type: UndeadAbilityType.Labor
}
export const makeLaborAbility = (): Labor => ({
  ...makeBaseAbility(),
  type: UndeadAbilityType.Labor,
})
export const isLabor = (ability: UndeadAbility): ability is Labor => ability.type === UndeadAbilityType.Labor

type Protection = BaseAbility & {
  type: UndeadAbilityType.Protection
  shieldValue: number
  damageBuffer: number
}
export const makeProtectionAbility = (): Protection => ({
  ...makeBaseAbility(),
  type: UndeadAbilityType.Protection,
  shieldValue: 2,
  damageBuffer: 3,
})
export const isProtection = (ability: UndeadAbility): ability is Protection =>
  ability.type === UndeadAbilityType.Protection

type Seduction = BaseAbility & {
  type: UndeadAbilityType.Seduction
  talentBonus: number
  targetPaladinMaxHealth: number
}
export const makeSeductionAbility = (): Seduction => ({
  ...makeBaseAbility(),
  type: UndeadAbilityType.Seduction,
  talentBonus: 1,
  targetPaladinMaxHealth: 1,
})
export const isSeduction = (ability: UndeadAbility): ability is Seduction =>
  ability.type === UndeadAbilityType.Seduction

type SectumSempra = BaseAbility &
  AbilityWithDamages & {
    type: UndeadAbilityType.SectumSempra
    lethalityBonus: number
  }
export const makeSectumSempraAbility = (): SectumSempra => ({
  ...makeBaseAbility(),
  type: UndeadAbilityType.SectumSempra,
  lethalityBonus: 2,
  damages: 3,
  targetCategories: [PaladinCategory.Magical],
})
export const isSectumSempra = (ability: UndeadAbility): ability is SectumSempra =>
  ability.type === UndeadAbilityType.SectumSempra

export type UndeadAbility = Devotion | Labor | Protection | Seduction | SectumSempra

export const isAbilityWithDamages = (ability: unknown): ability is AbilityWithDamages =>
  (ability as AbilityWithDamages).damages !== undefined
