/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router'
import { useEffect } from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import {
  BATTLEMENTS,
  MAIN_HUB,
  CATACOMBS,
  CHARNEL_HOUSE,
  EXPEDITIONS,
  OSSUARY,
  SOUL_WELL,
  MAIN_MENU,
} from '../config/routes'
import { Header } from '../components/header/Header'
import { MainHub } from '../screens/mainHub/MainHub'
import { Expeditions } from '../screens/expeditions/Expeditions'
import { Catacombs } from '../screens/buildings/Catacombs'
import { Ossuary } from '../screens/buildings/Ossuary'
import { SoulWell } from '../screens/buildings/SoulWell'
import { Battlements } from '../screens/buildings/Battlements'
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
import { getHasActiveGame } from '../data/settings/selectors'
import { getUndeadCount } from '../data/undeads/selectors'
import { getIsBuildingsFullyUpgraded } from '../data/buildings/selectors'
import { ResourcesModalProvider } from '../components/resources/ResourcesModalProvider'

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
  const hasActiveGame = useSelector(getHasActiveGame)
  const undeadCount = useSelector(getUndeadCount)
  const isBuildingsFullyUpgraded = useSelector(getIsBuildingsFullyUpgraded)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (openedExpedition !== null && !expeditionsMatch) {
      history.replace(EXPEDITIONS)
    }
  }, [openedExpedition, history, expeditionsMatch])

  if (!hasActiveGame && undeadCount !== 0 && !isBuildingsFullyUpgraded) {
    return <Redirect to={MAIN_MENU} />
  }

  return (
    <TalentsModalProvider>
      <ResourcesModalProvider>
        <div css={gameContent}>
          <TransitionGroup css={middleSection}>
            <CSSTransition key={location.pathname} timeout={transitions.SLOW_DURATION}>
              <Switch location={location}>
                <Route path={MAIN_HUB} exact component={MainHub} />
                <Route path={EXPEDITIONS} exact component={Expeditions} />
                <Route path={CATACOMBS} exact component={Catacombs} />
                <Route path={OSSUARY} exact component={Ossuary} />
                <Route path={SOUL_WELL} exact component={SoulWell} />
                <Route path={BATTLEMENTS} exact component={Battlements} />
                <Route path={CHARNEL_HOUSE} exact component={CharnelHouse} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <PhaseOverlay />
          <Header />
          <NavigationBar />
        </div>
        <UndeadUpkeep />
        <EventModal />
        <UndeadOverlay />
        <UndeadSacrifice />
        <DiscoverSpellModal />
        <OnboardingModal />
        <OnboardingHighlightStyles />
      </ResourcesModalProvider>
    </TalentsModalProvider>
  )
}
