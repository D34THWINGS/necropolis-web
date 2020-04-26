/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ReactNode, Fragment } from 'react'
import {
  buildingActionArrow,
  buildingActionButton,
  buildingActionContainer,
  buildingActionFrame,
} from '../helpers/buildingsStyles'
import { useTranslation } from '../../../lang/useTranslation'
import { ResourceIcon } from '../../../components/images/ResourceIcon'
import { ResourceType } from '../../../config/constants'
import { Image } from '../../../components/images/Image'
import repairIconUrl from '../../../assets/images/icons/build-outlined.png'

export type BuildingActionProps = {
  level: number
  description: ReactNode
  upgradeCost: number
  canUpgrade: boolean
  onUpgrade: () => void
  isCollapsed: boolean
  onRepair: () => void
}

export const BuildingAction = ({
  level,
  description,
  upgradeCost,
  canUpgrade,
  onUpgrade,
  isCollapsed,
  onRepair,
}: BuildingActionProps) => {
  const { t } = useTranslation()
  return (
    <div css={buildingActionContainer}>
      <div css={buildingActionFrame}>
        <div css={buildingActionArrow}>{!isCollapsed && t('buildingLevel', level)}</div>
        <span>{isCollapsed ? t('repairBuilding') : description}</span>
      </div>
      <button
        type="button"
        disabled={canUpgrade && !isCollapsed}
        css={buildingActionButton}
        onClick={isCollapsed ? onRepair : onUpgrade}
      >
        {isCollapsed && <Image src={repairIconUrl} size="2rem" />}
        {!isCollapsed && (
          <Fragment>
            <ResourceIcon type={ResourceType.Materials} size="2rem" marginRight="0.3rem" />
            <span>{upgradeCost}</span>
          </Fragment>
        )}
      </button>
    </div>
  )
}
