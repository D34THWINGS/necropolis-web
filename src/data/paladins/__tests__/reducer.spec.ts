import { paladins, PaladinState } from '../reducer'
import { createPaladinsAssault } from '../helpers'
import { markPaladinsRevealed } from '../actions'

describe('Paladins reducer', () => {
  const assault = createPaladinsAssault(3, 5)
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
  })
})
