import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { OldCoffin } from './OldCoffin'
import { ExpeditionMarker } from './components/ExpeditionMarker'
import { ExpeditionType } from '../../config/constants'
import { getHasAchievedExpedition } from '../../data/expeditions/selectors'
import { MiseryMarket } from './MiseryMarket'

export const Expeditions = () => {
  const oldCoffinDone = useSelector(getHasAchievedExpedition(ExpeditionType.OldCoffin))
  const miseryMarketDone = useSelector(getHasAchievedExpedition(ExpeditionType.MiseryMarket))
  const townHallDone = useSelector(getHasAchievedExpedition(ExpeditionType.TownHall))
  const bastionDone = useSelector(getHasAchievedExpedition(ExpeditionType.Bastion))

  return (
    <Fragment>
      {!oldCoffinDone && (
        <ExpeditionMarker type={ExpeditionType.OldCoffin} x={6} y={1}>
          <OldCoffin />
        </ExpeditionMarker>
      )}
      {!miseryMarketDone && oldCoffinDone && (
        <ExpeditionMarker type={ExpeditionType.MiseryMarket} x={5} y={12}>
          <MiseryMarket />
        </ExpeditionMarker>
      )}
      {!townHallDone && miseryMarketDone && <ExpeditionMarker type={ExpeditionType.TownHall} x={-5} y={-12} />}
      {!bastionDone && townHallDone && <ExpeditionMarker type={ExpeditionType.Bastion} x={-3} y={5} />}
    </Fragment>
  )
}
