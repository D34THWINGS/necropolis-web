import { paladinsDamageEffectsMiddleware } from '../middleware'
import { changePaladinCategories, doDamagesToPaladin, swapPaladinPostions, triggerTrap } from '../actions'
import { createPaladinCard, createPaladinsAssault } from '../helpers'
import { PaladinCategory, PaladinType, TrapType } from '../../../config/constants'
import { mainReducer, RootState } from '../../../store/mainReducer'
import { init } from '../../settings/actions'
import { castSpell } from '../../spells/actions'
import { makePrediction, makeSoulStorm } from '../../spells/helpers'
import { restoreDefaultSeeder, useTestSeed } from '../../seeder'
import { nextPhase } from '../../turn/actions'
import { createTrap } from '../traps'

describe('Paladins middleware', () => {
  const setup = () => {
    const commander = createPaladinCard(PaladinType.Commander)
    const vanguard = createPaladinCard(PaladinType.Vanguard)
    const initialState = mainReducer(undefined, init())
    const state: RootState = {
      ...initialState,
      paladins: {
        ...initialState.paladins,
        assault: {
          ...createPaladinsAssault(3, 8),
          deck: [commander, vanguard],
        },
      },
    }
    const api = { dispatch: jest.fn(), getState: () => state }
    const next = jest.fn()
    return { api, next, commander, vanguard }
  }

  it('should swap commander on trap trigger and rewire trap target', () => {
    jest.useFakeTimers()
    const trap = createTrap(TrapType.Impaler)
    const { api, next, vanguard, commander } = setup()

    paladinsDamageEffectsMiddleware(api)(next)(triggerTrap(trap, commander.id))
    jest.runAllTimers()

    expect(api.dispatch).toHaveBeenCalledTimes(2)
    expect(api.dispatch).toHaveBeenCalledWith(swapPaladinPostions(commander.id, vanguard.id))
    expect(api.dispatch).toHaveBeenCalledWith(triggerTrap(trap, vanguard.id))
    expect(next).not.toHaveBeenCalled()
  })

  it('should swap commander on damaging spell cast', () => {
    jest.useFakeTimers()
    const { api, next, vanguard, commander } = setup()
    const action = castSpell(makeSoulStorm())

    paladinsDamageEffectsMiddleware(api)(next)(action)
    jest.runAllTimers()

    expect(api.dispatch).toHaveBeenCalledTimes(1)
    expect(api.dispatch).toHaveBeenCalledWith(swapPaladinPostions(commander.id, vanguard.id))
    expect(next).toHaveBeenCalledWith(action)
  })

  it('should do nothing if spell is not damaging', () => {
    jest.useFakeTimers()
    const { api, next } = setup()
    const action = castSpell(makePrediction())

    paladinsDamageEffectsMiddleware(api)(next)(action)
    jest.runAllTimers()

    expect(api.dispatch).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(action)
  })

  it('should swap pure categories on trigger trap', () => {
    useTestSeed()
    jest.useFakeTimers()
    const { api, next, vanguard } = setup()
    vanguard.categories = [PaladinCategory.Pure, PaladinCategory.Pure]
    const action = triggerTrap(createTrap(TrapType.Impaler), vanguard.id)

    paladinsDamageEffectsMiddleware(api)(next)(action)
    jest.runAllTimers()

    expect(api.dispatch).toHaveBeenCalledTimes(2)
    expect(api.dispatch).toHaveBeenCalledWith(
      changePaladinCategories(vanguard.id, [PaladinCategory.Magical, PaladinCategory.Ethereal]),
    )
    expect(api.dispatch).toHaveBeenCalledWith(action)
    expect(next).not.toHaveBeenCalled()
    restoreDefaultSeeder()
  })

  it('should swap pure categories on damages inflicted', () => {
    useTestSeed()
    jest.useFakeTimers()
    const { api, next, vanguard } = setup()
    vanguard.categories = [PaladinCategory.Pure, PaladinCategory.Pure]
    const action = doDamagesToPaladin(vanguard.id, 2, [])

    paladinsDamageEffectsMiddleware(api)(next)(action)
    jest.runAllTimers()

    expect(api.dispatch).toHaveBeenCalledTimes(2)
    expect(api.dispatch).toHaveBeenCalledWith(
      changePaladinCategories(vanguard.id, [PaladinCategory.Magical, PaladinCategory.Ethereal]),
    )
    expect(api.dispatch).toHaveBeenCalledWith(action)
    expect(next).not.toHaveBeenCalled()
    restoreDefaultSeeder()
  })

  it('should let action go through otherwise', () => {
    jest.useFakeTimers()
    const { api, next } = setup()
    const action = nextPhase()

    paladinsDamageEffectsMiddleware(api)(next)(action)
    jest.runAllTimers()

    expect(api.dispatch).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(action)
  })
})
