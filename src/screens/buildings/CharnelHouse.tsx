import React from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingDetails } from './components/BuildingDetails'
import { getCharnelHouse } from '../../data/buildings/selectors'
import { ResourceType } from '../../config/constants'
import { makeUpgradedBuilding } from '../../data/buildings/helpers'
import { MAIN_HUB } from '../../config/routes'

export const CharnelHouse = () => {
  const { t } = useTranslation()
  const charnelHouse = useSelector(getCharnelHouse)

  if (!charnelHouse) {
    return <Redirect to={MAIN_HUB} />
  }

  return (
    <BuildingDetails
      building={charnelHouse}
      renderDescription={() => t('charnelHouseDescription', charnelHouse.produces[ResourceType.Meat] ?? 0)}
      renderUpgradeDescription={() =>
        t('charnelHouseUnlock', makeUpgradedBuilding(charnelHouse).produces[ResourceType.Meat] ?? 0)
      }
    />
  )
}
