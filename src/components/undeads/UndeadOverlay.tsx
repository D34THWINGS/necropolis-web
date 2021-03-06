import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import { breakpoints, layers, transitions } from '../../config/theme'
import { useModalState } from '../ui/Modal/Modal'
import { modalOverlay } from '../ui/Modal/modalStyles'
import overlayOpenUrl from '../../assets/images/overlay-open.png'
import overlayCloseUrl from '../../assets/images/overlay-close.png'
import { resetButton } from '../../styles/buttons'
import { useTranslation } from '../../lang/useTranslation'
import { getUndeads, getUpkeep } from '../../data/undeads/selectors'
import { h2Title, purpleBox, textColor } from '../../styles/base'
import { ResourceIcon } from '../resources/ResourceIcon'
import { OnboardingStep, ResourceType } from '../../config/constants'
import { UndeadBox } from './UndeadBox'
import { banUndead } from '../../data/undeads/actions'
import { Image } from '../images/Image'
import { getUndeadTalents, isUndeadAlive, Undead } from '../../data/undeads/helpers'
import { OnboardingHighlight } from '../../screens/onboarding/components/OnboardingHighlight'
import { TalentsList } from '../talents/TalentsList'
import { FrameColor, FrameInner, FrameWrapper } from '../ui/Frame'

const undeadOverlayContainer = (isOpen: boolean) => [
  css({
    position: 'absolute',
    top: '50%',
    left: '-2rem',
    margin: 0,
    width: '100%',
    maxWidth: 'none',
    transition: `transform ${transitions.SLOW}, left ${transitions.SLOW}`,
    transform: `translate(${isOpen ? '0%' : 'calc(-100% + 2rem)'}, -50%)`,
    zIndex: layers.UNDEAD_OVERLAY,

    [breakpoints.SM]: {
      margin: 0,
    },
  }),
]

const undeadOverlayInner = [
  css({
    maxHeight: '70vh',
    paddingLeft: '2rem',

    [breakpoints.SM]: {
      maxHeight: '60vh',
    },
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

  const handleBan = (undeadId: Undead['id']) => () => dispatch(banUndead(undeadId))

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div css={undeadOverlayShadow(isOpen)} onClick={close} />
      <FrameWrapper color={FrameColor.PURPLE} css={undeadOverlayContainer(isOpen)}>
        <FrameInner color={FrameColor.PURPLE} css={undeadOverlayInner}>
          <h2 css={h2Title}>{t('undeadOverlayTitle')}</h2>
          <div css={overviewBox}>
            <span css={textColor('RED')}>{t('undeadUpkeep')}</span>
            <ResourceIcon type={ResourceType.Meat} text={meatCost} />
            <br />
            <span css={textColor('CYAN')}>{t('talentsTotal')}</span>
            <TalentsList values={undeads.filter(isUndeadAlive).map(getUndeadTalents).flat()} />
          </div>
          <TransitionGroup>
            {undeads
              .filter(undead => !undead.banned)
              .map(undead => (
                <CSSTransition key={undead.id} timeout={transitions.FAST_DURATION}>
                  <UndeadBox
                    undead={undead}
                    disableConfirm={undeads.length === 1}
                    onClick={handleBan(undead.id)}
                    renderConfirmText={name =>
                      undeads.length === 1 ? t('cannotBanLastUndead') : t('confirmUndeadBan', name)
                    }
                  />
                </CSSTransition>
              ))}
          </TransitionGroup>
        </FrameInner>
        <OnboardingHighlight<HTMLButtonElement> step={OnboardingStep.CoffinHelp}>
          {({ className, onClick, ref }) => {
            const handleClick = () => {
              if (onClick) {
                onClick()
              }
              toggle()
            }

            return (
              <button ref={ref} className={className} type="button" css={undeadOverlayToggle} onClick={handleClick}>
                <Image src={isOpen ? overlayCloseUrl : overlayOpenUrl} size="2rem" />
              </button>
            )
          }}
        </OnboardingHighlight>
      </FrameWrapper>
    </>
  )
}
