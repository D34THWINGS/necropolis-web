import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { css, keyframes } from '@emotion/react'
import lighten from 'polished/lib/color/lighten'
import darken from 'polished/lib/color/darken'
import { Image } from '../images/Image'
import redCheckUrl from '../../assets/images/icons/red-check.png'
import { coloredBox, contentCover, purpleBox } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { colors, fonts, frameColors, shadows, transitions } from '../../config/theme'
import { getUndeadTalents, isUndeadAlive, Undead } from '../../data/undeads/helpers'
import { resetButton } from '../../styles/buttons'
import { UndeadPortrait } from './UndeadPortrait'
import { TalentsList } from '../talents/TalentsList'
import { Health } from '../images/Health'
import { UndeadAbilityDescription } from './UndeadAbilityDescription'

const undeadBox = css({
  position: 'relative',
  marginBottom: '0.8rem',
  transition: `transform ${transitions.FAST}, opacity ${transitions.FAST}`,
  transformOrigin: 'center top',

  ':last-child': {
    marginBottom: 0,
  },

  '&.exit-active': {
    transform: 'scaleY(0)',
    opacity: 0,
  },
})

const undeadBoxInner = (isDead: boolean) => [
  purpleBox,
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '2.5rem',
    paddingRight: '2.5rem',
    filter: isDead ? 'grayscale(1)' : undefined,
  }),
]

const confirmTimeout = keyframes({
  from: {
    backgroundSize: '100% 100%',
  },

  to: {
    backgroundSize: '0% 100%',
  },
})

const undeadConfirmBox = [
  contentCover,
  css({
    right: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    padding: '1rem 2.5rem 1rem 1rem',
    fontSize: '1.6rem',
    fontFamily: fonts.TITLES,
    textAlign: 'center',
    textShadow: shadows.TEXT_SOLID,
    animationName: confirmTimeout,
    animationDuration: '3s',
    animationTimingFunction: 'linear',
    backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    backgroundColor: colors.DARK_PURPLE,
  }),
]

const undeadName = css({
  margin: 0,
  textAlign: 'center',
  color: colors.PURPLE,
  fontFamily: fonts.TITLES,
  fontSize: '1.5rem',
  fontWeight: 'normal',
})

const undeadTalents = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.3rem',
})

const undeadHealth = css({ marginBottom: '0.3rem' })

const undeadAbility = coloredBox(darken(0.1, colors.DARK_PURPLE))

const undeadBoxButton = (backgroundColor: string) => [
  resetButton,
  css({
    position: 'absolute',
    right: -8,
    top: '50%',
    border: `solid 7px ${frameColors.DARK_PURPLE}`,
    borderRadius: '50%',
    padding: '0.3rem',
    width: '5rem',
    height: '5rem',
    backgroundColor,
    boxShadow: `inset 0px 5px 3px ${lighten(0.2, backgroundColor)}, inset 0px -5px 3px ${darken(
      0.25,
      backgroundColor,
    )}`,
    transform: 'translateY(-50%)',

    ':disabled': {
      backgroundColor: colors.LIGHT_GREY,
      boxShadow: `inset 0px 5px 3px ${lighten(0.2, colors.LIGHT_GREY)}, inset 0px -5px 3px ${darken(
        0.25,
        colors.LIGHT_GREY,
      )}`,

      '& > img': {
        filter: 'grayscale(1)',
      },
    },

    '&:not(:disabled):active': {
      boxShadow: `inset 0px 5px 3px ${darken(0.25, backgroundColor)}, inset 0px -5px 3px ${lighten(
        0.2,
        backgroundColor,
      )}`,
    },

    '& > img': {
      width: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
]

const undeadBanButton = undeadBoxButton(colors.LIGHT_PURPLE)

const undeadConfirmBanButton = [
  ...undeadBoxButton(colors.RED),
  css({
    right: '-2.5rem',
  }),
]

const portraitFrame = css({
  position: 'absolute',
  right: -8,
  top: '50%',
  border: `solid 7px ${frameColors.DARK_PURPLE}`,
  borderRadius: '50%',
  padding: '0.3rem',
  width: '5rem',
  height: '5rem',
  transform: 'translateY(-50%)',
  backgroundColor: frameColors.PURPLE,
  textAlign: 'center',

  '& > img': {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
})

export type UndeadBoxProps = {
  undead: Undead
  renderConfirmText?: (name: ReactNode) => ReactNode
  onClick?: () => void
  disableConfirm?: boolean
  className?: string
  shouldConfirmAction?: boolean
}

export const UndeadBox = ({
  className,
  undead,
  disableConfirm,
  onClick,
  shouldConfirmAction = true,
  renderConfirmText,
}: UndeadBoxProps) => {
  const { t } = useTranslation()
  const [showConfirm, setShowConfirm] = useState(false)
  const cancelTimeout = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (cancelTimeout.current) {
        clearTimeout(cancelTimeout.current)
      }
    },
    [],
  )

  const handleShowConfirm = () => {
    setShowConfirm(true)
    cancelTimeout.current = window.setTimeout(() => {
      setShowConfirm(false)
    }, 3000)
  }

  const handleConfirmAction = () => {
    if (cancelTimeout.current) {
      clearTimeout(cancelTimeout.current)
    }
    if (onClick) {
      onClick()
    }
  }

  const undeadNameText = t('undeadName', undead.type)

  return (
    <div className={className} css={undeadBox}>
      <div css={undeadBoxInner(!isUndeadAlive(undead))}>
        <h4 css={undeadName}>{undeadNameText}</h4>
        <div css={undeadTalents}>
          <TalentsList values={getUndeadTalents(undead)} />
        </div>
        <Health css={undeadHealth} health={undead.health} maxHealth={undead.maxHealth} />
        <div css={undeadAbility}>
          <UndeadAbilityDescription ability={undead.ability} showAssault showExpedition />
        </div>
      </div>
      {onClick && !showConfirm && (
        <button
          type="button"
          css={undeadBanButton}
          onClick={shouldConfirmAction ? handleShowConfirm : handleConfirmAction}
        >
          <UndeadPortrait type={undead.type} />
        </button>
      )}
      {!onClick && (
        <div css={portraitFrame}>
          <UndeadPortrait type={undead.type} />
        </div>
      )}
      {showConfirm && (
        <div css={undeadConfirmBox}>
          <div>{renderConfirmText?.(undeadNameText) ?? t('confirmUndeadBan', undeadNameText)}</div>
          <button type="button" css={undeadConfirmBanButton} disabled={disableConfirm} onClick={handleConfirmAction}>
            <Image src={redCheckUrl} size="2rem" block />
          </button>
        </div>
      )}
    </div>
  )
}
