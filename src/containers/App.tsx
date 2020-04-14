/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import backgroundImageUrl from '../assets/images/background.jpg'
import { Redirect, Route, Switch } from 'react-router'
import { BUILD, EXPEDITIONS, HOME, OSSUARY, CATACOMBS, SOUL_WELL, BATTLEMENTS, CHARNEL_HOUSE } from '../config/routes'
import { Build } from '../screens/build/Build'
import { NavigationBar } from '../components/NavigationBar'
import { Header } from '../components/header/Header'
import { ResetCSS } from '../components/ResetCSS'
import { Fonts } from '../components/Fonts'
import { Expeditions } from '../screens/expeditions/Expeditions'
import { Catacombs } from '../screens/buildings/Catacombs'
import { Ossuary } from '../screens/buildings/Ossuary'
import { SoulWell } from '../screens/buildings/SoulWell'
import { Battlements } from '../screens/buildings/Battlements'
import { CharnelHouse } from '../screens/buildings/CharnelHouse'
import charnelHouseBgUrl from '../assets/images/charnel-house-bg.jpg'
import { contentCover } from '../styles/base'

const appContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
})

const gameContainer = css({
  position: 'relative',
  width: '100vw',
  maxWidth: '27.5rem',
  height: '100vh',
  maxHeight: '50rem',
})

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

const buildingsBackground = [
  contentCover,
  css({
    backgroundImage: `url(${charnelHouseBgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
]

export const App = () => {
  return (
    <React.Fragment>
      <ResetCSS />
      <Fonts />
      <div css={appContainer}>
        <div css={gameContainer}>
          <Switch>
            <Route path={[EXPEDITIONS, BUILD]} />
            <Route render={() => <div css={buildingsBackground} />} />
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
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
