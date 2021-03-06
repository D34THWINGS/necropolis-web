import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { colors, shadows } from '../../config/theme'
import { h2Title, redBox } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { getPaladinsAssault } from '../../data/paladins/selectors'
import { Image } from '../../components/images/Image'
import paladinsStrengthIcon from '../../assets/images/paladins/paladins-strengh.png'
import { redSquareButton } from '../../styles/buttons'
import { PaladinsAssaultPhase } from '../../config/constants'
import { changeAssaultPhase } from '../../data/paladins/actions'
import { PaladinsDeck } from './components/PaladinsDeck'
import { FrameColor, FrameInner, FrameWrapper } from '../../components/ui/Frame'

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

const assaultDeck = css({
  padding: '0 1rem 4rem',
})

export const PaladinsAssaultReveal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const assault = useSelector(getPaladinsAssault)

  if (!assault) {
    return null
  }

  const handleNextPhase = () => dispatch(changeAssaultPhase(PaladinsAssaultPhase.Preparing))

  return (
    <FrameWrapper color={FrameColor.RED} fullPage>
      <FrameInner color={FrameColor.RED} fullPage>
        <h2 css={h2Title}>{t('paladinsAssaultReveal')}</h2>
        <div css={assaultStrengthBox}>
          <span css={assaultStrength}>{assault.deck.length}</span>
          <Image src={paladinsStrengthIcon} size="2rem" />
        </div>
        <PaladinsDeck css={assaultDeck} deck={assault.deck} />
      </FrameInner>
      <button type="button" css={assaultNextButton} onClick={handleNextPhase} data-test-id="beginPreparePhaseButton">
        {t('paladinsAssaultNext')}
      </button>
    </FrameWrapper>
  )
}
