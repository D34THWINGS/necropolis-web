/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { h2Title } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { getUpgradableBuildings } from '../../data/buildings/selectors'
import { EventAction } from './components/EventAction'
import { BuildingType } from '../../config/constants'
import { freeUpgradeBuilding } from '../../data/buildings/actions'
import { endEvent } from '../../data/events/actions'

export const Offering = () => {
  const { t } = useTranslation()
  const upgradableBuildings = useSelector(getUpgradableBuildings)
  const dispatch = useDispatch()

  const handleUpgrade = (type: BuildingType) => () => {
    dispatch(freeUpgradeBuilding(type))
    dispatch(endEvent())
  }

  return (
    <Fragment>
      <h2 css={h2Title}>{t('offeringTitle')}</h2>
      {t('offeringDescription')}
      {upgradableBuildings.map(type => (
        <EventAction key={type} extra={t('offeringActionSubtitle')} onClick={handleUpgrade(type)}>
          {t('offeringAction', type)}
        </EventAction>
      ))}
    </Fragment>
  )
}
