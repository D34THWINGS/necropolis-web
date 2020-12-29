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

export const createUndead = (type: UndeadType, raised = false): Undead => ({
  id: Math.floor(Math.random() * 10000),
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

export type EntityWithHealth = { health: number; maxHealth: number }

export const getMissingHealth = <T extends EntityWithHealth>(entity: T) => entity.maxHealth - entity.health

export const getMostInjured = <T extends EntityWithHealth>(list: T[]): T | undefined =>
  Array.from(list).sort((a, b) => getMissingHealth(b) - getMissingHealth(a))[0]

export const applyDamages = (entityHealth: number, damages: number) => Math.max(0, entityHealth - Math.max(0, damages))

export const makeUndeadPool = () =>
  Object.values(UndeadType)
    .filter(type => type !== UndeadType.Valet)
    .map(type => createUndead(type))
