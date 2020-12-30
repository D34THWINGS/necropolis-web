import { paladins, PaladinState } from '../reducer'
import { createDeck, createPaladinCard, createPaladinsAssault } from '../helpers'
import { changeAssaultPhase, markPaladinsRevealed } from '../actions'
import { PaladinsAssaultPhase, PaladinType } from '../../../config/constants'

describe('Paladins reducer', () => {
  const assault = createPaladinsAssault(10, 5)
  const initialState: PaladinState = {
    assault,
    calledToArms: 3,
    counter: 3,
    strength: 1,
    structureHealth: 5,
  }

  it('it should mark paladins as revealed', () => {
    const state = paladins(initialState, markPaladinsRevealed([assault.deck[1].id]))

    expect(state.assault?.deck[0].revealed).toEqual(true)
    expect(state.assault?.deck[1].revealed).toEqual(true)
    expect(state.assault?.deck[2].revealed).toEqual(false)
  })

  it('should shuffle deck on phase change', () => {
    const state = paladins(initialState, changeAssaultPhase(PaladinsAssaultPhase.Preparing))

    expect(state.assault?.deck).not.toEqual(initialState.assault?.deck)
  })

  it('should put commander first on phase change', () => {
    const state = paladins(
      {
        ...initialState,
        assault: { ...assault, deck: [...createDeck(4), createPaladinCard(PaladinType.Commander), ...createDeck(3)] },
      },
      changeAssaultPhase(PaladinsAssaultPhase.Preparing),
    )

    expect(state.assault?.deck[0].type).toEqual(PaladinType.Commander)
  })
})
