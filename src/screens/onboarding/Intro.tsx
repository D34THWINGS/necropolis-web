import React from 'react'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import { breakpoints, colors, fonts, shadows, transitions } from '../../config/theme'
import coffinClosedUrl from '../../assets/images/onboarding/coffin-closed.jpg'
import coffinOpenedUrl from '../../assets/images/onboarding/coffin-opened.jpg'
import coffinEmptyUrl from '../../assets/images/onboarding/coffin-empty.jpg'
import nextStepArrowUrl from '../../assets/images/onboarding/next-step-arrow.png'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { greenSquareButton } from '../../styles/buttons'
import { Image } from '../../components/images/Image'
import { nextOnboardingStep } from '../../data/onboarding/actions'
import { useTranslation } from '../../lang/useTranslation'
import { contentCover } from '../../styles/base'
import { OnboardingStep } from '../../config/constants'

const introContainer = css({
  position: 'relative',
  height: '100%',
  backgroundColor: colors.BLACK,
  color: colors.WHITE,
  textShadow: shadows.TEXT,
  textAlign: 'center',
  fontSize: '1.5rem',
  fontFamily: fonts.TITLES,
  fontWeight: 'normal',
})

const nextStepButton = [
  ...greenSquareButton,
  css({
    width: 'auto',
    marginBottom: '5rem',
  }),
]

const introText = css({
  minHeight: '50vh',
})

const introImageContainer = (backgroundUrl: string, zIndex: number) => [
  contentCover,
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '2rem',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    zIndex,

    '&.enter': {
      opacity: 0,
    },

    '&.enter-active': {
      opacity: 1,
      transition: `opacity ${transitions.SLOW}`,
    },

    [breakpoints.SM]: {
      padding: '3rem',
    },
  }),
]

const getCoffinImageUrl = (step: OnboardingStep) => {
  if (step < 5) {
    return coffinClosedUrl
  }
  if (step === OnboardingStep.Step6) {
    return coffinOpenedUrl
  }
  return coffinEmptyUrl
}

export const Intro = () => {
  const { t } = useTranslation()
  const step = useSelector(getOnboardingStep)
  const dispatch = useDispatch()

  const handleNextStep = () => dispatch(nextOnboardingStep())

  return (
    <TransitionGroup css={introContainer}>
      <CSSTransition key={step} timeout={transitions.SLOW_DURATION}>
        <div css={introImageContainer(getCoffinImageUrl(step), step)}>
          <p css={introText}>{t('introText', step)}</p>
          <button type="button" css={nextStepButton} onClick={handleNextStep}>
            <Image src={nextStepArrowUrl} marginRight="0.4rem" /> {t('onboardingNext')}
          </button>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}
