import React from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { makeUpgradedBuilding } from '../../data/buildings/helpers'
import { BuildingDetails } from './components/BuildingDetails'
import { useTranslation } from '../../lang/useTranslation'
import { getArsenal } from '../../data/buildings/selectors'
import { MAIN_HUB } from '../../config/routes'

export const Arsenal = () => {
  const { t } = useTranslation()
  const arsenal = useSelector(getArsenal)

  if (!arsenal) {
    return <Redirect to={MAIN_HUB} />
  }

  return (
    <BuildingDetails
      building={arsenal}
      renderDescription={() => t('arsenalDescription', arsenal.trapsPerAssault)}
      renderUpgradeDescription={() => t('arsenalUpgrade', makeUpgradedBuilding(arsenal).trapsPerAssault)}
    />
  )
}
