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
import { getBattlements } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import { BuildingType } from '../../config/constants'
import { getMaterials } from '../../data/resources/selectors'
import {
  getBattlementsDefenseBonus,
  getBattlementsUpgradeDefenseBonus,
  getBuildingMaxLevel,
  getBuildingUpgradeCost,
} from '../../data/buildings/helpers'

export const Battlements = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getBattlements)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const upgradeCost = getBuildingUpgradeCost(BuildingType.Battlements, level + 1)
  const maxLevel = getBuildingMaxLevel(BuildingType.Battlements)
  const defenseBonus = getBattlementsDefenseBonus(level)
  const upgradeDefenseBonus = getBattlementsUpgradeDefenseBonus(level)

  const handleUpgrade = () => dispatch(upgradeBuilding(BuildingType.Battlements, level + 1))

  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('battlements')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('battlementDescription', defenseBonus)}</p>}
        {level < maxLevel && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>{t('battlementUpgrade', upgradeDefenseBonus)}</span>
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
