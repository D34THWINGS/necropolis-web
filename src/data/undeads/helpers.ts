import { UndeadTalent, UndeadType } from '../../config/constants'

type Undead = {
  talents: Map<UndeadTalent, number>
  raised: boolean
}

const getBaseTalents = (type: UndeadType): Undead['talents'] => {
  switch (type) {
    case UndeadType.Valet:
      return new Map([[UndeadTalent.Muscles, 1]])
    case UndeadType.Brikoler:
    case UndeadType.Skeleton:
      return new Map([
        [UndeadTalent.Muscles, 1],
        [UndeadTalent.Lethality, 1],
      ])
    case UndeadType.LaMotte:
      return new Map([[UndeadTalent.Lethality, 3]])
    case UndeadType.BloodPrince:
      return new Map([[UndeadTalent.Lethality, 4]])
    default:
      throw Error('Unknown undead type')
  }
}

export const createUndead = (type: UndeadType, raised = false): Undead => ({
  talents: getBaseTalents(type),
  raised,
})
