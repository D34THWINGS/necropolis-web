import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ExpeditionMarker } from './components/ExpeditionMarker'
import { ExpeditionType, OnboardingStep, ResourceType } from '../../config/constants'
import { getHasAchievedExpedition } from '../../data/expeditions/selectors'
import { ScreenWrapper } from '../../components/ui/ScreenWrapper'
import mapBgUrl from '../../assets/images/expeditions/map.jpg'
import { OnboardingHighlight } from '../onboarding/components/OnboardingHighlight'
import { ExpeditionOverviewModal } from './components/ExpeditionOverviewModal'
import { useTranslation } from '../../lang/useTranslation'
import { ResourceIcon } from '../../components/resources/ResourceIcon'

export const ExpeditionsMap = () => {
  const { t } = useTranslation()
  const oldCoffinDone = useSelector(getHasAchievedExpedition(ExpeditionType.Sawmill))
  const miseryMarketDone = useSelector(getHasAchievedExpedition(ExpeditionType.MiseryMarket))
  const townHallDone = useSelector(getHasAchievedExpedition(ExpeditionType.TownHall))
  const bastionDone = useSelector(getHasAchievedExpedition(ExpeditionType.Bastion))
  const [openedOverview, setOpenedOverview] = useState<ExpeditionType | null>(null)

  const handleMarkerClick = (type: ExpeditionType) => setOpenedOverview(type)
  const handleCloseOverview = () => setOpenedOverview(null)

  const renderOverview = (type: ExpeditionType) => {
    switch (type) {
      case ExpeditionType.Sawmill:
        return t('sawmillOverview')
      case ExpeditionType.MiseryMarket:
        return t('miseryMarketOverview')
      case ExpeditionType.TownHall:
        return t('townHallOverview')
      case ExpeditionType.Bastion:
        return t('bastionOverview')
    }
  }

  const renderReward = (type: ExpeditionType) => {
    switch (type) {
      case ExpeditionType.Sawmill:
        return <ResourceIcon type={ResourceType.Materials} />
      case ExpeditionType.MiseryMarket:
        return (
          <>
            <ResourceIcon type={ResourceType.Meat} marginRight="0.4rem" />
            <ResourceIcon type={ResourceType.Materials} />
          </>
        )
      case ExpeditionType.TownHall:
        return t('townHallRewardOverview')
      case ExpeditionType.Bastion:
        return <ResourceIcon type={ResourceType.Materials} />
    }
  }

  return (
    <ScreenWrapper backgroundUrl={mapBgUrl}>
      <OnboardingHighlight<HTMLButtonElement> step={OnboardingStep.StartSmall}>
        {({ ref, className, onClick }) => (
          <ExpeditionMarker
            ref={ref}
            className={className}
            type={ExpeditionType.Sawmill}
            x={25}
            y={-5}
            shown={!oldCoffinDone}
            onClick={type => {
              if (onClick) onClick()
              handleMarkerClick(type)
            }}
          />
        )}
      </OnboardingHighlight>
      <ExpeditionMarker
        type={ExpeditionType.MiseryMarket}
        x={5}
        y={25}
        shown={!miseryMarketDone && oldCoffinDone}
        onClick={handleMarkerClick}
      />
      <ExpeditionMarker
        type={ExpeditionType.TownHall}
        x={-5}
        y={-20}
        shown={!townHallDone && miseryMarketDone}
        onClick={handleMarkerClick}
      />
      <ExpeditionMarker
        type={ExpeditionType.Bastion}
        x={-20}
        y={5}
        shown={!bastionDone && townHallDone}
        onClick={handleMarkerClick}
      />
      <ExpeditionOverviewModal
        onClose={handleCloseOverview}
        type={openedOverview}
        renderOverview={renderOverview}
        renderReward={renderReward}
      />
    </ScreenWrapper>
  )
}
