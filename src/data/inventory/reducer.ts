import { createReducer } from 'typesafe-actions'
import { Item } from './items'
import { gainItems, removeItem } from './actions'

type InventoryState = {
  items: Item[]
}

export const inventory = createReducer<InventoryState>({
  items: [],
})
  .handleAction(gainItems, (state, { payload: { items } }) => ({ ...state, items: [...state.items, ...items] }))
  .handleAction(removeItem, (state, { payload: { itemId } }) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId),
  }))
