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
  return (
    <React.Fragment>
      <ResetCSS />
      <Fonts />
      <div css={appContainer}>
        <div css={gameContainer}>{isOnboardingActive ? <Intro /> : <GameContent />}</div>
      </div>
    </React.Fragment>
  )
}
