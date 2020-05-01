/** @jsx jsx */
import React from 'react'
import { useSelector } from 'react-redux'
import { css, jsx } from '@emotion/core'
import { ResetCSS } from '../components/ResetCSS'
import { Fonts } from '../components/Fonts'
import { GameContent } from './GameContent'
import { getIsOnboardingActive } from '../data/onboarding/selectors'
import { Intro } from '../screens/onboarding/Intro'
import { CheatsModal } from '../components/CheatsModal'
import { getUndeadCount } from '../data/undeads/selectors'
import { GameLost } from '../screens/gameEnd/GameLost'
import { GameWon } from '../screens/gameEnd/GameWon'
import { getIsBuildingsFullyUpgraded } from '../data/buildings/selectors'
import { colors } from '../config/theme'

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
  const isOnboardingActive = useSelector(getIsOnboardingActive)
  const undeadCount = useSelector(getUndeadCount)
  const isBuildingsFullyUpgraded = useSelector(getIsBuildingsFullyUpgraded)

  const getContent = () => {
    if (isOnboardingActive) {
      return <Intro />
    }
    if (isBuildingsFullyUpgraded) {
      return <GameWon />
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
