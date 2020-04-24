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
import { PALADINS_ATTACK_THRESHOLD } from '../../config/constants'

export const CallToArms = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const turn = useSelector(getTurn)
  const dispatch = useDispatch()

  const handleAcknowledge = () => dispatch(callToArms(turn))

  return (
    <Fragment>
      <h2 css={h2Title}>{t('callToArmsTitle')}</h2>
      <p>{t('callToArmsDescription', PALADINS_ATTACK_THRESHOLD)}</p>
      <p css={textCenter}>
        <PaladinsIcon counter={1} />
      </p>
      {renderStep((_, { renderAcknowledgeButton }) => renderAcknowledgeButton(handleAcknowledge))}
    </Fragment>
  )
}
