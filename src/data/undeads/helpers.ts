import { v4 as uuid } from 'uuid'
import { UndeadAbility, UndeadTalent, UndeadType } from '../../config/constants'

export type UndeadId = string

export type Undead = {
  id: UndeadId
  type: UndeadType
  talents: [UndeadTalent, number][]
  banned: boolean
  cursed: boolean
  maxHealth: number
  health: number
  ability: UndeadAbility
}

const makeBaseUndead = (health: number) => ({
  id: uuid(),
  health,
  maxHealth: health,
  banned: false,
  cursed: false,
})

export const makeValet = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.Valet,
  talents: [[UndeadTalent.Dexterity, 2]],
  ability: UndeadAbility.Devotion,
})
export const isValet = (undead: Undead) => undead.type === UndeadType.Valet

export const makeBrikoler = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.Brikoler,
  talents: [
    [UndeadTalent.Lethality, 1],
    [UndeadTalent.Muscles, 2],
    [UndeadTalent.Dexterity, 1],
  ],
  ability: UndeadAbility.Labor,
})

export const makeSkeleton = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.Skeleton,
  talents: [
    [UndeadTalent.Lethality, 2],
    [UndeadTalent.Subjugation, 2],
  ],
  ability: UndeadAbility.Seduction,
})

export const makeLaMotte = (): Undead => ({
  ...makeBaseUndead(4),
  type: UndeadType.LaMotte,
  talents: [
    [UndeadTalent.Lethality, 3],
    [UndeadTalent.Muscles, 1],
  ],
  ability: UndeadAbility.Protection,
})
export const isLaMotte = (undead: Undead) => undead.type === UndeadType.LaMotte

export const makeBloodPrince = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.BloodPrince,
  talents: [
    [UndeadTalent.Subjugation, 1],
    [UndeadTalent.Necromancy, 3],
  ],
  ability: UndeadAbility.SectumSempra,
})
export const isBloodPrince = (undead: Undead) => undead.type === UndeadType.BloodPrince

export const isUndeadAlive = (undead: Undead) => undead.health > 0 && !undead.banned

export type EntityWithHealth = { health: number; maxHealth: number }

export const getMissingHealth = <T extends EntityWithHealth>(entity: T) => entity.maxHealth - entity.health

export const getMostInjured = <T extends EntityWithHealth>(list: T[]): T | undefined =>
  Array.from(list).sort((a, b) => getMissingHealth(b) - getMissingHealth(a))[0]

export const applyDamages = (entityHealth: number, damages: number) => Math.max(0, entityHealth - Math.max(0, damages))

export const makeUndeadPool = () => [makeBrikoler(), makeSkeleton(), makeLaMotte(), makeBloodPrince()]
