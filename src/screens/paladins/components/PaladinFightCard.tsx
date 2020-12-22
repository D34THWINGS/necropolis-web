import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { darkRedBox, redBox, smallMarginTop, textColor } from '../../../styles/base'
import { Image } from '../../../components/images/Image'
import { paladinCategoryImagesMap } from '../helpers/paladinCategoryImagesMap'
import { PaladinCategory, PaladinType } from '../../../config/constants'
import { colors, fonts, shadows } from '../../../config/theme'
import { paladinsImageMap } from '../helpers/paladinsImageMap'
import damageIcon from '../../../assets/images/paladins/paladin-damage.png'
import { PaladinCard } from '../../../data/paladins/helpers'
import { useTranslation } from '../../../lang/useTranslation'
import { markPaladinsRevealed, triggerPaladinBattleCry } from '../../../data/paladins/actions'
import { Health } from '../../../components/images/Health'

const activePaladinsDetails = [
  redBox,
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: '1.2rem',
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

export type PaladinFightCardProps = {
  paladin: PaladinCard
}

export const PaladinFightCard = ({ paladin }: PaladinFightCardProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

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
              {paladin.categories.map((category, index) => (
                <Image
                  key={category === PaladinCategory.Pure ? category + index : category}
                  src={paladinCategoryImagesMap[category]}
                  marginRight="0.5rem"
                  data-test-id={category}
                />
              ))}
            </span>
            <span />
          </div>
        </div>
      </div>
      <div css={smallMarginTop} data-test-id="paladinAbility">
        {paladin.shield && t('paladinShielded')}
        <br />
        {t('paladinAbility', paladin.type)}
      </div>
      <div css={activePaladinHealth} data-test-id="paladinHealth">
        <Health health={paladin.health} maxHealth={paladin.maxHealth} />
      </div>
    </div>
  )
}
