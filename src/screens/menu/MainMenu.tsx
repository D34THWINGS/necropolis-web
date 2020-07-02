import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { css } from '@emotion/core'
import { cyanSquareButton } from '../../styles/buttons'
import { useTranslation } from '../../lang/useTranslation'
import { largeMarginTop } from '../../styles/base'
import { MAIN_HUB, NEW_GAME } from '../../config/routes'
import { getHasActiveGame } from '../../data/settings/selectors'
import { breakpoints } from '../../config/theme'

const mainMenuWrapper = css({
  padding: '0 2rem',

  [breakpoints.SM]: {
    padding: '0 4rem',
  },
})

export const MainMenu = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const hasActiveGame = useSelector(getHasActiveGame)

  const handleContinue = () => history.replace(MAIN_HUB)
  const handleNewGame = () => history.replace(NEW_GAME)

  return (
    <div css={mainMenuWrapper}>
      <button type="button" css={cyanSquareButton} onClick={handleContinue} disabled={!hasActiveGame}>
        {t('continueGame')}
      </button>
      <button type="button" css={[cyanSquareButton, largeMarginTop]} onClick={handleNewGame}>
        {t('newGame')}
      </button>
    </div>
  )
}
