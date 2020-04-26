import { createAction } from 'typesafe-actions'
import { Spell } from '../../config/constants'

export const discoverSpell = createAction('spells/DISCOVER')()

export const addSpell = createAction('spells/ADD', (spell: Spell) => ({ spell }))()

export const disableSoulStorm = createAction('spells/DISABLE_SOUL_STORM', (active: boolean) => ({ active }))()

export const castSpell = createAction('spells/CAST', (spell: Spell) => ({ spell }))()
