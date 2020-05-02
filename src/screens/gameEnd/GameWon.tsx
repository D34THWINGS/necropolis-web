/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch } from 'react-redux'
import gameWonBgUrl from '../../assets/images/endScreens/victory-bg.jpg'
import gameWonImageUrl from '../../assets/images/endScreens/victory.png'
import { Image } from '../../components/images/Image'
import { useTranslation } from '../../lang/useTranslation'
import { gameEndButton, gameEndContainer, gameEndImage, gameEndText } from './helpers/gameEndStyles'
import { forestSquareButton } from '../../styles/buttons'
import { resetGame } from '../../data/settings/actions'

const gameWonContainer = gameEndContainer(gameWonBgUrl)

const gameWonText = gameEndText('-2rem', 'rgba(27, 101, 48, 0.75);')

const gameWonButton = [...forestSquareButton, gameEndButton]

export const GameWon = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleRetry = () => dispatch(resetGame())

  return (
    <div css={gameWonContainer}>
      <Image css={gameEndImage} src={gameWonImageUrl} size="80%" />
      <div css={gameWonText}>{t('gameWon')}</div>
      <button type="button" css={gameWonButton} onClick={handleRetry}>
        {t('gameRetry')}
      </button>
    </div>
  )
}
