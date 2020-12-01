import { createAction } from 'typesafe-actions'
import { SpellView } from './helpers'

export const disableSoulStorm = createAction('spells/DISABLE_SOUL_STORM', (active: boolean) => ({ active }))()

export const castSpell = createAction('spells/CAST', (spell: SpellView) => ({ spell }))()
