import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { getUpgradableBuildings } from '../../data/buildings/selectors'
import { EventAction } from './components/EventAction'
import { BuildingType } from '../../config/constants'
import { freeUpgradeBuilding } from '../../data/buildings/actions'
import { endEvent } from '../../data/events/actions'
import offeringImageUrl from '../../assets/images/events/offering.jpg'
import { EventImage } from './components/EventImage'
import { eventStepDescription, eventTitle } from './helpers/eventStyles'

export const Offering = () => {
  const { t } = useTranslation()
  const upgradableBuildings = useSelector(getUpgradableBuildings)
  const dispatch = useDispatch()

  const handleUpgrade = (type: BuildingType) => () => {
    dispatch(freeUpgradeBuilding(type))
    dispatch(endEvent())
  }

  return (
    <>
      <h2 css={eventTitle}>{t('offeringTitle')}</h2>
      <EventImage src={offeringImageUrl} />
      <div css={eventStepDescription}>{t('offeringDescription')}</div>
      {upgradableBuildings.map(type => (
        <EventAction key={type} extra={t('offeringActionSubtitle')} onClick={handleUpgrade(type)}>
          {t('offeringAction', type)}
        </EventAction>
      ))}
    </>
  )
}
