import React from 'react'
import { useSelector } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import { useRouteMatch } from 'react-router'
import { css } from '@emotion/core'
import { ResetCSS } from '../components/ResetCSS'
import { Fonts } from '../components/Fonts'
import { GameContent } from './GameContent'
import { getIsIntroActive } from '../data/onboarding/selectors'
import { Intro } from '../screens/onboarding/Intro'
import { CheatsModal } from '../components/CheatsModal'
import { getUndeadCount } from '../data/undeads/selectors'
import { GameLost } from '../screens/gameEnd/GameLost'
import { GameWon } from '../screens/gameEnd/GameWon'
import { getIsBuildingsFullyUpgraded } from '../data/buildings/selectors'
import { colors, transitions } from '../config/theme'
import { MAIN_MENU, NEW_GAME } from '../config/routes'
import { MenuWrapper } from '../screens/menu/MenuWrapper'
import { getHasActiveGame } from '../data/settings/selectors'
import { ErrorBoundary } from './ErrorBoundary'

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

export const App = () => {
  const matchMainMenu = useRouteMatch({ path: MAIN_MENU, exact: true })
  const matchNewGame = useRouteMatch({ path: NEW_GAME, exact: true })
  const hasActiveGame = useSelector(getHasActiveGame)
  const isOnboardingActive = useSelector(getIsIntroActive)
  const undeadCount = useSelector(getUndeadCount)
  const isBuildingsFullyUpgraded = useSelector(getIsBuildingsFullyUpgraded)

  const isOnMainMenu = !!matchMainMenu || !!matchNewGame

  const getContent = () => {
    if (isOnMainMenu) {
      return (
        <CSSTransition key="menu" timeout={transitions.SLOW_DURATION}>
          <MenuWrapper />
        </CSSTransition>
      )
    }
    if (isOnboardingActive && hasActiveGame) {
      return (
        <CSSTransition key="intro" timeout={transitions.SLOW_DURATION}>
          <Intro />
        </CSSTransition>
      )
    }
    if (isBuildingsFullyUpgraded) {
      return (
        <CSSTransition key="won" timeout={transitions.SLOW_DURATION}>
          <GameWon />
        </CSSTransition>
      )
    }
    if (undeadCount === 0) {
      return (
        <CSSTransition key="lost" timeout={transitions.SLOW_DURATION}>
          <GameLost />
        </CSSTransition>
      )
    }
    return (
      <CSSTransition key="game" timeout={transitions.SLOW_DURATION}>
        <GameContent />
      </CSSTransition>
    )
  }

  return (
    <>
      <ResetCSS />
      <Fonts />
      <ErrorBoundary>
        <div css={appContainer}>
          <TransitionGroup css={gameContainer}>{getContent()}</TransitionGroup>
        </div>
        <CheatsModal />
      </ErrorBoundary>
    </>
  )
}
