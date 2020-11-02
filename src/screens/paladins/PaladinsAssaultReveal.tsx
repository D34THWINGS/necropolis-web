import React, { useState } from 'react'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { ModalColor, modalInner, modalPanel } from '../../components/ui/Modal/modalStyles'
import { breakpoints, colors, fonts, shadows } from '../../config/theme'
import { h2Title, redBox } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { getPaladinsAssault } from '../../data/paladins/selectors'
import { Image } from '../../components/images/Image'
import paladinsStrengthIcon from '../../assets/images/paladins/paladins-strengh.png'
import cardBackImage from '../../assets/images/paladins/card-back.png'
import { buttonBase, redSquareButton, resetButton } from '../../styles/buttons'
import { PaladinsAssaultPhase, PaladinType } from '../../config/constants'
import { paladinsImageMap } from './helpers/paladinsImageMap'
import { PaladinCard } from '../../data/paladins/helpers'
import { PaladinDetailsModal } from './components/PaladinDetailsModal'
import { changeAssaultPhase } from '../../data/paladins/actions'
import { paladinAssaultPanel, paladinAssaultPanelInner } from './helpers/paladinAssaultStyles'

const revealPanel = [modalPanel(ModalColor.RED), paladinAssaultPanel]

const revealPanelInner = [modalInner(ModalColor.RED), paladinAssaultPanelInner]

const assaultStrengthBox = [
  redBox,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    minWidth: '7rem',
  }),
]

const assaultStrength = css({
  marginRight: '0.5rem',
  color: colors.RED,
  fontWeight: 'bold',
  fontSize: '1.5rem',
  textShadow: shadows.TEXT_SOLID,
})

const assaultDeckWrapper = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignSelf: 'stretch',
  justifyContent: 'center',
  padding: '0 0.3rem 4rem',

  [breakpoints.SM]: {
    padding: '0 1rem 4rem',
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

const assaultNextButton = [
  ...redSquareButton,
  css({
    position: 'absolute',
    bottom: '1.5rem',
    left: '50%',
    transform: 'translate(-50%)',
    width: 'auto',
    minWidth: '6rem',
  }),
]

export const PaladinsAssaultReveal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const assault = useSelector(getPaladinsAssault)
  const [openedCard, setOpenedCard] = useState<PaladinCard | null>(null)

  if (!assault) {
    return null
  }

  const handleCardClick = (card: PaladinCard) => () => setOpenedCard(card)
  const handleCloseDetails = () => setOpenedCard(null)
  const handleNextPhase = () => dispatch(changeAssaultPhase(PaladinsAssaultPhase.Preparing))

  return (
    <div css={revealPanel}>
      <div css={revealPanelInner}>
        <h2 css={h2Title}>{t('paladinsAssaultReveal')}</h2>
        <div css={assaultStrengthBox}>
          <span css={assaultStrength}>{assault.deck.length}</span>
          <Image src={paladinsStrengthIcon} size="2rem" />
        </div>
        <div css={assaultDeckWrapper}>
          {assault.deck.map(card =>
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
        </div>
      </div>
      <button type="button" css={assaultNextButton} onClick={handleNextPhase}>
        {t('paladinsAssaultNext')}
      </button>
      <PaladinDetailsModal card={openedCard} onClose={handleCloseDetails} />
    </div>
  )
}
