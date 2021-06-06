import { createAction } from 'typesafe-actions'
import { Item, ItemId } from './items'

export const gainItems = createAction('inventory/GAIN_ITEMS', (items: Item[]) => ({ items }))()

export const removeItem = createAction('inventory/REMOVE_ITEM', (itemId: ItemId) => ({ itemId }))()
