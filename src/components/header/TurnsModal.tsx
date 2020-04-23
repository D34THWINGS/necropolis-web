/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal'
import { greenBox, h2Title, noMargin, textCenter, textColor } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { EVENTS_TURN_SPACING, PALADINS_INCREASE_SPACING, PALADINS_STRENGTH_INCREASE } from '../../config/constants'
import { greenSquareButton } from '../../styles/buttons'
import { nextPhase } from '../../data/turn/actions'
import { getTurn } from '../../data/turn/selectors'
import { getPaladinsCalledToArms, getPaladinsStrength } from '../../data/paladins/selectors'
import { PaladinsIcon } from '../images/PaladinsIcon'

const smallMarginBottom = css({
  margin: '0 0 0.5rem',
})

export type TurnsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const TurnsModal = ({ isOpen, onClose }: TurnsModalProps) => {
  const { t } = useTranslation()
  const turn = useSelector(getTurn)
  const paladinsStrength = useSelector(getPaladinsStrength)
  const paladinsCalledToArms = useSelector(getPaladinsCalledToArms)
  const dispatch = useDispatch()

  const nextEventIn = EVENTS_TURN_SPACING - (turn % EVENTS_TURN_SPACING)

  const handleSkipTurn = () => {
    dispatch(nextPhase())
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 css={[h2Title, smallMarginBottom]}>{t('turns')}</h2>
      <div css={[greenBox, smallMarginBottom]}>
        <p css={smallMarginBottom}>{t('turnsEventSpacing', EVENTS_TURN_SPACING)}</p>
        <p css={noMargin}>{t('turnsNextEvent', nextEventIn)}</p>
      </div>
      {paladinsCalledToArms && (
        <div css={[greenBox, smallMarginBottom]}>
          <p css={smallMarginBottom}>{t('paladins', PALADINS_STRENGTH_INCREASE, PALADINS_INCREASE_SPACING)}</p>
          <p css={[smallMarginBottom, textColor('RED')]}>{t('paladinsStrength', paladinsStrength)}</p>
          <p css={[noMargin, textCenter]}>
            <PaladinsIcon />
          </p>
        </div>
      )}
      <button type="button" css={greenSquareButton} onClick={handleSkipTurn}>
        {t('skipTurn')}
      </button>
    </Modal>
  )
}
