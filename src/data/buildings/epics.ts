import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, mergeMap, mapTo, map } from 'rxjs/operators'
import { buySecret, changeSecrets, freeUpgradeBuilding, repairBuilding, upgradeBuilding } from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType, TurnPhase } from '../../config/constants'
import { nextPhase, win } from '../turn/actions'
import { getAreAllBuildingsFullyUpgraded, getOssuary } from './selectors'
import { isBuildingConstructed, isCatacombs, isOssuary, makeUpgradedBuilding } from './helpers'
import { makeSecretsBatch } from './secrets'
import { getLearntSpells } from '../spells/selectors'
import { isDefined, NecropolisEpic } from '../helpers'
import { getCurrentPhase, getTurn } from '../turn/selectors'
import { learnSpell } from '../spells/actions'
import { permanentlyIncreaseMajorTalents } from '../undeads/actions'

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

export const upgradeOssuaryEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([upgradeBuilding, freeUpgradeBuilding])),
    map(({ payload: { building } }) => building),
    filter(isOssuary),
    map(() => getOssuary(state$.value)),
    mergeMap(ossuary => {
      if (ossuary && ossuary.secrets.length !== ossuary.secretsAmount) {
        return of(changeSecrets(makeSecretsBatch(ossuary.secretsAmount, getLearntSpells(state$.value))))
      }
      return EMPTY
    }),
  )

export const upgradeCatacombsEpic: NecropolisEpic = action$ =>
  action$.pipe(
    filter(isActionOf(upgradeBuilding)),
    map(({ payload: { building } }) => building),
    filter(isCatacombs),
    filter(catacombs => catacombs.level === 2),
    map(catacombs => permanentlyIncreaseMajorTalents(makeUpgradedBuilding(catacombs).fortifyBonus)),
  )

export const repairBuildingEpic: NecropolisEpic = action$ =>
  action$.pipe(filter(isActionOf(repairBuilding)), mapTo(nextPhase()))

export const reRollSecretsEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(() => getCurrentPhase(state$.value) === TurnPhase.Production),
    map(() => getOssuary(state$.value)),
    filter(isDefined),
    filter(ossuary => isBuildingConstructed(ossuary) && getTurn(state$.value) % ossuary.reRollSecretsEvery === 0),
    map(ossuary => changeSecrets(makeSecretsBatch(ossuary.secretsAmount, getLearntSpells(state$.value)))),
  )

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
