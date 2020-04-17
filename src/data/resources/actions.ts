import { createAction } from 'typesafe-actions'
import type { ResourcesState } from './reducer'

type ResourcePayload = Partial<ResourcesState>

export const spendResources = createAction('resources/SPEND', (payload: ResourcePayload) => payload)<ResourcePayload>()

export const gainResources = createAction('resources/GAIN', (payload: ResourcePayload) => payload)<ResourcePayload>()
