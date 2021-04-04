import React from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { modalCloseButton, modalCloseIcon } from '../../components/ui/Modal/modalStyles'
import { Image } from '../../components/images/Image'
import { cyanRoundButton, cyanSquareButton, resetButton } from '../../styles/buttons'
import closeIconUrl from '../../assets/images/icons/close.png'
import characterBackgroundUrl from '../../assets/images/characters/character-bg.jpg'
import characterArrowUrl from '../../assets/images/characters/character-arrow.png'
import marenneUrl from '../../assets/images/characters/marenne.png'
import { breakpoints, colors } from '../../config/theme'
import { greenBox, h2Title, smallMarginTop } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { gameCreated, resetGame } from '../../data/settings/actions'
import { MAIN_MENU } from '../../config/routes'
import backgroundImageUrl from '../../assets/images/background.jpg'
import { FrameInner, FrameWrapper } from '../../components/ui/Frame'
import { wobbleOnAppearing } from '../../styles/animations'

const newGameMenuWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  paddingTop: '1rem',
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
})

const scenarioSelectTitle = [
  h2Title,
  css({
    color: colors.WHITE,
    marginBottom: '1rem',
    fontSize: '2rem',

    [breakpoints.SM]: {
      marginBottom: '2rem',
    },
  }),
]

const characterModal = [
  wobbleOnAppearing,
  css({
    margin: 0,
    maxWidth: 'calc(100% - 2rem)',
    maxHeight: 'calc(100% - 5rem)',
    alignSelf: 'center',

    [breakpoints.SM]: {
      margin: 0,
      maxWidth: 'calc(100% - 4rem)',
    },
  }),
]

const characterFrame = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginTop: '0.5rem',
  border: `solid 3px ${colors.DARK_GREEN}`,
  borderRadius: '15px',
  backgroundImage: `url("${characterBackgroundUrl}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

const characterArrow = [
  resetButton,
  css({
    position: 'absolute',
    top: '50%',
  }),
]

const characterLeftArrow = [
  ...characterArrow,
  css({
    left: '0.5rem',
    transform: 'translate(-50%, -50%)',

    ':not(:disabled):active': {
      transform: 'translate(-50%, calc(-50% + 0.1rem))',
    },
  }),
]

const characterRightArrow = [
  ...characterArrow,
  css({
    right: '0.5rem',
    transform: 'translate(50%, -50%) rotateZ(180deg)',

    ':not(:disabled):active': {
      transform: 'translate(50%, calc(-50% + 0.1rem))  rotateZ(180deg)',
    },
  }),
]

export const NewGameMenu = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleBegin = () => {
    dispatch(gameCreated())
    dispatch(resetGame())
  }

  const handleClose = () => history.replace(MAIN_MENU)

  return (
    <div css={newGameMenuWrapper}>
      <h1 css={scenarioSelectTitle}>{t('characterChoosing')}</h1>
      <FrameWrapper css={characterModal}>
        <FrameInner>
          <h2 css={h2Title}>{t('marenne')}</h2>
          <div css={characterFrame}>
            <Image src={marenneUrl} size="12rem" />
            <button type="button" css={characterLeftArrow}>
              <Image src={characterArrowUrl} size="3rem" />
            </button>
            <button type="button" css={characterRightArrow}>
              <Image src={characterArrowUrl} size="3rem" />
            </button>
          </div>
          <div css={[greenBox, smallMarginTop]}>{t('marenneDescription')}</div>
          <button
            type="button"
            css={[...cyanSquareButton, smallMarginTop]}
            onClick={handleBegin}
            data-test-id="startGameButton"
          >
            {t('beginGame')}
          </button>
        </FrameInner>
        <button css={[...cyanRoundButton, modalCloseButton]} type="button" onClick={handleClose}>
          <img css={modalCloseIcon} src={closeIconUrl} alt="" />
        </button>
      </FrameWrapper>
    </div>
  )
}
