import { buildEpicObservables } from '../../../../tests/helpers'
import { ExpeditionType, PaladinType, ResourceType, UndeadType } from '../../../config/constants'
import { mainReducer } from '../../../store/mainReducer'
import { openExpedition } from '../../expeditions/actions'
import { beginPaladinsAssault, damageActivePaladin, repairStructure } from '../../paladins/actions'
import { spendResources } from '../../resources/actions'
import { addUndead, healUndead } from '../../undeads/actions'
import { applyDamages, createUndead } from '../../undeads/helpers'
import { castSpell, disableSoulStorm } from '../actions'
import { castRestorationEpic, castSoulStormEpic, castSpellEpic } from '../epics'
import { restoration, soulStorm, theKey } from '../helpers'
import { init } from '../../settings/actions'
import { createPaladinCard, createPaladinsAssault } from '../../paladins/helpers'

describe('Spells epics', () => {
  it('should spend souls equal to spell cost when casting', () => {
    const { actionsInput$, actions } = buildEpicObservables(castSpellEpic)

    actionsInput$.next(castSpell(theKey))

    expect(actions).toEqual([spendResources({ [ResourceType.Souls]: theKey.cost })])
  })

  describe('SoulStorm', () => {
    it('Active soul storm bonus during expedition', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castSoulStormEpic)

      stateInput$.next(mainReducer(state$.value, openExpedition(ExpeditionType.OldCoffin)))
      actionsInput$.next(castSpell(soulStorm))

      expect(actions).toEqual([disableSoulStorm(true)])
    })

    it('Active soul storm bonus during expedition', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castSoulStormEpic)

      const initialState = mainReducer(state$.value, init())
      stateInput$.next({
        ...initialState,
        paladins: {
          ...initialState.paladins,
          assault: {
            ...createPaladinsAssault(5, 10),
            deck: [createPaladinCard(PaladinType.Healer), createPaladinCard(PaladinType.Healer)],
          },
        },
      })
      actionsInput$.next(castSpell(soulStorm))

      expect(actions).toEqual([
        damageActivePaladin(2 ?? 0, soulStorm.targetCategories ?? []),
        damageActivePaladin(2 ?? 0, soulStorm.targetCategories ?? []),
      ])
    })
  })

  describe('Restoration', () => {
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
})
