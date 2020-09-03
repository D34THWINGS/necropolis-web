import { UndeadTalent, UndeadType } from '../../config/constants'

export type Undead = {
  type: UndeadType
  talents: [UndeadTalent, number][]
  raised: boolean
}

const getBaseTalents = (type: UndeadType): Undead['talents'] => {
  switch (type) {
    case UndeadType.Valet:
      return [[UndeadTalent.Muscles, 1]]
    case UndeadType.Brikoler:
    case UndeadType.Skeleton:
      return [
        [UndeadTalent.Muscles, 1],
        [UndeadTalent.Lethality, 2],
      ]
    case UndeadType.LaMotte:
      return [[UndeadTalent.Lethality, 3]]
    case UndeadType.BloodPrince:
      return [[UndeadTalent.Lethality, 4]]
    default:
      throw Error('Unknown undead type')
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
})
