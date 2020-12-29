import { buildEpicObservables } from '../../../../tests/helpers'
import { raiseUndeadEpic } from '../epics'
import { raiseUndead } from '../../buildings/actions'
import { makeCatacombs } from '../../buildings/helpers'
import { spendResources } from '../../resources/actions'
import { ResourceType } from '../../../config/constants'
import { addUndead } from '../actions'
import { nextPhase } from '../../turn/actions'

describe('Undead epics', () => {
  it('should handle undead raising', () => {
    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(raiseUndeadEpic)

    const catacombs = makeCatacombs(1)
    stateInput$.next({
      ...state$.value,
      buildings: {
        ...state$.value.buildings,
        list: [catacombs],
      },
    })
    actionsInput$.next(raiseUndead(catacombs.undeadPool[0]))

    expect(actions).toEqual([
      spendResources({ [ResourceType.Souls]: catacombs.raiseUndeadSoulCost }),
      addUndead(catacombs.undeadPool[0]),
      nextPhase(),
    ])
  })
})
