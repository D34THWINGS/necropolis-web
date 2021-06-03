import React, { ReactNode, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { isObstaclePassed, isObstacleRowPassed, Obstacle } from '../../../../data/expeditions/helpers'
import { getUndeads } from '../../../../data/undeads/selectors'
import { Image } from '../../../../components/images/Image'
import fleeIconUrl from '../../../../assets/images/expeditions/flee.png'
import rollIconUrl from '../../../../assets/images/expeditions/dices/dice.png'
import { colors, fonts, frameColors } from '../../../../config/theme'
import { ExpeditionObstacleRow } from './ExpeditionObstacleRow'
import { cyanRoundButton, cyanSquareButton, darkGreenRoundButton, redSquareButton } from '../../../../styles/buttons'
import {
  applyObstacleConsequences,
  clearObstacle,
  removeUndeadFromObstacle,
  rollObstacleDices,
  setObstacleActiveRow,
} from '../../../../data/expeditions/actions'
import { greenBox, redBox, smallMarginTop, textColor } from '../../../../styles/base'
import { useTranslation } from '../../../../lang/useTranslation'
import { UndeadPortrait } from '../../../../components/undeads/UndeadPortrait'
import hpCostIcon from '../../../../assets/images/icons/hp-cost.png'
import { ResourceIcon } from '../../../../components/resources/ResourceIcon'
import { ResourceType } from '../../../../config/constants'
import { ResourceLoot } from '../../../../components/resources/ResourceLoot'
import { gainResources, ResourcePayload } from '../../../../data/resources/actions'

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

const consequencesBox = [
  redBox,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: '0.5rem',
  }),
]

const consequencesSlot = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: '0 0.4rem 0.4rem',
  padding: '0.2rem',
  flex: '0 1 6rem',
  borderRadius: '10px',
  height: '4rem',
  backgroundColor: frameColors.DARK_RED,
})

export type ExpeditionObstacleProps = {
  title: ReactNode
  rewardText: ReactNode
  rewardResources: [ResourceType, number][]
  obstacle: Obstacle
  renderRowTitle: (index: number) => ReactNode
  onEnd: () => void
  onFlee: () => void
}

export const ExpeditionObstacle = ({
  title,
  rewardText,
  rewardResources,
  obstacle,
  renderRowTitle,
  onEnd,
  onFlee,
}: ExpeditionObstacleProps) => {
  const { t } = useTranslation()
  const undeads = useSelector(getUndeads)
  const dispatch = useDispatch()
  const [showReward, setShowReward] = useState(false)

  const hasRolledDices = !!obstacle.rolls
  const rollsMap = new Map(obstacle.rolls)
  const isSuccess = isObstaclePassed(obstacle)

  const handleToggleRow = (rowId: string) => () => dispatch(setObstacleActiveRow(rowId))
  const handleRemoveUndead = (undeadId: string) => dispatch(removeUndeadFromObstacle(undeadId))
  const handleRollDices = () => dispatch(rollObstacleDices())
  const handleApplyConsequences = () => dispatch(applyObstacleConsequences())
  const handleShowReward = () => setShowReward(true)
  const handleEndObstacle = () => {
    dispatch(clearObstacle())
    dispatch(
      gainResources(rewardResources.reduce<ResourcePayload>((acc, [type, value]) => ({ ...acc, [type]: value }), {})),
    )
    onEnd()
  }

  if (showReward) {
    return (
      <>
        <h2 css={obstacleTitle}>{title}</h2>
        <div css={greenBox}>{rewardText}</div>
        <ResourceLoot css={smallMarginTop}>
          {rewardResources.map(([type, value]) => (
            <ResourceIcon key={type} type={type} text={value} size="1.8rem" marginLeft="0.2rem" marginRight="0.2rem" />
          ))}
        </ResourceLoot>
        <div css={spacer} />
        <button type="button" css={cyanSquareButton} onClick={handleEndObstacle} data-test-id="endObstacleButton">
          {t('obstacleEnd')}
        </button>
      </>
    )
  }

  return (
    <>
      <h2 css={obstacleTitle}>{title}</h2>
      {obstacle.rows.map(row => (
        <ExpeditionObstacleRow
          key={row.id}
          title={renderRowTitle(row.index)}
          row={row}
          undeads={undeads}
          isActive={obstacle.activeRow === row.id}
          rolls={obstacle.rolls?.filter(roll => row.slottedUndeads.includes(roll[0])) ?? null}
          onToggleRow={handleToggleRow(row.id)}
          onRemoveUndead={handleRemoveUndead}
        />
      ))}
      <div css={spacer} />
      {!hasRolledDices && (
        <div css={obstacleFooter}>
          <button css={fleeButton} type="button" onClick={onFlee}>
            <Image src={fleeIconUrl} size="2.5rem" />
          </button>
          <button css={rollButton} type="button" onClick={handleRollDices} data-test-id="rollDicesButton">
            <Image src={rollIconUrl} size="4rem" />
          </button>
        </div>
      )}
      {hasRolledDices && !isSuccess && (
        <div css={consequencesBox}>
          {obstacle.rows.flatMap(row => {
            if (isObstacleRowPassed(row, rollsMap)) {
              return []
            }
            return row.slottedUndeads.map(undeadId => {
              const undead = undeads.find(({ id }) => id === undeadId)
              if (!undead) {
                return null
              }
              return (
                <div key={undead.id} css={consequencesSlot}>
                  <UndeadPortrait type={undead.type} size="2rem" />
                  <span css={textColor('RED')}>
                    -{row.healthCost}&nbsp;
                    <Image src={hpCostIcon} />
                  </span>
                </div>
              )
            })
          })}
          <button type="button" css={redSquareButton} onClick={handleApplyConsequences}>
            {t('applyConsequences')}
          </button>
        </div>
      )}
      {hasRolledDices && isSuccess && (
        <button type="button" css={cyanSquareButton} onClick={handleShowReward} data-test-id="showObstacleRewardButton">
          {t('obstacleEnd')}
        </button>
      )}
    </>
  )
}
