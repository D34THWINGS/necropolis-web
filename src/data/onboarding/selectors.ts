import { RootState } from '../../store/mainReducer'
import { INTRO_STEPS_COUNT } from '../../config/constants'

export const getIsOnboardingActive = (state: RootState) => state.onboarding.active

export const getIsIntroActive = (state: RootState) => state.onboarding.step <= INTRO_STEPS_COUNT

export const getOnboardingStep = (state: RootState) => state.onboarding.step
