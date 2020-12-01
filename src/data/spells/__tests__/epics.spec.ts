import { castRestorationEpic, castSpellEpic } from '../epics'
import { castSpell } from '../actions'
import { restoration, theKey } from '../helpers'
import { spendResources } from '../../resources/actions'
import { ExpeditionType, ResourceType, UndeadType } from '../../../config/constants'
import { buildEpicObservables } from '../../../../tests/helpers'
import { addUndead, healUndead } from '../../undeads/actions'
import { applyDamages, createUndead } from '../../undeads/helpers'
import { mainReducer } from '../../../store/mainReducer'
import { openExpedition } from '../../expeditions/actions'
import { beginPaladinsAssault, repairStructure } from '../../paladins/actions'

describe('Spells epics', () => {
  it('should spend souls equal to spell cost when casting', () => {
    const { actionsInput$, actions } = buildEpicObservables(castSpellEpic)

    actionsInput$.next(castSpell(theKey))

    expect(actions).toEqual([spendResources({ [ResourceType.Souls]: theKey.cost })])
  })

  it('should heal one undead when casting restoration while in expedition', () => {
    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castRestorationEpic)

    const undead1 = createUndead(UndeadType.Skeleton)
    undead1.health = applyDamages(undead1.health, 1)
    stateInput$.next(mainReducer(state$.value, addUndead(undead1)))
    const undead2 = createUndead(UndeadType.Skeleton)
    stateInput$.next(mainReducer(state$.value, addUndead(undead2)))
    stateInput$.next(mainReducer(state$.value, openExpedition(ExpeditionType.OldCoffin)))
    actionsInput$.next(castSpell(restoration))

    expect(actions).toEqual([healUndead(undead1.id, restoration.healthRestored ?? 0)])
  })

  it('should repair structure when casting restoration while in assault', () => {
    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castRestorationEpic)

    stateInput$.next(mainReducer(state$.value, beginPaladinsAssault()))
    actionsInput$.next(castSpell(restoration))

    expect(actions).toEqual([repairStructure(restoration.structureRepairAmount ?? 0)])
  })

  it('should do nothing when casting restoration on main hub', () => {
    const { actionsInput$, actions } = buildEpicObservables(castRestorationEpic)

    actionsInput$.next(castSpell(restoration))

    expect(actions).toEqual([])
  })
})
