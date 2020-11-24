import { createAction } from 'typesafe-actions'
import { SpellView } from '../../config/constants/spellConstants'

export const disableSoulStorm = createAction('spells/DISABLE_SOUL_STORM', (active: boolean) => ({ active }))()

export const castSpell = createAction('spells/CAST', (spell: SpellView) => ({ spell }))()
