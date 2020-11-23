import React from 'react'
import { css } from '@emotion/core'
import { transparentize, lighten } from 'polished'
import { buttonDisabled, cyanSquareButton, resetButton } from '../../../styles/buttons'
import { useTranslation } from '../../../lang/useTranslation'
import { TrapType } from '../../../config/constants'
import { trapsImageMap } from '../helpers/trapsImageMap'
import { breakpoints, colors } from '../../../config/theme'

const trapButtonOuter = css({
  position: 'relative',
})

export const trapButtonBase = (type: TrapType) =>
  css({
    display: 'block',
    backgroundImage: `url("${trapsImageMap[type]}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textIndent: -10000,

    '&::before': {
      content: '" "',
      width: 1,
      marginLeft: -1,
      float: 'left',
      height: 0,
      paddingTop: 'calc(0.55 * 100%)',
    },
  })

const addTrapButton = (type: TrapType) => [
  resetButton,
  buttonDisabled,
  trapButtonBase(type),
  css({
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    border: `2px solid ${colors.DARK_GREEN}`,
    borderRight: 'none',
    width: '100%',
    height: '4rem',
    boxShadow: `inset 0px -18px 15px -8px rgba(0, 0, 0, 0.54), inset 0px 18px 15px -8px ${lighten(0.2, colors.CYAN)}`,

    '&:active': {
      boxShadow: `inset 0px 18px 15px -8px rgba(0, 0, 0, 0.54), inset 0px -18px 15px -8px ${transparentize(
        0.4,
        lighten(0.2, colors.CYAN),
      )}`,
    },

    [breakpoints.SM]: {
      height: '6rem',
    },
  }),
]

const openDetailsButton = [
  ...cyanSquareButton,
  css({
    position: 'absolute',
    top: '50%',
    right: 0,
    borderRight: 'none',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: 'auto',
    transform: 'translateY(-50%)',
    fontSize: '1.3rem',

    [breakpoints.SM]: {
      fontSize: '1.5rem',
    },
  }),
]

export type TrapButtonProps = {
  type: TrapType
  disabled: boolean
  onAddTrap: () => void
  onOpenDetails: () => void
}

export const TrapButton = ({ type, disabled, onAddTrap, onOpenDetails }: TrapButtonProps) => {
  const { t } = useTranslation()
  return (
    <div css={trapButtonOuter}>
      <button
        type="button"
        css={addTrapButton(type)}
        disabled={disabled}
        onClick={onAddTrap}
        data-test-id="availableTrapButton"
      >
        {t('trapName', type)}
      </button>
      <button type="button" css={openDetailsButton} onClick={onOpenDetails}>
        ?
      </button>
    </div>
  )
}
