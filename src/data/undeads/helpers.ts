import { UndeadTalent, UndeadType } from '../../config/constants'

export type Undead = {
  id: number
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
        [UndeadTalent.Lethality, 1],
      ]
    case UndeadType.LaMotte:
      return [[UndeadTalent.Lethality, 3]]
    case UndeadType.BloodPrince:
      return [[UndeadTalent.Lethality, 4]]
    default:
      throw Error('Unknown undead type')
  }
}

export const createUndead = (type: UndeadType, raised = false): Undead => ({
  id: Date.now(),
  type,
  talents: getBaseTalents(type),
  raised,
})
