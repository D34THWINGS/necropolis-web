/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import skullImageUrl from '../../assets/images/header/skull.png'
import skullEyesGlowImageUrl from '../../assets/images/header/skull-eyes-glow.png'
import skullGlowImageUrl from '../../assets/images/header/skull-glow.png'
import { breakpoints, colors, shadows, transitions } from '../../config/theme'
import { useModalState } from '../ui/Modal'
import { resetButton } from '../../styles/buttons'
import { TurnsModal } from './TurnsModal'
import { getPaladinsCounter } from '../../data/paladins/selectors'
import { Image } from '../images/Image'
import { PALADINS_ATTACK_THRESHOLD } from '../../config/constants'
import { glow } from '../../styles/animations'
import { contentCover } from '../../styles/base'

const turnCounter = [
  resetButton,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: '0.9rem',
    paddingLeft: '0.3rem',
    flex: '0 0 auto',
    width: '6rem',
    height: '8rem',
    color: colors.WHITE,
    fontSize: '1.8rem',
    textShadow: shadows.TEXT,

    [breakpoints.SM]: {
      width: '8rem',
      height: '10rem',
      margin: '-1rem',
    },
  }),
]

const eyesGlow = css({
  position: 'absolute',
  top: 0,
  left: 0,
  animation: `${glow} 3s ${transitions.SLOW_EASING} infinite`,
})

const currentTurnText = css({
  position: 'relative',
})

export type TurnCounterProps = {
  currentTurn: number
}

export const TurnCounter = ({ currentTurn }: TurnCounterProps) => {
  const { isOpen, close, open } = useModalState(false)
  const paladinsCounter = useSelector(getPaladinsCounter)
  return (
    <Fragment>
      <button type="button" css={turnCounter} onClick={open}>
        {paladinsCounter === PALADINS_ATTACK_THRESHOLD && <Image src={skullGlowImageUrl} css={eyesGlow} size="100%" />}
        <Image src={skullImageUrl} css={contentCover} size="100%" />
        {paladinsCounter >= PALADINS_ATTACK_THRESHOLD - 1 && (
          <Image src={skullEyesGlowImageUrl} css={eyesGlow} size="100%" />
        )}
        <span css={currentTurnText}>{currentTurn}</span>
      </button>
      <TurnsModal isOpen={isOpen} onClose={close} />
    </Fragment>
  )
}
