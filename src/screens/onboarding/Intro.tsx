/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { colors, shadows } from '../../config/theme'
import coffinClosedUrl from '../../assets/images/onboarding/coffin-closed.jpg'
import coffinOpenedUrl from '../../assets/images/onboarding/coffin-opened.jpg'
import nextStepArrowUrl from '../../assets/images/onboarding/next-step-arrow.png'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { greenSquareButton } from '../../styles/buttons'
import { Image } from '../../components/images/Image'
import { nextOnboardingStep } from '../../data/onboarding/actions'
import { useTranslation } from '../../lang/useTranslation'

const introContainer = (backgroundUrl: string) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    height: '100%',
    backgroundColor: colors.BLACK,
    backgroundImage: `url(${backgroundUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
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

export const Intro = () => {
  const { t } = useTranslation()
  const step = useSelector(getOnboardingStep)
  const dispatch = useDispatch()

  const handleNextStep = () => dispatch(nextOnboardingStep())

  return (
    <div css={introContainer(step < 5 ? coffinClosedUrl : coffinOpenedUrl)}>
      <p>{t('introText', step)}</p>
      <button type="button" css={nextStepButton} onClick={handleNextStep}>
        <Image src={nextStepArrowUrl} marginRight="0.4rem" /> Suite
      </button>
    </div>
  )
}
