import { createReducer } from 'typesafe-actions'
import { addOnboardingFlag, nextOnboardingStep, resetOnboarding } from './actions'
import { OnboardingFlag, OnboardingStep } from '../../config/constants'

export const onboarding = createReducer({
  active: true,
  step: OnboardingStep.Step1,
  flags: [] as OnboardingFlag[],
})
  .handleAction(nextOnboardingStep, state => ({
    ...state,
    active: state.step + 1 < OnboardingStep.End,
    step: Math.min(state.step + 1, OnboardingStep.End),
  }))
  .handleAction(resetOnboarding, state => ({
    ...state,
    active: true,
    step: OnboardingStep.GamePresentation,
  }))
  .handleAction(addOnboardingFlag, (state, { payload: { flag } }) => ({ ...state, flags: [...state.flags, flag] }))
