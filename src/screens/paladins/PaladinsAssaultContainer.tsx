import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'
import {
  MAIN_HUB,
  PALADINS_ASSAULT,
  PALADINS_ASSAULT_FIGHT,
  PALADINS_ASSAULT_PREPARE,
  PALADINS_ASSAULT_RESULTS,
  PALADINS_ASSAULT_REVEAL,
} from '../../config/routes'
import { PaladinsAssaultReveal } from './PaladinsAssaultReveal'
import { PaladinsAssaultPrepare } from './PaladinsAssaultPrepare'
import { PaladinsAssaultFight } from './PaladinsAssaultFight'
import { PaladinsAssaultPhase } from '../../config/constants'
import { getPaladinsAssault } from '../../data/paladins/selectors'
import backgroundImageUrl from '../../assets/images/background.jpg'
import { ScreenWrapper } from '../../components/ui/ScreenWrapper'
import { PaladinsAssaultHeader } from './components/PaladinsAssaultHeader'
import { breakpoints } from '../../config/theme'
import { PaladinsAssaultFooter } from './components/PaladinsAssaultFooter'
import { PaladinsAssaultResults } from './PaladinsAssaultResults'

const assaultWrapper = css({
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

export const PaladinsAssaultContainer = () => {
  const match = useRouteMatch<{ phase: PaladinsAssaultPhase }>(`${PALADINS_ASSAULT}/:phase?`)
  const assault = useSelector(getPaladinsAssault)

  if (!assault) {
    return <Redirect to={MAIN_HUB} />
  }

  const assaultPhase = assault.phase
  if (match && match.params.phase !== assaultPhase) {
    return <Redirect to={`${PALADINS_ASSAULT}/${assaultPhase}`} />
  }

  return (
    <ScreenWrapper css={assaultWrapper} backgroundUrl={backgroundImageUrl}>
      <PaladinsAssaultHeader assaultPhase={assaultPhase} deck={assault.deck} />
      <Switch>
        <Route path={PALADINS_ASSAULT_REVEAL} component={PaladinsAssaultReveal} />
        <Route path={PALADINS_ASSAULT_PREPARE} component={PaladinsAssaultPrepare} />
        <Route path={PALADINS_ASSAULT_FIGHT} component={PaladinsAssaultFight} />
        <Route path={PALADINS_ASSAULT_RESULTS} component={PaladinsAssaultResults} />
      </Switch>
      <PaladinsAssaultFooter />
    </ScreenWrapper>
  )
}
