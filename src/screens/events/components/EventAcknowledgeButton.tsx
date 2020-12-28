import React from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { darkRedSquareButton } from '../../../styles/buttons'
import { useTranslation } from '../../../lang/useTranslation'
import { endEvent } from '../../../data/events/actions'

const eventAcknowledgeButton = [
  ...darkRedSquareButton,
  css({
    marginTop: '0.4rem',
  }),
]

export type EventAcknowledgeButtonProps = {
  onClick?: () => void
}

export const EventAcknowledgeButton = ({ onClick }: EventAcknowledgeButtonProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    dispatch(endEvent())
  }

  return (
    <button type="button" css={eventAcknowledgeButton} onClick={handleClick} data-test-id="acknowledgeEventButton">
      {t('eventAcknowledge')}
    </button>
  )
}
