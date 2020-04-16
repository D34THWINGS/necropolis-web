import { ActionType } from 'typesafe-actions'

export type RootAction = ActionType<typeof import('./buildings/actions')>

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction
  }
}
