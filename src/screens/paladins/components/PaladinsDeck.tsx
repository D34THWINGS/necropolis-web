import React, { useState } from 'react'
import { css } from '@emotion/core'
import { buttonBase, resetButton } from '../../../styles/buttons'
import { Image } from '../../../components/images/Image'
import cardBackImage from '../../../assets/images/paladins/card-back.png'
import { PaladinDetailsModal } from './PaladinDetailsModal'
import { Assault, PaladinCard } from '../../../data/paladins/helpers'
import { breakpoints, colors, fonts, shadows } from '../../../config/theme'
import { PaladinType } from '../../../config/constants'
import { paladinsImageMap } from '../helpers/paladinsImageMap'
import { useTranslation } from '../../../lang/useTranslation'

const assaultDeckWrapper = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignSelf: 'stretch',
  justifyContent: 'center',
  padding: '0 0.3rem 1rem',

  [breakpoints.SM]: {
    padding: '0 1rem 1rem',
  },
})

const assaultCard = [
  css({
    margin: '1rem 1rem 0 0',
    borderRadius: '10px',
    border: `solid 1px ${colors.DARK_RED}`,
    flex: '0 0 calc(33% - 1rem)',
    boxShadow: shadows.ELEVATED,

    '&:nth-of-type(3n)': {
      marginRight: 0,
    },

    '&::before': {
      content: '" "',
      width: 1,
      marginLeft: -1,
      float: 'left',
      height: 0,
      paddingTop: 'calc(1.31 * 100%)',
    },
  }),
]

const assaultCardRevealed = (type: PaladinType) => [
  ...buttonBase,
  css({
    backgroundImage: `url("${paladinsImageMap[type]}")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }),
]

const assaultCardHidden = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const assaultCardTitle = css({
  margin: 0,
  padding: '0.5rem',
  fontSize: '1.2rem',
  fontFamily: fonts.TITLES,
  color: colors.RED,
  textShadow: shadows.TEXT_SOLID,
})

export type PaladinsDeckProps = {
  className?: string
  deck: Assault['deck']
}

export const PaladinsDeck = ({ className, deck }: PaladinsDeckProps) => {
  const { t } = useTranslation()
  const [openedCard, setOpenedCard] = useState<PaladinCard | null>(null)

  const handleCardClick = (card: PaladinCard) => () => setOpenedCard(card)
  const handleCloseDetails = () => setOpenedCard(null)

  return (
    <div css={assaultDeckWrapper} className={className}>
      {deck.map(card =>
        card.revealed ? (
          <button
            key={card.id}
            type="button"
            css={[assaultCardRevealed(card.type), assaultCard]}
            onClick={handleCardClick(card)}
          >
            <h3 css={assaultCardTitle}>{t('paladinName', card.type)}</h3>
          </button>
        ) : (
          <button key={card.id} type="button" disabled css={[resetButton, assaultCard, assaultCardHidden]}>
            <Image src={cardBackImage} size="70%" />
          </button>
        ),
      )}
      <PaladinDetailsModal card={openedCard} onClose={handleCloseDetails} />
    </div>
  )
}
