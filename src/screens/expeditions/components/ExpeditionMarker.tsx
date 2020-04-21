/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import frameUrl from '../../../assets/images/expeditions/expedition-frame.png'
import activeFrameUrl from '../../../assets/images/expeditions/expedition-frame-active.png'
import oldCoffinUrl from '../../../assets/images/expeditions/expedition1.png'
import miseryMarketUrl from '../../../assets/images/expeditions/expedition2.png'
import townHallUrl from '../../../assets/images/expeditions/expedition3.png'
import bastionUrl from '../../../assets/images/expeditions/expedition4.png'
import { ExpeditionType } from '../../../config/constants'
import { Icon } from '../../../components/icons/Icon'
import { contentCover } from '../../../styles/base'
import { resetButton } from '../../../styles/buttons'
import { openExpedition } from '../../../data/expeditions/actions'
import { getIsExpeditionActive } from '../../../data/expeditions/selectors'

const markerWrapper = (x: number, y: number) => [
  resetButton,
  css({
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
  active?: boolean
  children?: ReactNode
}

export const ExpeditionMarker = ({ type, x, y, children }: ExpeditionMarkerProps) => {
  const dispatch = useDispatch()
  const active = useSelector(getIsExpeditionActive(type))

  const handleClick = () => dispatch(openExpedition(type))

  return (
    <Fragment>
      <button type="button" css={markerWrapper(x, y)} onClick={handleClick}>
        <Icon src={expeditionIconMap[type]} size="5rem" block />
        <div css={markerFrame(active)} />
      </button>
      {children}
    </Fragment>
  )
}
