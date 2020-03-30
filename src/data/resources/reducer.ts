import { Action } from 'redux'

export type ResourceState = {
  zombies: number
}

const initialState: ResourceState = {
  zombies: 0,
}

export const resources = (state = initialState, action: Action): ResourceState => {
  switch (action.type) {
    default:
      return state
  }
}
