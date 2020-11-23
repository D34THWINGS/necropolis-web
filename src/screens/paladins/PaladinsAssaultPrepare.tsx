import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/core'
import { lighten, transparentize } from 'polished'
import { ModalColor, modalInner, modalPanel } from '../../components/ui/Modal/modalStyles'
import { paladinAssaultPanel, paladinAssaultPanelInner } from './helpers/paladinAssaultStyles'
import { useTranslation } from '../../lang/useTranslation'
import { greenBox, h2Title } from '../../styles/base'
import { getDefense } from '../../data/selectors'
import { redSquareButton, resetButton } from '../../styles/buttons'
import { PaladinsAssaultPhase, TrapType } from '../../config/constants'
import { TrapButton, trapButtonBase } from './components/TrapButton'
import { addTrap, changeAssaultPhase, removeTrap } from '../../data/paladins/actions'
import { getTraps } from '../../data/paladins/selectors'
import { colors } from '../../config/theme'
import { TrapDetailsModal } from './components/TrapDetailsModal'

const preparePanel = [modalPanel(ModalColor.GREEN), paladinAssaultPanel]

const preparePanelInner = [modalInner(ModalColor.GREEN), paladinAssaultPanelInner]

const prepareLayout = css({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  alignSelf: 'stretch',
  margin: '0.5rem 0 1rem',
  flex: 1,
})

const placedTrapsPanel = [
  greenBox,
  css({
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: '0 0 calc(55% - 0.5rem)',
  }),
]

const trapsListTitle = [
  h2Title,
  css({
    fontSize: '1.3rem',
    color: colors.CYAN,
  }),
]

const trapsList = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
})

const trapsStashPanel = css({
  flex: '0 0 calc(45% - 0.5rem)',
})

const placedTrapButton = (type: TrapType) => [
  resetButton,
  trapButtonBase(type),
  css({
    margin: '0.5rem 0.5rem 0 0',
    borderRadius: '10px',
    border: `1px solid ${colors.DARK_GREEN}`,
    flex: '0 0 calc(50% - 0.33rem)',
    boxShadow: `inset 0px -10px 8px -8px rgba(0, 0, 0, 0.54), inset 0px 10px 8px -8px ${lighten(0.2, colors.CYAN)}`,

    '&:active': {
      boxShadow: `inset 0px 10px 8px -8px rgba(0, 0, 0, 0.54), inset 0px -10px 8px -8px ${transparentize(
        0.4,
        lighten(0.2, colors.CYAN),
      )}`,
    },

    '&:nth-of-type(2n)': {
      marginRight: 0,
    },
  }),
]

const assaultNextButton = [
  ...redSquareButton,
  css({
    width: 'auto',
    minWidth: '16rem',
  }),
]

export const PaladinsAssaultPrepare = () => {
  const { t } = useTranslation()
  const defense = useSelector(getDefense)
  const traps = useSelector(getTraps)
  const dispatch = useDispatch()
  const [openedTrap, setOpenedTrap] = useState<TrapType | null>(null)

  const handleAddTrap = (type: TrapType) => () => dispatch(addTrap(type))
  const handleRemoveTrap = (id: number) => () => dispatch(removeTrap(id))
  const handleOpenDetails = (type: TrapType) => () => setOpenedTrap(type)
  const handleCloseDetails = () => setOpenedTrap(null)
  const handleStartFighting = () => dispatch(changeAssaultPhase(PaladinsAssaultPhase.Fighting))

  return (
    <div css={preparePanel}>
      <div css={preparePanelInner}>
        <h2 css={h2Title}>{t('paladinsAssaultPrepare')}</h2>
        <div css={prepareLayout}>
          <div css={placedTrapsPanel}>
            <h3 css={trapsListTitle}>{t('paladinsAssaultPlacedTraps', traps.length, defense)}</h3>
            <div css={trapsList}>
              {traps.map(trap => (
                <button
                  key={trap.id}
                  css={placedTrapButton(trap.type)}
                  type="button"
                  onClick={handleRemoveTrap(trap.id)}
                  data-test-id="equippedTrap"
                >
                  {t('trapName', trap.type)}
                </button>
              ))}
            </div>
          </div>
          <div css={trapsStashPanel}>
            {Object.values(TrapType).map(type => (
              <TrapButton
                key={type}
                type={type}
                disabled={traps.length >= defense}
                onAddTrap={handleAddTrap(type)}
                onOpenDetails={handleOpenDetails(type)}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          css={assaultNextButton}
          disabled={traps.length === 0}
          onClick={handleStartFighting}
          data-test-id="beginFightPhaseButton"
        >
          {t('paladinsAssaultFight')}
        </button>
        <TrapDetailsModal type={openedTrap} onClose={handleCloseDetails} />
      </div>
    </div>
  )
}
