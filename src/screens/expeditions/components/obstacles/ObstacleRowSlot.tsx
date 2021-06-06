import React from 'react'
import { css } from '@emotion/react'
import { UndeadPortrait } from '../../../../components/undeads/UndeadPortrait'
import { RollingDice } from '../../../../components/images/RollingDice'
import { colors, frameColors, transitions } from '../../../../config/theme'
import { Undead, UndeadDice } from '../../../../data/undeads/helpers'
import { buttonBase } from '../../../../styles/buttons'

const obstacleRowSlot = (isFailed: boolean) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0.2rem',
    flex: '0 1 6rem',
    borderRadius: '10px',
    border: `solid 2px ${isFailed ? colors.RED : colors.DARK_GREEN}`,
    height: '4rem',
    backgroundColor: isFailed ? frameColors.DARK_RED : frameColors.DARK_GREEN,
    transition: transitions.SLOW,
  })

type ObstacleRowSlotProps = {
  isFailed: boolean
  undead: Undead
  dice: UndeadDice
  roll: number
  readOnly?: boolean
  onClick?: () => void
}

export const ObstacleRowSlot = ({ isFailed, undead, dice, roll, readOnly, onClick }: ObstacleRowSlotProps) => {
  const content = (
    <>
      <UndeadPortrait type={undead.type} size="2rem" />
      <RollingDice value={roll} type={dice.type} size="3rem" undeadId={undead.id} />
    </>
  )

  if (readOnly) {
    return <div css={obstacleRowSlot(isFailed)}>{content}</div>
  }

  return (
    <button type="button" css={[...buttonBase, obstacleRowSlot(isFailed)]} onClick={onClick}>
      {content}
    </button>
  )
}
