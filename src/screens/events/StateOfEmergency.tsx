import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { textCenter, textColor } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { PaladinsIcon } from '../../components/images/PaladinsIcon'
import { getPaladinsStrength } from '../../data/paladins/selectors'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { triggerPaladinsAttack, increasePaladinsStrength } from '../../data/paladins/actions'
import { preventSelectorUpdate } from '../../data/helpers'
import stateOfEmergencyImageUrl from '../../assets/images/events/state-of-emergency.jpg'
import { EventImage } from './components/EventImage'
import { eventStepDescription, eventTitle } from './helpers/eventStyles'

const STATE_OF_EMERGENCY_STRENGTH_INCREASE = 1

export const StateOfEmergency = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const paladinsStrength = useSelector(getPaladinsStrength, preventSelectorUpdate)
  const dispatch = useDispatch()

  const handleAcknowledge = () => {
    dispatch(increasePaladinsStrength())
    dispatch(triggerPaladinsAttack())
  }

  return (
    <>
      <h2 css={eventTitle}>{t('stateOfEmergencyTitle')}</h2>
      <EventImage src={stateOfEmergencyImageUrl} />
      <div css={eventStepDescription}>
        {t('stateOfEmergencyDescription', STATE_OF_EMERGENCY_STRENGTH_INCREASE)}
        <p css={textCenter}>
          <PaladinsIcon counter={3} />
        </p>
        <span css={textColor('RED')}>
          {t('paladinsStrength', paladinsStrength + STATE_OF_EMERGENCY_STRENGTH_INCREASE)}
        </span>
      </div>
      {renderStep((_, { renderAcknowledgeButton }) => renderAcknowledgeButton(handleAcknowledge))}
    </>
  )
}
