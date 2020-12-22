import { buildEpicObservables } from '../../../../tests/helpers'
import { ExpeditionType, PaladinType, ResourceType, UndeadType } from '../../../config/constants'
import { mainReducer } from '../../../store/mainReducer'
import { openExpedition, setExpeditionStep } from '../../expeditions/actions'
import {
  beginPaladinsAssault,
  breakPaladinShield,
  damageActivePaladin,
  doDamagesToPaladin,
  markPaladinsRevealed,
  repairStructure,
} from '../../paladins/actions'
import { spendResources } from '../../resources/actions'
import { addUndead, healUndead } from '../../undeads/actions'
import { applyDamages, createUndead } from '../../undeads/helpers'
import { applyEffects, blurEffects, castSpell } from '../actions'
import {
  blurEffectsEpic,
  castPredictionEpic,
  castRestorationEpic,
  castSoulStormEpic,
  castSpellEpic,
  castTheKeyEpic,
} from '../epics'
import { init } from '../../settings/actions'
import { createPaladinCard, createPaladinsAssault } from '../../paladins/helpers'
import { makePrediction, makeRestoration, makeSoulStorm, makeTheKey } from '../helpers'
import { makeLethalityBuffEffect } from '../effects'

describe('Spells epics', () => {
  it('should spend souls equal to spell cost when casting', () => {
    const { actionsInput$, actions } = buildEpicObservables(castSpellEpic)

    const theKey = makeTheKey()
    actionsInput$.next(castSpell(theKey))

    expect(actions).toEqual([spendResources({ [ResourceType.Souls]: theKey.cost })])
  })

  describe('SoulStorm', () => {
    it('Active soul storm bonus during expedition', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castSoulStormEpic)

      const soulStorm = makeSoulStorm()
      stateInput$.next(mainReducer(state$.value, openExpedition(ExpeditionType.OldCoffin)))
      actionsInput$.next(castSpell(soulStorm))

      expect(actions).toEqual([applyEffects(soulStorm.effects)])
    })

    it('Active soul storm bonus during expedition', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castSoulStormEpic)

      const soulStorm = makeSoulStorm()
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
        damageActivePaladin(2, soulStorm.targetCategories),
        damageActivePaladin(2, soulStorm.targetCategories),
      ])
    })
  })

  describe('Restoration', () => {
    it('should heal one undead when casting restoration while in expedition', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castRestorationEpic)

      const restoration = makeRestoration()
      const undead1 = createUndead(UndeadType.Skeleton)
      undead1.health = applyDamages(undead1.health, 1)
      stateInput$.next(mainReducer(state$.value, addUndead(undead1)))
      const undead2 = createUndead(UndeadType.Skeleton)
      stateInput$.next(mainReducer(state$.value, addUndead(undead2)))
      stateInput$.next(mainReducer(state$.value, openExpedition(ExpeditionType.OldCoffin)))
      actionsInput$.next(castSpell(restoration))

      expect(actions).toEqual([healUndead(undead1.id, restoration.healthRestored)])
    })

    it('should repair structure when casting restoration while in assault', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castRestorationEpic)

      const restoration = makeRestoration()
      stateInput$.next(mainReducer(state$.value, beginPaladinsAssault()))
      actionsInput$.next(castSpell(restoration))

      expect(actions).toEqual([repairStructure(restoration.structureRepairAmount)])
    })

    it('should do nothing when casting restoration on main hub', () => {
      const { actionsInput$, actions } = buildEpicObservables(castRestorationEpic)

      actionsInput$.next(castSpell(makeRestoration()))

      expect(actions).toEqual([])
    })
  })

  describe('The Key', () => {
    it('should break shield and damage paladin while in assault', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castTheKeyEpic)

      const paladin = createPaladinCard(PaladinType.Vanguard)
      const theKey = makeTheKey()
      const initialState = mainReducer(state$.value, init())
      stateInput$.next({
        ...initialState,
        paladins: {
          ...initialState.paladins,
          assault: {
            ...createPaladinsAssault(5, 10),
            deck: [paladin],
          },
        },
      })
      actionsInput$.next(castSpell(theKey))

      expect(actions).toEqual([
        breakPaladinShield(paladin.id),
        doDamagesToPaladin(paladin.id, theKey.damages, theKey.targetCategories),
      ])
    })
  })

  describe('Prediction', () => {
    it('should reveal first 3 unrevealed paladins during assaults', () => {
      const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(castPredictionEpic)

      const assault = createPaladinsAssault(5, 10)
      const prediction = makePrediction()
      const initialState = mainReducer(state$.value, init())
      stateInput$.next({ ...initialState, paladins: { ...initialState.paladins, assault } })
      actionsInput$.next(castSpell(prediction))

      expect(actions).toEqual([
        markPaladinsRevealed(assault.deck.slice(1, 1 + prediction.revealBonus).map(paladin => paladin.id)),
      ])
    })
  })

  describe('Effects blurring', () => {
    it('should blur effects on expedition step change', () => {
      const { actionsInput$, actions, stateInput$, state$ } = buildEpicObservables(blurEffectsEpic)

      const effects = [makeLethalityBuffEffect(8)]
      stateInput$.next(mainReducer(state$.value, applyEffects(effects)))
      actionsInput$.next(setExpeditionStep(ExpeditionType.Bastion, 8))

      expect(actions).toEqual([blurEffects(effects)])
    })

    it('should do nothing when no effects to blur', () => {
      const { actionsInput$, actions } = buildEpicObservables(blurEffectsEpic)

      actionsInput$.next(setExpeditionStep(ExpeditionType.Bastion, 8))

      expect(actions).toEqual([])
    })
  })
})
