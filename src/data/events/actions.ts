import { createAction } from 'typesafe-actions'
import { EventType } from '../../config/constants'

export const startEvent = createAction('events/START', (event: EventType) => ({ event }))()

export const setEventStep = createAction('events/SET_STEP', (step: number) => ({ step }))()

export const endEvent = createAction('events/END')()

export const gainArtifact = createAction('event/GAIN_ARTIFACT')()
