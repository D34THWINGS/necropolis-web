/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core'
import { Redirect, Route, Switch } from 'react-router'
import { Fragment } from 'react'
import { BATTLEMENTS, BUILD, CATACOMBS, CHARNEL_HOUSE, EXPEDITIONS, HOME, OSSUARY, SOUL_WELL } from '../config/routes'
import mapBgUrl from '../assets/images/map.jpg'
import charnelHouseBgUrl from '../assets/images/charnel-house-bg.jpg'
import { Header } from '../components/header/Header'
import { Build } from '../screens/build/Build'
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

export const GameContent = () => (
  <Fragment>
    <Switch>
      <Route path={BUILD} />
      <Route path={EXPEDITIONS} render={() => <div css={buildingsBackground(mapBgUrl)} />} />
      <Route render={() => <div css={buildingsBackground(charnelHouseBgUrl)} />} />
    </Switch>
    <div css={gameContent}>
      <Switch>
        <Route path={EXPEDITIONS} />
        <Header />
      </Switch>
      <div css={middleSection}>
        <Switch>
          <Route path={BUILD} component={Build} />
          <Route path={EXPEDITIONS} component={Expeditions} />
          <Route path={CATACOMBS} component={Catacombs} />
          <Route path={OSSUARY} component={Ossuary} />
          <Route path={SOUL_WELL} component={SoulWell} />
          <Route path={BATTLEMENTS} component={Battlements} />
          <Route path={CHARNEL_HOUSE} component={CharnelHouse} />
          <Redirect from={HOME} to={BUILD} />
        </Switch>
      </div>
      <NavigationBar />
      <UndeadUpkeep />
      <EventModal />
      <UndeadOverlay />
    </div>
  </Fragment>
)
