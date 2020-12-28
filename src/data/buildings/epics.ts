import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, mergeMap, mapTo, map } from 'rxjs/operators'
import { buySecret, changeSecrets, freeUpgradeBuilding, repairBuilding, upgradeBuilding } from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType, TurnPhase } from '../../config/constants'
import { nextPhase, win } from '../turn/actions'
import { getAreAllBuildingsFullyUpgraded, getOssuary } from './selectors'
import { isBuildingConstructed, isOssuary } from './helpers'
import { makeSecretsBatch } from './secrets'
import { getLearntSpells } from '../spells/selectors'
import { isDefined, NecropolisEpic } from '../helpers'
import { getCurrentPhase, getTurn } from '../turn/selectors'
import { learnSpell } from '../spells/actions'

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
        return of(
          changeSecrets(ossuary, [
            ...ossuary.secrets,
            ...makeSecretsBatch(ossuary.secretsAmount, getLearntSpells(state$.value)),
          ]),
        )
      }
      return EMPTY
    }),
  )

export const repairBuildingEpic: NecropolisEpic = action$ =>
  action$.pipe(filter(isActionOf(repairBuilding)), mapTo(nextPhase()))

export const reRollSecretsEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(() => getCurrentPhase(state$.value) === TurnPhase.Event),
    map(() => getOssuary(state$.value)),
    filter(isDefined),
    filter(ossuary => isBuildingConstructed(ossuary) && getTurn(state$.value) % ossuary.reRollSecretsEvery === 0),
    map(ossuary => changeSecrets(ossuary, makeSecretsBatch(ossuary.secretsAmount, getLearntSpells(state$.value)))),
  )

export const buySecretEpic: NecropolisEpic = action$ =>
  action$.pipe(
    filter(isActionOf(buySecret)),
    mergeMap(({ payload: { secret } }) =>
      of(spendResources({ [ResourceType.Bones]: secret.bonesPrice }), learnSpell(secret.spell), nextPhase()),
    ),
  )
