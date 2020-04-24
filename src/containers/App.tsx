/** @jsx jsx */
import React from 'react'
import { useSelector } from 'react-redux'
import { css, jsx } from '@emotion/core'
import backgroundImageUrl from '../assets/images/background.jpg'
import { ResetCSS } from '../components/ResetCSS'
import { Fonts } from '../components/Fonts'
import { GameContent } from './GameContent'
import { getIsOnboardingActive } from '../data/onboarding/selectors'
import { Intro } from '../screens/onboarding/Intro'
import { CheatsModal } from '../components/CheatsModal'
import { getUndeadCount } from '../data/undeads/selectors'
import { GameLost } from '../screens/gameEnd/GameLost'

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
  overflow: 'hidden',
})

export const App = () => {
  const isOnboardingActive = useSelector(getIsOnboardingActive)
  const undeadCount = useSelector(getUndeadCount)

  const getContent = () => {
    if (isOnboardingActive) {
      return <Intro />
    }
    if (undeadCount === 0) {
      return <GameLost />
    }
    return <GameContent />
  }

  return (
    <React.Fragment>
      <ResetCSS />
      <Fonts />
      <div css={appContainer}>
        <div css={gameContainer}>{getContent()}</div>
      </div>
      <CheatsModal />
    </React.Fragment>
  )
}
