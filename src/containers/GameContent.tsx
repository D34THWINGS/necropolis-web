import React from 'react'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import {
  MAIN_HUB,
  CATACOMBS,
  CHARNEL_HOUSE,
  EXPEDITIONS,
  OSSUARY,
  SOUL_WELL,
  PALADINS_ASSAULT,
  ARSENAL,
} from '../config/routes'
import { Header } from '../components/header/Header'
import { MainHub } from '../screens/mainHub/MainHub'
import { Expeditions } from '../screens/expeditions/Expeditions'
import { Catacombs } from '../screens/buildings/Catacombs'
import { Ossuary } from '../screens/buildings/Ossuary'
import { SoulWell } from '../screens/buildings/SoulWell'
import { CharnelHouse } from '../screens/buildings/CharnelHouse'
import { NavigationBar } from '../components/NavigationBar'
import { UndeadOverlay } from '../components/undeads/UndeadOverlay'
import { UndeadUpkeep } from '../components/undeads/UndeadUpkeep'
import { EventModal } from '../screens/events/EventModal'
import { UndeadSacrifice } from '../components/undeads/UndeadSacrifice'
import { getOpenedExpedition } from '../data/expeditions/selectors'
import { DiscoverSpellModal } from '../components/spells/DiscoverSpellModal'
import { TalentsModalProvider } from '../components/talents/TalentsModalProvider'
import { transitions } from '../config/theme'
import { PhaseOverlay } from '../components/PhaseOverlay'
import { OnboardingModal } from '../screens/onboarding/components/OnboardingModal'
import { OnboardingHighlightStyles } from '../screens/onboarding/components/OnboardingHighlight'
import { getPaladinsAssaultOngoing } from '../data/paladins/selectors'
import { Arsenal } from '../screens/buildings/Arsenal'

const gameContent = css({
  position: 'relative',
  width: '100%',
  height: '100%',
})

const middleSection = css({
  height: '100%',
})

export const GameContent = () => {
  const expeditionsMatch = useRouteMatch(EXPEDITIONS)
  const openedExpedition = useSelector(getOpenedExpedition)
  const isAssaultOngoing = useSelector(getPaladinsAssaultOngoing)
  const location = useLocation()

  if (openedExpedition !== null && !expeditionsMatch) {
    return <Redirect to={EXPEDITIONS} />
  }

  if (isAssaultOngoing) {
    return <Redirect to={PALADINS_ASSAULT} />
  }

  return (
    <TalentsModalProvider>
      <div css={gameContent}>
        <TransitionGroup css={middleSection}>
          <CSSTransition key={location.pathname} timeout={transitions.SLOW_DURATION}>
            <Switch location={location}>
              <Route path={MAIN_HUB} exact component={MainHub} />
              <Route path={EXPEDITIONS} exact component={Expeditions} />
              <Route path={CATACOMBS} exact component={Catacombs} />
              <Route path={OSSUARY} exact component={Ossuary} />
              <Route path={SOUL_WELL} exact component={SoulWell} />
              <Route path={CHARNEL_HOUSE} exact component={CharnelHouse} />
              <Route path={ARSENAL} exact component={Arsenal} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <NavigationBar />
        <PhaseOverlay />
        <Header />
      </div>
      <UndeadUpkeep />
      <EventModal />
      <UndeadOverlay />
      <UndeadSacrifice />
      <DiscoverSpellModal />
      <OnboardingModal />
      <OnboardingHighlightStyles />
    </TalentsModalProvider>
  )
}
