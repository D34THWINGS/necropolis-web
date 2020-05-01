/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ReactNode } from 'react'
import {
  buildingActionArrow,
  buildingActionButton,
  buildingActionContainer,
  buildingActionFrame,
} from '../helpers/buildingsStyles'
import { useTranslation } from '../../../lang/useTranslation'

export type BuildingActionProps = {
  level?: number
  children: ReactNode
  action?: ReactNode
  disabled?: boolean
  onClick: () => void
}

export const BuildingAction = ({ level, children, action, disabled, onClick }: BuildingActionProps) => {
  const { t } = useTranslation()
  return (
    <div css={buildingActionContainer}>
      <div css={buildingActionFrame}>
        <div css={buildingActionArrow}>{level !== undefined && t('buildingLevel', level)}</div>
        <div>{children}</div>
      </div>
      {action && (
        <button type="button" disabled={disabled} css={buildingActionButton} onClick={onClick}>
          {action}
        </button>
      )}
    </div>
  )
}
