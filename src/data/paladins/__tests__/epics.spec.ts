import { buildEpicObservables } from '../../../../tests/helpers'
import { trapsEpic } from '../epics'
import { mainReducer } from '../../../store/mainReducer'
import { init } from '../../settings/actions'
import { createPaladinCard, createPaladinsAssault } from '../helpers'
import {
  EXTRA_CHAKRAM_DAMAGE,
  PaladinCategory,
  PaladinType,
  PUTRID_PITCH_EXTRA_DAMAGE,
  TrapType,
} from '../../../config/constants'
import {
  breakPaladinShield,
  doDamagesToPaladin,
  forwardDamages,
  setChangingPaladinCategories,
  triggerTrap,
} from '../actions'
import { createTrap } from '../traps'

describe('Paladins epics', () => {
  it('should break shields with impaler', () => {
    const { actionsInput$, actions, stateInput$, state$ } = buildEpicObservables(trapsEpic(true))

    const initialState = mainReducer(state$.value, init())
    const paladin = createPaladinCard(PaladinType.Dreadnought)
    const impaler = createTrap(TrapType.Impaler)
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
    actionsInput$.next(triggerTrap(impaler, paladin.id))

    expect(actions).toEqual([
      breakPaladinShield(paladin.id),
      doDamagesToPaladin(paladin.id, impaler.damages, impaler.targetsCategories),
    ])
  })

  it('should throw a second chakram with forwarding damages', () => {
    const { actionsInput$, actions, stateInput$, state$ } = buildEpicObservables(trapsEpic(true))

    const initialState = mainReducer(state$.value, init())
    const paladin1 = { ...createPaladinCard(PaladinType.Dreadnought), categories: [PaladinCategory.Ethereal] }
    const paladin2 = createPaladinCard(PaladinType.Healer)
    const chakrams = createTrap(TrapType.Chakrams)
    stateInput$.next({
      ...initialState,
      paladins: {
        ...initialState.paladins,
        assault: {
          ...createPaladinsAssault(5, 10),
          deck: [paladin1, paladin2],
        },
      },
    })
    actionsInput$.next(triggerTrap(chakrams, paladin1.id))

    expect(actions).toEqual([
      doDamagesToPaladin(paladin1.id, chakrams.damages, chakrams.targetsCategories),
      forwardDamages(EXTRA_CHAKRAM_DAMAGE, Object.values(PaladinCategory)),
    ])
  })

  it('should trigger category change when using profaner', () => {
    const { actionsInput$, actions, stateInput$, state$ } = buildEpicObservables(trapsEpic(true))

    const initialState = mainReducer(state$.value, init())
    const paladin = createPaladinCard(PaladinType.Dreadnought)
    const profaner = createTrap(TrapType.Profaner)
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
    actionsInput$.next(triggerTrap(profaner, paladin.id))

    expect(actions).toEqual([setChangingPaladinCategories()])
  })

  it('should do more damages with putrid pitch on buffed paladin', () => {
    const { actionsInput$, actions, stateInput$, state$ } = buildEpicObservables(trapsEpic(true))

    const initialState = mainReducer(state$.value, init())
    const paladin = { ...createPaladinCard(PaladinType.Dreadnought), buffed: true }
    const putridPitch = createTrap(TrapType.PutridPitch)
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
    actionsInput$.next(triggerTrap(putridPitch, paladin.id))

    expect(actions).toEqual([
      doDamagesToPaladin(paladin.id, putridPitch.damages + PUTRID_PITCH_EXTRA_DAMAGE, putridPitch.targetsCategories),
    ])
  })

  it('should not do more damages with putrid pitch on regular paladin', () => {
    const { actionsInput$, actions, stateInput$, state$ } = buildEpicObservables(trapsEpic(true))

    const initialState = mainReducer(state$.value, init())
    const paladin = createPaladinCard(PaladinType.Dreadnought)
    const putridPitch = createTrap(TrapType.PutridPitch)
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
    actionsInput$.next(triggerTrap(putridPitch, paladin.id))

    expect(actions).toEqual([doDamagesToPaladin(paladin.id, putridPitch.damages, putridPitch.targetsCategories)])
  })
})
