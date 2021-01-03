import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { isActionOf } from 'typesafe-actions'
import anime from 'animejs'
import { darkRedBox, redBox, smallMarginTop, textColor } from '../../../styles/base'
import { Image } from '../../../components/images/Image'
import { PaladinType } from '../../../config/constants'
import { colors, fonts, shadows, transitions } from '../../../config/theme'
import { paladinsImageMap } from '../helpers/paladinsImageMap'
import damageIcon from '../../../assets/images/paladins/paladin-damage.png'
import { isPaladinConsecrated, PaladinCard } from '../../../data/paladins/helpers'
import { useTranslation } from '../../../lang/useTranslation'
import { changePaladinCategories, markPaladinsRevealed, triggerPaladinBattleCry } from '../../../data/paladins/actions'
import { Health } from '../../../components/images/Health'
import { DamageCategories } from '../../../components/images/DamageCategories'
import { useReduxEventHook } from '../../../hooks/useReduxEventHook'

const activePaladinsDetails = [
  redBox,
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: '1.2rem',
    transition: transitions.FAST,

    '&.enter': {
      transform: 'translateX(100%)',
      opacity: 0,
    },

    '&.exit-active': {
      transform: 'translateX(-100%)',
      opacity: 0,
    },
  }),
]

const paladinAvatar = (type: PaladinType) =>
  css({
    marginRight: '0.5rem',
    borderRadius: '10px',
    border: `1px solid ${colors.DARK_RED}`,
    width: '5rem',
    height: '5rem',
    backgroundImage: `url(${paladinsImageMap[type]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  })

const activePaladinHeader = css({
  display: 'flex',
})

const activePaladinName = css({
  fontSize: '1.3rem',
  fontFamily: fonts.TITLES,
  color: colors.RED,
  textShadow: shadows.TEXT_SOLID,
})

const activePaladinHeaderRight = css({ flex: 1 })

const activePaladinHeaderText = css({
  display: 'flex',
  justifyContent: 'space-between',
})

const activePaladinHealth = [
  darkRedBox,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.5rem',
    padding: '0.5rem',
    alignSelf: 'center',
    minWidth: '10rem',
  }),
]

const activePaladinAbility = [
  smallMarginTop,
  css({
    fontSize: '1rem',
  }),
]

export type PaladinFightCardProps = {
  paladin: PaladinCard
}

export const PaladinFightCard = ({ paladin }: PaladinFightCardProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const categoriesRef = useRef<HTMLElement>(null)
  useReduxEventHook(isActionOf(changePaladinCategories), () => {
    if (!categoriesRef.current) {
      return
    }
    anime({
      targets: categoriesRef.current,
      direction: 'alternate',
      autoplay: true,
      duration: 300,
      scale: 1.5,
      easing: 'easeInOutSine',
    })
  })

  useEffect(() => {
    if (!paladin.revealed) {
      dispatch(markPaladinsRevealed([paladin.id]))
    }
  }, [paladin.id, paladin.revealed, dispatch])

  useEffect(() => {
    if (!paladin.battleCryTriggered) {
      dispatch(triggerPaladinBattleCry(paladin.id))
    }
  }, [paladin.id, paladin.battleCryTriggered, dispatch])

  return (
    <div css={activePaladinsDetails}>
      <div css={activePaladinHeader}>
        <div css={paladinAvatar(paladin.type)} />
        <div css={activePaladinHeaderRight}>
          <div css={activePaladinName} data-test-id="paladinName">
            {t('paladinName', paladin.type)}
          </div>
          <div css={activePaladinHeaderText}>
            <span css={textColor('RED')} data-test-id="paladinDamages">
              {paladin.damages}&nbsp;
              <Image src={damageIcon} />
            </span>
            <span data-test-id="paladinType">
              {t('paladinType')}
              <DamageCategories ref={categoriesRef} categories={paladin.categories} />
            </span>
            <span />
          </div>
        </div>
      </div>
      <div css={activePaladinAbility} data-test-id="paladinAbility">
        {paladin.shield && (
          <>
            {t('paladinShielded')}
            <br />
          </>
        )}
        {isPaladinConsecrated(paladin) && (
          <>
            {t('paladinConsecrated')}
            <br />
          </>
        )}
        {t('paladinAbility', paladin.type)}
      </div>
      <div css={activePaladinHealth} data-test-id="paladinHealth">
        <Health health={paladin.health} maxHealth={paladin.maxHealth} />
      </div>
    </div>
  )
}
