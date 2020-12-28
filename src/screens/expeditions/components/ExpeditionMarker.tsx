import React, { forwardRef, Ref, useRef } from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import frameUrl from '../../../assets/images/expeditions/expedition-frame.png'
import activeFrameUrl from '../../../assets/images/expeditions/expedition-frame-active.png'
import oldCoffinUrl from '../../../assets/images/expeditions/oldCoffin/old-coffin-marker.png'
import miseryMarketUrl from '../../../assets/images/expeditions/miseryMarket/misery-market-marker.png'
import townHallUrl from '../../../assets/images/expeditions/townHall/town-hall-marker.png'
import bastionUrl from '../../../assets/images/expeditions/bastion/bastion-marker.png'
import { ExpeditionType } from '../../../config/constants'
import { Image } from '../../../components/images/Image'
import { contentCover } from '../../../styles/base'
import { resetButton } from '../../../styles/buttons'
import { openExpedition } from '../../../data/expeditions/actions'
import { getIsExpeditionActive } from '../../../data/expeditions/selectors'
import { fadeIn } from '../../../styles/animations'
import { transitions } from '../../../config/theme'

const markerWrapper = (x: number, y: number, shown: boolean, animate: boolean) => [
  resetButton,
  css({
    display: shown ? 'block' : 'none',
    position: 'absolute',
    top: `${y + 50}%`,
    left: `${x + 50}%`,
    padding: '1.5rem',
    width: '8rem',
    height: '8rem',
    transform: 'translate(-50%, -50%)',
    ...(animate
      ? {
          animation: `${fadeIn} ${transitions.SLOW}`,
          animationDelay: '350ms',
          animationFillMode: 'both',
        }
      : undefined),
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
  className?: string
  onClick?: () => void
}

export const ExpeditionMarker = forwardRef(
  ({ type, x, y, shown, className, onClick }: ExpeditionMarkerProps, ref: Ref<HTMLButtonElement>) => {
    const dispatch = useDispatch()
    const active = useSelector(getIsExpeditionActive(type))
    const shouldAnimateRef = useRef(!shown)

    const handleClick = () => {
      dispatch(openExpedition(type))
      if (onClick) {
        onClick()
      }
    }

    return (
      <button
        ref={ref}
        className={className}
        type="button"
        css={markerWrapper(x, y, shown, shouldAnimateRef.current)}
        onClick={handleClick}
        data-test-id="expeditionMarker"
      >
        <Image src={expeditionIconMap[type]} size="5rem" block />
        <div css={markerFrame(active)} />
      </button>
    )
  },
)
