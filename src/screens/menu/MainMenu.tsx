import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { css } from '@emotion/react'
import { cyanSquareButton } from '../../styles/buttons'
import { useTranslation } from '../../lang/useTranslation'
import { largeMarginTop } from '../../styles/base'
import { MAIN_HUB, NEW_GAME } from '../../config/routes'
import { getHasActiveGame } from '../../data/settings/selectors'
import { colors } from '../../config/theme'
import backgroundImageUrl from '../../assets/images/background.jpg'
import titleImageUrl from '../../assets/images/title.png'
import { Image } from '../../components/images/Image'

const mainMenuWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-end',
  padding: '3rem 2rem 2rem',
  height: '100%',
  backgroundImage: `url("${backgroundImageUrl}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: colors.DARK_GREEN,
})

const separator = css({
  flex: '1 0 auto',
})

const titleImage = css({
  margin: '-1rem',
  width: 'calc(100% + 2rem)',
})

export const MainMenu = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const hasActiveGame = useSelector(getHasActiveGame)

  const handleContinue = () => history.replace(MAIN_HUB)
  const handleNewGame = () => history.replace(NEW_GAME)

  return (
    <div css={mainMenuWrapper}>
      <Image css={titleImage} src={titleImageUrl} />
      <div css={separator} />
      <button
        type="button"
        css={cyanSquareButton}
        onClick={handleContinue}
        disabled={!hasActiveGame}
        data-test-id="continueGameButton"
      >
        {t('continueGame')}
      </button>
      <button
        type="button"
        css={[cyanSquareButton, largeMarginTop]}
        onClick={handleNewGame}
        data-test-id="newGameButton"
      >
        {t('newGame')}
      </button>
    </div>
  )
}
