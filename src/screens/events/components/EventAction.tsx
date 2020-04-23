/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode } from 'react'
import { Image } from '../../../components/images/Image'
import actionArrowUrl from '../../../assets/images/event-arrow.png'
import { redSquareButton } from '../../../styles/buttons'

const eventActionButton = [
  ...redSquareButton,
  css({
    marginTop: '0.4rem',
    fontSize: '0.8rem',
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
}

export const EventAction = ({ onClick, extra, children }: EventActionProps) => (
  <button type="button" css={eventActionButton} onClick={onClick}>
    <Image src={actionArrowUrl} block marginRight="0.4rem" />
    <span css={actionText}>{children}</span>
    {extra}
  </button>
)
