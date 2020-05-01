/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { breakpoints, layers, transitions } from '../../config/theme'
import { useModalState } from '../ui/Modal/Modal'
import { ModalColor, modalInner, modalOverlay, modalPanel } from '../ui/Modal/modalStyles'
import overlayOpenUrl from '../../assets/images/overlay-open.png'
import overlayCloseUrl from '../../assets/images/overlay-close.png'
import { resetButton } from '../../styles/buttons'
import { useTranslation } from '../../lang/useTranslation'
import { getUndeads, getUpkeep } from '../../data/undeads/selectors'
import { h2Title, purpleBox, textColor } from '../../styles/base'
import { ResourceIcon } from '../images/ResourceIcon'
import { ResourceType, UndeadTalent, UndeadType } from '../../config/constants'
import { UndeadBox } from './UndeadBox'
import { banUndead } from '../../data/undeads/actions'
import { Image } from '../images/Image'
import { TalentButton } from '../talents/TalentButton'
import { getUndeadTalentValue } from '../../data/undeads/helpers'

const undeadOverlayContainer = (isOpen: boolean) => [
  modalPanel(ModalColor.PURPLE),
  css({
    position: 'absolute',
    top: '50%',
    left: isOpen ? '50%' : 0,
    margin: 0,
    width: 'calc(100% - 4rem)',
    transition: `transform ${transitions.SLOW}, left ${transitions.SLOW}`,
    transform: `translate(${isOpen ? '-50%' : '-100%'}, -50%)`,
    zIndex: layers.UNDEAD_OVERLAY,

    [breakpoints.SM]: {
      margin: 0,
    },
  }),
]

const undeadOverlayInner = [
  modalInner(ModalColor.PURPLE),
  css({
    maxHeight: '50vh',
  }),
]

const undeadOverlayToggle = [
  resetButton,
  css({
    position: 'absolute',
    top: '50%',
    right: 0,
    padding: '0.4rem 0.4rem 0.4rem 0',
    transform: 'translate(100%, -50%)',
  }),
]

const overviewBox = [
  purpleBox,
  css({
    margin: '0.5rem 0 1rem',
  }),
]

const undeadOverlayShadow = (isOpen: boolean) => [
  modalOverlay(isOpen),
  css({
    cursor: 'pointer',
    pointerEvents: isOpen ? 'initial' : 'none',
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
          <div css={overviewBox}>
            <span css={textColor('RED')}>{t('undeadUpkeep')}</span>
            <ResourceIcon type={ResourceType.Meat} text={meatCost} />
            <br />
            <span css={textColor('CYAN')}>{t('talentsTotal')}</span>
            {Object.values(UndeadTalent).map(talent => (
              <TalentButton
                key={talent}
                type={talent}
                text={undeads.reduce((sum, undead) => sum + getUndeadTalentValue(undead, talent), 0)}
              />
            ))}
          </div>
          {undeads.map(undead => (
            <UndeadBox key={undead.type} undead={undead} onBan={handleBan(undead.type)} />
          ))}
        </div>
        <button type="button" css={undeadOverlayToggle} onClick={toggle}>
          <Image src={isOpen ? overlayCloseUrl : overlayOpenUrl} size="2rem" />
        </button>
      </div>
    </Fragment>
  )
}
