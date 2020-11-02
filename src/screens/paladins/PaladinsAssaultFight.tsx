import React from 'react'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { lighten, transparentize } from 'polished'
import { ModalColor, modalInner, modalPanel } from '../../components/ui/Modal/modalStyles'
import { paladinAssaultPanel, paladinAssaultPanelInner } from './helpers/paladinAssaultStyles'
import { darkRedBox, greenBox, h2Title, redBox, smallMarginTop, textColor } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import {
  NECROPOLIS_STRUCTURE_POINTS,
  PALADINS_DAMAGES_MAP,
  PALADINS_HEALTH_MAP,
  PaladinType,
  TrapType,
} from '../../config/constants'
import { paladinsImageMap } from './helpers/paladinsImageMap'
import { breakpoints, colors, fonts, shadows } from '../../config/theme'
import { getPaladinsAssault } from '../../data/paladins/selectors'
import { Image } from '../../components/images/Image'
import { trapButtonBase } from './components/TrapButton'
import damageIcon from '../../assets/images/paladins/paladin-damage.png'
import hpIcon from '../../assets/images/paladins/paladins-hp.png'
import paladinsStrengthIcon from '../../assets/images/paladins/paladins-strengh.png'
import materialsIcon from '../../assets/images/resources/materials.png'
import { buttonDisabled, resetButton } from '../../styles/buttons'
import { useTrap } from '../../data/paladins/actions'

const fightPanel = [modalPanel(ModalColor.RED), paladinAssaultPanel]

const fightPanelInner = [
  modalInner(ModalColor.RED),
  paladinAssaultPanelInner,
  css({
    alignItems: 'stretch',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  }),
]

const activePaladinsDetails = [
  redBox,
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: '1.2rem',
  }),
]

const paladinAvatar = (type: PaladinType) =>
  css({
    marginRight: '0.5rem',
    borderRadius: '10px',
    border: `1px solid ${colors.DARK_RED}`,
    width: '5rem',
    height: '5rem',
    backgroundImage: `url(${paladinsImageMap[type]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  })

const activePaladinHeader = css({
  display: 'flex',
})

const activePaladinName = css({
  fontSize: '1.3rem',
  fontFamily: fonts.TITLES,
  color: colors.RED,
  textShadow: shadows.TEXT_SOLID,
})

const activePaladinHeaderText = css({
  display: 'flex',
  justifyContent: 'space-between',
})

const activePaladinHealth = [
  darkRedBox,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.5rem',
    padding: '0.5rem',
    alignSelf: 'center',
    minWidth: '10rem',
  }),
]

const usedHealthPoint = css({ filter: 'grayscale(1)' })

const trapPool = [
  greenBox,
  css({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  }),
]

const trapUseButton = (type: TrapType) => [
  resetButton,
  buttonDisabled,
  trapButtonBase(type),
  css({
    margin: '0.25rem 0.5rem 0.25rem 0',
    border: `2px solid ${colors.DARK_GREEN}`,
    borderRadius: '10px',
    flex: '0 0 calc(50% - 0.25rem)',
    boxShadow: `inset 0px -10px 8px -8px rgba(0, 0, 0, 0.54), inset 0px 10px 8px -8px ${lighten(0.2, colors.CYAN)}`,

    '&:active': {
      boxShadow: `inset 0px 10px 8px -8px rgba(0, 0, 0, 0.54), inset 0px -10px 8px -8px ${transparentize(
        0.4,
        lighten(0.2, colors.CYAN),
      )}`,
    },

    [breakpoints.MAX_SM]: {
      '&:nth-of-type(2n)': {
        marginRight: 0,
      },
    },

    [breakpoints.SM]: {
      flex: '0 0 calc(33% - 0.33rem)',

      '&:nth-of-type(3n)': {
        marginRight: 0,
      },
    },
  }),
]

const fightStatus = css({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '0.5rem',
})

const fightStatusCounter = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const structurePointsIcon = css({ filter: 'hue-rotate(45deg)' })

export const PaladinsAssaultFight = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const assault = useSelector(getPaladinsAssault)

  if (!assault) {
    return null
  }

  const { deck, traps } = assault
  const remainingPaladins = deck.filter(card => card.health > 0)

  if (remainingPaladins.length === 0) {
    return null
  }

  const activePaladin = remainingPaladins[0]
  const maxHealth = PALADINS_HEALTH_MAP[activePaladin.type]

  const handleUseTrap = (id: number) => () => dispatch(useTrap(id))

  return (
    <div css={fightPanel}>
      <div css={fightPanelInner}>
        <h2 css={h2Title}>{t('paladinsAssaultBattle')}</h2>
        <div css={activePaladinsDetails}>
          <div css={activePaladinHeader}>
            <div css={paladinAvatar(activePaladin.type)} />
            <div>
              <div css={activePaladinName}>{t('paladinName', activePaladin.type)}</div>
              <div css={activePaladinHeaderText}>
                <span css={textColor('RED')}>
                  {PALADINS_DAMAGES_MAP[activePaladin.type]}&nbsp;
                  <Image src={damageIcon} />
                </span>
                <span>{t('paladinType')}</span>
              </div>
            </div>
          </div>
          <div css={smallMarginTop}>{t('paladinAbility', activePaladin.type)}</div>
          <div css={activePaladinHealth}>
            {Array.from({ length: maxHealth })
              .map((_, index) => index)
              .map(index => (
                <Image
                  css={index < activePaladin.health ? undefined : usedHealthPoint}
                  key={index}
                  src={hpIcon}
                  marginRight={index < maxHealth - 1 ? '0.5rem' : ''}
                />
              ))}
          </div>
        </div>
        <div css={fightStatus}>
          <div css={fightStatusCounter}>
            {deck.length - remainingPaladins.length + 1}&nbsp;<span css={textColor('RED')}>/&nbsp;{deck.length}</span>
            <Image src={paladinsStrengthIcon} marginLeft="0.3rem" />
          </div>
          <div css={fightStatusCounter}>
            8&nbsp;<span css={textColor('CYAN')}>/&nbsp;{NECROPOLIS_STRUCTURE_POINTS}</span>
            <Image css={structurePointsIcon} src={materialsIcon} marginLeft="0.3rem" />
          </div>
        </div>
        <div css={trapPool}>
          {traps.map(trap => (
            <button
              key={trap.id}
              type="button"
              css={trapUseButton(trap.type)}
              disabled={trap.used}
              onClick={handleUseTrap(trap.id)}
            >
              {t('trapName', trap.type)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
