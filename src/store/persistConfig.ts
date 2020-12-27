import { createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { stateMigrations } from './migrations'

export const persistConfig = {
  key: 'root',
  storage,
  version: 2,
  migrate: createMigrate(stateMigrations),
}
