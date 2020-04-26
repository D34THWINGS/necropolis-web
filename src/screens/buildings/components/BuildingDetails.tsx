/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { ReactNode } from 'react'
import { buildingLevel, buildingTitle, buildingWrapper } from '../helpers/buildingsStyles'
import { Panel } from '../../../components/ui/Panel'
import { BuildingType } from '../../../config/constants'
import { BuildingAction } from './BuildingAction'
import { repairBuilding, upgradeBuilding } from '../../../data/buildings/actions'
import { getBuildingMaxLevel, getBuildingUpgradeCost } from '../../../data/buildings/helpers'
import { getBuildingLevel, getIsBuildingCollapsed } from '../../../data/buildings/selectors'
import { useTranslation } from '../../../lang/useTranslation'
import { getMaterials } from '../../../data/resources/selectors'

type BuildingDetailsProps = {
  type: BuildingType
  renderDescription: (level: number) => ReactNode
  renderUpgradeDescription: (level: number) => ReactNode
  renderSpecialAction?: (level: number, isCollapsed: boolean) => ReactNode
  onUpgrade?: (level: number) => void
}

export const BuildingDetails = ({
  type,
  renderSpecialAction,
  renderDescription,
  renderUpgradeDescription,
  onUpgrade,
}: BuildingDetailsProps) => {
  const { t } = useTranslation()
  const level = useSelector(getBuildingLevel(type))
  const isCollapsed = useSelector(getIsBuildingCollapsed(type))
  const maxLevel = getBuildingMaxLevel(type)
  const upgradeCost = getBuildingUpgradeCost(type, level + 1)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const handleUpgrade = () => {
    dispatch(upgradeBuilding(type, level + 1))
    if (onUpgrade) {
      onUpgrade(level + 1)
    }
  }
  const handleRepair = () => dispatch(repairBuilding(type))

  return (
    <div css={buildingWrapper}>
      {renderSpecialAction && renderSpecialAction(level, isCollapsed)}
      <Panel>
        <h2 css={buildingTitle}>{t(type)}</h2>
        <p css={buildingLevel}>{level === 0 ? t('buildingNotConstructed') : t('buildingLevel', level)}</p>
        {level > 0 && <p>{renderDescription(level)}</p>}
        {(level < maxLevel || isCollapsed) && (
          <BuildingAction
            level={level + 1}
            description={renderUpgradeDescription(level + 1)}
            upgradeCost={upgradeCost}
            canUpgrade={upgradeCost > materials}
            onUpgrade={handleUpgrade}
            isCollapsed={isCollapsed}
            onRepair={handleRepair}
          />
        )}
      </Panel>
    </div>
  )
}
