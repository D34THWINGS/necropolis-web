import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { useSelector } from 'react-redux'
import { GameState } from '../config/constants'
import { GameWon } from '../screens/gameEnd/GameWon'
import { GameLost } from '../screens/gameEnd/GameLost'
import { getGameState } from '../data/turn/selectors'
import { GameContent } from './GameContent'
import { MAIN_MENU, PALADINS_ASSAULT } from '../config/routes'
import { PaladinsAssaultContainer } from '../screens/paladins/PaladinsAssaultContainer'
import { Intro } from '../screens/onboarding/Intro'
import { getIsIntroActive } from '../data/onboarding/selectors'
import { getHasActiveGame } from '../data/settings/selectors'
import { ResourcesModalProvider } from '../components/resources/ResourcesModalProvider'

export const GameRoutes = () => {
  const hasActiveGame = useSelector(getHasActiveGame)
  const gameState = useSelector(getGameState)
  const isIntroActive = useSelector(getIsIntroActive)

  if (gameState === GameState.Win) {
    return <GameWon />
  }
  if (gameState === GameState.Loose) {
    return <GameLost />
  }

  if (!hasActiveGame) {
    return <Redirect to={MAIN_MENU} />
  }

  if (isIntroActive) {
    return <Intro />
  }

  return (
    <ResourcesModalProvider>
      <Switch>
        <Route path={PALADINS_ASSAULT} component={PaladinsAssaultContainer} />
        <Route component={GameContent} />
      </Switch>
    </ResourcesModalProvider>
  )
}
