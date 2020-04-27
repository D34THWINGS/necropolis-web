/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { MouseEventHandler, ReactNode } from 'react'
import { cyanSquareButton } from '../../../styles/buttons'
import { Image } from '../../../components/images/Image'
import actionArrowUrl from '../../../assets/images/icons/cyan-arrow.png'
import { useTranslation } from '../../../lang/useTranslation'
import { alignItemsCenter, textColor } from '../../../styles/base'

const expeditionActionButton = [
  ...cyanSquareButton,
  css({
    marginTop: '0.4rem',
    fontSize: '0.9rem',
  }),
]

const actionText = css({
  flex: '1 1 auto',
  textAlign: 'left',
  paddingRight: '0.4rem',
})

export type ExpeditionActionProps = {
  onClick?: MouseEventHandler
  disabled?: boolean
  children: ReactNode
  prerequisites?: ReactNode
  cost?: ReactNode
}

export const ExpeditionAction = ({ disabled, onClick, children, prerequisites, cost }: ExpeditionActionProps) => {
  const { t } = useTranslation()
  return (
    <button type="button" disabled={disabled} css={expeditionActionButton} onClick={onClick}>
      <Image src={actionArrowUrl} block marginRight="0.4rem" />
      <span css={actionText}>{children}</span>
      {prerequisites && (
        <span css={alignItemsCenter}>
          <span css={textColor('CYAN')}>{t('expeditionPrerequisites')}</span>&nbsp;{prerequisites}
        </span>
      )}
      {cost && (
        <span css={alignItemsCenter}>
          <span css={textColor('CYAN')}>{t('expeditionCost')}</span>&nbsp;{cost}
        </span>
      )}
    </button>
  )
}
