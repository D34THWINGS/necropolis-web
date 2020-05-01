/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import { colors, shadows, transitions } from '../../config/theme'
import coffinClosedUrl from '../../assets/images/onboarding/coffin-closed.jpg'
import coffinOpenedUrl from '../../assets/images/onboarding/coffin-opened.jpg'
import nextStepArrowUrl from '../../assets/images/onboarding/next-step-arrow.png'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { greenSquareButton } from '../../styles/buttons'
import { Image } from '../../components/images/Image'
import { nextOnboardingStep } from '../../data/onboarding/actions'
import { useTranslation } from '../../lang/useTranslation'
import { contentCover } from '../../styles/base'

const introContainer = css({
  position: 'relative',
  padding: '3rem',
  height: '100%',
  backgroundColor: colors.BLACK,
  color: colors.WHITE,
  textShadow: shadows.TEXT,
  textAlign: 'center',
  fontSize: '1.5rem',
  fontFamily: '"Greywall", Arial, Helvetica, sans-serif',
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
  minHeight: '20rem',
})

const introImageContainer = (backgroundUrl: string, zIndex: number) => [
  contentCover,
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '3rem',
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
  }),
]

export const Intro = () => {
  const { t } = useTranslation()
  const step = useSelector(getOnboardingStep)
  const dispatch = useDispatch()

  const handleNextStep = () => dispatch(nextOnboardingStep())

  return (
    <TransitionGroup css={introContainer}>
      <CSSTransition key={step} timeout={transitions.SLOW_DURATION}>
        <div css={introImageContainer(step < 5 ? coffinClosedUrl : coffinOpenedUrl, step)}>
          <p css={introText}>{t('introText', step)}</p>
          <button type="button" css={nextStepButton} onClick={handleNextStep}>
            <Image src={nextStepArrowUrl} marginRight="0.4rem" /> Suite
          </button>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}
