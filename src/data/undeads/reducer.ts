import { createReducer } from 'typesafe-actions'
import { createUndead } from './helpers'
import { UndeadType } from '../../config/constants'

export const undeads = createReducer([createUndead(UndeadType.Valet)])
