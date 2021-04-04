import React, { ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { Obstacle } from '../../../../data/expeditions/helpers'
import { getUndeads } from '../../../../data/undeads/selectors'
import { Image } from '../../../../components/images/Image'
import fleeIconUrl from '../../../../assets/images/expeditions/flee.png'
import rollIconUrl from '../../../../assets/images/expeditions/dices/dice.png'
import { colors, fonts } from '../../../../config/theme'
import { ExpeditionObstacleRow } from './ExpeditionObstacleRow'
import { cyanRoundButton, darkGreenRoundButton } from '../../../../styles/buttons'

const obstacleTitle = css({
  margin: '0 -1rem 0.8rem',
  padding: '0.3rem 1rem',
  backgroundColor: colors.GREEN,
  fontFamily: fonts.TITLES,
  textShadow: 'none',
  textAlign: 'center',
})

const spacer = css({
  flex: '1 0 auto',
})

const obstacleFooter = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
})

const rollButton = [
  ...cyanRoundButton,
  css({
    padding: '0.5rem',
  }),
]

const fleeButton = [
  ...darkGreenRoundButton,
  css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.7rem 0.5rem 0.3rem',
  }),
]

export type ExpeditionObstacleProps = {
  title: ReactNode
  obstacle: Obstacle
  renderRowTitle: (index: number) => ReactNode
}

export const ExpeditionObstacle = ({ title, obstacle, renderRowTitle }: ExpeditionObstacleProps) => {
  const [activeRow, setActiveRow] = useState<string | null>(obstacle.rows[0].id)
  const undeads = useSelector(getUndeads)

  const handleToggleRow = (rowId: string) => () =>
    setActiveRow(previousActiveRow => (previousActiveRow === rowId ? null : rowId))

  return (
    <>
      <h2 css={obstacleTitle}>{title}</h2>
      {obstacle.rows.map(row => (
        <ExpeditionObstacleRow
          key={row.id}
          title={renderRowTitle(row.index)}
          row={row}
          undeads={undeads}
          isActive={activeRow === row.id}
          onToggleRow={handleToggleRow(row.id)}
        />
      ))}
      <div css={spacer} />
      <div css={obstacleFooter}>
        <button css={fleeButton} type="button">
          <Image src={fleeIconUrl} size="2.5rem" />
        </button>
        <button css={rollButton} type="button">
          <Image src={rollIconUrl} size="4rem" />
        </button>
      </div>
    </>
  )
}
