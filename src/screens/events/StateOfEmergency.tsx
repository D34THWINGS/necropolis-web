/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { h2Title, textCenter, textColor } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { PaladinsIcon } from '../../components/images/PaladinsIcon'
import { getPaladinsStrength } from '../../data/paladins/selectors'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { triggerPaladinsAttack, increasePaladinsStrength } from '../../data/paladins/actions'
import { preventSelectorUpdate } from '../../data/helpers'

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
    <Fragment>
      <h2 css={h2Title}>{t('stateOfEmergencyTitle')}</h2>
      {t('stateOfEmergencyDescription', STATE_OF_EMERGENCY_STRENGTH_INCREASE)}
      <p css={textCenter}>
        <PaladinsIcon counter={3} />
      </p>
      <span css={textColor('RED')}>
        {t('paladinsStrength', paladinsStrength + STATE_OF_EMERGENCY_STRENGTH_INCREASE)}
      </span>
      {renderStep((_, { renderAcknowledgeButton }) => renderAcknowledgeButton(handleAcknowledge))}
    </Fragment>
  )
}
