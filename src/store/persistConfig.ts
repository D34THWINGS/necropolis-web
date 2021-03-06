import { createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { stateMigrations } from './migrations'

export const persistConfig = {
  key: 'root',
  storage,
  version: 3,
  migrate: createMigrate(stateMigrations),
}
