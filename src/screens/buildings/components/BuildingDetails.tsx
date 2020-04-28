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
import { ScreenWrapper } from '../../../components/ui/ScreenWrapper'
import charnelHouseBgUrl from '../../../assets/images/buildings/charnel-house-bg.jpg'

type BuildingDetailsProps = {
  type: BuildingType
  renderDescription: (level: number) => ReactNode
  renderUpgradeDescription: (level: number) => ReactNode
  renderSpecialAction?: (level: number, isCollapsed: boolean) => ReactNode
}

export const BuildingDetails = ({
  type,
  renderSpecialAction,
  renderDescription,
  renderUpgradeDescription,
}: BuildingDetailsProps) => {
  const { t } = useTranslation()
  const level = useSelector(getBuildingLevel(type))
  const isCollapsed = useSelector(getIsBuildingCollapsed(type))
  const maxLevel = getBuildingMaxLevel(type)
  const upgradeCost = getBuildingUpgradeCost(type, level + 1)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const handleUpgrade = () => dispatch(upgradeBuilding(type))
  const handleRepair = () => dispatch(repairBuilding(type))

  return (
    <ScreenWrapper css={buildingWrapper} backgroundUrl={charnelHouseBgUrl}>
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
    </ScreenWrapper>
  )
}
