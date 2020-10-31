import React from 'react'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingType } from '../../config/constants'
import {
  getCharnelHouseBonesProduction,
  getCharnelHouseMeatProduction,
  getCharnelHouseProductionTurns,
} from '../../data/buildings/helpers'
import { BuildingDetails } from './components/BuildingDetails'

export const CharnelHouse = () => {
  const { t } = useTranslation()

  return (
    <BuildingDetails
      type={BuildingType.CharnelHouse}
      renderDescription={level =>
        t(
          'charnelHouseDescription',
          getCharnelHouseMeatProduction(level),
          getCharnelHouseBonesProduction(level),
          getCharnelHouseProductionTurns(level),
        )
      }
      renderUpgradeDescription={level =>
        level === 1
          ? t('charnelHouseUnlock', getCharnelHouseMeatProduction(level))
          : t('charnelHouseUpgrade', getCharnelHouseBonesProduction(level), getCharnelHouseProductionTurns(level))
      }
    />
  )
}
