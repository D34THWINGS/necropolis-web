import React, { ReactNode } from 'react'
import { css } from '@emotion/core'
import { Image } from '../../../components/images/Image'
import actionArrowUrl from '../../../assets/images/icons/red-arrow.png'
import { redSquareButton } from '../../../styles/buttons'

const eventActionButton = [
  ...redSquareButton,
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

export type EventActionProps = {
  children?: ReactNode
  extra?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const EventAction = ({ onClick, disabled, extra, children }: EventActionProps) => (
  <button type="button" disabled={disabled} css={eventActionButton} onClick={onClick}>
    <Image src={actionArrowUrl} block marginRight="0.4rem" />
    <span css={actionText}>{children}</span>
    {extra}
  </button>
)
