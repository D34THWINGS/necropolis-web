import { buildings, BuildingsState } from '../reducer'
import { isCatacombs, makeArsenal, makeCatacombs, makeOssuary } from '../helpers'
import { collapseBuilding, repairBuilding, upgradeBuilding } from '../actions'
import { makeBloodPrince } from '../../undeads/helpers'
import { UndeadTalent } from '../../../config/constants'

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

  it('should increase undead pool major talents on level 3 catacomb upgrade', () => {
    const bloodPrince = makeBloodPrince()
    const state = buildings(
      { ...initialState, list: [makeCatacombs()] },
      upgradeBuilding(makeCatacombs(2, [bloodPrince])),
    )

    const catacombs = state.list.find(isCatacombs)
    expect(catacombs?.undeadPool).toEqual([
      {
        ...bloodPrince,
        talents: [
          [UndeadTalent.Necromancy, 4],
          [UndeadTalent.Subjugation, 1],
        ],
      },
    ])
  })
})
