import React, { useState } from 'react'
import { css } from '@emotion/react'
import { buttonBase, resetButton } from '../../../styles/buttons'
import { Image } from '../../../components/images/Image'
import cardBackImage from '../../../assets/images/paladins/card-back.png'
import { PaladinDetailsModal } from './PaladinDetailsModal'
import { Assault, PaladinCard } from '../../../data/paladins/helpers'
import { colors, fonts, shadows } from '../../../config/theme'
import { PaladinType } from '../../../config/constants'
import { paladinsImageMap } from '../helpers/paladinsImageMap'
import { DamageCategories } from '../../../components/images/DamageCategories'

const assaultDeckWrapper = css({
  display: 'grid',
  gridTemplateColumns: new Array(3).fill('calc(33.3% - 0.66rem)').join(' '),
  columnGap: '1rem',
  rowGap: '1rem',
})

const assaultCard = css({
  borderRadius: '10px',
  border: `solid 1px ${colors.DARK_RED}`,
  justifySelf: 'stretch',
  boxShadow: shadows.ELEVATED,
  overflow: 'hidden',

  '&::before': {
    content: '" "',
    width: 1,
    marginLeft: -1,
    float: 'left',
    height: 0,
    paddingTop: 'calc(1.31 * 100%)',
  },
})

const assaultCardRevealed = (type: PaladinType) => [
  ...buttonBase,
  css({
    position: 'relative',
    backgroundImage: `url("${paladinsImageMap[type]}")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }),
]

const assaultCardHidden = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const assaultCardTypes = css({
  position: 'absolute',
  bottom: 0,
  margin: 0,
  paddingBottom: '0.5rem',
  width: '100%',
  fontSize: '1.2rem',
  lineBreak: 'anywhere',
  fontFamily: fonts.TITLES,
  color: colors.RED,
  textShadow: shadows.TEXT_SOLID,
  filter: 'drop-shadow(0 0 5px black) drop-shadow(0 0 5px rgba(0,0,0,0.8))',
})

export type PaladinsDeckProps = {
  className?: string
  deck: Assault['deck']
}

export const PaladinsDeck = ({ className, deck }: PaladinsDeckProps) => {
  const [openedCard, setOpenedCard] = useState<PaladinCard | null>(null)

  const handleCardClick = (card: PaladinCard) => () => setOpenedCard(card)
  const handleCloseDetails = () => setOpenedCard(null)

  return (
    <div css={assaultDeckWrapper} className={className} data-test-id="paladinsDeck">
      {deck.map(card =>
        card.revealed ? (
          <button
            key={card.id}
            type="button"
            css={[assaultCardRevealed(card.type), assaultCard]}
            onClick={handleCardClick(card)}
            data-test-id="paladinRevealedCard"
          >
            <h3 css={assaultCardTypes}>
              <DamageCategories categories={card.categories} />
            </h3>
          </button>
        ) : (
          <button
            key={card.id}
            type="button"
            disabled
            css={[resetButton, assaultCard, assaultCardHidden]}
            data-test-id="paladinHiddenCard"
          >
            <Image src={cardBackImage} size="70%" />
          </button>
        ),
      )}
      <PaladinDetailsModal card={openedCard} onClose={handleCloseDetails} />
    </div>
  )
}
