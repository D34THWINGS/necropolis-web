import React, { useRef } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import reanimateIconUrl from '../../assets/images/icons/reanimate.png'
import lockIconUrl from '../../assets/images/icons/lock.png'
import { OnboardingStep, ResourceType } from '../../config/constants'
import { getSouls } from '../../data/resources/selectors'
import { getRaisableUndeadTypes, getRaisedUndeadCount } from '../../data/undeads/selectors'
import { Image } from '../../components/images/Image'
import { BuildingDetails } from './components/BuildingDetails'
import { BuildingAction } from './components/BuildingAction'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { ReanimatedUndeadModal } from './components/ReanimatedUndeadModal'
import { useModalState } from '../../components/ui/Modal/Modal'
import { createUndead, Undead } from '../../data/undeads/helpers'
import { raiseUndead } from '../../data/undeads/actions'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { nextOnboardingStep } from '../../data/onboarding/actions'
import { getCatacombs } from '../../data/buildings/selectors'
import { isBuildingConstructed, makeUpgradedBuilding } from '../../data/buildings/helpers'
import { MAIN_HUB } from '../../config/routes'

export const Catacombs = () => {
  const { t } = useTranslation()
  const catacombs = useSelector(getCatacombs)
  const raisedUndead = useSelector(getRaisedUndeadCount)
  const onboardingStep = useSelector(getOnboardingStep)
  const souls = useSelector(getSouls)
  const types = useSelector(getRaisableUndeadTypes)
  const dispatch = useDispatch()
  const raisedUndeadRef = useRef<Undead | null>(null)
  const { isOpen, open, close } = useModalState()

  if (!catacombs) {
    return <Redirect to={MAIN_HUB} />
  }

  const handleRaiseUndead = () => {
    raisedUndeadRef.current = createUndead(types[Math.round(Math.random() * (types.length - 1))], true)
    open()
  }

  const handleAcknowledge = () => {
    if (raisedUndeadRef.current) {
      dispatch(raiseUndead(raisedUndeadRef.current))
    }
    if (onboardingStep === OnboardingStep.AwaitUndeadRaising) {
      dispatch(nextOnboardingStep())
    }
    close()
  }

  return (
    <BuildingDetails
      building={catacombs}
      renderSpecialAction={(level, isCollapsed) =>
        level === 0 ? null : (
          <>
            <BuildingAction
              onClick={handleRaiseUndead}
              disabled={
                level === 0 ||
                catacombs.raiseUndeadSoulCost > souls ||
                raisedUndead >= catacombs.maxRaisedUndead ||
                isCollapsed
              }
              action={
                isCollapsed ? <Image src={lockIconUrl} size="2.5rem" /> : <Image src={reanimateIconUrl} size="2.5rem" />
              }
            >
              {t('catacombDescription', raisedUndead, catacombs.maxRaisedUndead)}
              <br />
              {t('cost')}&nbsp;
              <ResourceIcon type={ResourceType.Souls} text={catacombs.raiseUndeadSoulCost} />
            </BuildingAction>
            <ReanimatedUndeadModal isOpen={isOpen} onAcknowledge={handleAcknowledge} undead={raisedUndeadRef.current} />
          </>
        )
      }
      renderUpgradeDescription={() =>
        isBuildingConstructed(catacombs)
          ? t('catacombUnlock')
          : t('catacombUpgrade', makeUpgradedBuilding(catacombs).maxRaisedUndead)
      }
    />
  )
}
