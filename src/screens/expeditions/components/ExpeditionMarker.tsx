/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import frameUrl from '../../../assets/images/expeditions/expedition-frame.png'
import activeFrameUrl from '../../../assets/images/expeditions/expedition-frame-active.png'
import oldCoffinUrl from '../../../assets/images/expeditions/oldCoffin/old-coffin-marker.png'
import miseryMarketUrl from '../../../assets/images/expeditions/expedition2.png'
import townHallUrl from '../../../assets/images/expeditions/expedition3.png'
import bastionUrl from '../../../assets/images/expeditions/expedition4.png'
import { ExpeditionType } from '../../../config/constants'
import { Image } from '../../../components/images/Image'
import { contentCover } from '../../../styles/base'
import { resetButton } from '../../../styles/buttons'
import { openExpedition } from '../../../data/expeditions/actions'
import { getIsExpeditionActive } from '../../../data/expeditions/selectors'

const markerWrapper = (x: number, y: number, shown: boolean) => [
  resetButton,
  css({
    display: shown ? 'block' : 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: '1.5rem',
    transform: `translate(calc(-50% + ${x}rem), calc(-50% + ${y}rem))`,
  }),
]

const markerFrame = (active?: boolean) => [
  contentCover,
  css({
    backgroundImage: `url(${active ? activeFrameUrl : frameUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
]

const expeditionIconMap: Record<ExpeditionType, string> = {
  [ExpeditionType.OldCoffin]: oldCoffinUrl,
  [ExpeditionType.MiseryMarket]: miseryMarketUrl,
  [ExpeditionType.TownHall]: townHallUrl,
  [ExpeditionType.Bastion]: bastionUrl,
}

export type ExpeditionMarkerProps = {
  type: ExpeditionType
  x: number
  y: number
  shown: boolean
  active?: boolean
}

export const ExpeditionMarker = ({ type, x, y, shown }: ExpeditionMarkerProps) => {
  const dispatch = useDispatch()
  const active = useSelector(getIsExpeditionActive(type))

  const handleClick = () => dispatch(openExpedition(type))

  return (
    <Fragment>
      <button type="button" css={markerWrapper(x, y, shown)} onClick={handleClick}>
        <Image src={expeditionIconMap[type]} size="5rem" block />
        <div css={markerFrame(active)} />
      </button>
    </Fragment>
  )
}
