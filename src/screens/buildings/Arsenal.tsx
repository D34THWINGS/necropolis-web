import React from 'react'
import { BuildingType } from '../../config/constants'
import { getArsenalTrapsCount } from '../../data/buildings/helpers'
import { BuildingDetails } from './components/BuildingDetails'
import { useTranslation } from '../../lang/useTranslation'

export const Arsenal = () => {
  const { t } = useTranslation()
  return (
    <BuildingDetails
      type={BuildingType.Arsenal}
      renderDescription={level => t('arsenalDescription', getArsenalTrapsCount(level))}
      renderUpgradeDescription={level => t('arsenalUpgrade', getArsenalTrapsCount(level + 1))}
    />
  )
}
