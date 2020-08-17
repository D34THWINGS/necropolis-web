import { createAction } from 'typesafe-actions'
import { OnboardingFlag } from '../../config/constants'

export const nextOnboardingStep = createAction('onboarding/NEXT_STEP')()

export const resetOnboarding = createAction('onboarding/RESET')()

export const addOnboardingFlag = createAction('onboarding/ADD_ONBOARDING_FLAG', (flag: OnboardingFlag) => ({ flag }))()
