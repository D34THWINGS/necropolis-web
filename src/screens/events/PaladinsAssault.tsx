import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { textColor } from '../../styles/base'
import { getPaladinsStrength } from '../../data/paladins/selectors'
import { getDefense } from '../../data/selectors'
import paladinsAssault1ImageUrl from '../../assets/images/events/paladins-assault-1.jpg'
import paladinsAssault2ImageUrl from '../../assets/images/events/paladins-assault-2.jpg'
import paladinsAssault3ImageUrl from '../../assets/images/events/paladins-assault-3.jpg'
import { EventImage } from './components/EventImage'
import { eventStepDescription, eventTitle } from './helpers/eventStyles'
import { endEvent } from '../../data/events/actions'
import { redSquareButton } from '../../styles/buttons'
import { beginPaladinsAssault } from '../../data/paladins/actions'

const PALADINS_ASSAULT_WEAK = 4
const PALADINS_ASSAULT_MEDIUM = 7

export const PaladinsAssault = () => {
  const { t } = useTranslation()
  const paladinsStrength = useSelector(getPaladinsStrength)
  const defense = useSelector(getDefense)
  const dispatch = useDispatch()

  const getDescription = () => {
    if (paladinsStrength <= PALADINS_ASSAULT_WEAK) {
      return t('paladinsAssaultWeak')
    }
    if (paladinsStrength <= PALADINS_ASSAULT_MEDIUM) {
      return t('paladinsAssaultMedium')
    }
    return t('paladinsAssaultStrong')
  }

  const getImageUrl = () => {
    if (paladinsStrength <= PALADINS_ASSAULT_WEAK) {
      return paladinsAssault1ImageUrl
    }
    if (paladinsStrength <= PALADINS_ASSAULT_MEDIUM) {
      return paladinsAssault2ImageUrl
    }
    return paladinsAssault3ImageUrl
  }

  const handleBeginAssault = () => {
    dispatch(beginPaladinsAssault())
    dispatch(endEvent())
  }

  return (
    <>
      <h2 css={eventTitle}>{t('paladinsAssaultTitle')}</h2>
      <EventImage src={getImageUrl()} />
      <div css={eventStepDescription}>
        {getDescription()}
        <br />
        <span css={textColor('LIME')}>{t('currentDefense', defense)}</span>
      </div>
      <button type="button" css={redSquareButton} onClick={handleBeginAssault} data-test-id="startPaladinAssaultButton">
        {t('paladinsAssaultAction1')}
      </button>
    </>
  )
}
