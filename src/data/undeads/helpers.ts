import { v4 as uuid } from 'uuid'
import { UndeadTalent, UndeadType } from '../../config/constants'
import {
  makeDevotionAbility,
  makeLaborAbility,
  makeProtectionAbility,
  makeSectumSempraAbility,
  makeSeductionAbility,
  UndeadAbility,
} from './abilities'
import { AbilityEffect, getTalentBuffsFromAbilityEffects } from './abilityEffects'
import { setInArray } from '../helpers'

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
  activeEffects: AbilityEffect[]
}

const makeBaseUndead = (health: number) => ({
  id: uuid(),
  health,
  maxHealth: health,
  banned: false,
  cursed: false,
  activeEffects: [],
})

export const makeValet = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.Valet,
  talents: [[UndeadTalent.Dexterity, 2]],
  ability: makeDevotionAbility(),
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
  ability: makeLaborAbility(),
})

export const makeSkeleton = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.Skeleton,
  talents: [
    [UndeadTalent.Lethality, 2],
    [UndeadTalent.Subjugation, 2],
  ],
  ability: makeSeductionAbility(),
})

export const makeLaMotte = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.LaMotte,
  talents: [
    [UndeadTalent.Lethality, 3],
    [UndeadTalent.Muscles, 1],
  ],
  ability: makeProtectionAbility(),
})
export const isLaMotte = (undead: Undead) => undead.type === UndeadType.LaMotte

export const makeBloodPrince = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.BloodPrince,
  talents: [
    [UndeadTalent.Subjugation, 1],
    [UndeadTalent.Necromancy, 3],
  ],
  ability: makeSectumSempraAbility(),
})
export const isBloodPrince = (undead: Undead) => undead.type === UndeadType.BloodPrince

export const isUndeadAlive = (undead: Undead) => undead.health > 0 && !undead.banned

export type EntityWithHealth = { health: number; maxHealth: number }

export const getMissingHealth = <T extends EntityWithHealth>(entity: T) => entity.maxHealth - entity.health

export const getMostInjured = <T extends EntityWithHealth>(list: T[]): T | undefined =>
  Array.from(list).sort((a, b) => getMissingHealth(b) - getMissingHealth(a))[0]

export const applyDamages = (entityHealth: number, damages: number) => Math.max(0, entityHealth - Math.max(0, damages))

export const makeUndeadPool = () => [makeBrikoler(), makeSkeleton(), makeLaMotte(), makeBloodPrince()]

export const getUndeadTalents = (undead: Undead) =>
  undead.talents.concat(getTalentBuffsFromAbilityEffects(undead.activeEffects))

export const increaseMajorTalent = (undead: Undead, value: number) => {
  const [majorTalent, majorTalentValue] = undead.talents.sort(([, a], [, b]) => b - a)[0]
  const index = undead.talents.findIndex(([talent]) => talent === majorTalent)
  return {
    ...undead,
    talents: setInArray<Undead['talents'][number]>(undead.talents, index, [majorTalent, majorTalentValue + value]),
  }
}
