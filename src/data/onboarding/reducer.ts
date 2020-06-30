import { createReducer } from 'typesafe-actions'
import { nextOnboardingStep, resetOnboarding } from './actions'
import { OnboardingStep } from '../../config/constants'

export const onboarding = createReducer({
  active: true,
  step: OnboardingStep.Step1,
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
