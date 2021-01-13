import { ActionType, isActionOf } from 'typesafe-actions'
import { EMPTY, merge, of } from 'rxjs'
import { filter, mergeMap, mapTo, map } from 'rxjs/operators'
import {
  buySecret,
  changeSecrets,
  changeUndeadPool,
  freeUpgradeBuilding,
  repairBuilding,
  upgradeBuilding,
} from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType, TurnPhase } from '../../config/constants'
import { nextPhase, win } from '../turn/actions'
import { getAreAllBuildingsFullyUpgraded, getCatacombs, getOssuary } from './selectors'
import { isBuildingConstructed, isCatacombs, isOssuary, makeUpgradedBuilding } from './helpers'
import { makeSecretsBatch } from './secrets'
import { getLearntSpells } from '../spells/selectors'
import { isDefined, NecropolisEpic } from '../helpers'
import { getCurrentPhase, getTurn } from '../turn/selectors'
import { learnSpell } from '../spells/actions'
import { permanentlyIncreaseMajorTalents } from '../undeads/actions'
import { makeUndeadPool } from '../undeads/helpers'
import { getUndeads } from '../undeads/selectors'

export const upgradeBuildingEpic: NecropolisEpic = action$ =>
  action$.pipe(
    filter(isActionOf(upgradeBuilding)),
    mergeMap(({ payload: { building } }) =>
      of(spendResources({ [ResourceType.Materials]: building.upgradeCost }), nextPhase()),
    ),
  )

export const upgradeBuildingWinEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([upgradeBuilding, freeUpgradeBuilding])),
    filter(() => getAreAllBuildingsFullyUpgraded(state$.value)),
    map(() => win()),
  )

const mapToBuilding = map(
  ({ payload: { building } }: ActionType<typeof upgradeBuilding | typeof freeUpgradeBuilding>) => building,
)

export const upgradeCatacombsEpic: NecropolisEpic = action$ =>
  action$.pipe(
    filter(isActionOf(upgradeBuilding)),
    mapToBuilding,
    filter(isCatacombs),
    filter(catacombs => catacombs.level === 2),
    map(catacombs => permanentlyIncreaseMajorTalents(makeUpgradedBuilding(catacombs).fortifyBonus)),
  )

export const reRollUndeadPoolEpic: NecropolisEpic = (action$, state$) =>
  merge(
    // Re-roll undead pool on first upgrade
    action$.pipe(
      filter(isActionOf(upgradeBuilding)),
      mapToBuilding,
      filter(isCatacombs),
      map(() => getCatacombs(state$.value)),
      filter(isDefined),
      filter(catacombs => catacombs.undeadPool.length !== catacombs.undeadPoolSize),
    ),
    // Re-roll undead pool every X turns
    action$.pipe(
      filter(isActionOf(nextPhase)),
      filter(() => getCurrentPhase(state$.value) === TurnPhase.Production),
      map(() => getCatacombs(state$.value)),
      filter(isDefined),
      filter(catacombs => isBuildingConstructed(catacombs) && getTurn(state$.value) % catacombs.reRollPoolEvery === 0),
    ),
  ).pipe(map(catacombs => changeUndeadPool(makeUndeadPool(catacombs.undeadPoolSize, getUndeads(state$.value)))))

export const repairBuildingEpic: NecropolisEpic = action$ =>
  action$.pipe(filter(isActionOf(repairBuilding)), mapTo(nextPhase()))

export const reRollSecretsEpic: NecropolisEpic = (action$, state$) =>
  merge(
    // Re-roll secrets every X turns
    action$.pipe(
      filter(isActionOf(nextPhase)),
      filter(() => getCurrentPhase(state$.value) === TurnPhase.Production),
      map(() => getOssuary(state$.value)),
      filter(isDefined),
      filter(ossuary => isBuildingConstructed(ossuary) && getTurn(state$.value) % ossuary.reRollSecretsEvery === 0),
    ),
    // Re-roll secrets when upgrading
    action$.pipe(
      filter(isActionOf([upgradeBuilding, freeUpgradeBuilding])),
      mapToBuilding,
      filter(isOssuary),
      map(() => getOssuary(state$.value)),
      filter(isDefined),
      filter(ossuary => ossuary.secrets.length !== ossuary.secretsAmount),
    ),
  ).pipe(map(ossuary => changeSecrets(makeSecretsBatch(ossuary.secretsAmount, getLearntSpells(state$.value)))))

export const buySecretEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(buySecret)),
    mergeMap(({ payload: { secret } }) => {
      const ossuary = getOssuary(state$.value)
      if (!ossuary) {
        return EMPTY
      }
      return of(
        spendResources({ [ResourceType.Bones]: secret.bonesPrice * ossuary.bonesCostMultiplier }),
        learnSpell(secret.spell),
        nextPhase(),
      )
    }),
  )
