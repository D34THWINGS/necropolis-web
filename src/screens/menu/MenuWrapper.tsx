import React from 'react'
import { Route, Switch } from 'react-router'
import { MainMenu } from './MainMenu'
import { NEW_GAME } from '../../config/routes'
import { NewGameMenu } from './NewGameMenu'

export const MenuWrapper = () => (
  <Switch>
    <Route path={NEW_GAME} component={NewGameMenu} />
    <MainMenu />
  </Switch>
)
