import { createAction } from 'typesafe-actions'
import { Spell } from '../../config/constants'

export const discoverSpell = createAction('spells/DISCOVER')()

export const addSpell = createAction('spells/ADD', (spell: Spell) => ({ spell }))<{ spell: Spell }>()
