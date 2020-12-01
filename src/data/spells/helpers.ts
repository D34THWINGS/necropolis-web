enum Spell {
  SoulStorm = 'soulStorm',
  TheKey = 'theKey',
  Prediction = 'prediction',
  Restoration = 'restoration',
}

const SPELLS_SOUL_COSTS: Record<Spell, number> = {
  [Spell.SoulStorm]: 4,
  [Spell.TheKey]: 3,
  [Spell.Prediction]: 2,
  [Spell.Restoration]: 4,
}

const CAN_BE_CASTED_SPELLS: Spell[] = [Spell.SoulStorm, Spell.Prediction, Spell.Restoration]

export type SpellView = {
  key: Spell
  cost: number
  canBeCasted: boolean
  lethalityBonus?: number
  revealBonus?: number
  healthRestored?: number
  cleanse?: boolean
}

const makeSpell = (spell: Spell, extra?: Partial<SpellView>): SpellView => ({
  ...extra,
  key: spell,
  cost: SPELLS_SOUL_COSTS[spell],
  canBeCasted: CAN_BE_CASTED_SPELLS.indexOf(spell) >= 0,
})

export const soulStorm = makeSpell(Spell.SoulStorm, {
  lethalityBonus: 5,
})

export const theKey = makeSpell(Spell.TheKey)

export const prediction = makeSpell(Spell.Prediction, {
  revealBonus: 4,
})

export const restoration = makeSpell(Spell.Restoration, {
  healthRestored: 3,
  cleanse: true,
})

export const canCast = (spell: SpellView, souls: number) => spell.cost <= souls

export const isSoulStorm = (spell: SpellView) => spell.key === Spell.SoulStorm
