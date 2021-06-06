import React from 'react'
import { css } from '@emotion/react'
import { Route, Switch } from 'react-router'
import { ResetCSS } from '../components/ResetCSS'
import { Fonts } from '../components/Fonts'
import { CheatsModal } from '../components/CheatsModal'
import { colors } from '../config/theme'
import { ErrorBoundary } from './ErrorBoundary'
import { MAIN_MENU, NEW_GAME } from '../config/routes'
import { GameRoutes } from './GameRoutes'
import { MenuWrapper } from '../screens/menu/MenuWrapper'

const appContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  backgroundColor: colors.GREY,
})

const gameContainer = css({
  position: 'relative',
  width: '100%',
  maxWidth: '30rem',
  height: '100%',
  maxHeight: '60rem',
  overflow: 'hidden',
})

export const App = () => (
  <>
    <ResetCSS />
    <Fonts />
    <ErrorBoundary>
      <div css={appContainer}>
        <div css={gameContainer}>
          <Switch>
            <Route path={[MAIN_MENU, NEW_GAME]} exact component={MenuWrapper} />
            <Route component={GameRoutes} />
          </Switch>
          <div id="modal-root" />
        </div>
      </div>
      <CheatsModal />
    </ErrorBoundary>
  </>
)
