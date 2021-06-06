import { createReducer } from 'typesafe-actions'
import { Item, makeExquisiteMeat, makeHaysteStrands } from './items'
import { gainItem, removeItem } from './actions'

type InventoryState = {
  items: Item[]
}

export const inventory = createReducer<InventoryState>({
  items: [makeExquisiteMeat(), makeHaysteStrands()],
})
  .handleAction(gainItem, (state, { payload: { item } }) => ({ ...state, items: [...state.items, item] }))
  .handleAction(removeItem, (state, { payload: { itemId } }) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId),
  }))
