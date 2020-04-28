/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router'
import { Fragment, useEffect, useRef } from 'react'
import anime from 'animejs'
import SwitchTransition from 'react-transition-group/SwitchTransition'
import Transition from 'react-transition-group/Transition'
import { BATTLEMENTS, MAIN_HUB, CATACOMBS, CHARNEL_HOUSE, EXPEDITIONS, OSSUARY, SOUL_WELL } from '../config/routes'
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
import { ReanimatedUndeadModal } from '../screens/buildings/components/ReanimatedUndeadModal'

const gameContent = css({
  position: 'relative',
  width: '100%',
  height: '100%',
})

const middleSection = css({
  height: '100%',
})

const easing = 'easeInOutCirc'

const slideIn = (node: HTMLElement) =>
  anime({
    targets: node,
    duration: 250,
    translateX: ['-100%', '0%'],
    easing,
  })

const reverseSlideIn = (node: HTMLElement) =>
  anime({
    targets: node,
    duration: 250,
    translateX: ['100%', '0%'],
    easing,
  })

const routesOrder = [MAIN_HUB, EXPEDITIONS, CATACOMBS, OSSUARY]

export const GameContent = () => {
  const expeditionsMatch = useRouteMatch(EXPEDITIONS)
  const openedExpedition = useSelector(getOpenedExpedition)
  const history = useHistory()
  const location = useLocation()
  const oldLocationRef = useRef(location.pathname)

  useEffect(() => {
    if (openedExpedition !== null && !expeditionsMatch) {
      history.replace(EXPEDITIONS)
    }
  }, [openedExpedition, history, expeditionsMatch])

  const reverse = routesOrder.indexOf(oldLocationRef.current) < routesOrder.indexOf(location.pathname)
  useEffect(() => {
    oldLocationRef.current = location.pathname
  }, [location.pathname])

  return (
    <Fragment>
      <div css={gameContent}>
        <SwitchTransition css={middleSection} mode="in-out">
          <Transition key={location.pathname} timeout={250} onEnter={reverse ? reverseSlideIn : slideIn}>
            <Switch location={location}>
              <Route path={MAIN_HUB} exact component={MainHub} />
              <Route path={EXPEDITIONS} exact component={Expeditions} />
              <Route path={CATACOMBS} exact component={Catacombs} />
              <Route path={OSSUARY} exact component={Ossuary} />
              <Route path={SOUL_WELL} exact component={SoulWell} />
              <Route path={BATTLEMENTS} exact component={Battlements} />
              <Route path={CHARNEL_HOUSE} exact component={CharnelHouse} />
            </Switch>
          </Transition>
        </SwitchTransition>
        <Header />
        <NavigationBar />
        <UndeadUpkeep />
        <EventModal />
        <UndeadOverlay />
        <UndeadSacrifice />
        <DiscoverSpellModal />
        <ReanimatedUndeadModal />
      </div>
    </Fragment>
  )
}
