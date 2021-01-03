import React from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { lighten, transparentize } from 'polished'
import { BuildingExtraTrap } from '../../../data/paladins/helpers'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { h2Title } from '../../../styles/base'
import { useTranslation } from '../../../lang/useTranslation'
import { TrapType } from '../../../config/constants'
import { resetButton } from '../../../styles/buttons'
import { trapButtonBase } from './TrapButton'
import { colors } from '../../../config/theme'
import { addTrap, setBuildingExtraTrap } from '../../../data/paladins/actions'

const trapList = css({
  display: 'grid',
  gridTemplateColumns: 'calc(50% - 0.25rem) calc(50% - 0.25rem)',
  rowGap: '0.5rem',
  columnGap: '0.5rem',
})

const trapButton = (type: TrapType) => [
  resetButton,
  trapButtonBase(type),
  css({
    borderRadius: '10px',
    border: `1px solid ${colors.DARK_GREEN}`,
    boxShadow: `inset 0px -10px 8px -8px rgba(0, 0, 0, 0.54), inset 0px 10px 8px -8px ${lighten(0.2, colors.CYAN)}`,

    '&:active': {
      boxShadow: `inset 0px 10px 8px -8px rgba(0, 0, 0, 0.54), inset 0px -10px 8px -8px ${transparentize(
        0.4,
        lighten(0.2, colors.CYAN),
      )}`,
    },
  }),
]

export type BuildExtraTrapModalProps = {
  buildingExtraTrap: BuildingExtraTrap | null
}

export const BuildExtraTrapModal = ({ buildingExtraTrap }: BuildExtraTrapModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleChooseTrap = (type: TrapType) => () => {
    dispatch(setBuildingExtraTrap(null))
    dispatch(addTrap(type))
  }

  return (
    <Modal isOpen={!!buildingExtraTrap} color={ModalColor.GREEN}>
      <h2 css={h2Title}>{t('buildingExtraTrap')}</h2>
      <div css={trapList}>
        {Object.values(TrapType).map(type => (
          <button
            key={type}
            css={trapButton(type)}
            type="button"
            onClick={handleChooseTrap(type)}
            data-test-id="chooseTrapButton"
          >
            {t('trapName', type)}
          </button>
        ))}
      </div>
    </Modal>
  )
}
