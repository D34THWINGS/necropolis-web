import React, { useState } from 'react'
import { css } from '@emotion/react'
import { buttonBase, resetButton } from '../../../styles/buttons'
import { Image } from '../../../components/images/Image'
import cardBackImage from '../../../assets/images/paladins/card-back.png'
import { PaladinDetailsModal } from './PaladinDetailsModal'
import { Assault, isPaladinAlive, PaladinCard } from '../../../data/paladins/helpers'
import { colors, shadows } from '../../../config/theme'
import { PaladinType } from '../../../config/constants'
import { paladinsImageMap } from '../helpers/paladinsImageMap'
import { useTranslation } from '../../../lang/useTranslation'

const assaultDeckWrapper = (columns: number, limitWidth: boolean) =>
  css({
    display: 'grid',
    gridTemplateColumns: new Array(columns)
      .fill(`calc(${(100 / columns).toFixed(1)}% - ${((columns - 1) / columns).toFixed(2)}rem)`)
      .join(' '),
    columnGap: '1rem',
    rowGap: '1rem',
    width: limitWidth ? '78vw' : 'auto',
    maxWidth: limitWidth ? '24rem' : 'auto',
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

const assaultCardRevealed = (type: PaladinType, isDead: boolean) => [
  ...buttonBase,
  css({
    position: 'relative',
    backgroundImage: `url("${paladinsImageMap[type]}")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    filter: isDead ? 'brightness(0.5)' : undefined,
    textIndent: -9999,
  }),
]

const assaultCardHidden = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export type PaladinsDeckProps = {
  className?: string
  columns?: number
  deck: Assault['deck']
  limitWidth?: boolean
}

export const PaladinsDeck = ({ className, deck, columns = 3, limitWidth = false }: PaladinsDeckProps) => {
  const { t } = useTranslation()
  const [openedCard, setOpenedCard] = useState<PaladinCard | null>(null)

  const handleCardClick = (card: PaladinCard) => () => setOpenedCard(card)
  const handleCloseDetails = () => setOpenedCard(null)

  return (
    <div css={assaultDeckWrapper(columns, limitWidth)} className={className} data-test-id="paladinsDeck">
      {deck.map(card =>
        card.revealed ? (
          <button
            key={card.id}
            type="button"
            css={[assaultCardRevealed(card.type, !isPaladinAlive(card)), assaultCard]}
            onClick={handleCardClick(card)}
            data-test-id="paladinRevealedCard"
          >
            {t('paladinName', card.type)}
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
