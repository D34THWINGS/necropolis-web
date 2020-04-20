import { ActionType } from 'typesafe-actions'

export type RootAction =
  | ActionType<typeof import('./buildings/actions')>
  | ActionType<typeof import('./resources/actions')>
  | ActionType<typeof import('./turn/actions')>
  | ActionType<typeof import('./undeads/actions')>
  | ActionType<typeof import('./spells/actions')>
  | ActionType<typeof import('./onboarding/actions')>

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction
  }
}