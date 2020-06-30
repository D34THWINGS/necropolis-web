/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title, textCenter } from '../../styles/base'
import { PaladinsIcon } from '../../components/images/PaladinsIcon'
import { callToArms } from '../../data/paladins/actions'
import { getTurn } from '../../data/turn/selectors'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { OnboardingStep, PALADINS_ATTACK_THRESHOLD } from '../../config/constants'
import { getPaladinsCounter } from '../../data/paladins/selectors'
import { preventSelectorUpdate } from '../../data/helpers'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { nextOnboardingStep } from '../../data/onboarding/actions'

export const CallToArms = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const onboardingStep = useSelector(getOnboardingStep)
  const turn = useSelector(getTurn)
  const paladinsCounter = useSelector(getPaladinsCounter, preventSelectorUpdate)
  const dispatch = useDispatch()

  const handleAcknowledge = () => {
    dispatch(callToArms(turn))
    if (onboardingStep === OnboardingStep.AwaitNextTurn2) {
      dispatch(nextOnboardingStep())
    }
  }

  return (
    <Fragment>
      <h2 css={h2Title}>{t('callToArmsTitle')}</h2>
      <p>{t('callToArmsDescription', PALADINS_ATTACK_THRESHOLD)}</p>
      <p css={textCenter}>
        <PaladinsIcon counter={paladinsCounter + 1} />
      </p>
      {renderStep((_, { renderAcknowledgeButton }) => renderAcknowledgeButton(handleAcknowledge))}
    </Fragment>
  )
}
