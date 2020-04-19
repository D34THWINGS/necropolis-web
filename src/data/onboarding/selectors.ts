import { RootState } from '../../store/mainReducer'

export const getIsOnboardingActive = (state: RootState) => state.onboarding.active

export const getOnboardingStep = (state: RootState) => state.onboarding.step
