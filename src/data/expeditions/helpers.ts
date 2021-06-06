import { v4 as uuid } from 'uuid'
import { ResourceType, UndeadTalent } from '../../config/constants'
import { UndeadId } from '../undeads/helpers'
import { drawRandomItem, Item } from '../inventory/items'

export type ObstacleRow = {
  id: string
  index: number
  diceSlots: number
  requiredTalent: [UndeadTalent, number]
  healthCost: number
  slottedUndeads: UndeadId[]
}

export type Obstacle<TKey extends string = string> = {
  key: TKey
  rows: ObstacleRow[]
  activeRow: string | null
  rolls: [UndeadId, number][] | null
  rewardResources: [ResourceType, number][]
  rewardLoot: Item[]
}

export const makeObstacleRow = (
  index: number,
  diceSlots: number,
  requiredTalent: [UndeadTalent, number],
  healthCost: number,
): ObstacleRow => ({
  id: uuid(),
  index,
  diceSlots,
  requiredTalent,
  healthCost,
  slottedUndeads: [],
})

export const makeObstacle = <TKey extends string = string>(
  key: TKey,
  rows: ObstacleRow[],
  reward: {
    resources?: [ResourceType, number][]
    loot?: number
  },
): Obstacle => ({
  key,
  rows,
  activeRow: rows[0].id,
  rolls: null,
  rewardLoot: reward.loot ? Array.from({ length: reward.loot }).map(() => drawRandomItem()) : [],
  rewardResources: reward.resources ?? [],
})

export const isObstacleRowPassed = (row: ObstacleRow, rollsMap: Map<UndeadId, number>) => {
  const result = row.slottedUndeads.reduce((sum, undeadId) => sum + (rollsMap.get(undeadId) ?? 0), 0)
  return result >= row.requiredTalent[1]
}

export const isObstaclePassed = (obstacle: Obstacle) => {
  if (!obstacle.rolls) {
    return false
  }
  const rollsMap = new Map(obstacle.rolls)
  return obstacle.rows.every(row => isObstacleRowPassed(row, rollsMap))
}

export const isUndeadSlottedInObstacle = (obstacle: Obstacle, undeadId: UndeadId) =>
  obstacle.rows.some(row => row.slottedUndeads.includes(undeadId))
