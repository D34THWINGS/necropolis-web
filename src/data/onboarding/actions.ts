import { createAction } from 'typesafe-actions'

export const nextOnboardingStep = createAction('onboarding/NEXT_STEP')()

export const resetOnboarding = createAction('onboarding/RESET')()
