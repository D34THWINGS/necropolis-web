/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import Transition from 'react-transition-group/Transition'
import { colors, shadows } from '../../config/theme'
import coffinClosedUrl from '../../assets/images/onboarding/coffin-closed.jpg'
import coffinOpenedUrl from '../../assets/images/onboarding/coffin-opened.jpg'
import nextStepArrowUrl from '../../assets/images/onboarding/next-step-arrow.png'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { greenSquareButton } from '../../styles/buttons'
import { Image } from '../../components/images/Image'
import { nextOnboardingStep } from '../../data/onboarding/actions'
import { useTranslation } from '../../lang/useTranslation'
import { contentCover } from '../../styles/base'
import { fadeInJS, fadeOutJS, jsAnimationDuration } from '../../styles/jsAnimations'

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
    position: 'absolute',
    bottom: '8rem',
    left: '50%',
    width: 'auto',
    transform: 'translateX(-50%)',

    ':not(:disabled):active': {
      transform: 'translate(-50%, 0.1rem)',
    },
  }),
]

const introText = css({
  position: 'relative',
})

const introImageContainer = (backgroundUrl: string) => [
  contentCover,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }),
]

export const Intro = () => {
  const { t } = useTranslation()
  const step = useSelector(getOnboardingStep)
  const dispatch = useDispatch()

  const handleNextStep = () => dispatch(nextOnboardingStep())

  return (
    <TransitionGroup css={introContainer}>
      <Transition key={step} timeout={jsAnimationDuration} onEnter={fadeInJS} onExit={fadeOutJS}>
        <div css={introImageContainer(step < 5 ? coffinClosedUrl : coffinOpenedUrl)}>
          <p css={introText}>{t('introText', step)}</p>
          <button type="button" css={nextStepButton} onClick={handleNextStep}>
            <Image src={nextStepArrowUrl} marginRight="0.4rem" /> Suite
          </button>
        </div>
      </Transition>
    </TransitionGroup>
  )
}
