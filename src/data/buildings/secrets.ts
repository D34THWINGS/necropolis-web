import { v4 as uuid } from 'uuid'
import {
  getSpellsToLearn,
  isPrediction,
  isRestoration,
  isSoulStorm,
  isTheKey,
  Spell as SpellView,
} from '../spells/helpers'
import { shuffleArray } from '../helpers'

const SOUL_STORM_PRICE = 5
const THE_KEY_PRICE = 3
const RESTORATION_PRICE = 4
const PREDICTION_PRICE = 3

enum SecretType {
  Spell = 'spell',
}

type BaseSecret = { id: string; bonesPrice: number }

type SpellSecret = BaseSecret & {
  type: SecretType.Spell
  spell: SpellView
}

export type Secret = SpellSecret

const getSpellPrice = (spell: SpellView) => {
  if (isSoulStorm(spell)) {
    return SOUL_STORM_PRICE
  }
  if (isTheKey(spell)) {
    return THE_KEY_PRICE
  }
  if (isRestoration(spell)) {
    return RESTORATION_PRICE
  }
  if (isPrediction(spell)) {
    return PREDICTION_PRICE
  }
  return ((_: never) => _)(spell)
}

export const makeSpellSecret = (spell: SpellView): SpellSecret => ({
  id: uuid(),
  type: SecretType.Spell,
  spell,
  bonesPrice: getSpellPrice(spell),
})

const makeSecretsFromSpellBook = (knownSpells: SpellView[]) =>
  getSpellsToLearn(knownSpells).map(spell => makeSpellSecret(spell))

export const makeSecretsBatch = (amount: number, knownSpells: SpellView[]) => {
  const spellSecrets = makeSecretsFromSpellBook(knownSpells)
  return shuffleArray([...spellSecrets]).slice(0, amount)
}
