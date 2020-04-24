/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch } from 'react-redux'
import gameLostBgUrl from '../../assets/images/endScreens/defeat-bg.jpg'
import gameLostImageUrl from '../../assets/images/endScreens/defeat.png'
import { Image } from '../../components/images/Image'
import { useTranslation } from '../../lang/useTranslation'
import { darkBlueSquareButton } from '../../styles/buttons'
import { resetGame } from '../../store/resetableStore'
import { gameEndContainer, gameEndText } from './helpers/gameEndStyles'

const gameLostContainer = gameEndContainer(gameLostBgUrl)

const gameLostText = gameEndText('-6rem', 'rgba(27, 79, 101, 0.75);')

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
