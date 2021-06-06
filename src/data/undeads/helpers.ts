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
import { drawRandomInArray, setInArray, shuffleArray } from '../helpers'
import { random } from '../seeder'

export type UndeadId = string

export type UndeadDice = {
  id: string
  type: UndeadTalent | null
  maxValue: number
}

export const makeUndeadDice = (type: UndeadTalent | null, maxValue: number) => ({
  id: uuid(),
  type,
  maxValue,
})

export const makeBaseDice = () => makeUndeadDice(null, 4)

export type Undead = {
  id: UndeadId
  type: UndeadType
  talents: [UndeadTalent, number][]
  dices: UndeadDice[]
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
  dices: [makeUndeadDice(UndeadTalent.Dexterity, 8)],
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
  dices: [
    makeUndeadDice(UndeadTalent.Lethality, 6),
    makeUndeadDice(UndeadTalent.Muscles, 6),
    makeUndeadDice(UndeadTalent.Dexterity, 6),
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
  dices: [makeUndeadDice(UndeadTalent.Lethality, 6), makeUndeadDice(UndeadTalent.Subjugation, 8)],
  ability: makeSeductionAbility(),
})

export const makeLaMotte = (): Undead => ({
  ...makeBaseUndead(3),
  type: UndeadType.LaMotte,
  talents: [
    [UndeadTalent.Lethality, 3],
    [UndeadTalent.Muscles, 1],
  ],
  dices: [makeUndeadDice(UndeadTalent.Lethality, 10)],
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
  dices: [makeUndeadDice(UndeadTalent.Necromancy, 8), makeUndeadDice(UndeadTalent.Subjugation, 6)],
  ability: makeSectumSempraAbility(),
})
export const isBloodPrince = (undead: Undead) => undead.type === UndeadType.BloodPrince

export const isUndeadAlive = (undead: Undead) => undead.health > 0 && !undead.banned

export type EntityWithHealth = { health: number; maxHealth: number }

export const getMissingHealth = <T extends EntityWithHealth>(entity: T) => Math.max(entity.maxHealth - entity.health, 0)

export const isInjured = <T extends EntityWithHealth>(entity: T) => getMissingHealth(entity) > 0

export const getMostInjured = <T extends EntityWithHealth>(list: T[]): T | undefined =>
  Array.from(list)
    .filter(isInjured)
    .sort((a, b) => getMissingHealth(b) - getMissingHealth(a))[0] ?? null

export const applyDamages = (entityHealth: number, damages: number) => Math.max(0, entityHealth - Math.max(0, damages))

const makeUndeadFromType = (type: UndeadType) => {
  switch (type) {
    case UndeadType.Valet:
      return makeValet()
    case UndeadType.Brikoler:
      return makeBrikoler()
    case UndeadType.LaMotte:
      return makeLaMotte()
    case UndeadType.Skeleton:
      return makeSkeleton()
    case UndeadType.BloodPrince:
      return makeBloodPrince()
  }
}

export const makeUndeadPool = (poolSize: number, raisedUndeads: Undead[] = []) => {
  const availableTypes = shuffleArray(
    Object.values(UndeadType).filter(
      type => !raisedUndeads.some(undead => undead.type === type) && type !== UndeadType.Valet,
    ),
  )
  return Array.from({ length: poolSize }).reduce<Undead[]>(pool => {
    const type = availableTypes.pop()
    return [...pool, makeUndeadFromType(type ?? drawRandomInArray(Object.values(UndeadType)))]
  }, [])
}

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

export const getUndeadDice = (undead: Undead, talent: UndeadTalent) =>
  undead.dices.find(dice => dice.type === talent) ?? makeBaseDice()

export const rollDice = (dice: UndeadDice) => Math.ceil(random() * dice.maxValue)
