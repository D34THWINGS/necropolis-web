import { UndeadAbility, UndeadTalent, UndeadType } from '../../config/constants'

export type Undead = {
  id: number
  type: UndeadType
  talents: [UndeadTalent, number][]
  raised: boolean
  banned: boolean
  cursed: boolean
  maxHealth: number
  health: number
  ability: UndeadAbility
}

const getBaseTalents = (type: UndeadType): Undead['talents'] => {
  switch (type) {
    case UndeadType.Valet:
      return [[UndeadTalent.Dexterity, 2]]
    case UndeadType.Brikoler:
      return [
        [UndeadTalent.Lethality, 1],
        [UndeadTalent.Muscles, 2],
        [UndeadTalent.Dexterity, 1],
      ]
    case UndeadType.Skeleton:
      return [
        [UndeadTalent.Lethality, 2],
        [UndeadTalent.Subjugation, 2],
      ]
    case UndeadType.LaMotte:
      return [
        [UndeadTalent.Lethality, 3],
        [UndeadTalent.Muscles, 1],
      ]
    case UndeadType.BloodPrince:
      return [
        [UndeadTalent.Subjugation, 1],
        [UndeadTalent.Necromancy, 3],
      ]
    default:
      throw Error('Unknown undead type')
  }
}

const getBaseHealth = (type: UndeadType) => {
  switch (type) {
    case UndeadType.Valet:
      return 3
    case UndeadType.Brikoler:
      return 3
    case UndeadType.LaMotte:
      return 4
    case UndeadType.Skeleton:
      return 3
    case UndeadType.BloodPrince:
      return 3
  }
}

const getUndeadAbility = (type: UndeadType) => {
  switch (type) {
    case UndeadType.Valet:
      return UndeadAbility.Devotion
    case UndeadType.Brikoler:
      return UndeadAbility.Labor
    case UndeadType.LaMotte:
      return UndeadAbility.Protection
    case UndeadType.Skeleton:
      return UndeadAbility.Seduction
    case UndeadType.BloodPrince:
      return UndeadAbility.SectumSempra
  }
}

export const getUndeadTalentValue = (undead: Undead, talent: UndeadTalent) => {
  const talentsMap = new Map(undead.talents)
  return talentsMap.get(talent) || 0
}

export const createUndead = (type: UndeadType, raised = false): Undead => ({
  id: Date.now(),
  type,
  talents: getBaseTalents(type),
  raised,
  banned: false,
  cursed: false,
  maxHealth: getBaseHealth(type),
  health: getBaseHealth(type),
  ability: getUndeadAbility(type),
})

export const isUndeadAlive = (undead: Undead) => undead.health > 0 && !undead.banned
