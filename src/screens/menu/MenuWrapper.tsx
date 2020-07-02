import React from 'react'
import { css } from '@emotion/core'
import { Route, Switch } from 'react-router'
import backgroundImageUrl from '../../assets/images/background.jpg'
import { ScreenWrapper } from '../../components/ui/ScreenWrapper'
import { MainMenu } from './MainMenu'
import { NEW_GAME } from '../../config/routes'
import { NewGameMenu } from './NewGameMenu'

const menuWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-end',
  marginTop: '-4rem',
  height: 'calc(100% + 4rem)',
})

export const MenuWrapper = () => (
  <ScreenWrapper css={menuWrapper} backgroundUrl={backgroundImageUrl}>
    <Switch>
      <Route path={NEW_GAME} component={NewGameMenu} />
      <MainMenu />
    </Switch>
  </ScreenWrapper>
)
