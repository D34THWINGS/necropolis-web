/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import {
  buildingLevel,
  buildingResourceCost,
  buildingTitle,
  buildingUpgradeArrow,
  buildingUpgradeButton,
  buildingUpgradeContainer,
  buildingUpgradeFrame,
  buildingWrapper,
} from './helpers/buildingsStyles'
import resourcesIconUrl from '../../assets/images/resources/resources.png'
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
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>
                {level === 0
                  ? t('charnelHouseUnlock', upgradeMeatProduction)
                  : t('charnelHouseUpgrade', upgradeBonesProduction, upgradeProductionTurns)}
              </span>
            </div>
            <button
              type="button"
              disabled={upgradeCost > materials}
              css={buildingUpgradeButton}
              onClick={handleUpgrade}
            >
              <img css={buildingResourceCost} src={resourcesIconUrl} alt="" />
              <span>{upgradeCost}</span>
            </button>
          </div>
        )}
      </Panel>
    </div>
  )
}
