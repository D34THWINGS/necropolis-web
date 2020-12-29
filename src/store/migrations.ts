import { PersistedState, MigrationManifest } from 'redux-persist'
import { RootState } from './mainReducer'
import { makeUndeadPool, Undead } from '../data/undeads/helpers'
import { isCatacombs, makeInitialBuildings } from '../data/buildings/helpers'
import { setInArray } from '../data/helpers'

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
  3: state => {
    if (!state.buildings?.list) {
      return state
    }
    const catacombs = state.buildings.list.find(isCatacombs)
    if (!catacombs) {
      return state
    }
    return {
      ...state,
      buildings: {
        ...state.buildings,
        list: setInArray(state.buildings.list, state.buildings.list.indexOf(catacombs), {
          ...catacombs,
          undeadPool: makeUndeadPool(),
        }),
      },
    }
  },
}

// Ignore undefined states to simplify migrations
export const stateMigrations = Object.entries(migrationsRecord).reduce<MigrationManifest>(
  (record, [key, migration]) => ({
    ...record,
    [key]: state => (state ? migration(state) : undefined),
  }),
  {},
)
