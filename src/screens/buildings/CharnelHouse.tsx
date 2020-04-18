/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { buildingLevel, buildingTitle, buildingWrapper } from './helpers/buildingsStyles'
import { getCharnelHouse } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import { BuildingType } from '../../config/constants'
import { getMaterials } from '../../data/resources/selectors'
import {
  getBuildingMaxLevel,
  getBuildingUpgradeCost,
  getCharnelHouseBonesProduction,
  getCharnelHouseMeatProduction,
  getCharnelHouseProductionTurns,
} from '../../data/buildings/helpers'
import { BuildingUpgrade } from './components/BuildingUpgrade'

export const CharnelHouse = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getCharnelHouse)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const maxLevel = getBuildingMaxLevel(BuildingType.CharnelHouse)
  const upgradeCost = getBuildingUpgradeCost(BuildingType.CharnelHouse, level + 1)
  const meatProduction = getCharnelHouseMeatProduction(level)
  const bonesProduction = getCharnelHouseBonesProduction(level)
  const productionTurns = getCharnelHouseProductionTurns(level)
  const upgradeMeatProduction = getCharnelHouseMeatProduction(level + 1)
  const upgradeBonesProduction = getCharnelHouseBonesProduction(level + 1)
  const upgradeProductionTurns = getCharnelHouseProductionTurns(level + 1)

  const handleUpgrade = () => dispatch(upgradeBuilding(BuildingType.CharnelHouse, level + 1))

  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('charnelHouse')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('charnelHouseDescription', meatProduction, bonesProduction, productionTurns)}</p>}
        {level < maxLevel && (
          <BuildingUpgrade
            level={level + 1}
            description={
              level === 0
                ? t('charnelHouseUnlock', upgradeMeatProduction)
                : t('charnelHouseUpgrade', upgradeBonesProduction, upgradeProductionTurns)
            }
            upgradeCost={upgradeCost}
            canUpgrade={upgradeCost > materials}
            onUpgrade={handleUpgrade}
          />
        )}
      </Panel>
    </div>
  )
}
