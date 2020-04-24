/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch } from 'react-redux'
import gameLostBgUrl from '../../assets/images/endScreens/defeat-bg.jpg'
import gameLostImageUrl from '../../assets/images/endScreens/defeat.png'
import { Image } from '../../components/images/Image'
import { useTranslation } from '../../lang/useTranslation'
import { darkBlueSquareButton } from '../../styles/buttons'
import { colors, shadows } from '../../config/theme'
import { resetGame } from '../../store/resetableStore'

const gameLostContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  backgroundImage: `url(${gameLostBgUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
})

const gameLostText = css({
  marginTop: '-6rem',
  marginBottom: '2rem',
  borderRadius: '20px',
  padding: '0.4rem',
  maxWidth: '18rem',
  backgroundColor: 'rgba(27, 79, 101, 0.75);',
  fontSize: '1.3rem',
  color: colors.WHITE,
  textShadow: shadows.TEXT_FLAT,
  textAlign: 'center',
})

const gameLostButton = [
  ...darkBlueSquareButton,
  css({
    maxWidth: '18rem',
  }),
]

export const GameLost = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleRetry = () => dispatch(resetGame())

  return (
    <div css={gameLostContainer}>
      <Image src={gameLostImageUrl} size="80%" />
      <div css={gameLostText}>{t('gameLost')}</div>
      <button type="button" css={gameLostButton} onClick={handleRetry}>
        {t('gameRetry')}
      </button>
    </div>
  )
}
