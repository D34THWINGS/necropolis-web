/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { Fragment, useEffect } from 'react'
import { BATTLEMENTS, MAIN_HUB, CATACOMBS, CHARNEL_HOUSE, EXPEDITIONS, OSSUARY, SOUL_WELL } from '../config/routes'
import mapBgUrl from '../assets/images/expeditions/map.jpg'
import charnelHouseBgUrl from '../assets/images/buildings/charnel-house-bg.jpg'
import { Header } from '../components/header/Header'
import { MainHub } from '../screens/mainHub/MainHub'
import { Expeditions } from '../screens/expeditions/Expeditions'
import { Catacombs } from '../screens/buildings/Catacombs'
import { Ossuary } from '../screens/buildings/Ossuary'
import { SoulWell } from '../screens/buildings/SoulWell'
import { Battlements } from '../screens/buildings/Battlements'
import { CharnelHouse } from '../screens/buildings/CharnelHouse'
import { NavigationBar } from '../components/NavigationBar'
import { UndeadOverlay } from '../components/undeads/UndeadOverlay'
import { UndeadUpkeep } from '../components/undeads/UndeadUpkeep'
import { contentCover } from '../styles/base'
import { EventModal } from '../screens/events/EventModal'
import { UndeadSacrifice } from '../components/undeads/UndeadSacrifice'
import { getOpenedExpedition } from '../data/expeditions/selectors'
import { fadeIn } from '../styles/animations'
import { DiscoverSpellModal } from '../components/spells/DiscoverSpellModal'
import { ReanimatedUndeadModal } from '../screens/buildings/components/ReanimatedUndeadModal'

const gameContent = css({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  height: '100%',
})

const middleSection = css({
  flex: 1,
  overflowY: 'auto',
})

const buildingsBackground = (backgroundUrl: string) => [
  contentCover,
  css({
    animationName: fadeIn,
    animationDuration: '200ms',
    animationTimingFunction: 'ease-in-out',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
]

export const GameContent = () => {
  const expeditionsMatch = useRouteMatch(EXPEDITIONS)
  const openedExpedition = useSelector(getOpenedExpedition)
  const history = useHistory()

  useEffect(() => {
    if (openedExpedition !== null && !expeditionsMatch) {
      history.replace(EXPEDITIONS)
    }
  }, [openedExpedition, history, expeditionsMatch])

  return (
    <Fragment>
      <Switch>
        <Route path={MAIN_HUB} exact />
        <Route path={EXPEDITIONS} render={() => <div css={buildingsBackground(mapBgUrl)} />} />
        <Route render={() => <div css={buildingsBackground(charnelHouseBgUrl)} />} />
      </Switch>
      <div css={gameContent}>
        <Header />
        <div css={middleSection}>
          <Switch>
            <Route path={MAIN_HUB} exact component={MainHub} />
            <Route path={EXPEDITIONS} exact component={Expeditions} />
            <Route path={CATACOMBS} exact component={Catacombs} />
            <Route path={OSSUARY} exact component={Ossuary} />
            <Route path={SOUL_WELL} exact component={SoulWell} />
            <Route path={BATTLEMENTS} exact component={Battlements} />
            <Route path={CHARNEL_HOUSE} exact component={CharnelHouse} />
          </Switch>
        </div>
        <NavigationBar />
        <UndeadUpkeep />
        <EventModal />
        <UndeadOverlay />
        <UndeadSacrifice />
        <DiscoverSpellModal />
        <ReanimatedUndeadModal />
      </div>
    </Fragment>
  )
}
