enum EffectKey {
  LethalityBuff = 'lethalityBuff',
}

enum EffectBlurEvent {
  ExpeditionStepChange = 'expeditionStepChange',
}

type BaseSpellEffect = { blurEvent: EffectBlurEvent }

export type LethalityBuffEffect = BaseSpellEffect & { key: EffectKey.LethalityBuff; lethalityBonus: number }

export const makeLethalityBuffEffect = (lethalityBonus: number): LethalityBuffEffect => ({
  key: EffectKey.LethalityBuff,
  lethalityBonus,
  blurEvent: EffectBlurEvent.ExpeditionStepChange,
})

export type SpellEffect = LethalityBuffEffect

export const getLethalityBonusFromEffects = (effects: SpellEffect[]) =>
  effects.reduce((sum, effect) => (effect.key === EffectKey.LethalityBuff ? sum + effect.lethalityBonus : sum), 0)

export const getEffectsBlurringOnStepChange = (effects: SpellEffect[]) =>
  effects.filter(effect => effect.blurEvent === EffectBlurEvent.ExpeditionStepChange)
