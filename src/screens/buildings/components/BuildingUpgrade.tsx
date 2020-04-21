/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ReactNode } from 'react'
import {
  buildingUpgradeArrow,
  buildingUpgradeButton,
  buildingUpgradeContainer,
  buildingUpgradeFrame,
} from '../helpers/buildingsStyles'
import { useTranslation } from '../../../lang/useTranslation'
import { ResourceIcon } from '../../../components/images/ResourceIcon'
import { ResourceType } from '../../../config/constants'

export type BuildingUpgradeProps = {
  level: number
  description: ReactNode
  upgradeCost: number
  canUpgrade: boolean
  onUpgrade: () => void
}

export const BuildingUpgrade = ({ level, description, upgradeCost, canUpgrade, onUpgrade }: BuildingUpgradeProps) => {
  const { t } = useTranslation()
  return (
    <div css={buildingUpgradeContainer}>
      <div css={buildingUpgradeFrame}>
        <div css={buildingUpgradeArrow}>{t('buildingLevel', level)}</div>
        <span>{description}</span>
      </div>
      <button type="button" disabled={canUpgrade} css={buildingUpgradeButton} onClick={onUpgrade}>
        <ResourceIcon type={ResourceType.Materials} size="2rem" marginRight="0.3rem" />
        <span>{upgradeCost}</span>
      </button>
    </div>
  )
}
