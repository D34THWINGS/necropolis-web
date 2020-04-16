import { createAction } from 'typesafe-actions'
import type { ResourcesState } from './reducer'

type SpendResourcePayload = Partial<ResourcesState>

export const spendResources = createAction('resources/SPEND', (payload: SpendResourcePayload) => payload)<
  SpendResourcePayload
>()
