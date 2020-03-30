/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import backgroundImageUrl from '../assets/images/background.jpg'
import { Redirect, Route, Switch } from 'react-router'
import { BUILD, HOME } from '../config/routes'
import { Build } from '../screens/build/Build'
import { NavigationBar } from '../components/NavigationBar'
import { Header } from '../components/header/Header'
import { ResetCSS } from '../components/ResetCSS'
import { Fonts } from '../components/Fonts'

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
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  maxWidth: '27.5rem',
  height: '100vh',
  maxHeight: '50rem',
})

const middleSection = css({
  flex: 1,
  overflowY: 'auto',
})

export const App = () => (
  <React.Fragment>
    <ResetCSS />
    <Fonts />
    <div css={appContainer}>
      <div css={gameContainer}>
        <Header />
        <div css={middleSection}>
          <Switch>
            <Route path={BUILD} component={Build} />
            <Redirect from={HOME} to={BUILD} />
          </Switch>
        </div>
        <NavigationBar />
      </div>
    </div>
  </React.Fragment>
)
