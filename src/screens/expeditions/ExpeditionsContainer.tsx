import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { css } from '@emotion/react'
import {
  BASTION_EXPEDITION,
  MAIN_HUB,
  MISERY_MARKET_EXPEDITION,
  SAWMILL_EXPEDITION,
  TOWN_HALL_EXPEDITION,
} from '../../config/routes'
import { Sawmill } from './Sawmill'
import { MiseryMarket } from './MiseryMarket'
import { TownHall } from './TownHall'
import { Bastion } from './Bastion'
import { getIsInExpedition } from '../../data/expeditions/selectors'
import { ExpeditionsHeader } from './components/ExpeditionsHeader'
import { ExpeditionsFooter } from './components/ExpeditionsFooter'
import backgroundImageUrl from '../../assets/images/background.jpg'
import { ScreenWrapper } from '../../components/ui/ScreenWrapper'
import { breakpoints } from '../../config/theme'
import { UndeadSacrifice } from '../../components/undeads/UndeadSacrifice'
import { LastUndeadDiedModal } from '../../components/undeads/LastUndeadDiedModal'

const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  margin: '-8rem 0 -5rem',
  padding: 0,
  height: 'calc(100% + 13rem)',
  overflow: 'hidden',

  [breakpoints.SM]: {
    margin: '-8rem 0 -7rem',
    height: 'calc(100% + 15rem)',
  },
})

export const ExpeditionsContainer = () => {
  const isInExpedition = useSelector(getIsInExpedition)

  if (!isInExpedition) {
    return <Redirect to={MAIN_HUB} />
  }

  return (
    <ScreenWrapper css={wrapper} backgroundUrl={backgroundImageUrl}>
      <ExpeditionsHeader />
      <Switch>
        <Route path={SAWMILL_EXPEDITION} exact component={Sawmill} />
        <Route path={MISERY_MARKET_EXPEDITION} exact component={MiseryMarket} />
        <Route path={TOWN_HALL_EXPEDITION} exact component={TownHall} />
        <Route path={BASTION_EXPEDITION} exact component={Bastion} />
      </Switch>
      <ExpeditionsFooter />
      <UndeadSacrifice />
      <LastUndeadDiedModal />
    </ScreenWrapper>
  )
}
