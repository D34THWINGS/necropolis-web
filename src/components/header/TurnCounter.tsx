/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import skullImageUrl from '../../assets/images/header/skull.png'
import { colors, shadows } from '../../config/theme'
import { useModalState } from '../ui/Modal'
import { resetButton } from '../../styles/buttons'
import { TurnsModal } from './TurnsModal'

const turnCounter = [
  resetButton,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '0.9rem',
    paddingLeft: '0.3rem',
    flex: '0 0 auto',
    width: '22vw',
    maxWidth: '6rem',
    height: '28vw',
    maxHeight: '8rem',
    color: colors.WHITE,
    backgroundImage: `url(${skullImageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    fontSize: '1.8rem',
    textShadow: shadows.TEXT,
  }),
]

export type TurnCounterProps = {
  currentTurn: number
}

export const TurnCounter = ({ currentTurn }: TurnCounterProps) => {
  const { isOpen, close, open } = useModalState(false)
  return (
    <Fragment>
      <button type="button" css={turnCounter} onClick={open}>
        {currentTurn}
      </button>
      <TurnsModal isOpen={isOpen} onClose={close} />
    </Fragment>
  )
}
