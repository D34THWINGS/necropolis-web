import React from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingDetails } from './components/BuildingDetails'
import { getCharnelHouse } from '../../data/buildings/selectors'
import { ResourceType } from '../../config/constants'
import { makeUpgradedBuilding } from '../../data/buildings/helpers'
import { MAIN_HUB } from '../../config/routes'
import healIconUrl from '../../assets/images/icons/heal.png'
import lockIconUrl from '../../assets/images/icons/lock.png'
import charnelHouseBgUrl from '../../assets/images/buildings/charnel-house-bg.jpg'
import { Image } from '../../components/images/Image'
import { BuildingAction } from './components/BuildingAction'
import { getMeat } from '../../data/resources/selectors'
import { useModalState } from '../../components/ui/Modal/Modal'
import { HealUndeadModal } from './components/HealUndeadModal'
import { CleanseUndeadModal } from './components/CleanseUndeadModal'

export const CharnelHouse = () => {
  const { t } = useTranslation()
  const meat = useSelector(getMeat)
  const charnelHouse = useSelector(getCharnelHouse)
  const { isOpen: isHealing, close: closeHealing, open: openHealing } = useModalState(false)
  const { isOpen: isCleansing, close: closeCleansing, open: openCleansing } = useModalState(false)

  if (!charnelHouse) {
    return <Redirect to={MAIN_HUB} />
  }

  return (
    <BuildingDetails
      backgroundUrl={charnelHouseBgUrl}
      building={charnelHouse}
      renderSpecialAction={(level, isCollapsed) => (
        <>
          {charnelHouse.canHeal && (
            <>
              <BuildingAction
                onClick={openHealing}
                disabled={meat < charnelHouse.healingCost || isCollapsed}
                action={
                  isCollapsed ? <Image src={lockIconUrl} size="2.5rem" /> : <Image src={healIconUrl} size="2.5rem" />
                }
              >
                {t('charnelHouseHeal', charnelHouse.healingAmount, charnelHouse.healingCost)}
              </BuildingAction>
              <HealUndeadModal charnelHouse={charnelHouse} isOpen={isHealing} onClose={closeHealing} />
            </>
          )}
          {charnelHouse.canCleanse && (
            <>
              <BuildingAction
                onClick={openCleansing}
                disabled={meat < charnelHouse.healingCost || isCollapsed}
                action={
                  isCollapsed ? <Image src={lockIconUrl} size="2.5rem" /> : <Image src={healIconUrl} size="2.5rem" />
                }
              >
                {t('charnelHouseCleanse', charnelHouse.cleansingCost)}
              </BuildingAction>
              <CleanseUndeadModal charnelHouse={charnelHouse} isOpen={isCleansing} onClose={closeCleansing} />
            </>
          )}
        </>
      )}
      renderDescription={() => t('charnelHouseDescription', charnelHouse.produces[ResourceType.Meat] ?? 0)}
      renderUpgradeDescription={() => {
        const upgradedProduction = makeUpgradedBuilding(charnelHouse).produces[ResourceType.Meat] ?? 0
        if (charnelHouse.level === 0) {
          return t('charnelHouseUnlock', upgradedProduction)
        }
        const productionDifference = upgradedProduction - (charnelHouse.produces[ResourceType.Meat] ?? 0)
        if (charnelHouse.level === 1) return t('charnelHouseUnlockHeal', productionDifference)
        return t('charnelHouseUnlockCleanse', productionDifference)
      }}
    />
  )
}
