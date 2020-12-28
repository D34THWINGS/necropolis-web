import { useDispatch, useSelector } from 'react-redux'
import React, { ReactNode } from 'react'
import { buildingActionFrame, buildingLevel, buildingTitle, buildingWrapper } from '../helpers/buildingsStyles'
import { Panel } from '../../../components/ui/Panel'
import { ResourceType } from '../../../config/constants'
import { BuildingAction } from './BuildingAction'
import { repairBuilding, upgradeBuilding } from '../../../data/buildings/actions'
import { useTranslation } from '../../../lang/useTranslation'
import { getMaterials } from '../../../data/resources/selectors'
import { ScreenWrapper } from '../../../components/ui/ScreenWrapper'
import charnelHouseBgUrl from '../../../assets/images/buildings/charnel-house-bg.jpg'
import { Image } from '../../../components/images/Image'
import upgradeIconUrl from '../../../assets/images/icons/build.png'
import repairIconUrl from '../../../assets/images/icons/repair.png'
import { ResourceIcon } from '../../../components/resources/ResourceIcon'
import { smallMarginTop } from '../../../styles/base'
import { Building } from '../../../data/buildings/helpers'

type BuildingDetailsProps = {
  building: Building
  children?: (level: number) => ReactNode
  renderUpgradeDescription: (level: number) => ReactNode
  renderDescription?: (level: number, isCollapsed: boolean) => ReactNode
  renderSpecialAction?: (level: number, isCollapsed: boolean) => ReactNode
  backgroundUrl?: string
}

export const BuildingDetails = ({
  building,
  children,
  renderSpecialAction,
  renderDescription,
  renderUpgradeDescription,
  backgroundUrl = charnelHouseBgUrl,
}: BuildingDetailsProps) => {
  const { t } = useTranslation()
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const handleUpgrade = () => dispatch(upgradeBuilding(building))
  const handleRepair = () => dispatch(repairBuilding(building))

  return (
    <ScreenWrapper css={buildingWrapper} backgroundUrl={backgroundUrl}>
      {children && children(building.level)}
      <Panel>
        <h2 css={buildingTitle}>{t(building.type)}</h2>
        <p css={buildingLevel}>
          {building.level === 0 ? t('buildingNotConstructed') : t('buildingLevel', building.level)}
        </p>
        {renderDescription && building.level > 0 && (
          <div css={[buildingActionFrame, smallMarginTop]}>
            <div>{renderDescription(building.level, building.collapsed)}</div>
          </div>
        )}
        {renderSpecialAction && renderSpecialAction(building.level, building.collapsed)}
        {building.collapsed && (
          <BuildingAction action={<Image src={repairIconUrl} size="2.5rem" />} onClick={handleRepair}>
            {t('repairBuilding')}
          </BuildingAction>
        )}
        {building.level < building.maxLevel && !building.collapsed && (
          <BuildingAction
            level={building.level + 1}
            action={<Image src={upgradeIconUrl} size="2.5rem" />}
            disabled={building.upgradeCost > materials}
            onClick={handleUpgrade}
          >
            {renderUpgradeDescription(building.level + 1)}
            <br />
            {t('cost')}&nbsp;
            <ResourceIcon type={ResourceType.Materials} text={building.upgradeCost} />
          </BuildingAction>
        )}
      </Panel>
    </ScreenWrapper>
  )
}
