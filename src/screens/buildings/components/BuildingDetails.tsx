/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, ReactNode } from 'react'
import { buildingActionFrame, buildingLevel, buildingTitle, buildingWrapper } from '../helpers/buildingsStyles'
import { Panel } from '../../../components/ui/Panel'
import { BuildingType, ResourceType } from '../../../config/constants'
import { BuildingAction } from './BuildingAction'
import { repairBuilding, upgradeBuilding } from '../../../data/buildings/actions'
import { getBuildingMaxLevel, getBuildingUpgradeCost } from '../../../data/buildings/helpers'
import { getBuildingLevel, getIsBuildingCollapsed } from '../../../data/buildings/selectors'
import { useTranslation } from '../../../lang/useTranslation'
import { getMaterials } from '../../../data/resources/selectors'
import { ScreenWrapper } from '../../../components/ui/ScreenWrapper'
import charnelHouseBgUrl from '../../../assets/images/buildings/charnel-house-bg.jpg'
import { Image } from '../../../components/images/Image'
import upgradeIconUrl from '../../../assets/images/icons/upgrade.png'
import repairIconUrl from '../../../assets/images/icons/repair.png'
import { ResourceIcon } from '../../../components/images/ResourceIcon'
import { smallMarginTop } from '../../../styles/base'

type BuildingDetailsProps = {
  type: BuildingType
  renderUpgradeDescription: (level: number) => ReactNode
  renderDescription?: (level: number, isCollapsed: boolean) => ReactNode
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
      <Panel>
        <h2 css={buildingTitle}>{t(type)}</h2>
        <p css={buildingLevel}>{level === 0 ? t('buildingNotConstructed') : t('buildingLevel', level)}</p>
        {renderDescription && level > 0 && (
          <div css={[buildingActionFrame, smallMarginTop]}>
            <div>{renderDescription(level, isCollapsed)}</div>
          </div>
        )}
        {renderSpecialAction && renderSpecialAction(level, isCollapsed)}
        {(level < maxLevel || isCollapsed) && (
          <BuildingAction
            level={isCollapsed ? undefined : level + 1}
            action={
              isCollapsed ? <Image src={repairIconUrl} size="2.5rem" /> : <Image src={upgradeIconUrl} size="2.5rem" />
            }
            disabled={upgradeCost > materials && !isCollapsed}
            onClick={isCollapsed ? handleRepair : handleUpgrade}
          >
            {isCollapsed ? (
              t('repairBuilding')
            ) : (
              <Fragment>
                {renderUpgradeDescription(level + 1)}
                <br />
                {t('cost')}&nbsp;
                <ResourceIcon type={ResourceType.Materials} text={upgradeCost} />
              </Fragment>
            )}
          </BuildingAction>
        )}
      </Panel>
    </ScreenWrapper>
  )
}
