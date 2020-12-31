import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { lighten, transparentize } from 'polished'
import { ModalColor, modalInner, modalPanel } from '../../components/ui/Modal/modalStyles'
import { paladinAssaultPanel, paladinAssaultPanelInner } from './helpers/paladinAssaultStyles'
import { greenBox, h2Title, textColor } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { NECROPOLIS_STRUCTURE_POINTS, TrapType } from '../../config/constants'
import { breakpoints, colors } from '../../config/theme'
import { getPaladinsAssault, getStructureHealth } from '../../data/paladins/selectors'
import { Image } from '../../components/images/Image'
import { trapButtonBase } from './components/TrapButton'
import paladinsStrengthIcon from '../../assets/images/paladins/paladins-strengh.png'
import structurePointsIcon from '../../assets/images/paladins/structure-points.png'
import { buttonDisabled, redSquareButton, resetButton } from '../../styles/buttons'
import { skipPaladin, triggerTrap } from '../../data/paladins/actions'
import { ChangePaladinCategoryModal } from './components/ChangePaladinCategoryModal'
import { PaladinFightCard } from './components/PaladinFightCard'
import { isPaladinAlive } from '../../data/paladins/helpers'
import { Trap } from '../../data/paladins/traps'

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

const skipPaladinButton = [
  ...redSquareButton,
  css({
    margin: '0.25rem 0',
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

export const PaladinsAssaultFight = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const assault = useSelector(getPaladinsAssault)
  const structureHealth = useSelector(getStructureHealth)

  if (!assault) {
    return null
  }

  const { deck, traps } = assault
  const remainingPaladins = deck.filter(isPaladinAlive)
  const remainingTraps = traps.filter(trap => !trap.used)

  if (remainingPaladins.length === 0) {
    return null
  }

  const activePaladin = remainingPaladins[0]

  const handleUseTrap = (trap: Trap) => () => dispatch(triggerTrap(trap, activePaladin.id))
  const handleSkipPaladin = () => dispatch(skipPaladin(activePaladin.id))

  return (
    <div css={fightPanel}>
      <div css={fightPanelInner}>
        <h2 css={h2Title}>{t('paladinsAssaultBattle')}</h2>
        <PaladinFightCard paladin={activePaladin} />
        <div css={fightStatus}>
          <div css={fightStatusCounter} data-test-id="paladinCardsCounter">
            {deck.length - remainingPaladins.length + 1}&nbsp;<span css={textColor('RED')}>/&nbsp;{deck.length}</span>
            <Image src={paladinsStrengthIcon} marginLeft="0.3rem" />
          </div>
          <div css={fightStatusCounter} data-test-id="structureHealthCounter">
            {structureHealth}&nbsp;<span css={textColor('CAMO')}>/&nbsp;{NECROPOLIS_STRUCTURE_POINTS}</span>
            <Image src={structurePointsIcon} marginLeft="0.3rem" />
          </div>
        </div>
        <div css={trapPool}>
          {remainingTraps.map(trap => (
            <button
              key={trap.id}
              type="button"
              css={trapUseButton(trap.type)}
              onClick={handleUseTrap(trap)}
              data-test-id="useTrapButton"
            >
              {t('trapName', trap.type)}
            </button>
          ))}
          <button type="button" css={skipPaladinButton} onClick={handleSkipPaladin} data-test-id="skipPaladinButton">
            {t('skipPaladin')}(<span css={textColor('RED')}>{-activePaladin.damages}</span>
            <Image src={structurePointsIcon} marginLeft="0.3rem" />)
          </button>
        </div>
        <ChangePaladinCategoryModal activePaladin={activePaladin} />
      </div>
    </div>
  )
}
