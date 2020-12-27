import { buildings, BuildingsState } from '../reducer'
import { makeArsenal, makeCatacombs, makeOssuary } from '../helpers'
import { collapseBuilding, repairBuilding, upgradeBuilding } from '../actions'

describe('Buildings reducer', () => {
  const initialState: BuildingsState = {
    list: [makeOssuary(2), makeArsenal(1)],
  }

  it('should upgrade buildings', () => {
    const state = buildings(initialState, upgradeBuilding(initialState.list[0]))

    expect(state).toEqual({ list: [makeOssuary(3), makeArsenal(1)] })
  })

  it('should collapse buildings', () => {
    const state = buildings(initialState, collapseBuilding(initialState.list[1]))

    expect(state.list[1].collapsed).toEqual(true)
  })

  it('should repair buildings', () => {
    const state = buildings(
      {
        ...initialState,
        list: [makeOssuary(2), { ...makeArsenal(1), collapsed: true }],
      },
      repairBuilding(initialState.list[1]),
    )

    expect(state.list[1].collapsed).toEqual(false)
  })

  it('should do nothing when building is not found', () => {
    const state = buildings(initialState, upgradeBuilding(makeCatacombs(1)))

    expect(state).toEqual(initialState)
  })
})
