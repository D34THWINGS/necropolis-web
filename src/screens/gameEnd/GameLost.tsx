import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import gameLostBgUrl from '../../assets/images/endScreens/defeat-bg.jpg'
import gameLostImageUrl from '../../assets/images/endScreens/defeat.png'
import { Image } from '../../components/images/Image'
import { useTranslation } from '../../lang/useTranslation'
import { darkBlueSquareButton } from '../../styles/buttons'
import { gameCreated, gameEnded, resetGame } from '../../data/settings/actions'
import { gameEndButton, gameEndContainer, gameEndImage, gameEndText } from './helpers/gameEndStyles'
import { MAIN_MENU } from '../../config/routes'
import { smallMarginTop } from '../../styles/base'

const gameLostContainer = gameEndContainer(gameLostBgUrl)

const gameLostText = gameEndText('-6rem', 'rgba(27, 79, 101, 0.75);')

const gameLostButton = [...darkBlueSquareButton, gameEndButton]

export const GameLost = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(gameEnded())
  }, [])

  const handleRetry = () => {
    dispatch(resetGame())
    dispatch(gameCreated())
  }

  const handleGoToMainMenu = () => history.push(MAIN_MENU)

  return (
    <div css={gameLostContainer}>
      <Image css={gameEndImage} src={gameLostImageUrl} size="80%" />
      <div css={gameLostText}>{t('gameLost')}</div>
      <button type="button" css={gameLostButton} onClick={handleRetry}>
        {t('gameRetry')}
      </button>
      <button type="button" css={[...gameLostButton, smallMarginTop]} onClick={handleGoToMainMenu}>
        {t('goToMainMenu')}
      </button>
    </div>
  )
}
