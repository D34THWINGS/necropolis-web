import { RootState } from '../../store/mainReducer'

export const getInventory = (state: RootState) => state.inventory

export const getInventoryItems = (state: RootState) => getInventory(state).items
