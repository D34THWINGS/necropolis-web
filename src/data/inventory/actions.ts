import { createAction } from 'typesafe-actions'
import { Item, ItemId } from './items'

export const gainItem = createAction('inventory/GAIN_ITEM', (item: Item) => ({ item }))()

export const removeItem = createAction('inventory/REMOVE_ITEM', (itemId: ItemId) => ({ itemId }))()
