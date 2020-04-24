import { createAction } from 'typesafe-actions'
import { Spell } from '../../config/constants'

export const discoverSpell = createAction('spells/DISCOVER')()

export const addSpell = createAction('spells/ADD', (spell: Spell) => ({ spell }))<{ spell: Spell }>()

export const toggleSoulStorm = createAction('spells/TOGGLE_SOUL_STORM', (active: boolean) => ({ active }))()
