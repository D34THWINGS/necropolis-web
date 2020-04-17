/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Building } from './Building'
import { useTranslation } from '../../lang/useTranslation'
import { BATTLEMENTS, CATACOMBS, CHARNEL_HOUSE, OSSUARY, SOUL_WELL } from '../../config/routes'
import { getBuildings } from '../../data/buildings/selectors'
import { BuildingType } from '../../config/constants'
import {
  getBattlementsDefenseBonus,
  getBuildingMaxLevel,
  getCharnelHouseBonesProduction,
  getCharnelHouseMeatProduction,
  getCharnelHouseProductionTurns,
  getMaxUndeadRaising,
  getOssuaryBonesCost,
  getRaiseUndeadSoulCost,
  getSoulWellSoulProduction,
} from '../../data/buildings/helpers'
import { getRaisedUndeadCount } from '../../data/undeads/selectors'

const buildWrapper = css({
  padding: '0 1rem',
})

export const Build = () => {
  const { t } = useTranslation()
  const buildings = useSelector(getBuildings)
  const raisedUndead = useSelector(getRaisedUndeadCount)

  return (
    <div css={buildWrapper}>
      <Building
        name={t('charnelHouse')}
        level={buildings.charnelHouse.level}
        maxLevel={getBuildingMaxLevel(BuildingType.CharnelHouse)}
        description={t(
          'charnelHouseDescription',
          getCharnelHouseMeatProduction(buildings.charnelHouse.level || 1),
          getCharnelHouseBonesProduction(buildings.charnelHouse.level || 1),
          getCharnelHouseProductionTurns(buildings.charnelHouse.level || 1),
        )}
        route={CHARNEL_HOUSE}
      />
      <Building
        name={t('catacomb')}
        level={buildings.catacombs.level}
        maxLevel={getBuildingMaxLevel(BuildingType.Catacombs)}
        description={t(
          'catacombDescription',
          raisedUndead,
          getMaxUndeadRaising(buildings.catacombs.level || 1),
          getRaiseUndeadSoulCost(buildings.catacombs.level || 1),
        )}
        route={CATACOMBS}
      />
      <Building
        name={t('soulWell')}
        level={buildings.soulWell.level}
        maxLevel={getBuildingMaxLevel(BuildingType.SoulWell)}
        description={t('soulWellDescription', getSoulWellSoulProduction(buildings.soulWell.level || 1))}
        route={SOUL_WELL}
      />
      <Building
        name={t('ossuary')}
        level={buildings.ossuary.level}
        maxLevel={getBuildingMaxLevel(BuildingType.Ossuary)}
        description={t('ossuaryDescription', getOssuaryBonesCost(buildings.ossuary.level || 1))}
        route={OSSUARY}
      />
      <Building
        name={t('battlements')}
        level={buildings.battlements.level}
        maxLevel={getBuildingMaxLevel(BuildingType.Battlements)}
        description={t('battlementDescription', getBattlementsDefenseBonus(buildings.battlements.level || 1))}
        route={BATTLEMENTS}
      />
    </div>
  )
}
