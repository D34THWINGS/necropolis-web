import React from 'react'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import skullImageUrl from '../../assets/images/header/skull.png'
import skullEyesGlowImageUrl from '../../assets/images/header/skull-eyes-glow.png'
import skullGlowImageUrl from '../../assets/images/header/skull-glow.png'
import { breakpoints, colors, shadows, transitions } from '../../config/theme'
import { useModalState } from '../ui/Modal/Modal'
import { resetButton } from '../../styles/buttons'
import { TurnsModal } from './TurnsModal'
import { getPaladinsCounter } from '../../data/paladins/selectors'
import { Image } from '../images/Image'
import { OnboardingStep, PALADINS_ATTACK_THRESHOLD } from '../../config/constants'
import { glow } from '../../styles/animations'
import { contentCover } from '../../styles/base'
import { OnboardingHighlight } from '../../screens/onboarding/components/OnboardingHighlight'

const turnCounter = [
  resetButton,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    margin: '0 -0.4rem',
    paddingTop: '0.4rem',
    flex: '0 0 auto',
    width: '6.8rem',
    height: '9rem',
    color: colors.WHITE,
    fontSize: '1.8rem',
    textShadow: shadows.TEXT,

    [breakpoints.SM]: {
      margin: '-0.4rem -0.4rem -1rem',
      paddingTop: '1.2rem',
      paddingLeft: '0.3rem',
      width: '8rem',
      height: '9.5rem',
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
    <>
      <OnboardingHighlight<HTMLButtonElement> step={OnboardingStep.HighlightTurnCounter}>
        {({ ref, className, step }) => (
          <button
            ref={ref}
            type="button"
            css={turnCounter}
            className={className}
            onClick={step === OnboardingStep.HighlightTurnCounter ? undefined : open}
          >
            {paladinsCounter === PALADINS_ATTACK_THRESHOLD && (
              <Image src={skullGlowImageUrl} css={eyesGlow} size="100%" />
            )}
            <Image src={skullImageUrl} css={contentCover} size="100%" />
            {paladinsCounter >= PALADINS_ATTACK_THRESHOLD - 1 && (
              <Image src={skullEyesGlowImageUrl} css={eyesGlow} size="100%" />
            )}
            <span css={currentTurnText}>{currentTurn}</span>
          </button>
        )}
      </OnboardingHighlight>
      <TurnsModal isOpen={isOpen} onClose={close} />
    </>
  )
}
