import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { greenBox, h2Title, noMargin, smallMarginTop, textCenter, textColor } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import {
  EVENTS_TURN_SPACING,
  PALADINS_INCREASE_SPACING,
  PALADINS_STRENGTH_INCREASE,
  TurnPhase,
} from '../../config/constants'
import { greenSquareButton } from '../../styles/buttons'
import { nextPhase } from '../../data/turn/actions'
import { getCurrentPhase, getTurn } from '../../data/turn/selectors'
import { getPaladinsCalledToArms, getPaladinsCounter, getPaladinsStrength } from '../../data/paladins/selectors'
import { PaladinsIcon } from '../images/PaladinsIcon'

const smallMarginBottom = css({
  margin: '0 0 0.5rem',
})

const strengthDefenseText = css({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0.4rem 0',
})

export type TurnsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const TurnsModal = ({ isOpen, onClose }: TurnsModalProps) => {
  const { t } = useTranslation()
  const turn = useSelector(getTurn)
  const currentPhase = useSelector(getCurrentPhase)
  const paladinsStrength = useSelector(getPaladinsStrength)
  const paladinsCounter = useSelector(getPaladinsCounter)
  const paladinsCalledToArms = useSelector(getPaladinsCalledToArms)
  const dispatch = useDispatch()

  const nextEventIn = EVENTS_TURN_SPACING - (turn % EVENTS_TURN_SPACING)

  const handleSkipTurn = () => {
    dispatch(nextPhase())
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 css={h2Title}>{t('turns')}</h2>
      <div css={[greenBox, smallMarginTop]}>
        <p css={smallMarginBottom}>{t('turnsEventSpacing', EVENTS_TURN_SPACING)}</p>
        <p css={noMargin}>{t('turnsNextEvent', nextEventIn)}</p>
      </div>
      {paladinsCalledToArms && (
        <div css={[greenBox, smallMarginTop]}>
          <p css={smallMarginBottom}>{t('paladins', PALADINS_STRENGTH_INCREASE, PALADINS_INCREASE_SPACING)}</p>
          <p css={strengthDefenseText}>
            <span css={textColor('RED')}>{t('paladinsStrength', paladinsStrength)}</span>
          </p>
          <p css={[noMargin, textCenter]}>
            <PaladinsIcon counter={paladinsCounter} />
          </p>
        </div>
      )}
      <button
        type="button"
        css={[...greenSquareButton, smallMarginTop]}
        onClick={handleSkipTurn}
        disabled={currentPhase !== TurnPhase.Action}
      >
        {t('skipTurn')}
      </button>
    </Modal>
  )
}
