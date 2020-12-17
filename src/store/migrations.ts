import { PersistedState, MigrationManifest } from 'redux-persist'
import { RootState } from './mainReducer'

type PartialState<TState> = TState extends Record<string, unknown>
  ? { [K in keyof TState]?: PartialState<TState[K]> }
  : TState
type PartialRootState = { [K in keyof RootState]?: PartialState<RootState[K]> }

export type PersistedRootState = PersistedState & PartialRootState

const migrationsRecord: Record<number, (state: PersistedRootState) => PersistedRootState> = {
  1: state => ({
    ...state,
    spells: {
      ...state.spells,
      activeEffects: state.spells?.activeEffects ?? [],
      spellBook: state.spells?.spellBook ?? [],
    },
    undeads: {
      ...state.undeads,
      list: state.undeads?.list?.map(undead => ({ ...undead, id: Math.floor(Math.random() * 1000) })),
    },
  }),
}

// Ignore undefined states to simplify migrations
export const stateMigrations = Object.entries(migrationsRecord).reduce<MigrationManifest>(
  (record, [key, migration]) => ({
    ...record,
    [key]: state => (state ? migration(state) : undefined),
  }),
  {},
)
