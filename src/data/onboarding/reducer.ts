import { createReducer } from 'typesafe-actions'
import { nextOnboardingStep } from './actions'
import { ONBOARDING_STEPS_COUNT } from '../../config/constants'

export const onboarding = createReducer({
  active: true,
  step: 0,
}).handleAction(nextOnboardingStep, state => ({
  ...state,
  active: state.step + 1 <= ONBOARDING_STEPS_COUNT,
  step: state.step + 1 <= ONBOARDING_STEPS_COUNT ? state.step + 1 : state.step,
}))
