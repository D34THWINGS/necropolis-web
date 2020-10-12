import { UndeadTalent, UndeadType } from '../../config/constants'

export type Undead = {
  type: UndeadType
  talents: [UndeadTalent, number][]
  raised: boolean
  maxHealth: number
  health: number
}

const getBaseTalents = (type: UndeadType): Undead['talents'] => {
  switch (type) {
    case UndeadType.Valet:
      return [[UndeadTalent.Muscles, 1]]
    case UndeadType.Brikoler:
      return [
        [UndeadTalent.Muscles, 2],
        [UndeadTalent.Lethality, 1],
      ]
    case UndeadType.Skeleton:
      return [
        [UndeadTalent.Lethality, 3],
        [UndeadTalent.Muscles, 1],
      ]
    case UndeadType.LaMotte:
      return [
        [UndeadTalent.Lethality, 3],
        [UndeadTalent.Muscles, 1],
      ]
    case UndeadType.BloodPrince:
      return [[UndeadTalent.Lethality, 3]]
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
    default:
      throw new Error('Unknown undead type')
  }
}

export const getUndeadTalentValue = (undead: Undead, talent: UndeadTalent) => {
  const talentsMap = new Map(undead.talents)
  return talentsMap.get(talent) || 0
}

export const createUndead = (type: UndeadType, raised = false): Undead => ({
  type,
  talents: getBaseTalents(type),
  raised,
  maxHealth: getBaseHealth(type),
  health: getBaseHealth(type),
})
