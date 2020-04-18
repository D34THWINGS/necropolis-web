/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalProps } from '../ui/Modal'
import { greenBox, h2Title, noMargin, textCenter, textColor } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { EVENTS_TURN_SPACING, PALADINS_INCREASE_SPACING, PALADINS_STRENGTH_INCREASE } from '../../config/constants'
import { Icon } from '../icons/Icon'
import paladin1IconUrl from '../../assets/images/paladins/paladins-1.png'
import paladin2IconUrl from '../../assets/images/paladins/paladins-2.png'
import paladin3IconUrl from '../../assets/images/paladins/paladins-3.png'
import { greenSquareButton } from '../../styles/buttons'
import { nextTurn } from '../../data/turn/actions'
import { getTurn } from '../../data/turn/selectors'
import { getPaladinsStrength } from '../../data/paladins/selectors'

const paladinIcons = [paladin1IconUrl, paladin2IconUrl, paladin3IconUrl]

const smallMarginBottom = css({
  margin: '0 0 0.5rem',
})

export type TurnsModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>

export const TurnsModal = ({ isOpen, onClose }: TurnsModalProps) => {
  const { t } = useTranslation()
  const turn = useSelector(getTurn)
  const paladinsStrength = useSelector(getPaladinsStrength)
  const dispatch = useDispatch()

  const nextEventIn = EVENTS_TURN_SPACING - (turn % EVENTS_TURN_SPACING)

  const handleSkipTurn = () => {
    dispatch(nextTurn())
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 css={[h2Title, smallMarginBottom]}>{t('turns')}</h2>
      <div css={[greenBox, smallMarginBottom]}>
        <p css={smallMarginBottom}>{t('turnsEventSpacing', EVENTS_TURN_SPACING)}</p>
        <p css={noMargin}>{t('turnsNextEvent', nextEventIn)}</p>
      </div>
      <div css={[greenBox, smallMarginBottom]}>
        <p css={smallMarginBottom}>{t('paladins', PALADINS_STRENGTH_INCREASE, PALADINS_INCREASE_SPACING)}</p>
        <p css={[smallMarginBottom, textColor('RED')]}>{t('paladinsStrength', paladinsStrength)}</p>
        <p css={[noMargin, textCenter]}>
          <Icon src={paladinIcons[0]} size="8rem" />
        </p>
      </div>
      <button type="button" css={greenSquareButton} onClick={handleSkipTurn}>
        {t('skipTurn')}
      </button>
    </Modal>
  )
}
