import React from 'react'
import { useSelector } from 'react-redux'
import { OldCoffin } from './OldCoffin'
import { ExpeditionMarker } from './components/ExpeditionMarker'
import { ExpeditionType, OnboardingStep } from '../../config/constants'
import { getHasAchievedExpedition } from '../../data/expeditions/selectors'
import { MiseryMarket } from './MiseryMarket'
import { TownHall } from './TownHall'
import { Bastion } from './Bastion'
import { ScreenWrapper } from '../../components/ui/ScreenWrapper'
import mapBgUrl from '../../assets/images/expeditions/map.jpg'
import { OnboardingHighlight } from '../onboarding/components/OnboardingHighlight'

export const Expeditions = () => {
  const oldCoffinDone = useSelector(getHasAchievedExpedition(ExpeditionType.OldCoffin))
  const miseryMarketDone = useSelector(getHasAchievedExpedition(ExpeditionType.MiseryMarket))
  const townHallDone = useSelector(getHasAchievedExpedition(ExpeditionType.TownHall))
  const bastionDone = useSelector(getHasAchievedExpedition(ExpeditionType.Bastion))

  return (
    <ScreenWrapper backgroundUrl={mapBgUrl}>
      <OnboardingHighlight step={OnboardingStep.StartSmall}>
        {({ ref, className, onClick }) => (
          <ExpeditionMarker
            ref={ref}
            className={className}
            type={ExpeditionType.OldCoffin}
            x={6}
            y={1}
            shown={!oldCoffinDone}
            onClick={onClick}
          />
        )}
      </OnboardingHighlight>
      <OldCoffin />
      <ExpeditionMarker type={ExpeditionType.MiseryMarket} x={5} y={12} shown={!miseryMarketDone && oldCoffinDone} />
      <MiseryMarket />
      <ExpeditionMarker type={ExpeditionType.TownHall} x={-5} y={-12} shown={!townHallDone && miseryMarketDone} />
      <TownHall />
      <ExpeditionMarker type={ExpeditionType.Bastion} x={-3} y={5} shown={!bastionDone && townHallDone} />
      <Bastion />
    </ScreenWrapper>
  )
}
