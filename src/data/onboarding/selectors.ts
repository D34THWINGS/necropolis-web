import { createSelector } from 'reselect'
import { RootState } from '../../store/mainReducer'
import { INTRO_STEPS_COUNT, OnboardingFlag } from '../../config/constants'

export const getIsOnboardingActive = (state: RootState) => state.onboarding.active

export const getIsIntroActive = (state: RootState) => state.onboarding.step <= INTRO_STEPS_COUNT

export const getOnboardingStep = (state: RootState) => state.onboarding.step

export const getMissingOnboardingFlags = createSelector(
  (state: RootState) => state.onboarding.flags,
  flags => Object.values(OnboardingFlag).filter(flag => !flags.includes(flag)),
)
