import React, { ReactNode, KeyboardEvent } from 'react'
import { css } from '@emotion/react'
import { TalentsList } from '../../../../components/talents/TalentsList'
import { UndeadPortrait } from '../../../../components/undeads/UndeadPortrait'
import { getUndeadDice, Undead, UndeadId } from '../../../../data/undeads/helpers'
import { ObstacleRow } from '../../../../data/expeditions/helpers'
import { colors, fonts, frameColors } from '../../../../config/theme'
import { Image } from '../../../../components/images/Image'
import anyDiceIconUrl from '../../../../assets/images/expeditions/dices/any-dice.png'
import hpCostIcon from '../../../../assets/images/icons/hp-cost.png'
import { buttonBase } from '../../../../styles/buttons'
import { Dice } from '../../../../components/images/Dice'

const obstacleRowWrapper = (isFailed: boolean) =>
  css({
    padding: '0.3rem 0.8rem',
    borderRadius: '15px',
    backgroundColor: isFailed ? colors.MEDIUM_RED : colors.GREEN,
  })

const obstacleRowHeader = css({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  outline: 'none',
})

const obstacleRowTitle = css({
  margin: 0,
  padding: 0,
  fontFamily: fonts.TITLES,
  fontSize: '1.3rem',
  color: colors.CYAN,
  textShadow: 'none',
})

const caret = css({
  marginRight: '0.5rem',
  height: '0.5rem',
})

const obstacleRowBody = (isActive: boolean) =>
  css({
    height: isActive ? 'auto' : '0px',
    overflow: 'hidden',
  })

const obstacleRowStats = css({
  display: 'flex',
  marginTop: '0.3rem',
  borderRadius: '10px',
  overflow: 'hidden',
  fontSize: '1.2rem',
})

const obstacleRowStatBox = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '0.3rem 0rem',
  flex: '0 0 50%',
})

const obstacleRowRequirements = (isFailed: boolean) => [
  obstacleRowStatBox,
  css({
    backgroundColor: isFailed ? '#B20000' : colors.BLUE_GREEN,
  }),
]

const obstacleRowCosts = (isFailed: boolean) => [
  obstacleRowStatBox,
  css({
    color: colors.RED,
    backgroundColor: isFailed ? frameColors.DARK_RED : colors.MEDIUM_RED,
  }),
]

const textWithIcon = css({
  display: 'inline-flex',
  alignItems: 'center',
})

const obstacleRowSlotsList = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  margin: '0.5rem 0',
})

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
  })

const voidSlot = css({
  flex: '0 1 6rem',
})

const spacer = css({
  flex: '1 1 auto',
})

const obstacleRowRequirementsDetails = css({
  fontFamily: fonts.TITLES,
  fontSize: '1.2rem',
})

const dropArrow = css({
  marginTop: '0.2rem',
  height: '2.5rem',
})

export type ExpeditionObstacleRowProps = {
  title: ReactNode
  row: ObstacleRow
  undeads: Undead[]
  isActive: boolean
  rolls: [UndeadId, number][] | null
  onToggleRow: () => void
  onRemoveUndead: (undeadId: string) => void
}

export const ExpeditionObstacleRow = ({
  title,
  row,
  undeads,
  isActive,
  rolls,
  onToggleRow,
  onRemoveUndead,
}: ExpeditionObstacleRowProps) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Space') {
      onToggleRow()
    }
  }

  const rollsMap = new Map(rolls)
  const hasRolledDices = !!rolls
  const isRowFailed = hasRolledDices && (rolls?.reduce((sum, roll) => sum + roll[1], 0) ?? 0) < row.requiredTalent[1]

  return (
    <div key={row.id} css={obstacleRowWrapper(isRowFailed)}>
      <div css={obstacleRowHeader} onClick={onToggleRow} onKeyPress={handleKeyPress} role="button" tabIndex={-1}>
        <svg css={caret} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 9">
          <path
            d="M13.668 1.006l-.674-.674A1.15 1.15 0 0012.176 0c-.318 0-.587.11-.809.332L7 4.7 2.633.333A1.101 1.101 0 001.824 0c-.311 0-.584.11-.818.333l-.665.674c-.227.227-.341.5-.341.817 0 .324.114.593.341.809l5.85 5.85c.216.227.485.341.809.341.317 0 .59-.114.818-.341l5.85-5.85A1.1 1.1 0 0014 1.824c0-.311-.11-.584-.332-.818z"
            fill="#80F4D0"
          />
        </svg>
        <h2 css={obstacleRowTitle}>{title}</h2>
        <div css={spacer} />
        <TalentsList
          css={obstacleRowRequirementsDetails}
          values={[row.requiredTalent]}
          renderText={text => (
            <>
              {row.slottedUndeads.length}/{text}
            </>
          )}
        />
      </div>
      <div css={obstacleRowBody(isActive)}>
        <div css={obstacleRowStats}>
          <div css={obstacleRowRequirements(isRowFailed)}>
            <span css={textWithIcon}>
              {row.diceSlots}
              <Image src={anyDiceIconUrl} marginLeft="0.2rem" />
            </span>
            <span css={textWithIcon}>
              <TalentsList values={[row.requiredTalent]} />
            </span>
          </div>
          <div css={obstacleRowCosts(isRowFailed)}>
            <span css={textWithIcon}>
              -{row.healthCost}&nbsp;
              <Image src={hpCostIcon} marginLeft="0.2rem" />
            </span>
          </div>
        </div>
        <div css={obstacleRowSlotsList}>
          {Array.from({ length: row.diceSlots })
            .map((_, i) => i)
            .map(index => {
              const slottedUndeadId = row.slottedUndeads[index]
              const slottedUndead = row.slottedUndeads[index] && undeads.find(undead => undead.id === slottedUndeadId)

              if (hasRolledDices && slottedUndead) {
                const dice = getUndeadDice(slottedUndead, row.requiredTalent[0])
                return (
                  <div key={index} css={obstacleRowSlot(isRowFailed)}>
                    <UndeadPortrait type={slottedUndead.type} size="2rem" />
                    <Dice value={rollsMap.get(slottedUndead.id) ?? 0} type={dice.type} size="2.5rem" />
                  </div>
                )
              }

              if (slottedUndead) {
                const dice = getUndeadDice(slottedUndead, row.requiredTalent[0])
                return (
                  <button
                    key={index}
                    type="button"
                    css={[...buttonBase, obstacleRowSlot(isRowFailed)]}
                    onClick={() => onRemoveUndead(slottedUndead.id)}
                  >
                    <UndeadPortrait type={slottedUndead.type} size="2rem" />
                    <Dice value={rollsMap.get(slottedUndead.id) ?? dice.maxValue} type={dice.type} size="2.5rem" />
                  </button>
                )
              }

              if (hasRolledDices) {
                return <div key={index} css={voidSlot} />
              }

              return (
                <div key={index} css={obstacleRowSlot(isRowFailed)}>
                  <svg css={dropArrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 41">
                    <path
                      d="M10.18 22.465H3.356c-.75 0-1.357.592-1.357 1.322 0 .374.163.731.449.982L16.02 36.662a1.385 1.385 0 001.765.04L32.713 24.81c.58-.462.666-1.294.191-1.86a1.371 1.371 0 00-1.047-.484h-6.763c.35-10.44 4.932-16.954 13.98-19.89a1.325 1.325 0 00.908-1.466A1.347 1.347 0 0038.642 0C22.662 0 10.92 9.368 10.18 22.465z"
                      fill="#80F4D0"
                    />
                  </svg>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
