/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { Fragment, useEffect } from 'react'
import { BATTLEMENTS, MAIN_HUB, CATACOMBS, CHARNEL_HOUSE, EXPEDITIONS, OSSUARY, SOUL_WELL } from '../config/routes'
import mapBgUrl from '../assets/images/expeditions/map.jpg'
import charnelHouseBgUrl from '../assets/images/buildings/charnel-house-bg.jpg'
import { Header } from '../components/header/Header'
import { MainHub } from '../screens/mainHub/MainHub'
import { Expeditions } from '../screens/expeditions/Expeditions'
import { Catacombs } from '../screens/buildings/Catacombs'
import { Ossuary } from '../screens/buildings/Ossuary'
import { SoulWell } from '../screens/buildings/SoulWell'
import { Battlements } from '../screens/buildings/Battlements'
import { CharnelHouse } from '../screens/buildings/CharnelHouse'
import { NavigationBar } from '../components/NavigationBar'
import { UndeadOverlay } from '../components/undeadOverlay/UndeadOverlay'
import { UndeadUpkeep } from '../components/undeadOverlay/UndeadUpkeep'
import { contentCover } from '../styles/base'
import { EventModal } from '../screens/events/EventModal'
import { UndeadSacrifice } from '../components/undeadOverlay/UndeadSacrifice'
import { getOpenedExpedition } from '../data/expeditions/selectors'

const gameContent = css({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  height: '100%',
})

const middleSection = css({
  flex: 1,
  overflowY: 'auto',
})

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },

  to: {
    opacity: 1,
  },
})

const buildingsBackground = (backgroundUrl: string) => [
  contentCover,
  css({
    animationName: fadeIn,
    animationDuration: '200ms',
    animationTimingFunction: 'ease-in-out',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
]

export const GameContent = () => {
  const expeditionsMatch = useRouteMatch(EXPEDITIONS)
  const openedExpedition = useSelector(getOpenedExpedition)
  const history = useHistory()

  useEffect(() => {
    if (openedExpedition !== null && !expeditionsMatch) {
      history.replace(EXPEDITIONS)
    }
  }, [openedExpedition, history, expeditionsMatch])

  return (
    <Fragment>
      <Switch>
        <Route path={MAIN_HUB} exact />
        <Route path={EXPEDITIONS} render={() => <div css={buildingsBackground(mapBgUrl)} />} />
        <Route render={() => <div css={buildingsBackground(charnelHouseBgUrl)} />} />
      </Switch>
      <div css={gameContent}>
        <Header />
        <div css={middleSection}>
          <Switch>
            <Route path={MAIN_HUB} exact component={MainHub} />
            <Route path={EXPEDITIONS} exact component={Expeditions} />
            <Route path={CATACOMBS} exact component={Catacombs} />
            <Route path={OSSUARY} exact component={Ossuary} />
            <Route path={SOUL_WELL} exact component={SoulWell} />
            <Route path={BATTLEMENTS} exact component={Battlements} />
            <Route path={CHARNEL_HOUSE} exact component={CharnelHouse} />
          </Switch>
        </div>
        <NavigationBar />
        <UndeadUpkeep />
        <EventModal />
        <UndeadOverlay />
        <UndeadSacrifice />
      </div>
    </Fragment>
  )
}
