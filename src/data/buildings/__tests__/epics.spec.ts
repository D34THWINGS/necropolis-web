import {
  repairBuildingEpic,
  reRollSecretsEpic,
  upgradeBuildingEpic,
  upgradeBuildingWinEpic,
  upgradeOssuaryEpic,
} from '../epics'
import { buildEpicObservables } from '../../../../tests/helpers'
import { makeOssuary, makeUpgradedBuilding } from '../helpers'
import { nextPhase, nextTurn, win } from '../../turn/actions'
import { changeSecrets, repairBuilding, upgradeBuilding } from '../actions'
import { makeSecretsBatch } from '../secrets'
import { resetTestSeed, restoreDefaultSeeder, useTestSeed } from '../../seeder'
import { spendResources } from '../../resources/actions'
import { ResourceType } from '../../../config/constants'

describe('Buildings epics', () => {
  it('should trigger game win when all buildings are fully upgraded', () => {
    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(upgradeBuildingWinEpic)

    const level0Ossuary = makeOssuary()
    const fullyUpgradedOssuary = makeOssuary(level0Ossuary.maxLevel)
    stateInput$.next({
      ...state$.value,
      buildings: {
        ...state$.value.buildings,
        list: [fullyUpgradedOssuary],
      },
    })
    actionsInput$.next(upgradeBuilding(fullyUpgradedOssuary))

    expect(actions).toEqual([win()])
  })

  it('should fill missing secrets when upgrading ossuary', () => {
    useTestSeed()

    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(upgradeOssuaryEpic)

    const ossuary = makeOssuary()
    const upgradedOssuary = makeUpgradedBuilding(ossuary)
    stateInput$.next({
      ...state$.value,
      buildings: {
        ...state$.value.buildings,
        list: [upgradedOssuary],
      },
    })
    actionsInput$.next(upgradeBuilding(ossuary))

    resetTestSeed()
    expect(actions).toEqual([changeSecrets(upgradedOssuary, makeSecretsBatch(2, []))])

    restoreDefaultSeeder()
  })

  it('should spend resources and trigger next phase when upgrading buildings', () => {
    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(upgradeBuildingEpic)

    const ossuary = makeOssuary()
    stateInput$.next({
      ...state$.value,
      buildings: {
        ...state$.value.buildings,
        list: [ossuary],
      },
      resources: {
        ...state$.value.resources,
        [ResourceType.Materials]: 10,
      },
    })
    actionsInput$.next(upgradeBuilding(ossuary))

    expect(actions).toEqual([spendResources({ [ResourceType.Materials]: 1 }), nextPhase()])
  })

  it('should trigger next phase when repairing building', () => {
    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(repairBuildingEpic)

    const ossuary = { ...makeOssuary(), collapsed: true }
    stateInput$.next({
      ...state$.value,
      buildings: {
        ...state$.value.buildings,
        list: [ossuary],
      },
    })
    actionsInput$.next(repairBuilding(ossuary))

    expect(actions).toEqual([nextPhase()])
  })

  it('should re-roll secrets every X turns', () => {
    useTestSeed()

    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(reRollSecretsEpic)

    const ossuary = makeOssuary(1)
    stateInput$.next({
      ...state$.value,
      turn: {
        ...state$.value.turn,
        currentTurn: ossuary.reRollSecretsEvery,
      },
      buildings: {
        ...state$.value.buildings,
        list: [ossuary],
      },
    })
    actionsInput$.next(nextTurn())

    resetTestSeed()
    expect(actions).toEqual([changeSecrets(ossuary, makeSecretsBatch(ossuary.secretsAmount, []))])

    restoreDefaultSeeder()
  })
})
