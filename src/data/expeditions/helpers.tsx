import { v4 as uuid } from 'uuid'
import { UndeadTalent } from '../../config/constants'
import { UndeadId } from '../undeads/helpers'

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

export const makeObstacle = <TKey extends string = string>(key: TKey, rows: ObstacleRow[]): Obstacle => ({
  key,
  rows,
  activeRow: null,
  rolls: null,
})
