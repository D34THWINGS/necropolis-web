import { UndeadTalent } from '../../config/constants'

type TalentsIncreaseAbilityEffect = {
  talentBuffs: [UndeadTalent, number][]
}

export const makeAllTalentsIncreaseEffect = (increaseValue: number): TalentsIncreaseAbilityEffect => ({
  talentBuffs: Object.values(UndeadTalent).map(talent => [talent, increaseValue]),
})

export const makeLethalityIncreaseEffect = (increaseValue: number): TalentsIncreaseAbilityEffect => ({
  talentBuffs: [[UndeadTalent.Lethality, increaseValue]],
})

export type AbilityEffect = TalentsIncreaseAbilityEffect
