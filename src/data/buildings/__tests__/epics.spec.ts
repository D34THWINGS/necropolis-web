import {
  buySecretEpic,
  repairBuildingEpic,
  reRollSecretsEpic,
  reRollUndeadPoolEpic,
  upgradeBuildingEpic,
  upgradeBuildingWinEpic,
} from '../epics'
import { buildEpicObservables } from '../../../../tests/helpers'
import { makeCatacombs, makeOssuary, makeUpgradedBuilding } from '../helpers'
import { nextPhase, win } from '../../turn/actions'
import { buySecret, changeSecrets, changeUndeadPool, repairBuilding, upgradeBuilding } from '../actions'
import { makeSecretsBatch, makeSpellSecret } from '../secrets'
import { resetTestSeed, restoreDefaultSeeder, useTestSeed } from '../../seeder'
import { spendResources } from '../../resources/actions'
import { ResourceType, TurnPhase } from '../../../config/constants'
import { makeSoulStorm } from '../../spells/helpers'
import { learnSpell } from '../../spells/actions'
import { makeUndeadPool } from '../../undeads/helpers'

jest.mock('uuid')

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

  it('should re-roll secrets every X turns on event phase', () => {
    useTestSeed()

    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(reRollSecretsEpic)

    const ossuary = makeOssuary(1)
    stateInput$.next({
      ...state$.value,
      turn: {
        ...state$.value.turn,
        phase: TurnPhase.Production,
        currentTurn: ossuary.reRollSecretsEvery,
      },
      buildings: {
        ...state$.value.buildings,
        list: [ossuary],
      },
    })
    actionsInput$.next(nextPhase())

    resetTestSeed()
    expect(actions).toEqual([changeSecrets(makeSecretsBatch(ossuary.secretsAmount, []))])

    restoreDefaultSeeder()
  })

  it('should re-roll secrets when upgraded ossuary misses secrets', () => {
    useTestSeed()

    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(reRollSecretsEpic)

    const ossuary = makeOssuary(1)
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
    expect(actions).toEqual([changeSecrets(makeSecretsBatch(upgradedOssuary.secretsAmount, []))])

    restoreDefaultSeeder()
  })

  it('should re-roll undead pool every X turns on event phase', () => {
    useTestSeed()

    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(reRollUndeadPoolEpic)

    const catacombs = makeCatacombs(1)
    stateInput$.next({
      ...state$.value,
      turn: {
        ...state$.value.turn,
        phase: TurnPhase.Production,
        currentTurn: catacombs.reRollPoolEvery,
      },
      buildings: {
        ...state$.value.buildings,
        list: [catacombs],
      },
    })
    actionsInput$.next(nextPhase())

    resetTestSeed()
    expect(actions).toEqual([changeUndeadPool(makeUndeadPool(catacombs.undeadPoolSize, []))])

    restoreDefaultSeeder()
  })

  it('should re-roll undead pool when upgraded catacombs miss undeads', () => {
    useTestSeed()

    const { actionsInput$, state$, stateInput$, actions } = buildEpicObservables(reRollUndeadPoolEpic)

    const catacombs = makeCatacombs(1)
    const upgradedCatacombs = makeUpgradedBuilding(catacombs)
    stateInput$.next({
      ...state$.value,
      buildings: {
        ...state$.value.buildings,
        list: [upgradedCatacombs],
      },
    })
    actionsInput$.next(upgradeBuilding(catacombs))

    resetTestSeed()
    expect(actions).toEqual([changeUndeadPool(makeUndeadPool(upgradedCatacombs.undeadPoolSize, []))])

    restoreDefaultSeeder()
  })

  it('should handle spell secrets buying', () => {
    const { actionsInput$, actions } = buildEpicObservables(buySecretEpic)

    const soulStorm = makeSoulStorm()
    const soulStormSecret = makeSpellSecret(soulStorm)
    actionsInput$.next(buySecret(soulStormSecret))

    expect(actions).toEqual([
      spendResources({ [ResourceType.Bones]: soulStormSecret.bonesPrice }),
      learnSpell(soulStorm),
      nextPhase(),
    ])
  })
})
