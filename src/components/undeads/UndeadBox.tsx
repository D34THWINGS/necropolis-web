import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { css, keyframes } from '@emotion/core'
import { Image } from '../images/Image'
import undeadBanUrl from '../../assets/images/icons/ban-undead.png'
import checkUrl from '../../assets/images/icons/check.png'
import { contentCover, purpleBox, textColor } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { colors, fonts, shadows, transitions } from '../../config/theme'
import { Undead } from '../../data/undeads/helpers'
import { limeRoundButton, purpleRoundButton } from '../../styles/buttons'
import { TalentButton } from '../talents/TalentButton'
import { UndeadPortrait } from './UndeadPortrait'

const undeadBox = (canBeBanned: boolean) => [
  purpleBox,
  css({
    position: 'relative',
    paddingBottom: '1.5rem',
    marginBottom: canBeBanned ? '2rem' : '0.4rem',
    transition: `transform ${transitions.FAST}, opacity ${transitions.FAST}`,
    transformOrigin: 'center top',

    ':last-child': {
      marginBottom: '1rem',
    },

    '&.exit-active': {
      transform: 'scaleY(0)',
      opacity: 0,
    },
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    padding: '1rem 1rem 1.5rem',
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
  textShadow: shadows.TEXT_SOLID,
  fontFamily: fonts.TITLES,
  fontWeight: 'normal',

  '&::after': {
    display: 'block',
    content: '""',
    marginBottom: '0.3rem',
    height: '3px',
    background: colors.PURPLE,
    boxShadow: shadows.TEXT_SOLID,
  },
})

const undeadDescription = css({
  display: 'flex',
  alignItems: 'flex-start',
})

const undeadBoxButton = css({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 50%)',

  ':not(:disabled):active': {
    transform: 'translate(-50%, calc(50% + 0.1rem))',
  },
})

const undeadBanButton = [purpleRoundButton, undeadBoxButton]

const undeadConfirmBanButton = [limeRoundButton, undeadBoxButton]

export type UndeadBoxProps = {
  undead: Undead
  renderBanText?: (name: ReactNode) => ReactNode
  onBan?: () => void
  disableBan?: boolean
}

export const UndeadBox = ({ undead, disableBan, onBan, renderBanText }: UndeadBoxProps) => {
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

  const handleConfirmBan = () => {
    if (cancelTimeout.current) {
      clearTimeout(cancelTimeout.current)
    }
    if (onBan) {
      onBan()
    }
  }

  const undeadNameText = t('undeadName', undead.type)

  return (
    <div css={undeadBox(!!onBan)}>
      <h4 css={undeadName}>{undeadNameText}</h4>
      <div css={undeadDescription}>
        <UndeadPortrait type={undead.type} marginRight="0.4rem" />
        <div>
          <div css={textColor('CYAN')}>{t('undeadTalents')}</div>
          {undead.talents.map(([talent, value]) => (
            <TalentButton key={talent} type={talent} text={value} />
          ))}
          <br />
          <span css={textColor('CYAN')}>{t('undeadAbility')}</span> {t('undeadAbilityDescription', undead.type)}
        </div>
      </div>
      {onBan && !showConfirm && (
        <button type="button" css={undeadBanButton} onClick={handleShowConfirm} disabled={disableBan}>
          <Image src={undeadBanUrl} size="2rem" block />
        </button>
      )}
      {showConfirm && (
        <div css={undeadConfirmBox}>
          <div>{renderBanText?.(undeadNameText) ?? t('confirmUndeadBan', undeadNameText)}</div>
          <button type="button" css={undeadConfirmBanButton} onClick={handleConfirmBan}>
            <Image src={checkUrl} size="2rem" block />
          </button>
        </div>
      )}
    </div>
  )
}
