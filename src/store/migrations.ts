import { PersistedState, MigrationManifest } from 'redux-persist'
import { RootState } from './mainReducer'
import { Undead } from '../data/undeads/helpers'
import { makeInitialBuildings } from '../data/buildings/helpers'

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
      list: state.undeads?.list?.map((undead: Undead) => ({ ...undead, id: Math.floor(Math.random() * 1000) })),
    },
  }),
  2: state => ({
    ...state,
    buildings: {
      list: makeInitialBuildings(),
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
