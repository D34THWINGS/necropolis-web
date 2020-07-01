import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import gameWonBgUrl from '../../assets/images/endScreens/victory-bg.jpg'
import gameWonImageUrl from '../../assets/images/endScreens/victory.png'
import { Image } from '../../components/images/Image'
import { useTranslation } from '../../lang/useTranslation'
import { gameEndButton, gameEndContainer, gameEndImage, gameEndText } from './helpers/gameEndStyles'
import { forestSquareButton } from '../../styles/buttons'
import { gameEnded, resetGame } from '../../data/settings/actions'
import { MAIN_MENU } from '../../config/routes'
import { smallMarginTop } from '../../styles/base'

const gameWonContainer = gameEndContainer(gameWonBgUrl)

const gameWonText = gameEndText('-2rem', 'rgba(27, 101, 48, 0.75);')

const gameWonButton = [...forestSquareButton, gameEndButton]

export const GameWon = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(gameEnded())
  }, [])

  const handleRetry = () => dispatch(resetGame())

  const handleGoToMainMenu = () => history.push(MAIN_MENU)

  return (
    <div css={gameWonContainer}>
      <Image css={gameEndImage} src={gameWonImageUrl} size="80%" />
      <div css={gameWonText}>{t('gameWon')}</div>
      <button type="button" css={gameWonButton} onClick={handleRetry}>
        {t('gameRetry')}
      </button>
      <button type="button" css={[...gameWonButton, smallMarginTop]} onClick={handleGoToMainMenu}>
        {t('goToMainMenu')}
      </button>
    </div>
  )
}
