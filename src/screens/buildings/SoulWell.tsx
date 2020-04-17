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
import { getSoulWell } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import { BuildingType } from '../../config/constants'
import { getMaterials } from '../../data/resources/selectors'
import { getBuildingMaxLevel, getBuildingUpgradeCost, getSoulWellSoulProduction } from '../../data/buildings/helpers'

export const SoulWell = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getSoulWell)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const maxLevel = getBuildingMaxLevel(BuildingType.SoulWell)
  const upgradeCost = getBuildingUpgradeCost(BuildingType.SoulWell, level + 1)
  const soulProduction = getSoulWellSoulProduction(level)
  const upgradeSoulProduction = getSoulWellSoulProduction(level + 1)

  const handleUpgrade = () => dispatch(upgradeBuilding(BuildingType.SoulWell, level + 1))

  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('soulWell')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('soulWellDescription', soulProduction)}</p>}
        {level < maxLevel && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>
                {(() => {
                  switch (level) {
                    case 0:
                      return t('soulWellUnlock', upgradeSoulProduction)
                    case 1:
                      return t('soulWellUpgradeStorm')
                    default:
                      return t('soulWellUpgrade', upgradeSoulProduction)
                  }
                })()}
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
