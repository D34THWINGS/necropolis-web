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
const PREDICTION_REVEAL_BONUS = 4

export type SpellView = {
  key: Spell
  cost: number
  canBeCasted: boolean
  lethalityBonus?: number
  revealBonus?: number
}

const makeSpell = (spell: Spell, extra?: Partial<SpellView>): SpellView => ({
  ...extra,
  key: spell,
  cost: SPELLS_SOUL_COSTS[spell],
  canBeCasted: CAN_BE_CASTED_SPELLS.indexOf(spell) >= 0,
})

export const soulStorm = makeSpell(Spell.SoulStorm, {
  lethalityBonus: SOUL_STORM_LETHALITY_BONUS,
})

export const theKey = makeSpell(Spell.TheKey)

export const prediction = makeSpell(Spell.Prediction, {
  revealBonus: PREDICTION_REVEAL_BONUS,
})

export const canCast = (spell: SpellView, souls: number) => spell.cost <= souls

export const isSoulStorm = (spell: SpellView) => spell.key === Spell.SoulStorm

export const makeSpells = () => [soulStorm, theKey, prediction]
