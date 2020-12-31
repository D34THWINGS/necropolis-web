import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { textCenter } from '../../styles/base'
import { PaladinsIcon } from '../../components/images/PaladinsIcon'
import { callToArms } from '../../data/paladins/actions'
import { getTurn } from '../../data/turn/selectors'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { OnboardingStep, PALADINS_ATTACK_THRESHOLD } from '../../config/constants'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { nextOnboardingStep } from '../../data/onboarding/actions'
import callToArmsImageUrl from '../../assets/images/events/call-to-arms.jpg'
import { EventImage } from './components/EventImage'
import { eventStepDescription, eventTitle } from './helpers/eventStyles'

export const CallToArms = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const onboardingStep = useSelector(getOnboardingStep)
  const turn = useSelector(getTurn)
  const dispatch = useDispatch()

  const handleAcknowledge = () => {
    dispatch(callToArms(turn))
    if (onboardingStep === OnboardingStep.AwaitNextTurn2) {
      dispatch(nextOnboardingStep())
    }
  }

  return (
    <>
      <h2 css={eventTitle}>{t('callToArmsTitle')}</h2>
      <EventImage src={callToArmsImageUrl} />
      <div css={eventStepDescription}>
        {t('callToArmsDescription', PALADINS_ATTACK_THRESHOLD)}
        <p css={textCenter}>
          <PaladinsIcon counter={2} />
        </p>
      </div>
      {renderStep((_, { renderAcknowledgeButton }) => renderAcknowledgeButton(handleAcknowledge))}
    </>
  )
}
