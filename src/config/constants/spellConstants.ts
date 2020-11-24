import { Translation } from '../../lang/i18nContext'

enum Spell {
  SoulStorm = 'soulStorm',
  TheKey = 'theKey',
  Prediction = 'prediction',
}

const SPELLS_SOUL_COSTS: Record<Spell, number> = {
  [Spell.SoulStorm]: 3,
  [Spell.TheKey]: 2,
  [Spell.Prediction]: 2,
}

const CAN_BE_CASTED_SPELLS: Spell[] = [Spell.SoulStorm, Spell.Prediction]

const SOUL_STORM_LETHALITY_BONUS = 5

type SpellBaseView = {
  key: Spell
  cost: number
  canBeCasted: boolean
  lethalityBonus?: number
}

export type SpellView = SpellBaseView & {
  label: Translation
  description: Translation
  imageUrl: string
}

type SpellDescriptor = (spell: SpellBaseView) => Translation

const makeSpell = (imageUrl: string, label: Translation, description: SpellDescriptor) => (
  spell: Spell,
  extra?: Partial<SpellBaseView>,
): SpellView => {
  const spellBase: SpellBaseView = {
    ...extra,
    key: spell,
    cost: SPELLS_SOUL_COSTS[spell],
    canBeCasted: CAN_BE_CASTED_SPELLS.indexOf(spell) >= 0,
  }
  return {
    ...spellBase,
    imageUrl,
    label,
    description: description(spellBase),
  }
}

export const makeSoulStorm = (imageUrl: string, label: Translation, description: SpellDescriptor) =>
  makeSpell(
    imageUrl,
    label,
    description,
  )(Spell.SoulStorm, {
    lethalityBonus: SOUL_STORM_LETHALITY_BONUS,
  })

export const makeTheKey = (imageUrl: string, label: Translation, description: SpellDescriptor) =>
  makeSpell(imageUrl, label, description)(Spell.TheKey)

export const makePrediction = (imageUrl: string, label: Translation, description: SpellDescriptor) =>
  makeSpell(imageUrl, label, description)(Spell.Prediction)

export const canCast = (spell: SpellView, souls: number) => spell.cost <= souls

export const isSoulStorm = (spell: SpellView) => spell.key === Spell.SoulStorm
