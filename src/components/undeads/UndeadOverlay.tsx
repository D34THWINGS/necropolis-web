/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { colors, layers, shadows, transitions } from '../../config/theme'
import { ModalColor, modalColorsMap, useModalState } from '../ui/Modal'
import overlayOpenUrl from '../../assets/images/overlay-open.png'
import overlayCloseUrl from '../../assets/images/overlay-close.png'
import { resetButton } from '../../styles/buttons'
import { useTranslation } from '../../lang/useTranslation'
import { getUndeads, getUpkeep } from '../../data/undeads/selectors'
import { contentCover, h2Title } from '../../styles/base'
import { ResourceIcon } from '../images/ResourceIcon'
import { ResourceType, UndeadType } from '../../config/constants'
import { UndeadBox } from './UndeadBox'
import { banUndead } from '../../data/undeads/actions'

const undeadOverlayContainer = (isOpen: boolean) =>
  css({
    position: 'absolute',
    top: '50%',
    left: isOpen ? '50%' : 0,
    border: '2px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    padding: '10px',
    width: '20rem',
    boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.5)',
    background: modalColorsMap[ModalColor.PURPLE][0],
    transition: `transform ${transitions.SLOW}, left ${transitions.SLOW}`,
    transform: `translate(${isOpen ? '-50%' : '-100%'}, -50%)`,
    zIndex: layers.UNDEAD_OVERLAY,
  })

const undeadOverlayInner = css({
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: 'inset 0px 10px 0px rgba(0, 0, 0, 0.35), 0px 1px 1px rgba(255, 255, 255, 0.5)',
  overflowY: 'auto',
  maxHeight: '50vh',
  backgroundColor: modalColorsMap[ModalColor.PURPLE][1],
  color: colors.WHITE,
  textShadow: shadows.TEXT_FLAT,
})

const undeadOverlayToggle = [
  resetButton,
  css({
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(100%, -50%)',
  }),
]

const undeadOverlayToggleIcon = css({
  width: '2rem',
})

const undeadOverlayUpkeep = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0.5rem 0',
  textAlign: 'center',
  color: colors.RED,
})

const undeadOverlayShadow = (isOpen: boolean) => [
  resetButton,
  contentCover,
  css({
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: isOpen ? 1 : 0,
    cursor: 'pointer',
    pointerEvents: isOpen ? 'initial' : 'none',
    transition: `opacity ${transitions.SLOW}`,
    zIndex: layers.UNDEAD_OVERLAY,
  }),
]

export const UndeadOverlay = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, toggle, close } = useModalState(false)
  const meatCost = useSelector(getUpkeep)
  const undeads = useSelector(getUndeads)

  const handleBan = (type: UndeadType) => () => dispatch(banUndead(type))

  return (
    <Fragment>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div css={undeadOverlayShadow(isOpen)} onClick={close} />
      <div css={undeadOverlayContainer(isOpen)}>
        <div css={undeadOverlayInner}>
          <h2 css={h2Title}>{t('undeadOverlayTitle')}</h2>
          <p css={undeadOverlayUpkeep}>
            {t('undeadUpkeep')}
            <ResourceIcon type={ResourceType.Meat} text={meatCost} />
          </p>
          {undeads.map(undead => (
            <UndeadBox key={undead.type} undead={undead} onBan={handleBan(undead.type)} />
          ))}
        </div>
        <button type="button" css={undeadOverlayToggle} onClick={toggle}>
          <img src={isOpen ? overlayCloseUrl : overlayOpenUrl} alt="" css={undeadOverlayToggleIcon} />
        </button>
      </div>
    </Fragment>
  )
}
