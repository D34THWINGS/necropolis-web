import { v4 as uuid } from 'uuid'

enum ItemType {
  ExquisiteMeat = 'exquisiteMeat',
  HaysteStrands = 'haysteStrands',
}

export type ItemId = string

type BaseItem = {
  id: ItemId
}

const makeItem = (): BaseItem => ({ id: uuid() })

export type ExquisiteMeat = BaseItem & {
  type: ItemType.ExquisiteMeat
  healingAmount: number
}

export const makeExquisiteMeat = (): ExquisiteMeat => ({
  ...makeItem(),
  type: ItemType.ExquisiteMeat,
  healingAmount: 1,
})

export const isExquisiteMeat = (item: Item): item is ExquisiteMeat => item.type === ItemType.ExquisiteMeat

export type HaysteStrands = BaseItem & {
  type: ItemType.HaysteStrands
  rerolledDices: number
}

export const makeHaysteStrands = (): HaysteStrands => ({
  ...makeItem(),
  type: ItemType.HaysteStrands,
  rerolledDices: 1,
})

export const isHaysteStrands = (item: Item): item is HaysteStrands => item.type === ItemType.HaysteStrands

export type Item = ExquisiteMeat | HaysteStrands
